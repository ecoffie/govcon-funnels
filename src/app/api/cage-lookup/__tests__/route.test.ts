import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { searchEntities, validateCAGECode } from '@/lib/sam';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn(),
}));

const mockedSearchEntities = vi.mocked(searchEntities);
const mockedValidateCAGECode = vi.mocked(validateCAGECode);

function requestFor(query: string, ip: string): NextRequest {
  return new NextRequest(`https://govcongiants.com/api/cage-lookup?${query}`, {
    headers: { 'x-forwarded-for': ip },
  });
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    mockedSearchEntities.mockReset();
    mockedValidateCAGECode.mockReset();
    mockedValidateCAGECode.mockReturnValue(true);
  });

  it('returns 503 when SAM search fails instead of masking it as no results', async () => {
    mockedSearchEntities.mockResolvedValueOnce({
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

    const response = await GET(requestFor('cageCode=17038&limit=1', '203.0.113.10'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
    expect(body.detail).toBe('SAM unavailable');
  });

  it('returns 429 when SAM reports rate limiting', async () => {
    mockedSearchEntities.mockResolvedValueOnce({
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

    const response = await GET(requestFor('cageCode=17038&limit=1', '203.0.113.11'));

    expect(response.status).toBe(429);
  });

  it('keeps legitimate no-result searches as HTTP 200', async () => {
    mockedSearchEntities.mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 1,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(requestFor('cageCode=17038&limit=1', '203.0.113.12'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body).not.toHaveProperty('note');
  });
});
