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
| `/guides/[slug]` | 31 educational guides (SEO optimized) |
| `/videos/[slug]` | 8 video landing pages |
| `/jobs` | Job board - dual source (JSearch + USAJobs) |
| `/glossary` | 45+ GovCon terms |

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
- **Website QA Sweep (5 fixes):**
  - CRITICAL: Pro Member Plan checkout → Now redirects to Stripe payment link
  - CRITICAL: Accelerator checkout → Now redirects to Calendly discovery call
  - WARNING: Homepage → Removed stale "January Bootcamp", "Q4 spending", "Feb 28" references
  - WARNING: Premium page → Changed "January 31st Bootcamp Replay" to "Bootcamp Replay Access"
  - WARNING: Contract Vehicles Bootcamp → Changed "March 2026" to "Q2 2026" expiring contracts
- **JTED 2026 Follow-up:**
  - Queried GHL for JTED leads: 8 people downloaded the QR code at MacDill AFB
  - Sent personalized follow-up email to 7 leads (1 invalid email)
  - Email included ROI calculator link for BD Upskilling program
  - Used Gmail SMTP via hello@govconedu.com (GHL email delivery not configured)

### April 2, 2026
- **SEO Content Expansion (3 new guides):**
  - `/guides/cmmc-certification` — CMMC 2.0 compliance guide for defense contractors
  - `/guides/contract-vehicles` — GSA Schedule, GWACs, IDIQs, OASIS+ explained
  - `/guides/sources-sought` — How to respond to market research notices + template
  - Added to sitemap.ts (now 87 URLs) and IndexNow for fast indexing
- **SEO Fixes:**
  - Video pages added to IndexNow (17 pages)
  - Internal linking expanded in SAM Registration and Capability Statement guides
  - Missing pages added to sitemap: /guides, /guides/rfp-response, /tools/expiring-contracts
- **Page Fixes (5 issues):**
  - Pro Member Plan checkout → Stripe payment link
  - Accelerator checkout → Calendly discovery call
  - Contract Vehicles Bootcamp → Replay access (March 28 event passed)
  - Premium page → Enabled "Schedule Call" button with Calendly
  - Proposal bootcamp → Removed stale February 2026 dates
- **OH Redirect:** `/opp` now redirects directly to Opportunity Hunter tool (skip funnel)
- **SAM.gov API Key Rotation:** Added backup key failover when primary is rate-limited

### March 31, 2026
- **Jobs Board Upgrade:** Added JSearch API for private sector BD jobs (Capture Manager, Proposal Manager at Booz Allen, Leidos, etc.)
- **Dual Source Jobs:** Page now shows two sections - Private Sector (JSearch) + Federal Government (USAJobs)
- **Fixed /market-intel 404:** Added rewrite rule in next.config.ts

### March 29, 2026
- **GSC Cleanup:** Fixed 200+ legacy 404s with redirects, analyzed indexing issues
- **CAGE CTR Optimization:** New titles differentiating guide (educational) vs tool (action)
- **GSC Snapshot:** 72 pages indexed, 11,828 impressions on CAGE pages (0.4% CTR → targeting 2%+)

### March 26, 2026
- **CAGE Lookup Fix:** Fixed SAM.gov API - added `samRegistered=Yes` and 0-indexed pagination
- **Verified Working:** Company search returns results (booz → 56 results, saalex → 3 results)

*Full history: `/tasks/work-history.md`*

---

*Last Updated: April 6, 2026*
