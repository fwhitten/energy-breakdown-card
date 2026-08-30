import { OTHER_KEY } from "./const";
import type { StatsPeriod } from "./periods";
import type {
  Bucket,
  ChartData,
  DeviceConsumption,
  EnergyBreakdownCardConfig,
  EnergyPrefs,
  HomeAssistant,
  Series,
  StatisticValue,
  StatisticsResponse,
  TotalMode
} from "./types";
import type { Palette } from "./theme";

export async function fetchPrefs(hass: HomeAssistant): Promise<EnergyPrefs> {
  return hass.callWS<EnergyPrefs>({ type: "energy/get_prefs" });
}

export async function fetchStatistics(
  hass: HomeAssistant,
  statisticIds: string[],
  start: Date,
  end: Date,
  period: StatsPeriod
): Promise<StatisticsResponse> {
  if (!statisticIds.length) return {};
  return hass.callWS<StatisticsResponse>({
    type: "recorder/statistics_during_period",
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    statistic_ids: statisticIds,
    period,
    types: ["change"]
  });
}

/** Devices that are not sub-metered off another device, so nothing is counted twice. */
export function topLevelDevices(prefs: EnergyPrefs): DeviceConsumption[] {
  const devices = prefs.device_consumption ?? [];
  return devices.filter((d) => !d.included_in_stat);
}

export interface SourceStats {
  gridFrom: string[];
  gridTo: string[];
  solarFrom: string[];
  batteryFrom: string[];
  batteryTo: string[];
}

export function collectSourceStats(prefs: EnergyPrefs): SourceStats {
  const out: SourceStats = { gridFrom: [], gridTo: [], solarFrom: [], batteryFrom: [], batteryTo: [] };
  for (const source of prefs.energy_sources ?? []) {
    if (source.type === "grid") {
      for (const f of source.flow_from ?? []) if (f.stat_energy_from) out.gridFrom.push(f.stat_energy_from);
      for (const t of source.flow_to ?? []) if (t.stat_energy_to) out.gridTo.push(t.stat_energy_to);
    } else if (source.type === "solar") {
      if (source.stat_energy_from) out.solarFrom.push(source.stat_energy_from);
    } else if (source.type === "battery") {
      if (source.stat_energy_from) out.batteryFrom.push(source.stat_energy_from);
      if (source.stat_energy_to) out.batteryTo.push(source.stat_energy_to);
    }
  }
  return out;
}

export function statIdsForTotal(sources: SourceStats, mode: TotalMode): string[] {
  if (mode === "devices") return [];
  if (mode === "home") {
    return [
      ...sources.gridFrom,
      ...sources.gridTo,
      ...sources.solarFrom,
      ...sources.batteryFrom,
      ...sources.batteryTo
    ];
  }
  return sources.gridFrom;
}

function toMs(value: number | string): number {
  return typeof value === "number" ? value : new Date(value).getTime();
}

function changeOf(entry: StatisticValue): number {
  const v = entry.change;
  return typeof v === "number" && Number.isFinite(v) ? v : 0;
}

/**
 * Distribute a statistic's per-interval changes across the chart's buckets.
 * Intervals are assigned by their start time, which is how the recorder aligns
 * them, so no interval is split between two buckets.
 */
export function bucketize(stats: StatisticsResponse, ids: string[], buckets: Bucket[]): number[] {
  const values = new Array<number>(buckets.length).fill(0);
  if (!buckets.length) return values;
  for (const id of ids) {
    for (const entry of stats[id] ?? []) {
      const t = toMs(entry.start);
      const index = findBucket(buckets, t);
      if (index >= 0) values[index] += changeOf(entry);
    }
  }
  return values;
}

function findBucket(buckets: Bucket[], t: number): number {
  let lo = 0;
  let hi = buckets.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const b = buckets[mid];
    if (t < b.start.getTime()) hi = mid - 1;
    else if (t >= b.end.getTime()) lo = mid + 1;
    else return mid;
  }
  return -1;
}

/**
 * Sum a statistic over an arbitrary range, prorating an interval that the range
 * ends part way through. Needed for like-for-like comparison, where the previous
 * period is cut off at the same elapsed offset as the current one.
 */
export function sumRange(stats: StatisticsResponse, ids: string[], start: Date, end: Date): number {
  const from = start.getTime();
  const to = end.getTime();
  let total = 0;
  for (const id of ids) {
    for (const entry of stats[id] ?? []) {
      const s = toMs(entry.start);
      const e = entry.end !== undefined ? toMs(entry.end) : s;
      if (e <= from || s >= to) continue;
      const change = changeOf(entry);
      const span = e - s;
      if (span <= 0) {
        total += change;
        continue;
      }
      const overlap = Math.min(e, to) - Math.max(s, from);
      total += change * Math.min(1, Math.max(0, overlap / span));
    }
  }
  return total;
}

export function combineTotals(
  stats: StatisticsResponse,
  sources: SourceStats,
  mode: TotalMode,
  buckets: Bucket[],
  deviceTotals: number[]
): number[] {
  if (mode === "devices") return deviceTotals.slice();
  const gridFrom = bucketize(stats, sources.gridFrom, buckets);
  if (mode === "grid") return gridFrom;
  const gridTo = bucketize(stats, sources.gridTo, buckets);
  const solar = bucketize(stats, sources.solarFrom, buckets);
  const battFrom = bucketize(stats, sources.batteryFrom, buckets);
  const battTo = bucketize(stats, sources.batteryTo, buckets);
  return gridFrom.map((v, i) =>
    Math.max(0, v - gridTo[i] + solar[i] + battFrom[i] - battTo[i])
  );
}

export function totalForRange(
  stats: StatisticsResponse,
  sources: SourceStats,
  mode: TotalMode,
  start: Date,
  end: Date,
  deviceIds: string[]
): number {
  if (mode === "devices") return sumRange(stats, deviceIds, start, end);
  const gridFrom = sumRange(stats, sources.gridFrom, start, end);
  if (mode === "grid") return gridFrom;
  return Math.max(
    0,
    gridFrom -
      sumRange(stats, sources.gridTo, start, end) +
      sumRange(stats, sources.solarFrom, start, end) +
      sumRange(stats, sources.batteryFrom, start, end) -
      sumRange(stats, sources.batteryTo, start, end)
  );
}

export interface BuildOptions {
  prefs: EnergyPrefs;
  stats: StatisticsResponse;
  buckets: Bucket[];
  config: EnergyBreakdownCardConfig;
  palette: Palette;
}

/**
 * Turn raw statistics into stacked series. Devices are ordered largest first;
 * anything beyond `max_devices`, plus consumption no device accounts for, is
 * folded into a single "Other" segment so the stack totals the real figure.
 */
export function buildChartData({ prefs, stats, buckets, config, palette }: BuildOptions): ChartData {
  const overrides = new Map((config.devices ?? []).map((d) => [d.stat, d]));
  const mode: TotalMode = config.total_mode ?? "grid";

  const devices = topLevelDevices(prefs).filter((d) => !overrides.get(d.stat_consumption)?.hidden);

  let series: Series[] = devices.map((device, index) => {
    const override = overrides.get(device.stat_consumption);
    const values = bucketize(stats, [device.stat_consumption], buckets);
    return {
      key: device.stat_consumption,
      name: override?.name || device.name || device.stat_consumption,
      color: override?.color || palette.series[index % palette.series.length],
      values,
      total: values.reduce((a, b) => a + b, 0)
    };
  });

  series.sort((a, b) => b.total - a.total);

  const max = config.max_devices ?? 8;
  let overflow: number[] = new Array(buckets.length).fill(0);
  if (max > 0 && series.length > max) {
    const rest = series.slice(max);
    series = series.slice(0, max);
    overflow = buckets.map((_, i) => rest.reduce((sum, s) => sum + s.values[i], 0));
  }

  const deviceTotals = buckets.map((_, i) => series.reduce((sum, s) => sum + s.values[i], 0) + overflow[i]);
  const totals = combineTotals(stats, collectSourceStats(prefs), mode, buckets, deviceTotals);

  const showOther = config.show_other !== false && mode !== "devices";
  if (showOther || overflow.some((v) => v > 0)) {
    const values = totals.map((t, i) => Math.max(0, (showOther ? t - deviceTotals[i] : 0) + overflow[i]));
    const total = values.reduce((a, b) => a + b, 0);
    if (total > 0) {
      series.push({
        key: OTHER_KEY,
        name: config.other_name || "Other",
        color: config.other_color || palette.other,
        values,
        total
      });
    }
  }

  // The stack must never exceed the headline figure it sits under.
  const stacked = buckets.map((_, i) => series.reduce((sum, s) => sum + s.values[i], 0));
  return { buckets, series, totals: stacked.map((v, i) => Math.max(v, totals[i])) };
}
