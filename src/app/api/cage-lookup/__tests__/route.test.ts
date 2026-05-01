import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { searchEntities } from '@/lib/sam';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: (code: string) => /^[A-Z0-9]{5}$/i.test(code),
}));

const mockSearchEntities = vi.mocked(searchEntities);

function createRequest(path: string, ip = '203.0.113.10') {
  return new NextRequest(`https://example.com${path}`, {
    headers: {
      'x-forwarded-for': ip,
    },
  });
}

describe('/api/cage-lookup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 503 when SAM lookup fails upstream', async () => {
    mockSearchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 500,
        message: 'SAM.gov unavailable',
        retryable: true,
        fallbackAvailable: true,
      },
    });

    const response = await GET(createRequest('/api/cage-lookup?cageCode=12345'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('SAM.gov lookup is temporarily unavailable');
  });

  it('returns 429 when SAM lookup is rate limited', async () => {
    mockSearchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 429,
        message: 'SAM.gov API rate limit exceeded',
        retryable: false,
        fallbackAvailable: false,
      },
    });

    const response = await GET(createRequest('/api/cage-lookup?cageCode=12345', '203.0.113.11'));

    expect(response.status).toBe(429);
  });

  it('preserves 200 empty response for legitimate no-match searches', async () => {
    mockSearchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(createRequest('/api/cage-lookup?cageCode=12345', '203.0.113.12'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.totalRecords).toBe(0);
  });
});
