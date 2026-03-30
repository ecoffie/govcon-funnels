# GovCon Funnels - Work History Archive

This file contains archived work history entries from CLAUDE.md.

---

## March 2026

### March 29, 2026
- **GSC Cleanup & SEO Fixes:**
  - Fixed 200+ legacy WordPress 404 errors with redirects in `vercel.json`
  - Redirects: `/who-we-are`, `/pricing`, `/footcamp`, `/learning/*`, `/product/*`, `/platform/*`, `/author/*`, `/2024/*`, `/2025/*`, `/solutions/*`
  - Analyzed "Crawled - not indexed" (48 pages) - all Next.js chunks, no action needed
  - Analyzed "Excluded by noindex" (254 pages) - all old WordPress content, no action needed
  - Verified `/guides/sba-certifications` is actually indexed (stale GSC report)
- **CAGE Code CTR Optimization:**
  - Guide title: "CAGE Code Lookup (Free Tool)..." → "CAGE Code: What It Is & How to Get One (2026 Guide)"
  - Tool title: Fixed duplicate "GovCon Giants | GovCon Giants" bug
  - Tool title: "Free CAGE Code Lookup Tool..." → "CAGE Code Lookup [Free] — Search 600K+ Contractors"
  - Differentiated by intent: Guide = educational, Tool = action
  - Target: Improve 0.4% CTR on 11,828 impressions
- **GSC Performance Snapshot (3 months):**
  - Homepage: 96 clicks, 1,047 impressions (9.2% CTR)
  - CAGE code guide: 21 clicks, 6,254 impressions
  - CAGE code blog (redirect): 25 clicks, 5,574 impressions
  - 72 pages indexed total

### March 26, 2026
- **CAGE Lookup Fix:** Fixed SAM.gov API - added `samRegistered=Yes` and 0-indexed pagination
- **Verified Working:** Company search returns results (booz → 56 results, saalex → 3 results)

### March 25, 2026
- **SAM API Library Upgrade:**
  - Ported robust SAM API library from Market Assassin to govcon-funnels
  - New files: `/src/lib/sam/utils.ts`, `entity-api.ts`, `contract-awards.ts`, `index.ts`
  - Features: Supabase caching (24hr TTL), rate limiting (1000/day), retry logic
  - Deleted old `/src/lib/sam-entity.ts` (replaced by new library)
  - Installed `@supabase/supabase-js` dependency
- **Expiring Contracts Finder (New Lead Magnet Tool):**
  - Built free tool at `/tools/expiring-contracts`
  - Search by NAICS code for contracts expiring in 3-18 months
  - Shows 15 results (teaser), upsells to Market Assassin Pro for full access
  - Email gate after 3 searches (leads to GHL with tag "expiring-contracts")
  - Summary stats: total value, sole source count, urgent count
  - Added to `/tools` page as featured free tool
- **Testing Infrastructure:**
  - Installed Vitest, testing-library, msw
  - Created `vitest.config.ts` and `vitest.setup.ts`
  - Unit tests: 31 tests for utils and entity-api (all passing)
  - Integration tests: real API tests (skipped without API key)
  - Test commands: `npm run test:unit`, `test:integration`, `test:sam`
- **CI/CD Pipeline:**
  - Created `.github/workflows/test.yml`
  - Runs unit tests and build on push/PR
  - Integration tests run only on main branch
- **Claude Agent Commands:**
  - Created `/sam-lookup` command for CAGE/company lookups
  - Created `/find-expiring` command for expiring contracts search
  - Created `/test-sam` command for running SAM test suites
- **Internal Linking for SEO:**
  - Added expiring contracts tool links to 3 high-impression guides:
    - `/guides/finding-government-contracts` (in "Using Tools" section)
    - `/guides/gsa-schedule` (in "Winning Work" section)
    - `/guides/vosb-certification` (in "Monitor Contract Spending" section)
  - Added new tool URLs to IndexNow API route for search engine notification
  - Updated GSC bulk index file with `/tools/cage-code-lookup` and `/tools/expiring-contracts`
- **Contract Vehicles Bootcamp Landing Page:**
  - Added "Register & Get 6 Free Resources Instantly" section showing downloads upfront
  - 6 free resources: Expiring Contracts List, Recompete Checklist, 10 IDIQ Vehicles Guide, Active IDIQ List, Sources Sought Template, Task Order Template
  - Design matches "What You Will Learn" style (2-column grid, icon boxes, green accents)
  - Updated form CTA to "Get Free Access Now"
  - Bootcamp date: March 28, 2026 at 9:00 AM ET

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

---

## February 2026

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
