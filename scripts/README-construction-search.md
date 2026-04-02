# Construction Contracts Intelligence Search

## Quick Start

**Run after March 31, 2026 00:00 UTC (when SAM.gov API quota resets)**

```bash
# From govcon-funnels project root
cd /Users/ericcoffie/govcon-funnels

# Install dependencies (if needed)
npm install

# Run the search script
npx tsx scripts/construction-contract-search.ts
```

## What It Does

Searches SAM.gov Contract Awards API for expiring construction contracts:

- **NAICS Codes:** 236220, 237xxx, 541330 (construction & engineering)
- **Agencies:** USACE, NAVFAC, VA, Air Force
- **Timeframe:** 6-12 months until expiration (180-365 days)
- **Output:** Top 10 contracts ranked by re-compete opportunity score

## Scoring Algorithm

Contracts are scored 0-10 based on:

| Factor | Points | Criteria |
|--------|--------|----------|
| High Value | +2 | Contract value ≥ $10M |
| Low Competition | +3 | Initial award had ≤2 bidders |
| Sole Source | +4 | No competition (must re-compete) |
| Optimal Window | +3 | Expires in 6-12 months |
| Urgent | +1 | Expires within 6 months |

**High Priority:** Score ≥5 (focus here first)

## Sample Output

```
📊 TOP 10 EXPIRING CONSTRUCTION CONTRACTS
================================================================================

1. VA Medical Center HVAC Replacement and Mechanical Upgrades...
────────────────────────────────────────────────────────────────────────────────
   Contract ID:        VA26-1234567
   Incumbent:          ABC Mechanical Services
   Agency:             Department of Veterans Affairs
   Sub-Agency:         VA Medical Center - Miami
   Value:              $12.5M
   Expiration Date:    January 15, 2027 (291 days)
   NAICS:              236220 - Commercial and Institutional Building Construction
   Competition:        low (2 bidders)
   State:              FL
   Opportunity Score:  ⭐⭐⭐⭐⭐ (8/10)

   Re-compete Indicators:
     • High value: $12.5M
     • Low competition: 2 bidders
     • Expires in 10 months

   Expected Milestones:
     • Sources Sought:   Apr 2026 - Jul 2026
     • RFP Release:      Jul 2026 - Oct 2026
```

## API Rate Limits

- **Contract Awards API:** 1,000 requests/day
- **Resets:** Daily at 00:00 UTC
- **Current Status:** Quota exceeded until March 31, 2026

## Alternative: Test with Single NAICS

If you want to test with just one NAICS code:

```bash
# Test commercial building construction only
curl "http://localhost:3000/api/expiring-contracts?naics=236220&months=12" | jq
```

## Troubleshooting

### Error: "SAM.gov API error: 429"
**Cause:** API quota exceeded
**Fix:** Wait until March 31, 2026 00:00 UTC

### Error: "Module not found"
**Cause:** Dependencies not installed
**Fix:** Run `npm install` in project root

### Error: "Cannot find module 'tsx'"
**Cause:** TypeScript executor not installed
**Fix:** Install globally: `npm install -g tsx`

## Export Results to CSV

To export results for spreadsheet analysis:

```bash
# Run search and save to JSON
npx tsx scripts/construction-contract-search.ts > results.json

# Convert to CSV (requires jq)
cat results.json | jq -r '.[] | [.piid, .recipientName, .awardingAgencyName, .currentTotalValueOfAward, .daysUntilExpiration] | @csv' > results.csv
```

## Next Steps After Running

1. **Review Top 10 Contracts:**
   - Focus on scores ≥5
   - Prioritize sole source and low competition

2. **Research Incumbents:**
   - Look up companies on SAM.gov Entity Search
   - Check USASpending.gov for past performance
   - Review company websites for capabilities

3. **Monitor SAM.gov:**
   - Watch for Sources Sought notices
   - Set up email alerts for NAICS codes
   - Track contract modifications

4. **Prepare Capability Statements:**
   - Target specific agencies (USACE, NAVFAC, VA, AF)
   - Highlight relevant past performance
   - Include bonding capacity for construction contracts

5. **Connect with Contracting Offices:**
   - Attend industry days
   - Schedule one-on-one meetings
   - Join small business outreach events

## Related Documentation

- **Full Intelligence Report:** `/construction-contracts-intelligence-report.md`
- **SAM.gov API Library:** `/src/lib/sam/contract-awards.ts`
- **API Endpoint:** `/src/app/api/expiring-contracts/route.ts`
