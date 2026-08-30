import { svg, type TemplateResult } from "lit";
import { labelStride } from "./periods";
import { GRID_LINES, formatTick, niceMax } from "./scale";
import type { ChartData } from "./types";

export interface ChartOptions {
  width: number;
  height: number;
  rounded: boolean;
  unit: string;
  activeIndex: number | null;
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
}

export const CHART_PAD = { left: 38, right: 6, top: 10, bottom: 22 };

const PAD_LEFT = CHART_PAD.left;
const PAD_RIGHT = CHART_PAD.right;
const PAD_TOP = CHART_PAD.top;
const PAD_BOTTOM = CHART_PAD.bottom;


export function renderChart(data: ChartData, opts: ChartOptions): TemplateResult {
  const { width, height } = opts;
  const plotW = Math.max(1, width - PAD_LEFT - PAD_RIGHT);
  const plotH = Math.max(1, height - PAD_TOP - PAD_BOTTOM);
  const baseline = PAD_TOP + plotH;
  const count = data.buckets.length;
  const max = niceMax(Math.max(...data.totals, 0));
  const slot = plotW / Math.max(1, count);
  const barWidth = Math.max(2, slot * 0.62);
  const radius = opts.rounded ? Math.min(barWidth / 2, 14) : 0;
  const stride = labelStride(count);

  const y = (v: number) => baseline - (v / max) * plotH;

  const gridlines: TemplateResult[] = [];
  for (let i = 0; i <= GRID_LINES; i++) {
    const step = max / GRID_LINES;
    const value = step * i;
    const gy = y(value);
    gridlines.push(svg`
      <line class="grid" x1=${PAD_LEFT} x2=${PAD_LEFT + plotW} y1=${gy} y2=${gy} />
      <text class="tick" x=${PAD_LEFT - 8} y=${gy + 4} text-anchor="end">
        ${i === 0 ? opts.unit : formatTick(value, step)}
      </text>
    `);
  }

  const bars = data.buckets.map((_bucket, i) => {
    const cx = PAD_LEFT + slot * i + slot / 2;
    const x = cx - barWidth / 2;
    const total = data.totals[i];
    const barTop = y(total);
    const barHeight = Math.max(0, baseline - barTop);
    const clipId = `clip-${i}`;
    const dimmed = opts.activeIndex !== null && opts.activeIndex !== i;

    let cursor = baseline;
    const segments = data.series.map((s) => {
      const value = s.values[i];
      const h = (value / max) * plotH;
      const segY = cursor - h;
      cursor = segY;
      if (h <= 0) return svg``;
      return svg`<rect x=${x} y=${segY} width=${barWidth} height=${h} fill=${s.color} />`;
    });

    // Any consumption the series do not account for keeps the bar height honest.
    const unaccounted = cursor - barTop;

    return svg`
      <g class=${dimmed ? "bar dimmed" : "bar"}>
        <defs>
          <clipPath id=${clipId}>
            <rect x=${x} y=${barTop} width=${barWidth} height=${barHeight + radius} rx=${radius} ry=${radius} />
          </clipPath>
        </defs>
        <g clip-path=${`url(#${clipId})`}>
          ${barHeight > 0 ? svg`<rect x=${x} y=${barTop} width=${barWidth} height=${barHeight} fill="var(--ebc-empty-bar)" />` : svg``}
          ${segments}
          ${unaccounted > 0.5 ? svg`<rect x=${x} y=${barTop} width=${barWidth} height=${unaccounted} fill="var(--ebc-empty-bar)" />` : svg``}
        </g>
        <rect
          class="hit"
          x=${PAD_LEFT + slot * i}
          y=${PAD_TOP}
          width=${slot}
          height=${plotH}
          @pointerenter=${() => opts.onHover(i)}
          @pointerleave=${() => opts.onHover(null)}
          @click=${() => opts.onSelect(i)}
        />
      </g>
    `;
  });

  const labels = data.buckets.map((bucket, i) => {
    if (i % stride !== 0) return svg``;
    const cx = PAD_LEFT + slot * i + slot / 2;
    return svg`<text class="xlabel" x=${cx} y=${height - 6} text-anchor="middle">${bucket.label}</text>`;
  });

  return svg`
    <svg
      viewBox=${`0 0 ${width} ${height}`}
      width=${width}
      height=${height}
      role="img"
      aria-label="Energy consumption by period"
    >
      ${gridlines}
      ${bars}
      ${labels}
    </svg>
  `;
}
