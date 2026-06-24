import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { NextRequest } from 'next/server';
import { GET } from '../route';
import { searchEntities } from '@/lib/sam';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn((code: string) => /^[A-Z0-9]{5}$/i.test(code)),
}));

const mockedSearchEntities = vi.mocked(searchEntities);

function createRequest(query: string, ip: string): NextRequest {
  return {
    nextUrl: new URL(`https://govcongiants.com/api/cage-lookup?${query}`),
    headers: new Headers({ 'x-forwarded-for': ip }),
  } as unknown as NextRequest;
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    mockedSearchEntities.mockReset();
  });

  it('returns 503 when SAM.gov search fails upstream', async () => {
    mockedSearchEntities.mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 503,
        message: 'SAM.gov unavailable',
        retryable: true,
        fallbackAvailable: true,
      },
    });

    const response = await GET(createRequest('cageCode=17038', '203.0.113.10'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
    expect(body.detail).toBe('SAM.gov unavailable');
  });

  it('returns 429 when SAM.gov rate limits the search', async () => {
    mockedSearchEntities.mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 429,
        message: 'Rate limit exceeded',
        retryable: false,
        fallbackAvailable: false,
      },
    });

    const response = await GET(createRequest('companyName=Booz%20Allen', '203.0.113.11'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toContain('rate limit');
    expect(body.detail).toBe('Rate limit exceeded');
  });

  it('keeps legitimate empty searches as successful no-result responses', async () => {
    mockedSearchEntities.mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(createRequest('companyName=DefinitelyMissing', '203.0.113.12'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      entities: [],
      totalRecords: 0,
      query: { type: 'companyName', value: 'DefinitelyMissing' },
      fromCache: false,
    });
  });
});
