import { NextRequest, NextResponse } from 'next/server';
import { getExpiringContracts, ContractAward } from '@/lib/sam';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms
const RATE_LIMIT_MAX = 30; // 30 requests per hour per IP
const FREE_RESULT_LIMIT = 15; // Teaser limit for free tool

function checkClientRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetAt < now) rateLimitMap.delete(key);
    }
  }

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

/**
 * Validate NAICS code format (3-6 digits)
 */
function validateNAICS(code: string): boolean {
  return /^\d{3,6}$/.test(code);
}

/**
 * Format currency for display
 */
function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
}

/**
 * GET /api/expiring-contracts
 *
 * Query params:
 * - naics: NAICS code (required, 3-6 digits)
 * - months: Months to look ahead (default 6, max 18)
 *
 * Rate limited: 30 requests/hour per IP
 * Free tool returns max 15 results (teaser)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const naics = searchParams.get('naics')?.trim();
  const monthsParam = searchParams.get('months');
  const months = Math.min(parseInt(monthsParam || '6', 10), 18);

  // Validate input
  if (!naics) {
    return NextResponse.json(
      { error: 'NAICS code is required' },
      { status: 400 }
    );
  }

  if (!validateNAICS(naics)) {
    return NextResponse.json(
      { error: 'NAICS code must be 3-6 digits (e.g., 541512 for Computer Systems Design)' },
      { status: 400 }
    );
  }

  // Rate limiting by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  const rateCheck = checkClientRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded. Try again in an hour.',
        retryAfter: 3600,
      },
      { status: 429 }
    );
  }

  try {
    // Get expiring contracts
    const allContracts = await getExpiringContracts(naics, months);
    const totalCount = allContracts.length;

    // Limit results for free tool (teaser)
    const contracts = allContracts.slice(0, FREE_RESULT_LIMIT);

    // Transform for public display
    // Note: POC info is intentionally excluded (Pro feature)
    const publicContracts = contracts.map((contract: ContractAward) => ({
      contractId: contract.piid,
      incumbent: contract.recipientName,
      agency: contract.awardingAgencyName,
      subAgency: contract.awardingSubAgencyName,
      value: contract.currentTotalValueOfAward,
      valueFormatted: formatCurrency(contract.currentTotalValueOfAward),
      expirationDate: contract.periodOfPerformanceCurrentEndDate,
      daysUntilExpiration: contract.daysUntilExpiration,
      naicsCode: contract.naicsCode,
      naicsDescription: contract.naicsDescription,
      state: contract.placeOfPerformanceState,
      competitionLevel: contract.competitionLevel,
      numberOfBidders: contract.numberOfOffersReceived,
    }));

    // Calculate summary stats
    const totalValue = allContracts.reduce((sum, c) => sum + c.currentTotalValueOfAward, 0);
    const soleSourceCount = allContracts.filter(c => c.competitionLevel === 'sole_source').length;
    const lowCompetitionCount = allContracts.filter(c => c.competitionLevel === 'low').length;
    const urgentCount = allContracts.filter(c => (c.daysUntilExpiration || 999) <= 90).length;

    return NextResponse.json({
      contracts: publicContracts,
      totalCount,
      displayedCount: contracts.length,
      hasMore: totalCount > FREE_RESULT_LIMIT,
      query: {
        naics,
        months,
      },
      summary: {
        totalValue,
        totalValueFormatted: formatCurrency(totalValue),
        soleSourceCount,
        lowCompetitionCount,
        urgentCount, // Within 90 days
      },
      // Upsell message
      upgrade: totalCount > FREE_RESULT_LIMIT ? {
        message: `Showing ${FREE_RESULT_LIMIT} of ${totalCount} expiring contracts. Get full access + email alerts with Market Assassin Pro.`,
        url: 'https://mi.govcongiants.com/opportunity-hunter',
      } : null,
    });
  } catch (error) {
    console.error('[Expiring Contracts API Error]', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch expiring contracts. Please try again later.',
        contracts: [],
        totalCount: 0,
      },
      { status: 500 }
    );
  }
}
