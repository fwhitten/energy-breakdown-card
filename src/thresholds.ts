import type { Threshold } from "./types";

/**
 * Sensible for a typical home: quiet under a kilowatt, something substantial
 * running by 1.5 kW, and a heavy load like a charger or shower by 4 kW.
 */
export const DEFAULT_THRESHOLDS: Threshold[] = [
  { value: 0, color: "#4caf50" },
  { value: 1500, color: "#ffa726" },
  { value: 4000, color: "#f44336" }
];

export function normaliseThresholds(thresholds: Threshold[] | undefined): Threshold[] {
  const list = (thresholds ?? DEFAULT_THRESHOLDS)
    .filter((t) => t && Number.isFinite(t.value) && typeof t.color === "string" && t.color)
    .map((t) => ({ value: Math.max(0, t.value), color: t.color }))
    .sort((a, b) => a.value - b.value);
  return list.length ? list : DEFAULT_THRESHOLDS;
}

export interface GradientStop {
  /** 0 at the bottom of the plot, 1 at the top. */
  offset: number;
  color: string;
}

/**
 * Threshold colours as gradient stops down the value axis, so the line and the
 * area under it shade smoothly from one band into the next.
 */
export function gradientStops(thresholds: Threshold[], max: number): GradientStop[] {
  const list = normaliseThresholds(thresholds);
  const span = max > 0 ? max : 1;
  const stops = list.map((t) => ({
    offset: Math.min(1, Math.max(0, t.value / span)),
    color: t.color
  }));
  // Anchor both ends so the gradient covers the whole plot.
  if (stops[0].offset > 0) stops.unshift({ offset: 0, color: stops[0].color });
  const last = stops[stops.length - 1];
  if (last.offset < 1) stops.push({ offset: 1, color: last.color });
  return stops;
}

function parseHex(color: string): [number, number, number] | null {
  const m = color.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  const d = m[1];
  const full = d.length === 3 ? d[0] + d[0] + d[1] + d[1] + d[2] + d[2] : d;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16)
  ];
}

/** The colour a given wattage sits at, interpolated between thresholds. */
export function colorAt(thresholds: Threshold[], value: number): string {
  const list = normaliseThresholds(thresholds);
  if (value <= list[0].value) return list[0].color;
  const last = list[list.length - 1];
  if (value >= last.value) return last.color;

  let lower = list[0];
  let upper = last;
  for (let i = 0; i < list.length - 1; i++) {
    if (value >= list[i].value && value <= list[i + 1].value) {
      lower = list[i];
      upper = list[i + 1];
      break;
    }
  }
  const a = parseHex(lower.color);
  const b = parseHex(upper.color);
  const span = upper.value - lower.value;
  if (!a || !b || span <= 0) return lower.color;
  const ratio = (value - lower.value) / span;
  const mix = a.map((c, i) => Math.round(c + (b[i] - c) * ratio));
  return `#${mix.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}
