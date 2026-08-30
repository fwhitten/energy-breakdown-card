import test from "node:test";
import assert from "node:assert/strict";
import {
  buildBuckets,
  comparisonRange,
  currentRange,
  elapsedFraction,
  labelStride,
  shiftBack,
  startOfPeriod,
  statsPeriodFor
} from "./lib.mjs";

test("statsPeriodFor drills one level below the selected period", () => {
  assert.equal(statsPeriodFor("day"), "hour");
  assert.equal(statsPeriodFor("week"), "day");
  assert.equal(statsPeriodFor("month"), "day");
  assert.equal(statsPeriodFor("year"), "month");
});

test("startOfPeriod snaps to the configured first day of the week", () => {
  const wed = new Date(2026, 7, 26, 14, 30);
  assert.equal(startOfPeriod(wed, "week", 1).getDate(), 24);
  assert.equal(startOfPeriod(wed, "week", 0).getDate(), 23);
  assert.equal(startOfPeriod(wed, "month", 1).getDate(), 1);
  assert.equal(startOfPeriod(wed, "year", 1).getMonth(), 0);
  assert.equal(startOfPeriod(wed, "day", 1).getHours(), 0);
});

test("shiftBack clamps the day of month rather than rolling over", () => {
  const mar31 = new Date(2026, 2, 31, 9, 0);
  const prev = shiftBack(mar31, "month");
  assert.equal(prev.getMonth(), 1);
  assert.equal(prev.getDate(), 28);

  const leap = shiftBack(new Date(2024, 2, 31, 9, 0), "month");
  assert.equal(leap.getDate(), 29);
});

test("like-for-like comparison uses the same elapsed slice of the previous period", () => {
  const now = new Date(2026, 7, 26, 10, 30);
  const range = comparisonRange(now, "day", "like_for_like", 1);
  assert.equal(range.start.getDate(), 25);
  assert.equal(range.start.getHours(), 0);
  assert.equal(range.end.getDate(), 25);
  assert.equal(range.end.getHours(), 10);
  assert.equal(range.end.getMinutes(), 30);
});

test("full-previous comparison spans the whole previous period", () => {
  const now = new Date(2026, 7, 26, 10, 30);
  const range = comparisonRange(now, "week", "full_previous", 1);
  assert.equal(range.start.getDate(), 17);
  assert.equal(range.end.getDate(), 24);
});

test("day buckets cover all 24 hours of the calendar day", () => {
  const buckets = buildBuckets(new Date(2026, 7, 26, 10, 30), "day", 1);
  assert.equal(buckets.length, 24);
  assert.equal(buckets[0].start.getHours(), 0);
  assert.equal(buckets[23].label, "23");
});

test("week buckets are seven days labelled by weekday initial", () => {
  const buckets = buildBuckets(new Date(2026, 7, 26), "week", 1);
  assert.equal(buckets.length, 7);
  assert.deepEqual(
    buckets.map((b) => b.label),
    ["M", "T", "W", "T", "F", "S", "S"]
  );
});

test("month buckets are weeks clipped to the month boundaries", () => {
  const now = new Date(2026, 7, 26);
  const buckets = buildBuckets(now, "month", 1);
  const { start, end } = currentRange(now, "month", 1);
  assert.equal(buckets[0].start.getTime(), start.getTime());
  assert.equal(buckets[buckets.length - 1].end.getTime(), end.getTime());
  for (let i = 1; i < buckets.length; i++) {
    assert.equal(buckets[i].start.getTime(), buckets[i - 1].end.getTime());
  }
  assert.ok(buckets.length >= 4 && buckets.length <= 6);
});

test("year buckets are the twelve months", () => {
  const buckets = buildBuckets(new Date(2026, 7, 26), "year", 1);
  assert.equal(buckets.length, 12);
  assert.equal(buckets[0].label, "J");
  assert.equal(buckets[11].end.getFullYear(), 2027);
});

test("elapsedFraction reports how much of the period has passed", () => {
  const midday = new Date(2026, 7, 26, 12, 0);
  assert.ok(Math.abs(elapsedFraction(midday, "day", 1) - 0.5) < 1e-9);
});

test("labelStride thins dense axes only", () => {
  assert.equal(labelStride(7), 1);
  assert.equal(labelStride(24), 3);
});
