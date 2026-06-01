import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const samMocks = vi.hoisted(() => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn(),
}));

vi.mock('@/lib/sam', () => samMocks);

import { GET } from '../route';

function requestFor(query: string, ip: string): NextRequest {
  return new NextRequest(`https://govcongiants.com/api/cage-lookup?${query}`, {
    headers: { 'x-forwarded-for': ip },
  });
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    samMocks.searchEntities.mockReset();
    samMocks.validateCAGECode.mockReturnValue(true);
  });

  it('returns 503 when SAM search fails upstream', async () => {
    samMocks.searchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 1,
      hasMore: false,
      fromCache: false,
      error: {
        status: 503,
        message: 'SAM unavailable',
        retryable: true,
        fallbackAvailable: true,
      },
    });

    const response = await GET(requestFor('cageCode=12345&limit=1', '203.0.113.10'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
    expect(body.detail).toBe('SAM unavailable');
  });

  it('returns 429 when SAM reports rate limiting', async () => {
    samMocks.searchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 1,
      hasMore: false,
      fromCache: false,
      error: {
        status: 429,
        message: 'Rate limit exceeded',
        retryable: false,
        fallbackAvailable: true,
      },
    });

    const response = await GET(requestFor('cageCode=12345&limit=1', '203.0.113.11'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toContain('rate limit');
    expect(body.detail).toBe('Rate limit exceeded');
  });

  it('still returns 200 for legitimate no-match searches', async () => {
    samMocks.searchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(requestFor('companyName=DefinitelyNoMatch', '203.0.113.12'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      entities: [],
      totalRecords: 0,
      note: 'No results found.',
    });
  });
});
