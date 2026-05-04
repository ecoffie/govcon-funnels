import { NextRequest, NextResponse } from 'next/server';
import { searchEntities, validateCAGECode } from '@/lib/sam';

// Simple in-memory rate limiting (resets on cold start, sufficient for free tool)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms
const RATE_LIMIT_MAX = 30; // 30 requests per hour per IP

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
 * GET /api/cage-lookup
 *
 * Query params:
 * - cageCode: 5-character CAGE code (exact match)
 * - companyName: Company name (partial match)
 * - limit: Max results (default 10, max 25)
 *
 * Rate limited: 30 requests/hour per IP
 * Uses new SAM library with Supabase caching
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cageCode = searchParams.get('cageCode')?.trim().toUpperCase();
  const companyName = searchParams.get('companyName')?.trim();
  const limitParam = searchParams.get('limit');
  const limit = Math.min(parseInt(limitParam || '10', 10), 25);

  // Validate input
  if (!cageCode && !companyName) {
    return NextResponse.json(
      { error: 'Provide cageCode or companyName parameter' },
      { status: 400 }
    );
  }

  // Validate CAGE code format if provided
  if (cageCode && !validateCAGECode(cageCode)) {
    return NextResponse.json(
      { error: 'CAGE code must be exactly 5 alphanumeric characters' },
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

  // Search SAM.gov using new library
  const result = await searchEntities({
    cageCode: cageCode || undefined,
    legalBusinessName: companyName || undefined,
    size: limit,
  });

  if (result.error) {
    const isRateLimited = result.error.status === 429;

    return NextResponse.json(
      {
        error: isRateLimited
          ? 'SAM.gov rate limit exceeded. Please try again later.'
          : 'SAM.gov lookup temporarily unavailable. Please try again later.',
        details: result.error.message,
      },
      { status: isRateLimited ? 429 : 503 }
    );
  }

  if (result.entities.length === 0 && result.totalCount === 0) {
    return NextResponse.json({
      entities: [],
      totalRecords: 0,
      query: cageCode ? { type: 'cageCode', value: cageCode } : { type: 'companyName', value: companyName },
      fromCache: result.fromCache,
      note: 'No results found.',
    });
  }

  // Transform for client (remove any sensitive fields if needed)
  const publicEntities = result.entities.map((entity) => ({
    cageCode: entity.cageCode,
    uei: entity.ueiSAM,
    name: entity.legalBusinessName,
    dba: entity.dbaName || '',
    city: entity.physicalAddress?.city || '',
    state: entity.physicalAddress?.stateOrProvince || '',
    country: entity.physicalAddress?.countryCode || 'USA',
    status: entity.isActive ? 'Active' : 'Inactive',
    expirationDate: entity.registrationExpirationDate || '',
    daysUntilExpiration: entity.daysUntilExpiration,
    naics: entity.naicsList?.map(n => n.naicsCode) || [],
    certifications: {
      has8a: entity.has8a || false,
      hasSDVOSB: entity.hasSDVOSB || false,
      hasWOSB: entity.hasWOSB || false,
      hasHUBZone: entity.hasHUBZone || false,
      all: entity.certifications?.sbaBusinessTypes || [],
    },
  }));

  return NextResponse.json({
    entities: publicEntities,
    totalRecords: result.totalCount,
    query: cageCode ? { type: 'cageCode', value: cageCode } : { type: 'companyName', value: companyName },
    fromCache: result.fromCache,
  });
}
