import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { searchEntities } from '@/lib/sam';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: (code: string) => /^[A-Z0-9]{5}$/i.test(code),
}));

const mockedSearchEntities = vi.mocked(searchEntities);

function requestFor(path: string, ip = '203.0.113.10') {
  return new NextRequest(`https://govcongiants.org${path}`, {
    headers: {
      'x-forwarded-for': ip,
    },
  });
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 503 when SAM.gov search fails instead of reporting no results', async () => {
    mockedSearchEntities.mockResolvedValue({
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

    const response = await GET(requestFor('/api/cage-lookup?companyName=Acme'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toBe('SAM.gov lookup is temporarily unavailable. Please try again later.');
  });

  it('returns 429 when SAM.gov rate limits the lookup', async () => {
    mockedSearchEntities.mockResolvedValue({
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

    const response = await GET(requestFor('/api/cage-lookup?cageCode=1ABC2'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toBe('SAM.gov API rate limit exceeded. Please try again later.');
  });

  it('preserves 200 empty response for legitimate no-match searches', async () => {
    mockedSearchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(requestFor('/api/cage-lookup?companyName=NoSuchCompany'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.totalRecords).toBe(0);
  });
});
