# Asset manifest — public/downloads/vault (one-site consolidation)

**Written:** 2026-08-24 · Reconciles the 59-vs-69 discrepancy and records what moved.

## The 59 vs 69 reconciliation

| | Count |
|---|---|
| Documents (top level) | **59** |
| Cover thumbnails (`covers/`) | **10** |
| **Total files copied** | **69** |

The two numbers were the same directory counted two ways — `ls` excluding the `covers/`
subdirectory (59) vs a recursive `find` (69). **No unrelated assets were pulled in.** The 10
covers are the branded thumbnails referenced by `cover:` in the SPA's `vault.ts`.

## Integrity

**All 69 files verified identical to the SPA originals by SHA-256** (`diff` of sorted
checksum lists — zero differences). This is a copy, not a re-encode.

## Usage summary

| | Files | Size |
|---|---|---|
| Referenced by the 10 vault landing pages | **20** (10 docs + 10 covers) | **7.3 MB** |
| Unreferenced but **live on .com today** | **49** | **39.8 MB** |
| **Total** | **69** | **47.2 MB** |

### Decision on the 49 unreferenced files: KEEP

They are not dead weight, and they are not orphans of this migration:
- `vault.ts` documents them: *"The other ~49 mirrored vault files stay on disk but are
  intentionally unlisted."*
- **They are live right now.** Spot-checked 4 on production — `dibbs-solicitations.pptx`,
  `sample-loi.pdf`, `fpds-ng-handout.pdf`, `bid-no-bid-framework.png` — all return HTTP 200.
- Zero references in either codebase, so the URLs are shared directly (emails, DMs, decks).
  Dropping them would silently 404 links we cannot see.
- They do **not** appear in the Libsyn feed, so no podcast platform depends on them.

**Not deleting them is the conservative, correct call for Phase 2.** Pruning is a separate,
evidence-led decision — it needs server logs or GSC data on `/downloads/vault/*`, not a guess.

## Deployment / repository impact: not a concern

| Check | Finding |
|---|---|
| Repo `.git` today | 212 MB |
| `public/` today | **85 MB** — `public/downloads` is already **54 MB** |
| This addition | 47 MB |
| Vercel limits | Well within them; these are static files on the CDN, not function bundles |
| Precedent | Committing site assets here is the **existing pattern**, not a new one |

The one real cost is repo growth: binaries in git are permanent history. If `public/` keeps
growing, the future move is blob/object storage with redirects — but that is a repo-wide
decision, not something to solve inside this migration.

## Full manifest

`R` = referenced by a vault landing page. Public URL = `https://govcongiants.com/downloads/vault/<file>`.

| File | Size | Type | R | Used by |
|---|---:|---|:-:|---|
| `dibbs-solicitations.pptx` | 6,511 KB | document | — | — |
| `dibbs-quoting.pptx` | 6,105 KB | document | — | — |
| `midlant-sb-brochure.pdf` | 3,391 KB | document | — | — |
| `nsin-overview-deck.pdf` | 3,172 KB | document | — | — |
| `mastering-small-business-webinar.pdf` | 3,003 KB | document | — | — |
| `bid-no-bid-framework.png` | 2,821 KB | document | — | — |
| `sample-loi.pdf` | 2,500 KB | document | — | — |
| `navfac-small-business-specialists.pdf` | 2,063 KB | document | ✅ | `/resources/navfac-small-business-specialists` |
| `fpds-ng-handout.pdf` | 1,863 KB | document | — | — |
| `renew-sam-registration.pdf` | 1,767 KB | document | ✅ | `/resources/renew-sam-registration` |
| `safety-plan-generic.docx` | 1,322 KB | document | — | — |
| `how-i-found-an-8a-company.pdf` | 1,255 KB | document | — | — |
| `sba-size-standards-2022.pdf` | 1,194 KB | document | ✅ | `/resources/sba-size-standards-2022` |
| `proposal-kickoff-template.pptx` | 864 KB | document | — | — |
| `jv-sop.pdf` | 718 KB | document | — | — |
| `hampton-roads-sb-professionals.pdf` | 716 KB | document | — | — |
| `quality-plan-sample.pdf` | 705 KB | document | — | — |
| `sanitized-technical-proposal.pdf` | 686 KB | document | — | — |
| `navfac-osbp-trifold.pdf` | 563 KB | document | — | — |
| `safety-plan-sample.docx` | 399 KB | document | — | — |
| `sf30-solicitation-sample.pdf` | 392 KB | document | — | — |
| `sf18-doi.pdf` | 379 KB | document | — | — |
| `reading-sam-gov.pdf` | 337 KB | document | — | — |
| `health-safety-plan-sample.docx` | 314 KB | document | — | — |
| `sources-sought-template.pdf` | 297 KB | document | ✅ | `/resources/sources-sought-template` |
| `compliance-matrix-outline.xlsx` | 264 KB | document | ✅ | `/resources/compliance-matrix-outline` |
| `client-questionnaire.docx` | 218 KB | document | — | — |
| `15-questions-apex-counselor.pdf` | 217 KB | document | — | — |
| `capture-management-osdbu-activities.docx` | 216 KB | document | — | — |
| `capability-statement-sample.pdf` | 207 KB | document | ✅ | `/resources/capability-statement-sample` |
| `teaming-agreement-sample.pdf` | 204 KB | document | ✅ | `/resources/teaming-agreement-sample` |
| `sf18-dla.pdf` | 197 KB | document | — | — |
| `nda-confidentiality-template.docx` | 183 KB | document | — | — |
| `find-your-buyer-fpds-guide.docx` | 180 KB | document | — | — |
| `10-subcontractor-clauses.pdf` | 166 KB | document | ✅ | `/resources/10-subcontractor-clauses` |
| `sam-gov-navigation.pdf` | 157 KB | document | — | — |
| `consultant-agreement.docx` | 151 KB | document | — | — |
| `covers/renew-sam-registration.png` | 126 KB | cover | ✅ | cover image |
| `covers/10-subcontractor-clauses.png` | 126 KB | cover | ✅ | cover image |
| `covers/sources-sought-template.png` | 123 KB | cover | ✅ | cover image |
| `va-entrepreneurship-training.pdf` | 123 KB | document | — | — |
| `covers/navfac-small-business-specialists.png` | 123 KB | cover | ✅ | cover image |
| `covers/capability-statement-checklist.png` | 118 KB | cover | ✅ | cover image |
| `covers/compliance-matrix-outline.png` | 118 KB | cover | ✅ | cover image |
| `covers/sba-size-standards-2022.png` | 117 KB | cover | ✅ | cover image |
| `proposal-development-schedule.xls` | 115 KB | document | — | — |
| `covers/teaming-agreement-sample.png` | 115 KB | cover | ✅ | cover image |
| `covers/capability-statement-sample.png` | 114 KB | cover | ✅ | cover image |
| `covers/cold-email-script-1.png` | 111 KB | cover | ✅ | cover image |
| `prime-contractor-checklist.docx` | 94 KB | document | — | — |
| `sba-profile-checklist.docx` | 94 KB | document | — | — |
| `capability-statement-checklist.dotx` | 92 KB | document | ✅ | `/resources/capability-statement-checklist` |
| `environmental-management-plan.doc` | 90 KB | document | — | — |
| `hazardous-waste-management-plan.docx` | 87 KB | document | — | — |
| `capabilities-briefing-checklist-osdbu.pdf` | 85 KB | document | — | — |
| `sf30-amendment-sample.pdf` | 85 KB | document | — | — |
| `construction-qc-plan-sample.docx` | 84 KB | document | — | — |
| `milcon-award-forecast.pdf` | 79 KB | document | — | — |
| `cold-email-script-2.pdf` | 53 KB | document | — | — |
| `covid-control-plan-sample.docx` | 48 KB | document | — | — |
| `cold-email-script-1.pdf` | 47 KB | document | ✅ | `/resources/cold-email-script-1` |
| `sample-bid-pricing.xlsx` | 45 KB | document | — | — |
| `comfort-challenge-script.pdf` | 40 KB | document | — | — |
| `jv-agreement-sample.docx` | 34 KB | document | — | — |
| `technical-approach-sample.docx` | 30 KB | document | — | — |
| `jv-checklist.docx` | 28 KB | document | — | — |
| `shoring-plan-sample.docx` | 27 KB | document | — | — |
| `8a-phone-script.docx` | 13 KB | document | — | — |
| `bd-progress-task-list.xlsx` | 11 KB | document | — | — |

## The 10 vault resources → their files

| Landing page | Document | Cover |
|---|---|---|
| `/resources/capability-statement-sample` | `capability-statement-sample.pdf` | `capability-statement-sample.png` |
| `/resources/capability-statement-checklist` | `capability-statement-checklist.dotx` | `capability-statement-checklist.png` |
| `/resources/teaming-agreement-sample` | `teaming-agreement-sample.pdf` | `teaming-agreement-sample.png` |
| `/resources/sba-size-standards-2022` | `sba-size-standards-2022.pdf` | `sba-size-standards-2022.png` |
| `/resources/compliance-matrix-outline` | `compliance-matrix-outline.xlsx` | `compliance-matrix-outline.png` |
| `/resources/sources-sought-template` | `sources-sought-template.pdf` | `sources-sought-template.png` |
| `/resources/navfac-small-business-specialists` | `navfac-small-business-specialists.pdf` | `navfac-small-business-specialists.png` |
| `/resources/10-subcontractor-clauses` | `10-subcontractor-clauses.pdf` | `10-subcontractor-clauses.png` |
| `/resources/cold-email-script-1` | `cold-email-script-1.pdf` | `cold-email-script-1.png` |
| `/resources/renew-sam-registration` | `renew-sam-registration.pdf` | `renew-sam-registration.png` |
