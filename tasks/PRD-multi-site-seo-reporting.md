# PRD — Multi-Site SEO Reporting (encoregov.com + getmindy.ai)

**Author:** Eric (via Claude)
**Date:** 2026-07-03
**Status:** ☐ PRD only — do NOT execute yet · ☑ Approved to build (2026-07-03)
**Feeds:** `/from-prd multi-site-seo-reporting` (scaffolds implementation once approved)

---

## 1. Problem statement

**Who has it:** Eric. The `/seo-report` pipeline (GSC + GA overlay, `scripts/seo-report.ts`,
weekly Slack cron) only reports on **govcongiants.com**. The two sites where a report is
actually *owed to someone else* — **encoregov.com** (Encore is a paying client; Eric hand-
writes their monthly SEO report) and **getmindy.ai** (the SEO growth engine, 64 listicles +
317K contractor pages) — have **no automated report at all**.

**The pain / how it's solved today:** For Encore, Eric re-pulls Search Console by hand each
month and re-writes the same client narrative (BLUF, jargon defined, declines softened). For
getmindy.ai, there's a *separate* GSC Slack cron living in the market-assassin repo — a second
codebase, second pipeline, no client-narrative layer. Same work, done twice, in two repos,
one of them manual.

**Evidence it's real:**
- The `/seo-report` command was built *specifically* because Eric re-explains the Encore
  narrative every month — but it can only point at govcongiants.com (the command file itself
  says: *"buildReport is currently hardcoded to govcongiants.com — say so and flag that it
  needs a site param first"*).
- getmindy.ai SEO is tracked weekly (memory: *"Mindy SEO rolling status — GSC 24h impressions
  1,920, 4× prior 28d"*) but from an entirely separate cron in a different repo.
- **Measured, not assumed:** the shared service account **already has read access** to all
  three GSC properties (see §3), so the only thing standing between us and a tri-site report
  is a `site` parameter — the data is one auth call away.

---

## 2. Solution

**One sentence:** Thread a `site` parameter through the existing GSC + GA report builders and
add a site→property config map, so `/seo-report [site]` produces the same client-grade report
for encoregov.com and getmindy.ai that it already produces for govcongiants.com — from one
pipeline, in this repo.

**Where it lives:** `~/govcon-funnels` — the existing `src/lib/gsc/*` + `src/lib/ga/*` +
`scripts/seo-report.ts` + `src/app/api/cron/seo-report/route.ts`. No new repo, no new pipeline.

**User flow:**
1. `/seo-report encoregov.com` → pulls encoregov's live GSC (+GA if configured) → prints the
   report + `pbcopy`s the email-ready client summary.
2. Weekly cron fires the same builder **per site**, posting one Slack block per site (or one
   combined post), titled with the correct domain (fixes the hardcoded
   `report.ts:146` title).

**Output:** identical to today's report (totals, top pages/queries, CTR opportunities,
striking-distance, gainers/decliners, GA traffic overlay) — just parameterized by site, with
the domain name correct in every header.

---

## 3. What ALREADY exists (don't rebuild) — reuse audit

The pipeline is **95% reusable**. The single-site assumption is concentrated in ~4 spots:

| File / symbol | Today | What it needs |
|---|---|---|
| `src/lib/gsc/client.ts:20` `GSC_SITE_URL` | module constant `'sc-domain:govcongiants.com'` | become a per-call arg; `gscQuery(body, siteUrl)` |
| `src/lib/gsc/client.ts:71` `gscQuery()` | reads the module constant | accept `siteUrl` param, default to govcongiants for back-compat |
| `src/lib/gsc/query.ts` (all query fns → `runQuery`) | never pass a site | thread `siteUrl` down from `buildReport` |
| `src/lib/gsc/report.ts:146` Slack title | hardcoded `"— govcongiants.com"` | interpolate the site |
| `src/lib/ga/client.ts:20` `getPropertyId()` | reads single `GA4_PROPERTY_ID` env | look up per-site GA4 property id from the site map |
| `src/lib/ga/query.ts` `buildGaReport(ref)` | no site arg | `buildGaReport(ref, site)` |
| `scripts/seo-report.ts` | hardcoded title + single `buildReport()` | take a `[site]` CLI arg |
| `src/app/api/cron/seo-report/route.ts` | one site | loop the site list |

**The auth is already solved — this is the key measured finding.** The shared service account
`mindy-bq-reader@market-assasin.iam.gserviceaccount.com` **already has GSC read access to all
three properties** (probed live 2026-07-03):

```
https://encoregov.com/        [siteRestrictedUser]   ← URL-prefix property, NOT sc-domain
sc-domain:getmindy.ai         [siteFullUser]
sc-domain:govcongiants.com    [siteFullUser]          ← current
```

→ **GSC needs ZERO new access grants.** The refactor is pure code. (Note the encoregov
property is a **URL-prefix** property `https://encoregov.com/`, not a `sc-domain:` domain
property — the site map must store the exact site-URL string per site, not derive it.)

Reusable narrative layer: the `/seo-report` command already encodes the *client-report style*
(BLUF, define acronyms, soften declines, email-ready summary). That's site-agnostic — it works
the moment the data is parameterized.

---

## 4. What's net-new

**Config (net-new, small):**
- `src/lib/seo-sites.ts` — a `SEO_SITES` map: `{ key, label, gscSiteUrl, ga4PropertyIdEnv }[]`
  for the three sites. Single source of truth for "what sites do we report on."
  ```
  govcongiants.com → gscSiteUrl 'sc-domain:govcongiants.com', ga4 env GA4_PROPERTY_ID
  getmindy.ai      → gscSiteUrl 'sc-domain:getmindy.ai',      ga4 env GA4_PROPERTY_ID_MINDY
  encoregov.com    → gscSiteUrl 'https://encoregov.com/',     ga4 env GA4_PROPERTY_ID_ENCORE
  ```

**Backend (net-new = param threading, no new logic):**
- `gscQuery(body, siteUrl?)` — add optional `siteUrl`, default govcongiants (back-compat).
- Thread `siteUrl` through `query.ts` → `report.ts` `buildReport(ref, site)`.
- `buildGaReport(ref, site)` + `getPropertyId(site)` reading the per-site env.
- Slack title uses `site.label`.

**Integration (net-new):**
- `scripts/seo-report.ts` accepts `[site]` (default govcongiants.com); loops all sites if
  passed `all`.
- Cron `route.ts` iterates `SEO_SITES`, posts one Slack section per site.

**Env (net-new, GA only):**
- `GA4_PROPERTY_ID_MINDY`, `GA4_PROPERTY_ID_ENCORE` (numeric GA4 property ids) — **only if we
  want the GA traffic overlay** for those sites. GSC works without them; GA degrades to
  "(unavailable)" honestly (already built that way in `buildGaReport`).

**No DB. No migration. No UI.** (This is a reporting/script/cron feature.)

---

## 5. Scope

**In scope (MVP):**
- [ ] `SEO_SITES` config map (3 sites, exact GSC site-URL strings incl. encore URL-prefix).
- [ ] `site` param threaded through GSC builder (`gscQuery` → `buildReport`).
- [ ] `site` param threaded through GA builder (`buildGaReport`, per-site property env).
- [ ] Correct domain in every report/Slack title.
- [ ] `scripts/seo-report.ts [site|all]`.
- [ ] Cron loops all sites; one Slack post per site.
- [ ] Back-compat: no-arg = govcongiants.com, unchanged output.

**Out of scope (defer):**
- Retiring the *separate* getmindy.ai GSC cron in the market-assassin repo (do that only after
  this proves out, to avoid a reporting gap — flag but don't cut yet).
- Per-site custom thresholds / different report shapes.
- A web dashboard / historical trend storage (report is point-in-time; GSC holds 16mo history).
- encoregov.com / getmindy.ai **on-page** SEO changes (this PRD is *reporting* only).

**Dependencies:**
- GSC read access — ✅ **already granted** for all three (no action).
- GA4 overlay for Mindy/Encore — needs the numeric property ids + SA added as **Viewer** on
  each GA4 property (Admin → Property Access Management). GSC-only report ships without this.
- `GCP_SA_JSON` in env (already present for govcongiants).

**Scale note:** 3 sites × a handful of GSC calls each, weekly. No quota concern (GSC quota is
generous; we're nowhere near it). No 50K-user question — this is internal reporting.

---

## 6. Acceptance criteria (QA gate)

- [ ] `npx tsx scripts/seo-report.ts encoregov.com` prints a report with **real** encoregov
      numbers and "encoregov.com" in the header (not govcongiants).
- [ ] `npx tsx scripts/seo-report.ts getmindy.ai` prints real getmindy numbers.
- [ ] `npx tsx scripts/seo-report.ts` (no arg) prints the **identical** govcongiants report as
      today — zero regression.
- [ ] `npm run build` exits 0 (no type errors from the new `site` params).
- [ ] GA section shows real traffic **if** the GA env is set, else prints "(unavailable)
      <reason>" — never a fabricated number.
- [ ] Cron dry-run posts one correctly-titled Slack section per site.
- [ ] encoregov URL-prefix property returns rows (proves the non-`sc-domain:` site-URL string
      is handled).

---

## 7. Estimated effort

Because auth is already solved, this is **~half a day**, mostly mechanical:

- **Phase 1 — config + GSC threading** (~2h): `SEO_SITES` map; `gscQuery`/`query.ts`/
  `report.ts` `site` param; script `[site]` arg. Ship govcongiants + getmindy + encoregov as
  **GSC-only** reports. This is the whole client-value win.
- **Phase 2 — GA overlay per site** (~1h + Eric's grants): `buildGaReport(ref, site)`,
  per-site env, add SA as Viewer on the two GA4 properties. Optional; report works without it.
- **Phase 3 — cron fan-out** (~1h): loop sites in the weekly cron, one Slack post each; then
  (later) retire the duplicate Mindy cron in market-assassin.

---

## 8. Risks + open questions

- **encoregov is a URL-prefix property, not a domain property.** Handled by storing the exact
  site-URL per site in the map — but it means encore's numbers cover only `https://encoregov.com/`
  (not http / other subdomains). *Confirm that's the property Encore cares about* (it's their
  main site, so almost certainly yes). — **Eric decision.**
- **encore SA is `siteRestrictedUser`** (read-restricted). Fine for reporting (read-only). If a
  future feature needs to *write* (e.g. submit sitemaps), that grant won't cover it. Not an MVP
  concern.
- **GA4 property fragmentation** (known: memory *"5+ fragmented GA4 properties, live tag
  G-QNM9S4ZSNB is orphaned"*). Picking the *right* GA4 property id for Mindy/Encore is the one
  fiddly step. Mitigated: GSC-only ships first, GA is additive.
- **Duplicate Mindy cron** in market-assassin will double-post to Slack until retired. Sequence
  Phase 3 to add-here-then-remove-there so there's never a gap. — **don't cut the old one until
  the new one is verified.**
- **Client-summary voice per site.** Encore report = external client tone; Mindy/govcongiants =
  internal. The `/seo-report` command already handles tone; just confirm we don't email the
  Mindy report to a client by habit.

---

## 9. Decision log

- **2026-07-03** — Chose to extend the govcon-funnels pipeline rather than build reporting in
  market-assassin, because the client-narrative layer (`/seo-report` style) already lives here
  and Encore is the highest-value consumer. One pipeline, one repo.
- **2026-07-03** — Probed live: shared SA already reads all 3 GSC properties → **no GSC access
  work needed**; scope is code-only. This is what makes it a half-day, not a multi-day, feature.
- **2026-07-03** — encoregov confirmed a **URL-prefix** property (`https://encoregov.com/`), so
  the site map stores exact site-URL strings; never derive `sc-domain:` from the domain.
- **2026-07-03** — GA overlay split into its own phase (needs per-property Viewer grants Eric
  must do in the GA UI); GSC-only report ships first so client value isn't gated on GA setup.
- **2026-07-03** — **Phase 1 BUILT + verified** (`/from-prd`). Live pull returned real distinct
  data for all 3 sites: govcongiants 640 clk (unchanged = no regression), getmindy 198 clk,
  encoregov 23 clk / 6,499 impr (URL-prefix property confirmed working). `npm run build` exit 0.
  GA degrades to "(unavailable)" per-site with the correct env-var name. Files:
  `src/lib/seo-sites.ts` (new), `gsc/client.ts`, `gsc/query.ts`, `gsc/report.ts`, `ga/client.ts`,
  `ga/query.ts`, `scripts/seo-report.ts`, `cron/seo-report/route.ts`. Phase 2 (GA per-site) +
  Phase 3 (retire duplicate Mindy cron) remain.

---

**Status:** ☐ PRD only · ☑ **Approved to build** (2026-07-03) — Phase 1 (GSC-only, all 3 sites)

_Building via `/from-prd multi-site-seo-reporting`._
