import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import type { SAMError } from '@/lib/sam';

const searchEntitiesMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/sam', () => ({
  searchEntities: searchEntitiesMock,
  validateCAGECode: (code: string) => /^[A-Z0-9]{5}$/i.test(code),
}));

import { GET } from '../route';

function requestFor(query: string): NextRequest {
  return new NextRequest(`https://govcongiants.org/api/cage-lookup${query}`, {
    headers: {
      'x-forwarded-for': `203.0.113.${Math.floor(Math.random() * 200) + 1}`,
    },
  });
}

function upstreamFailure(status: number): SAMError {
  return {
    status,
    message: status === 429 ? 'Too many requests' : 'SAM unavailable',
    retryable: true,
    fallbackAvailable: true,
  };
}

describe('/api/cage-lookup', () => {
  beforeEach(() => {
    searchEntitiesMock.mockReset();
  });

  it('returns 503 when SAM lookup fails instead of masking outage as no results', async () => {
    searchEntitiesMock.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: upstreamFailure(500),
    });

    const response = await GET(requestFor('?cageCode=17038'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
    expect(searchEntitiesMock).toHaveBeenCalledWith({
      cageCode: '17038',
      legalBusinessName: undefined,
      size: 10,
    });
  });

  it('returns 429 when SAM reports rate limiting', async () => {
    searchEntitiesMock.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: upstreamFailure(429),
    });

    const response = await GET(requestFor('?companyName=Booz'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toContain('rate limit');
  });

  it('preserves 200 empty response for legitimate no-match searches', async () => {
    searchEntitiesMock.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(requestFor('?cageCode=ZZZZZ'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      entities: [],
      totalRecords: 0,
      fromCache: false,
    });
  });
});
