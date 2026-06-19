import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => ({
  searchEntities: vi.fn(),
}));

vi.mock('@/lib/sam', () => ({
  searchEntities: mocks.searchEntities,
  validateCAGECode: (code: string) => /^[A-Z0-9]{5}$/i.test(code),
}));

import { GET } from '../route';

function createRequest(query: string, ip = '203.0.113.10') {
  return new NextRequest(`http://localhost/api/cage-lookup${query}`, {
    headers: {
      'x-forwarded-for': ip,
    },
  });
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    mocks.searchEntities.mockReset();
  });

  it('returns 503 when SAM search fails upstream', async () => {
    mocks.searchEntities.mockResolvedValueOnce({
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

    const response = await GET(createRequest('?companyName=Booz', '203.0.113.11'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
  });

  it('returns 429 when SAM search is rate limited', async () => {
    mocks.searchEntities.mockResolvedValueOnce({
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

    const response = await GET(createRequest('?cageCode=17038', '203.0.113.12'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toContain('rate limit');
  });

  it('keeps legitimate empty searches as a 200 response', async () => {
    mocks.searchEntities.mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(createRequest('?companyName=NoSuchCompany', '203.0.113.13'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.totalRecords).toBe(0);
    expect(body.note).toBeUndefined();
  });
});
