# GovCon Funnels - Work History Archive

This file contains archived work history entries from CLAUDE.md.

---

## April 2026

### April 8, 2026
- **GSC CTR Optimization (20 pages):**
  - Analyzed GSC Pages export to identify high-impression/low-CTR opportunities
  - Key finding: Pages with position 5-10 but <0.5% CTR = title/meta problem
  - Rewrote meta titles using proven CTR patterns:
    - Brackets: [Free], [2026], [Checklist], [Chart]
    - Numbers: specific $ amounts, timelines, step counts
    - Power words: "Win", "Get", "Find", "Avoid"
  - **Round 1 - High-impression guides (6):**
    - ai-government-contracting: 6,494 imp, 0.17% CTR → `AI for Government Contracting [Free Tools] — Find & Win Contracts Faster`
    - vosb-certification: 5,425 imp, 0.09% CTR → `VOSB & SDVOSB Certification [Free Checklist] — Get Verified in 90 Days`
    - gsa-schedule: 4,977 imp, 0.08% CTR → `GSA Schedule [Step-by-Step] — Get Approved in 4-6 Months (2026)`
    - naics-codes: 3,500 imp, 0.14% CTR → `NAICS Code Lookup [Free] — Find Your Code + Size Standard Instantly`
    - sba-certifications: 3,211 imp, 0.03% CTR → `SBA Certifications Explained: 8(a) vs SDVOSB vs HUBZone vs WOSB [2026]`
    - sam-gov-registration: 5,611 imp, 0.07% CTR → `SAM.gov Registration [Free Step-by-Step] — Get Approved in 7 Days`
  - **Round 2 - High-impression blog posts (5):**
    - federal-contract-vehicles-guide: 3,973 imp → `Federal Contract Vehicles [Chart] — IDIQ vs BPA vs GSA vs GWAC Explained`
    - win-government-contracts-no-experience: 3,153 imp → `Win Government Contracts With No Experience [5 Strategies That Work]`
    - sam-gov-registration-checklist: 3,482 imp → `SAM.gov Registration Checklist [Free PDF] — 12 Items Before You Start`
    - 8a-vs-hubzone-vs-sdvosb: 3,849 imp → `8(a) vs HUBZone vs SDVOSB [Comparison Chart] — Best for Your Business?`
    - sam-gov-search-tricks: 2,337 imp → `SAM.gov Search Tricks [5 Hacks] — Find Contracts Others Miss`
  - **Round 3 - More guides (5):**
    - wosb-certification → `WOSB Certification [Free Guide] — $5B+ in Set-Aside Contracts (2026)`
    - hubzone-certification → `HUBZone Certification [Map + Checklist] — Get 10% Price Preference`
    - 8a-certification → `8(a) Certification [2026 Guide] — Sole-Source Contracts Up to $4.5M`
    - capability-statement → `Capability Statement Template [Free Download] — 6 Sections That Win`
    - finding-government-contracts → `How to Find Government Contracts [Free Tool] — SAM.gov Search Guide`
  - **Round 4 - Zero-click pages (4):**
    - which-sba-certification → `Which SBA Certification? [2-Min Quiz] — Find Your Best Fit`
    - federal-market-research → `Federal Market Research [Free Tools] — Find $B in Contract Spending`
    - cmmc-certification → `CMMC Certification [2026 Deadline] — Costs, Levels & Requirements`
    - proposal-writing → `Government Proposal Writing [Free Template + Checklist] — Win RFPs`
  - All 20 URLs submitted to IndexNow
  - Expected impact: CTR improvement from 0.1% → 2%+, potential +500-1000 clicks/month
- **Homepage SEO Optimization:**
  - New title: `Government Contracting for Small Business [Free Training] | GovCon Giants`
  - New meta description: includes stats ($750B+, 5,000+ trained), action keywords, free tools
  - Updated homepage guide count: "View All 140+ Guides"
  - Targeting: position 16 → 10 (page 1)
- **Content Gap Analysis & New Guide:**
  - Analyzed competitor rankings: Deltek, US Chamber, SBA, FedBizAccess
  - Identified gap: "how to bid on government contracts" - high search volume, no GCG guide
  - Created `/guides/how-to-bid-on-government-contracts`:
    - 9 comprehensive sections (full bidding lifecycle)
    - 8 FAQs for rich snippet potential
    - Internal links to related guides (SAM, proposals, finding contracts)
  - Total guides: 141
- **Infrastructure:**
  - Added `canonicalUrl` field to BlogPost interface
  - Updated generateSeo() to support canonical URL override
  - Confirmed CAGE blog→guide 301 redirect working (308 status)

### April 7, 2026
- **SEO Guide Expansion (140 total guides):**
  - Added 56 new guides in 3 batches using parallel agents:
    - Batch 1 (16): Proposal guides, contract admin, BD strategy, pricing/cost
    - Batch 2 (20): Certifications, contract execution, advanced BD, compliance
    - Batch 3 (20): GSA/vehicles, proposal volumes, career/industry, contract admin
  - Notable new guides: gsa-mas-guide, technical-volume, capture-manager-career, ethics-compliance, agency-level-protests
  - Total static pages: 283 (up from 243)
  - All guides submitted to IndexNow
- **Internal Linking Optimization:**
  - Identified 37 orphan guides (zero inbound links)
  - Added links to 5 high-value orphans from hub pages:
    - proposal-orals-prep ← proposal-writing
    - technical-evaluation ← proposal-writing
    - black-hat-reviews ← proposal-writing
    - agency-budgets ← capture-management, finding-government-contracts
    - export-controls, counterfeit-parts, conflict-minerals ← compliance-program
- **Video SEO Fixes:**
  - Fixed duration bug: "45:00" → "PT45M" (was "PT45M00S")
  - Fixed missing duration parameter in video schema
  - Added chapter/timestamp support to VideoData interface
  - Added `inLanguage: "en-US"` to video schema
  - Added chapters to 3 high-value videos:
    - proposal-writing-guide (7 chapters)
    - get-started-government-contracting (6 chapters)
    - pricing-government-contracts (7 chapters)
- **Backlink Strategy Document:**
  - Created `/tasks/backlink-strategy.md`
  - 15 prioritized targets (SBDCNet, GovCon Chamber, APEX, HARO, podcasts)
  - 3 email templates (resource page, guest post, podcast pitch)
  - Week-by-week action plan

### April 6, 2026
- **Major SEO Content Expansion (11 new guides):**
  - `/guides/oasis-plus` — OASIS+ GWAC overview, pools, eligibility
  - `/guides/past-performance` — Building and documenting PP for proposals
  - `/guides/teaming-agreements` — JVs, mentor-protégé, subcontracting
  - `/guides/sole-source` — Non-competitive awards by certification type
  - `/guides/cpars` — Contractor Performance Assessment Reports
  - `/guides/set-asides` — All small business set-aside programs
  - `/guides/gsa-advantage` — GSA's online marketplace ($30B+/year)
  - `/guides/simplified-acquisition` — SAP & micro-purchases under $250K
  - `/guides/cost-proposals` — Pricing government contracts
  - `/guides/contract-modifications` — Change orders, options, extensions
  - `/guides/bid-no-bid` — Opportunity evaluation framework
- **Total guides now: 31** (up from 20 at start of April)
- **CTR Optimization (11 guides):**
  - Applied bracket patterns, numbers, action words to meta titles
  - government-contracting-for-beginners: `[Free] — Win Your First Contract in 90 Days`
  - finding-government-contracts: `[Free] — 5 SAM.gov Search Hacks`
  - cage-code: `[Free Lookup] — Get Yours in 7 Days (2026 Guide)`
  - proposal-writing: `[Free Template] — Win More RFPs in 2026`
  - 8a-certification: `[Checklist] — Get Sole-Source Contracts Up to $4.5M`
  - sources-sought: `[Free Template] — Turn RFIs Into Set-Asides`
  - contract-vehicles: `[Chart] — GSA vs GWAC vs IDIQ vs OASIS+`
- **Internal Linking Sweep (20+ guides updated):**
  - Added contextual inline links where topics are mentioned in content
  - Expanded `relatedGuides` arrays from 3-4 to 5-6 guides each
  - Connected new guides to existing content bidirectionally
  - Fixed broken reference to non-existent 'capture-management' guide in bid-no-bid
  - Key connections: proposal-writing→cost-proposals, 8a→sole-source, gsa-schedule→gsa-advantage
- **IndexNow Submissions:** Notified search engines of 8 new high-value URLs
- **GSC Analysis:**
  - 90 indexed pages, 498 not indexed (mostly Next.js chunks + legacy WordPress)
  - Identified "Discovered - not indexed" pages needing attention
  - Performance: 424 clicks, 85.4K impressions, 0.5% CTR, position 7.9

### April 3, 2026
- **Website QA Sweep (5 fixes):**
  - CRITICAL: Pro Member Plan checkout → Now redirects to Stripe payment link (`buy.stripe.com/...`)
  - CRITICAL: Accelerator checkout → Now redirects to Calendly discovery call
  - WARNING: Homepage → Removed stale "January Bootcamp", "Q4 spending", "Feb 28" references in `shared-content.ts`
  - WARNING: Premium page → Changed "January 31st Bootcamp Replay" to "Bootcamp Replay Access"
  - WARNING: Contract Vehicles Bootcamp → Changed "March 2026" to "Q2 2026" expiring contracts
- **JTED 2026 Follow-up:**
  - Queried GHL for JTED leads: 8 people downloaded the QR code at MacDill AFB (April 1 event)
  - Sent personalized follow-up email to 7 leads (1 invalid: btaylor@chronicle.com)
  - Email included ROI calculator link for BD Upskilling program (`govcongiants.org/upskilling/roi-calculator.html`)
  - Used Gmail SMTP via `hello@govconedu.com` (GHL email delivery not configured)
  - Notable companies: Kight Construction, Park Coastal Surveying (2 leads), Total Facade Resto, Alfka
- **Claude Infrastructure Audit & Upgrades:**
  - Analyzed all 32 custom slash commands, 14 docs, 7 MCP servers
  - **Enabled Vimeo MCP:** Added credentials to `~/.mcp.json` (8 tools: upload, bulk_upload, list_videos, etc.)
  - **CLAUDE.md updated:** Added 6 missing doc references (testing-checklist, email-templates, slide-components, briefing-format, briefing-data-sources, briefing-examples)
  - **Enhanced `/sync-access`:** Expanded from 81 to 250+ lines with full diagnostic workflow, decision tree, common issues
  - **Key finding:** 95% of recommended features already existed - just needed references and minor enhancements
  - MCP servers now active: samgov, stripe, grantsgov, perplexity, framer, vimeo (6 total)

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

---

## March 2026

### March 31, 2026
- **JTED 2026 Landing Page:**
  - Created `/jted-2026` landing page for JTED 2026 AEC Industry Day at MacDill AFB (April 1, 2026)
  - Lead magnet for A/E/C Federal Intel Pack and presentation slides
  - Features: email capture with LeadForm, stats row, download previews, "What's In The Intel Pack" section
  - Added preview image of Intel Pack cover page (`/images/jted-intel-pack-preview.png`)
  - Two-column layout for downloads with visual preview similar to TempNet staffing example
  - Source: `src/app/jted-2026/page.tsx`, thank-you page at `src/app/jted-2026/thank-you/page.tsx`

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
