import { topLevelDevices } from "./energy";
import type {
  EnergyPrefs,
  HomeAssistant,
  PowerBreakdownCardConfig,
  Sample,
  StatisticsResponse,
  TotalMode
} from "./types";

/** A power entity, and whether its sign needs flipping before use. */
export interface PowerSignal {
  entity: string;
  invert?: boolean;
}

export interface PowerSources {
  /** Signals that add to consumption. */
  positive: PowerSignal[];
  /** Signals that subtract from it, such as grid export or battery charging. */
  negative: PowerSignal[];
}

function fromPowerConfig(source: {
  stat_rate?: string;
  power_config?: {
    stat_rate?: string;
    stat_rate_inverted?: string;
    stat_rate_from?: string;
    stat_rate_to?: string;
  };
}): PowerSources {
  const out: PowerSources = { positive: [], negative: [] };
  const config = source.power_config;
  if (config?.stat_rate_from || config?.stat_rate_to) {
    // Two positive sensors, one per direction.
    if (config.stat_rate_from) out.positive.push({ entity: config.stat_rate_from });
    if (config.stat_rate_to) out.negative.push({ entity: config.stat_rate_to });
    return out;
  }
  if (config?.stat_rate_inverted) {
    out.positive.push({ entity: config.stat_rate_inverted, invert: true });
    return out;
  }
  const signed = config?.stat_rate ?? source.stat_rate;
  if (signed) out.positive.push({ entity: signed });
  return out;
}

function merge(into: PowerSources, from: PowerSources): void {
  into.positive.push(...from.positive);
  into.negative.push(...from.negative);
}

/**
 * The power signals making up the chosen total, read from the same Energy
 * dashboard configuration the energy card uses.
 */
export function collectPowerSources(prefs: EnergyPrefs, mode: TotalMode): PowerSources {
  const out: PowerSources = { positive: [], negative: [] };
  if (mode === "devices") return out;
  for (const source of prefs.energy_sources ?? []) {
    if (source.type === "grid") {
      merge(out, fromPowerConfig(source));
    } else if (mode === "home" && source.type === "solar") {
      if (source.stat_rate) out.positive.push({ entity: source.stat_rate });
    } else if (mode === "home" && source.type === "battery") {
      merge(out, fromPowerConfig(source));
    }
  }
  return out;
}

export interface PowerDevice {
  stat: string;
  name: string;
  entity?: string;
}

/** Devices from the Energy dashboard, paired with their power entity. */
export function powerDevices(
  prefs: EnergyPrefs,
  config: PowerBreakdownCardConfig
): PowerDevice[] {
  const overrides = new Map((config.devices ?? []).map((d) => [d.stat, d]));
  return topLevelDevices(prefs).map((device) => {
    const override = overrides.get(device.stat_consumption);
    return {
      stat: device.stat_consumption,
      name: override?.name || device.name || device.stat_consumption,
      entity: override?.power_entity || device.stat_rate
    };
  });
}

const UNIT_TO_WATTS: Record<string, number> = {
  W: 1,
  kW: 1000,
  MW: 1_000_000,
  GW: 1_000_000_000,
  mW: 0.001
};

export function toWatts(value: number, unit?: string): number {
  return value * (UNIT_TO_WATTS[unit ?? "W"] ?? 1);
}

/** The entity's power right now, or null if it has nothing usable to report. */
export function readPower(hass: HomeAssistant, entity: string | undefined): number | null {
  if (!entity) return null;
  const state = hass.states?.[entity];
  if (!state || state.state === "unavailable" || state.state === "unknown") return null;
  const value = Number.parseFloat(state.state);
  if (!Number.isFinite(value)) return null;
  return toWatts(value, state.attributes?.unit_of_measurement);
}

export function readSources(hass: HomeAssistant, sources: PowerSources): number | null {
  let total = 0;
  let seen = false;
  for (const signal of sources.positive) {
    const v = readPower(hass, signal.entity);
    if (v === null) continue;
    seen = true;
    total += signal.invert ? -v : v;
  }
  for (const signal of sources.negative) {
    const v = readPower(hass, signal.entity);
    if (v === null) continue;
    seen = true;
    total -= signal.invert ? -v : v;
  }
  return seen ? total : null;
}

/**
 * Below this many hours the recorder's own history is used, which keeps every
 * state change. Above it, five-minute statistics: far lighter, and they
 * outlive the recorder's purge window.
 */
export const HISTORY_WINDOW_HOURS = 6;

export function usesStatistics(hours: number): boolean {
  return hours > HISTORY_WINDOW_HOURS;
}

interface CompressedState {
  s?: string;
  state?: string;
  lu?: number;
  last_updated?: string | number;
  last_changed?: string | number;
}

function timeOf(entry: CompressedState): number | null {
  const raw = entry.lu ?? entry.last_updated ?? entry.last_changed;
  if (raw === undefined) return null;
  if (typeof raw === "number") return raw < 1e12 ? raw * 1000 : raw;
  const parsed = new Date(raw).getTime();
  return Number.isFinite(parsed) ? parsed : null;
}

/** Home Assistant returns compressed keys; older cores return long ones. */
export function parseHistory(entries: CompressedState[], unit?: string): Sample[] {
  const out: Sample[] = [];
  for (const entry of entries ?? []) {
    const t = timeOf(entry);
    if (t === null) continue;
    const raw = entry.s ?? entry.state;
    if (raw === undefined || raw === "unavailable" || raw === "unknown") {
      out.push({ t, v: null });
      continue;
    }
    const value = Number.parseFloat(raw);
    out.push({ t, v: Number.isFinite(value) ? toWatts(value, unit) : null });
  }
  return out.sort((a, b) => a.t - b.t);
}

export async function fetchPowerHistory(
  hass: HomeAssistant,
  entities: string[],
  start: Date,
  end: Date
): Promise<Record<string, Sample[]>> {
  if (!entities.length) return {};
  const response = await hass.callWS<Record<string, CompressedState[]>>({
    type: "history/history_during_period",
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    entity_ids: entities,
    minimal_response: true,
    no_attributes: true,
    significant_changes_only: false
  });
  const out: Record<string, Sample[]> = {};
  for (const entity of entities) {
    const unit = hass.states?.[entity]?.attributes?.unit_of_measurement;
    out[entity] = parseHistory(response?.[entity] ?? [], unit);
  }
  return out;
}

export async function fetchPowerStatistics(
  hass: HomeAssistant,
  entities: string[],
  start: Date,
  end: Date
): Promise<Record<string, Sample[]>> {
  if (!entities.length) return {};
  const response = await hass.callWS<StatisticsResponse>({
    type: "recorder/statistics_during_period",
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    statistic_ids: entities,
    period: "5minute",
    types: ["mean"],
    units: { power: "W" }
  });
  const out: Record<string, Sample[]> = {};
  for (const entity of entities) {
    out[entity] = (response?.[entity] ?? []).map((entry) => {
      const t = typeof entry.start === "number" ? entry.start : new Date(entry.start).getTime();
      const mean = (entry as { mean?: number | null }).mean;
      return { t, v: typeof mean === "number" && Number.isFinite(mean) ? mean : null };
    });
  }
  return out;
}

/**
 * Reduce a series to one value per bucket, carrying the last known reading
 * forward across quiet stretches. A sensor that stops reporting a number leaves
 * a genuine gap rather than dropping to zero.
 */
export function bucketSamples(
  samples: Sample[],
  start: number,
  end: number,
  buckets: number
): (number | null)[] {
  const out = new Array<number | null>(buckets).fill(null);
  if (buckets <= 0 || end <= start) return out;
  const width = (end - start) / buckets;

  let index = 0;
  let carried: number | null = null;
  // Anything before the window seeds the first bucket.
  while (index < samples.length && samples[index].t < start) {
    carried = samples[index].v;
    index++;
  }

  for (let b = 0; b < buckets; b++) {
    const bucketEnd = start + width * (b + 1);
    let sum = 0;
    let count = 0;
    let sawGap = false;
    while (index < samples.length && samples[index].t < bucketEnd) {
      const v = samples[index].v;
      if (v === null) {
        sawGap = true;
        carried = null;
      } else {
        sum += v;
        count++;
        carried = v;
      }
      index++;
    }
    if (count > 0) out[b] = sum / count;
    else if (sawGap) out[b] = null;
    else out[b] = carried;
  }
  return out;
}

/** Combine bucketed positive and negative signals into one net series. */
export function combineSeries(
  positive: (number | null)[][],
  negative: (number | null)[][],
  buckets: number
): (number | null)[] {
  const out = new Array<number | null>(buckets).fill(null);
  for (let i = 0; i < buckets; i++) {
    let total = 0;
    let seen = false;
    for (const series of positive) {
      const v = series[i];
      if (v === null || v === undefined) continue;
      total += v;
      seen = true;
    }
    for (const series of negative) {
      const v = series[i];
      if (v === null || v === undefined) continue;
      total -= v;
      seen = true;
    }
    out[i] = seen ? total : null;
  }
  return out;
}
