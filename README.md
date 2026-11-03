# Bangladesh Development Trajectory

An interactive React + Tailwind dashboard that assesses Bangladesh's development path against a combined
**20-point Framework of Prerequisite Indicators** (10 hardware, 10 software). Facts are current to **3 November 2026**.

Open `dist/index.html` in any browser. It is a single self-contained file: React is bundled in, Tailwind is
precompiled, and only Google Fonts load from the network.

## What's inside

| Tab | Contents |
|---|---|
| 🛠️ Hardware & Software Fixes | All 20 indicators with status badges (Critical Deficit / In Progress / Strategic Asset), readiness meters against a 2035 target, root causes, fixes sequenced over 0–2, 2–5 and 5–10 years, and a critical-path view of the order the fixes must happen in. |
| 🌐 Foreign Power Matrix | A dependence heatmap (India, China, US, Japan, EU, Russia, Gulf × 7 channels), a side-by-side comparison of any two powers (benefits, risks, debt, sovereignty cost, leverage), dossiers, and a trade-bloc and agreement tracker. |
| 🗺️ Regional Integration & "Sister States" | A schematic corridor map (nodes at real coordinates) with status-coded links, a Northeast India ledger with border lengths, and Myanmar/Rakhine and ASEAN theatre cards. |
| 🔮 10–20 Year Decadal Outlook | A timeline slider (2026 → 2030 → 2035 → 2040 → 2045) with a play button, three scenarios (Reform breakout / Muddle-through / Stall & shock), national metrics, urban/rural/coastal panels, an income-path chart with a table view, and infrastructure and policy milestones. |

The header carries a 20-cell "framework pulse" (select a cell to open that indicator), a 2026 context strip
and a live countdown to the Ganges Water Treaty expiry. Light, dark and system themes are supported. The
active tab is kept in the URL hash (`#fixes`, `#powers`, `#region`, `#outlook`).

## Build

```bash
npm install
npm run build   # writes dist/index.html (full page) and dist/artifact.html (body fragment)
```

## Layout

```
src/
  data/framework.js   20 indicators, statuses, fixes, critical path
  data/powers.js      foreign powers, dependence ratings, agreements
  data/region.js      map nodes and corridors, Sister States, theatres
  data/outlook.js     scenarios, projections, narratives, milestones
  components/ui.jsx   badges, meters, accordions, segmented controls
  tabs/*.jsx          one component per tab
  App.jsx             header, pulse, tabs, theme, sources
  styles.css          colour tokens (light/dark) + Tailwind layers
scripts/build.mjs     esbuild + Tailwind CLI → inline HTML
```

## Method

Facts come from public reporting and official statistics; the full source list is in the dashboard footer.
Status badges, readiness scores, dependence and sovereignty ratings, and every figure after 2026 are analyst
judgements and **illustrative scenarios, not forecasts**.
