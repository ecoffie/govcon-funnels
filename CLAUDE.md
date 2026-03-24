# GovCon Funnels - Claude Project Context

## Quick Identifier
**This is the "$82 BILLION UNSPENT" homepage project.**

When user says: "the $82B page", "govcon funnels", "main marketing site", "the hero with unspent money"
→ This is the project they mean.

---

## Project Overview
**Name:** GovCon Funnels (Marketing Landing Pages)
**Purpose:** Main marketing funnel site for GovCon Giants
**Live URL:** govcongiants.org (primary marketing site)
**Framework:** Next.js 16 with Turbopack

## Project Location
```
/Users/ericcoffie/Projects/govcon-funnels
```

## Tech Stack
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Styling:** Dark theme (slate-950 base), green accents
- **CRM:** GoHighLevel v2 API (PIT key)
- **Notifications:** Slack incoming webhooks

---

## Integrations

### GoHighLevel CRM
- **API:** v2 (`services.leadconnectorhq.com`)
- **Key Type:** PIT (Personal Integration Token)
- **Location ID:** `AMkIivLuREYwsX5GhAAL`
- **Auto-tags:** `funnel-{source}` (e.g., `funnel-bootcamp`)

### Slack Notifications
- **Webhook:** Configured in Vercel env vars
- **Channel:** Receives lead notifications with name, email, phone, source

### Lead Flow
```
User submits form → /api/lead
    ↓ (parallel)
├── GHL v2 API → Creates contact with tags
├── Slack → Sends notification
└── (optional) Webhook → Zapier/Make
```

---

## Environment Variables

| Variable | Purpose | Location |
|----------|---------|----------|
| `GHL_API_KEY` | GoHighLevel PIT key | Vercel + .env.local |
| `GHL_LOCATION_ID` | GHL sub-account ID | Vercel + .env.local |
| `SLACK_LEAD_WEBHOOK_URL` | Slack incoming webhook | Vercel + .env.local |
| `STRIPE_SECRET_KEY` | Stripe payments | Vercel + .env.local |
| `SAM_API_KEY` | SAM.gov Entity API for CAGE lookup | Vercel + .env.local |

---

## Pages

### Next.js App Routes
| Route | Purpose |
|-------|---------|
| `/` | Main homepage - "$82 BILLION UNSPENT" hero |
| `/bootcamp` | Bootcamp funnel (upsell, downsell, thank-you sub-routes) |
| `/surge` | Surge Bootcamp landing page |
| `/free-course` | Free GovCon Course signup |
| `/opp` | Opportunity Hunter funnel |
| `/tools` | Tools index page |
| `/tools/cage-code-lookup` | Free CAGE code lookup tool (SEO: 9,900/mo) |
| `/resources` | Free resources library |
| `/videos` | Video library index page |
| `/videos/[slug]` | Video landing pages (8 videos) |
| `/guides` | Guide library index |
| `/guides/[slug]` | Guide pages (15+ guides) |
| `/jobs` | Government contractor jobs board |
| `/jobs/[category]` | Job category pages (9 categories) |
| `/glossary` | GovCon terminology glossary |
| `/training` | Training hub |
| `/premium` | Premium membership page |
| `/dashboard` | Internal dashboard |
| `/encore` | Encore Funding partner page |
| `/feb-28-bootcamp` | Redirects → `/proposal-bootcamp` |

### Static HTML Funnels (`public/`)
| Path | Purpose |
|------|---------|
| `/proposal-bootcamp/` | Feb 28 Proposal Bootcamp funnel (4-step: landing → upsell → downsell → thank-you) |
| `/proposal-bootcamp/index.html` | Landing page with lead capture form |
| `/proposal-bootcamp/2-upsell.html` | Pro membership upsell ($99/mo or $799/yr) |
| `/proposal-bootcamp/3-downsell.html` | Downsell alternative offer |
| `/proposal-bootcamp/4-thank-you.html` | Thank you + resource downloads |

### Shortlinks (vercel.json)
| Short URL | Destination |
|-----------|-------------|
| `/pb` | `/proposal-bootcamp` |
| `/funding` | Encore Funding partner page |
| `/2-upsell.html` | Redirects → `/proposal-bootcamp/2-upsell.html` |
| `/3-downsell.html` | Redirects → `/proposal-bootcamp/3-downsell.html` |
| `/4-thank-you.html` | Redirects → `/proposal-bootcamp/4-thank-you.html` |

---

## Homepage Structure

### Hero Section
- **Headline:** "$82 BILLION UNSPENT FEDERAL MONEY"
- **Live badge:** Red pulsing "LIVE NOW" indicator
- **CTA buttons:** "Get Started Free" + "Watch Free Training"

### Stats Bar
- $750B+ Annual Federal Spending
- 23% Set Aside for Small Biz
- 5,000+ Members Trained
- $2B+ Contracts Won

### Sections
1. **Resources** - 6 cards (Bootcamp, Surge, Free Course, Opp Hunter, Resources, Pro)
2. **Urgency** - "$82 Billion Must Be Spent" CTA
3. **Training Videos** - 3 video category cards
4. **Final CTA** - "Ready to Win Federal Contracts?"
5. **Footer** - Contact info (786-477-0477, hello@govconedu.com)

---

## Key Files

| File | Purpose |
|------|---------|
| `/src/app/page.tsx` | Main homepage |
| `/src/app/resources/page.tsx` | Free resources library with videos |
| `/src/app/videos/page.tsx` | Video library index |
| `/src/app/videos/[slug]/page.tsx` | Dynamic video landing page template |
| `/src/app/guides/[slug]/page.tsx` | Dynamic guide page template |
| `/src/app/globals.css` | Global styles with green-glow effect |
| `/src/app/layout.tsx` | Root layout |
| `/src/lib/crm.ts` | GHL + Slack + webhook integrations |
| `/src/lib/seo.ts` | SEO utilities, JSON-LD schemas |
| `/src/app/api/lead/route.ts` | Lead submission API endpoint |
| `/src/components/LeadForm.tsx` | Reusable lead capture form |
| `/src/components/GuideEmailCapture.tsx` | Mid-article email capture component |
| `/src/content/videos/index.ts` | Video data structure & exports |
| `/src/content/guides/*.ts` | Guide content data files |
| `/src/lib/sam-entity.ts` | SAM.gov Entity API wrapper for CAGE lookup |
| `/src/app/api/cage-lookup/route.ts` | CAGE code search API with rate limiting |
| `/src/app/tools/cage-code-lookup/page.tsx` | Free CAGE code lookup tool |
| `/tasks/prd-cage-code-lookup.md` | PRD with evaluation criteria |

---

## Resources Page (`/resources`)

### Video Sections
- **Getting Started** - Where Do I Start, SBA Profile Setup
- **Finding Opportunities** - Market Research, Finding Contracts, PSC Codes, Dangers of Consulting
- **Winning Contracts** - Proposals, Capability Statements, Pricing (Parts 1 & 2), Winning Without Past Performance
- **Fulfillment & Growth** - Financing, Vendor Credit
- **Industry Specific** - Construction, Foreign Companies, GSA Schedule

### Video Thumbnails
Custom thumbnails stored in `/public/images/videos/`:

| Thumbnail File | Used For |
|----------------|----------|
| `Does the government buy.jpg` | Where Do I Start, Market Research |
| `SBA profile setup.jpg` | SBA Profile Setup |
| `Navigating Government bid.jpg` | Finding Contract Opportunities |
| `How to determine potential Untapped.jpg` | Understanding PSC Codes |
| `The dangers of being a government contractors.jpg` | Dangers of Being a Consultant |
| `No Proposal Writer.jpg` | Proposal Writing & Bidding |
| `How to create compelling capability statements.jpg` | Capability Statements |
| `How to estimate government bid.jpg` | Pricing Strategies |
| `cost evaluation secerets.jpg` | Pricing Strategies Part 2 |
| `Strategies to win government contracts.jpg` | Winning Without Past Performance |
| `How to build your business credit.jpg` | Financing Your Contract |
| `How to build 1000000.jpg` | Vendor & Supplier Credit |
| `from 0 to 125,000.jpg` | Construction Business |
| `supporting small business.jpg` | Foreign-Based Companies |
| `GSA Business mastery.jpg` | GSA Schedule Overview |

### Templates & Tools Section
- Gated resources requiring email signup
- Links to `/resources/handouts` for downloads

---

## Development

### Run Dev Server
```bash
cd /Users/ericcoffie/govcon-funnels
npm run dev
```

### Build
```bash
npm run build
```

---

## Related Projects

| Project | Location | Purpose |
|---------|----------|---------|
| **Market Assassin** | `/Users/ericcoffie/Projects/market-assassin` | Dev/staging tools (tools.govcongiants.org) |
| **GovCon Shop** | `/Users/ericcoffie/govcon-shop` | Live shop (shop.govcongiants.org) |
| **GovCon Funnels** | This project | Marketing funnel pages |

---

## Design Notes
- **Color scheme:** Dark (slate-950) with green-500 accents, red-500 for urgency
- **Style:** Bold headlines, minimal, high contrast
- **Vibe:** Urgent, opportunity-focused, action-oriented

---

## Critical Notes

### Static Funnel URLs Must Be Absolute
Static HTML funnels in `public/` MUST use absolute paths for inter-page links (e.g., `/proposal-bootcamp/2-upsell.html`, NOT `2-upsell.html`). Relative URLs break when the browser loads the page without a trailing slash — the relative URL resolves to the root instead of the subdirectory.

### Dual Routing: Next.js + vercel.json
- `vercel.json` redirects run FIRST (before Next.js)
- `next.config.ts` has its own `redirects()` and `rewrites()` — check both when debugging routing
- Static files in `public/` are served by Next.js but can be shadowed by app routes at the same path

### No Node.js on Dev Machine
Same as market-assassin — `npm`, `node`, `vercel` CLI are not available locally. Vercel handles builds on push.

---

## Recent Work History

### March 22, 2026
- **Video SEO Landing Pages:**
  - Created 8 video landing pages at `/videos/[slug]` targeting ~10,600 monthly searches
  - Built video library index at `/videos`
  - Added VideoObject JSON-LD schema to `/lib/seo.ts`
  - Videos: get-started, find-contracts, market-research, proposal-writing, capability-statement, pricing, win-without-past-performance, gsa-schedule
- **Guide Page Redesign:**
  - Improved typography inspired by Mark Manson / Tim Ferriss blogs
  - Larger headings (6xl), section dividers, better spacing
  - Added mid-article email capture with `GuideEmailCapture` component
  - Added `.guide-content` CSS styles with numbered list styling
- **RFP Response Guide:**
  - Created `/guides/rfp-response` for "rfp response" keyword (880/mo)
- **Documentation Updates:**
  - Updated VIDEO-SEO-MAPPING.md with completed implementation
  - Updated SEO-3-MONTH-PLAN.md with video page milestones
  - Updated README.md with project structure

### February 25, 2026
- **Fixed broken proposal-bootcamp funnel flow:**
  - All 4 funnel pages had relative URLs (`2-upsell.html`) that broke without trailing slash
  - Changed to absolute paths (`/proposal-bootcamp/2-upsell.html`) in index.html, 1-landing.html, 2-upsell.html, 3-downsell.html
  - Added catch-all redirects in vercel.json for `/2-upsell.html`, `/3-downsell.html`, `/4-thank-you.html`

### February 16, 2026
- **GoHighLevel Integration:**
  - Upgraded from v1 API to v2 API (`services.leadconnectorhq.com`)
  - Switched from JWT key to PIT (Personal Integration Token)
  - All funnel forms now auto-create contacts with tags
- **Slack Integration:**
  - Added real-time lead notifications to Slack
  - Rich formatted messages with name, email, phone, source
- **Code Fixes:**
  - Removed `"type": "commonjs"` from package.json (was breaking Next.js 16)
  - Updated `/src/lib/crm.ts` to run GHL + Slack in parallel
- **Tested & Verified:**
  - Contacts appearing in GHL with correct tags
  - Slack notifications working
  - Deployed to production

### February 4, 2026
- Created CLAUDE.md files for all GovCon projects:
  - `/Users/ericcoffie/Market Assasin/CLAUDE.md` (master reference)
  - `/Users/ericcoffie/govcon-funnels/CLAUDE.md` (this file)
  - `/Users/ericcoffie/govcon-shop/CLAUDE.md` (live shop)
- Updated `/resources` page video thumbnails:
  - Created `/public/images/videos/` folder
  - Added 16 custom thumbnail images
  - Mapped all videos to correct thumbnails
- Fixed video entries:
  - Removed duplicate "Finding Suppliers" (same as Construction video)
  - Renamed "Agency Pain Points with Lori Smith" → "The Dangers of Being a Government Consultant"
  - Updated description and features to match actual video content
- Swapped multiple thumbnails to match correct videos:
  - Fulfillment section: Financing, Vendor Credit reordered
  - Industry section: Construction, Foreign Companies fixed

### March 24, 2026
- **CAGE Code Lookup Tool:**
  - Built free tool at `/tools/cage-code-lookup` targeting "cage code lookup" (9,900/mo searches)
  - SAM.gov Entity API integration (`/src/lib/sam-entity.ts`)
  - Search by CAGE code or company name
  - Email gate after 3 results (leads to GHL with tag "cage-lookup")
  - Rate limiting (30/hour per IP)
  - Added to `/tools` page as featured free tool
  - Internal link from `/guides/cage-code`
  - PRD with evaluation criteria at `/tasks/prd-cage-code-lookup.md`
  - **Note:** SAM.gov API has 10 requests/day limit for personal keys. Resets at midnight UTC.
- **GSC Analysis & CTR Optimization:**
  - Identified "cage code lookup" opportunity: 316 impressions, 0.6% CTR at position 9.9
  - Two pages competing: `/blog/cage-code-lookup-guide` (296 imp) vs `/guides/cage-code` (21 imp)
  - Built tool to match search intent (users want tool, not guide)
- **Meta Tag CTR Optimization (15 pages on govcongiants.org):**
  - Round 1: cage-code, 8a-vs-hubzone, sam-checklist, capability-statement, gsa-schedule
  - Round 2: vosb-certification, win-no-experience, naics-codes, bd-jobs-150k, sam-registration
  - Round 3: contracts-admin-career, capture-manager-salary, pricing-analyst, glossary, jobs
  - Techniques: numbers, free offers, fear hooks, salary specificity, urgency
  - Combined impressions: ~9,800/month with near-zero CTR → optimized for clicks
- **Shop Blog Optimization (shop.govcongiants.org):**
  - Analyzed 15 shop blog articles vs main site guides — identified differentiation strategy
  - Shop = tool-focused content, main site = educational guides
  - Optimized all 15 shop blog meta descriptions for CTR
  - Added tool badges to articles missing them
- **Cross-Domain Linking:**
  - Added "Free guides" cross-links from all 15 shop blog articles to govcongiants.org
  - Links per article: 2-3 relevant guides (SAM registration, capability statements, certifications, etc.)
  - SEO benefit: Cross-domain authority building between shop and main site

---

*Last Updated: March 24, 2026*