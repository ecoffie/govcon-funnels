# Phase 2 — podcast fold-in, vault URLs, article merges

**Status:** ☑ Distribution inventory complete (the blocking check) · ☐ Build started
**Written:** 2026-08-24
**Decisions applied:** merge the 3 overlapping posts · give all 10 vault resources real URLs ·
fold the public podcast site into `.com/podcast`.

---

## 0. THE BLOCKING CHECK — podcast distribution is safe to leave alone

Eric's caution: *do not redirect any RSS feed or audio-file URL until confirming what Libsyn and
the platforms consume.* Checked first. Result:

**Podcast distribution does not touch any domain we are consolidating.**

| Asset | Actual host | Affected by this migration? |
|---|---|---|
| RSS feed | `govcongiants.libsyn.com/rss` (verified: HTTP 200, `application/rss+xml`, 4.3 MB) | **No** |
| Audio enclosures | `traffic.libsyn.com/secure/govcongiants/*.mp3` | **No** |
| Apple Podcasts show | `id1463074357` → consumes the Libsyn feed | **No** |

**The feed references `podcast.govcongiants.org` exactly 0 times.**

Equally important — the "feed" paths on the subdomain are **not real feeds**. `/rss`, `/feed`,
`/rss.xml`, `/feed.xml`, `/podcast.rss` all return `text/html`, because the SPA catch-all rewrite
answers every unmatched path with `index.html`. (Same catch-all that masked the `/funding` bug.)
Only `/sitemap.xml` and `/robots.txt` are genuine.

**Conclusion:** `podcast.govcongiants.org` is a *website*, not distribution infrastructure. It can
become a path-preserving redirect with zero risk to any podcast platform. **Do not touch anything
on `*.libsyn.com`.**

### ⚠️ And the reason the `.org` redirects are permanent, quantified

The live Libsyn feed contains **~1,694 links to `govcongiants.org`** in episode descriptions
(974 `https://` + 720 `http://`), already distributed to every podcast platform and uneditable
retroactively. Plus 272 `.com` links.

**`govcongiants.org` → `.com` redirects are load-bearing forever.** Never remove them.

---

## 1. Merge the 3 overlapping articles

Preserve unique material, then 308 the weaker slug. All three SPA slugs have **0 GSC clicks and
0 impressions**, so nothing is lost; the merge consolidates topical authority.

| From (SPA, 0 traffic) | To (Next) | Target's 90d traffic |
|---|---|---|
| `/blog/start-govcon-no-experience` | `/blog/win-government-contracts-no-experience` | 53 clicks / 9,688 impr |
| `/blog/register-right-first-time` | `/blog/sam-gov-registration-checklist` | 12 clicks / 1,263 impr |
| `/blog/cmmc-real-math` | `/blog/cmmc-2-compliance-guide` | 1 click / 95 impr |

**Method:** read each SPA article body (`articleBodies.ts`), extract anything the Next post does
not already cover, fold it in as a new section, then add the 308. Do not delete the source text
until the merge is reviewed.

**The other 6 SPA articles migrate with their slugs unchanged** — no collision, so same URL, new
template, no redirect (see Phase 1 §A2).

---

## 2. Vault resources → 10 indexable landing pages

Currently modal-only with no URLs. New: `/resources/<slug>` per item, slugs already defined in
`govcon-giants-site/src/data/vault.ts`.

| Slug | Resource |
|---|---|
| `capability-statement-sample` | Capability Statement Sample |
| `capability-statement-checklist` | Capability Statement Checklist |
| `teaming-agreement-sample` | Teaming Agreement Sample |
| `sba-size-standards-2022` | SBA Size Standards (2022) |
| `compliance-matrix-outline` | Compliance Matrix Outline |
| `sources-sought-template` | Sources Sought Response Template |
| `navfac-small-business-specialists` | NAVFAC Small Business Specialists |
| `10-subcontractor-clauses` | 10 Subcontractor Clauses to Watch |
| `cold-email-script-1` | Cold Email Script #1 |
| `renew-sam-registration` | How to Renew Your SAM Registration |

**Page shape:** indexable description of what the resource provides and who it is for; the
download itself stays **behind the lead form**. Content above the gate, file below it.

### ⚠️ Attribution strings are load-bearing — preserve verbatim

`funnel_leads.source` carries `vault:Capability Statement Sample` (exact title, not the slug).
Real signups already exist under these strings. **Changing the format orphans historical
attribution.** The lead form on the new pages must submit the identical `vault:<Title>` string.

Verified live in `funnel_leads`: `vault:Sources Sought Response Template` (4),
`vault:Capability Statement Sample` (4), `vault:Capability Statement Checklist` (3),
`vault:Cold Email Script #1` (3), `vault:Teaming Agreement Sample` (3),
`vault:10 Subcontractor Clauses to Watch` (3), `vault:Compliance Matrix Outline` (3), and others.

---

## 3. Fold the podcast site into `.com/podcast`

| Route | Today | After |
|---|---|---|
| `/podcast` | SPA | Next on `.com` |
| `/podcast/:index` | SPA | Next on `.com` |
| `/podcast/featured/:index` | SPA | Next on `.com` |
| `/about` | SPA | Next on `.com` |
| `podcast.govcongiants.org/:path*` | separate deployment | **308 → `govcongiants.com/:path*`** |

Episode data comes from the Libsyn feed via `rss-to-episodes.py` — that pipeline is unchanged and
keeps pointing at `govcongiants.libsyn.com/rss`.

**CORS note:** `podcast.govcongiants.org` is currently allow-listed in `/api/lead` and
`/api/event` (`src/app/api/lead/route.ts:15`, `api/event/route.ts:17`). Once folded in, same-origin
requests make that entry unnecessary — **but keep it until the subdomain redirect is live and
verified**, or in-flight forms on the old origin break.

---

## 4. Validation required on preview before production

| Area | Check |
|---|---|
| Routes | Every route in Phase 1 §1 returns 200 on the preview |
| Redirects | All 3 article merges 308 correctly; `.org` + `app.` + `podcast.` hosts path-preserving |
| Forms | A real lead submit from a `/resources/<slug>` page lands in `funnel_leads` with the **exact** `vault:<Title>` string |
| Attribution | `gca_attr` cookie survives; a checkout carries attribution through |
| Metadata | Canonicals all `.com`; no `.org` canonical anywhere |
| Structured data | Podcast/episode schema valid; article schema intact on merged posts |
| Sitemap | Contains the 10 new `/resources/<slug>` URLs; no `.org` URLs |
| **Distribution** | `govcongiants.libsyn.com/rss` still 200 + `application/rss+xml`; enclosures still `traffic.libsyn.com`; **no redirect rule matches `*.libsyn.com`** |

---

## 5. Known gaps

- **No GSC access to `sc-domain:govcongiants.org`** (403 — service account lacks permission), so
  the podcast subdomain's own traffic could not be measured. It does not block the plan (the
  subdomain becomes a permanent redirect either way), but grant access if you want a
  before/after comparison.
- **Stripe return URLs** must be checked in the Stripe dashboard, not just in code.
- `~/Projects/govcon-giants-podcast` is the separate repo behind the subdomain; folding it in
  means moving *content*, not the Vite project (a TS app subdir at repo root once broke deploys
  for ~18h — see CLAUDE.md).
