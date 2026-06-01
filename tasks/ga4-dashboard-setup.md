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
