import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';

const searchEntitiesMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/sam', () => ({
  searchEntities: searchEntitiesMock,
  validateCAGECode: (code: string) => /^[A-Z0-9]{5}$/i.test(code),
}));

import { GET } from '../route';

function request(url: string, ip: string): NextRequest {
  return new NextRequest(url, {
    headers: {
      'x-forwarded-for': ip,
    },
  });
}

describe('/api/cage-lookup', () => {
  it('returns 503 when SAM lookup fails upstream', async () => {
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
        fallbackAvailable: false,
      },
    });

    const response = await GET(request('https://govcongiants.com/api/cage-lookup?cageCode=12345', '203.0.113.10'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('SAM.gov lookup');
  });

  it('returns 429 when SAM lookup is rate limited upstream', async () => {
    searchEntitiesMock.mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 429,
        message: 'SAM rate limited',
        retryable: false,
        fallbackAvailable: false,
      },
    });

    const response = await GET(request('https://govcongiants.com/api/cage-lookup?cageCode=12345', '203.0.113.11'));

    expect(response.status).toBe(429);
  });

  it('still returns 200 for a legitimate empty search result', async () => {
    searchEntitiesMock.mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(request('https://govcongiants.com/api/cage-lookup?companyName=NoSuchCompany', '203.0.113.12'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.totalRecords).toBe(0);
    expect(body.note).toBeUndefined();
  });
});
