import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn(() => true),
}));

import { GET } from '../route';
import { searchEntities } from '@/lib/sam';

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    vi.mocked(searchEntities).mockReset();
  });

  it('returns 503 when SAM lookup fails upstream', async () => {
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
        fallbackAvailable: false,
      },
    });

    const request = new NextRequest('https://govcongiants.com/api/cage-lookup?cageCode=17038');
    const response = await GET(request);
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
        message: 'Rate limited',
        retryable: false,
        fallbackAvailable: false,
      },
    });

    const request = new NextRequest('https://govcongiants.com/api/cage-lookup?cageCode=17038');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toContain('rate limit');
    expect(body.retryAfter).toBe(3600);
  });

  it('keeps legitimate no-result searches as a 200 response', async () => {
    vi.mocked(searchEntities).mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 1,
      hasMore: false,
      fromCache: false,
    });

    const request = new NextRequest('https://govcongiants.com/api/cage-lookup?companyName=NOPE');
    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.note).toBe('No results found.');
  });
});
