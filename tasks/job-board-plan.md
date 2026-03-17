# GovCon Jobs Board — Strategic Plan

**Created:** March 17, 2026
**Owner:** Eric Coffie
**Status:** Planning

---

## Executive Summary

Build a specialized job board for government contracting roles that:
1. Drives massive organic traffic via high-volume job searches
2. Creates natural conversion paths to GovCon Giants training products
3. Positions GCG as the career hub for govcon professionals

**Market Gap:** ClearanceJobs (8,110 listings) dominates cleared roles but ignores business development. Indeed/ZipRecruiter offer no govcon context. No platform combines **job board + training + community**.

---

## Market Opportunity

### Search Demand
| Query | Est. Monthly Volume | Competition |
|-------|---------------------|-------------|
| government contractor jobs | 15,000-25,000 | High |
| federal contracting jobs | 5,000-10,000 | Medium |
| capture manager jobs | 500-1,000 | Low |
| proposal manager jobs | 1,000-2,000 | Low |
| govcon jobs | 1,000-2,000 | Low |
| defense contractor jobs | 5,000-10,000 | High |
| cleared jobs | 10,000-20,000 | High (ClearanceJobs) |

### Current Listings (March 2026)
- Indeed: 642 federal government contractor jobs
- Glassdoor: 3,616 in DC alone
- ClearanceJobs: 8,110 cleared roles
- ZipRecruiter: 764 in DC alone

### Salary Ranges (High-Value Roles)
- Capture Manager: $100,000 - $180,000
- Proposal Manager: $80,000 - $150,000
- BD Manager (GovCon): $90,000 - $160,000
- Contract Specialist: $60,000 - $100,000

---

## Competitive Landscape

| Platform | Focus | Listings | Training? | Weakness |
|----------|-------|----------|-----------|----------|
| Indeed | General | 642 | No | No govcon context |
| ClearanceJobs | Cleared roles | 8,110 | No | Ignores BD/Capture |
| ZipRecruiter | General | 764 | No | Noise, not specialized |
| Glassdoor | General + reviews | 3,616 | No | No training pathway |
| USAJobs | Federal gov | 20,000+ | No | Gov jobs, not contractor |
| **GovCon Giants** | **BD/Capture/Training** | **TBD** | **Yes** | **None (greenfield)** |

### GCG Competitive Advantages
1. **Existing audience** — 5,000+ trained members
2. **Training integration** — "Get the job + learn to excel"
3. **Subject matter expertise** — You understand BD/Capture roles
4. **CRM infrastructure** — GoHighLevel already captures leads
5. **Content authority** — Guides, bootcamps, certifications incoming

---

## Positioning Options

### Option A: Full GovCon Job Board (Recommended)
**Scope:** All government contracting roles
**Target:** Job seekers + employers (contractors)
**Revenue:** Job postings + premium memberships
**Tagline:** "Find GovCon Jobs. Get Trained. Win Contracts."

### Option B: BD/Capture Talent Hub
**Scope:** Capture managers, proposal managers, BD leaders only
**Target:** Senior BD professionals + mid-market contractors
**Revenue:** Premium job postings + executive recruiting
**Tagline:** "Where Business Development Leaders Find GovCon Opportunities"

### Option C: Training-First Career Navigator
**Scope:** Jobs as lead gen for training products
**Target:** Career changers entering govcon
**Revenue:** Training upsells, not job postings
**Tagline:** "Your Path to a GovCon Career Starts Here"

**Recommendation:** Start with Option A, narrow to Option B if volume proves low.

---

## Revenue Model

### Phase 1: Free (Traffic Building)
- All job listings free
- Goal: Build traffic, establish authority
- Duration: 3-6 months

### Phase 2: Hybrid Monetization
| Revenue Stream | Price | Target |
|----------------|-------|--------|
| Featured Job Listing | $99-299/30 days | Employers |
| Employer Subscription | $499/mo (5 jobs) | Recruiters |
| Premium Job Seeker | $14.99/mo | Job seekers |
| Resume Review | $49-99 one-time | Job seekers |
| Training Upsell | $97-997 | Job seekers |

### Conservative Revenue Projection (Year 1)
| Stream | Monthly | Annual |
|--------|---------|--------|
| Featured Listings (200/mo × $150) | $30,000 | $360,000 |
| Employer Subscriptions (30 × $499) | $15,000 | $180,000 |
| Premium Members (2,000 × $15) | $30,000 | $360,000 |
| Training Upsells (100 × $200 avg) | $20,000 | $240,000 |
| **Total** | **$95,000** | **$1,140,000** |

### Aggressive Projection (Year 2)
- $2-4M ARR with scaled operations

---

## Technical Architecture

### Data Sources (Priority Order)

1. **USAJobs API** (Free, Official)
   - 20,000+ federal jobs
   - Real-time updates
   - No restrictions
   - API: https://developer.usajobs.gov/

2. **Prime Contractor Career Pages** (Scraping)
   - Top 50 primes: Lockheed, Boeing, Northrop, SAIC, Leidos, etc.
   - Robots.txt compliant
   - 50,000+ jobs estimated

3. **TheirStack API** (Paid)
   - 315,000+ sources
   - Covers 16,000 ATS platforms
   - $0.0015-$0.039 per job

4. **LinkedIn** (Partnership/API)
   - Requires official partnership or third-party API
   - High volume but restricted

### Tech Stack
```
Frontend: Next.js (existing govcon-funnels)
Subdomain: jobs.govcongiants.org
Database: PostgreSQL (Supabase)
Search: Algolia or built-in full-text
Job Schema: JobPosting JSON-LD
ETL: Node.js cron jobs or Vercel Cron
Payments: Stripe (existing)
CRM: GoHighLevel (existing)
```

### MVP Features
- [ ] Job listings with search/filter
- [ ] Location, salary, role type filters
- [ ] Job detail pages with apply links
- [ ] Email alerts for saved searches
- [ ] Employer job posting form
- [ ] JobPosting schema for SEO
- [ ] Integration with training products

---

## Implementation Phases

### Phase 1: MVP (Weeks 1-3)
**Goal:** Launch with USAJobs data + basic search

- [ ] Create jobs.govcongiants.org subdomain
- [ ] Implement USAJobs API integration
- [ ] Build job listing page with filters
- [ ] Build job detail page
- [ ] Add JobPosting JSON-LD schema
- [ ] Add email signup for job alerts
- [ ] Link to relevant training from job pages
- [ ] Deploy and submit sitemap

**Success Criteria:**
- 1,000+ jobs displayed
- 100+ organic visitors/day within 30 days
- 50+ email signups

### Phase 2: Expansion (Weeks 4-6)
**Goal:** Add prime contractor jobs + employer posting

- [ ] Scrape top 20 prime contractor career pages
- [ ] Build employer job posting form
- [ ] Add Stripe payment for featured listings
- [ ] Build employer dashboard
- [ ] Add salary range filter
- [ ] Add clearance level filter

**Success Criteria:**
- 5,000+ jobs displayed
- 500+ organic visitors/day
- 10+ employer job postings

### Phase 3: Monetization (Weeks 7-12)
**Goal:** Revenue generation + premium features

- [ ] Launch premium job seeker membership
- [ ] Add resume upload + profile
- [ ] Build job matching algorithm
- [ ] Add hiring trends analytics
- [ ] Launch employer subscription plans
- [ ] Integrate with BD Upskilling certification

**Success Criteria:**
- $10,000+/month revenue
- 1,000+ premium members
- 50+ paying employers

---

## Training Integration Points

### 30-Day Mastery Certification (Primary Upsell)

**The Core Offer:**
- **Name**: GovCon Giants 30-Day Mastery Certification
- **URL**: govcongiants.org/upskilling
- **Price**: $997 (VIP $1,497 with 1:1 coaching)
- **Duration**: 4 weeks, 45-90 min/day
- **Output**: Certified BD Strategist badge + portfolio + directory listing

**Curriculum → Job Requirements Match:**
| Week | Skills Taught | Jobs This Qualifies For |
|------|---------------|-------------------------|
| Week 1 | Opportunity ID & Qualification | Proposal Coordinator, Entry BD |
| Week 2 | Market Intel & Agency Analysis | Pricing Analyst, Market Research |
| Week 3 | Teaming & Outreach Strategy | BD Manager, Capture Support |
| Week 4 | Proposal Dev & Capture Planning | Capture Manager, Proposal Manager |

**Real Job Posting Requirements (Matched):**
- "Identify and qualify new business opportunities" → Week 1
- "Conduct detailed market research, analyze agency spending" → Week 2
- "Develop teaming strategies, identify potential partners" → Week 3
- "Write compliant proposals, develop capture plans" → Week 4

### Job Board → Certification Conversion Funnel

```
Job Seeker lands on job listing
        ↓
Sees job requirements (skills needed)
        ↓
CTA: "Get Certified for This Role"
        ↓
Shows which certification weeks match requirements
        ↓
Certification sales page ($997) → /upskilling
        ↓
Student completes → Gets certified
        ↓
Listed in /certified directory
        ↓
Employers browse directory → Student gets hired
        ↓
Success story → More job seekers find board
```

### Certified Directory (New Feature)
- **URL**: govcongiants.org/certified
- **Purpose**: Employers browse verified graduates
- **Profiles include**: Name, location, clearance, portfolio, LinkedIn
- **Revenue**: Employer access fee ($299/mo)

### Job Type → Training Product Mapping
| Job Role | Salary | Primary Upsell | Why |
|----------|--------|----------------|-----|
| Proposal Coordinator | $95K-$150K | 30-Day Certification | Week 4 focus |
| Pricing Analyst | $120K-$180K | 30-Day Certification | Week 2 focus |
| Contracts Admin | $110K-$170K | Free Course → Cert | Entry point |
| Capture Manager | $150K-$220K | 30-Day Certification | Full program |
| BD Manager | $150K-$250K | 30-Day Certification | Full program |
| Proposal Manager | $160K-$240K | 30-Day Certification | Week 4 + tools |
| Capture Director | $180K-$300K | VIP Certification | With coaching |
| VP of BD | $200K-$350K | Consulting | Executive tier |
| BD Consultant | $200K-$500K | VIP + Consulting | Expert track |

### UX Integration
1. **Job detail page:** "Get Certified for This Role" CTA with skill matching
2. **Search results:** "Graduates are landing $80K-$150K+ roles" banner
3. **Email alerts:** Include certification CTA in job alert emails
4. **Certified badge:** Show on profiles of graduates applying through board

---

## Test & Evaluation Criteria

### Pre-Launch Checklist
- [ ] 1,000+ jobs in database
- [ ] Search returns results in <500ms
- [ ] Job detail pages load in <2s
- [ ] JobPosting schema validates (Google Rich Results Test)
- [ ] Sitemap includes all job pages
- [ ] Mobile responsive
- [ ] Email signup works
- [ ] Apply link tracking works

### Week 1 Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Jobs indexed by Google | 100+ | GSC Coverage |
| Organic visitors | 50+/day | Analytics |
| Email signups | 25+ | GoHighLevel |
| Bounce rate | <60% | Analytics |
| Avg session duration | >1 min | Analytics |

### Month 1 Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Jobs indexed | 1,000+ | GSC |
| Organic visitors | 500+/day | Analytics |
| Email signups | 500+ | GoHighLevel |
| Training conversions | 10+ | Stripe |
| Employer inquiries | 5+ | CRM |

### Month 3 Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Organic visitors | 2,000+/day | Analytics |
| Revenue | $5,000+/mo | Stripe |
| Premium members | 200+ | Database |
| Employer customers | 20+ | CRM |
| Training conversions | 50+/mo | Stripe |

### Kill Criteria (When to Pivot)
- <100 organic visitors/day after 60 days
- <1% conversion to email signup
- Zero employer interest after 90 days
- Negative ROI on development time

---

## Alternatives Considered

### Alternative 1: Partner with Existing Job Board
**Approach:** White-label or affiliate with ClearanceJobs/Indeed
**Pros:** No development, instant inventory
**Cons:** No control, low margins, no training integration
**Verdict:** Rejected — doesn't serve strategic goals

### Alternative 2: Job Aggregator Widget Only
**Approach:** Embed Indeed/ZipRecruiter widget on site
**Pros:** Zero development, instant jobs
**Cons:** No SEO value, no data ownership, no monetization
**Verdict:** Rejected — commoditized, no differentiation

### Alternative 3: Curated Job Newsletter
**Approach:** Weekly email with hand-picked govcon jobs
**Pros:** Low effort, builds audience, tests demand
**Cons:** Not scalable, no SEO traffic
**Verdict:** Could be Phase 0 test before full build

### Alternative 4: LinkedIn Group + Job Posts
**Approach:** Build LinkedIn community, post jobs there
**Pros:** Free, leverages existing platform
**Cons:** Don't own audience, algorithm dependent
**Verdict:** Complement, not replacement

### Alternative 5: Full Recruiting Agency
**Approach:** Become a govcon recruiting firm
**Pros:** High revenue per placement ($10-30k)
**Cons:** High effort, different business model
**Verdict:** Future consideration, not MVP

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Low traffic | Medium | High | SEO-first approach, JobPosting schema |
| No employer demand | Low | High | Free listings first, prove value |
| Data source issues | Medium | Medium | Multiple sources, USAJobs is stable |
| Competition response | Low | Low | First-mover in training + jobs niche |
| Technical complexity | Low | Medium | Use existing Next.js stack |

---

## Validated Job Categories (From Eric's Content)

Based on "9 Boring GovCon Jobs" video (148K impressions, 9.7K views):

| Role | Salary | Entry Point | Training Upsell |
|------|--------|-------------|-----------------|
| Proposal Coordinator | $95K-$150K | Entry | BD Upskilling |
| Pricing Analyst | $120K-$180K | Mid | Market Assassin |
| Contracts Administrator | $110K-$170K | Entry | Free Course |
| Capture Manager | $150K-$220K | Mid | Capture Masterclass |
| BD Manager | $150K-$250K | Mid | BD Upskilling |
| Proposal Manager | $160K-$240K | Mid | Proposal Bootcamp |
| Capture Director | $180K-$300K | Senior | Consulting |
| VP of BD | $200K-$350K | Executive | Consulting |
| BD Consultant | $200K-$500K | Expert | Consulting |

### Content Performance (Proof of Demand)
- Instagram post: 517 likes (Feb 22)
- YouTube video: 148.4K impressions, 9.7K views, 4.8% CTR
- Traffic sources: Instagram (20.9%), Google Search (12.2%), WhatsApp (12.2%)
- Comments: People asking for specific role breakdowns

---

## Next Steps

### Immediate (This Week)
1. [x] Review job post examples Eric shared ✅
2. [x] Validate job role categories ✅ (9 roles confirmed)
3. [ ] Confirm subdomain: jobs.govcongiants.org
4. [ ] Set up USAJobs API key

### Week 1
1. [ ] Build MVP job board structure
2. [ ] Implement USAJobs API integration
3. [ ] Deploy to staging for review

### Week 2-3
1. [ ] Refine based on feedback
2. [ ] Add prime contractor jobs
3. [ ] Launch publicly
4. [ ] Submit to GSC

---

## References

- [USAJobs API Documentation](https://developer.usajobs.gov/)
- [ClearanceJobs Market Data](https://www.clearancejobs.com/)
- [Indeed Federal Contractor Jobs](https://www.indeed.com/q-federal-government-contractor-jobs.html)
- [Job Board Monetization Guide](https://jboard.io/job-board-monetization)
- [JobPosting Schema](https://schema.org/JobPosting)

---

*This plan will be updated as we gather feedback and test assumptions.*
