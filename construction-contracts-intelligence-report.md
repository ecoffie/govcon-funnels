# Construction Contracts Intelligence Report
## Expiring Federal Contracts (6-12 Months) - Search Strategy

**Date Generated:** March 30, 2026
**Status:** SAM.gov API quota exceeded (resets March 31, 2026 00:00 UTC)
**Alternative:** Manual search instructions below

---

## Target Profile

| Criteria | Value |
|----------|-------|
| **NAICS Codes** | 236220 (Commercial Building), 237xxx (Heavy Construction), 541330 (Engineering) |
| **Agencies** | USACE, NAVFAC, VA, Air Force |
| **Expiration Window** | 180-365 days (6-12 months) |
| **Contract Type** | Base contracts expiring (not modifications) |
| **Competition Focus** | Low competition (1-2 bidders) + sole source |

---

## Search Strategy (When API Available)

### Method 1: Automated Search (SAM.gov API)

```javascript
// Run after March 31, 2026 00:00 UTC
const naicsCodes = ['236220', '237110', '237120', '237130', '237210', '237310', '237990', '541330'];
const agencyCodes = ['USACE', 'NAVFAC', 'VA', 'AF'];

// For each NAICS code:
const expiringContracts = await getExpiringContracts(naicsCode, 12); // 12 months

// Filter by agency and expiration window
const targeted = expiringContracts.filter(c =>
  c.daysUntilExpiration >= 180 &&
  c.daysUntilExpiration <= 365 &&
  agencyCodes.some(code => c.awardingAgencyName.includes(code))
);

// Prioritize low competition
const lowComp = targeted.filter(c =>
  c.competitionLevel === 'sole_source' ||
  c.competitionLevel === 'low'
);
```

### Method 2: Manual Search (Available Now)

**SAM.gov Advanced Search URL:**
https://sam.gov/search/?index=opp&page=1&sort=-modifiedDate&sfm%5Bstatus%5D%5Bis_active%5D=true

**Search Parameters:**
1. **NAICS Codes:** Enter each code separately
   - 236220 (Commercial/Institutional Building)
   - 237110 (Water and Sewer Line Construction)
   - 237120 (Oil and Gas Pipeline Construction)
   - 237130 (Power and Communication Line Construction)
   - 237210 (Land Subdivision)
   - 237310 (Highway, Street, and Bridge Construction)
   - 237990 (Other Heavy Construction)
   - 541330 (Engineering Services)

2. **Agency Filters:**
   - Department: Department of Defense (DOD)
   - Sub-tier: Army Corps of Engineers (USACE)
   - Sub-tier: Naval Facilities Engineering Systems Command (NAVFAC)
   - Department: Department of Veterans Affairs (VA)
   - Sub-tier: Air Force Civil Engineer Center

3. **Date Filters:**
   - Response Deadline: September 30, 2026 - March 30, 2027

4. **Notice Types:**
   - Presolicitation
   - Combined Synopsis/Solicitation
   - Sources Sought

---

## Alternative Intelligence Sources (Available Now)

### 1. USASPENDING.gov
**URL:** https://www.usaspending.gov/search

**Query:**
- Time Period: All
- Award Type: Contracts
- NAICS: 236220, 237xxx, 541330
- Awarding Agency: Army, Navy, VA, Air Force
- Prime Award Type: Definitive Contract
- Current End Date: 09/30/2026 - 03/30/2027

**Export Fields:**
- Contract ID (PIID)
- Recipient Name (Incumbent)
- Total Obligation
- Current End Date
- Awarding Agency
- Description

### 2. AcquisitionGateway.gov (Forecasts)
**URL:** https://hallways.cap.gsa.gov/app/#/gateway/forecast-opportunities

**Filter:**
- Fiscal Year: 2026, 2027
- Category: Construction, Engineering
- Agency: DOD, VA

**Look For:**
- "Re-compete" or "Follow-on" keywords
- Estimated solicitation dates in Q3-Q4 2026

### 3. Agency-Specific Portals

**USACE (Army Corps of Engineers):**
- https://www.usace.army.mil/Business-With-Us/Contracting-Opportunities/
- Check district offices (Jacksonville, Mobile, Norfolk, Sacramento)

**NAVFAC (Naval Facilities):**
- https://www.navfac.navy.mil/Business-Lines/Contracting/
- Regional offices: NAVFAC Atlantic, Pacific, MIDLANT, Southeast

**VA (Veterans Affairs):**
- https://www.va.gov/osdbu/
- Focus on medical center construction/renovation

**Air Force Civil Engineer Center:**
- https://www.afcec.af.mil/
- Base construction and infrastructure

---

## Expected Contract Intelligence Format

Once API is available, this report will include:

### Top 10 Expiring Construction Contracts

**Example Format:**

#### 1. VA Medical Center HVAC Replacement
- **Contract Number:** VA26-1234567
- **Incumbent:** ABC Mechanical Services
- **Agency:** Department of Veterans Affairs
- **Sub-Agency:** VA Medical Center - Miami
- **Value:** $12.5M (base + options)
- **Expiration Date:** January 15, 2027 (291 days)
- **NAICS:** 236220 - Commercial Building Construction
- **Description:** HVAC system replacement and mechanical upgrades for 5-building medical campus
- **Competition Level:** Low (2 bidders on initial award)
- **Contract Type:** Firm Fixed Price (FFP)
- **Place of Performance:** Miami, FL
- **Intelligence Notes:**
  - Original award had only 2 bidders (low competition)
  - 3 modifications to date (potential dissatisfaction indicator)
  - Incumbent is small business (8(a) set-aside)

---

## Construction NAICS Code Breakdown

| NAICS | Description | Primary Agencies | Typical Contract Size |
|-------|-------------|------------------|----------------------|
| 236220 | Commercial/Institutional Building | VA, USACE, AF | $5M - $50M |
| 237110 | Water and Sewer Line Construction | USACE, EPA, Army | $2M - $25M |
| 237120 | Oil and Gas Pipeline Construction | DOD, DOE | $10M - $100M |
| 237130 | Power and Communication Line | USACE, AF, Navy | $3M - $30M |
| 237210 | Land Subdivision | USACE (military housing) | $5M - $40M |
| 237310 | Highway, Street, Bridge | USACE, AF (base infrastructure) | $8M - $80M |
| 237990 | Other Heavy Construction | All DOD branches | $3M - $50M |
| 541330 | Engineering Services | USACE, NAVFAC, AF | $1M - $20M |

---

## Agency-Specific Construction Contract Characteristics

### USACE (Army Corps of Engineers)
- **Primary NAICS:** 237310 (heavy civil), 237110 (water), 541330 (engineering)
- **Contract Vehicles:** MATOC (Multiple Award Task Order Contract), IDIQ
- **Typical Duration:** 3-5 years base period
- **Key Districts:**
  - Jacksonville (FL) - Military infrastructure
  - Mobile (AL) - Coastal/waterways
  - Norfolk (VA) - Navy facilities
  - Sacramento (CA) - West Coast military
- **Set-Asides:** 30-40% small business set-asides
- **Sources Sought:** Usually posted 6-9 months before solicitation

### NAVFAC (Naval Facilities Engineering)
- **Primary NAICS:** 236220 (building), 237990 (facilities), 541330 (A-E services)
- **Contract Vehicles:** MACC (Multiple Award Construction Contract), IDIQ
- **Typical Duration:** 5-year base with two 5-year options
- **Key Regions:**
  - NAVFAC Atlantic (Norfolk, VA)
  - NAVFAC Pacific (Pearl Harbor, HI)
  - NAVFAC Southeast (Jacksonville, FL)
  - NAVFAC MIDLANT (Mechanicsburg, PA)
- **Set-Asides:** HUBZone, 8(a), SDVOSB common
- **Past Performance:** HEAVILY weighted (40-50% of evaluation)

### VA (Veterans Affairs)
- **Primary NAICS:** 236220 (medical facilities), 541330 (design services)
- **Contract Vehicles:** National Acquisition Center (NAC) IDIQs
- **Typical Duration:** 2-4 years
- **Key Facilities:**
  - Major medical centers (Phoenix, Denver, Orlando)
  - Outpatient clinics (nationwide)
  - Cemetery infrastructure
- **Set-Asides:** SDVOSB preference (Vets First Contracting Program)
- **DBE Goals:** 10-15% for construction contracts

### Air Force Civil Engineer Center (AFCEC)
- **Primary NAICS:** 236220 (facilities), 237310 (airfield), 541330 (design)
- **Contract Vehicles:** EPASS (Engineering, Planning, and Sustainment Services)
- **Typical Duration:** 5-year IDIQ with task orders
- **Key Bases:**
  - Tyndall AFB (FL) - Major rebuild ongoing
  - Eglin AFB (FL) - Test facilities
  - Edwards AFB (CA) - Research infrastructure
  - Joint Base Andrews (MD) - High-profile work
- **Set-Asides:** 8(a), HUBZone, SDVOSB rotated by project
- **Security Clearances:** Often required (facility clearance)

---

## Red Flags for Expiring Contracts (Re-compete Indicators)

### High-Priority Targets
1. **Multiple Modifications (4+):** Indicates performance issues or scope creep
2. **Low Initial Competition (1-2 bidders):** Agency wants more competition
3. **Sole Source Awards:** Agency required to justify or re-compete
4. **Contract Value Growth >30%:** Changes may justify re-compete
5. **End Date Approaching with No Recompete Notice:** Check for bridge contracts

### Data Points to Track (When API Available)
```javascript
const recompeteIndicators = {
  highModificationCount: contract.modificationCount >= 4,
  lowCompetition: contract.numberOfOffersReceived <= 2,
  soleSource: contract.extentCompeted === 'C',
  significantGrowth: (contract.currentTotalValueOfAward / contract.baseAndExercisedOptionsValue) > 1.3,
  urgentExpiration: contract.daysUntilExpiration <= 180
};
```

---

## Next Steps

### Immediate Actions (Before API Quota Resets)
1. **Manual Search on SAM.gov:**
   - Use advanced search with filters above
   - Export results to spreadsheet
   - Focus on USACE/NAVFAC keywords: "re-compete", "follow-on", "successor"

2. **USASPENDING.gov Export:**
   - Pull contract awards data for 236220, 237xxx, 541330
   - Filter by end date: 09/30/2026 - 03/30/2027
   - Identify incumbents and contract values

3. **Agency Forecast Review:**
   - Check AcquisitionGateway.gov for forecasts
   - Review agency-specific procurement forecast pages
   - Sign up for email alerts on targeted NAICS codes

### Automated Actions (After March 31, 2026 00:00 UTC)
1. **Run API Queries:**
   ```bash
   # From govcon-funnels project root
   npm run dev

   # Test API endpoint
   curl "http://localhost:3000/api/expiring-contracts?naics=236220&months=12"
   curl "http://localhost:3000/api/expiring-contracts?naics=237310&months=12"
   curl "http://localhost:3000/api/expiring-contracts?naics=541330&months=12"
   ```

2. **Aggregate Intelligence:**
   - Combine results across all NAICS codes
   - Cross-reference with USASPENDING.gov data
   - Build incumbent profiles (UEI lookup)

3. **Generate Full Report:**
   - Top 10 contracts by value (6-12 month window)
   - Low-competition opportunities (<3 bidders)
   - Troubled contracts (4+ modifications)
   - Agency-specific breakdowns

---

## Sample Output Format (When Data Available)

### Contract Intelligence Card
```markdown
### Contract #1: Naval Station Norfolk BOQ Renovation

**Overview:**
- Contract ID: N40085-23-C-5678
- Incumbent: Superior Construction Corp
- Agency: NAVFAC Atlantic
- Value: $18.3M (base + options)
- Expiration: December 12, 2026 (257 days)

**Technical Details:**
- NAICS: 236220 - Commercial Building Construction
- PSC: Y1JZ - Construction of Educational Buildings
- Contract Type: Firm Fixed Price (FFP)
- Performance: Naval Station Norfolk, VA
- Set-Aside: None (full and open competition)

**Competition Analysis:**
- Initial Bidders: 3 (low-medium competition)
- Extent Competed: Full and Open Competition
- Small Business Participation: 2 of 3 bidders

**Performance Indicators:**
- Modifications: 2 (moderate, within normal range)
- Value Growth: 8% (minimal scope creep)
- On-Time Completion: Unknown (requires insider intel)

**Opportunity Assessment:**
⭐⭐⭐⭐ (4/5 stars)

**Rationale:**
- Moderate value contract ($18M+)
- Only 3 initial bidders (agency likely wants more competition)
- NAVFAC Atlantic region (high construction demand)
- Similar BOQ projects ongoing at multiple installations
- Technical requirements manageable (commercial building standards)

**Action Items:**
1. Research incumbent (Superior Construction Corp) - past performance, bonding capacity
2. Review original solicitation (N40085-23-R-5678) for evaluation criteria
3. Visit NavFac Atlantic website for upcoming BOQ projects
4. Connect with NAVFAC Atlantic Small Business Office
5. Prepare capability statement targeting BOQ renovation work
6. Monitor for Sources Sought notice (expected 6-9 months before expiration)

**Sources Sought Expected:** March-June 2026
**RFP Expected:** June-September 2026
**Award Expected:** November 2026 - January 2027
```

---

## API Endpoint Documentation

### Local Testing (When API Available)

**Endpoint:** `GET /api/expiring-contracts`

**Parameters:**
- `naics` (required): NAICS code (3-6 digits)
- `months` (optional): Months to look ahead (default 6, max 18)

**Example Requests:**
```bash
# Commercial building construction
curl "http://localhost:3000/api/expiring-contracts?naics=236220&months=12"

# Heavy construction (all subtypes)
curl "http://localhost:3000/api/expiring-contracts?naics=237&months=12"

# Engineering services
curl "http://localhost:3000/api/expiring-contracts?naics=541330&months=12"
```

**Response Format:**
```json
{
  "contracts": [
    {
      "contractId": "N40085-23-C-5678",
      "incumbent": "Superior Construction Corp",
      "agency": "Department of the Navy",
      "subAgency": "NAVFAC Atlantic",
      "value": 18300000,
      "valueFormatted": "$18.3M",
      "expirationDate": "2026-12-12",
      "daysUntilExpiration": 257,
      "naicsCode": "236220",
      "naicsDescription": "Commercial and Institutional Building Construction",
      "state": "VA",
      "competitionLevel": "medium",
      "numberOfBidders": 3
    }
  ],
  "totalCount": 47,
  "displayedCount": 15,
  "hasMore": true,
  "summary": {
    "totalValue": 485000000,
    "totalValueFormatted": "$485.0M",
    "soleSourceCount": 4,
    "lowCompetitionCount": 12,
    "urgentCount": 8
  }
}
```

---

## Quota Management

**SAM.gov API Limits:**
- Entity API: 1,000 requests/day
- Contract Awards API: 1,000 requests/day
- Resets: Daily at 00:00 UTC

**Rate Limiting Strategy:**
1. Use Supabase caching (24-hour TTL)
2. Batch NAICS queries (max 100 results per call)
3. Filter locally after retrieval
4. Schedule bulk queries during off-peak hours

**Current Status:**
- Quota exceeded as of March 30, 2026
- Resets March 31, 2026 00:00 UTC (approximately 8 hours)

---

## Related Tools and Resources

### Internal Tools (GovCon Giants Ecosystem)
- **Market Assassin:** https://tools.govcongiants.org/opportunity-hunter
- **CAGE Code Lookup:** https://govcongiants.org/tools/cage-code-lookup
- **Expiring Contracts Tool:** https://govcongiants.org/tools/expiring-contracts

### External Resources
- **SAM.gov Contract Search:** https://sam.gov/search/
- **USASPENDING.gov:** https://www.usaspending.gov/
- **AcquisitionGateway:** https://hallways.cap.gsa.gov/
- **GovTribe (Paid):** https://govtribe.com/
- **BGov (Paid):** https://about.bgov.com/

---

## Appendix: Construction Set-Aside Requirements

### Small Business Thresholds (2026)
| NAICS | Size Standard |
|-------|---------------|
| 236220 | $45M average annual receipts |
| 237xxx | $45M average annual receipts |
| 541330 | $25.5M average annual receipts |

### Common Set-Asides
- **8(a):** Small disadvantaged businesses
- **HUBZone:** Historically underutilized business zones
- **SDVOSB:** Service-disabled veteran-owned small business
- **WOSB:** Women-owned small business
- **SDB:** Small disadvantaged business

### DBE/MBE Goals (Construction)
- VA projects: 10-15% DBE goal
- USACE: 5-10% MBE goal
- NAVFAC: Varies by region (5-12%)

---

**Report Status:** INCOMPLETE - API quota exceeded
**Completion Date:** March 31, 2026 (after API quota reset)
**Contact:** Claude @ GovCon Giants
**Data Source:** SAM.gov Contract Awards API v1 (when available)
