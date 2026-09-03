export type Period = "day" | "week" | "month" | "year";

export type ComparisonMode = "like_for_like" | "full_previous" | "projected";
export type TotalMode = "grid" | "home" | "devices";

export interface DeviceOverride {
  /** Statistic id of the device consumption stat, as configured in the Energy dashboard. */
  stat: string;
  name?: string;
  color?: string;
  hidden?: boolean;
  /** Take this device's consumption out of the total entirely. */
  excluded?: boolean;
}

export interface EnergyBreakdownCardConfig {
  type: string;
  icon?: string;
  periods?: Period[];
  default_period?: Period;
  show_comparison?: boolean;
  comparison_mode?: ComparisonMode;
  show_legend?: boolean;
  show_other?: boolean;
  other_name?: string;
  other_color?: string;
  total_mode?: TotalMode;
  max_devices?: number;
  rounded_bars?: boolean;
  first_day_of_week?: "auto" | "monday" | "sunday";
  devices?: DeviceOverride[];
}

/** Subset of the Energy dashboard preferences we rely on. */
export interface EnergyPrefs {
  energy_sources: EnergySource[];
  device_consumption: DeviceConsumption[];
}

export interface DeviceConsumption {
  stat_consumption: string;
  name?: string;
  /** Set when this device is sub-metered off another device's stat. */
  included_in_stat?: string | null;
}

export interface FlowFrom {
  stat_energy_from: string;
}
export interface FlowTo {
  stat_energy_to: string;
}

export interface EnergySource {
  type: "grid" | "solar" | "battery" | "gas" | "water";
  flow_from?: FlowFrom[];
  flow_to?: FlowTo[];
  stat_energy_from?: string;
  stat_energy_to?: string;
}

export interface StatisticValue {
  start: number | string;
  end?: number | string;
  change?: number | null;
  sum?: number | null;
  state?: number | null;
}

export type StatisticsResponse = Record<string, StatisticValue[]>;

/** One stacked series (a device, or the "Other" remainder). */
export interface Series {
  key: string;
  name: string;
  color: string;
  /** One value per bucket, aligned with `buckets`. */
  values: number[];
  total: number;
}

export interface Bucket {
  start: Date;
  end: Date;
  label: string;
}

export interface ChartData {
  buckets: Bucket[];
  series: Series[];
  /** Per-bucket totals as drawn: never less than the stack sitting under them. */
  totals: number[];
  /**
   * Per-bucket totals as the configured source reported them, before being
   * floored by the stack. Zero throughout means the source gave us nothing.
   */
  sourceTotals: number[];
}

export interface HomeAssistant {
  locale?: { language?: string };
  language?: string;
  config?: { time_zone?: string };
  themes?: unknown;
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
}
