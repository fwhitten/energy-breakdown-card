import type { Period } from "./types";

export const CARD_NAME = "energy-breakdown-card";
export const EDITOR_NAME = "energy-breakdown-card-editor";
export const POWER_CARD_NAME = "power-breakdown-card";
export const POWER_EDITOR_NAME = "power-breakdown-card-editor";
export const CARD_VERSION = "1.7.3";

export const ALL_PERIODS: Period[] = ["day", "week", "month", "year"];

export const PERIOD_LABEL: Record<Period, string> = {
  day: "Day",
  week: "Week",
  month: "Month",
  year: "Year"
};

/** What the previous period is called in the comparison line. */
export const PREVIOUS_LABEL: Record<Period, string> = {
  day: "yesterday",
  week: "last week",
  month: "last month",
  year: "last year"
};

export const OTHER_KEY = "__other__";

