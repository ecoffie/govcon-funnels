# SEO Master Plan: HigherGov-Style Data Pages + MI Free Funnel

**Created:** May 9, 2026
**Status:** Active
**Goal:** Build organic traffic flywheel through indexable data pages that funnel to MI Free

---

## Strategic Overview

### The HigherGov Playbook (What They Do)

HigherGov dominates government contracting SEO with **data-driven indexable pages**:

| Page Type | URL Pattern | Example | SEO Value |
|-----------|-------------|---------|-----------|
| **Contractor Profiles** | `/awardee/[company-slug]/` | [Booz Allen Hamilton](https://www.highergov.com/awardee/booz-allen-hamilton-inc-10107948/) | "Booz Allen federal contracts" |
| **Agency Pages** | `/agency/[agency-name]/` | [NSA](https://www.highergov.com/agency/national-security-agency-nsa-346/) | "NSA contract awards" |
| **Contract Records** | `/contract/[contract-id]/` | [DOD Contract](https://www.highergov.com/contract/47QTCK18D0004-47QFCA20F0032/) | "contract 47QTCK18D0004" |
| **Opportunity Pages** | `/contract-opportunity/` | Search results | "federal contract opportunities" |
| **Reports** | `/reports/[topic]/` | [SB Trends 2022](https://www.highergov.com/reports/small-business-trends-2022/) | "$159B small business awards" |

**Their flywheel:**
1. Someone searches "Leidos federal contracts"
2. HigherGov profile ranks (free page)
3. User wants more detail → creates account
4. Account → upsell to paid tier

### Our Advantage

We have data they don't:
- **Agency Pain Points** — 50+ agencies with priorities, GAO findings, budget data
- **SBLO Contacts** — 800+ with emails (HigherGov has none public)
- **Forecasts** — 7,700+ upcoming procurements from 13 sources
- **Recompetes** — Expiring contracts with incumbent data
- **AI Analysis** — Pain point matching, teaming recommendations

---

## Domain Strategy

### Migration: .org → .com

| Domain | Purpose | Status |
|--------|---------|--------|
| `govcongiants.com` | Marketing + SEO pages | PRIMARY (new) |
| `mi.govcongiants.com` | SaaS app (Market Assassin) | LIVE |
| `tools.govcongiants.org` | Legacy redirect → mi.govcongiants.com | 301 REDIRECT |
| `govcongiants.org` | Legacy redirect → govcongiants.com | 301 REDIRECT |

### URL Architecture (New)

```
govcongiants.com/
├── /                           # Homepage (updated positioning)
├── /guides/[slug]              # 141 educational guides (existing)
├── /videos/[slug]              # 8 video pages (existing)
├── /tools/                     # Free tools hub
│   ├── /cage-code-lookup       # CAGE lookup (existing)
│   ├── /expiring-contracts     # Recompete finder (existing)
│   └── /opportunity-hunter     # NEW: Moved from MA (ungated)
├── /data/                      # NEW: HigherGov-style data pages
│   ├── /contractors/[slug]     # Contractor profiles
│   ├── /agencies/[code]        # Agency profiles
│   ├── /contracts/[id]         # Contract records
│   └── /forecasts/[slug]       # Forecast pages
├── /compare/                   # Competitive positioning
│   └── /deltek                 # "GovWin Alternative" page
├── /mi-free                    # MI Free signup landing
└── /pricing                    # Pricing tiers
```

---

## Phase 1: Data Page Infrastructure (Week 1-2)

### 1.1 Contractor Profile Pages

**Route:** `/data/contractors/[slug]`

**Data Sources:**
- Federal Contractor Database (3,500+ contractors)
- SAM.gov Entity API (registration data)
- USASpending (contract awards)
- SBLO Directory (contacts)

**Page Content:**
```
/data/contractors/booz-allen-hamilton

┌─────────────────────────────────────────────────────────────┐
│ Booz Allen Hamilton Inc.                                    │
│ UEI: JCBMLGPE6Z71 | CAGE: 17038 | McLean, VA               │
├─────────────────────────────────────────────────────────────┤
│ Federal Contract Awards                                      │
│ ├── Total: $4.2B (FY2025)                                   │
│ ├── Top Agencies: DOD (68%), DHS (15%), VA (8%)             │
│ └── NAICS: 541512, 541330, 541611                           │
├─────────────────────────────────────────────────────────────┤
│ Set-Aside Awards                                             │
│ ├── Small Business Subcontracting: $890M                    │
│ ├── WOSB: $120M | SDVOSB: $95M | HUBZone: $45M             │
│ └── Subcontracting Plan: Active ✓                           │
├─────────────────────────────────────────────────────────────┤
│ Teaming Opportunities                    [Contact SBLO →]   │
│ SBLO: Jane Smith | jane.smith@bah.com | (703) 555-1234     │
│ Vendor Portal: suppliers.boozallen.com                      │
├─────────────────────────────────────────────────────────────┤
│ Recent Contract Awards (sample)                              │
│ ├── F-35 Cloud Support - $13.3M (Navy)                      │
│ ├── CDAO AI/ML Services - $841M (DISA)                      │
│ └── [See all 2,847 contracts →]                             │
├─────────────────────────────────────────────────────────────┤
│ ⚡ Get Daily Intelligence on Booz Allen                      │
│ Track awards, teaming opps, and recompetes                  │
│ [Start Free with MI Free →]                                 │
└─────────────────────────────────────────────────────────────┘
```

**SEO Elements:**
- Title: `Booz Allen Hamilton Federal Contracts | $4.2B in Awards | GovCon Giants`
- Description: `View Booz Allen Hamilton's federal contract awards, SBLO contact, subcontracting goals, and teaming opportunities. Free contractor intelligence.`
- Schema: Organization + AggregateOffer
- Internal links: Related contractors, agency pages

**Ungated vs. Gated:**
| Element | Free (Indexed) | MI Free (Email) | MI Pro ($149/mo) |
|---------|----------------|-----------------|------------------|
| Company overview | ✓ | ✓ | ✓ |
| Top 5 contracts | ✓ | ✓ | ✓ |
| SBLO name only | ✓ | ✓ | ✓ |
| SBLO email/phone | ✗ | ✓ | ✓ |
| Full contract list | ✗ | ✗ | ✓ |
| Teaming score | ✗ | ✗ | ✓ |
| Daily alerts | ✗ | ✓ | ✓ |

### 1.2 Agency Profile Pages

**Route:** `/data/agencies/[code]`

**Data Sources:**
- Agency Pain Points database (50+ agencies)
- USASpending (spending stats)
- SAM.gov (opportunities)
- Forecasts (upcoming procurements)

**Page Content:**
```
/data/agencies/dod

┌─────────────────────────────────────────────────────────────┐
│ Department of Defense (DOD)                                  │
│ CGAC: 097 | Abbreviation: DOD                               │
├─────────────────────────────────────────────────────────────┤
│ FY2026 Spending                                              │
│ ├── Total Contracts: $470B                                  │
│ ├── Small Business: $99.7B (21.2%)                          │
│ └── Top NAICS: 541512, 336411, 541330                       │
├─────────────────────────────────────────────────────────────┤
│ Agency Pain Points (What They Need)                          │
│ ├── Cybersecurity modernization + zero-trust                │
│ ├── Cloud migration and DevSecOps                           │
│ ├── AI/ML integration for decision support                  │
│ ├── JADC2 connectivity solutions                            │
│ └── [View all 36 pain points →]                             │
├─────────────────────────────────────────────────────────────┤
│ Budget Priorities (FY2026)                                   │
│ ├── $6.2B — Hypersonic weapons development                  │
│ ├── $9.1B — Pacific Deterrence Initiative                   │
│ ├── $3.7B — JADC2 networking                                │
│ └── [View full budget breakdown →]                          │
├─────────────────────────────────────────────────────────────┤
│ Active Opportunities (23 open)                               │
│ ├── Cybersecurity SOC Support - DHS/CISA                    │
│ ├── Cloud Migration Services - Army                         │
│ └── [View all opportunities →]                              │
├─────────────────────────────────────────────────────────────┤
│ Upcoming Forecasts (47 planned)                              │
│ ├── AI/ML Platform - Q3 2026 - $50M est.                    │
│ ├── Zero Trust Implementation - Q4 2026 - $120M est.        │
│ └── [View all forecasts →]                                  │
├─────────────────────────────────────────────────────────────┤
│ ⚡ Get Daily DOD Intelligence                                │
│ New opportunities, forecasts, and contract awards           │
│ [Start Free with MI Free →]                                 │
└─────────────────────────────────────────────────────────────┘
```

**SEO Elements:**
- Title: `DOD Federal Contracts & Opportunities | $470B Spending | GovCon Giants`
- Description: `Department of Defense contract opportunities, spending analysis, pain points, and upcoming forecasts. Free agency intelligence for contractors.`
- Schema: GovernmentOrganization + ItemList

**Priority Agencies (High Search Volume):**
1. Department of Defense (DOD)
2. Department of Veterans Affairs (VA)
3. Department of Homeland Security (DHS)
4. Health and Human Services (HHS)
5. General Services Administration (GSA)
6. Department of Energy (DOE)
7. NASA
8. Department of State
9. Department of Justice (DOJ)
10. Social Security Administration (SSA)

### 1.3 Forecast Pages

**Route:** `/data/forecasts/[slug]`

**Data Sources:**
- Forecast Intelligence (7,700+ records)
- Agency hierarchy
- NAICS mapping

**Page Content:**
```
/data/forecasts/dod-ai-ml-platform-2026

┌─────────────────────────────────────────────────────────────┐
│ DOD AI/ML Analytics Platform                                 │
│ Forecast ID: FC-2026-DOD-0847                               │
├─────────────────────────────────────────────────────────────┤
│ Overview                                                     │
│ ├── Agency: Department of Defense                           │
│ ├── Office: Defense Information Systems Agency (DISA)       │
│ ├── Estimated Value: $50M - $100M                           │
│ ├── Expected RFP: Q3 FY2026 (Apr-Jun 2026)                  │
│ └── NAICS: 541512 — Computer Systems Design                 │
├─────────────────────────────────────────────────────────────┤
│ Requirements Summary                                         │
│ Cloud-based AI/ML platform for predictive analytics...      │
│ [Read full description →]                                   │
├─────────────────────────────────────────────────────────────┤
│ Set-Aside Status                                             │
│ └── TBD (Small Business eligible based on NAICS)            │
├─────────────────────────────────────────────────────────────┤
│ Related Pain Points                                          │
│ ├── "AI/ML integration for decision support"                │
│ └── "Cloud migration and DevSecOps adoption"                │
├─────────────────────────────────────────────────────────────┤
│ Similar Past Awards                                          │
│ ├── CDAO JWNMI - Booz Allen - $841M                         │
│ └── [View incumbents →]                                     │
├─────────────────────────────────────────────────────────────┤
│ ⚡ Get Notified When RFP Drops                               │
│ Track this forecast + 50 others matching your NAICS         │
│ [Start Free with MI Free →]                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 2: MI Free Funnel (Week 2-3)

### 2.1 Landing Page: `/mi-free`

**Route:** `govcongiants.com/mi-free`

**Purpose:** Convert organic traffic from data pages to MI Free signups

**Page Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│                     MI FREE                                  │
│        Government Contracting Intelligence                   │
│              No Credit Card Required                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✓ Daily opportunity alerts (5 reports/month)               │
│  ✓ Agency pain points database                              │
│  ✓ Expiring contract finder                                 │
│  ✓ SBLO contact previews                                    │
│  ✓ Forecast notifications                                   │
│                                                              │
│  [Email Address                    ] [Get Free Access →]    │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  "Finally, intelligence I can afford."                      │
│   — Small Business Owner, 8(a) Certified                    │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  MI FREE vs. MI CORE vs. MI TEAM                            │
│  ┌──────────────────┬─────────┬──────────┬──────────┐       │
│  │ Feature          │ FREE    │ CORE     │ TEAM     │       │
│  ├──────────────────┼─────────┼──────────┼──────────┤       │
│  │ Daily Alerts     │ 5/mo    │ Unlimited│ Unlimited│       │
│  │ AI Analysis      │ ✗       │ ✓        │ ✓        │       │
│  │ SBLO Emails      │ Preview │ Full     │ Full     │       │
│  │ Pipeline CRM     │ ✗       │ ✓        │ ✓        │       │
│  │ Forecast Access  │ 10/mo   │ Unlimited│ Unlimited│       │
│  │ Seats            │ 1       │ 1        │ 5        │       │
│  │ Price            │ $0      │ $149/mo  │ $499/mo  │       │
│  └──────────────────┴─────────┴──────────┴──────────┘                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**SEO Elements:**
- Title: `MI Free — Government Contracting Intelligence | No Credit Card`
- Description: `Get daily federal contract alerts, agency pain points, and SBLO contacts free. Start winning government contracts with Market Intelligence.`
- No-index: NO (we want this indexed)

### 2.2 Data Page CTAs

Every data page includes MI Free CTA:

**Contractor Pages:**
> "Get daily alerts when Booz Allen posts new subcontracting opportunities"
> [Start Free with MI Free →]

**Agency Pages:**
> "Track DOD opportunities matching your NAICS codes"
> [Start Free with MI Free →]

**Forecast Pages:**
> "Get notified when this RFP drops"
> [Start Free with MI Free →]

### 2.3 Conversion Flow

```
Google Search: "Booz Allen federal contracts"
        ↓
/data/contractors/booz-allen-hamilton (indexed page)
        ↓
User sees: SBLO name, contract summary, teaming score
User wants: SBLO email, full contract list, daily alerts
        ↓
CTA: "Get SBLO contact details with MI Free"
        ↓
/mi-free (landing page)
        ↓
Email signup → Profile setup (NAICS, agencies)
        ↓
MI Free account created
        ↓
Daily alerts begin (5/month cap)
        ↓
Day 7: "Upgrade to MI Pro for unlimited access"
        ↓
$149/mo conversion
```

---

## Phase 3: Competitive Positioning (Week 3-4)

### 3.1 Deltek Comparison Page

**Route:** `govcongiants.com/compare/deltek`

**Target Keywords:**
- "Deltek GovWin alternative"
- "GovWin IQ pricing"
- "Deltek competitor"
- "government contracting software comparison"

**Page Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│         GovCon Giants vs. Deltek GovWin IQ                  │
│     "80% of the capability at 2% of the cost"               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┬──────────────┬──────────────┐           │
│  │ Feature        │ GovCon Giants│ Deltek GovWin│           │
│  ├────────────────┼──────────────┼──────────────┤           │
│  │ Opportunity    │ ✓            │ ✓            │           │
│  │ Search         │              │              │           │
│  ├────────────────┼──────────────┼──────────────┤           │
│  │ Agency Intel   │ ✓ + Pain Pts │ ✓            │           │
│  ├────────────────┼──────────────┼──────────────┤           │
│  │ Contractor DB  │ 3,500+       │ 50,000+      │           │
│  ├────────────────┼──────────────┼──────────────┤           │
│  │ SBLO Contacts  │ 800+ emails  │ ✗            │           │
│  ├────────────────┼──────────────┼──────────────┤           │
│  │ AI Analysis    │ ✓            │ Limited      │           │
│  ├────────────────┼──────────────┼──────────────┤           │
│  │ Pipeline CRM   │ ✓ (included) │ + $5K/yr     │           │
│  ├────────────────┼──────────────┼──────────────┤           │
│  │ Daily Briefings│ ✓ AI-powered │ ✗            │           │
│  ├────────────────┼──────────────┼──────────────┤           │
│  │ Forecasts      │ 7,700+       │ ✓            │           │
│  ├────────────────┼──────────────┼──────────────┤           │
│  │ Seats          │ Unlimited    │ Per-seat     │           │
│  ├────────────────┼──────────────┼──────────────┤           │
│  │ PRICE          │ $149/mo      │ $13K-$119K   │           │
│  └────────────────┴──────────────┴──────────────┘           │
│                                                              │
│  [Try MI Free →]        [See Pricing →]                     │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  "We switched from GovWin and cut our intel costs by 90%"   │
│   — BD Director, 8(a) IT Services Firm                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Additional Comparison Pages

| Route | Target | Priority | Status |
|-------|--------|----------|--------|
| `/compare/deltek` | GovWin IQ ($13K-$119K) | HIGH | ✅ LIVE |
| `/compare/govtribe` | GovTribe ($1,350-$4K/yr) | MEDIUM | ✅ LIVE |
| `/compare/federal-compass` | Federal Compass | MEDIUM | TODO |
| `/compare/sam-gov` | Free vs. our value-add | LOW | TODO |

---

## Phase 4: Homepage Positioning (Week 4)

### 4.1 New Homepage Message

**Current:** "$82 Billion in Unspent Federal Money"

**New:** Platform-focused positioning

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│       Compete Like a $50M Contractor.                       │
│              Starting at $149/month.                        │
│                                                              │
│   The intelligence Deltek charges $25K for.                 │
│   Built for small businesses.                               │
│                                                              │
│   [Start Free →]              [See Demo →]                  │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│   │ 7,700+  │  │ 3,500+  │  │ 800+    │  │ 50+     │       │
│   │Forecasts│  │Contract-│  │ SBLO    │  │ Agency  │       │
│   │         │  │ ors     │  │ Contacts│  │Pain Pts │       │
│   └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   TRUSTED BY 5,000+ CONTRACTORS                             │
│   [Logo] [Logo] [Logo] [Logo] [Logo]                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Navigation Updates

```
Before:
[Guides] [Videos] [Jobs] [Bootcamp] [Free Course] [Tools]

After:
[Intelligence ▾] [Learn ▾] [Compare ▾] [Pricing] [Start Free]
     ↓               ↓           ↓
  - Contractors   - Guides    - vs Deltek
  - Agencies      - Videos    - vs GovTribe
  - Forecasts     - Bootcamp
  - Opportunities - Jobs
```

---

## Implementation Checklist

### Week 1: Infrastructure

- [x] Create `/data/` route structure in govcon-funnels
- [x] Build contractor profile page template (`/data/contractors/[uei]`)
- [x] Build agency profile page template (`/data/agencies/[slug]`)
- [x] Create API endpoints to fetch data from Market Assassin
- [x] Implement ungated vs. gated content logic
- [x] Add MI Free CTA component

### Week 2: Content Population

- [x] Generate contractor profile pages (dynamic from SAM.gov)
- [x] Generate 35 agency profile pages (all with pain points)
- [x] Create forecast landing page (`/data/forecasts`)
- [x] Create `/mi-free` landing page
- [x] Update sitemap to include data pages

### Week 3: SEO Optimization

- [x] Add JSON-LD schema to all data pages
- [x] Create internal linking between data pages (9 guides updated)
- [x] Submit sitemap to Google Search Console
- [x] Create IndexNow notifications for new pages
- [ ] Build backlinks to data pages (see `/tasks/backlink-strategy.md`)

### Week 4: Conversion Optimization

- [x] Create `/compare/deltek` page
- [x] Create `/compare/govtribe` page
- [x] Create `/compare/federal-compass` page (May 9)
- [x] Update homepage positioning (Market Intelligence Platform section)
- [x] A/B test MI Free CTAs (May 9) — 4 variants testing button text
- [ ] Set up conversion tracking (GA4 + Stripe)
- [x] ~~Launch email sequence for MI Free → Pro~~ — NOT NEEDED: Daily alerts already contain upgrade CTAs
- [x] Update homepage positioning (May 9) — "Compete Like a $50M Contractor" messaging
- [x] Restructure navigation (May 9) — [Intelligence ▾] [Learn ▾] [Compare ▾] dropdowns

---

## Success Metrics

| Metric | Baseline | 30-Day Target | 90-Day Target |
|--------|----------|---------------|---------------|
| Indexed data pages | 0 | 200 | 500 |
| Organic traffic to data pages | 0 | 500/mo | 2,000/mo |
| MI Free signups | 0 | 100 | 500 |
| MI Free → Pro conversion | 0% | 5% | 10% |
| "Deltek alternative" ranking | N/A | Top 20 | Top 5 |

---

## Technical Notes

### Cross-Domain Data Fetching

Data pages on `govcongiants.com` will fetch from Market Assassin APIs:

```typescript
// govcon-funnels/src/lib/data-api.ts
const MA_API = 'https://mi.govcongiants.com/api';

export async function getContractor(slug: string) {
  const res = await fetch(`${MA_API}/contractors/${slug}`, {
    headers: { 'X-API-Key': process.env.MA_INTERNAL_API_KEY }
  });
  return res.json();
}
```

### Caching Strategy

- Static generation (ISR) for contractor/agency pages (revalidate: 24h)
- On-demand revalidation for forecasts (when data updates)
- Edge caching for high-traffic pages

### URL Canonicals

All data pages on govcongiants.com are canonical (not duplicated on mi.govcongiants.com).

---

## Appendix: Keyword Research

### High-Value Keywords to Target

| Keyword | Volume | Difficulty | Current Rank | Page Type |
|---------|--------|------------|--------------|-----------|
| "federal contractors database" | 1,300/mo | Medium | N/A | /data/contractors |
| "Booz Allen federal contracts" | 590/mo | Low | N/A | /data/contractors/booz-allen |
| "Deltek GovWin alternative" | 320/mo | Medium | N/A | /compare/deltek |
| "DOD contract opportunities" | 2,400/mo | High | N/A | /data/agencies/dod |
| "federal contract forecasts" | 880/mo | Medium | N/A | /data/forecasts |
| "SBLO contact list" | 210/mo | Low | #8 | /data/contractors (+ existing) |
| "government contract CRM" | 480/mo | Medium | N/A | /guides/capture-planning |
| "proposal writing software government" | 720/mo | High | N/A | Future feature page |

### Long-Tail Opportunities

- "[Company Name] federal contracts" — 3,500+ contractor pages
- "[Agency] contract awards 2026" — 50+ agency pages
- "[NAICS] government contracts" — Category pages

---

*Last Updated: May 9, 2026*
