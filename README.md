# Energy Breakdown Card

[![hacs][hacs-badge]][hacs-url]
[![validate][validate-badge]][validate-url]

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.][hacs-repo-badge]][hacs-repo-url]

A Lovelace card for Home Assistant that shows where your energy actually goes. It reads your
**Energy dashboard** configuration directly — no entity wiring — and draws a stacked bar chart
broken down by device, with a headline total and a comparison against the previous period.

Tap the period button to cycle **Day → Week → Month → Year**. The chart always graphs one level
below the selected period:

| Period | Bars show |
| ------ | --------- |
| Day    | Hours     |
| Week   | Days      |
| Month  | Weeks (clipped to the month) |
| Year   | Months    |

## Features

- Reads the Energy dashboard's configured devices and sources — nothing to configure twice
- Stacked per-device breakdown, plus an **Other** segment for consumption no device accounts for,
  so the bars always add up to your real total
- Headline consumption for the current period with an optional `+/-%` against the previous one
- Fully configurable in the **visual editor**, including per-device names, colours and visibility
- **Colours come from your theme**, not from the card — see [Colours](#colours)
- Sizes properly in **sections** dashboards (drag to resize; declares sensible grid defaults)
- Hover or tap any bar for a full breakdown
- No external chart library — one self-contained file, themed from your Home Assistant theme

## Installation

### HACS (recommended)

Click the button above, or add it by hand:

1. In HACS, open the three-dot menu → **Custom repositories**.
2. Add `https://github.com/fwhitten/energy-breakdown-card` with category **Dashboard**.
3. Install **Energy Breakdown Card**, then reload your browser.

### Manual

1. Download `energy-breakdown-card.js` from the [latest release][releases].
2. Copy it to `<config>/www/`.
3. Add the resource under **Settings → Dashboards → Resources**:
   `/local/energy-breakdown-card.js` as a **JavaScript module**.

## Requirements

You must have the [Energy dashboard][energy-docs] set up (**Settings → Dashboards → Energy**) with
at least a grid consumption source. Individual devices under **Individual devices** become the
stacked segments; without any, the card still shows your total with a single **Other** bar.

## Usage

Add the card from the dashboard card picker and configure it visually. The YAML equivalent:

```yaml
type: custom:energy-breakdown-card
icon: mdi:lightning-bolt
default_period: week
periods:
  - day
  - week
  - month
  - year
show_comparison: true
comparison_mode: like_for_like
show_legend: true
show_other: true
devices:
  - stat: sensor.heat_pump_energy
    name: Heat pump
    color: "#e040fb"
  - stat: sensor.fridge_energy
    hidden: true
```

## Options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `icon` | string | `mdi:lightning-bolt` | Any Home Assistant icon, shown top left. |
| `periods` | list | all four | Which periods the button cycles through. |
| `default_period` | string | first enabled | Period shown when the card loads. |
| `total_mode` | string | `grid` | `grid` (import only), `home` (grid + solar + battery, net of export), or `devices` (sum of devices). |
| `show_comparison` | boolean | `true` | Show the `+/-%` line. |
| `comparison_mode` | string | `like_for_like` | See [Comparison](#comparison). |
| `show_legend` | boolean | `true` | Colour key under the chart. |
| `show_other` | boolean | `true` | Show the unaccounted-for remainder as its own segment. |
| `other_name` | string | `Other` | Label for that segment. |
| `other_color` | string | from theme | Colour for that segment. |
| `max_devices` | number | `8` | Devices to show individually; the rest fold into **Other**. |
| `chart_height` | number | `200` | Chart height in pixels. |
| `rounded_bars` | boolean | `true` | Rounded bar caps. |
| `first_day_of_week` | string | `auto` | `auto`, `monday` or `sunday`. |
| `devices` | list | — | Per-device `stat` plus optional `name`, `color`, `hidden`. |

## Comparison

The current period is nearly always incomplete, so comparing "today so far" against *all* of
yesterday is misleading. `comparison_mode` controls how that is handled:

- **`like_for_like`** (default) — compares against the same elapsed slice of the previous period,
  so at 10:30 today it measures against 00:00–10:30 yesterday.
- **`full_previous`** — compares against the whole previous period.
- **`projected`** — extrapolates the current period to a full period, then compares against the
  whole previous one. Smoother, but it is a forecast.

## Colours

The card ships no palette of its own. Segment colours are worked out from the active Home
Assistant theme each time it loads, so it changes with your theme rather than fighting it:

1. If your theme defines `--graph-color-1`, `--graph-color-2` and so on, those are used directly.
2. Otherwise the card takes your theme's `--energy-grid-consumption-color` (falling back to
   `--accent-color`, then `--primary-color`) and spreads the segments around the colour wheel from
   it using the golden angle, so neighbouring segments stay distinguishable however many devices
   you have.

**Other** is always a muted version of the same base, so it reads as "everything else" rather than
competing with a real device. Any device can be given a fixed colour in the visual editor, which
overrides all of the above.

## How the numbers are worked out

The headline figure comes from your grid consumption statistics over the elapsed part of the
period (or the home-consumption formula, in `home` mode). Each stacked segment is a device from
the Energy dashboard's **Individual devices** list, and **Other** is whatever the headline figure
has left over once every device is subtracted — usually lighting, sockets and anything unmonitored.

Devices that are sub-metered off another device (Home Assistant's *"included in"* setting) are
excluded from the stack, so nothing is counted twice.

## Development

```bash
npm install
npm test          # unit tests for the period maths and aggregation
npm run build     # produces dist/energy-breakdown-card.js
npm run preview   # build, then serve .preview/ for a browser harness with mock data
```

`dist/` is committed so HACS can serve the card straight from the repository. CI fails if it is
out of date with `src/`.

## Licence

MIT

[hacs-badge]: https://img.shields.io/badge/HACS-Custom-41BDF5.svg
[hacs-repo-badge]: https://my.home-assistant.io/badges/hacs_repository.svg
[hacs-repo-url]: https://my.home-assistant.io/redirect/hacs_repository/?owner=fwhitten&repository=energy-breakdown-card&category=plugin
[hacs-url]: https://github.com/hacs/integration
[validate-badge]: https://github.com/fwhitten/energy-breakdown-card/actions/workflows/validate.yml/badge.svg
[validate-url]: https://github.com/fwhitten/energy-breakdown-card/actions/workflows/validate.yml
[releases]: https://github.com/fwhitten/energy-breakdown-card/releases/latest
[energy-docs]: https://www.home-assistant.io/docs/energy/
