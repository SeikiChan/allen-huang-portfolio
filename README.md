# Allen Huang — Portfolio

Bilingual (English / 简体中文) portfolio site built with [Astro](https://astro.build). It presents two tracks: AI evaluation and tooling, and game production and QA.

## Pages

| Path | Content |
|---|---|
| `/` and `/zh/` | Home: positioning, evidence strip, AI projects, games, approach, contact |
| `/ai-evaluation/` | GPT vs Claude 25-case human evaluation |
| `/ai-portfolio-arena/` | Auditable two-model paper experiment (structure only; no account data) |
| `/ai-news-radar/` | Local-first research terminal, v1.0 |
| `/quant-research/` | Measurement-basis bugs in a weekly equity system (no amounts or returns) |
| `/debt-runner/` | Four-person Unity roguelite, Spring Show 2026 |

Every page exists in both languages; the Chinese version lives under `/zh/`.

## Where to edit

- **Project text (both languages):** `src/data/projects.ts`. Each string is `{ en, zh }`, so the two versions sit side by side.
- **Home page text:** `src/components/Home.astro`.
- **Shared UI strings and contact details:** `src/i18n.ts`.
- **Figures and diagrams:** `src/components/figures/`.
- **Images:** `src/assets/`. Astro resizes them and converts them to WebP at build time.
- **Styles:** `src/styles/global.css`.

### Media still to supply

- DebtRunner gameplay video (60–90 s). The slot is the `debt-video` placeholder in `src/components/figures/Debt.astro`.

## Run locally

Requires Node 22.12 or newer.

    npm ci
    npm run dev       # http://localhost:4321
    npm run check     # type check
    npm run build     # static output in dist/

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to GitHub Pages on every push to `main`. In the repository settings, set Pages → Source to **GitHub Actions**. The workflow passes the Pages URL and base path to the build, so links work at a project URL and at a custom domain.

Only `dist/` is published. `design-concepts/` holds earlier design explorations and is not part of the public site.

## Content boundaries

- AI Portfolio Arena: paper accounts only. The site shows no account data, positions, orders or returns, and does not embed the local dashboard.
- Quant research: methodology and bug diagnosis only. No money amounts or returns. The repository is private.
- AI evaluation: results apply to the documented 25-case, single-rater set only.
- DebtRunner: team project; the page lists only the author's role. The QA/LQA sample separates performed work from practice material.
