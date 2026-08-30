import { CARD_NAME, CARD_VERSION } from "./const";
import "./card";

interface CustomCard {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
}

const win = window as unknown as { customCards?: CustomCard[] };
win.customCards = win.customCards || [];
win.customCards.push({
  type: CARD_NAME,
  name: "Energy Breakdown Card",
  description:
    "Stacked per-device energy consumption from the Energy dashboard, with day/week/month/year drill-down.",
  preview: true,
  documentationURL: "https://github.com/fwhitten/energy-breakdown-card"
});

/* eslint-disable no-console */
console.info(
  `%c ENERGY-BREAKDOWN-CARD %c ${CARD_VERSION} `,
  "color: white; background: #7c4dff; font-weight: 700;",
  "color: #7c4dff; background: white; font-weight: 700;"
);
