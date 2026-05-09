# PRD: Contractor Sales History Chart

## Overview

Add a visual "Sales History" chart to contractor profile pages in MI Core, similar to [GovTribe](https://docs.govtribe.com/user-guide/what-is.../participants/vendors) and [HigherGov](https://docs.highergov.com/market-intelligence/find-and-analyze-federal-contracts) vendor profiles. This chart displays federal contract award values over time, giving users instant insight into a contractor's growth trajectory and federal revenue trends.

## Problem Statement

Currently, contractor research requires manually reviewing contract award lists. Users can't quickly assess:
- Is this contractor growing or declining?
- What's their annual federal revenue?
- Are they diversifying across agencies or concentrated?
- What's their typical contract size?

Competitors (GovTribe, HigherGov, Federal Compass) all show this data visually. We need to match and exceed this capability.

## User Stories

1. **As a BD manager**, I want to see a competitor's federal revenue trend so I can assess if they're gaining or losing market share
2. **As a capture manager**, I want to see a potential teaming partner's award history to verify they're actively winning work
3. **As a small business owner**, I want to compare my revenue trajectory to competitors in my NAICS code

## Feature Requirements

### Chart Visualization

**Primary Chart: Annual Obligations Bar Chart**
- X-axis: Fiscal years (FY2020 - FY2025, 5-year span)
- Y-axis: Total obligated dollars
- Bar color: Green gradient for growth years, amber for flat, red for decline
- Hover state: Show exact dollar value + number of awards

**Secondary View: Stacked by Agency**
- Same chart, but bars stacked by awarding agency
- Color-coded by top 5 agencies (DOD, VA, HHS, etc.)
- "Other" category for remaining agencies
- Toggle between "Total" and "By Agency" views

### Data Points to Display

Above/below the chart, show summary metrics:

| Metric | Description |
|--------|-------------|
| **Total 5-Year Value** | Sum of all obligations FY2020-2025 |
| **Annual Average** | Total / 5 |
| **Peak Year** | Highest annual value + year |
| **YoY Growth** | (Current FY - Prior FY) / Prior FY as % |
| **Active Contracts** | Count of contracts not yet expired |
| **Win Rate** | Awards / Bids (if bid count data available) |

### Chart Interactivity

1. **Click to drill down**: Click a bar to see that year's awards list
2. **Toggle views**: Total vs. By Agency vs. By NAICS
3. **Export**: Download chart as PNG or data as CSV
4. **Compare**: "Add to comparison" button for side-by-side with other contractors

## Technical Implementation

### Data Source

USASpending.gov API (via our existing `mcp__usaspending__search_contracts` integration):
- Query: `GET /api/v2/search/spending_by_award/`
- Filter by: recipient UEI, fiscal year range
- Aggregate by: fiscal year, awarding agency

### API Endpoint

```
GET /api/contractor-funding-history?uei=XXXXXXXX&years=5
```

Response:
```json
{
  "uei": "DPFMPQXKVZCE",
  "name": "Lockheed Martin Corporation",
  "fundingHistory": [
    { "fiscalYear": 2021, "totalObligated": 48200000000, "awardCount": 12453, "topAgencies": [...] },
    { "fiscalYear": 2022, "totalObligated": 51300000000, "awardCount": 13102, "topAgencies": [...] },
    { "fiscalYear": 2023, "totalObligated": 49800000000, "awardCount": 12890, "topAgencies": [...] },
    { "fiscalYear": 2024, "totalObligated": 52100000000, "awardCount": 13456, "topAgencies": [...] },
    { "fiscalYear": 2025, "totalObligated": 24500000000, "awardCount": 7234, "topAgencies": [...] }
  ],
  "summary": {
    "total5Year": 225900000000,
    "annualAverage": 45180000000,
    "peakYear": { "year": 2024, "value": 52100000000 },
    "yoyGrowth": 4.6,
    "activeContracts": 8234
  }
}
```

### Frontend Component

Use **Recharts** (already in Next.js ecosystem) or **Chart.js**:

```tsx
// src/components/ContractorFundingChart.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface FundingChartProps {
  data: FundingYear[];
  showAgencyBreakdown?: boolean;
}

export function ContractorFundingChart({ data, showAgencyBreakdown }: FundingChartProps) {
  // Chart implementation
}
```

### Caching Strategy

- Cache USASpending API responses in Supabase (24-hour TTL)
- Pre-compute aggregations for top 1000 contractors
- Lazy-load chart data on scroll (below the fold)

## Access Tiers

| Feature | Public | MI Free | MI Core |
|---------|--------|---------|---------|
| Chart visible | Blurred | Blurred | Full |
| Summary metrics | Hidden | Teaser | Full |
| Agency breakdown | No | No | Yes |
| Compare contractors | No | No | Yes |
| Export data | No | No | Yes |

## Success Metrics

1. **Engagement**: Time on contractor profile page +30%
2. **Conversion**: Free → Core upgrade rate from contractor pages +15%
3. **Usage**: Chart interactions per user session (target: 3+)
4. **SEO**: Contractor profile page rankings for "[company] federal contracts" queries

## Competitive Analysis

| Feature | GovTribe | HigherGov | Our Implementation |
|---------|----------|-----------|-------------------|
| 5-year history | ✓ | ✓ | ✓ |
| Agency breakdown | ✓ | ✓ | ✓ |
| NAICS breakdown | ✓ | Limited | ✓ |
| Compare contractors | ✓ | ✓ | ✓ |
| Export to CSV | Premium | Premium | MI Core |
| Embedded in search | No | Limited | Future |

## Implementation Phases

### Phase 1: Basic Chart (Week 1)
- API endpoint for funding history
- Simple bar chart (total obligations by year)
- Summary metrics below chart
- Gate behind MI Core

### Phase 2: Enhanced Visualization (Week 2)
- Stacked agency breakdown toggle
- Interactive drill-down on click
- Responsive mobile design

### Phase 3: Comparison & Export (Week 3)
- Compare up to 3 contractors side-by-side
- Export chart as PNG
- Export data as CSV
- Save comparison to dashboard

## Open Questions

1. **Where to host?**
   - Option A: Add to govcongiants.com/data/contractors/[uei] (SEO benefit)
   - Option B: Only in tools.govcongiants.org/contractors (cleaner separation)
   - **Recommendation**: Both - teaser on .com, full on tools

2. **Data freshness?**
   - USASpending updates quarterly
   - Show "Last updated" timestamp on chart
   - Consider badge: "Real-time" for current FY (partial data)

3. **Small contractors?**
   - Many contractors have <$1M in federal revenue
   - Auto-scale Y-axis based on values
   - Consider different display for micro-businesses vs. primes

## Dependencies

- USASpending.gov API (no auth, public)
- Recharts or Chart.js library
- Supabase caching layer (existing)

## Related Work

- PRD: Market Scanner (6-question framework) - uses same USASpending data
- Existing: `/api/expiring-contracts` - contract award queries

---

*Created: May 9, 2026*
*Author: Claude Code*
*Status: Draft*
