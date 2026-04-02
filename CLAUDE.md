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
| `/guides/[slug]` | 15+ educational guides (SEO optimized) |
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

### April 2, 2026
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

*Last Updated: April 2, 2026*
