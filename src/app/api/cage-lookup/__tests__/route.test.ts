import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from '../route';
import { searchEntities } from '@/lib/sam';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn((code: string) => /^[A-Z0-9]{5}$/i.test(code)),
}));

const mockedSearchEntities = vi.mocked(searchEntities);

function request(query: string, ip: string) {
  return new NextRequest(`https://example.com/api/cage-lookup?${query}`, {
    headers: { 'x-forwarded-for': ip },
  });
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    mockedSearchEntities.mockReset();
  });

  it('returns 503 when SAM search reports an upstream outage', async () => {
    mockedSearchEntities.mockResolvedValue({
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

    const response = await GET(request('cageCode=17038&limit=1', '203.0.113.10'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toBe('SAM.gov lookup temporarily unavailable');
    expect(body.detail).toBe('SAM unavailable');
  });

  it('returns 429 when SAM search reports rate limiting', async () => {
    mockedSearchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 1,
      hasMore: false,
      fromCache: false,
      error: {
        status: 429,
        message: 'SAM rate limit exceeded',
        retryable: false,
        fallbackAvailable: false,
      },
    });

    const response = await GET(request('cageCode=17038&limit=1', '203.0.113.11'));

    expect(response.status).toBe(429);
  });

  it('preserves HTTP 200 for legitimate no-result searches', async () => {
    mockedSearchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 1,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(request('companyName=NoSuchCompany&limit=1', '203.0.113.12'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.totalRecords).toBe(0);
    expect(body.note).toBeUndefined();
  });
});
