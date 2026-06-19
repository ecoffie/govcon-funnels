import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { searchEntities, validateCAGECode } from '@/lib/sam';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn(),
}));

const mockedSearchEntities = vi.mocked(searchEntities);
const mockedValidateCAGECode = vi.mocked(validateCAGECode);

function makeRequest(path: string, ip: string) {
  return new NextRequest(`https://govcongiants.com${path}`, {
    headers: { 'x-forwarded-for': ip },
  });
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    mockedSearchEntities.mockReset();
    mockedValidateCAGECode.mockImplementation((code) => /^[A-Z0-9]{5}$/.test(code));
  });

  it('returns 503 when SAM lookup fails instead of masking it as no results', async () => {
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

    const response = await GET(makeRequest('/api/cage-lookup?cageCode=17038', '192.0.2.10'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
  });

  it('returns 429 when SAM rate limits the lookup', async () => {
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
        retryable: true,
        fallbackAvailable: true,
      },
    });

    const response = await GET(makeRequest('/api/cage-lookup?cageCode=17038', '192.0.2.11'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toContain('rate limit');
  });

  it('keeps legitimate no-match searches as successful empty responses', async () => {
    mockedSearchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(makeRequest('/api/cage-lookup?cageCode=ZZZZZ', '192.0.2.12'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      entities: [],
      totalRecords: 0,
      query: { type: 'cageCode', value: 'ZZZZZ' },
      fromCache: false,
    });
  });
});
