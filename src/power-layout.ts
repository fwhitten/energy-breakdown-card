import { niceMax } from "./scale";
import { formatPower } from "./format";

export const POWER_PAD_TOP = 6;
const AXIS_GAP = 8;
const TICK_CHAR_WIDTH = 7;
const X_LABEL_HEIGHT = 18;

export interface PowerLayoutOptions {
  showAxes: boolean;
  yMax?: number;
  language?: string;
}

export interface PowerLayout {
  padLeft: number;
  padBottom: number;
  plotW: number;
  plotH: number;
  baseline: number;
  max: number;
  divisions: number;
  step: number;
  slot: number;
  ticks: { value: number; label: string }[];
}

export function powerLayout(
  values: (number | null)[],
  width: number,
  height: number,
  opts: PowerLayoutOptions
): PowerLayout {
  const peak = values.reduce<number>((m, v) => (v !== null && v > m ? v : m), 0);
  const padBottom = opts.showAxes ? X_LABEL_HEIGHT : 0;
  const plotH = Math.max(1, height - POWER_PAD_TOP - padBottom);
  const divisions = plotH < 110 ? 2 : 4;
  const max =
    opts.yMax && opts.yMax > 0 ? opts.yMax : niceMax(peak > 0 ? peak : 1, divisions);
  const step = max / divisions;

  const ticks: { value: number; label: string }[] = [];
  if (opts.showAxes) {
    for (let i = 0; i <= divisions; i++) {
      const value = step * i;
      ticks.push({ value, label: formatPower(value, opts.language) });
    }
  }

  const widest = ticks.reduce((w, t) => Math.max(w, t.label.length), 0);
  const padLeft = opts.showAxes
    ? Math.min(64, Math.round(widest * TICK_CHAR_WIDTH) + AXIS_GAP)
    : 0;
  const plotW = Math.max(1, width - padLeft);

  return {
    padLeft,
    padBottom,
    plotW,
    plotH,
    baseline: POWER_PAD_TOP + plotH,
    max,
    divisions,
    step,
    slot: plotW / Math.max(1, values.length),
    ticks
  };
}

export interface PowerPaths {
  line: string;
  area: string;
}

/**
 * Build the line and the area beneath it. Runs of missing data break the path
 * into separate segments so a gap reads as a gap rather than a dive to zero.
 */
export function buildPaths(
  values: (number | null)[],
  layout: PowerLayout,
  smooth: boolean
): PowerPaths {
  const { padLeft, plotH, baseline, max, slot } = layout;
  const y = (v: number) => baseline - (Math.min(Math.max(v, 0), max) / max) * plotH;

  const lineParts: string[] = [];
  const areaParts: string[] = [];
  let segment: { x: number; y: number }[] = [];

  const flush = () => {
    if (!segment.length) {
      segment = [];
      return;
    }
    if (segment.length === 1) {
      // A lone reading still deserves a mark, so give it a short flat run.
      const only = segment[0];
      const half = Math.max(slot / 2, 0.5);
      lineParts.push(`M ${only.x - half} ${only.y} L ${only.x + half} ${only.y}`);
      areaParts.push(
        `M ${only.x - half} ${baseline} L ${only.x - half} ${only.y} L ${only.x + half} ${only.y} L ${only.x + half} ${baseline} Z`
      );
      segment = [];
      return;
    }
    const points = segment.map((p) => `${p.x} ${p.y}`);
    lineParts.push(`M ${points.join(" L ")}`);
    const first = segment[0];
    const last = segment[segment.length - 1];
    areaParts.push(
      `M ${first.x} ${baseline} L ${points.join(" L ")} L ${last.x} ${baseline} Z`
    );
    segment = [];
  };

  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    if (v === null) {
      flush();
      continue;
    }
    const x0 = padLeft + slot * i;
    const x1 = x0 + slot;
    const py = y(v);
    if (smooth) {
      segment.push({ x: x0 + slot / 2, y: py });
    } else {
      // Power holds its value until the next reading, so step rather than slope.
      segment.push({ x: x0, y: py });
      segment.push({ x: x1, y: py });
    }
  }
  flush();

  return { line: lineParts.join(" "), area: areaParts.join(" ") };
}

/** Times to label along the bottom, thinned to what will fit. */
export function timeTicks(
  start: number,
  end: number,
  width: number
): { offset: number; t: number }[] {
  const target = Math.max(2, Math.min(6, Math.floor(width / 90)));
  const out: { offset: number; t: number }[] = [];
  for (let i = 0; i <= target; i++) {
    const offset = i / target;
    out.push({ offset, t: start + (end - start) * offset });
  }
  return out;
}
