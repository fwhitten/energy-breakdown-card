import { CARD_NAME, CARD_VERSION, POWER_CARD_NAME } from "./const";
import "./card";
import "./power-card";

interface CustomCard {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
}

const win = window as unknown as { customCards?: CustomCard[] };
win.customCards = win.customCards || [];
win.customCards.push(
  {
    type: CARD_NAME,
    name: "Energy Breakdown Card",
    description:
      "Stacked per-device energy consumption from the Energy dashboard, with day/week/month/year drill-down.",
    preview: true,
    documentationURL: "https://github.com/fwhitten/energy-breakdown-card"
  },
  {
    type: POWER_CARD_NAME,
    name: "Power Breakdown Card",
    description:
      "Live power as a threshold-coloured line, with a per-device distribution bar from the Energy dashboard.",
    preview: true,
    documentationURL: "https://github.com/fwhitten/energy-breakdown-card#power-breakdown-card"
  }
);

/* eslint-disable no-console */
console.info(
  `%c ENERGY-BREAKDOWN-CARD %c ${CARD_VERSION} `,
  "color: white; background: #7c4dff; font-weight: 700;",
  "color: #7c4dff; background: white; font-weight: 700;"
);
