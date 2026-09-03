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
  anchorStart,
  normaliseChanges,
  sourceTypes,
  partitionDevices,
  totalForRange,
  OTHER_KEY
} from "./lib.mjs";

const palette = {
  series: ["#111111", "#222222", "#333333", "#444444", "#555555"],
  other: "#999999"
};

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
  const data = buildChartData({ prefs, stats, buckets, palette, config: { type: "x" } });
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
  const data = buildChartData({ prefs, stats, buckets, palette, config: { type: "x" } });
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
  const data = buildChartData({ prefs, stats, buckets, palette, config: { type: "x" } });
  assert.equal(data.series[0].name, "EV charger");

  const hidden = buildChartData({
    prefs,
    stats,
    buckets,
    palette,
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
  const data = buildChartData({ prefs, stats, buckets, palette, config: { type: "x", max_devices: 1 } });
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
    palette,
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
  const data = buildChartData({ prefs, stats, buckets, palette, config: { type: "x", total_mode: "home" } });
  assert.equal(data.totals[0], 13);
});

test("anchorStart steps back exactly one interval", () => {
  const start = new Date(2026, 7, 26, 0, 0);
  assert.equal(anchorStart(start, "hour").getHours(), 23);
  assert.equal(anchorStart(start, "day").getDate(), 25);
  assert.equal(anchorStart(start, "month").getMonth(), 6);
});

test("normaliseChanges leaves a series that already has change alone", () => {
  const input = { a: [{ start: 0, end: 1, change: 5, sum: 100 }] };
  assert.deepEqual(normaliseChanges(input).a, input.a);
});

test("normaliseChanges derives change from a running sum", () => {
  const input = {
    a: [
      { start: 0, end: 1, change: null, sum: 100 },
      { start: 1, end: 2, change: null, sum: 104 },
      { start: 2, end: 3, change: null, sum: 111 }
    ]
  };
  const out = normaliseChanges(input).a;
  // The first entry is the anchor: it has no predecessor to difference against.
  assert.deepEqual(out.map((e) => e.change), [0, 4, 7]);
});

test("normaliseChanges copes with an empty or absent series", () => {
  assert.deepEqual(normaliseChanges({ a: [] }).a, []);
});

test("a sum-only source still produces a total and an Other segment", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  let running = 1000;
  const gridEntries = [{ start: buckets[0].start.getTime() - 86400_000, end: buckets[0].start.getTime(), change: null, sum: running }];
  for (const b of buckets) {
    running += 10;
    gridEntries.push({ start: b.start.getTime(), end: b.end.getTime(), change: null, sum: running });
  }
  const stats = normaliseChanges({ grid_in: gridEntries, dev_a: hourly([4, 4, 4, 4, 4, 4, 4]) });
  const data = buildChartData({ prefs, stats, buckets, palette, config: { type: "x" } });
  const other = data.series.find((s) => s.key === OTHER_KEY);
  assert.ok(other, "expected an Other series");
  assert.deepEqual(other.values, [6, 6, 6, 6, 6, 6, 6]);
  assert.deepEqual(data.totals, [10, 10, 10, 10, 10, 10, 10]);
});

test("a grid source carrying the statistic directly is still found", () => {
  const direct = {
    energy_sources: [{ type: "grid", stat_energy_from: "grid_direct" }],
    device_consumption: []
  };
  assert.deepEqual(collectSourceStats(direct).gridFrom, ["grid_direct"]);
});

test("flow lists take precedence over a statistic on the source", () => {
  const both = {
    energy_sources: [
      { type: "grid", stat_energy_from: "ignored", flow_from: [{ stat_energy_from: "grid_in" }] }
    ],
    device_consumption: []
  };
  assert.deepEqual(collectSourceStats(both).gridFrom, ["grid_in"]);
});

test("malformed flow entries are skipped rather than throwing", () => {
  const messy = {
    energy_sources: [
      { type: "grid", flow_from: [null, {}, { stat_energy_from: "grid_in" }], flow_to: [null] }
    ],
    device_consumption: []
  } as never;
  assert.deepEqual(collectSourceStats(messy).gridFrom, ["grid_in"]);
});

test("sourceTypes lists what the configuration actually contains", () => {
  assert.deepEqual(sourceTypes(prefs), ["grid", "solar"]);
  assert.deepEqual(sourceTypes({ energy_sources: [], device_consumption: [] }), []);
});

test("hiding a device does not recolour the ones left", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  const stats = {
    grid_in: hourly([10, 10, 10, 10, 10, 10, 10]),
    dev_a: hourly([1, 1, 1, 1, 1, 1, 1]),
    dev_b: hourly([3, 3, 3, 3, 3, 3, 3])
  };
  const before = buildChartData({ prefs, stats, buckets, palette, config: { type: "x" } });
  const after = buildChartData({
    prefs,
    stats,
    buckets,
    palette,
    config: { type: "x", devices: [{ stat: "dev_a", hidden: true }] }
  });
  const colourOf = (data, name) => data.series.find((s) => s.name === name)?.color;
  assert.equal(colourOf(after, "EV charger"), colourOf(before, "EV charger"));
});

test("an excluded device comes off the total and out of the stack", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  const stats = {
    grid_in: hourly([10, 10, 10, 10, 10, 10, 10]),
    dev_a: hourly([4, 4, 4, 4, 4, 4, 4]),
    dev_b: hourly([2, 2, 2, 2, 2, 2, 2])
  };
  const data = buildChartData({
    prefs,
    stats,
    buckets,
    palette,
    config: { type: "x", devices: [{ stat: "dev_b", excluded: true }] }
  });
  assert.equal(data.series.some((s) => s.name === "EV charger"), false);
  // 10 grid less the 2 excluded.
  assert.deepEqual(data.totals, [8, 8, 8, 8, 8, 8, 8]);
  const other = data.series.find((s) => s.key === OTHER_KEY);
  assert.deepEqual(other.values, [4, 4, 4, 4, 4, 4, 4]);
});

test("totalForRange subtracts excluded devices from a source total", () => {
  const start = new Date(2026, 7, 26, 0, 0);
  const end = new Date(2026, 7, 26, 2, 0);
  const entry = (id, v) => [
    { start: start.getTime(), end: start.getTime() + 3600_000, change: v },
    { start: start.getTime() + 3600_000, end: start.getTime() + 7200_000, change: v }
  ];
  const stats = { grid_in: entry("grid_in", 10), dev_b: entry("dev_b", 3) };
  const sources = collectSourceStats(prefs);
  assert.equal(totalForRange(stats, sources, "grid", start, end, ["dev_b"], []), 20);
  assert.equal(totalForRange(stats, sources, "grid", start, end, [], ["dev_b"]), 14);
});

test("partitionDevices separates hidden, excluded and shown devices", () => {
  const part = partitionDevices(prefs, {
    type: "x",
    devices: [
      { stat: "dev_a", hidden: true },
      { stat: "dev_b", excluded: true }
    ]
  });
  assert.deepEqual(part.all.map((d) => d.stat_consumption), ["dev_a", "dev_b"]);
  assert.deepEqual(part.visible, []);
  assert.deepEqual(part.excludedIds, ["dev_b"]);
  // Colour slots follow the full list, not what survives filtering.
  assert.equal(part.colorIndex.get("dev_b"), 1);
});

test("the total and the legend are computed from the same buckets", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  // A part-finished final bucket, as the in-progress day always is.
  const stats = {
    grid_in: hourly([10, 10, 10, 10, 10, 10, 3]),
    dev_a: hourly([4, 4, 4, 4, 4, 4, 1]),
    dev_b: hourly([2, 2, 2, 2, 2, 2, 0])
  };
  const data = buildChartData({ prefs, stats, buckets, palette, config: { type: "x" } });
  const headline = data.totals.reduce((a, b) => a + b, 0);
  const legend = data.series.reduce((sum, s) => sum + s.total, 0);
  assert.equal(headline, legend);
  assert.equal(headline, 63);
});

test("with sum-of-devices totals the headline equals the devices shown", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  const stats = {
    grid_in: hourly([50, 50, 50, 50, 50, 50, 50]),
    dev_a: hourly([4, 4, 4, 4, 4, 4, 1]),
    dev_b: hourly([2, 2, 2, 2, 2, 2, 0])
  };
  const data = buildChartData({
    prefs,
    stats,
    buckets,
    palette,
    config: { type: "x", total_mode: "devices", show_other: false, devices: [{ stat: "dev_b", hidden: true }] }
  });
  assert.deepEqual(data.series.map((s) => s.name), ["Heat pump"]);
  assert.equal(
    data.totals.reduce((a, b) => a + b, 0),
    data.series[0].total
  );
  assert.equal(data.series[0].total, 25);
});

test("sourceTotals stays zero when the source reported nothing", () => {
  const buckets = buildBuckets(NOW, "week", 1);
  const stats = { dev_a: hourly([4, 4, 4, 4, 4, 4, 4]) };
  const data = buildChartData({ prefs, stats, buckets, palette, config: { type: "x" } });
  assert.deepEqual(data.sourceTotals, [0, 0, 0, 0, 0, 0, 0]);
  // The drawn totals still carry the stack, so the chart is not blank.
  assert.deepEqual(data.totals, [4, 4, 4, 4, 4, 4, 4]);
});
