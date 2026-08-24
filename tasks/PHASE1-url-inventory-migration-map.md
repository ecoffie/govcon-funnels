# Phase 1 — URL / content inventory + migration map

**Status:** ☑ Inventory complete · ☐ Approved to execute
**Written:** 2026-08-24
**Decisions applied:** Next app wins `/blog` and `/resources`. Keep all valuable content and
earned URLs. No deletions, no bulk redirects in this phase.

**GSC window:** 2026-05-23 → 2026-08-21 (90 days), `sc-domain:govcongiants.com`, 406 pages returned.

---

## Headline finding — the conflict is far smaller than it looked

**Not one SPA URL has earned anything.**

- **0 of 9** SPA blog article slugs appear anywhere in 90 days of GSC data.
- **0** SPA resource URLs appear. The only `/resources` sub-URL with data is
  `/resources/handouts`, which is a **Next app** route.
- Every blog URL earning clicks is already a Next app post.

So `/blog` and `/resources` are a **content-preservation** problem, not an SEO-risk problem.
There are no earned SPA URLs to protect. The 301 map is correspondingly small.

**A second structural finding:** the 10 SPA "vault" resources **have no individual URLs at all.**
They open in a modal (`GuideSignupModal`), and the SPA router has no `/resources/:slug` route —
verified live: `/resources/capability-statement-sample` renders the *homepage*, and a nonsense
slug returns 200 the same way (the catch-all rewrite makes every path 200, which is exactly what
masked the `/funding` bug). **Nothing to redirect. They are lead magnets, and the thing that must
survive is the lead-capture flow, not a URL.**

---

## A. `/blog` — Next app is canonical

### A1. Next app posts (20) — ACTION: `keep`, no change

Ranked by 90-day clicks. All already live on `.com` and already canonical.

| URL | Clicks | Impressions | Action |
|---|---|---|---|
| `/blog/contracts-administrator-career` | 83 | 13,187 | keep |
| `/blog/win-government-contracts-no-experience` | 53 | 9,688 | keep |
| `/blog/proposal-manager-career-path` | 51 | 6,706 | keep |
| `/blog/govcon-bd-jobs-no-experience` | 45 | 6,022 | keep |
| `/blog/capture-manager-salary-guide` | 37 | 7,034 | keep |
| `/blog/pricing-analyst-govcon-guide` | 26 | 1,666 | keep |
| `/blog/sam-gov-search-tricks` | 22 | 4,001 | keep |
| `/blog/federal-contract-vehicles-guide` | 20 | 5,064 | keep |
| `/blog/8a-vs-hubzone-vs-sdvosb` | 13 | 5,760 | keep |
| `/blog/communicate-with-contracting-officers` | 12 | 905 | keep |
| `/blog/sam-gov-registration-checklist` | 12 | 1,263 | keep |
| `/blog/oasis-plus-guide` | 10 | 969 | keep |
| `/blog/vendor-mistakes-contracting-officers` | 8 | 2,420 | keep |
| `/blog/9-govcon-bd-jobs-150k` | 5 | 280 | keep |
| `/blog/10-things-wish-i-knew` | 2 | 67 | keep |
| `/blog/cmmc-2-compliance-guide` | 1 | 95 | keep |
| `/blog/fy2026-contracting-trends` | 0 | 192 | keep |
| `/blog` (hub) | 0 | 105 | keep |
| `/blog/cage-code-lookup-guide` | — | — | keep |
| `/blog/which-sba-certification` | — | — | keep |

### A2. SPA articles (9) — ACTION: `migrate`, slug preserved

**No slug collides with any Next post**, so every SPA slug can be carried over unchanged. The
URL stays identical; only the rendering template changes. **No 301 needed for any of these.**

| Current URL (SPA) | Title | GSC | Destination | Action |
|---|---|---|---|---|
| `/blog/sam-gov-is-not-a-strategy` | SAM.gov Is Not a Strategy | 0/0 | same URL, Next | migrate |
| `/blog/8a-program-explained` | The 8(a) Program, Explained | 0/0 | same URL, Next | migrate |
| `/blog/cmmc-real-math` | CMMC — the real math | 0/0 | same URL, Next | migrate |
| `/blog/first-proposal-checklist` | Your First Federal Proposal: 12-Point Checklist | 0/0 | same URL, Next | migrate |
| `/blog/subcontracting-side-door` | The Side Door: Subcontracts With Defense Primes | 0/0 | same URL, Next | migrate |
| `/blog/teaming-agreements-101` | Teaming Agreements 101 | 0/0 | same URL, Next | migrate |
| `/blog/register-right-first-time` | SAM.gov Registration, Right the First Time | 0/0 | same URL, Next | migrate |
| `/blog/progress-payments-guide` | Progress Payments: How Contractors Get Paid | 0/0 | same URL, Next | migrate |
| `/blog/start-govcon-no-experience` | Starting in GovCon With Zero Experience | 0/0 | same URL, Next | migrate |

⚠️ **Topical overlap to review before publishing — merge candidates, not blockers.** Content is
similar but slugs differ, so both can coexist; Eric should decide whether to merge or keep both:
- `start-govcon-no-experience` ↔ `win-government-contracts-no-experience` (53 clicks) + `govcon-bd-jobs-no-experience` (45)
- `register-right-first-time` ↔ `sam-gov-registration-checklist` (12)
- `cmmc-real-math` ↔ `cmmc-2-compliance-guide` (1)
- **If merged:** 301 the SPA slug → the established post. Since the SPA slugs have 0 traffic,
  merging loses nothing and consolidates topical authority.

**Source of content:** `govcon-giants-site/src/data/articles.ts` + `articleBodies.ts`.

---

## B. `/resources` — Next app is canonical

### B1. Next app — ACTION: `keep`

| URL | Clicks | Impressions | Action |
|---|---|---|---|
| `/resources` | 21 | 1,471 | keep — becomes the single library |
| `/resources/handouts` | 0 | 5 | keep |

### B2. SPA vault items (10) — ACTION: `migrate` (no URL to preserve)

These have **no public URLs** (modal-only, no router entry). Nothing to 301. What must survive
is the **lead-capture flow** — `funnel_leads` shows real signups tagged `vault:<Title>`, so these
are working lead magnets.

| Item | Current access | Destination | Action |
|---|---|---|---|
| Capability Statement Sample | modal | Next resource library | migrate |
| Capability Statement Checklist | modal | Next resource library | migrate |
| Teaming Agreement Sample | modal | Next resource library | migrate |
| SBA Size Standards (2022) | modal | Next resource library | migrate |
| Compliance Matrix Outline | modal | Next resource library | migrate |
| Sources Sought Response Template | modal | Next resource library | migrate |
| NAVFAC Small Business Specialists | modal | Next resource library | migrate |
| 10 Subcontractor Clauses to Watch | modal | Next resource library | migrate |
| Cold Email Script #1 | modal | Next resource library | migrate |
| How to Renew Your SAM Registration | modal | Next resource library | migrate |

⚠️ **Preserve the `source` tag format exactly** (`vault:Capability Statement Sample`). Lead
attribution in `funnel_leads` depends on it; changing the string orphans historical reporting.

**Opportunity, not required:** giving each a real indexable URL (`/resources/<slug>`) would make
10 lead magnets discoverable that currently earn nothing. Slugs already exist in `vault.ts`.

---

## C. Routes with no conflict

| Route | Owner | Action |
|---|---|---|
| `/about` | SPA only (Next 404s) | migrate to Next, preserve URL. 2 clicks / 251 impr |
| `/podcast`, `/podcast/:index`, `/podcast/featured/:index` | SPA only | migrate to Next, preserve URLs. `/podcast/` 2 clicks; individual episodes ~0–6 impr each |
| All 38 Next top-level routes | Next only | keep |

**Note:** `podcast.govcongiants.org` is a *separate* deployment (`~/Projects/govcon-giants-podcast`)
and is in the CORS allowlist of `/api/lead` + `/api/event`. Decide separately whether it folds in
or stays a legitimate subdomain — it is out of scope for this map.

---

## D. Redirect map (this is the whole list)

Because no SPA URL has earned traffic and no slug collides, the per-URL 301 map is nearly empty.

| From | To | Type | Reason |
|---|---|---|---|
| *(none required for blog)* | — | — | all 9 slugs carry over unchanged |
| *(none required for resources)* | — | — | vault items have no URLs |
| `govcongiants.org/:path*` | `govcongiants.com/:path*` | **308 permanent** | legacy entrance — keep forever |
| `app.govcongiants.org/:path*` | `govcongiants.com/:path*` | **308 permanent** | legacy entrance — keep forever |

**Conditional additions** — only if Eric chooses to merge the 3 topical overlaps in §A2:
`/blog/start-govcon-no-experience` → `/blog/win-government-contracts-no-experience`;
`/blog/register-right-first-time` → `/blog/sam-gov-registration-checklist`;
`/blog/cmmc-real-math` → `/blog/cmmc-2-compliance-guide`.

**Why the `.org` redirects are permanent:** podcast episode descriptions published in the Libsyn
RSS feed link `govcongiants.org/funding`. That text is already distributed across every podcast
platform and cannot be retroactively edited. These redirects are load-bearing forever.

---

## E. Validation status

| Check | Method | Result |
|---|---|---|
| SPA route list | `App.tsx` router | ✅ 8 routes + catch-all |
| Next route list | `src/app` | ✅ 38 top-level |
| Path conflicts | diff of both | ✅ exactly 2: `/blog`, `/resources` |
| SPA blog URLs real? | headless browser | ✅ real — fake slug shows "Article not found" |
| SPA resource URLs real? | headless browser | ✅ **no** — renders homepage; no router entry |
| SPA traffic | GSC 90d | ✅ **0 of 9** article slugs present; 0 resource URLs |
| Slug collisions | set diff | ✅ **none** |
| Canonicals | `layout.tsx` | ✅ `metadataBase` already `www.govcongiants.com` |
| Lead-magnet impact | `funnel_leads.source` | ⚠️ `vault:<Title>` tags must be preserved verbatim |

---

## F. Open decisions before Phase 2

1. **Merge or keep the 3 topical overlaps** in §A2. Recommendation: merge — the SPA versions have
   0 traffic, and merging consolidates authority into posts already ranking.
2. **Give vault items real URLs?** Not required for consolidation; a clear upside if wanted.
3. **`podcast.govcongiants.org`** — fold into `.com` or keep as a subdomain?

**Not started:** no content moved, no redirects shipped, nothing deleted.
