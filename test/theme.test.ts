import test from "node:test";
import assert from "node:assert/strict";
import { buildPalette, hslToHex, parseColor } from "./lib.mjs";

function styleWith(vars: Record<string, string>) {
  return { getPropertyValue: (name: string) => vars[name] ?? "" } as unknown as CSSStyleDeclaration;
}

test("parseColor accepts the forms themes actually use", () => {
  assert.deepEqual(parseColor("#000"), { h: 0, s: 0, l: 0 });
  assert.equal(Math.round(parseColor("#ff0000")!.h), 0);
  assert.equal(Math.round(parseColor("rgb(0, 255, 0)")!.h), 120);
  assert.equal(Math.round(parseColor("rgba(0, 0, 255, 0.5)")!.h), 240);
  assert.equal(parseColor("not a colour"), null);
  assert.equal(parseColor(""), null);
});

test("hslToHex round-trips a parsed colour", () => {
  const hsl = parseColor("#488fc2")!;
  assert.equal(hslToHex(hsl), "#488fc2");
});

test("a theme's graph colours are used verbatim when it defines them", () => {
  const style = styleWith({
    "--graph-color-1": "#aa0000",
    "--graph-color-2": "#00aa00",
    "--primary-color": "#488fc2"
  });
  const palette = buildPalette(style, 4);
  // Two defined colours, cycled across four series.
  assert.deepEqual(palette.series, ["#aa0000", "#00aa00", "#aa0000", "#00aa00"]);
});

test("the palette is derived from the theme accent when no graph colours exist", () => {
  const palette = buildPalette(styleWith({ "--primary-color": "#03a9f4" }), 5);
  assert.equal(palette.series.length, 5);
  for (const colour of palette.series) assert.match(colour, /^#[0-9a-f]{6}$/);
  assert.equal(new Set(palette.series).size, 5, "series colours must be distinct");
});

test("energy grid colour takes precedence over the generic accent", () => {
  const withEnergy = buildPalette(
    styleWith({ "--energy-grid-consumption-color": "#ff0000", "--primary-color": "#0000ff" }),
    3
  );
  const withoutEnergy = buildPalette(styleWith({ "--primary-color": "#0000ff" }), 3);
  assert.notEqual(withEnergy.series[0], withoutEnergy.series[0]);
});

test("a theme with no usable variables still produces a full palette", () => {
  const palette = buildPalette(styleWith({ "--primary-color": "var(--something-else)" }), 6);
  assert.equal(palette.series.length, 6);
  assert.match(palette.other, /^#[0-9a-f]{6}$/);
});

test("the Other colour is muted relative to the device colours", () => {
  const palette = buildPalette(styleWith({ "--primary-color": "#e040fb" }), 3);
  const other = parseColor(palette.other)!;
  const first = parseColor(palette.series[0])!;
  assert.ok(other.s < first.s, "Other should be less saturated than a device colour");
});
