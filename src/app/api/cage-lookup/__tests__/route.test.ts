import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { searchEntities } from '@/lib/sam';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn((code: string) => /^[A-Z0-9]{5}$/i.test(code)),
}));

const searchEntitiesMock = vi.mocked(searchEntities);

function requestFor(query: string): NextRequest {
  return new NextRequest(`https://govcongiants.com/api/cage-lookup${query}`, {
    headers: {
      'x-forwarded-for': `203.0.113.${Math.floor(Math.random() * 200) + 1}`,
    },
  });
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 503 when SAM entity search reports an upstream outage', async () => {
    searchEntitiesMock.mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 503,
        message: 'SAM unavailable',
        retryable: true,
        fallbackAvailable: true,
      },
    });

    const response = await GET(requestFor('?cageCode=1ABC2'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
    expect(body.details).toBe('SAM unavailable');
  });

  it('returns 429 when SAM entity search reports throttling', async () => {
    searchEntitiesMock.mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 429,
        message: 'SAM rate limit exceeded',
        retryable: false,
        fallbackAvailable: true,
      },
    });

    const response = await GET(requestFor('?companyName=Acme'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toContain('rate limit');
    expect(body.details).toBe('SAM rate limit exceeded');
  });

  it('preserves 200 empty results for legitimate no-match searches', async () => {
    searchEntitiesMock.mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(requestFor('?companyName=NoSuchCompany'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.totalRecords).toBe(0);
  });
});
