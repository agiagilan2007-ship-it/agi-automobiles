[README.md](https://github.com/user-attachments/files/32564837/README.md)
# Agi Automobiles

A front-end website for a fictional car dealership and service shop, built with plain HTML, CSS and JavaScript — no frameworks, no build step. Open `index.html` in a browser, or deploy the folder as-is to any static host (this project is already linked to Vercel).

## What it does

The site has four pages sharing one stylesheet and one script file:

| Page | Purpose |
|---|---|
| `index.html` | Home — hero section, four animated stat counters, featured models, call-to-action |
| `services.html` | Services offered, with a canvas-drawn dyno gauge that toggles between "before" and "after" tuning horsepower |
| `shop.html` | Filterable car inventory, a Chart.js bar chart comparing horsepower and mileage across the lineup, and a colour configurator that recolours an SVG car live |
| `contact.html` | Enquiry form with client-side validation and a business info panel |

## Features / what's "coded" here

- **Animated counters** — stats count up from zero when scrolled into view, using `IntersectionObserver` and `requestAnimationFrame`.
- **Inventory filter** — clicking a type button (Hatchback / Sedan / SUV / Sport) shows/hides matching cars with pure JS, no page reload.
- **Colour configurator** — clicking a swatch changes the `fill` attribute of an inline SVG car in real time.
- **Spec comparison chart** — a [Chart.js](https://www.chartjs.org/) bar chart (loaded from a CDN) plots horsepower and mileage per model.
- **Dyno gauge** — a hand-drawn `<canvas>` arc gauge that redraws when you toggle before/after tuning state.
- **Form validation** — the contact form checks required fields and email format before showing a success message, all client-side.

## Tech stack

- HTML5, CSS3 (custom properties for the colour/type tokens, responsive grid/flex layout, no framework)
- Vanilla JavaScript (`script.js` — one file, feature-detects which page it's on)
- [Chart.js](https://www.chartjs.org/) via CDN for the spec comparison chart
- Google Fonts: **Rajdhani** (headings) and **Inter** (body text)

## File structure

```
agi-automobiles/
├── index.html
├── services.html
├── shop.html
├── contact.html
├── style.css
└── script.js
```

## Design notes

The palette is a dark charcoal base (`#0b0d10`) with a racing-red accent (`#e63946`) and an amber highlight (`#f2a93b`) — meant to read as a garage/dealership rather than a generic SaaS template. All car imagery is inline SVG rather than photos, so the site has no broken image links and no external image dependencies.

## Running locally

No install needed — just open `index.html` in a browser. For a local server (recommended so the CDN script and fonts load the same way they will in production):

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploying

The repo is already connected to Vercel (`agi-automobiles.vercel.app`). Pushing these files to `main` will redeploy automatically. For any other static host, just upload the six files listed above.

## Possible next steps

- Replace the placeholder inventory data with a real dataset (JSON file + `fetch`)
- Wire the contact form to an actual backend or form service (e.g. Formspree)
- Add a dark/light theme toggle
- Add real vehicle photography once available
