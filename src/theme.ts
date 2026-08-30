export interface Palette {
  /** One colour per stacked device, in order. */
  series: string[];
  /** Colour for the unaccounted-for remainder. */
  other: string;
}

/** Theme variables we take the base hue from, in order of preference. */
const BASE_VARS = [
  "--energy-grid-consumption-color",
  "--accent-color",
  "--primary-color",
  "--label-badge-blue"
];

const FALLBACK_BASE = "#488fc2";

interface Hsl {
  h: number;
  s: number;
  l: number;
}

function readVar(style: CSSStyleDeclaration, name: string): string {
  const value = style.getPropertyValue(name).trim();
  // An unresolved var() reference is no use to us.
  return value.startsWith("var(") ? "" : value;
}

export function parseColor(input: string): Hsl | null {
  const value = input.trim().toLowerCase();
  if (!value) return null;

  let r: number;
  let g: number;
  let b: number;

  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (hex) {
    const digits = hex[1];
    if (digits.length === 3) {
      r = parseInt(digits[0] + digits[0], 16);
      g = parseInt(digits[1] + digits[1], 16);
      b = parseInt(digits[2] + digits[2], 16);
    } else {
      r = parseInt(digits.slice(0, 2), 16);
      g = parseInt(digits.slice(2, 4), 16);
      b = parseInt(digits.slice(4, 6), 16);
    }
  } else {
    const rgb = value.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);
    if (!rgb) return null;
    r = Number(rgb[1]);
    g = Number(rgb[2]);
    b = Number(rgb[3]);
  }

  if (![r, g, b].every((c) => Number.isFinite(c))) return null;
  return rgbToHsl(r / 255, g / 255, b / 255);
}

function rgbToHsl(r: number, g: number, b: number): Hsl {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return { h, s, l };
}

export function hslToHex({ h, s, l }: Hsl): string {
  const hue = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = l - c / 2;
  const [r1, g1, b1] =
    hue < 60
      ? [c, x, 0]
      : hue < 120
        ? [x, c, 0]
        : hue < 180
          ? [0, c, x]
          : hue < 240
            ? [0, x, c]
            : hue < 300
              ? [x, 0, c]
              : [c, 0, x];
  const to = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${to(r1)}${to(g1)}${to(b1)}`;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Build a palette from the active theme rather than shipping fixed colours.
 *
 * A theme that defines `--graph-color-1` upwards wins outright. Otherwise the
 * colours are spread around the colour wheel from the theme's own accent, using
 * the golden angle so that neighbouring segments stay distinguishable however
 * many devices there are.
 */
export function buildPalette(style: CSSStyleDeclaration, count: number): Palette {
  const explicit: string[] = [];
  for (let i = 1; i <= Math.max(count, 1); i++) {
    const value = readVar(style, `--graph-color-${i}`);
    if (!value) break;
    explicit.push(value);
  }

  const base =
    BASE_VARS.map((name) => parseColor(readVar(style, name))).find((c) => c !== null) ??
    parseColor(FALLBACK_BASE)!;

  const series: string[] = [];
  for (let i = 0; i < count; i++) {
    if (explicit.length) {
      series.push(explicit[i % explicit.length]);
      continue;
    }
    series.push(
      hslToHex({
        h: base.h + i * 137.508,
        s: clamp(base.s * (i % 2 === 1 ? 0.82 : 1), 0.32, 0.92),
        l: clamp(base.l + ((i % 3) - 1) * 0.09, 0.34, 0.74)
      })
    );
  }

  // The remainder reads as "everything else", so it stays deliberately muted.
  const other =
    parseColor(readVar(style, "--graph-color-other")) !== null
      ? readVar(style, "--graph-color-other")
      : hslToHex({ h: base.h, s: 0.08, l: clamp(base.l, 0.42, 0.62) });

  return { series, other };
}

export function paletteFor(element: HTMLElement, count: number): Palette {
  try {
    return buildPalette(getComputedStyle(element), count);
  } catch {
    return buildPalette({ getPropertyValue: () => "" } as unknown as CSSStyleDeclaration, count);
  }
}
