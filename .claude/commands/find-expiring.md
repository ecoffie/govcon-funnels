# Find Expiring Contracts

Search for federal contracts expiring within a specified timeframe by NAICS code.

## Arguments
- `$ARGUMENTS` - NAICS code (required) followed by optional months (default: 6)

## Instructions

1. Parse the NAICS code and months from arguments
   - First argument: NAICS code (e.g., 541512)
   - Second argument (optional): months to look ahead (default: 6)

2. Call the expiring contracts API:
   ```
   GET /api/expiring-contracts?naics={naicsCode}&months={months}
   ```

3. Display results showing:
   - Contract ID
   - Incumbent Contractor
   - Agency
   - Contract Value
   - Expiration Date
   - Days Until Expiration

## Example Usage

```
/find-expiring 541512
/find-expiring 541512 12
/find-expiring 236220 3
```

## Output Format

```
## Expiring Contracts: NAICS 541512 (Next 6 Months)

| Contract ID | Incumbent | Agency | Value | Expires | Days Left |
|-------------|-----------|--------|-------|---------|-----------|
| W912HQ-21-D-0001 | Tech Corp Inc | ARMY | $2.5M | 2026-09-15 | 174 |
| 75D30120F00123 | Solutions LLC | CDC | $1.2M | 2026-08-30 | 158 |

Showing 15 of 127 expiring contracts.

**Want full access?** Get all 127 contracts + email alerts with Market Assassin Pro:
https://tools.govcongiants.org/opportunity-hunter
```

## Notes

- Free tool shows max 15 results (teaser)
- Full results available in Pro tools
- Excludes POC information (Pro feature)
- Results cached for 24 hours
