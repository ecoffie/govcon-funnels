# PRD: Free CAGE Code Lookup Tool

**Status:** Approved | **Ship Date:** March 24, 2026

---

## 1. Problem Statement

**Who has this problem?**
Government contractors and BD professionals who need to look up CAGE codes for teaming partners, competitors, or their own registration.

**What's the pain?**
SAM.gov's official CAGE lookup is clunky. Users search "cage code lookup" (9,900/mo) expecting a simple tool but find guides instead.

**Evidence this is real:**
- [x] GSC data: 316 impressions, 0.6% CTR for "cage code lookup" - we rank page 1 but users don't click because we show a guide, not a tool
- [x] Competitor validation: govcagecodes.com ranks #2 with a simple search tool
- [x] Already in Market Assassin feature-intake.md as SEO-driven feature

---

## 2. Competitive Context

| Competitor | How They Solve It | Price | Gap We Exploit |
|------------|-------------------|-------|----------------|
| SAM.gov (DLA) | Official lookup | Free | Clunky UX, no lead capture |
| govcagecodes.com | Simple search form | Free | No lead capture, no GovCon ecosystem |
| GovTribe | Entity search | $60+/mo | Paywalled |

**Why will users choose us?**
Free, fast, simple. Plus we capture leads and upsell to paid tools.

---

## 3. Solution

**One-sentence description:**
Users can search CAGE codes by code or company name and see contractor details, with email gate for full results.

**Tool location:** `/tools/cage-code-lookup` (new page in govcon-funnels)

**User flow:**
1. User lands on page (from Google search or /tools)
2. Enters CAGE code OR company name
3. Sees 3 results free
4. To see more results / export / view full profile → enters email
5. Email captured to GHL, user gets full access

**Output:**
- Company name, CAGE code, city/state
- SAM registration status (Active/Inactive)
- NAICS codes (if available)
- Link to full SAM.gov profile

---

## 4. Success Metrics

| Metric | Target | How We Measure |
|--------|--------|----------------|
| GSC CTR for "cage code lookup" | 5%+ (up from 0.6%) | GSC Performance |
| Email captures/month | 100+ | GHL contacts tagged "cage-lookup" |
| Tool usage/month | 500+ searches | API route logs |

**Kill criteria:** <20 email captures in first 30 days

---

## 5. Scope

**In scope (MVP):**
- [x] Search by CAGE code (exact match)
- [x] Search by company name (partial match)
- [x] Show 3 results free
- [x] Email gate for full results
- [x] Rate limiting (20/hour per IP)
- [x] Mobile responsive
- [x] SEO metadata optimized for "cage code lookup"

**Out of scope (future):**
- CSV export
- Save searches
- Full company profile pages
- Integration with other tools

**Dependencies:**
- [x] SAM.gov Entity API (v3) - confirmed available
- [x] GHL API for lead capture (already integrated)
- [ ] SAM_API_KEY env var in Vercel

---

## 6. Technical Approach

**Data source:** SAM.gov Entity Management API v3
- Endpoint: `https://api.sam.gov/entity-information/v3/entities`
- Auth: API key (1,000 requests/day with registered key)
- Supports: cageCode, legalBusinessName search

**Files to create:**

| File | Purpose |
|------|---------|
| `/src/app/tools/cage-code-lookup/page.tsx` | Main tool page (client component) |
| `/src/app/api/cage-lookup/route.ts` | API proxy with rate limiting |
| `/src/lib/sam-entity.ts` | SAM.gov Entity API wrapper |

**Rate limiting:**
- 20 searches/hour per IP (KV-based)
- No auth required for search
- Email required to unlock full results

**Estimated effort:** Small (< 1 day)

---

## 7. Go-to-Market

**Pricing:** Free (lead gen tool)

**Marketing angle:**
"Look up any CAGE code in seconds. Search 600,000+ federal contractors free."

**Launch checklist:**
- [ ] Tool live and tested
- [ ] /tools page updated with new tool card
- [ ] GSC indexing requested
- [ ] Internal link from /guides/cage-code
- [ ] Social post announcing free tool

---

## 8. Evaluation Criteria

### Functional Requirements
- [ ] Search by CAGE code returns exact match
- [ ] Search by company name returns partial matches
- [ ] 3 results shown without email
- [ ] Email gate appears for result 4+
- [ ] Email submitted to GHL with tag "cage-lookup"
- [ ] Rate limiting works (returns 429 after 20/hour)

### Integration Requirements
- [ ] SAM.gov API returns valid data
- [ ] GHL receives leads with correct tags
- [ ] No CORS errors on API route

### Security & Access
- [ ] API key not exposed to client
- [ ] Rate limiting prevents abuse
- [ ] No PII logged

### User Experience
- [ ] Page loads in <2s
- [ ] Mobile responsive (test iPhone)
- [ ] Clear error messages on failures
- [ ] Loading state during search

### SEO
- [ ] Title: "Free CAGE Code Lookup Tool..."
- [ ] Meta description includes "cage code lookup"
- [ ] H1 contains target keyword
- [ ] JSON-LD WebApplication schema

### Verification Steps
1. Search "1ABC2" (known CAGE) → should return result
2. Search "Lockheed" → should return multiple results
3. Search invalid code → should show "No results"
4. Hit rate limit → should show 429 message
5. Enter email → should unlock full results + appear in GHL

---

*Created: March 24, 2026*
