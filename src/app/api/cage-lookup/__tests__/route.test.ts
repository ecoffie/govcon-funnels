import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { searchEntities } from '@/lib/sam';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn(() => true),
}));

function request(query: string) {
  return new NextRequest(`http://localhost/api/cage-lookup?${query}`, {
    headers: { 'x-forwarded-for': `203.0.113.${Math.floor(Math.random() * 200) + 1}` },
  });
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/cage-lookup', () => {
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
        message: 'SAM unavailable',
        retryable: true,
        fallbackAvailable: false,
      },
    });

    const res = await GET(request('companyName=Acme'));
    const body = await res.json();

    expect(res.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
  });

  it('returns 429 when SAM is rate limited', async () => {
    vi.mocked(searchEntities).mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 429,
        message: 'rate limited',
        retryable: false,
        fallbackAvailable: false,
      },
    });

    const res = await GET(request('companyName=Acme'));

    expect(res.status).toBe(429);
  });

  it('still returns 200 for legitimate no-result searches', async () => {
    vi.mocked(searchEntities).mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const res = await GET(request('companyName=DefinitelyNoMatch'));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.note).toBe('No results found.');
  });
});
