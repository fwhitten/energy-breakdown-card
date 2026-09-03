import { svg, type TemplateResult } from "lit";
import { labelStride } from "./periods";
import { PAD_TOP, chartLayout } from "./layout";
import { formatTick } from "./scale";
import type { ChartData } from "./types";

export interface ChartOptions {
  width: number;
  height: number;
  rounded: boolean;
  activeIndex: number | null;
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
}

export { chartLayout } from "./layout";

export function renderChart(data: ChartData, opts: ChartOptions): TemplateResult {
  const { width, height } = opts;
  const { padLeft, plotH, slot, max, divisions, step } = chartLayout(data, width, height);
  const baseline = PAD_TOP + plotH;
  const count = data.buckets.length;
  const barWidth = Math.max(2, slot * 0.62);
  const radius = opts.rounded ? Math.min(barWidth / 2, 4) : 0;
  const stride = labelStride(count);

  const y = (v: number) => baseline - (v / max) * plotH;

  const gridlines: TemplateResult[] = [];
  for (let i = 0; i <= divisions; i++) {
    const value = step * i;
    const gy = y(value);
    gridlines.push(svg`
      <line class="grid" x1=${padLeft} x2=${width} y1=${gy} y2=${gy} />
      <text class="tick" x="0" y=${gy + 4} text-anchor="start">${formatTick(value, step)}</text>
    `);
  }

  const bars = data.buckets.map((_bucket, i) => {
    const cx = padLeft + slot * i + slot / 2;
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
          x=${padLeft + slot * i}
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
    const cx = padLeft + slot * i + slot / 2;
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
