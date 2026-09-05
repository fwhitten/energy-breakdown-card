export const GRID_LINES = 4;

/**
 * Step sizes an axis may use, as multiples of a power of ten. Fine enough that
 * the axis never has to jump to twice the height it needs: a peak just over
 * 200 lands on 240, not 400.
 */
const STEPS = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];

/** A little room above the peak so the line or bar never touches the top. */
const HEADROOM = 1.02;

/** Round an axis maximum up to a value that divides into readable steps. */
export function niceMax(value: number, divisions = GRID_LINES): number {
  if (!Number.isFinite(value) || value <= 0) return divisions;
  const rough = (value * HEADROOM) / divisions;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rough)));
  const normalised = rough / magnitude;
  const step = STEPS.find((s) => normalised <= s) ?? 10;
  return step * magnitude * divisions;
}

/**
 * Format an axis tick with just enough precision that adjacent ticks differ.
 * Without the step, a 0.1 kWh axis renders every gridline as "0.1".
 */
export function formatTick(value: number, step = 1): string {
  if (value === 0) return "0";
  if (Math.abs(value) >= 1000) {
    const thousands = value / 1000;
    return `${Math.round(thousands * 10) / 10}k`;
  }
  // Enough decimals to render the step exactly, and no more.
  let decimals = Math.max(0, Math.ceil(-Math.log10(step)));
  const scaled = Number((step * Math.pow(10, decimals)).toFixed(6));
  if (!Number.isInteger(scaled)) decimals += 1;
  return value.toFixed(Math.min(4, decimals));
}
