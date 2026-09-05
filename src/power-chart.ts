import { svg, type TemplateResult } from "lit";
import { POWER_PAD_TOP, buildPaths, powerLayout, timeTicks } from "./power-layout";
import { gradientStops } from "./thresholds";
import type { Threshold } from "./types";

export interface PowerChartOptions {
  width: number;
  height: number;
  values: (number | null)[];
  start: number;
  end: number;
  thresholds: Threshold[];
  yMax?: number;
  showAxes: boolean;
  smooth: boolean;
  lineWidth: number;
  language?: string;
  /** Unique per card, so several cards on a page do not share a gradient. */
  gradientId: string;
}

export function renderPowerChart(opts: PowerChartOptions): TemplateResult {
  const { width, height, values } = opts;
  const layout = powerLayout(values, width, height, {
    showAxes: opts.showAxes,
    yMax: opts.yMax,
    language: opts.language
  });
  const { padLeft, plotH, baseline, max } = layout;
  const paths = buildPaths(values, layout, opts.smooth);
  const stops = gradientStops(opts.thresholds, max);
  const areaId = `${opts.gradientId}-area`;

  const gridlines = layout.ticks.map((tick) => {
    const gy = baseline - (tick.value / max) * plotH;
    return svg`
      <line class="grid" x1=${padLeft} x2=${width} y1=${gy} y2=${gy} />
      <text class="tick" x="0" y=${gy + 4} text-anchor="start">${tick.label}</text>
    `;
  });

  const xLabels = opts.showAxes
    ? timeTicks(opts.start, opts.end, layout.plotW).map(({ offset, t }) => {
        const x = padLeft + layout.plotW * offset;
        const anchor = offset === 0 ? "start" : offset === 1 ? "end" : "middle";
        return svg`
          <text class="xlabel" x=${x} y=${height - 5} text-anchor=${anchor}>
            ${new Date(t).toLocaleTimeString(opts.language, {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </text>
        `;
      })
    : [];

  return svg`
    <svg
      viewBox=${`0 0 ${width} ${height}`}
      width=${width}
      height=${height}
      role="img"
      aria-label="Power consumption over time"
    >
      <defs>
        <linearGradient
          id=${opts.gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1=${baseline}
          x2="0"
          y2=${POWER_PAD_TOP}
        >
          ${stops.map((s) => svg`<stop offset=${s.offset} stop-color=${s.color} />`)}
        </linearGradient>
        <linearGradient
          id=${areaId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1=${baseline}
          x2="0"
          y2=${POWER_PAD_TOP}
        >
          ${stops.map(
            (s) => svg`<stop offset=${s.offset} stop-color=${s.color} stop-opacity="0.28" />`
          )}
        </linearGradient>
      </defs>
      ${gridlines}
      ${paths.area ? svg`<path class="area" d=${paths.area} fill=${`url(#${areaId})`} />` : svg``}
      ${paths.line
        ? svg`<path
            class="line"
            d=${paths.line}
            fill="none"
            stroke=${`url(#${opts.gradientId})`}
            stroke-width=${opts.lineWidth}
          />`
        : svg``}
      ${xLabels}
    </svg>
  `;
}
