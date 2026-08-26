# GovCon Funnels

## Identity

This is the **$82 BILLION UNSPENT** homepage project. Same target if Eric says "the $82B page", "govcon funnels", "main marketing site", or "the hero with unspent money".

Canonical public hostname is **govcongiants.com**. `govcongiants.org` and www hosts 308 to apex `.com` (`vercel.json`, `next.config.ts`). Those compatibility redirects are load-bearing. Do not remove them. Libsyn episode descriptions already shipped `.org` links.

Framework versions live in `package.json` (Next.js, React, TypeScript, Tailwind). Do not restate them here.

This is the marketing site. It is not getmindy.ai / market-assassin. Some routes and a shared database couple the two products. Do not import `market-assassin/src/lib/marketing-stats.ts`. There is no `npm run migrate` and no `/api/cron/dispatch` in this tree.

`~/CLAUDE.md` may appear in a Cursor session. That load path is not a documented Cursor guarantee. Instructions in this file and `.cursor/rules/` must be enough without it. When a home-file Market Assassin rule conflicts with `package.json`, `vercel.json`, `tsconfig.json`, or CI in this repo, those files win.

## Authorization

Do not commit, push, open or merge a PR, or deploy unless Eric explicitly asked for that action in the current conversation.

Non-trivial work belongs in a git worktree: `git worktree add .claude/worktrees/<short-slug> -b <category/kebab> <start-ref>`. Do not commit from a shared checkout that is on `main`.

## Sub-apps

`govcon-giants-site/`, `dashboard/`, and `govcon-crm2/` are separate toolchains. Root `tsconfig.json` excludes `govcon-giants-site`. Root `eslint.config.mjs` ignores `govcon-giants-site/**`. Do not re-include them in the main app toolchain. Do not copy a Vite tsconfig to the repo root. Do not add another TypeScript app subdirectory. Next 16 type-check can walk the project dir and break the main Vercel build. JS-only `govcon-crm2/` is tolerated.

**Unresolved (podcast live source).** Competing artifacts, none chosen here:

- in-repo `govcon-giants-site/` with its own `package.json` and `vercel.json`
- `tasks/PHASE2-podcast-and-consolidation.md` (fold public podcast into `.com/podcast`; build not started as of 2026-08-24)
- `next.config.ts` treats `podcast.govcongiants.org` as a legacy host redirecting to `.com`
- `vercel.json` sends `/podcast` to `podcast.govcongiants.org`
- `src/app/api/lead/route.ts` CORS allowlists both apex and the podcast host, and comments that the SPA serves apex

Keep the toolchain fence. Do not invent a single live-host story.

## Command center

`/dashboard/command-center` (auth gated). Tables are created by `supabase/migrations/20260817_command_center.sql`. The synthetic suite is `src/lib/synthetic.ts`. On-demand run is `POST /api/command-center/verify` (`src/app/api/command-center/verify/route.ts`). After a production deploy Eric asked you to make, run that verify. If `ok` is false, report the failing checks before doing anything else.

**Unresolved (verify and canary hosts).** `src/lib/synthetic.ts` sets `SITE` to `https://govcongiants.com` and `LEAD_API` to `https://app.govcongiants.org/api/lead`. `next.config.ts` 308s the `app.` host to `.com`. Do not assert which public hostname currently serves the route. Read those files.

SEO health-check default host vs the one-site cutover is also unresolved (`scripts/seo-health-check.sh` vs `next.config.ts`). Do not document either comment as current production topology.

## Cron (hybrid)

Two Vercel crons in `vercel.json`:

- `/api/cron/seo-report`
- `/api/cron/synthetic-checks`

Some event/marketing routes in this tree are scheduled by Market Assassin `cron_jobs` rows. See comments on `src/app/api/cron/mindy-reignite/route.ts` and `src/app/api/cron/mindy-day-reminders/`. This is not "all Vercel" and not "never Vercel."

## Routing

`vercel.json` redirects, then `next.config.ts` redirects/rewrites, then App Router, then `public/`. Static HTML in `public/` must use absolute paths (`/proposal-bootcamp/2-upsell.html`). Details: `.cursor/rules/routing.mdc`.

Do not describe `/bootcamp`, `/free-course`, or `/proposal-bootcamp` as live funnels without reading `vercel.json`. `/opp` is defined in `next.config.ts`.

## Email

Two implementations, both current:

- List/nurture: Brunson plain-letter in `src/lib/mindy-reignite-emails.mjs` (rule: `.cursor/rules/nurture-email.mdc`)
- Event/transactional: designed HTML in `src/lib/email.ts`

Do not collapse these into one house style.

## SAM.gov

Entity API v3 requires `samRegistered=Yes` and `page=0`. Do not pass comma-separated NAICS. Rule: `.cursor/rules/sam.mdc`. Code: `src/lib/sam/entity-api.ts`. Longer notes: `tasks/lessons.md`.

Job board libraries are `src/lib/jsearch.ts` (private sector) and `src/lib/usajobs.ts` (federal).

## Leads

`POST /api/lead` (`src/app/api/lead/route.ts`). Fan-out is defined there (CRM, Supabase, Slack, confirmation email, pipeline log). CORS allowlist is in that file.

## Related products

- Shop: `shop.govcongiants.org`
- Pro tools: `getmindy.ai` (this repo redirects `tools.govcongiants.org` and `/opp` there)

## How to run

See `package.json` scripts. `npm run test:unit`, `npm run build`, and `npm run audit:selects` are the blocking CI jobs in `.github/workflows/test.yml`. Also available: `npm run dev`, `npm run test:integration`, `npm run test:sam`, `npm run lint`. Do not cite a frozen test or guide count. Run the script or list the tree.

Env names live in Vercel. Do not paste secrets into this file.

## Durable lessons (still true)

- A green local `next build` is not proof the Vercel build works if a TypeScript sub-app sits in this repo without its deps installed on the build machine.
- Do not grep Turbopack HTML for inlined `NEXT_PUBLIC_*` values. Drive a browser and watch the network.
- Use `printf`, not `echo`, when piping values into `vercel env add`. A trailing newline breaks constant-time password compares.
- Partner outbound links that should pass SEO equity use `rel="noopener"` without `noreferrer`.

## On-demand, not this file

File maps, env inventories, and dated changelog: read the tree, Vercel env, `tasks/todo.md`, and `tasks/work-history.md`.
