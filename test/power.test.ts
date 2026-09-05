import test from "node:test";
import assert from "node:assert/strict";
import {
  bucketSamples,
  buildPaths,
  collectPowerSources,
  colorAt,
  combineSeries,
  formatPower,
  gradientStops,
  normaliseThresholds,
  parseHistory,
  powerDevices,
  powerLayout,
  readPower,
  readSources,
  toWatts,
  usesStatistics
} from "./lib.mjs";

const prefs = {
  energy_sources: [
    {
      type: "grid",
      stat_energy_from: "sensor.grid_in",
      stat_rate: "sensor.grid_power"
    },
    { type: "solar", stat_energy_from: "sensor.solar", stat_rate: "sensor.solar_power" }
  ],
  device_consumption: [
    { stat_consumption: "sensor.lights_energy", stat_rate: "sensor.lights_power", name: "Lights" },
    { stat_consumption: "sensor.tv_energy", name: "TV" },
    {
      stat_consumption: "sensor.sub_energy",
      stat_rate: "sensor.sub_power",
      included_in_stat: "sensor.lights_energy"
    }
  ]
};

test("grid power comes from the Energy dashboard's rate entity", () => {
  const sources = collectPowerSources(prefs, "grid");
  assert.deepEqual(sources.positive, [{ entity: "sensor.grid_power" }]);
  assert.deepEqual(sources.negative, []);
});

test("home mode adds solar to the grid", () => {
  const sources = collectPowerSources(prefs, "home");
  assert.deepEqual(
    sources.positive.map((s) => s.entity),
    ["sensor.grid_power", "sensor.solar_power"]
  );
});

test("a two-sensor power config subtracts the export direction", () => {
  const twoWay = {
    energy_sources: [
      {
        type: "grid",
        power_config: { stat_rate_from: "sensor.import", stat_rate_to: "sensor.export" }
      }
    ],
    device_consumption: []
  };
  const sources = collectPowerSources(twoWay, "grid");
  assert.deepEqual(sources.positive, [{ entity: "sensor.import" }]);
  assert.deepEqual(sources.negative, [{ entity: "sensor.export" }]);
});

test("an inverted power sensor is flagged for flipping", () => {
  const inverted = {
    energy_sources: [{ type: "grid", power_config: { stat_rate_inverted: "sensor.p" } }],
    device_consumption: []
  };
  assert.deepEqual(collectPowerSources(inverted, "grid").positive, [
    { entity: "sensor.p", invert: true }
  ]);
});

test("devices pair with their power entity, sub-meters excluded", () => {
  const devices = powerDevices(prefs, { type: "x" });
  assert.deepEqual(
    devices.map((d) => [d.name, d.entity]),
    [
      ["Lights", "sensor.lights_power"],
      ["TV", undefined]
    ]
  );
});

test("a configured override replaces the dashboard's power entity", () => {
  const devices = powerDevices(prefs, {
    type: "x",
    devices: [{ stat: "sensor.tv_energy", power_entity: "sensor.tv_power" }]
  });
  assert.equal(devices[1].entity, "sensor.tv_power");
});

test("units are normalised to watts", () => {
  assert.equal(toWatts(1.5, "kW"), 1500);
  assert.equal(toWatts(230, "W"), 230);
  assert.equal(toWatts(230, undefined), 230);
});

test("readPower converts units and refuses unusable states", () => {
  const hass = {
    states: {
      "sensor.a": { state: "2.4", attributes: { unit_of_measurement: "kW" } },
      "sensor.b": { state: "unavailable", attributes: {} },
      "sensor.c": { state: "not a number", attributes: {} }
    }
  };
  assert.equal(readPower(hass, "sensor.a"), 2400);
  assert.equal(readPower(hass, "sensor.b"), null);
  assert.equal(readPower(hass, "sensor.c"), null);
  assert.equal(readPower(hass, "sensor.missing"), null);
  assert.equal(readPower(hass, undefined), null);
});

test("readSources nets the two directions and honours inversion", () => {
  const hass = {
    states: {
      "sensor.import": { state: "1000", attributes: { unit_of_measurement: "W" } },
      "sensor.export": { state: "300", attributes: { unit_of_measurement: "W" } },
      "sensor.inv": { state: "-800", attributes: { unit_of_measurement: "W" } }
    }
  };
  assert.equal(
    readSources(hass, { positive: [{ entity: "sensor.import" }], negative: [{ entity: "sensor.export" }] }),
    700
  );
  assert.equal(readSources(hass, { positive: [{ entity: "sensor.inv", invert: true }], negative: [] }), 800);
  assert.equal(readSources(hass, { positive: [{ entity: "sensor.gone" }], negative: [] }), null);
});

test("the history window switches to statistics past six hours", () => {
  assert.equal(usesStatistics(3), false);
  assert.equal(usesStatistics(6), false);
  assert.equal(usesStatistics(24), true);
});

test("history parses both compressed and long-form entries", () => {
  const samples = parseHistory(
    [
      { s: "100", lu: 1_700_000_000 },
      { state: "200", last_updated: "2023-11-14T22:14:00.000Z" },
      { s: "unavailable", lu: 1_700_000_060 }
    ],
    "W"
  );
  assert.equal(samples.length, 3);
  assert.equal(samples[0].v, 100);
  assert.ok(samples.every((s) => Number.isFinite(s.t)));
  assert.equal(samples[samples.length - 1].v, null);
});

test("history values are converted from the sensor's unit", () => {
  const samples = parseHistory([{ s: "1.5", lu: 1_700_000_000 }], "kW");
  assert.equal(samples[0].v, 1500);
});

test("buckets carry the last reading forward across quiet stretches", () => {
  const start = 0;
  const end = 4000;
  const samples = [
    { t: -500, v: 50 },
    { t: 1500, v: 100 }
  ];
  // Four buckets of 1000ms: the first inherits the pre-window reading, the
  // second takes the new one, and the rest hold it.
  assert.deepEqual(bucketSamples(samples, start, end, 4), [50, 100, 100, 100]);
});

test("an unavailable reading leaves a gap rather than a zero", () => {
  const samples = [
    { t: 100, v: 80 },
    { t: 1100, v: null }
  ];
  assert.deepEqual(bucketSamples(samples, 0, 3000, 3), [80, null, null]);
});

test("buckets average several readings that land together", () => {
  const samples = [
    { t: 100, v: 100 },
    { t: 200, v: 300 }
  ];
  assert.deepEqual(bucketSamples(samples, 0, 1000, 1), [200]);
});

test("combineSeries nets positive and negative series", () => {
  const net = combineSeries([[100, 200, null]], [[40, null, 10]], 3);
  assert.deepEqual(net, [60, 200, -10]);
});

test("combineSeries reports a gap only when nothing is known", () => {
  assert.deepEqual(combineSeries([[null]], [[null]], 1), [null]);
});

test("thresholds are sorted and sanitised", () => {
  const list = normaliseThresholds([
    { value: 4000, color: "#f00" },
    { value: -5, color: "#0f0" },
    { value: 1000, color: "" }
  ]);
  assert.deepEqual(
    list.map((t) => t.value),
    [0, 4000]
  );
});

test("gradient stops span the whole plot", () => {
  const stops = gradientStops([{ value: 1000, color: "#abc" }], 4000);
  assert.equal(stops[0].offset, 0);
  assert.equal(stops[stops.length - 1].offset, 1);
});

test("colours interpolate between thresholds", () => {
  const thresholds = [
    { value: 0, color: "#000000" },
    { value: 100, color: "#ffffff" }
  ];
  assert.equal(colorAt(thresholds, 0), "#000000");
  assert.equal(colorAt(thresholds, 100), "#ffffff");
  assert.equal(colorAt(thresholds, 50), "#808080");
  assert.equal(colorAt(thresholds, 500), "#ffffff");
});

test("power is formatted in watts then kilowatts", () => {
  assert.equal(formatPower(117, "en-GB"), "117 W");
  assert.equal(formatPower(3, "en-GB"), "3 W");
  assert.equal(formatPower(0.42, "en-GB"), "0.42 W");
  assert.equal(formatPower(1500, "en-GB"), "1.5 kW");
  assert.equal(formatPower(1534, "en-GB"), "1.53 kW");
  assert.equal(formatPower(0, "en-GB"), "0 W");
  assert.equal(formatPower(12500, "en-GB"), "12.5 kW");
  assert.equal(formatPower(null), "—");
});

test("the axis fits the window's peak when no maximum is set", () => {
  const layout = powerLayout([100, 900, 400], 400, 200, { showAxes: true });
  assert.ok(layout.max >= 900, `axis ${layout.max} must contain the peak`);
  assert.equal(layout.padLeft + layout.plotW, 400);
});

test("a configured axis maximum overrides the fit", () => {
  const layout = powerLayout([100, 900], 400, 200, { showAxes: true, yMax: 5000 });
  assert.equal(layout.max, 5000);
});

test("hiding the axes gives the plot the full width", () => {
  const layout = powerLayout([100, 900], 400, 200, { showAxes: false });
  assert.equal(layout.padLeft, 0);
  assert.equal(layout.plotW, 400);
});

test("gaps break the line into separate paths", () => {
  const values = [100, null, 200];
  const layout = powerLayout(values, 300, 200, { showAxes: false });
  const paths = buildPaths(values, layout, false);
  // One move command per unbroken run.
  assert.equal((paths.line.match(/M /g) ?? []).length, 2);
  assert.equal((paths.area.match(/M /g) ?? []).length, 2);
});

test("a step line holds each reading until the next", () => {
  const values = [100, 200];
  const layout = powerLayout(values, 200, 100, { showAxes: false });
  const stepped = buildPaths(values, layout, false);
  const smooth = buildPaths(values, layout, true);
  // Stepping emits two points per reading, smoothing one.
  assert.equal((stepped.line.match(/L /g) ?? []).length, 3);
  assert.equal((smooth.line.match(/L /g) ?? []).length, 1);
});

test("the axis does not overshoot a modest peak", () => {
  // A 205 W peak used to produce a 400 W axis, leaving half the card empty.
  const layout = powerLayout([120, 205, 90], 400, 240, { showAxes: true });
  assert.ok(layout.max >= 205, "the peak must fit");
  assert.ok(layout.max <= 260, `axis ${layout.max} leaves too much dead space`);
});

test("the axis still clears the line it contains", () => {
  for (const peak of [95, 200, 999, 3300, 7400]) {
    const layout = powerLayout([peak], 400, 240, { showAxes: true });
    assert.ok(layout.max > peak, `${layout.max} should sit above ${peak}`);
    assert.ok(layout.max < peak * 1.5, `${layout.max} is too much room above ${peak}`);
  }
});

test("the fill may sit below the line's zero", () => {
  const layout = powerLayout([100, 200], 400, 240, { showAxes: false, extraBottom: 60 });
  assert.equal(layout.areaBottom - layout.baseline, 60);
  assert.equal(layout.areaBottom, 240);
  // The plot itself has given up that height, so the line stays above it.
  assert.ok(layout.baseline <= 180, `baseline ${layout.baseline} is inside the bleed`);
});

test("with nothing bleeding the fill closes on the baseline", () => {
  const layout = powerLayout([100, 200], 400, 240, { showAxes: false });
  assert.equal(layout.areaBottom, layout.baseline);
});

test("the line never dips below its zero, but the fill reaches the bottom", () => {
  const values = [0, 500];
  const layout = powerLayout(values, 200, 240, { showAxes: false, extraBottom: 60 });
  const paths = buildPaths(values, layout, false);
  const lineYs = [...paths.line.matchAll(/[ML] [\d.-]+ ([\d.-]+)/g)].map((m) => Number(m[1]));
  const areaYs = [...paths.area.matchAll(/[ML] [\d.-]+ ([\d.-]+)/g)].map((m) => Number(m[1]));
  assert.ok(Math.max(...lineYs) <= layout.baseline, "the line stops at the baseline");
  assert.ok(Math.max(...areaYs) === layout.areaBottom, "the fill closes at the bottom");
});
