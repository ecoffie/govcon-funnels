# YouTube Video → Website Page SEO Mapping

**Created:** March 22, 2026
**Goal:** Drive organic traffic to website via video content landing pages

---

## Strategy

Each video gets a dedicated landing page at `/videos/[slug]` that:
1. Embeds the YouTube video
2. Provides comprehensive written content (for SEO)
3. Has clear CTAs to courses/consulting
4. Captures email via lead magnet
5. Links to related guides and jobs

---

## Priority 1: High-Traffic Keyword Videos

These videos target keywords with real search volume:

| Video | Target Keywords | Volume | Page Slug |
|-------|-----------------|--------|-----------|
| Where Do I Start in GovCon? | how to get started government contracting, government contracting for beginners | 1,000+ | `/videos/get-started-government-contracting` |
| SBA Profile Setup | sba profile, sba certification, small business certification | 500+ | `/videos/sba-profile-setup` |
| Finding Contract Opportunities | how to find government contracts, sam.gov search | 3,000+ | `/videos/find-government-contracts` |
| Market Research for GovCon | federal market research, government contract research | 500+ | `/videos/federal-market-research` |
| Proposal Writing & Bidding | how to write government proposal, federal proposal writing | 1,500+ | `/videos/proposal-writing-guide` |
| Capability Statement | capability statement template, capability statement example | 2,000+ | `/videos/capability-statement-guide` |
| Pricing Strategies | government contract pricing, federal contract pricing | 800+ | `/videos/government-contract-pricing` |
| GSA Schedule Overview | gsa schedule, how to get gsa schedule | 1,200+ | `/videos/gsa-schedule-overview` |

---

## Priority 2: Case Study Videos (Social Proof)

| Video | Use Case | Page Slug |
|-------|----------|-----------|
| $834K in 7 Months Case Study | Success story | `/case-studies/834k-contract-win` |
| Zero to First Contract | Beginner success | `/case-studies/first-contract-win` |
| Fernando — Market Assassin | Tool testimonial | `/tools/market-assassin` (existing) |

---

## Priority 3: YouTube Live Archive

Convert slide decks to landing pages with video embeds:

| Live Title | Topic | Page Slug |
|------------|-------|-----------|
| $221B in Federal Contracts | Opportunity awareness | `/videos/221b-federal-contracts` |
| 71% Had ZERO Competition | Low competition | `/videos/no-competition-contracts` |
| How to Find and Contact Buyers | Agency outreach | `/videos/contact-federal-buyers` |
| $221B Expiring Contracts | Recompete strategy | `/videos/expiring-contracts` |
| 3,500 Prime Contractors Need Partners | Subcontracting | `/videos/prime-contractor-partners` |

---

## Current YouTube URLs (for embedding)

### Resources Page Videos
1. https://www.youtube.com/live/VwerrdguYTE - Where Do I Start
2. https://youtu.be/g0NsG4SogDM - SBA Profile Setup
3. https://youtube.com/live/JAa1qkOrtic - Market Research
4. https://www.youtube.com/live/Ko1N0TMAAs0 - Finding Opportunities
5. https://youtu.be/eCtnAM0j5gY - PSC Codes
6. https://www.youtube.com/live/ke5RmuRQN_8 - Dangers of Consulting
7. https://youtu.be/MTaIUOBbE1Q - Proposal Writing
8. https://youtube.com/live/paUgQSU5v6c - Capability Statements
9. https://youtu.be/5o5V8YkNjIM - Pricing Strategies
10. https://youtu.be/3eBlk6J1Hig - Pricing Strategies Part 2
11. https://youtu.be/uR8vdTtvuyU - Winning Without Past Performance
12. https://youtube.com/live/HSWGMzkD0Vg - Financing Your Contract
13. https://youtube.com/live/TDtk3mVWZDQ - Vendor Credit
14. https://youtube.com/live/gHcWcYFWa4I - Construction Business
15. https://youtu.be/XvWaAownrZU - Foreign Companies
16. https://youtu.be/SdefXaGSS5Q - GSA Schedule

### Case Study Videos
1. https://youtube.com/watch?v=tGOfRQrI3W0 - Colin Content Generator
2. https://youtube.com/watch?v=KrpDzQegF1E - Keidra Norwood
3. https://youtube.com/watch?v=fomlx8tx-bI - Jacqueline Woodard
4. https://youtube.com/watch?v=JQWFbP9b-0c - Fernando Market Assassin
5. https://youtube.com/watch?v=dKtmkZz7Buo - Olga Overview
6. https://youtube.com/watch?v=qqhgTUtn67g - Lotus Connect
7. https://youtube.com/watch?v=YMEVydVs1q0 - Eric Tutorial
8. https://youtube.com/watch?v=1O3tMVZUTPY - Wes & Eric
9. https://youtube.com/watch?v=cf0U-ZaYikM - Market Assassin Demo
10. https://youtube.com/watch?v=Vm4RhNXZ73U - Recompete Tracker
11. https://youtube.com/watch?v=vO420eQ97Dw - Content Creator Demo

---

## Implementation Plan

### Phase 1: Create Video Page Template ✅ COMPLETED (Mar 22, 2026)
- [x] Create `/app/videos/[slug]/page.tsx` dynamic route
- [x] Design video landing page layout (embed + content + CTA)
- [x] Add video data structure to `/content/videos/`
- [x] Add VideoObject JSON-LD schema to `/lib/seo.ts`
- [x] Create video library index at `/app/videos/page.tsx`

### Phase 2: Build Priority 1 Pages ✅ 8/8 COMPLETED (Mar 22, 2026)
- [x] Get Started Government Contracting (`/videos/get-started-government-contracting`)
- [x] Find Government Contracts (`/videos/find-government-contracts`)
- [x] Federal Market Research (`/videos/market-research-govcon`)
- [x] Proposal Writing Guide (`/videos/proposal-writing-guide`)
- [x] Capability Statement Guide (`/videos/capability-statement-guide`)
- [x] Government Contract Pricing (`/videos/pricing-government-contracts`)
- [x] Win Without Past Performance (`/videos/win-without-past-performance`)
- [x] GSA Schedule Guide (`/videos/gsa-schedule-guide`)

**Total Search Volume Targeted:** ~10,600/mo

### Phase 3: Cross-Link
- [x] Videos link to related guides via `relatedGuides` array
- [x] Videos link to related jobs via `relatedJobs` array
- [ ] Link videos from related guides
- [ ] Link videos from job category pages
- [ ] Add video section to homepage
- [x] Sitemap auto-updated via generateStaticParams

### Phase 4: Remaining Videos (Future)
- [ ] SBA Profile Setup
- [ ] PSC Codes Understanding
- [ ] Dangers of Being a Consultant
- [ ] Financing Your Contract
- [ ] Vendor & Supplier Credit
- [ ] Construction Business
- [ ] Foreign-Based Companies

---

## SEO Notes

- Each video page should have 500-1000 words of written content
- Include video transcript or detailed summary
- Target 1-2 primary keywords per page
- Include timestamps/chapters in written form
- Add FAQ section based on common video questions
- Internal link to related guides, jobs, and products

---

## Files Created (Mar 22, 2026)

### Data Structure
- `/src/content/videos/index.ts` - VideoData interface & exports
- `/src/content/videos/get-started-government-contracting.ts`
- `/src/content/videos/find-government-contracts.ts`
- `/src/content/videos/market-research-govcon.ts`
- `/src/content/videos/proposal-writing-guide.ts`
- `/src/content/videos/capability-statement-guide.ts`
- `/src/content/videos/pricing-government-contracts.ts`
- `/src/content/videos/win-without-past-performance.ts`
- `/src/content/videos/gsa-schedule-guide.ts`

### Page Templates
- `/src/app/videos/page.tsx` - Video library index
- `/src/app/videos/[slug]/page.tsx` - Dynamic video landing page

### SEO Additions
- `/src/lib/seo.ts` - Added `videoJsonLd()` function for VideoObject schema

---

## Video Page Features

Each video landing page includes:
1. **Hero section** with YouTube embed (responsive 16:9)
2. **Key Takeaways** box with bullet points
3. **SEO content** with H3 sections and formatted HTML
4. **Email capture** CTA
5. **Related Guides** cards linking to guide pages
6. **Related Jobs** cards linking to job categories
7. **VideoObject JSON-LD** for rich snippets

---

---

## Status Update (Mar 31, 2026)

**Phase 1:** ✅ Complete - Video page template built
**Phase 2:** ✅ Complete - 8 priority video pages live
**Phase 3:** ⏳ In Progress - Cross-linking partially done
- ✅ Videos link to related guides/jobs
- ⏳ Link videos FROM guides (pending)
- ⏳ Add video section to homepage (pending)

**Phase 4:** Not started - 7 remaining videos

**Next Actions (Month 2):**
1. Add video embeds/links to top 5 guides
2. Add "Featured Videos" section to homepage
3. Build remaining 7 video pages

---

*Last Updated: March 31, 2026*
