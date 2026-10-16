# Allen Huang — Portfolio

A standalone static portfolio built with HTML, CSS, and JavaScript. It has no package manager or build step.

## Pages

- Home: personal introduction, selected work, working approach, and contact.
- AI News Radar: bilingual product case study.
- AI Portfolio Arena: auditable AI decision experiment, limited to simulated Paper accounts.
- AI evaluation pilot: 25 cases, five dimensions, one reviewer; not a general benchmark.
- DebtRunner: four-person, four-week Unity 6 / URP roguelite prototype.

## Run locally

From the repository root, run:

    python -m http.server 8000

Then open http://127.0.0.1:8000/.

## GitHub Pages

This repository includes a GitHub Actions workflow for Pages. In the repository settings, set Pages to use GitHub Actions. Pushes to main then publish the static files.

The site uses relative internal links so it works at a GitHub Pages project URL as well as at a domain root.

## Content and data boundaries

- AI Portfolio Arena is a Paper simulation. Strategy performance is unvalidated; the case page makes no returns or investment claims.
- The portfolio does not publish Paper account data, positions, orders, or runtime records.
- AI evaluation findings remain limited to the documented sample and single reviewer.
- The product and game illustrations are design diagrams, not live or in-game screenshots.

Project details are based on the available repository materials. Update the role descriptions and public contact path before treating the site as a final resume.
