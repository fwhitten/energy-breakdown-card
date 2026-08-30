import test from "node:test";
import assert from "node:assert/strict";
import {
  buildBuckets,
  buildChartData,
  bucketize,
  collectSourceStats,
  statIdsForTotal,
  sumRange,
  topLevelDevices,
  OTHER_KEY
} from "./lib.mjs";

const NOW = new Date(2026, 7, 26, 23, 0);

function hourly(dayOffsets: number[]) {
  // One entry per day of the current week, aligned to the day buckets.
  const buckets = buildBuckets(NOW, "week", 1);
  return buckets.map((b, i) => ({
    start: b.start.getTime(),
    end: b.end.getTime(),
    change: dayOffsets[i] ?? 0
  }));
}

const prefs = {
  energy_sources: [
    { type: "grid", flow_from: [{ stat_energy_from: "grid_in" }], flow_to: [{ stat_energy_to: "grid_out" }] },
    { type: "solar", stat_energy_from: "solar" }
  ],
  device_consumption: [
    { stat_consumption: "dev_a", name: "Heat pump" },
    { stat_consumption: "dev_b", name: "EV charger" },
    { stat_consumption: "dev_child", name: "Sub meter", included_in_stat: "dev_a" }
  ]
};

test("sub-metered devices are excluded so nothing is double counted", () => {
  const devices = topLevelDevices(prefs);
  assert.deepEqual(devices.map((d) => d.stat_consumption), ["dev_a", "dev_b"]);
});

test("collectSourceStats splits grid, solar and battery flows", () => {
  const sources = collectSourceStats(prefs);
  assert.deepEqual(sources.gridFrom, ["grid_in"]);
  assert.deepEqual(sources.gridTo, ["grid_out"]);
  assert.deepEqual(sources.solarFrom, ["solar"]);
  assert.deepEqual(statIdsForTotal(sources, "grid"), ["grid_in"]);
  assert.equal(statIdsForTotal(sources, "home").length, 3);
  assert.deepEqual(statIdsForTotal(sources, "devices"), []);
});

test("bucketize assigns each interval to the bucket containing its start", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  const stats = { a: hourly([1, 2, 3, 0, 0, 0, 0]) };
  assert.deepEqual(bucketize(stats, ["a"], buckets), [1, 2, 3, 0, 0, 0, 0]);
});

test("bucketize ignores intervals outside the charted range", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  const stats = { a: [{ start: new Date(2020, 0, 1).getTime(), end: new Date(2020, 0, 2).getTime(), change: 99 }] };
  assert.deepEqual(bucketize(stats, ["a"], buckets), [0, 0, 0, 0, 0, 0, 0]);
});

test("sumRange prorates an interval the range ends part way through", () => {
  const start = new Date(2026, 7, 26, 0, 0);
  const stats = {
    a: [
      { start: start.getTime(), end: start.getTime() + 3600_000, change: 10 },
      { start: start.getTime() + 3600_000, end: start.getTime() + 7200_000, change: 10 }
    ]
  };
  const half = sumRange(stats, ["a"], start, new Date(start.getTime() + 5400_000));
  assert.equal(half, 15);
});

test('"Other" makes the stack add up to the grid total', () => {
  const buckets = buildBuckets(NOW, "week", 1);
  const stats = {
    grid_in: hourly([10, 10, 10, 10, 10, 10, 10]),
    dev_a: hourly([4, 4, 4, 4, 4, 4, 4]),
    dev_b: hourly([2, 2, 2, 2, 2, 2, 2])
  };
  const data = buildChartData({ prefs, stats, buckets, config: { type: "x" } });
  const other = data.series.find((s) => s.key === OTHER_KEY);
  assert.ok(other, "expected an Other series");
  assert.deepEqual(other.values, [4, 4, 4, 4, 4, 4, 4]);
  for (let i = 0; i < buckets.length; i++) {
    const stacked = data.series.reduce((sum, s) => sum + s.values[i], 0);
    assert.equal(stacked, data.totals[i]);
  }
});

test("devices measuring more than the grid total do not produce a negative Other", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  const stats = {
    grid_in: hourly([1, 1, 1, 1, 1, 1, 1]),
    dev_a: hourly([5, 5, 5, 5, 5, 5, 5]),
    dev_b: hourly([0, 0, 0, 0, 0, 0, 0])
  };
  const data = buildChartData({ prefs, stats, buckets, config: { type: "x" } });
  const other = data.series.find((s) => s.key === OTHER_KEY);
  assert.equal(other, undefined);
  assert.deepEqual(data.totals, [5, 5, 5, 5, 5, 5, 5]);
});

test("series are ordered largest first and hidden devices are dropped", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  const stats = {
    grid_in: hourly([10, 10, 10, 10, 10, 10, 10]),
    dev_a: hourly([1, 1, 1, 1, 1, 1, 1]),
    dev_b: hourly([3, 3, 3, 3, 3, 3, 3])
  };
  const data = buildChartData({ prefs, stats, buckets, config: { type: "x" } });
  assert.equal(data.series[0].name, "EV charger");

  const hidden = buildChartData({
    prefs,
    stats,
    buckets,
    config: { type: "x", devices: [{ stat: "dev_b", hidden: true }] }
  });
  assert.equal(hidden.series.some((s) => s.name === "EV charger"), false);
});

test("devices beyond max_devices are folded into Other", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  const stats = {
    grid_in: hourly([10, 10, 10, 10, 10, 10, 10]),
    dev_a: hourly([3, 3, 3, 3, 3, 3, 3]),
    dev_b: hourly([2, 2, 2, 2, 2, 2, 2])
  };
  const data = buildChartData({ prefs, stats, buckets, config: { type: "x", max_devices: 1 } });
  assert.equal(data.series.length, 2);
  assert.equal(data.series[0].name, "Heat pump");
  const other = data.series[1];
  // 2 kWh of hidden device plus the 5 kWh no device accounts for.
  assert.deepEqual(other.values, [7, 7, 7, 7, 7, 7, 7]);
});

test("name and colour overrides are applied", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  const stats = { grid_in: hourly([5, 0, 0, 0, 0, 0, 0]), dev_a: hourly([5, 0, 0, 0, 0, 0, 0]) };
  const data = buildChartData({
    prefs,
    stats,
    buckets,
    config: { type: "x", devices: [{ stat: "dev_a", name: "Boiler", color: "#123456" }] }
  });
  assert.equal(data.series[0].name, "Boiler");
  assert.equal(data.series[0].color, "#123456");
});

test("home consumption mode nets off export and adds solar", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  const stats = {
    grid_in: hourly([10, 0, 0, 0, 0, 0, 0]),
    grid_out: hourly([3, 0, 0, 0, 0, 0, 0]),
    solar: hourly([6, 0, 0, 0, 0, 0, 0]),
    dev_a: hourly([1, 0, 0, 0, 0, 0, 0])
  };
  const data = buildChartData({ prefs, stats, buckets, config: { type: "x", total_mode: "home" } });
  assert.equal(data.totals[0], 13);
});
