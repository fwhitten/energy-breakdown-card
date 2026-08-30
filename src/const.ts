import type { Period } from "./types";

export const CARD_NAME = "energy-breakdown-card";
export const EDITOR_NAME = "energy-breakdown-card-editor";
export const CARD_VERSION = "1.0.0";

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

export const COLOR_SCHEMES: Record<string, string[]> = {
  // Magenta/violet family, matching the reference design.
  vibrant: [
    "#e040fb",
    "#f2a6ff",
    "#7c4dff",
    "#b388ff",
    "#00e5ff",
    "#1de9b6",
    "#ffab40",
    "#ff5252",
    "#69f0ae",
    "#ffd740"
  ],
  // Okabe-Ito derived; distinguishable with the common forms of colour blindness.
  colorblind: [
    "#0072b2",
    "#e69f00",
    "#009e73",
    "#cc79a7",
    "#56b4e9",
    "#d55e00",
    "#f0e442",
    "#8c8c8c",
    "#004c6d",
    "#a05195"
  ],
  cool: ["#00bcd4", "#3f51b5", "#009688", "#673ab7", "#03a9f4", "#4caf50", "#7e57c2", "#26a69a"],
  warm: ["#ff7043", "#ffa726", "#ec407a", "#ffca28", "#ef5350", "#ff8a65", "#d81b60", "#f4511e"]
};

/** Deliberately outside every palette so "Other" never collides with a device. */
export const OTHER_COLOR = "#7a7aa0";
