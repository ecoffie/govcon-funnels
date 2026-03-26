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
| `/jobs` | Job board with 9 categories |
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
| `/opp` | Opportunity Hunter signup |
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

### API Routes
| Route | Purpose |
|-------|---------|
| `/api/lead` | Lead submission (GHL + Slack) |
| `/api/cage-lookup` | CAGE code search |
| `/api/expiring-contracts` | Expiring contracts search |
| `/api/indexnow` | Search engine notification |

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `GHL_API_KEY` | GoHighLevel PIT key |
| `GHL_LOCATION_ID` | GHL sub-account ID |
| `SLACK_LEAD_WEBHOOK_URL` | Slack webhook |
| `STRIPE_SECRET_KEY` | Stripe payments |
| `SAM_API_KEY` | SAM.gov Entity API |
| `SAM_CONTRACT_AWARDS_API_KEY` | SAM.gov Awards API |
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

## Recent Work (Last 7 Days)

### March 25, 2026
- **SAM API Library:** Ported from Market Assassin with Supabase caching
- **Expiring Contracts Tool:** `/tools/expiring-contracts` (15-result teaser, email gate)
- **Testing:** Vitest setup, 31 unit tests, CI/CD pipeline
- **Internal Links:** Added tool links to 3 high-impression guides
- **Contract Vehicles Bootcamp:** Added 6 free resources section

### March 24, 2026
- **CAGE Code Lookup:** `/tools/cage-code-lookup` targeting 9,900/mo searches
- **CTR Optimization:** Meta tags for 15 pages across govcongiants.org
- **Cross-Domain Links:** Shop blog → main site guide links

### March 22, 2026
- **Video Pages:** 8 video landing pages at `/videos/[slug]`
- **Guide Redesign:** Improved typography, mid-article email capture

*Full history: `/tasks/work-history.md`*

---

*Last Updated: March 25, 2026*
