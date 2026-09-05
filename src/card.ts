import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CARD_NAME, EDITOR_NAME, PERIOD_LABEL, PREVIOUS_LABEL, ALL_PERIODS } from "./const";
import { renderChart } from "./chart";
import { chartLayout } from "./layout";
import { formatEnergy, formatLegendEnergy, formatPercent, formatPeriodLabel } from "./format";
import { paletteFor } from "./theme";
import {
  buildChartData,
  collectSourceStats,
  fetchPrefs,
  fetchStatistics,
  partitionDevices,
  statIdsForTotal,
  sourceTypes,
  totalForRange
} from "./energy";
import {
  buildBuckets,
  comparisonRange,
  elapsedFraction,
  endOfPeriod,
  resolveFirstDayOfWeek,
  shiftPeriods,
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
  @state() private _height = 0;
  @state() private _hover: number | null = null;
  @state() private _totalStatIds: string[] = [];
  @state() private _sourceTypes: string[] = [];
  @state() private _usedDeviceFallback = false;
  @state() private _offset = 0;
  @state() private _periodStart?: Date;

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
      show_navigation: true,
      show_period_button: true,
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
      for (const entry of entries) {
        this._width = Math.floor(entry.contentRect.width);
        this._height = Math.floor(entry.contentRect.height);
      }
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
    if (!changed.has("hass") || !this.hass) return;
    const previous = changed.get("hass") as HomeAssistant | undefined;
    // First hass, or a theme change that the palette is derived from.
    if (!previous || previous.themes !== this.hass.themes) void this._load();
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

      // The window being shown: the current period, stepped back by the
      // navigation offset. Anchoring on the period start keeps month and year
      // steps on calendar boundaries.
      const start = shiftPeriods(startOfPeriod(now, period, fdow), period, this._offset);
      const periodEnd = endOfPeriod(start, period);
      const displayedEnd = this._offset === 0 ? now : periodEnd;
      const buckets = buildBuckets(start, period, fdow);
      const statsPeriod = statsPeriodFor(period);

      const { all, visible, excludedIds } = partitionDevices(prefs, config);
      const deviceIds = all.map((d) => d.stat_consumption);
      const visibleIds = visible.map((d) => d.stat_consumption);
      const sources = collectSourceStats(prefs);
      const totalIds = statIdsForTotal(sources, mode);

      if (!deviceIds.length && !totalIds.length) {
        throw new Error("No energy sources or devices are configured in the Energy dashboard.");
      }

      this._totalStatIds = totalIds;
      this._sourceTypes = sourceTypes(prefs);
      const ids = Array.from(new Set([...deviceIds, ...totalIds]));
      const stats = await fetchStatistics(hass, ids, start, periodEnd, statsPeriod);
      if (token !== this._fetchToken) return;

      const palette = paletteFor(this, all.length);
      const data = buildChartData({ prefs, stats, buckets, config, palette });

      // The headline is the sum of the buckets the chart draws, so the figure
      // and the legend can never disagree. Buckets past the present are empty,
      // so this is the period-to-date total without discarding part of the
      // in-progress bucket.
      const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);
      const sourceTotal = sum(data.sourceTotals);
      const deviceTotal = sum(data.series.map((s) => s.total));

      // If the configured source yields nothing but the devices do, show the
      // devices' total rather than a bare zero. The notice explains why.
      this._usedDeviceFallback = mode !== "devices" && sourceTotal <= 0 && deviceTotal > 0;
      const total = this._usedDeviceFallback ? deviceTotal : sum(data.totals);

      let comparison: number | null = null;
      if (config.show_comparison !== false) {
        comparison = await this._loadComparison(hass, {
          start,
          displayedEnd,
          periodEnd,
          period,
          mode,
          sources,
          visibleIds,
          excludedIds,
          totalIds,
          statsPeriod,
          current: total
        });
        if (token !== this._fetchToken) return;
      }

      this._data = data;
      this._periodStart = start;
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
      start: Date;
      displayedEnd: Date;
      periodEnd: Date;
      period: Period;
      mode: TotalMode;
      sources: ReturnType<typeof collectSourceStats>;
      visibleIds: string[];
      excludedIds: string[];
      totalIds: string[];
      statsPeriod: ReturnType<typeof statsPeriodFor>;
      current: number;
    }
  ): Promise<number | null> {
    const config = this._config!;
    const mode: ComparisonMode = config.comparison_mode ?? "like_for_like";
    const range = comparisonRange(args.start, args.displayedEnd, args.period, mode);
    const fetchEnd = endOfPeriod(range.start, args.period);

    const ids =
      args.mode === "devices"
        ? args.visibleIds
        : Array.from(new Set([...args.totalIds, ...args.excludedIds]));
    if (!ids.length) return null;

    const stats = await fetchStatistics(hass, ids, range.start, fetchEnd, args.statsPeriod);
    const previous = totalForRange(
      stats,
      args.sources,
      args.mode,
      range.start,
      range.end,
      args.visibleIds,
      args.excludedIds
    );
    if (previous <= 0) return null;

    const current =
      mode === "projected"
        ? args.current / elapsedFraction(args.start, args.displayedEnd, args.periodEnd)
        : args.current;
    return ((current - previous) / previous) * 100;
  }

  private _cyclePeriod(): void {
    const periods = this._config?.periods ?? ALL_PERIODS;
    const index = periods.indexOf(this._period);
    this._period = periods[(index + 1) % periods.length];
    this._offset = 0;
    this._hover = null;
    this._loading = true;
    void this._load();
  }

  private _step(direction: -1 | 1): void {
    const next = this._offset + direction;
    if (next < 0) return;
    this._offset = next;
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
          ${config.name ? html`<div class="card-name">${config.name}</div>` : nothing}
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
                ${this._renderComparison()}
                ${this._renderPeriodLabel()}
              </div>
            </div>
            ${this._renderControls()}
          </div>
          ${this._renderNotice()}
          ${this._renderBody()}
          ${config.show_legend !== false ? this._renderLegend() : nothing}
        </div>
      </ha-card>
    `;
  }

  private _renderControls(): TemplateResult | typeof nothing {
    const config = this._config!;
    const showNav = config.show_navigation !== false;
    const showPeriod = config.show_period_button !== false;
    if (!showNav && !showPeriod) return nothing;
    return html`
      <div class="controls">
        ${showNav
          ? html`
              <button
                class="nav"
                @click=${() => this._step(1)}
                aria-label=${`Previous ${this._period}`}
                title=${`Previous ${this._period}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15.4 7.4 14 6l-6 6 6 6 1.4-1.4-4.6-4.6z" />
                </svg>
              </button>
              <button
                class="nav"
                ?disabled=${this._offset === 0}
                @click=${() => this._step(-1)}
                aria-label=${`Next ${this._period}`}
                title=${`Next ${this._period}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.6 7.4 10 6l6 6-6 6-1.4-1.4 4.6-4.6z" />
                </svg>
              </button>
            `
          : nothing}
        ${showPeriod
          ? html`
              <button
                class="period"
                @click=${this._cyclePeriod}
                aria-label=${`Time period: ${PERIOD_LABEL[this._period]}. Click to change.`}
              >
                ${PERIOD_LABEL[this._period]}
              </button>
            `
          : nothing}
      </div>
    `;
  }

  /** Only shown once you navigate away from the current period. */
  private _renderPeriodLabel(): TemplateResult | typeof nothing {
    if (this._offset === 0 || !this._periodStart) return nothing;
    return html`
      <div class="period-label">
        ${formatPeriodLabel(this._period, this._periodStart, this.hass?.locale?.language)}
      </div>
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

  /**
   * Devices reporting while the total reads zero almost always means the
   * configured source statistic is not the one holding the data.
   */
  private _renderNotice(): TemplateResult | typeof nothing {
    if (this._error || !this._data || !this._usedDeviceFallback) return nothing;
    const detail = this._totalStatIds.length
      ? html`no data came back for <code>${this._totalStatIds.join(", ")}</code>`
      : html`no grid consumption source was found${this._sourceTypes.length
          ? html` (configured sources: ${this._sourceTypes.join(", ")})`
          : nothing}`;
    return html`
      <div class="notice">Showing the device total only — ${detail}.</div>
    `;
  }

  private _renderBody(): TemplateResult {
    if (this._error) {
      return html`<div class="chart error"><div class="message">${this._error}</div></div>`;
    }
    // The chart fills whatever height the card has been given, so resizing the
    // card in a sections dashboard resizes the graph with it.
    const height = this._height;
    const data = this._data;
    return html`
      <div class="chart">
        ${data && this._width > 0 && height > 0
          ? renderChart(data, {
              width: this._width,
              height,
              rounded: this._config?.rounded_bars !== false,
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

    const { padLeft, slot } = chartLayout(data, this._width, this._height);
    const centre = padLeft + slot * index + slot / 2;
    const half = 90;
    const left = Math.min(Math.max(centre, half), Math.max(half, this._width - half));
    const rows = data.series.filter((s) => s.values[index] > 0);
    const language = this.hass?.locale?.language;

    return html`
      <div class="tooltip" style=${`left:${left}px`}>
        <div class="tt-head">
          <span>${this._tooltipTitle(bucket.start)}</span>
          <span class="tt-total">${formatLegendEnergy(data.totals[index], language)} kWh</span>
        </div>
        ${rows.length
          ? rows.map(
              (s) => html`
                <div class="tt-row">
                  <span class="swatch" style=${`background:${s.color}`}></span>
                  <span class="tt-name">${s.name}</span>
                  <span class="tt-value">${formatLegendEnergy(s.values[index], language)}</span>
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
            <div class=${s.total > 0 ? "legend-item" : "legend-item idle"}>
              <span class="swatch" style=${`background:${s.color}`}></span>
              <span class="legend-name">${s.name}</span>
              <span class="legend-value">${formatLegendEnergy(s.total, this.hass?.locale?.language)}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  public static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      /* The sections grid sizes the element around us, so take its height and
         let the flex chain below distribute it. */
      height: 100%;
      /* Floor for layouts that do not give the card a height of its own. */
      min-height: var(--ebc-min-height, 240px);
      --ebc-empty-bar: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      --ebc-grid: color-mix(in srgb, var(--secondary-text-color) 45%, transparent);
      --ebc-icon-color: var(--primary-text-color);
      --ebc-icon-size: 1.6em;
      --ebc-period-background: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
      --ebc-period-color: var(--primary-text-color);
    }
    ha-card {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-height: 0;
      overflow: hidden;
    }
    .root {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      min-height: 0;
      box-sizing: border-box;
      container-type: inline-size;
    }
    .card-name {
      flex: 0 0 auto;
      font-size: 1.05em;
      font-weight: 500;
      line-height: 1.2;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .header {
      flex: 0 0 auto;
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
      --mdc-icon-size: var(--ebc-icon-size);
      width: var(--ebc-icon-size);
      height: var(--ebc-icon-size);
      color: var(--ebc-icon-color);
      flex: 0 0 auto;
      /* Optically centred on the headline figure beside it. */
      margin-top: 0.22em;
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
      font-size: 2.4em;
      font-weight: 300;
      color: var(--primary-text-color);
    }
    .unit {
      font-size: 1em;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    .comparison {
      display: flex;
      align-items: baseline;
      gap: 5px;
      font-size: 0.85em;
      margin-top: 3px;
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
      /* No change is not news: keep it the same weight as the text beside it. */
      color: var(--secondary-text-color);
    }
    .comparison .against {
      color: var(--secondary-text-color);
    }
    .controls {
      flex: 0 0 auto;
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 2px;
    }
    button.nav {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      padding: 0;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      color: var(--ebc-period-color);
      background: transparent;
    }
    button.nav svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }
    button.nav:hover:not([disabled]) {
      background: var(--ebc-period-background);
    }
    button.nav[disabled] {
      opacity: 0.32;
      cursor: default;
    }
    button.nav:focus-visible {
      outline: 2px solid var(--primary-text-color);
      outline-offset: 1px;
    }
    .period-label {
      margin-top: 3px;
      font-size: 0.85em;
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
      color: var(--ebc-period-color);
      background: var(--ebc-period-background);
    }
    button.period:hover {
      background: color-mix(in srgb, var(--primary-text-color) 16%, transparent);
    }
    button.period:focus-visible {
      outline: 2px solid var(--primary-text-color);
      outline-offset: 2px;
    }
    .chart {
      position: relative;
      /* Basis 0 so the chart claims the free space before it has any content
         to be measured from. */
      flex: 1 1 0;
      min-height: 0;
      width: 100%;
    }
    .chart svg {
      display: block;
    }
    .notice {
      flex: 0 0 auto;
      font-size: 0.78em;
      line-height: 1.3;
      color: var(--warning-color, #ffa726);
    }
    .notice code {
      font-size: 0.95em;
      word-break: break-all;
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
      border-radius: 50%;
      flex: 0 0 auto;
    }
    .legend {
      flex: 0 0 auto;
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
    /* A device that used nothing this period should not compete for attention. */
    .legend-item.idle {
      opacity: 0.45;
    }
    .legend-name {
      color: var(--secondary-text-color);
    }
    .legend-value {
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }
    @container (max-width: 330px) {
      .number {
        font-size: 1.6em;
      }
      .unit,
      .comparison,
      .period-label {
        font-size: 0.78em;
      }
      button.period {
        padding: 6px 12px;
        font-size: 0.85em;
      }
      button.nav {
        width: 24px;
        height: 24px;
      }
      button.nav svg {
        width: 19px;
        height: 19px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "energy-breakdown-card": EnergyBreakdownCard;
  }
}
