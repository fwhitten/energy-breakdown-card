export const GRID_LINES = 4;

/** Round an axis maximum up to a value that divides into readable steps. */
export function niceMax(value: number, divisions = GRID_LINES): number {
  if (!Number.isFinite(value) || value <= 0) return divisions;
  const rough = value / divisions;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rough)));
  const normalised = rough / magnitude;
  const step = normalised <= 1 ? 1 : normalised <= 2 ? 2 : normalised <= 2.5 ? 2.5 : normalised <= 5 ? 5 : 10;
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
  const decimals = step >= 10 ? 0 : step >= 1 ? (Number.isInteger(step) ? 0 : 1) : Math.min(4, Math.ceil(-Math.log10(step)) + 1);
  return value.toFixed(decimals);
}
