import test from "node:test";
import assert from "node:assert/strict";
import {
  chartLayout,
  formatEnergy,
  formatLegendEnergy,
  formatPercent,
  formatTick,
  niceMax
} from "./lib.mjs";

test("niceMax rounds up to a readable axis maximum", () => {
  assert.equal(niceMax(32), 40);
  assert.equal(niceMax(0), 4);
  assert.equal(niceMax(-5), 4);
  assert.equal(niceMax(0.9), 1);
});

test("niceMax does not overshoot a peak that just clears a round number", () => {
  // The coarse 1/2/5/10 ladder used to send a 205 peak to a 400 axis.
  for (const peak of [205, 41, 1010, 2.05]) {
    const max = niceMax(peak);
    assert.ok(max >= peak, `${max} must contain ${peak}`);
    assert.ok(max < peak * 1.5, `${max} is too much headroom for ${peak}`);
  }
});

test("niceMax leaves a little room above the peak", () => {
  assert.ok(niceMax(200) > 200, "a peak should not sit exactly on the top gridline");
});

test("niceMax is always at least the value it must contain", () => {
  for (const v of [0.3, 1.1, 7, 23, 99, 162.68, 1234, 98765]) {
    assert.ok(niceMax(v) >= v, `${niceMax(v)} < ${v}`);
  }
});

test("formatTick keeps large axes short", () => {
  assert.equal(formatTick(0, 10), "0");
  assert.equal(formatTick(30, 10), "30");
  assert.equal(formatTick(1500, 500), "1.5k");
});

test("formatTick gives adjacent ticks on a small axis distinct labels", () => {
  const max = niceMax(0.09);
  const step = max / 4;
  const labels = [1, 2, 3, 4].map((i) => formatTick(step * i, step));
  assert.equal(new Set(labels).size, 4, `duplicate ticks: ${labels.join(", ")}`);
});

test("formatTick does not add noise to whole-number axes", () => {
  const step = niceMax(32) / 4;
  assert.deepEqual([1, 2, 3, 4].map((i) => formatTick(step * i, step)), ["10", "20", "30", "40"]);
});

test("formatEnergy matches the headline style", () => {
  assert.equal(formatEnergy(162.68, "en-GB"), "162.68");
  assert.equal(formatEnergy(0, "en-GB"), "0.00");
  assert.equal(formatEnergy(12345.6, "en-GB"), "12,345.6");
});

test("formatPercent signs the delta", () => {
  assert.equal(formatPercent(43.2), "+43%");
  assert.equal(formatPercent(-23.4), "-23%");
  assert.equal(formatPercent(0), "0%");
});

test("legend figures carry precision suited to their magnitude", () => {
  assert.equal(formatLegendEnergy(0.1234, "en-GB"), "0.12");
  assert.equal(formatLegendEnergy(1.234, "en-GB"), "1.2");
  assert.equal(formatLegendEnergy(12.34, "en-GB"), "12");
  assert.equal(formatLegendEnergy(123.4, "en-GB"), "123");
  assert.equal(formatLegendEnergy(1234.5, "en-GB"), "1,235");
});

test("legend figures render an exact zero plainly", () => {
  assert.equal(formatLegendEnergy(0, "en-GB"), "0");
  assert.equal(formatLegendEnergy(0.004, "en-GB"), "0.00");
});

test("the headline keeps its two decimals", () => {
  assert.equal(formatEnergy(94.89, "en-GB"), "94.89");
});

const layoutData = (totals: number[]) => ({
  buckets: totals.map(() => ({ start: new Date(), end: new Date(), label: "" })),
  series: [],
  totals,
  sourceTotals: totals
});

test("the plot runs to the right edge of the card", () => {
  const { padLeft, plotW } = chartLayout(layoutData([1, 2, 3, 4, 5, 6, 7]), 400, 200);
  assert.equal(padLeft + plotW, 400);
});

test("the axis inset fits the widest label it has to show", () => {
  for (const totals of [[1, 2, 3], [12000, 20000, 30000], [0.02, 0.05, 0.09]]) {
    const layout = chartLayout(layoutData(totals), 400, 200);
    const widest = Array.from({ length: layout.divisions + 1 }, (_, i) =>
      formatTick(layout.step * i, layout.step)
    ).reduce((w, label) => Math.max(w, label.length), 0);
    assert.ok(layout.padLeft >= widest * 7, `inset ${layout.padLeft} too tight for ${widest} chars`);
    assert.ok(layout.padLeft <= 60, "the inset is capped");
  }
});

test("buckets divide the plot evenly", () => {
  const { plotW, slot } = chartLayout(layoutData([1, 2, 3, 4]), 400, 200);
  assert.equal(slot * 4, plotW);
});
