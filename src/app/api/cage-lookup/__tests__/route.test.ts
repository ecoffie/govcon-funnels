import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { searchEntities } from '@/lib/sam';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn(() => true),
}));

function request(path: string, ip: string) {
  return new NextRequest(`https://govcongiants.com${path}`, {
    headers: { 'x-forwarded-for': ip },
  });
}

describe('cage lookup route', () => {
  beforeEach(() => {
    vi.mocked(searchEntities).mockReset();
  });

  it('returns 503 when SAM entity search fails upstream', async () => {
    vi.mocked(searchEntities).mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 1,
      hasMore: false,
      fromCache: false,
      error: { status: 503, message: 'SAM outage', retryable: true, fallbackAvailable: true },
    });

    const response = await GET(request('/api/cage-lookup?cageCode=17038&limit=1', '192.0.2.1'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
    expect(body.details).toBe('SAM outage');
  });

  it('returns 429 when SAM entity search is rate limited', async () => {
    vi.mocked(searchEntities).mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 1,
      hasMore: false,
      fromCache: false,
      error: { status: 429, message: 'Rate limit', retryable: false, fallbackAvailable: true },
    });

    const response = await GET(request('/api/cage-lookup?cageCode=17038&limit=1', '192.0.2.2'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toContain('rate limit');
  });

  it('keeps legitimate empty SAM results as a successful no-result response', async () => {
    vi.mocked(searchEntities).mockResolvedValueOnce({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 1,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(request('/api/cage-lookup?cageCode=ZZZZZ&limit=1', '192.0.2.3'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.note).toBe('No results found.');
  });
});
