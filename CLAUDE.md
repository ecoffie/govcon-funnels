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
/Users/ericcoffie/govcon-funnels
```

## Tech Stack
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Styling:** Dark theme (slate-950 base), green accents

---

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Main homepage - "$82 BILLION UNSPENT" hero |
| `/bootcamp` | January Bootcamp landing page |
| `/surge` | Surge Bootcamp landing page |
| `/free-course` | Free GovCon Course signup |
| `/opp` | Opportunity Hunter tool redirect |
| `/resources` | Free resources library |

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
| `/src/app/globals.css` | Global styles with green-glow effect |
| `/src/app/layout.tsx` | Root layout |

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
| **Market Assassin** | `/Users/ericcoffie/Market Assasin/market-assassin` | Dev/staging tools |
| **GovCon Shop** | `/Users/ericcoffie/govcon-shop` | Live shop (shop.govcongiants.org) |
| **GovCon Funnels** | This project | Marketing funnel pages |

---

## Design Notes
- **Color scheme:** Dark (slate-950) with green-500 accents, red-500 for urgency
- **Style:** Bold headlines, minimal, high contrast
- **Vibe:** Urgent, opportunity-focused, action-oriented

---

## Recent Work History

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

---

*Last Updated: February 4, 2026*
