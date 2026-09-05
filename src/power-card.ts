import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { OTHER_KEY, POWER_CARD_NAME, POWER_EDITOR_NAME } from "./const";
import { fetchPrefs } from "./energy";
import { formatPower } from "./format";
import {
  bucketSamples,
  collectPowerSources,
  combineSeries,
  fetchPowerHistory,
  fetchPowerStatistics,
  powerDevices,
  readPower,
  readSources,
  usesStatistics,
  type PowerDevice,
  type PowerSources
} from "./power-data";
import { renderPowerChart } from "./power-chart";
import { DEFAULT_THRESHOLDS, normaliseThresholds } from "./thresholds";
import { paletteFor } from "./theme";
import type { EnergyPrefs, HomeAssistant, PowerBreakdownCardConfig, TotalMode } from "./types";

const HISTORY_REFRESH_MS = 60_000;
/** Roughly two buckets per pixel keeps detail without drawing what cannot be seen. */
const PIXELS_PER_BUCKET = 2;

interface Segment {
  key: string;
  name: string;
  color: string;
  watts: number;
}

@customElement(POWER_CARD_NAME)
export class PowerBreakdownCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: PowerBreakdownCardConfig;
  @state() private _prefs?: EnergyPrefs;
  @state() private _values: (number | null)[] = [];
  @state() private _windowStart = 0;
  @state() private _windowEnd = 0;
  @state() private _error?: string;
  @state() private _loading = true;
  @state() private _width = 0;
  @state() private _height = 0;

  private _resizeObserver?: ResizeObserver;
  private _timer?: number;
  private _fetchToken = 0;
  private _signature = "";
  private readonly _gradientId = `pbc-${Math.random().toString(36).slice(2, 9)}`;

  public static async getConfigElement(): Promise<HTMLElement> {
    await import("./power-editor");
    return document.createElement(POWER_EDITOR_NAME);
  }

  public static getStubConfig(): PowerBreakdownCardConfig {
    return {
      type: `custom:${POWER_CARD_NAME}`,
      icon: "mdi:flash",
      hours: 3,
      thresholds: DEFAULT_THRESHOLDS,
      show_distribution: true,
      show_legend: true,
      show_axes: true
    };
  }

  public setConfig(config: PowerBreakdownCardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    const hours = config.hours ?? 3;
    if (!(hours > 0)) throw new Error("Hours must be greater than zero");
    this._config = { ...config, hours };
    this._loading = true;
    void this._load();
  }

  public getCardSize(): number {
    return 5;
  }

  public getGridOptions(): Record<string, number> {
    return { rows: 5, columns: 12, min_rows: 3, min_columns: 6 };
  }

  public getLayoutOptions(): Record<string, number> {
    return { grid_rows: 5, grid_columns: 12, grid_min_rows: 3, grid_min_columns: 6 };
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this._width = Math.floor(entry.contentRect.width);
        this._height = Math.floor(entry.contentRect.height);
      }
    });
    this._timer = window.setInterval(() => void this._load(), HISTORY_REFRESH_MS);
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

  /**
   * Home Assistant hands over a new hass object on every state change in the
   * system. Only redraw when something this card actually shows has moved.
   */
  protected override shouldUpdate(changed: PropertyValues): boolean {
    if (changed.size > 1 || !changed.has("hass")) return true;
    const signature = this._liveSignature();
    if (signature === this._signature) return false;
    this._signature = signature;
    return true;
  }

  protected override updated(changed: PropertyValues): void {
    if (!changed.has("hass") || !this.hass) return;
    const previous = changed.get("hass") as HomeAssistant | undefined;
    if (!previous) void this._load();
  }

  private get _hours(): number {
    return this._config?.hours ?? 3;
  }

  private get _mode(): TotalMode {
    return this._config?.total_mode ?? "grid";
  }

  private _sources(): PowerSources {
    if (!this._prefs) return { positive: [], negative: [] };
    return collectPowerSources(this._prefs, this._mode);
  }

  private _devices(): PowerDevice[] {
    if (!this._prefs || !this._config) return [];
    const hidden = new Set(
      (this._config.devices ?? []).filter((d) => d.hidden).map((d) => d.stat)
    );
    return powerDevices(this._prefs, this._config).filter((d) => !hidden.has(d.stat));
  }

  private _watchedEntities(): string[] {
    const sources = this._sources();
    return [
      ...sources.positive.map((s) => s.entity),
      ...sources.negative.map((s) => s.entity),
      ...this._devices().map((d) => d.entity)
    ].filter((e): e is string => Boolean(e));
  }

  private _liveSignature(): string {
    const hass = this.hass;
    if (!hass) return "";
    return this._watchedEntities()
      .map((e) => `${e}=${hass.states?.[e]?.state ?? ""}`)
      .join("|");
  }

  private async _load(): Promise<void> {
    const hass = this.hass;
    const config = this._config;
    if (!hass || !config) return;
    const token = ++this._fetchToken;

    try {
      const prefs = this._prefs ?? (await fetchPrefs(hass));
      if (token !== this._fetchToken) return;
      this._prefs = prefs;

      const sources = collectPowerSources(prefs, this._mode);
      const devices = powerDevices(prefs, config);
      const deviceEntities = devices.map((d) => d.entity).filter((e): e is string => Boolean(e));
      const sourceEntities = [
        ...sources.positive.map((s) => s.entity),
        ...sources.negative.map((s) => s.entity)
      ];

      const wanted = this._mode === "devices" ? deviceEntities : sourceEntities;
      if (!wanted.length) {
        throw new Error(
          this._mode === "devices"
            ? "No devices in the Energy dashboard have a power sensor configured."
            : "No power sensor is configured for your grid connection in the Energy dashboard."
        );
      }

      const end = new Date();
      const start = new Date(end.getTime() - this._hours * 3600_000);
      const fetcher = usesStatistics(this._hours) ? fetchPowerStatistics : fetchPowerHistory;
      const series = await fetcher(hass, Array.from(new Set(wanted)), start, end);
      if (token !== this._fetchToken) return;

      const buckets = this._bucketCount();
      const bucket = (entity: string) =>
        bucketSamples(series[entity] ?? [], start.getTime(), end.getTime(), buckets);

      const values =
        this._mode === "devices"
          ? combineSeries(deviceEntities.map(bucket), [], buckets)
          : combineSeries(
              sources.positive.map((s) =>
                s.invert ? bucket(s.entity).map((v) => (v === null ? null : -v)) : bucket(s.entity)
              ),
              sources.negative.map((s) => bucket(s.entity)),
              buckets
            );

      this._values = values.map((v) => (v === null ? null : Math.max(0, v)));
      this._windowStart = start.getTime();
      this._windowEnd = end.getTime();
      this._error = undefined;
      this._loading = false;
      this._signature = this._liveSignature();
    } catch (err) {
      if (token !== this._fetchToken) return;
      this._error = err instanceof Error ? err.message : String(err);
      this._loading = false;
    }
  }

  /**
   * How many points the line is drawn from. Defaults to about two per pixel;
   * a configured rate wins, which is how you ask for a coarser or finer trace
   * than the card's width would give.
   */
  private _bucketCount(): number {
    const perHour = this._config?.points_per_hour;
    if (perHour && perHour > 0) {
      return Math.max(2, Math.min(2000, Math.round(this._hours * perHour)));
    }
    return Math.max(24, Math.min(600, Math.round((this._width || 300) / PIXELS_PER_BUCKET)));
  }

  private _currentTotal(): number | null {
    const hass = this.hass;
    if (!hass) return null;
    if (this._mode === "devices") {
      const values = this._devices().map((d) => readPower(hass, d.entity));
      const known = values.filter((v): v is number => v !== null);
      return known.length ? known.reduce((a, b) => a + b, 0) : null;
    }
    const total = readSources(hass, this._sources());
    return total === null ? null : Math.max(0, total);
  }

  private _segments(): Segment[] {
    const hass = this.hass;
    const config = this._config;
    if (!hass || !config) return [];
    const devices = this._devices();
    const palette = paletteFor(this, devices.length);
    const overrides = new Map((config.devices ?? []).map((d) => [d.stat, d]));

    const segments: Segment[] = devices
      .map((device, index) => ({
        key: device.stat,
        name: device.name,
        color: overrides.get(device.stat)?.color || palette.series[index % palette.series.length],
        watts: readPower(hass, device.entity) ?? 0
      }))
      .sort((a, b) => b.watts - a.watts);

    const max = config.max_devices ?? 8;
    let overflow = 0;
    let shown = segments;
    if (max > 0 && segments.length > max) {
      overflow = segments.slice(max).reduce((sum, s) => sum + s.watts, 0);
      shown = segments.slice(0, max);
    }

    if (config.show_other !== false && this._mode !== "devices") {
      const total = this._currentTotal();
      if (total !== null) {
        const accounted = shown.reduce((sum, s) => sum + s.watts, 0) + overflow;
        const other = Math.max(0, total - accounted) + overflow;
        shown = [
          ...shown,
          {
            key: OTHER_KEY,
            name: config.other_name || "Other",
            color: config.other_color || palette.other,
            watts: other
          }
        ];
      }
    } else if (overflow > 0) {
      shown = [
        ...shown,
        {
          key: OTHER_KEY,
          name: config.other_name || "Other",
          color: config.other_color || palette.other,
          watts: overflow
        }
      ];
    }

    return shown;
  }

  protected override render(): TemplateResult | typeof nothing {
    const config = this._config;
    if (!config) return nothing;
    const segments = this._segments();

    return html`
      <ha-card>
        <div class="root">
          ${config.name ? html`<div class="card-name">${config.name}</div>` : nothing}
          <div class="header">
            <div class="summary">
              ${config.icon ? html`<ha-icon class="icon" .icon=${config.icon}></ha-icon>` : nothing}
              <div class="figures">
                <div class="value">
                  <span class="number">
                    ${formatPower(this._currentTotal(), this.hass?.locale?.language)}
                  </span>
                </div>
                ${this._renderPeak()}
              </div>
            </div>
          </div>
          ${this._renderBody()}
          ${config.show_distribution !== false ? this._renderDistribution(segments) : nothing}
          ${config.show_legend !== false ? this._renderLegend(segments) : nothing}
        </div>
      </ha-card>
    `;
  }

  private _renderPeak(): TemplateResult | typeof nothing {
    if (this._config?.show_peak === false) return nothing;
    const known = this._values.filter((v): v is number => v !== null);
    if (!known.length) return nothing;
    const peak = Math.max(...known);
    return html`
      <div class="peak">
        peak ${formatPower(peak, this.hass?.locale?.language)} over ${this._hours}h
      </div>
    `;
  }

  private _renderBody(): TemplateResult {
    if (this._error) {
      return html`<div class="chart error"><div class="message">${this._error}</div></div>`;
    }
    const ready = this._width > 0 && this._height > 0 && this._values.length > 0;
    const config = this._config;
    const bleed = config?.show_axes === false;
    const bottom = !bleed
      ? ""
      : config?.show_distribution !== false
        ? "under-bar"
        : config?.show_legend !== false
          ? "to-legend"
          : "to-edge";
    return html`
      <div class=${`chart ${bleed ? "bleed" : ""} ${bottom}`}>
        ${ready
          ? renderPowerChart({
              width: this._width,
              height: this._height,
              values: this._values,
              start: this._windowStart,
              end: this._windowEnd,
              thresholds: normaliseThresholds(this._config?.thresholds),
              yMax: this._config?.y_max,
              showAxes: this._config?.show_axes !== false,
              smooth: this._config?.smooth === true,
              lineWidth: this._config?.line_width ?? 2.5,
              language: this.hass?.locale?.language,
              gradientId: this._gradientId
            })
          : html`<div class="message">${this._loading ? "Loading…" : ""}</div>`}
      </div>
    `;
  }

  private _renderDistribution(segments: Segment[]): TemplateResult {
    const total = segments.reduce((sum, s) => sum + s.watts, 0);
    return html`
      <div
        class="distribution"
        role="img"
        aria-label=${`Power distribution: ${segments
          .map((s) => `${s.name} ${formatPower(s.watts)}`)
          .join(", ")}`}
      >
        ${total > 0
          ? segments
              .filter((s) => s.watts > 0)
              .map(
                (s) => html`
                  <div
                    class="segment"
                    style=${`width:${(s.watts / total) * 100}%; background:${s.color}`}
                    title=${`${s.name} ${formatPower(s.watts)}`}
                  ></div>
                `
              )
          : html`<div class="segment empty"></div>`}
      </div>
    `;
  }

  private _renderLegend(segments: Segment[]): TemplateResult {
    const language = this.hass?.locale?.language;
    return html`
      <div class="legend">
        ${segments.map(
          (s) => html`
            <div class="legend-item">
              <span class="swatch" style=${`background:${s.color}`}></span>
              <span class="legend-name">${s.name}</span>
              <span class="legend-value">${formatPower(s.watts, language)}</span>
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
      height: 100%;
      min-height: var(--pbc-min-height, 200px);
      --pbc-icon-color: var(--primary-text-color);
      --pbc-icon-size: 1.6em;
      --ebc-grid: color-mix(in srgb, var(--secondary-text-color) 45%, transparent);
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
      gap: 8px;
    }
    .summary {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      min-width: 0;
    }
    .icon {
      --mdc-icon-size: var(--pbc-icon-size);
      width: var(--pbc-icon-size);
      height: var(--pbc-icon-size);
      color: var(--pbc-icon-color);
      flex: 0 0 auto;
      margin-top: 0.22em;
    }
    .number {
      font-size: 2.1em;
      font-weight: 700;
      line-height: 1.05;
      color: var(--primary-text-color);
      white-space: nowrap;
    }
    .peak {
      margin-top: 3px;
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    .chart {
      position: relative;
      flex: 1 1 0;
      min-height: 0;
      width: 100%;
    }
    .chart svg {
      display: block;
    }
    /* Without axes there is nothing to keep clear of, so the plot runs into
       the card's edges and on under whatever sits below it. */
    .chart.bleed {
      margin-left: -16px;
      margin-right: -16px;
      width: calc(100% + 32px);
    }
    .chart.bleed.under-bar {
      margin-bottom: -22px;
    }
    .chart.bleed.to-legend {
      margin-bottom: -8px;
    }
    .chart.bleed.to-edge {
      margin-bottom: -24px;
    }
    .line {
      stroke-width: 2.5;
      stroke-linejoin: round;
      stroke-linecap: round;
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
    .message {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      padding: 8px 0;
    }
    .error .message {
      color: var(--error-color, #db4437);
    }
    .distribution {
      position: relative;
      z-index: 1;
      flex: 0 0 auto;
      display: flex;
      height: 14px;
      border-radius: 7px;
      overflow: hidden;
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    }
    .segment {
      height: 100%;
      /* Widths are re-computed on every reading, so ease between them. */
      transition: width 400ms ease-in-out, background-color 400ms ease-in-out;
      min-width: 0;
    }
    .segment.empty {
      width: 100%;
      background: transparent;
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
    .swatch {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex: 0 0 auto;
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
      .peak {
        font-size: 0.78em;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "power-breakdown-card": PowerBreakdownCard;
  }
}
