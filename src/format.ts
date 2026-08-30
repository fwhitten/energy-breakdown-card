export function formatEnergy(value: number, language?: string): string {
  const abs = Math.abs(value);
  const digits = abs >= 1000 ? 1 : 2;
  return new Intl.NumberFormat(language || undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
}

export function formatPercent(value: number): string {
  const rounded = Math.round(value);
  return `${rounded > 0 ? "+" : ""}${rounded}%`;
}
