import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { searchEntities } from '@/lib/sam';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: (code: string) => /^[A-Z0-9]{5}$/i.test(code),
}));

const mockSearchEntities = vi.mocked(searchEntities);

function buildRequest(search: string, ip: string): NextRequest {
  return new NextRequest(`https://govcongiants.com/api/cage-lookup?${search}`, {
    headers: {
      'x-forwarded-for': ip,
    },
  });
}

describe('GET /api/cage-lookup', () => {
  beforeEach(() => {
    mockSearchEntities.mockReset();
  });

  it('surfaces SAM.gov outages instead of returning empty success results', async () => {
    mockSearchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 503,
        message: 'Service unavailable',
        retryable: true,
        fallbackAvailable: false,
      },
    });

    const response = await GET(buildRequest('cageCode=1ABC2', '203.0.113.10'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('temporarily unavailable');
    expect(body.details).toBe('Service unavailable');
  });

  it('returns a real 429 when SAM.gov is rate limited', async () => {
    mockSearchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 429,
        message: 'Daily limit exceeded',
        retryable: false,
        fallbackAvailable: false,
      },
    });

    const response = await GET(buildRequest('cageCode=1ABC2', '203.0.113.11'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toContain('daily limit');
  });
});
