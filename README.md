# Allen Huang — Portfolio

Bilingual (English / 简体中文) portfolio site built with [Astro](https://astro.build). It presents two tracks: AI evaluation and tooling, and game production and QA.

## Pages

Dark product-site layout: the first screen says who I am and what I work on (AI and games); each project is a chapter on the home page and has its own case-study page.

| Path | Page |
|---|---|
| `/` and `/zh/` | Home: intro, project chapters, about, contact |
| `/ai-portfolio-arena/` | AI Portfolio Arena: two LLMs trading paper portfolios (no account data shown) |
| `/ai-evaluation/` | GPT vs Claude: 25-case human evaluation, 13–4, 8 draws |
| `/am-7030/` | AM 70/30: weekly stock model, research log, gate bug (no amounts or returns) |
| `/ai-news-radar/` | AI News Radar: research terminal v1.0 |
| `/debt-runner/` | DebtRunner: four-person Unity roguelite, Spring Show 2026 |
| `/changelog/` | Changelog: every AI-generated version of this site, my review notes and what changed |

Every page exists in both languages; the Chinese version lives under `/zh/`.

## Where to edit

- **Project text (both languages):** `src/data/projects.ts`. Each string is `{ en, zh }`, so the two versions sit side by side. A case page is a list of blocks (`text`, `rules`, `log`, `figure`), so each project can tell its story in its own order.
- **Changelog:** entries in `src/data/changelog.ts`, screenshots in `src/assets/changelog/` (`name-en` / `name-zh`, or one shared `name`). Old versions are rebuilt from their commits for the screenshots.
- **Home page text:** `src/components/Home.astro`.
- **Shared UI strings and contact details:** `src/i18n.ts`.
- **Figures and diagrams:** `src/components/figures/`.
- **Images:** `src/assets/`. Astro resizes them and converts them to WebP at build time.
- **Styles:** `src/styles/global.css`.
- **Typesetting:** `src/integrations/no-orphans.mjs` runs after every build and joins the last four Chinese characters (word joiners) or the last two English words (no-break space) of each text block, so no line ends with a lone character or word.
- **Nav and scrolling:** `src/scripts/nav.ts`. In-page links glide (cubic ease-in-out, up to 1.05 s); a new page always opens at its top; the nav slides away while reading down and returns on any scroll up or keyboard focus. The progress line on the top edge has one checkpoint per section (`data-cp`): passing it pops the dot and briefly names the section. Timings follow [Motion Prompt](https://github.com/showheyohtaki/motion-prompt) #093, #075, #079, #068 and #001 (MIT).

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

Only `dist/` is published.

## Content boundaries

- AI Portfolio Arena: paper accounts only. The site shows no account data, positions, orders or returns, and does not embed the local dashboard.
- AM 70/30: model design, research log and bug diagnosis. No money amounts or returns. The repository is private.
- AI evaluation: results apply to the documented 25-case, single-rater set only.
- DebtRunner: team project; the page lists only the author's role. The QA/LQA sample separates performed work from practice material.
