# ft_holy

An interactive map of the 42 curriculum, to explore the projects and follow any student's progression.

**[Open the live app →](https://42-cursus-treig.github.io/ft-holy/)**

## Features

- **The whole curriculum as a graph**: Piscine, old common core, new common core and Mastery, each project linked to its prerequisites.
- **Anyone's progression**: open `/ft-holy/<login>` or use the search bar to see a student's validated, failed and in-progress projects, with their marks and level, fetched live from the 42 intra.
- **Automatic common-core detection**: the app works out whether a student follows the old or the new common core and shows the right graph.
- **Project details**: description, mark and a direct link to the subject.
- **Themes**: several visual themes (*Sur les toits*, *Encre & Vélin*) with animated backgrounds.
- **Embeddable**: a `?compact` mode to display the map inside another page.

## Stack

- **Front end**: React 19, Vite, React Flow (`@xyflow/react`), dagre for the layout, Tailwind CSS.
- **API**: a Cloudflare Worker that queries the 42 intra API, with a KV cache to limit requests.
- **Hosting**: GitHub Pages, deployed with GitHub Actions.

## Run locally

```bash
npm install
npm run dev
```

Without an API, the app shows the progression stored in `public/progress.json`. To look up other students, set `VITE_API_BASE` to the URL of the deployed worker.

### API (`api/`)

The worker needs a 42 API application (`FT_UID`, `FT_SECRET`) and a KV namespace bound as `CACHE`:

```bash
cd api
npx wrangler secret put FT_UID
npx wrangler secret put FT_SECRET
npx wrangler deploy
```

## Author

Tristan Reig ([@tristan-reig](https://github.com/tristan-reig)), student at 42 Perpignan.
