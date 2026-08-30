import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CARD_NAME, EDITOR_NAME, PERIOD_LABEL, PREVIOUS_LABEL, ALL_PERIODS } from "./const";
import { CHART_PAD, renderChart } from "./chart";
import { formatEnergy, formatPercent } from "./format";
import {
  buildChartData,
  collectSourceStats,
  fetchPrefs,
  fetchStatistics,
  statIdsForTotal,
  topLevelDevices,
  totalForRange
} from "./energy";
import {
  buildBuckets,
  comparisonRange,
  currentRange,
  elapsedFraction,
  endOfPeriod,
  resolveFirstDayOfWeek,
  startOfPeriod,
  statsPeriodFor
} from "./periods";
import type {
  ChartData,
  ComparisonMode,
  EnergyBreakdownCardConfig,
  HomeAssistant,
  Period,
  TotalMode
} from "./types";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

@customElement(CARD_NAME)
export class EnergyBreakdownCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: EnergyBreakdownCardConfig;
  @state() private _period: Period = "week";
  @state() private _data?: ChartData;
  @state() private _total = 0;
  @state() private _comparison: number | null = null;
  @state() private _error?: string;
  @state() private _loading = true;
  @state() private _width = 0;
  @state() private _hover: number | null = null;

  private _resizeObserver?: ResizeObserver;
  private _timer?: number;
  private _fetchToken = 0;

  public static async getConfigElement(): Promise<HTMLElement> {
    await import("./editor");
    return document.createElement(EDITOR_NAME);
  }

  public static getStubConfig(): EnergyBreakdownCardConfig {
    return {
      type: `custom:${CARD_NAME}`,
      icon: "mdi:lightning-bolt",
      label: "Used",
      periods: ["day", "week", "month", "year"],
      default_period: "week",
      show_comparison: true,
      show_legend: true
    };
  }

  public setConfig(config: EnergyBreakdownCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    const periods = (config.periods?.length ? config.periods : ALL_PERIODS).filter((p) =>
      ALL_PERIODS.includes(p)
    );
    if (!periods.length) throw new Error("At least one time period must be enabled");
    this._config = { ...config, periods };
    const preferred = config.default_period && periods.includes(config.default_period)
      ? config.default_period
      : periods[0];
    this._period = preferred;
    this._loading = true;
    void this._load();
  }

  public getCardSize(): number {
    return 6;
  }

  public getGridOptions(): Record<string, number> {
    return { rows: 6, columns: 12, min_rows: 4, min_columns: 6 };
  }

  /** Older sections implementations read this name instead. */
  public getLayoutOptions(): Record<string, number> {
    return { grid_rows: 6, grid_columns: 12, grid_min_rows: 4, grid_min_columns: 6 };
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) this._width = Math.floor(entry.contentRect.width);
    });
    this._timer = window.setInterval(() => void this._load(), REFRESH_INTERVAL_MS);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    if (this._timer) window.clearInterval(this._timer);
    this._timer = undefined;
  }

  protected override firstUpdated(): void {
    const container = this.renderRoot.querySelector(".chart");
    if (container && this._resizeObserver) this._resizeObserver.observe(container);
  }

  protected override updated(changed: PropertyValues): void {
    if (changed.has("hass") && !changed.get("hass") && this.hass) void this._load();
  }

  private get _firstDayOfWeek(): 0 | 1 {
    return resolveFirstDayOfWeek(
      this._config?.first_day_of_week,
      this.hass?.locale?.language ?? this.hass?.language
    );
  }

  private async _load(): Promise<void> {
    const hass = this.hass;
    const config = this._config;
    if (!hass || !config) return;
    const token = ++this._fetchToken;

    try {
      const prefs = await fetchPrefs(hass);
      const mode: TotalMode = config.total_mode ?? "grid";
      const period = this._period;
      const fdow = this._firstDayOfWeek;
      const now = new Date();
      const buckets = buildBuckets(now, period, fdow);
      const { start, end } = currentRange(now, period, fdow);
      const statsPeriod = statsPeriodFor(period);

      const devices = topLevelDevices(prefs);
      const deviceIds = devices.map((d) => d.stat_consumption);
      const sources = collectSourceStats(prefs);
      const totalIds = statIdsForTotal(sources, mode);

      if (!deviceIds.length && !totalIds.length) {
        throw new Error("No energy sources or devices are configured in the Energy dashboard.");
      }

      const ids = Array.from(new Set([...deviceIds, ...totalIds]));
      const stats = await fetchStatistics(hass, ids, start, end, statsPeriod);
      if (token !== this._fetchToken) return;

      const data = buildChartData({ prefs, stats, buckets, config });
      const total = totalForRange(stats, sources, mode, start, now, deviceIds);

      let comparison: number | null = null;
      if (config.show_comparison !== false) {
        comparison = await this._loadComparison(hass, {
          now,
          period,
          fdow,
          mode,
          sources,
          deviceIds,
          totalIds,
          statsPeriod,
          current: total
        });
        if (token !== this._fetchToken) return;
      }

      this._data = data;
      this._total = total;
      this._comparison = comparison;
      this._error = undefined;
      this._loading = false;
    } catch (err) {
      if (token !== this._fetchToken) return;
      this._error = err instanceof Error ? err.message : String(err);
      this._loading = false;
    }
  }

  private async _loadComparison(
    hass: HomeAssistant,
    args: {
      now: Date;
      period: Period;
      fdow: 0 | 1;
      mode: TotalMode;
      sources: ReturnType<typeof collectSourceStats>;
      deviceIds: string[];
      totalIds: string[];
      statsPeriod: ReturnType<typeof statsPeriodFor>;
      current: number;
    }
  ): Promise<number | null> {
    const config = this._config!;
    const mode: ComparisonMode = config.comparison_mode ?? "like_for_like";
    const range = comparisonRange(args.now, args.period, mode, args.fdow);
    const prevPeriodStart = startOfPeriod(range.start, args.period, args.fdow);
    const fetchEnd = endOfPeriod(prevPeriodStart, args.period);

    const ids = args.mode === "devices" ? args.deviceIds : args.totalIds;
    if (!ids.length) return null;

    const stats = await fetchStatistics(hass, ids, prevPeriodStart, fetchEnd, args.statsPeriod);
    const previous = totalForRange(
      stats,
      args.sources,
      args.mode,
      range.start,
      range.end,
      args.deviceIds
    );
    if (previous <= 0) return null;

    const current =
      mode === "projected"
        ? args.current / elapsedFraction(args.now, args.period, args.fdow)
        : args.current;
    return ((current - previous) / previous) * 100;
  }

  private _cyclePeriod(): void {
    const periods = this._config?.periods ?? ALL_PERIODS;
    const index = periods.indexOf(this._period);
    this._period = periods[(index + 1) % periods.length];
    this._hover = null;
    this._loading = true;
    void this._load();
  }

  private _comparisonText(): string {
    const mode: ComparisonMode = this._config?.comparison_mode ?? "like_for_like";
    const previous = PREVIOUS_LABEL[this._period];
    if (mode === "projected") return `projected vs ${previous}`;
    return `vs ${previous}`;
  }

  protected override render(): TemplateResult | typeof nothing {
    const config = this._config;
    if (!config) return nothing;

    return html`
      <ha-card>
        <div class="root">
          <div class="header">
            <div class="summary">
              ${config.icon
                ? html`<ha-icon class="icon" .icon=${config.icon}></ha-icon>`
                : nothing}
              <div class="figures">
                <div class="value">
                  <span class="number">${formatEnergy(this._total, this.hass?.locale?.language)}</span>
                  <span class="unit">kWh</span>
                </div>
                ${config.label ? html`<div class="label">${config.label}</div>` : nothing}
                ${this._renderComparison()}
              </div>
            </div>
            <button
              class="period"
              @click=${this._cyclePeriod}
              aria-label=${`Time period: ${PERIOD_LABEL[this._period]}. Click to change.`}
            >
              ${PERIOD_LABEL[this._period]}
            </button>
          </div>
          ${this._renderBody()}
          ${config.show_legend !== false ? this._renderLegend() : nothing}
        </div>
      </ha-card>
    `;
  }

  private _renderComparison(): TemplateResult | typeof nothing {
    if (this._config?.show_comparison === false) return nothing;
    if (this._comparison === null) return nothing;
    const direction = this._comparison > 0 ? "up" : this._comparison < 0 ? "down" : "flat";
    return html`
      <div class="comparison ${direction}">
        <span class="delta">${formatPercent(this._comparison)}</span>
        <span class="against">${this._comparisonText()}</span>
      </div>
    `;
  }

  private _renderBody(): TemplateResult {
    if (this._error) {
      return html`<div class="chart error"><div class="message">${this._error}</div></div>`;
    }
    const height = this._config?.chart_height ?? 200;
    const data = this._data;
    return html`
      <div class="chart" style=${`height:${height}px`}>
        ${data && this._width > 0
          ? renderChart(data, {
              width: this._width,
              height,
              rounded: this._config?.rounded_bars !== false,
              unit: "kWh",
              activeIndex: this._hover,
              onHover: (i) => {
                this._hover = i;
              },
              onSelect: (i) => {
                this._hover = this._hover === i ? null : i;
              }
            })
          : html`<div class="message">${this._loading ? "Loading…" : ""}</div>`}
        ${this._renderTooltip()}
      </div>
    `;
  }

  private _renderTooltip(): TemplateResult | typeof nothing {
    const data = this._data;
    const index = this._hover;
    if (!data || index === null || !this._width) return nothing;
    const bucket = data.buckets[index];
    if (!bucket) return nothing;

    const plotW = Math.max(1, this._width - CHART_PAD.left - CHART_PAD.right);
    const slot = plotW / Math.max(1, data.buckets.length);
    const centre = CHART_PAD.left + slot * index + slot / 2;
    const half = 90;
    const left = Math.min(Math.max(centre, half), Math.max(half, this._width - half));
    const rows = data.series.filter((s) => s.values[index] > 0);

    return html`
      <div class="tooltip" style=${`left:${left}px`}>
        <div class="tt-head">
          <span>${this._tooltipTitle(bucket.start)}</span>
          <span class="tt-total">${formatEnergy(data.totals[index])} kWh</span>
        </div>
        ${rows.length
          ? rows.map(
              (s) => html`
                <div class="tt-row">
                  <span class="swatch" style=${`background:${s.color}`}></span>
                  <span class="tt-name">${s.name}</span>
                  <span class="tt-value">${formatEnergy(s.values[index])}</span>
                </div>
              `
            )
          : html`<div class="tt-row tt-empty">No consumption</div>`}
      </div>
    `;
  }

  private _tooltipTitle(start: Date): string {
    const language = this.hass?.locale?.language;
    switch (this._period) {
      case "day":
        return start.toLocaleTimeString(language, { hour: "2-digit", minute: "2-digit" });
      case "week":
        return start.toLocaleDateString(language, { weekday: "long" });
      case "month":
        return start.toLocaleDateString(language, { day: "numeric", month: "short" });
      case "year":
        return start.toLocaleDateString(language, { month: "long" });
    }
  }

  private _renderLegend(): TemplateResult | typeof nothing {
    const data = this._data;
    if (!data || !data.series.length) return nothing;
    return html`
      <div class="legend">
        ${data.series.map(
          (s) => html`
            <div class="legend-item">
              <span class="swatch" style=${`background:${s.color}`}></span>
              <span class="legend-name">${s.name}</span>
              <span class="legend-value">${formatEnergy(s.total)}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  public static override styles = css`
    :host {
      --ebc-accent: var(--energy-grid-consumption-color, var(--primary-color));
      --ebc-empty-bar: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      --ebc-grid: color-mix(in srgb, var(--secondary-text-color) 45%, transparent);
    }
    ha-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .root {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      height: 100%;
      box-sizing: border-box;
    }
    .header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }
    .summary {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      min-width: 0;
    }
    .icon {
      --mdc-icon-size: 32px;
      color: var(--ebc-accent);
      flex: 0 0 auto;
      margin-top: 2px;
    }
    .figures {
      min-width: 0;
    }
    .value {
      display: flex;
      align-items: baseline;
      gap: 6px;
      line-height: 1.05;
    }
    .number {
      font-size: 2.1em;
      font-weight: 700;
      color: var(--primary-text-color);
    }
    .unit {
      font-size: 1em;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    .label {
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-size: 0.85em;
      font-weight: 600;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .comparison {
      display: flex;
      align-items: baseline;
      gap: 5px;
      font-size: 0.85em;
      margin-top: 4px;
    }
    .comparison .delta {
      font-weight: 700;
    }
    .comparison.up .delta {
      color: var(--error-color, #db4437);
    }
    .comparison.down .delta {
      color: var(--success-color, #43a047);
    }
    .comparison.flat .delta {
      color: var(--primary-text-color);
    }
    .comparison .against {
      color: var(--secondary-text-color);
    }
    button.period {
      flex: 0 0 auto;
      border: none;
      cursor: pointer;
      border-radius: 999px;
      padding: 7px 16px;
      font-size: 0.95em;
      font-weight: 700;
      font-family: inherit;
      color: var(--text-primary-color, #fff);
      background: var(--ebc-accent);
    }
    button.period:hover {
      filter: brightness(1.1);
    }
    button.period:focus-visible {
      outline: 2px solid var(--primary-text-color);
      outline-offset: 2px;
    }
    .chart {
      position: relative;
      flex: 1 1 auto;
      min-height: 120px;
      width: 100%;
    }
    .chart svg {
      display: block;
    }
    .message {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      padding: 8px 0;
    }
    .error .message {
      color: var(--error-color, #db4437);
    }
    .grid {
      stroke: var(--ebc-grid);
      stroke-width: 1;
      stroke-dasharray: 3 7;
    }
    .tick,
    .xlabel {
      fill: var(--secondary-text-color);
      font-size: 12px;
      font-family: inherit;
    }
    .bar {
      transition: opacity 120ms ease-in-out;
    }
    .bar.dimmed {
      opacity: 0.45;
    }
    .hit {
      fill: transparent;
      cursor: pointer;
    }
    .tooltip {
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      z-index: 2;
      pointer-events: none;
      min-width: 170px;
      max-width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border-radius: 10px;
      background: var(--ha-card-background, var(--card-background-color));
      border: 1px solid var(--divider-color);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
      font-size: 0.8em;
    }
    .tt-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .tt-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .tt-name {
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
    }
    .tt-value {
      font-variant-numeric: tabular-nums;
    }
    .tt-empty {
      color: var(--secondary-text-color);
    }
    .swatch {
      width: 9px;
      height: 9px;
      border-radius: 2px;
      flex: 0 0 auto;
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 14px;
      font-size: 0.8em;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .legend-name {
      color: var(--secondary-text-color);
    }
    .legend-value {
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "energy-breakdown-card": EnergyBreakdownCard;
  }
}
