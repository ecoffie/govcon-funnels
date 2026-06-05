import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const samMocks = vi.hoisted(() => ({
  searchEntities: vi.fn(),
}));

vi.mock('@/lib/sam', () => ({
  searchEntities: samMocks.searchEntities,
  validateCAGECode: (code: string) => /^[A-Z0-9]{5}$/i.test(code),
}));

import { GET } from '../route';

function request(query: string) {
  return new NextRequest(`http://localhost/api/cage-lookup?${query}`, {
    headers: { 'x-forwarded-for': `198.51.100.${Math.floor(Math.random() * 200) + 1}` },
  });
}

describe('CAGE lookup route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 503 when SAM lookup is unavailable', async () => {
    samMocks.searchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 500,
        message: 'SAM unavailable',
        retryable: true,
        fallbackAvailable: true,
      },
    });

    const response = await GET(request('cageCode=12345'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
  });

  it('returns 429 when SAM rate limits the lookup', async () => {
    samMocks.searchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 429,
        message: 'Too many requests',
        retryable: true,
        fallbackAvailable: true,
      },
    });

    const response = await GET(request('cageCode=12345'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toContain('rate limit');
  });

  it('keeps legitimate no-result searches as HTTP 200', async () => {
    samMocks.searchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(request('companyName=DefinitelyMissingCompany'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.note).toBe('No results found.');
  });
});
