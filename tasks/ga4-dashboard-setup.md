# GA4 Analytics Dashboard — Setup (Looker Studio embed)

In-app analytics at **`/dashboard/analytics`**, embedding a Looker Studio report
that reads the GA4 "GovCon Giants - Web" property. No service account / API auth —
Looker connects with your normal Google login.

## Why Looker (not the Data API)
We tried the GA4 Data API + service account, but: (1) GA4's access-management UI
hard-rejects `*.iam.gserviceaccount.com` emails ("doesn't match a Google Account"),
and (2) gcloud refused to mint a user token with the `analytics.edit` scope. Looker
sidesteps both — it authenticates as you, the property owner.

## What's built
- `src/app/dashboard/analytics/page.tsx` — embeds `NEXT_PUBLIC_LOOKER_EMBED_URL`
  in an iframe; shows setup instructions until the URL is set.
- Nav link in `DashboardNav.tsx`.

## Setup steps
### 1. Build the report
- Go to https://lookerstudio.google.com → **Create → Report**
- Add data source → **Google Analytics** → account SC → property **GovCon Giants - Web** (539735738)
- Drop in: scorecards (Active users, New users, Sessions, Views), a time-series,
  and a table of Landing pages.
- (Optional A/B panel) Add a table filtered to events `ab_test_assignment` /
  `ab_test_conversion`, broken down by `variant_name`. Requires the custom
  dimensions below.

### 2. Register A/B custom dimensions (for the A/B panel)
GA4 → Admin → **Custom definitions → Create custom dimensions** (event-scoped):
- `variant_id` → event parameter `variant_id`
- `variant_name` → event parameter `variant_name`
Not retroactive — populates from creation forward.

### 3. Get the embed URL
- In the report: **Share → Embed report** → toggle **Enable embedding** on
- Copy the iframe **src** URL (looks like `https://lookerstudio.google.com/embed/reporting/<id>/page/<id>`)

### 4. Wire it in
- Vercel → govcon-funnels → Settings → Environment Variables →
  add `NEXT_PUBLIC_LOOKER_EMBED_URL=<the embed src url>` (Production)
- Redeploy. `/dashboard/analytics` now shows the live report.
- (Or paste the URL directly into `page.tsx` `LOOKER_EMBED_URL` if you prefer.)

## Verify
- Visit `/dashboard/analytics` → the report renders.
- If it shows the amber "not configured" box → env var missing / not redeployed.

---

## Reference: GA4 property facts
- Live tag: `NEXT_PUBLIC_GA_ID=G-TX3KGZNTFQ` (deployed; replaced orphaned G-QNM9S4ZSNB)
- Property: **GovCon Giants - Web**, ID **539735738**, stream URL govcongiants.com
- `govcongiants.org` 308-redirects to `.com` (tag runs on .com)
- Timezone currently Los Angeles — consider switching to Eastern in Property details.

## Cleanup — trash old duplicate GA4 properties (after new one collects data)
⚠️ Permanent (35-day Trash). For each: **Admin → Property details → Move to Trash Can**
- 328855144 "Govcon Giants - GA4" (govcongiants.com G-STW8XR46GM + Teachable)
- 393613361 "info.govcongiants" (G-Q4J8S61TNP)
- 319948404 "govcongiants.c" (G-L9YH4YWS34) — confirm unused first
- 389669463 "Template Capa…"
- **KEEP** 233233178 "Evankoff - GA4" (evankoff.com)

## Note on the unused service account
`ga4-dashboard-reader@market-assasin.iam.gserviceaccount.com` was created but is
NOT used by the Looker approach. Safe to delete in GCP (IAM → Service Accounts),
or leave it. Its JSON key in the market-assassin repo is gitignored.

---

## GA4 property wiring — handoff state (2026-09-06)

**Property identity (accepted, verified via Analytics Admin API):**
- Numeric property ID: **539735738** ("GovCon Giants - Web")
- Measurement ID: **G-TX3KGZNTFQ**, stream URI `https://govcongiants.com`
- Verified UNIQUE: of the 9 properties the SEO service account can see, four claim
  govcongiants.com; only 539735738 carries G-TX3KGZNTFQ. Decoy to avoid:
  property 328855144 ("Govcon Giants - GA4", G-STW8XR46GM) — that is the tag in the
  legacy `govcon-giants-site/index.html`, NOT the live Next site.

**Env state:** `GA4_PROPERTY_ID=539735738` set in Vercel **Production** and
**Development** (newline-safe `printf`, verified len=9, no trailing \n).
NOT set in Preview — the SEO report never executes there.
`NEXT_PUBLIC_GA_ID` was not modified.

**⚠️ Deployment still required.** Env var added 2026-09-06 ~11:10 UTC; newest
production build is 2026-09-05 17:35 UTC. The running production predates the
variable, so the deployed cron still reports GA as unavailable. Local
`scripts/seo-report.ts` already returns `available: true` (sessions 3960, 8 channels)
because it reads `.env.local`. A production deploy is the remaining step.

**GA4_PROPERTY_ID_MINDY — leave untouched.** Appeared in Production/Preview/
Development on 2026-09-06, written concurrently by another session (owner not
identified). NOT required by the default cron: `src/app/api/cron/seo-report/route.ts`
scopes to govcongiants.com only, because market-assassin posts getmindy.ai and the
encore repo posts encoregov.com to #seo — reporting them here would duplicate.
It IS useful for deliberate manual runs (`?site=getmindy.ai`, `?site=all`,
`npx tsx scripts/seo-report.ts all`). Do not remove without identifying its owner.

### LATER CLEANUP (no code change made)

1. **Preview-tag filtering.** `NEXT_PUBLIC_GA_ID` is set in the Preview
   environment, so preview builds embed the production tag. Previews currently
   return 302 (Vercel SSO), but GA4 has already recorded sessions from
   `govcon-funnels-bqkkdakab-*.vercel.app` and `govcon-funnels-hwwksjng9-*.vercel.app`.
   Fix by one of: unset NEXT_PUBLIC_GA_ID in Preview, gate the tag on
   `VERCEL_ENV === 'production'` in `src/app/layout.tsx`, or add a GA4 internal /
   unwanted-hostname filter. There is no hostname guard in code today.

2. **Hostname reporting is split across the migration.** This property mixes
   `govcongiants.com` and `app.govcongiants.org`. Any trend read must segment by
   hostname or combine both — see the note below.

### Traffic reading — DO NOT quote the raw 28d number

The raw all-hostname figure (-33.3%, 3,908 vs 5,855 sessions) and the naive
.com-only figure (-85.7%) are BOTH misleading. Weekly hostname series shows a
relabeling, not a collapse: through 2026-08-01 essentially all sessions were
`govcongiants.com`; from the week of 2026-08-08 they shift to
`app.govcongiants.org` (last 7d: app 792 vs .com 66).

Cause: the one-site consolidation is INCOMPLETE. `next.config.ts` (2026-08-24)
has the `app.govcongiants.org → .com` redirect **commented out** to avoid an
infinite loop, pending the Phase 3 domain flip
(`tasks/PHASE3-domain-flip-runbook.md`). So app.govcongiants.org is a live
serving host, not a legacy one — the curl 308 observed at the apex comes from a
different layer and does not reflect where sessions are landing.

Correct apples-to-apples read = **combined .com + app.govcongiants.org**:
sessions 3,816 vs 5,816 (**-34.4%**), users 3,313 vs 4,893 (-32.3%).
That is the real trend; it is NOT a .com-specific collapse. Revisit after the
Phase 3 domain flip, when hostnames consolidate.
