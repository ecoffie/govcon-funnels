import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/sam', () => ({
  validateCAGECode: (code: string) => /^[A-Z0-9]{5}$/i.test(code),
  searchEntities: vi.fn(),
}));

import { searchEntities } from '@/lib/sam';
import { GET } from '../route';

const searchEntitiesMock = vi.mocked(searchEntities);

function request(url: string, ip: string) {
  return new NextRequest(url, {
    headers: {
      'x-forwarded-for': ip,
    },
  });
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 503 when SAM lookup fails upstream', async () => {
    searchEntitiesMock.mockResolvedValueOnce({
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

    const response = await GET(request('https://govcongiants.com/api/cage-lookup?cageCode=17038&limit=1', '198.51.100.10'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
  });

  it('returns 429 when SAM lookup is rate limited', async () => {
    searchEntitiesMock.mockResolvedValueOnce({
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

    const response = await GET(request('https://govcongiants.com/api/cage-lookup?cageCode=17038&limit=1', '198.51.100.11'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toContain('rate limit');
  });

  it('preserves 200 empty results for legitimate no-match searches', async () => {
    searchEntitiesMock.mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 1,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(request('https://govcongiants.com/api/cage-lookup?cageCode=17038&limit=1', '198.51.100.12'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.totalRecords).toBe(0);
    expect(body.note).toBeUndefined();
  });
});
