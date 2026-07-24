# Plan — GovCon Giants Website (tim.blog-style)

## Goal
Build a tim.blog-inspired personal-brand / blog / podcast hub website for **GovCon Giants**
(Eric Coffie) and the **Govcon Giants Podcast**. Deliverable = full source code that the user
can push to Vercel, plus a live preview version.

## Reference analysis (DONE)
- **tim.blog structure**: dark hero w/ portrait + email capture → podcast section w/ platform
  buttons (Apple/Spotify/YouTube) → latest articles feed w/ thumbnails → popular articles →
  categories → about blurb → footer w/ newsletter. Nav: About, Blog, Books, Podcast, TV,
  search, FREE NEWSLETTER CTA.
- **GovCon Giants brand**: dark navy background, green accent (Giants = green), white text.
  Assets: Govcon Giants Podcast (45 real episodes pulled from libsyn RSS), "The Daily Windup",
  YouTube channel, book "Billion Dollar Playbook", Mindy AI product (govcongiants.com).

## Stage 1 — Content dataset (Orchestrator)
- Parse libsyn RSS → JSON dataset of episodes (title, date, description, duration, link).
- Write brand brief (colors, tone, bio facts about Eric Coffie) + site copy skeleton.
- Output: `content/episodes.json`, `content/brand-brief.md`.

## Stage 2 — Design & Build (skill: vibecoding-webapp-swarm)
- Load `/app/.agents/skills/vibecoding-webapp-swarm/SKILL.md` at stage start.
- Stack: React + TypeScript + Tailwind (+ shadcn/ui where useful), react-router multi-page.
- Vercel-ready: standard build output + `vercel.json` + README with deploy instructions.
- Pages:
  1. **Home** — hero (portrait-style visual + headline + email capture), podcast strip w/
     Apple/Spotify/YouTube buttons, latest articles, popular articles, about-Eric blurb,
     newsletter CTA, footer. (mirrors tim.blog)
  2. **Podcast** — full episode archive from real RSS data w/ search/filter.
  3. **Blog** — article grid (GovCon topics).
  4. **Article detail** — readable long-form layout.
  5. **About** — Eric Coffie story, stats, timeline.
  6. **Resources/Books** — Billion Dollar Playbook + free guides.
  7. **Start Here** — new visitor onboarding (like tim.blog/new-start-here).
- Sub-agents: design lead + build agents per skill workflow.
- Output: working project under `/mnt/agents/output/govcon-giants-site/`.

## Stage 3 — Verify & Deliver
- Install deps, production build must pass (no TS errors).
- Reviewer sub-agent checks against tim.blog reference + brand brief.
- Call `website_version_manager` build_version for preview URL.
- Deliver: project folder + preview URL + Vercel deploy instructions.

## Constraints
- Dark navy + green brand palette (match GovCon Giants identity; avoid purple gradients
  from Mindy product page — keep editorial/blog feel of tim.blog).
- Low-saturation, warm-neutral editorial design; no blue-purple gradient backgrounds.
- All content in English. Real episode data only (no fabricated stats beyond verified facts).
