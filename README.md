# Allen Huang — Portfolio

Bilingual (English / 简体中文) portfolio site built with [Astro](https://astro.build). It presents two tracks: AI evaluation and tooling, and game production and QA.

## Pages

The site is laid out as a fixture board: each project is a match between two sides, and each project page is a match report (scoreboard, rules, play-by-play, figures).

| Path | Match |
|---|---|
| `/` and `/zh/` | Home: name, score ribbon, fixture board, highlights, player card, contact |
| `/ai-portfolio-arena/` | Claude vs GPT: two models trading paper portfolios (no account data shown) |
| `/ai-evaluation/` | GPT vs Claude: 25-case human evaluation, 13–4, 8 draws |
| `/am-7030/` | AM 70/30 vs SPY: weekly stock model, research log, gate bug (no amounts or returns) |
| `/ai-news-radar/` | Story vs evidence: research terminal v1.0 |
| `/debt-runner/` | Player vs debt: four-person Unity roguelite, Spring Show 2026 |

Every page exists in both languages; the Chinese version lives under `/zh/`.

## Where to edit

- **Match text (both languages):** `src/data/projects.ts`. Each string is `{ en, zh }`, so the two versions sit side by side. A match report is a list of blocks (`text`, `rules`, `log`, `figure`), so each project can tell its story in its own order.
- **Home page text:** `src/components/Home.astro`.
- **Shared UI strings and contact details:** `src/i18n.ts`.
- **Figures and diagrams:** `src/components/figures/`.
- **Images:** `src/assets/`. Astro resizes them and converts them to WebP at build time.
- **Styles:** `src/styles/global.css`.
- **Typesetting:** `src/integrations/no-orphans.mjs` runs after every build and joins the last four Chinese characters (word joiners) or the last two English words (no-break space) of each text block, so no line ends with a lone character or word.
- **Nav and scrolling:** `src/scripts/nav.ts`. In-page links glide (cubic ease-in-out, up to 1.05 s); a new page always opens at its top; the nav slides away while reading down and returns on any scroll up or keyboard focus, with a 2px progress line on the top edge. Timings follow [Motion Prompt](https://github.com/showheyohtaki/motion-prompt) #093, #075 and #079 (MIT).

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
- AM 70/30: model design, research log and bug diagnosis. No money amounts or returns. The repository is private.
- AI evaluation: results apply to the documented 25-case, single-rater set only.
- DebtRunner: team project; the page lists only the author's role. The QA/LQA sample separates performed work from practice material.
