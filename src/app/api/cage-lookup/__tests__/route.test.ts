import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { searchEntities } from '@/lib/sam';
import { GET } from '../route';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn((code: string) => /^[A-Z0-9]{5}$/i.test(code)),
}));

const searchEntitiesMock = vi.mocked(searchEntities);

function createRequest(query: string, ip: string) {
  return new NextRequest(`https://example.test/api/cage-lookup?${query}`, {
    headers: { 'x-forwarded-for': ip },
  });
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    searchEntitiesMock.mockReset();
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

    const response = await GET(createRequest('cageCode=ABC12', '203.0.113.10'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toBe('SAM.gov API is temporarily unavailable. Please try again later.');
    expect(body.details).toBe('SAM unavailable');
  });

  it('returns 429 when SAM entity search reports rate limiting', async () => {
    searchEntitiesMock.mockResolvedValueOnce({
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

    const response = await GET(createRequest('cageCode=ABC12', '203.0.113.11'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toBe('SAM.gov API rate limit exceeded. Please try again later.');
    expect(body.details).toBe('Rate limit exceeded');
  });

  it('preserves 200 responses for legitimate no-match searches', async () => {
    searchEntitiesMock.mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(createRequest('cageCode=ABC12', '203.0.113.12'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.totalRecords).toBe(0);
    expect(body.note).toBe('No results found.');
  });
});
