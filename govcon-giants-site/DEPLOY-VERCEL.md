# Deploying GovCon Giants to Vercel

This is a static React (Vite) SPA — it deploys to Vercel with zero server code.

## Option A — Vercel CLI
```bash
npm i -g vercel
vercel          # from the project root
vercel --prod   # production deploy
```

## Option B — GitHub + Vercel dashboard
1. Push this repo to GitHub: `git remote add origin <your-repo-url> && git push -u origin master`
2. In Vercel: Add New → Project → Import the repo.
3. Vercel auto-detects **Vite**. Keep defaults:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy. The included `vercel.json` adds the SPA rewrite so
   `/podcast`, `/blog/...`, etc. resolve to `index.html` (client-side routing).

## Local development
```bash
npm install
npm run dev
```

## Content management
- Podcast episodes: `src/data/episodes.ts` (real data from the Govcon Giants
  Libsyn RSS feed). To refresh, re-export from https://govcongiants.libsyn.com/rss.
- Blog articles: metadata in `src/data/articles.ts`, bodies in `src/data/articleBodies.ts`.
- Platform links: `src/data/platforms.ts`.

## IMPORTANT — Placeholder photography
The photographic assets in `public/` (`eric-portrait.png`, `eric-mic.png`,
`about-timeline-flag.png`) are **stock placeholders**, not real photos of
Eric Coffie. Replace them with real brand photography before going live —
keep the same filenames and no code changes are needed.
