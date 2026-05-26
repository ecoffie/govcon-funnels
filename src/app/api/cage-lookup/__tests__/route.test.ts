import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: (code: string) => /^[A-Z0-9]{5}$/i.test(code),
}));

import { GET } from '../route';
import { searchEntities } from '@/lib/sam';

function requestFor(url: string, ip = '203.0.113.10') {
  return new NextRequest(url, {
    headers: {
      'x-forwarded-for': ip,
    },
  });
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    vi.mocked(searchEntities).mockReset();
  });

  it('returns 503 when SAM lookup is unavailable', async () => {
    vi.mocked(searchEntities).mockResolvedValueOnce({
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

    const response = await GET(
      requestFor('https://govcongiants.com/api/cage-lookup?cageCode=12345&limit=1')
    );
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
  });

  it('returns 429 when SAM rate limits the lookup', async () => {
    vi.mocked(searchEntities).mockResolvedValueOnce({
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
        fallbackAvailable: false,
      },
    });

    const response = await GET(
      requestFor('https://govcongiants.com/api/cage-lookup?cageCode=12345&limit=1', '203.0.113.11')
    );

    expect(response.status).toBe(429);
  });

  it('keeps legitimate empty SAM results as a 200 response', async () => {
    vi.mocked(searchEntities).mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 1,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(
      requestFor('https://govcongiants.com/api/cage-lookup?cageCode=12345&limit=1', '203.0.113.12')
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.totalRecords).toBe(0);
    expect(body.note).toBeUndefined();
  });
});
