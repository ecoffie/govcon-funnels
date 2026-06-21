import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn((code: string) => /^[A-Z0-9]{5}$/i.test(code)),
}));

import { searchEntities } from '@/lib/sam';
import { GET } from '../route';

let requestCounter = 0;

function createRequest(url: string) {
  requestCounter += 1;
  return new NextRequest(url, {
    headers: {
      'x-forwarded-for': `203.0.113.${requestCounter}`,
    },
  });
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    vi.mocked(searchEntities).mockReset();
  });

  it('returns 503 when SAM search fails upstream', async () => {
    vi.mocked(searchEntities).mockResolvedValue({
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
        fallbackAvailable: false,
      },
    });

    const response = await GET(createRequest('https://example.com/api/cage-lookup?cageCode=12345'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toBe('SAM.gov lookup is temporarily unavailable. Please try again later.');
    expect(body.detail).toBe('SAM.gov unavailable');
  });

  it('returns 429 when SAM search is rate limited', async () => {
    vi.mocked(searchEntities).mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 429,
        message: 'Rate limit exceeded',
        retryable: true,
        fallbackAvailable: true,
      },
    });

    const response = await GET(createRequest('https://example.com/api/cage-lookup?cageCode=12345'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toBe('SAM.gov rate limit exceeded. Please try again later.');
  });

  it('keeps a successful empty SAM search as a 200 no-results response', async () => {
    vi.mocked(searchEntities).mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(createRequest('https://example.com/api/cage-lookup?companyName=DefinitelyNoMatch'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      entities: [],
      totalRecords: 0,
      query: { type: 'companyName', value: 'DefinitelyNoMatch' },
      fromCache: false,
    });
  });
});
