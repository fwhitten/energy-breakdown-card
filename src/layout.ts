import { GRID_LINES, formatTick, niceMax } from "./scale";
import type { ChartData } from "./types";

export const PAD_TOP = 10;
const PAD_BOTTOM = 22;
/** Gap between the axis labels and where the gridlines start. */
const AXIS_GAP = 8;
const TICK_CHAR_WIDTH = 7;

export interface ChartLayout {
  padLeft: number;
  plotW: number;
  plotH: number;
  slot: number;
  max: number;
  divisions: number;
  step: number;
}

/**
 * Geometry shared by the chart and the tooltip that points at it. The left
 * inset is only as wide as the axis labels need, so the labels sit flush with
 * the card's other content and the plot runs to its right edge.
 */
export function chartLayout(data: ChartData, width: number, height: number): ChartLayout {
  const plotH = Math.max(1, height - PAD_TOP - PAD_BOTTOM);
  // A short card cannot carry four labelled gridlines legibly.
  const divisions = plotH < 110 ? 2 : GRID_LINES;
  const max = niceMax(Math.max(...data.totals, 0), divisions);
  const step = max / divisions;
  let widest = 1;
  for (let i = 0; i <= divisions; i++) {
    widest = Math.max(widest, formatTick(step * i, step).length);
  }
  const padLeft = Math.min(60, Math.round(widest * TICK_CHAR_WIDTH) + AXIS_GAP);
  const plotW = Math.max(1, width - padLeft);
  return {
    padLeft,
    plotW,
    plotH,
    slot: plotW / Math.max(1, data.buckets.length),
    max,
    divisions,
    step
  };
}


