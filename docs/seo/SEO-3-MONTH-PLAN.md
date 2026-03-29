# SEO Content 3-Month Plan — GovCon Giants

**Start date:** March 14, 2026
**Owner:** Eric Coffie
**Goal:** Rank for validated keyword opportunities, drive organic leads

---

## Current State (March 13, 2026)

### Deployed (Live on govcongiants.org)
- 8 original guides (beginners, SAM, capability, SBA certs, finding contracts, proposals, subcontracting, market research)
- /tools, /consulting, /free-course, /premium pages
- Sitemap, robots.txt, SEO metadata

### Built (Local, Not Yet Deployed)
- 7 new guides: CAGE code, VOSB, HUBZone, 8(a), WOSB, GSA Schedule, AI GovCon
- 2 service pages: /government-contract-help, /proposal-writing-services
- 1 glossary: /glossary (45+ terms)
- Updated: sitemap, nav, footer, cross-links, sba-certifications links, SAM guide troubleshooting

---

## Month 1: Deploy + Index + Quick Wins (Mar 14 – Apr 13)

### Week 1 (Mar 14-20): Deploy Everything
- [x] Push all new content to git and deploy to Vercel ✅ Mar 14
- [x] Verify all 18 new URLs return 200 (run `scripts/seo-health-check.sh`) ✅ 44/44 passed
- [x] Verify sitemap.xml includes all 30+ URLs ✅ 37 URLs
- [x] Submit updated sitemap to Google Search Console ✅ Mar 14
- [x] Submit updated sitemap to Bing Webmaster Tools ✅ Mar 14
- [x] Request indexing for top 5 priority pages in GSC: ✅ Mar 14
  1. /guides/cage-code (9,900/mo, difficulty 8)
  2. /government-contract-help ($31.70 CPC)
  3. /proposal-writing-services ($14.15 CPC)
  4. /glossary (captures dozens of long-tail queries)
  5. /guides/gsa-schedule (110K broad volume)

### Week 2 (Mar 21-27): Index Verification
- [x] Check GSC for indexing status of all new pages ✅ Mar 17
  - /guides/cage-code: INDEXED (Breadcrumbs + FAQ enhancements)
  - /government-contract-help: INDEXED (FAQ enhancement)
  - /glossary: INDEXED
  - /guides/gsa-schedule: INDEXED (Breadcrumbs)
  - /proposal-writing-services: Discovered, not indexed → Requested indexing Mar 17
- [x] Fix any crawl errors or indexing issues ✅ No errors found
- [x] Verify JSON-LD validates (test with Google Rich Results Test) ✅ Mar 17
  - Article + FAQPage on each guide ✅
  - Service on /government-contract-help and /proposal-writing-services ✅
  - DefinedTermSet on /glossary ✅
- [x] Set up Google Search Console performance tracking for target keywords ✅ Mar 17

#### Week 2 Performance Snapshot (Mar 17, 2026)
| Metric | Value | Month 1 Target | Status |
|--------|-------|----------------|--------|
| Total Clicks | 19 | 20+ | 95% of target |
| Total Impressions | 360 | 500+ | 72% of target |
| Average CTR | 5.3% | >3% | EXCEEDING |
| Average Position | 8.9 | Top 10 | ON TARGET |

#### Week 4 Performance Snapshot (Mar 29, 2026)
| Metric | Value | Month 1 Target | Status |
|--------|-------|----------------|--------|
| Homepage Clicks | 96 | - | TOP PERFORMER |
| Homepage Impressions | 1,047 | - | 9.2% CTR |
| CAGE Code (guide) | 21 clicks | - | 6,254 impressions |
| CAGE Code (blog redirect) | 25 clicks | - | 5,574 impressions |
| Free Course | 11 clicks | - | 303 impressions, 3.6% CTR |
| tools.govcongiants.org | 11 clicks | - | 625 impressions |

**Top Finding:** CAGE code pages combined = 46 clicks, 11,828 impressions (0.4% CTR)
- CTR is low — need to improve title/meta for CAGE pages
- `/tools/cage-code-lookup` not yet appearing (built Mar 24, needs indexing time)

**Indexing Status:**
- 72 pages indexed ✅
- 200 pages returning 404 → Fixed with redirects Mar 29
- 48 pages "Crawled - currently not indexed" → Needs review
- 9 pages "Discovered - currently not indexed" → Normal for new pages

### Week 3 (Mar 28 – Apr 3): Content Optimization Round 1
- [x] Review GSC data — which pages are getting impressions but low CTR? ✅ Mar 24
- [x] Fix 200+ legacy WordPress 404 errors ✅ Mar 29
  - Added 301 redirects for: /who-we-are, /pricing, /footcamp, /learning/*, /product/*, /platform/*, /author/*, /2024/*, /2025/*, /solutions/*
  - Verified all redirects working (HTTP 308)
  - "cage code lookup": 316 impressions, 0.6% CTR, position 9.9
  - Problem: Guide ranking for tool intent query
- [x] Build CAGE Code Lookup Tool to match search intent ✅ Mar 24
  - `/tools/cage-code-lookup` - free tool with SAM.gov API
  - Email gate after 3 results (lead capture)
  - Internal link from `/guides/cage-code`
  - Targeting 9,900/mo searches for "cage code lookup"
  - **Note:** SAM.gov API has 10 req/day limit for personal keys. Resets midnight UTC.
- [x] Add internal links from homepage to top 3 new guides ✅ Mar 17 (done early)
  - Added: 8(a) Certification, GSA Schedule, Government Contract Help, Proposal Writing
  - Homepage now links to 8 guides (up from 4)
- [x] CTR Optimization for 15 high-impression pages ✅ Mar 24
  - Round 1: cage-code, 8a-vs-hubzone, sam-checklist, capability-statement, gsa-schedule
  - Round 2: vosb-certification, win-no-experience, naics-codes, bd-jobs-150k, sam-registration
  - Round 3: contracts-admin-career, capture-manager-salary, pricing-analyst, glossary, jobs
  - Techniques: numbers, free offers, fear hooks, salary specificity, urgency
- [x] Shop Blog Differentiation ✅ Mar 24
  - Analyzed shop.govcongiants.org/blog (15 articles) vs main site guides
  - Strategy: Shop = tool-focused, main site = educational
  - Optimized all 15 shop blog meta descriptions for CTR
  - Added tool badges to all shop blog articles
- [x] Cross-Domain Linking ✅ Mar 24
  - Added "Free guides" cross-links from all 15 shop blog articles to govcongiants.org
  - Links to: SAM registration, capability statements, NAICS codes, certifications, proposals
  - SEO benefit: Cross-domain authority building
- [x] Share CAGE code guide on social channels ✅ Mar 25 (drafted in SOCIAL-POSTS-MARCH-2026.md)
- [x] Share glossary as a resource on LinkedIn ✅ Mar 25 (drafted in SOCIAL-POSTS-MARCH-2026.md)
- [ ] Monitor GSC in 7-14 days for CTR improvement on optimized pages

### Week 3.5 (Mar 22): Video SEO Pages ✅ COMPLETED
- [x] Created video landing page infrastructure
  - `/app/videos/page.tsx` - Video library index
  - `/app/videos/[slug]/page.tsx` - Dynamic video template
  - `/content/videos/` - Video data files
  - Added VideoObject JSON-LD to `/lib/seo.ts`
- [x] Built 8 video landing pages targeting ~10,600/mo combined:
  1. /videos/get-started-government-contracting
  2. /videos/find-government-contracts
  3. /videos/market-research-govcon
  4. /videos/proposal-writing-guide
  5. /videos/capability-statement-guide
  6. /videos/pricing-government-contracts
  7. /videos/win-without-past-performance
  8. /videos/gsa-schedule-guide
- [x] Improved guide page design (Mark Manson-inspired typography)
- [x] Added mid-article email capture component
- [x] Created RFP response guide (`/guides/rfp-response`)
- [x] Added video pages to sitemap (70 total URLs)
- [x] Updated GSC bulk index list with 9 video URLs
- [x] Organized docs into `docs/` folder structure
- [x] GSC indexing: 79 URLs submitted (Priority 1-3, 5 done), quota hit
- [ ] GSC indexing: Priority 4, 6, 7 remaining (24 URLs) - tomorrow

### Week 3.5 (Mar 25): Beginners Guide Enhancement ✅ COMPLETED
- [x] Enhanced beginners guide with video embeds linking to /videos pages:
  - Added: Get Started, Find Contracts, Market Research, Capability Statement videos
  - Added "Recommended Videos" section with 6 key video links
  - Updated checklist download CTA to link to /resources/handouts
  - Guide already 3,000+ words with 10 sections, 8 FAQs
- [x] Video page indexing check:
  - 17 video URLs in sitemap (1 index + 16 videos)
  - Not yet indexed by Google (submitted Mar 22)
  - Need to resubmit via GSC

### Week 4 (Apr 4-13): Tier 4 Content Start
- [x] Enhance beginners guide for "government contracts" (18,100/mo, difficulty 65) ✅ Mar 25
  - ~~Add downloadable checklist~~ Linked to /resources/handouts
  - ~~Add video embeds from YouTube channel~~ Added 4 video embeds + 6-video list
  - ~~Increase depth to 3,000+ words~~ Already 3,000+ words
  - ~~Add more internal links to new certification guides~~ Already linked
- [ ] Create "Federal Contractor" resource hub concept (difficulty 55)
  - Could be enhanced /guides index or new pillar page
- [x] Build remaining video landing pages ✅ All 16 built (Mar 22)

### Month 1 KPIs
| Metric | Target |
|--------|--------|
| Pages indexed in GSC | 25+ (all new pages) |
| Impressions (all new pages) | 500+ |
| Clicks (all new pages) | 20+ |
| CAGE code guide impressions | 100+ |
| Sitemap health check | 100% pass |

---

## Month 2: Optimize + Authority Build (Apr 14 – May 13)

### Week 5 (Apr 14-20): Performance Review
- [ ] Full GSC performance review for all new content
- [ ] Identify which pages are ranking (position 1-100) and for which queries
- [ ] Identify pages NOT yet indexed — troubleshoot and resubmit
- [ ] Run health check script — verify all URLs still 200

### Week 6 (Apr 21-27): Content Refresh + Expansion
- [ ] Update CAGE code guide based on real search queries from GSC (add sections for queries people are actually searching)
- [ ] Add 10-15 more terms to glossary based on GSC query data
- [ ] Optimize SAM.gov guide for "sam.gov registration step by step" long-tail
- [ ] Add FAQ schema to /government-contract-help and /proposal-writing-services if not showing rich results

### Week 7 (Apr 28 – May 4): Link Building + Social
- [ ] Guest post or interview opportunity targeting one backlink to /guides/cage-code
- [ ] Share certification guides on veteran business forums/groups (VOSB, SDVOSB)
- [ ] Share HUBZone guide in relevant economic development communities
- [ ] Create a YouTube video covering CAGE codes (link back to guide)

### Week 8 (May 5-13): Tier 4 Continued
- [ ] Finalize "Federal Contractor" resource page
- [ ] Begin optimizing homepage for "government contractor" (18,100/mo, difficulty 70) — long-term play
- [ ] Review and update all existing guide cross-links based on traffic data
- [ ] Add "related guides" section to glossary terms with highest traffic

### Month 2 KPIs
| Metric | Target |
|--------|--------|
| Total organic clicks (new pages) | 100+ |
| CAGE code guide position | Top 30 for "cage code" |
| Pages ranking in top 50 | 5+ new pages |
| Glossary unique queries | 50+ different queries |
| Rich results showing | FAQ snippets on 3+ guides |

---

## Month 3: Scale + Convert (May 14 – Jun 13)

### Week 9 (May 14-20): Conversion Optimization
- [ ] Analyze which pages drive the most /free-course signups
- [ ] A/B test CTA copy on top 3 traffic pages
- [ ] Add email capture form to glossary page (lead magnet: "GovCon Starter Checklist")
- [ ] Add exit-intent popup on high-traffic guides pointing to free course

### Week 10 (May 21-27): Content Depth
- [ ] Expand top-performing guides to 3,000+ words with additional sections
- [ ] Add comparison tables to certification guides (8(a) vs SDVOSB vs HUBZone vs WOSB)
- [ ] Create printable PDF versions of top 3 guides (lead magnet potential)
- [ ] Update AI govcon guide with latest developments

### Week 11 (May 28 – Jun 3): Technical SEO
- [ ] Run Lighthouse audit on all guide pages — fix any performance issues
- [ ] Ensure Core Web Vitals pass on all new pages
- [ ] Add breadcrumb schema to guide pages
- [ ] Verify mobile rendering is optimal on all pages
- [ ] Check for any cannibalization between sba-certifications overview and individual cert pages

### Week 12 (Jun 4-13): Q2 Review + Q3 Planning
- [ ] Full 3-month SEO performance report
- [ ] Identify top 5 performing pages and double down
- [ ] Identify underperforming pages — refresh or consolidate
- [ ] Plan Q3 content based on actual search data (not just keyword research)
- [ ] Evaluate whether to create state-level contracting guides (new vertical)

### Month 3 KPIs
| Metric | Target |
|--------|--------|
| Total monthly organic clicks (new pages) | 500+ |
| CAGE code guide position | Top 10 for "cage code" |
| Certification guides position | Top 30 for target keywords |
| Free course signups from organic | 20+/month |
| Glossary pages indexed | All terms ranking for "what is [term]" |
| Domain authority improvement | +2-3 points |

---

## Ongoing Monitoring (Automated)

### Health Check Script: `scripts/seo-health-check.sh`
Run weekly or after every deploy. Checks:
- All URLs return 200
- Sitemap is valid and complete
- JSON-LD is present on key pages
- No broken internal links

### Google Search Console
- Check weekly for crawl errors
- Monitor indexing status
- Track keyword positions for target terms

### Monthly Review Cadence
- **1st of each month:** Run full health check
- **1st of each month:** Export GSC data for all new pages
- **1st of each month:** Update this plan with actuals vs targets

---

## Priority Keyword Tracker

| Keyword | Volume | CPC | Difficulty | Target Page | Target Position |
|---------|--------|-----|-----------|-------------|----------------|
| cage code | 9,900 | $6.59 | 8 | /guides/cage-code | Top 10 by Month 2 |
| government contract help | 20 | $31.70 | 7 | /government-contract-help | Top 5 by Month 1 |
| federal proposal writing services | 10 | $14.15 | 7 | /proposal-writing-services | Top 5 by Month 1 |
| vosb certification | 1,300 | $5.41 | 20 | /guides/vosb-certification | Top 20 by Month 3 |
| hubzone certification | 1,000 | $5.69 | 23 | /guides/hubzone-certification | Top 20 by Month 3 |
| sam.gov registration | 5,400 | $5.72 | 47 | /guides/sam-gov-registration | Top 30 by Month 3 |
| 8a certification | 1,900 | $6.09 | 52 | /guides/8a-certification | Top 50 by Month 3 |
| wosb certification | 1,900 | $6.09 | 52 | /guides/wosb-certification | Top 50 by Month 3 |
| gsa schedule | varies | varies | ~40 | /guides/gsa-schedule | Top 30 by Month 3 |
| government contracts | 18,100 | $4.10 | 65 | /guides/beginners | Top 50 by Month 3 |
| rfp response | 880 | $8.50 | 25 | /guides/rfp-response | Top 30 by Month 2 |
| how to write government proposal | 1,500 | $6.20 | 35 | /videos/proposal-writing-guide | Top 30 by Month 2 |
| capability statement template | 2,000 | $5.80 | 30 | /videos/capability-statement-guide | Top 30 by Month 2 |
| government contract pricing | 800 | $7.10 | 28 | /videos/pricing-government-contracts | Top 30 by Month 2 |
| how to get gsa schedule | 1,200 | $6.50 | 32 | /videos/gsa-schedule-guide | Top 30 by Month 2 |
