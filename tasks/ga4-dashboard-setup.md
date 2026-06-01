# GA4 Analytics Dashboard — Setup

In-app analytics at **`/dashboard/analytics`**, powered by the GA4 Data API.
Code is built and committed; it just needs a service account + 3 env vars.

## What's already built
- `src/lib/ga4.ts` — GA4 Data API client (totals, top landing pages, /mi-free A/B test)
- `src/app/api/analytics/route.ts` — `GET /api/analytics?days=28` (cached 10 min)
- `src/app/dashboard/analytics/page.tsx` — the dashboard UI
- Nav link added in `DashboardNav.tsx`
- Dependency: `@google-analytics/data` (installed)

## Background (why we started fresh)
GA4 was fragmented across 5+ properties. `govcongiants.org` 308-redirects to
`govcongiants.com`, where the live tag `G-QNM9S4ZSNB` runs — but that ID matched
NONE of the existing data streams (orphaned). Decision (2026-06-01): create ONE
clean property and trash the dead duplicates. See memory `reference-ga4-properties-map`.

## Setup steps (Google side, ~15–20 min)

### 1. Create a clean GA4 property
- **Admin → Account column → Create → Property**
- Name: **`GovCon Giants - Web`**, timezone US Eastern, currency USD
- Add a **Web** data stream → URL `govcongiants.com` (the .org redirects here)
- Copy the new **Measurement ID** (`G-XXXXXXXX`) → this becomes `NEXT_PUBLIC_GA_ID`
- Copy the numeric **Property ID** (Admin → Property details) → this becomes `GA4_PROPERTY_ID`

### 2. Create a service account
1. https://console.cloud.google.com/ → pick/create a project
   (the existing `market-assasin` project works fine).
2. **APIs & Services → Library →** enable **"Google Analytics Data API"**.
3. **IAM & Admin → Service Accounts → Create service account**
   - Name: `ga4-dashboard-reader`
   - No project roles needed.
4. On the new SA → **Keys → Add key → JSON**. Download it.

### 3. Grant the SA access to the GA4 property
In **GA4 → Admin → Property Access Management → +  →**
- Add the service account email (`...@....iam.gserviceaccount.com`)
- Role: **Viewer**

### 4. Set env vars (local `.env.local` AND Vercel)
From the downloaded JSON:
```
NEXT_PUBLIC_GA_ID=G-TX3KGZNTFQ       # NEW "GovCon Giants - Web" property (replaces orphaned G-QNM9S4ZSNB)
GA4_PROPERTY_ID=539735738            # numeric property id for the Data API
GA4_SA_CLIENT_EMAIL=ga4-dashboard-reader@market-assasin.iam.gserviceaccount.com
GA4_SA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```
New property "GovCon Giants - Web" — Property ID **539735738**, Measurement ID
**G-TX3KGZNTFQ**, Stream ID 14980314319, stream URL govcongiants.com.
(Timezone is currently Los Angeles — consider switching to Eastern in Property details.)
- `GA4_SA_PRIVATE_KEY` must keep the `\n` escapes (the code converts them back).
- In Vercel: Settings → Environment Variables → add all three (Production + Preview).

### 5. (For per-variant A/B reporting) register custom dimensions
The /mi-free test sends `variant_id` / `variant_name` as event params. GA4 only
reports custom params if registered as custom dimensions:
- **GA4 → Admin → Custom definitions → Create custom dimensions** (event-scoped):
  - `variant_id`  → event parameter `variant_id`
  - `variant_name` → event parameter `variant_name`
- Note: custom dimensions are **not retroactive** — they populate from creation
  date forward. Until then the A/B panel will show "(unset)" buckets.

## Verify
```
npm run dev
# visit http://localhost:3000/dashboard/analytics
# or hit the API directly:
curl 'http://localhost:3000/api/analytics?days=28' | jq
```
- 503 "GA4 not configured" → env vars missing.
- 502 with a permission message → SA not granted Viewer on the property.
- 200 with numbers → done.

## Cleanup — delete the old junk (LAST, only after new property shows data)
⚠️ Permanent (GA Trash holds 35 days, then gone). Trash only what's truly dead:
For each: **Admin → Property details → Move to Trash Can**
- 328855144 "Govcon Giants - GA4" (govcongiants.com G-STW8XR46GM + Teachable, no data 48h)
- 393613361 "info.govcongiants" (G-Q4J8S61TNP, inactive)
- 319948404 "govcongiants.c" (G-L9YH4YWS34) — confirm not used elsewhere before trashing
- 389669463 "Template Capa…"
- **KEEP** 233233178 "Evankoff - GA4" (evankoff.com) — separate live site

## Codebase note
`govcongiants.org` 308-redirects to `.com`. The GA tag (`NEXT_PUBLIC_GA_ID`) lives in
`src/app/layout.tsx`, gated behind the env var. Updating the Vercel env + redeploy is
all that's needed to swap measurement IDs — no code change.
