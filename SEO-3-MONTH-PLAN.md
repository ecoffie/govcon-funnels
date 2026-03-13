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
- [ ] Push all new content to git and deploy to Vercel
- [ ] Verify all 18 new URLs return 200 (run `scripts/seo-health-check.sh`)
- [ ] Verify sitemap.xml includes all 30+ URLs
- [ ] Submit updated sitemap to Google Search Console
- [ ] Submit updated sitemap to Bing Webmaster Tools
- [ ] Request indexing for top 5 priority pages in GSC:
  1. /guides/cage-code (9,900/mo, difficulty 8)
  2. /government-contract-help ($31.70 CPC)
  3. /proposal-writing-services ($14.15 CPC)
  4. /glossary (captures dozens of long-tail queries)
  5. /guides/gsa-schedule (110K broad volume)

### Week 2 (Mar 21-27): Index Verification
- [ ] Check GSC for indexing status of all new pages
- [ ] Fix any crawl errors or indexing issues
- [ ] Verify JSON-LD validates (test with Google Rich Results Test)
  - Article + FAQPage on each guide
  - Service on /government-contract-help and /proposal-writing-services
  - DefinedTermSet on /glossary
- [ ] Set up Google Search Console performance tracking for target keywords

### Week 3 (Mar 28 – Apr 3): Content Optimization Round 1
- [ ] Review GSC data — which pages are getting impressions but low CTR?
- [ ] Optimize meta titles/descriptions for pages with impressions but <3% CTR
- [ ] Add internal links from homepage to top 3 new guides
- [ ] Share CAGE code guide on social channels (highest volume keyword)
- [ ] Share glossary as a resource on LinkedIn

### Week 4 (Apr 4-13): Tier 4 Content Start
- [ ] Enhance beginners guide for "government contracts" (18,100/mo, difficulty 65)
  - Add downloadable checklist
  - Add video embeds from YouTube channel
  - Increase depth to 3,000+ words
  - Add more internal links to new certification guides
- [ ] Create "Federal Contractor" resource hub concept (difficulty 55)
  - Could be enhanced /guides index or new pillar page

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
