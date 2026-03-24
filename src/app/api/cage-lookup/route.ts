import { NextRequest, NextResponse } from 'next/server';
import { searchSamEntities, SamEntity } from '@/lib/sam-entity';

// Simple in-memory rate limiting (resets on cold start, sufficient for free tool)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms
const RATE_LIMIT_MAX = 30; // 30 requests per hour per IP

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
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
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cageCode = searchParams.get('cageCode')?.trim();
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
  if (cageCode && !/^[A-Z0-9]{5}$/i.test(cageCode)) {
    return NextResponse.json(
      { error: 'CAGE code must be exactly 5 alphanumeric characters' },
      { status: 400 }
    );
  }

  // Rate limiting by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded. Try again in an hour.',
        retryAfter: 3600,
      },
      { status: 429 }
    );
  }

  // Search SAM.gov
  const result = await searchSamEntities({
    cageCode: cageCode || undefined,
    companyName: companyName || undefined,
    limit,
  });

  if (result.error) {
    return NextResponse.json(
      { error: result.error, entities: [], totalRecords: 0 },
      { status: 500 }
    );
  }

  // Transform for client (remove any sensitive fields if needed)
  const publicEntities = result.entities.map((entity: SamEntity) => ({
    cageCode: entity.cageCode,
    uei: entity.ueiSAM,
    name: entity.legalBusinessName,
    dba: entity.dbaName,
    city: entity.physicalAddress?.city || '',
    state: entity.physicalAddress?.stateOrProvinceCode || '',
    country: entity.physicalAddress?.countryCode || 'USA',
    status: entity.registrationStatus === 'A' ? 'Active' : 'Inactive',
    expirationDate: entity.registrationExpirationDate,
    naics: entity.naicsCode,
    businessTypes: entity.businessTypes,
    certifications: entity.sbaBusinessTypes,
  }));

  return NextResponse.json({
    entities: publicEntities,
    totalRecords: result.totalRecords,
    query: cageCode ? { type: 'cageCode', value: cageCode } : { type: 'companyName', value: companyName },
  });
}
