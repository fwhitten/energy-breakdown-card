export function formatEnergy(value: number, language?: string): string {
  const abs = Math.abs(value);
  const digits = abs >= 1000 ? 1 : 2;
  return new Intl.NumberFormat(language || undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
}

/**
 * Enough precision to be useful at any magnitude without a wall of noughts:
 * 0.12, 1.2, 12, 123.
 */
export function formatLegendEnergy(value: number, language?: string): string {
  if (value === 0) return "0";
  const abs = Math.abs(value);
  const digits = abs >= 10 ? 0 : abs >= 1 ? 1 : 2;
  return new Intl.NumberFormat(language || undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
}

export function formatPercent(value: number): string {
  const rounded = Math.round(value);
  return `${rounded > 0 ? "+" : ""}${rounded}%`;
}

/** Names the period being displayed, e.g. "18 – 24 Aug" or "July 2026". */
export function formatPeriodLabel(period: string, start: Date, language?: string): string {
  switch (period) {
    case "day":
      return start.toLocaleDateString(language, { weekday: "short", day: "numeric", month: "short" });
    case "week": {
      const end = new Date(start.getTime());
      end.setDate(end.getDate() + 6);
      const sameMonth = start.getMonth() === end.getMonth();
      const from = start.toLocaleDateString(language, {
        day: "numeric",
        ...(sameMonth ? {} : { month: "short" })
      });
      const to = end.toLocaleDateString(language, { day: "numeric", month: "short" });
      return `${from} \u2013 ${to}`;
    }
    case "month":
      return start.toLocaleDateString(language, { month: "long", year: "numeric" });
    default:
      return String(start.getFullYear());
  }
}
