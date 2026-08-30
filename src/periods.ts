import type { Bucket, ComparisonMode, Period } from "./types";

export type StatsPeriod = "hour" | "day" | "week" | "month";

/**
 * Granularity we ask the recorder for. `month` is aggregated client side from
 * daily buckets so that weeks straddling a month boundary get clipped to the
 * month rather than double counted.
 */
export function statsPeriodFor(period: Period): StatsPeriod {
  switch (period) {
    case "day":
      return "hour";
    case "week":
      return "day";
    case "month":
      return "day";
    case "year":
      return "month";
  }
}

export function resolveFirstDayOfWeek(setting: "auto" | "monday" | "sunday" | undefined, language?: string): 0 | 1 {
  if (setting === "monday") return 1;
  if (setting === "sunday") return 0;
  try {
    const locale = new Intl.Locale(language || navigator.language || "en-GB") as Intl.Locale & {
      weekInfo?: { firstDay?: number };
      getWeekInfo?: () => { firstDay?: number };
    };
    const info = typeof locale.getWeekInfo === "function" ? locale.getWeekInfo() : locale.weekInfo;
    // Intl reports 1..7 with 7 = Sunday.
    if (info?.firstDay === 7) return 0;
    if (info?.firstDay === 1) return 1;
  } catch {
    /* Intl.Locale.weekInfo is not available everywhere; fall through. */
  }
  return 1;
}

export function startOfPeriod(date: Date, period: Period, firstDayOfWeek: 0 | 1 = 1): Date {
  const d = new Date(date.getTime());
  d.setHours(0, 0, 0, 0);
  switch (period) {
    case "day":
      return d;
    case "week": {
      const diff = (d.getDay() - firstDayOfWeek + 7) % 7;
      d.setDate(d.getDate() - diff);
      return d;
    }
    case "month":
      d.setDate(1);
      return d;
    case "year":
      d.setMonth(0, 1);
      return d;
  }
}

export function endOfPeriod(start: Date, period: Period): Date {
  const d = new Date(start.getTime());
  switch (period) {
    case "day":
      d.setDate(d.getDate() + 1);
      break;
    case "week":
      d.setDate(d.getDate() + 7);
      break;
    case "month":
      d.setMonth(d.getMonth() + 1);
      break;
    case "year":
      d.setFullYear(d.getFullYear() + 1);
      break;
  }
  return d;
}

/**
 * Shift a date back by one whole period on the calendar, clamping the day of
 * month so that e.g. 31 March - 1 month lands on 28/29 February rather than
 * rolling into March.
 */
export function shiftBack(date: Date, period: Period): Date {
  const d = new Date(date.getTime());
  switch (period) {
    case "day":
      d.setDate(d.getDate() - 1);
      return d;
    case "week":
      d.setDate(d.getDate() - 7);
      return d;
    case "month": {
      const day = d.getDate();
      d.setDate(1);
      d.setMonth(d.getMonth() - 1);
      const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      d.setDate(Math.min(day, daysInMonth));
      return d;
    }
    case "year": {
      const day = d.getDate();
      d.setDate(1);
      d.setFullYear(d.getFullYear() - 1);
      const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      d.setDate(Math.min(day, daysInMonth));
      return d;
    }
  }
}

export interface Range {
  start: Date;
  end: Date;
}

/** The full calendar span of the current period (used for the chart's x axis). */
export function currentRange(now: Date, period: Period, firstDayOfWeek: 0 | 1): Range {
  const start = startOfPeriod(now, period, firstDayOfWeek);
  return { start, end: endOfPeriod(start, period) };
}

/** The elapsed span of the current period (used for the headline figure). */
export function elapsedRange(now: Date, period: Period, firstDayOfWeek: 0 | 1): Range {
  const start = startOfPeriod(now, period, firstDayOfWeek);
  return { start, end: now };
}

/**
 * The span the current period is compared against.
 *
 * `like_for_like` takes the same elapsed slice of the previous period, so
 * "today so far" is measured against "yesterday up to this time" rather than
 * against all of yesterday.
 */
export function comparisonRange(
  now: Date,
  period: Period,
  mode: ComparisonMode,
  firstDayOfWeek: 0 | 1
): Range {
  const start = startOfPeriod(now, period, firstDayOfWeek);
  const prevStart = shiftBack(start, period);
  if (mode === "like_for_like") {
    return { start: prevStart, end: clampToPeriod(shiftBack(now, period), prevStart, period) };
  }
  return { start: prevStart, end: endOfPeriod(prevStart, period) };
}

function clampToPeriod(date: Date, periodStart: Date, period: Period): Date {
  const end = endOfPeriod(periodStart, period);
  if (date.getTime() > end.getTime()) return end;
  if (date.getTime() < periodStart.getTime()) return periodStart;
  return date;
}

/** Fraction of the current period that has elapsed, in (0, 1]. */
export function elapsedFraction(now: Date, period: Period, firstDayOfWeek: 0 | 1): number {
  const { start, end } = currentRange(now, period, firstDayOfWeek);
  const span = end.getTime() - start.getTime();
  if (span <= 0) return 1;
  const done = (now.getTime() - start.getTime()) / span;
  return Math.min(1, Math.max(1e-6, done));
}

const WEEKDAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_INITIALS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/** The buckets the bar chart draws: one level of granularity below `period`. */
export function buildBuckets(now: Date, period: Period, firstDayOfWeek: 0 | 1): Bucket[] {
  const { start, end } = currentRange(now, period, firstDayOfWeek);
  const buckets: Bucket[] = [];

  if (period === "day") {
    for (let h = 0; h < 24; h++) {
      const s = new Date(start.getTime());
      s.setHours(h, 0, 0, 0);
      const e = new Date(s.getTime());
      e.setHours(h + 1, 0, 0, 0);
      buckets.push({ start: s, end: e, label: String(h).padStart(2, "0") });
    }
    return buckets;
  }

  if (period === "week") {
    for (let i = 0; i < 7; i++) {
      const s = new Date(start.getTime());
      s.setDate(start.getDate() + i);
      const e = new Date(s.getTime());
      e.setDate(s.getDate() + 1);
      buckets.push({ start: s, end: e, label: WEEKDAY_INITIALS[s.getDay()] });
    }
    return buckets;
  }

  if (period === "month") {
    // Weeks clipped to the month: the first and last are usually part weeks.
    let cursor = new Date(start.getTime());
    while (cursor.getTime() < end.getTime()) {
      const daysToWeekEnd = 7 - ((cursor.getDay() - firstDayOfWeek + 7) % 7);
      const next = new Date(cursor.getTime());
      next.setDate(cursor.getDate() + daysToWeekEnd);
      const bucketEnd = next.getTime() > end.getTime() ? new Date(end.getTime()) : next;
      buckets.push({ start: new Date(cursor.getTime()), end: bucketEnd, label: String(cursor.getDate()) });
      cursor = bucketEnd;
    }
    return buckets;
  }

  for (let m = 0; m < 12; m++) {
    const s = new Date(start.getFullYear(), m, 1, 0, 0, 0, 0);
    const e = new Date(start.getFullYear(), m + 1, 1, 0, 0, 0, 0);
    buckets.push({ start: s, end: e, label: MONTH_INITIALS[m] });
  }
  return buckets;
}

/** Show every nth x-axis label so dense axes stay readable. */
export function labelStride(count: number): number {
  if (count <= 8) return 1;
  if (count <= 14) return 2;
  if (count <= 24) return 3;
  return Math.ceil(count / 8);
}
