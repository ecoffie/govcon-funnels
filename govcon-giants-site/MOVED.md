# This app moved: ~/Projects/govcon-giants-podcast

The podcast site (podcast.govcongiants.org, Vercel project `govcon-giants-site`)
CANNOT live inside this repo: Next 16's production type-check walks the whole
project directory — it ignores tsconfig include/exclude AND .vercelignore — so
every govcon-funnels deploy failed on `./govcon-giants-site/src/App.tsx`
("Cannot find module 'react-router'") from 2026-07-23 20:45 until this move.
govcongiants.com was pinned to a stale deployment the entire time.

- Source of truth: `~/Projects/govcon-giants-podcast` (own git repo)
- Deploy: `vercel --prod` from that directory (linked to `govcon-giants-site`)
- Do NOT re-add the app's source under govcon-funnels — it will break every
  deploy of the main site again.
