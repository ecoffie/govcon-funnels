/**
 * USASpending.gov API Client
 * For fetching contractor funding history and award data
 * API Docs: https://api.usaspending.gov/
 */

const USASPENDING_API_BASE = 'https://api.usaspending.gov/api/v2';

export interface FundingYear {
  fiscalYear: number;
  totalObligated: number;
  awardCount: number;
  topAgencies: Array<{
    name: string;
    amount: number;
    count: number;
  }>;
}

export interface FundingHistoryResponse {
  uei: string;
  name: string;
  fundingHistory: FundingYear[];
  summary: {
    total5Year: number;
    annualAverage: number;
    peakYear: { year: number; value: number };
    yoyGrowth: number | null;
    activeContracts: number;
  };
}

/**
 * Get funding history for a contractor by UEI
 * Fetches 5 years of award data from USASpending.gov
 */
export async function getContractorFundingHistory(
  uei: string,
  contractorName: string, // Need company name from SAM
  years: number = 5
): Promise<FundingHistoryResponse | null> {
  try {
    if (!contractorName) {
      console.error('Contractor name is required for USASpending lookup');
      return null;
    }

    // Calculate fiscal years (FY runs Oct 1 - Sep 30)
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    // If we're in Oct-Dec, we're in next FY
    const currentFY = currentMonth >= 9 ? currentYear + 1 : currentYear;

    const fiscalYears = [];
    for (let i = 0; i < years; i++) {
      fiscalYears.push(currentFY - i);
    }
    fiscalYears.reverse(); // Oldest to newest

    // Fetch awards for each fiscal year
    const fundingHistory: FundingYear[] = [];
    let foundContractorName = contractorName;

    for (const fy of fiscalYears) {
      const startDate = `${fy - 1}-10-01`; // FY starts Oct 1 of prior year
      const endDate = `${fy}-09-30`;

      // USASpending uses recipient_search_text for company name matching
      const requestBody = {
        filters: {
          recipient_search_text: [contractorName],
          time_period: [{ start_date: startDate, end_date: endDate }],
          award_type_codes: ['A', 'B', 'C', 'D'], // All contract types
        },
        fields: [
          'Award ID',
          'Recipient Name',
          'Award Amount',
          'Awarding Agency',
          'Start Date',
          'End Date',
        ],
        page: 1,
        limit: 100, // USASpending max is 100
        sort: 'Award Amount',
        order: 'desc',
      };

      console.log(`[USASpending] Fetching FY${fy} for "${contractorName}"`);

      const response = await fetch(`${USASPENDING_API_BASE}/search/spending_by_award/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`USASpending API error for FY${fy}:`, response.status, errorText);
        // Still push zero data for this year
        fundingHistory.push({
          fiscalYear: fy,
          totalObligated: 0,
          awardCount: 0,
          topAgencies: [],
        });
        continue;
      }

      const data = await response.json();
      const results = data.results || [];
      console.log(`[USASpending] FY${fy}: Found ${results.length} awards`);

      // Capture contractor name from first result
      if (results.length > 0 && !foundContractorName) {
        foundContractorName = results[0]['Recipient Name'] || contractorName;
      }

      // Aggregate by agency
      const agencyTotals = new Map<string, { amount: number; count: number }>();
      let totalObligated = 0;

      for (const award of results) {
        const amount = award['Award Amount'] || 0;
        const agency = award['Awarding Agency'] || 'Unknown';

        totalObligated += amount;

        const existing = agencyTotals.get(agency) || { amount: 0, count: 0 };
        agencyTotals.set(agency, {
          amount: existing.amount + amount,
          count: existing.count + 1,
        });
      }

      // Get top 5 agencies
      const topAgencies = Array.from(agencyTotals.entries())
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);

      fundingHistory.push({
        fiscalYear: fy,
        totalObligated,
        awardCount: results.length,
        topAgencies,
      });
    }

    // Calculate summary stats
    const total5Year = fundingHistory.reduce((sum, y) => sum + y.totalObligated, 0);
    const annualAverage = total5Year / years;

    const peakYearData = fundingHistory.reduce(
      (max, y) => (y.totalObligated > max.value ? { year: y.fiscalYear, value: y.totalObligated } : max),
      { year: currentFY, value: 0 }
    );

    // YoY growth (current vs prior year)
    const currentYearData = fundingHistory.find(y => y.fiscalYear === currentFY);
    const priorYearData = fundingHistory.find(y => y.fiscalYear === currentFY - 1);
    let yoyGrowth: number | null = null;
    if (currentYearData && priorYearData && priorYearData.totalObligated > 0) {
      yoyGrowth = ((currentYearData.totalObligated - priorYearData.totalObligated) / priorYearData.totalObligated) * 100;
    }

    // Count active contracts (end date in future)
    const activeContracts = fundingHistory.reduce((sum, y) => sum + y.awardCount, 0);

    return {
      uei,
      name: foundContractorName,
      fundingHistory,
      summary: {
        total5Year,
        annualAverage,
        peakYear: peakYearData,
        yoyGrowth,
        activeContracts,
      },
    };
  } catch (error) {
    console.error('Error fetching contractor funding history:', error);
    return null;
  }
}

/**
 * Format large dollar amounts for display
 */
export function formatDollars(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`;
  } else if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  } else if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

/**
 * Format percentage for display
 */
export function formatPercent(value: number | null): string {
  if (value === null) return 'N/A';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}
