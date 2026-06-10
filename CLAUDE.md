# GovCon Funnels - Claude Project Context

## Quick Identifier
**This is the "$82 BILLION UNSPENT" homepage project.**

When user says: "the $82B page", "govcon funnels", "main marketing site", "the hero with unspent money"
→ This is the project they mean.

---

## Project Overview

| | |
|---|---|
| **Name** | GovCon Funnels (Marketing Landing Pages) |
| **Live URL** | [govcongiants.org](https://govcongiants.org) |
| **Framework** | Next.js 16, React 19, TypeScript, Tailwind CSS |
| **Location** | `/Users/ericcoffie/govcon-funnels` |

---

## Key Routes

### Content Pages
| Route | Purpose |
|-------|---------|
| `/guides/[slug]` | 141 educational guides (SEO optimized) |
| `/videos/[slug]` | 8 video landing pages |
| `/jobs` | Job board - dual source (JSearch + USAJobs) |
| `/glossary` | 45+ GovCon terms |
| `/data/agencies` | 35+ agency profiles with spending data |
| `/data/contractors` | 500K+ contractor profiles (SAM.gov) |
| `/data/forecasts` | 7,700+ forecast opportunities (gated) |
| `/compare/deltek` | GovWin comparison page |
| `/compare/govtribe` | GovTribe comparison page |

### Free Tools
| Route | Purpose |
|-------|---------|
| `/tools/cage-code-lookup` | CAGE code search (9,900/mo keyword) |
| `/tools/expiring-contracts` | Expiring contracts finder (lead magnet) |

### Funnels
| Route | Purpose |
|-------|---------|
| `/bootcamp` | Live bootcamp registration |
| `/free-course` | Free course lead magnet |
| `/opp` | Redirects to tools.govcongiants.org/opportunity-hunter (ungated) |
| `/proposal-bootcamp/` | Static HTML funnel (public/) |

---

## Key Files

### Core
| File | Purpose |
|------|---------|
| `/src/app/page.tsx` | Main homepage |
| `/src/app/layout.tsx` | Root layout |
| `/src/app/globals.css` | Global styles |
| `/src/lib/crm.ts` | GHL + Slack integrations |
| `/src/lib/seo.ts` | SEO utilities, JSON-LD |

### SAM.gov API Library
| File | Purpose |
|------|---------|
| `/src/lib/sam/index.ts` | Unified exports |
| `/src/lib/sam/utils.ts` | Caching, rate limiting, retry logic |
| `/src/lib/sam/entity-api.ts` | CAGE/UEI/company lookup |
| `/src/lib/sam/contract-awards.ts` | Contract awards & expiring contracts |

### Job Board APIs
| File | Purpose |
|------|---------|
| `/src/lib/jsearch.ts` | JSearch API (private sector BD jobs via RapidAPI) |
| `/src/lib/usajobs.ts` | USAJobs API (federal government positions) |

### API Routes
| Route | Purpose |
|-------|---------|
| `/api/lead` | Lead submission (GHL + Slack) |
| `/api/cage-lookup` | CAGE code search |
| `/api/expiring-contracts` | Expiring contracts search |
| `/api/jobs` | Job search (JSearch for private, USAJobs for federal) |
| `/api/indexnow` | Search engine notification |

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GHL_API_KEY` | GoHighLevel PIT key |
| `GHL_LOCATION_ID` | GHL sub-account ID |
| `SLACK_LEAD_WEBHOOK_URL` | Slack webhook |
| `STRIPE_SECRET_KEY` | Stripe payments |
| `SAM_API_KEY` | SAM.gov Entity API (primary) |
| `SAM_API_KEY_BACKUP` | SAM.gov backup key (auto-failover on rate limit) |
| `SAM_CONTRACT_AWARDS_API_KEY` | SAM.gov Awards API |
| `USAJOBS_API_KEY` | USAJobs API (federal jobs) |
| `USAJOBS_EMAIL` | USAJobs API user agent |
| `JSEARCH_API_KEY` | JSearch/RapidAPI (private sector jobs) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service key |

---

## Development

```bash
npm run dev              # Dev server
npm run build            # Production build
npm run test:unit        # Unit tests (31 tests)
npm run test:integration # Integration tests (real API)
npm run test:sam         # All SAM library tests
```

---

## Integrations

### Lead Flow
```
Form submit → /api/lead
    ↓ (parallel)
├── GHL v2 API → Contact with tags
├── Slack → Notification
└── Webhook → Zapier/Make (optional)
```

### SAM.gov API
- **Entity API:** CAGE/UEI lookup, company search
- **Awards API:** Contract history, expiring contracts
- **Caching:** Supabase (24hr TTL)
- **Rate limit:** 1000 requests/day per API

### Job Board APIs
- **JSearch (RapidAPI):** Private sector BD jobs from LinkedIn, Indeed, Glassdoor, ZipRecruiter
  - Shows Capture Manager, Proposal Manager roles at Booz Allen, Leidos, Peraton, etc.
  - Free tier: 200 requests/month
- **USAJobs:** Federal government positions (GS roles)
  - Contract Specialist, Program Analyst, Acquisition roles
  - Free, unlimited requests

---

## Related Projects

| Project | URL | Purpose |
|---------|-----|---------|
| Market Assassin | tools.govcongiants.org | Pro tools |
| GovCon Shop | shop.govcongiants.org | Digital products |

---

## Critical Notes

### Static Funnel URLs
Static HTML in `public/` MUST use absolute paths:
- ✅ `/proposal-bootcamp/2-upsell.html`
- ❌ `2-upsell.html` (breaks without trailing slash)

### Routing Priority
1. `vercel.json` redirects (first)
2. `next.config.ts` redirects/rewrites
3. Next.js app routes
4. Static files in `public/`

---

## SAM.gov API Quirks

**Critical parameters for Entity API v3:**
1. `samRegistered=Yes` - REQUIRED or API returns empty `entityData`
2. `page=0` - API uses 0-indexed pagination (not 1-indexed!)

See `/tasks/lessons.md` for full details.

---

## Recent Work (Last 7 Days)

### June 9–10, 2026 — HUBZone Webinar Command Center + encoregov SEO

**HUBZone webinar registration tracker → command center** (`/hubzone/registrations`, password-gated):
- `src/lib/hubzone-registrations.ts` — pulls GHL contacts by tags `hubzone-webinar` + `hubzone-webinar-bottom`, dedupes, drops test leads, flags internal (@encore-funding.com etc.) sign-ups. Computes pace vs. **200 goal**, projection (7-day run rate), velocity (24h/7d, days-since-last, momentum), source attribution (top vs bottom form).
- `src/app/api/hubzone/registrations/route.ts` — gated: accepts **`HUBZONE_TRACKER_PASSWORD`** (`hubzone2026`, shareable) OR the admin `PURCHASES_ADMIN_PASSWORD`. Returns 401 without.
- `src/app/hubzone/registrations/page.tsx` — login screen (👁️ show/hide), goal bar, pace/velocity stat cards, daily-signups sparkbars, source bars, follow-up worklist (name/company/email/phone/signup-time) + CSV export. Auto-refresh 60s, `noindex` via sibling layout.
- **Public count-only** `src/app/api/hubzone/spots/route.ts` — `{registered, capacity:100, remaining, full}`, NO PII — powers the scarcity banner.

**Meeting action items (June 10):**
- **Company Name field** — `LeadForm` gained opt-in `showCompany` prop → threaded through `/api/lead` → GHL `companyName` + Slack + webhook. Enabled on both `/hubzone` forms; worklist + CSV show Company.
- **Scarcity banner** — `HubzoneScarcityBanner.tsx` "first 100 get Zoom access" w/ live spots-remaining.
- **Spin-the-wheel PROTOTYPE** — `HubzoneSpinWheel.tsx` on `/hubzone/thank-you`. Canvas, weighted prizes (editable `PRIZES` array), one-spin-per-attendee (localStorage), crypto-random draw. NOTE: client-side draw — move server-side + record to GHL before using for real valuable prizes.
- Action items tracked in `tasks/hubzone-webinar-todo.md`.

**encoregov.com cross-site SEO (inbound links from this site):**
- HUBZone page: removed `rel=noreferrer` (was stripping link equity) → `rel=noopener`, descriptive anchor, points to `/government-contractor-financing`.
- Homepage (Mindy) footer: added contextual financing-partner link to encoregov.com (`rel=noopener`).
- **Repointed `/funding` + `/encore-funding`** (`FUNDING_DEST` in `funding/page.tsx`) from old `gov.encore-funding.com` → `encoregov.com/government-contractor-financing`, **UTM preserved** (`utm_source=Eric+Coffie&utm_medium=Referral`).

**Gotchas learned:**
- `echo "val" | vercel env add` stores a trailing `\n` → breaks constant-length password compare (401). Use `printf 'val' | vercel env add`, then redeploy (env binds only on a build AFTER the var is set).
- `rel="noreferrer"` on outbound links strips SEO link equity — use `rel="noopener"` alone for partner links you want to pass authority.

### June 2, 2026
- **Sales Tracking / Purchase Attribution (LIVE on govcongiants.com):**
  - First-party attribution funnel: `AttributionTracker` (layout.tsx) captures UTM/referrer/click-ids → `gca_attr` cookie + localStorage
  - Paid CTAs route through `/checkout/[product]` → records a `CheckoutStart` in shared Upstash, forwards `client_reference_id` to Stripe
  - `/api/stripe/webhook` (signature-verified, idempotent) joins attribution → saves `PurchaseRecord` + Slack alert
  - `/admin/purchases` dashboard + `/api/admin/purchases` API (password-gated via `PURCHASES_ADMIN_PASSWORD`), with by-site / by-source / by-product revenue rollups
  - **Unified cross-site:** site-namespaced keys (`PURCHASE_SITE`, default `gcg`); shared `purchases` index so one dashboard shows both govcongiants.com (`gcg`) and getmindy.ai (`mindy`)
  - **Storage:** shared Upstash `market-assassin-codes` (Vercel-managed); connecting it forces a `STORAGE_` prefix, so `getRedis()` reads `STORAGE_KV_REST_API_*` with unprefixed fallback
  - New files: `src/lib/purchase-attribution.ts`, `src/lib/admin-auth.ts`, `src/components/AttributionTracker.tsx`, `src/app/checkout/[product]/route.ts`, `src/app/api/stripe/webhook/route.ts`, `src/app/admin/purchases/page.tsx`, `src/app/api/admin/purchases/route.ts`
  - Env on Vercel: `STRIPE_WEBHOOK_SECRET`, `PURCHASES_ADMIN_PASSWORD`, `PURCHASE_SITE=gcg`, `STORAGE_KV_REST_API_*`
  - Mindy side (getmindy.ai) shipped in market-assassin PR #5 — see that repo's CLAUDE.md
  - **Note:** dead `.org` host 308-redirects same-path to `.com`; this repo serves govcongiants.com

### May 9, 2026
- **Federal Compass Comparison Page:**
  - Created `/compare/federal-compass` - targets "federal compass alternative"
  - Highlights per-user pricing disadvantage ($8-24/user vs $149 flat)
  - Cross-linked with Deltek and GovTribe comparison pages
- **Contractor Funding Chart (Phase 1):**
  - New USASpending.gov API library (`/src/lib/usaspending.ts`)
  - API endpoint `/api/contractor-funding?uei=X&name=Y`
  - ContractorFundingChart component with Recharts bar chart
  - 5-year funding history with YoY growth indicators (green/amber/red)
  - Summary metrics: total, average, peak year, YoY growth
  - Gated display on contractor profile pages
- **A/B Testing for MI Free CTAs:**
  - New ab-test library with localStorage persistence + GA4 tracking
  - ABTestLeadForm component for form submit button testing
  - 4 CTA variants on /mi-free page:
    - Control: "Get Free Access"
    - Variant A: "Start Free — No Credit Card"
    - Variant B: "Get Daily Contract Alerts"
    - Variant C: "Try Free for 30 Days"
- **Backlink Outreach:**
  - Drafted 15 personalized outreach emails (tasks/backlink-outreach-emails.md)
  - Targets: SBDCNet, GovCon Chamber, APEX, NCMA, Library of Congress, etc.
- **GovTribe Comparison Page (earlier):**
  - Created `/compare/govtribe` - targets "govtribe alternative" keywords
  - Feature comparison table, pricing comparison, honest strengths/weaknesses
  - Cross-linked with `/compare/deltek`
- **Internal Links to Data Pages (9 guides):**
  - Added links from high-traffic guides to new data pages
  - federal-market-research, finding-government-contracts, proposal-writing
  - capture-management, government-contracting-for-beginners, competitive-analysis
  - bid-no-bid, agency-budgets, business-development-plan
  - Links to: /data/agencies, /data/contractors, /data/forecasts
- **Data Pages (from previous session):**
  - `/data/contractors` - Index page + dynamic `[uei]` profiles
  - `/data/forecasts` - 7,700+ forecasts landing page (gated)
  - Homepage "Market Intelligence Platform" section added
  - PRD created for contractor sales chart feature

### April 14, 2026
- **SEO Redirect Fixes:**
  - `/opp` redirect: Changed to permanent (308) - preserves link equity
  - Added `/premium/accelerator/checkout` → Calendly redirect (prevents misleading checkout URL)
- **URL Audit:** Found `/premium` vs `/premium-page` inconsistency splitting link equity

### April 8, 2026
- **GSC CTR Optimization (20 pages):**
  - Analyzed GSC export: identified high-impression/low-CTR pages
  - Rewrote meta titles using bracket patterns, numbers, power words
  - **Round 1 (6 guides):** ai-government-contracting, vosb-certification, gsa-schedule, naics-codes, sba-certifications, sam-gov-registration
  - **Round 2 (5 blog posts):** federal-contract-vehicles-guide, win-government-contracts-no-experience, sam-gov-registration-checklist, 8a-vs-hubzone-vs-sdvosb, sam-gov-search-tricks
  - **Round 3 (5 guides):** wosb-certification, hubzone-certification, 8a-certification, capability-statement, finding-government-contracts
  - **Round 4 (4 zero-click pages):** which-sba-certification, federal-market-research, cmmc-certification, proposal-writing
  - All 20 URLs submitted to IndexNow
  - Expected impact: CTR 0.1% → 2%+, potential +500-1000 clicks/month
- **Homepage SEO Optimization:**
  - New title: `Government Contracting for Small Business [Free Training] | GovCon Giants`
  - New description with stats ($750B+, 5,000+ trained) and action keywords
  - Updated guide count display: "View All 140+ Guides"
- **Content Gap: New Guide Created:**
  - `/guides/how-to-bid-on-government-contracts` — High-value keyword, 9 sections, 8 FAQs
  - Targets "how to bid on government contracts" (competitors: Deltek, US Chamber, SBA)
  - Total guides now: 141
- **Infrastructure:** Added `canonicalUrl` support to BlogPost interface and generateSeo function

### April 7, 2026
- **SEO Guide Expansion to 140 Total Guides:**
  - Added 56 new guides via parallel agents (3 batches)
  - New categories: GSA/vehicles, proposal volumes, career guides, compliance
  - Total static pages: 283
- **Internal Linking Optimization:**
  - Fixed 37 orphan guides (zero inbound links)
  - Added links to high-value orphans: proposal-orals-prep, technical-evaluation, black-hat-reviews, agency-budgets, export-controls
- **Video SEO Fixes:**
  - Fixed duration schema bug ("45:00" → "PT45M")
  - Added chapter support with Clip schema
  - 3 videos now have chapters: proposal-writing-guide, get-started-government-contracting, pricing-government-contracts
- **Backlink Strategy:** Created `/tasks/backlink-strategy.md` with 15 targets + email templates

### April 6, 2026
- **Major SEO Content Expansion (67 new guides):**
  - Total guides: 84 (was 17)
  - New topics: contract types, FAR, DCAA, protests, certifications, proposal reviews, labor categories
- **CTR Optimization:** Applied bracket patterns to meta titles
- **Internal Linking:** Expanded relatedGuides arrays, added contextual links

### April 3, 2026
- **Website QA Sweep:** Fixed checkout flows (Pro Member → Stripe, Accelerator → Calendly)
- **JTED Follow-up:** Sent personalized emails to 7 MacDill AFB leads

### Earlier Work
See `/tasks/work-history.md` for full history including:
- March 31: Jobs board upgrade (JSearch + USAJobs dual source)
- March 29: GSC cleanup, 200+ redirects, CAGE CTR optimization
- March 26: SAM.gov API fix (`samRegistered=Yes`, 0-indexed pagination)

---

*Last Updated: June 10, 2026*
