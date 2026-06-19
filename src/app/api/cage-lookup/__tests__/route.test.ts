import { NextRequest } from 'next/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

const { searchEntitiesMock } = vi.hoisted(() => ({
  searchEntitiesMock: vi.fn(),
}));

vi.mock('@/lib/sam', () => ({
  searchEntities: searchEntitiesMock,
  validateCAGECode: (code: string) => /^[A-Z0-9]{5}$/i.test(code),
}));

import { GET } from '../route';

function request(query: string, ip = crypto.randomUUID()) {
  return new NextRequest(`https://govcongiants.com/api/cage-lookup?${query}`, {
    headers: { 'x-forwarded-for': ip },
  });
}

describe('cage lookup route', () => {
  afterEach(() => {
    searchEntitiesMock.mockReset();
  });

  it('returns 503 when SAM lookup fails instead of masking it as no results', async () => {
    searchEntitiesMock.mockResolvedValue({
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

    const response = await GET(request('cageCode=12345'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toBe('SAM.gov lookup temporarily unavailable');
  });

  it('returns 429 when SAM rate limits lookup', async () => {
    searchEntitiesMock.mockResolvedValue({
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
        fallbackAvailable: false,
      },
    });

    const response = await GET(request('companyName=Acme'));

    expect(response.status).toBe(429);
  });

  it('preserves 200 responses for legitimate no-match searches', async () => {
    searchEntitiesMock.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(request('companyName=DefinitelyNoSuchCompany'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.totalRecords).toBe(0);
  });
});
