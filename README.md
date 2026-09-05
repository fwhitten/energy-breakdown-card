# Energy Breakdown Card

[![hacs][hacs-badge]][hacs-url]
[![validate][validate-badge]][validate-url]

[![Open your Home Assistant instance and open this repository inside the Home Assistant Community Store.][hacs-repo-badge]][hacs-repo-url]

Two Lovelace cards for Home Assistant that show where your energy actually goes. Both read your
**Energy dashboard** configuration directly — no entity wiring — and one HACS install provides both.

- **`custom:energy-breakdown-card`** — a stacked bar chart of energy (kWh) broken down by device,
  with a headline total and a comparison against the previous period.
- **`custom:power-breakdown-card`** — live power (W) as a threshold-coloured line, with an animated
  per-device distribution bar. See [Power Breakdown Card](#power-breakdown-card).

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
- Everything is converted to kWh by the recorder, so devices logging in Wh line up with the rest
- Stacked per-device breakdown, plus an **Other** segment for consumption no device accounts for,
  so the bars always add up to your real total
- Headline consumption for the period with an optional `+/-%` against the previous one
- Step back and forward through earlier periods with the arrows beside the period button
- Exclude a device from the total so it can be broken out onto a card of its own
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
name: Home energy
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
| `name` | string | — | Optional heading across the top of the card. |
| `icon` | string | `mdi:lightning-bolt` | Any Home Assistant icon, shown top left. |
| `show_period_button` | boolean | `true` | Show the button that cycles the time period. |
| `show_navigation` | boolean | `true` | Show the arrows that step through earlier periods. |
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
| `rounded_bars` | boolean | `true` | Rounded bar caps. |
| `first_day_of_week` | string | `auto` | `auto`, `monday` or `sunday`. |
| `devices` | list | — | Per-device `stat` plus optional `name`, `color`, `hidden`, `excluded`. |

### Per-device options

| Key | Effect |
| --- | ------ |
| `name` | Overrides the Energy dashboard's name. |
| `color` | Fixes the segment colour instead of taking a palette slot. |
| `hidden` | Removes the device's own segment, but its consumption still counts towards the total (it lands in **Other**). |
| `excluded` | Takes the device out of the total entirely, so the headline figure and the bars both drop by its consumption. Implies `hidden`. |

Palette slots follow each device's position in the Energy dashboard, so hiding or excluding one
does not recolour the others.

## Comparison

The current period is nearly always incomplete, so comparing "today so far" against *all* of
yesterday is misleading. `comparison_mode` controls how that is handled:

- **`like_for_like`** (default) — compares against the same elapsed slice of the previous period,
  so at 10:30 today it measures against 00:00–10:30 yesterday.
- **`full_previous`** — compares against the whole previous period.
- **`projected`** — extrapolates the current period to a full period, then compares against the
  whole previous one. Smoother, but it is a forecast.

## Sizing

The chart fills whatever height the card is given, so in a **sections** dashboard you resize the
card by dragging it and the graph grows or shrinks with it — the legend stays pinned underneath.
Gridlines thin out automatically on short cards.

In layouts that do not give the card a height of its own (masonry views, for example) it falls back
to a 240px minimum, which you can change with a CSS variable:

```yaml
card_mod:
  style: |
    :host { --ebc-min-height: 320px; }
```

### Appearance variables

| Variable | Default | Effect |
| -------- | ------- | ------ |
| `--ebc-min-height` | `240px` | Height floor when the layout gives the card none. |
| `--ebc-icon-size` | `1.6em` | Size of the icon beside the total. |
| `--ebc-icon-color` | `--primary-text-color` | Icon colour. |
| `--ebc-period-background` | 9% text colour | Period button background. |
| `--ebc-period-color` | `--primary-text-color` | Period button text. |

## Splitting a device onto its own card

To keep a big, spiky load like an EV charger from swamping everything else, exclude it from the
main card and give it one of its own. The main card's total drops by the EV's consumption:

```yaml
# Everything except the EV charger
type: custom:energy-breakdown-card
icon: mdi:home-lightning-bolt
devices:
  - stat: sensor.ev_charger_energy
    excluded: true
```

```yaml
# The EV charger on its own, totalling just that device
type: custom:energy-breakdown-card
name: EV charger
icon: mdi:ev-station
total_mode: devices
show_other: false
devices:
  - stat: sensor.lights_energy
    hidden: true
  - stat: sensor.tv_energy
    hidden: true
```

With `total_mode: devices` the headline is the sum of the devices still shown, so the second card
reports the EV charger alone. Both cards can be configured entirely from the visual editor — the
**Σ** button on each device row excludes it from the total, and the eye button hides it.

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

Legend and tooltip figures carry as much precision as their size warrants — 0.12, 1.2, 12, 123 —
so a small device is not rounded away and a large one is not padded with noughts. The headline
keeps two decimals.

The headline figure is the sum of the buckets the chart draws, so it always agrees with the legend
beneath it. Buckets after the present are empty, so the figure is the period to date without
discarding any of the in-progress hour or day.

The comparison is worked out separately, over the previous period. Where `like_for_like` has to cut
that period part way through an interval, the interval is apportioned by how much of it falls
inside the range.

All statistics are requested in kWh, so a device recording in Wh is converted for you rather than
being stacked a thousand times too large. Sources that only expose a running total (many
externally imported statistics) have their per-bucket change derived from it.

Devices that are sub-metered off another device (Home Assistant's *"included in"* setting) are
excluded from the stack, so nothing is counted twice.

## Troubleshooting

**"Showing the device total only"** — the card could not get a figure from your grid source, so it
is showing the sum of your individual devices instead. The message says which case you are in:

- *no grid consumption source was found* — the Energy dashboard has no grid source the card can
  read. The configured source types are listed in the message.
- *no data came back for `<statistic>`* — the source exists but returned no statistics for the
  period. Check that statistic still records data under **Developer tools → Statistics**.

In this state the **Other** segment is not shown, because there is no total to subtract devices
from.

## Power Breakdown Card

`custom:power-breakdown-card` charts instantaneous power rather than accumulated energy. It reads
the **power** entities from the same Energy dashboard configuration — `stat_rate` on each
individual device, and `stat_rate` or `power_config` on your grid connection — so if you filled in
the optional power sensor when adding a device, there is nothing else to configure.

- A continuous line over the last *n* hours, with the line and the area beneath it coloured by
  configurable power thresholds that shade smoothly from one into the next
- An optional distribution bar showing how the current draw splits across your devices, animated
  as the readings change
- A legend of live per-device power beneath it
- Windows up to 6 hours use the recorder's own history, so short spikes survive; longer windows use
  five-minute statistics, which are far lighter and outlive the recorder's purge window
- Missing readings render as a break in the line, not a drop to zero

```yaml
type: custom:power-breakdown-card
name: Home power
icon: mdi:flash
hours: 3
thresholds:
  - value: 0
    color: "#4caf50"
  - value: 1500
    color: "#ffa726"
  - value: 4000
    color: "#f44336"
```

### Power options

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `name` | string | — | Optional heading across the top of the card. |
| `icon` | string | — | Any Home Assistant icon, shown beside the figure. |
| `hours` | number | `3` | How many hours of history the line covers. |
| `total_mode` | string | `grid` | `grid`, `home` (grid + solar + battery) or `devices` (sum of devices). |
| `thresholds` | list | green/amber/red at 0 / 1500 / 4000 W | `value` in watts plus `color`. Colours interpolate between them. |
| `y_max` | number | fit to the window | Fix the axis maximum in watts. |
| `show_axes` | boolean | `true` | Axis labels and gridlines. Turn off for a bare sparkline. |
| `smooth` | boolean | `false` | Join readings with sloped lines instead of steps. |
| `show_peak` | boolean | `true` | The window's peak, under the current figure. |
| `show_distribution` | boolean | `true` | The per-device distribution bar. |
| `show_legend` | boolean | `true` | Live per-device figures under the bar. |
| `show_other` | boolean | `true` | Show the unaccounted-for remainder in the bar and legend. |
| `max_devices` | number | `8` | Devices shown individually; the rest fold into **Other**. |
| `devices` | list | — | Per-device `stat` plus optional `name`, `color`, `hidden`, `power_entity`. |

`power_entity` is only needed for a device with no power sensor set in the Energy dashboard — it
overrides what the card would otherwise read from there.

The axis fits the window by default, so quiet periods stay legible. Set `y_max` if you would rather
a given height always meant the same wattage.

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
