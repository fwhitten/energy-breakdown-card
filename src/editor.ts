import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ALL_PERIODS, EDITOR_NAME, PERIOD_LABEL } from "./const";
import { fetchPrefs, topLevelDevices } from "./energy";
import { paletteFor } from "./theme";
import type {
  DeviceConsumption,
  DeviceOverride,
  EnergyBreakdownCardConfig,
  HomeAssistant
} from "./types";

const LABELS: Record<string, string> = {
  icon: "Icon",
  default_period: "Default time period",
  periods: "Selectable time periods",
  total_mode: "Consumption figure",
  comparison_mode: "Comparison baseline",
  show_comparison: "Show comparison to previous period",
  show_legend: "Show legend",
  show_other: 'Show "Other" remainder',
  other_name: '"Other" label',
  max_devices: "Maximum devices shown",
  rounded_bars: "Rounded bars",
  first_day_of_week: "First day of week"
};

const SCHEMA = [
  { name: "icon", selector: { icon: {} } },
  {
    name: "periods",
    selector: {
      select: {
        multiple: true,
        mode: "list",
        options: ALL_PERIODS.map((p) => ({ value: p, label: PERIOD_LABEL[p] }))
      }
    }
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "default_period",
        selector: {
          select: {
            mode: "dropdown",
            options: ALL_PERIODS.map((p) => ({ value: p, label: PERIOD_LABEL[p] }))
          }
        }
      },
      {
        name: "total_mode",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "grid", label: "Grid import" },
              { value: "home", label: "Home consumption (grid + solar + battery)" },
              { value: "devices", label: "Sum of devices" }
            ]
          }
        }
      }
    ]
  },
  { name: "show_comparison", selector: { boolean: {} } },
  {
    name: "comparison_mode",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "like_for_like", label: "Same elapsed time in previous period" },
          { value: "full_previous", label: "Whole previous period" },
          { value: "projected", label: "Projected period vs whole previous period" }
        ]
      }
    }
  },
  { name: "show_other", selector: { boolean: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_legend", selector: { boolean: {} } },
      { name: "rounded_bars", selector: { boolean: {} } }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      {
        name: "first_day_of_week",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: "Follow language" },
              { value: "monday", label: "Monday" },
              { value: "sunday", label: "Sunday" }
            ]
          }
        }
      }
    ]
  },
  { name: "max_devices", selector: { number: { min: 1, max: 20, mode: "box" } } }
];

@customElement(EDITOR_NAME)
export class EnergyBreakdownCardEditor extends LitElement {
  public hass?: HomeAssistant;

  @state() private _config?: EnergyBreakdownCardConfig;
  @state() private _devices: DeviceConsumption[] = [];
  @state() private _devicesError?: string;

  public setConfig(config: EnergyBreakdownCardConfig): void {
    this._config = config;
    void this._loadDevices();
  }

  private async _loadDevices(): Promise<void> {
    if (!this.hass || this._devices.length) return;
    try {
      const prefs = await fetchPrefs(this.hass);
      this._devices = topLevelDevices(prefs);
      this._devicesError = undefined;
    } catch (err) {
      this._devicesError =
        "Could not read the Energy dashboard configuration. Set it up under Settings → Dashboards → Energy.";
      void err;
    }
  }

  protected override updated(): void {
    void this._loadDevices();
  }

  private get _data(): EnergyBreakdownCardConfig {
    const config = this._config!;
    return {
      show_comparison: true,
      show_legend: true,
      show_other: true,
      rounded_bars: true,
      comparison_mode: "like_for_like",
      total_mode: "grid",
      first_day_of_week: "auto",
      max_devices: 8,
      periods: ALL_PERIODS,
      ...config
    };
  }

  private _emit(config: EnergyBreakdownCardConfig): void {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true
      })
    );
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const value = { ...(ev.detail.value as EnergyBreakdownCardConfig) };
    if (value.periods?.length && value.default_period && !value.periods.includes(value.default_period)) {
      value.default_period = value.periods[0];
    }
    this._emit(value);
  }

  private _updateDevice(stat: string, patch: Partial<DeviceOverride>): void {
    const config = this._data;
    const devices = [...(config.devices ?? [])];
    const index = devices.findIndex((d) => d.stat === stat);
    const next: DeviceOverride = { ...(index >= 0 ? devices[index] : { stat }), ...patch };
    // Drop entries that no longer override anything, to keep YAML tidy.
    const isEmpty = !next.name && !next.color && !next.hidden;
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

  private _updateConfig(patch: Partial<EnergyBreakdownCardConfig>): void {
    const updated: EnergyBreakdownCardConfig = { ...this._data, ...patch };
    for (const key of Object.keys(patch) as (keyof EnergyBreakdownCardConfig)[]) {
      if (updated[key] === undefined) delete updated[key];
    }
    this._emit(updated);
  }

  private _override(stat: string): DeviceOverride | undefined {
    return (this._config?.devices ?? []).find((d) => d.stat === stat);
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
        ${this._renderDevices()}
      </div>
    `;
  }

  private _renderDevices(): TemplateResult {
    const palette = paletteFor(this, this._devices.length);
    return html`
      <div class="devices">
        <h4>Devices</h4>
        ${this._devicesError
          ? html`<div class="warning">${this._devicesError}</div>`
          : this._devices.length === 0
            ? html`<div class="hint">
                No individual devices are configured in the Energy dashboard yet.
              </div>`
            : html`<div class="hint">
                  Rename, recolour or hide any device from the Energy dashboard. Each field is
                  labelled with the name the Energy dashboard uses; type to override it.
                </div>
                ${this._devices.map((device, index) => this._renderDevice(device, index, palette.series))}`}
        ${this._data.show_other !== false ? this._renderOtherRow() : nothing}
      </div>
    `;
  }

  /** The remainder segment is configured alongside the devices it sits with. */
  private _renderOtherRow(): TemplateResult {
    const config = this._data;
    return html`
      <div class="device">
        <input
          class="color"
          type="color"
          .value=${config.other_color || paletteFor(this, this._devices.length).other}
          title="Colour"
          @change=${(e: Event) =>
            this._updateConfig({ other_color: (e.target as HTMLInputElement).value })}
        />
        <ha-textfield
          class="name"
          label="Other"
          .value=${config.other_name ?? ""}
          @change=${(e: Event) =>
            this._updateConfig({ other_name: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
        <span class="spacer"></span>
      </div>
    `;
  }

  private _renderDevice(device: DeviceConsumption, index: number, palette: string[]): TemplateResult {
    const stat = device.stat_consumption;
    const override = this._override(stat);
    const color = override?.color || palette[index % palette.length];
    return html`
      <div class="device ${override?.hidden ? "hidden" : ""}">
        <input
          class="color"
          type="color"
          .value=${color}
          title="Colour"
          @change=${(e: Event) =>
            this._updateDevice(stat, { color: (e.target as HTMLInputElement).value })}
        />
        <ha-textfield
          class="name"
          .label=${device.name || stat}
          .value=${override?.name ?? ""}
          @change=${(e: Event) =>
            this._updateDevice(stat, { name: (e.target as HTMLInputElement).value || undefined })}
        ></ha-textfield>
        <ha-icon-button
          .path=${override?.hidden ? MDI_EYE_OFF : MDI_EYE}
          .label=${override?.hidden ? "Show device" : "Hide device"}
          @click=${() => this._updateDevice(stat, { hidden: !override?.hidden || undefined })}
        ></ha-icon-button>
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
      margin: 4px 0 0;
    }
    .hint,
    .warning {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    .warning {
      color: var(--error-color, #db4437);
    }
    .device {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .device.hidden .name {
      opacity: 0.5;
    }
    .name {
      flex: 1 1 auto;
    }
    .spacer {
      inline-size: 48px;
      flex: 0 0 auto;
    }
    input.color {
      inline-size: 34px;
      block-size: 34px;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
      flex: 0 0 auto;
    }
  `;
}

const MDI_EYE =
  "M12 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z";
const MDI_EYE_OFF =
  "M11.83 9 15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8 1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.46.46A11.8 11.8 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z";

declare global {
  interface HTMLElementTagNameMap {
    "energy-breakdown-card-editor": EnergyBreakdownCardEditor;
  }
}
