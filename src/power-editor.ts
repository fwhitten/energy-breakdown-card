import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { POWER_EDITOR_NAME } from "./const";
import { fetchPrefs } from "./energy";
import { powerDevices, type PowerDevice } from "./power-data";
import { DEFAULT_THRESHOLDS, normaliseThresholds } from "./thresholds";
import { paletteFor } from "./theme";
import type {
  EnergyPrefs,
  HomeAssistant,
  PowerBreakdownCardConfig,
  PowerDeviceOverride,
  Threshold
} from "./types";

const LABELS: Record<string, string> = {
  name: "Name",
  icon: "Icon",
  hours: "Hours of history",
  total_mode: "Power figure",
  y_max: "Axis maximum in watts (blank to fit the data)",
  show_axes: "Show axes",
  smooth: "Smooth the line",
  show_peak: "Show the period peak",
  show_distribution: "Show the distribution bar",
  show_legend: "Show legend",
  show_other: 'Show "Other" remainder',
  max_devices: "Maximum devices shown"
};

const SCHEMA = [
  {
    type: "grid",
    name: "",
    schema: [
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "hours", selector: { number: { min: 1, max: 168, mode: "box" } } },
      {
        name: "total_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "grid", label: "Grid" },
              { value: "home", label: "Home (grid + solar + battery)" },
              { value: "devices", label: "Sum of devices" }
            ]
          }
        }
      }
    ]
  },
  { name: "y_max", selector: { number: { min: 0, max: 100000, step: 100, mode: "box" } } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_axes", selector: { boolean: {} } },
      { name: "smooth", selector: { boolean: {} } }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_peak", selector: { boolean: {} } },
      { name: "show_distribution", selector: { boolean: {} } }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_legend", selector: { boolean: {} } },
      { name: "show_other", selector: { boolean: {} } }
    ]
  },
  { name: "max_devices", selector: { number: { min: 1, max: 20, mode: "box" } } }
];

@customElement(POWER_EDITOR_NAME)
export class PowerBreakdownCardEditor extends LitElement {
  public hass?: HomeAssistant;

  @state() private _config?: PowerBreakdownCardConfig;
  @state() private _prefs?: EnergyPrefs;
  @state() private _error?: string;

  public setConfig(config: PowerBreakdownCardConfig): void {
    this._config = config;
    void this._loadPrefs();
  }

  private async _loadPrefs(): Promise<void> {
    if (!this.hass || this._prefs) return;
    try {
      this._prefs = await fetchPrefs(this.hass);
      this._error = undefined;
    } catch {
      this._error =
        "Could not read the Energy dashboard configuration. Set it up under Settings → Dashboards → Energy.";
    }
  }

  protected override updated(): void {
    void this._loadPrefs();
  }

  private get _data(): PowerBreakdownCardConfig {
    return {
      hours: 3,
      total_mode: "grid",
      show_axes: true,
      smooth: false,
      show_peak: true,
      show_distribution: true,
      show_legend: true,
      show_other: true,
      max_devices: 8,
      ...this._config
    } as PowerBreakdownCardConfig;
  }

  private _emit(config: PowerBreakdownCardConfig): void {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true })
    );
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    this._emit({ ...(ev.detail.value as PowerBreakdownCardConfig) });
  }

  private get _thresholds(): Threshold[] {
    return normaliseThresholds(this._config?.thresholds ?? DEFAULT_THRESHOLDS);
  }

  private _updateThreshold(index: number, patch: Partial<Threshold>): void {
    const list = this._thresholds.map((t, i) => (i === index ? { ...t, ...patch } : t));
    this._emit({ ...this._data, thresholds: list });
  }

  private _removeThreshold(index: number): void {
    const list = this._thresholds.filter((_, i) => i !== index);
    this._emit({ ...this._data, thresholds: list.length ? list : DEFAULT_THRESHOLDS });
  }

  private _addThreshold(): void {
    const list = this._thresholds;
    const last = list[list.length - 1];
    this._emit({
      ...this._data,
      thresholds: [...list, { value: last.value + 1000, color: last.color }]
    });
  }

  private _updateDevice(stat: string, patch: Partial<PowerDeviceOverride>): void {
    const config = this._data;
    const devices = [...(config.devices ?? [])];
    const index = devices.findIndex((d) => d.stat === stat);
    const next: PowerDeviceOverride = { ...(index >= 0 ? devices[index] : { stat }), ...patch };
    const isEmpty = !next.name && !next.color && !next.hidden && !next.power_entity;
    if (index >= 0) {
      if (isEmpty) devices.splice(index, 1);
      else devices[index] = next;
    } else if (!isEmpty) {
      devices.push(next);
    }
    const updated = { ...config };
    if (devices.length) updated.devices = devices;
    else delete updated.devices;
    this._emit(updated);
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    return html`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${SCHEMA}
          .computeLabel=${(s: { name: string }) => LABELS[s.name] ?? s.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
        ${this._renderThresholds()}
        ${this._renderDevices()}
      </div>
    `;
  }

  private _renderThresholds(): TemplateResult {
    const list = this._thresholds;
    return html`
      <div class="section">
        <h4>Thresholds</h4>
        <div class="hint">
          The colour the line and the area take at each power level. Values in between shade
          smoothly from one to the next.
        </div>
        ${list.map(
          (threshold, index) => html`
            <div class="row">
              <input
                class="color"
                type="color"
                .value=${threshold.color}
                @change=${(e: Event) =>
                  this._updateThreshold(index, { color: (e.target as HTMLInputElement).value })}
              />
              <input
                class="number"
                type="number"
                min="0"
                step="100"
                .value=${String(threshold.value)}
                @change=${(e: Event) =>
                  this._updateThreshold(index, {
                    value: Number((e.target as HTMLInputElement).value)
                  })}
              />
              <span class="unit">W</span>
              <button
                class="toggle"
                title="Remove threshold"
                ?disabled=${list.length <= 1}
                @click=${() => this._removeThreshold(index)}
              >
                &times;
              </button>
            </div>
          `
        )}
        <button class="add" @click=${this._addThreshold}>Add threshold</button>
      </div>
    `;
  }

  private _renderDevices(): TemplateResult {
    const devices: PowerDevice[] = this._prefs
      ? powerDevices(this._prefs, this._data)
      : [];
    const palette = paletteFor(this, Math.max(devices.length, 1));
    const overrides = new Map((this._config?.devices ?? []).map((d) => [d.stat, d]));
    return html`
      <div class="section">
        <h4>Devices</h4>
        ${this._error
          ? html`<div class="warning">${this._error}</div>`
          : devices.length === 0
            ? html`<div class="hint">
                No individual devices are configured in the Energy dashboard yet.
              </div>`
            : html`<div class="hint">
                  Power sensors come from each device's Energy dashboard entry. A device with no
                  power sensor there can be given one here.
                </div>
                ${devices.map((device, index) => {
                  const override = overrides.get(device.stat);
                  return html`
                    <div class="row device ${override?.hidden ? "off" : ""}">
                      <input
                        class="color"
                        type="color"
                        .value=${override?.color || palette.series[index % palette.series.length]}
                        @change=${(e: Event) =>
                          this._updateDevice(device.stat, {
                            color: (e.target as HTMLInputElement).value
                          })}
                      />
                      <div class="field">
                        <span class="dev-name">${device.name}</span>
                        <input
                          class="text"
                          type="text"
                          .value=${override?.power_entity ?? ""}
                          placeholder=${device.entity || "No power sensor — enter an entity id"}
                          @change=${(e: Event) =>
                            this._updateDevice(device.stat, {
                              power_entity: (e.target as HTMLInputElement).value || undefined
                            })}
                        />
                      </div>
                      <button
                        class="toggle ${override?.hidden ? "off" : ""}"
                        title=${override?.hidden ? "Hidden — click to show" : "Shown — click to hide"}
                        @click=${() =>
                          this._updateDevice(device.stat, { hidden: !override?.hidden || undefined })}
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"
                          />
                        </svg>
                      </button>
                    </div>
                  `;
                })}`}
      </div>
    `;
  }

  public static override styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    h4 {
      margin: 4px 0 2px;
    }
    .hint,
    .warning {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-bottom: 8px;
    }
    .warning {
      color: var(--error-color, #db4437);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .row.off .field {
      opacity: 0.5;
    }
    .field {
      flex: 1 1 auto;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .dev-name {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    input.text,
    input.number {
      font: inherit;
      padding: 7px 9px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #444);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--primary-text-color);
      box-sizing: border-box;
    }
    input.text {
      width: 100%;
    }
    input.number {
      flex: 1 1 auto;
      min-width: 0;
    }
    input.text:focus,
    input.number:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    .unit {
      color: var(--secondary-text-color);
      font-size: 0.85em;
    }
    input.color {
      inline-size: 36px;
      block-size: 36px;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      flex: 0 0 auto;
    }
    button.toggle {
      flex: 0 0 auto;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font: inherit;
      font-size: 1.2em;
      background: transparent;
      color: var(--primary-text-color);
    }
    button.toggle svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }
    button.toggle:hover:not([disabled]) {
      background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
    }
    button.toggle.off {
      color: var(--secondary-text-color);
      opacity: 0.55;
    }
    button.toggle[disabled] {
      opacity: 0.25;
      cursor: default;
    }
    button.add {
      align-self: flex-start;
      font: inherit;
      font-size: 0.9em;
      padding: 7px 14px;
      border: none;
      border-radius: 999px;
      cursor: pointer;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 9%, transparent);
    }
    button.add:hover {
      background: color-mix(in srgb, var(--primary-text-color) 16%, transparent);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "power-breakdown-card-editor": PowerBreakdownCardEditor;
  }
}
