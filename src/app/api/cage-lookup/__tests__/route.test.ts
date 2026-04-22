import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { searchEntities } from '@/lib/sam';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn(() => true),
}));

describe('/api/cage-lookup route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 503 when SAM upstream fails', async () => {
    vi.mocked(searchEntities).mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 500,
        message: 'SAM upstream unavailable',
        retryable: true,
        fallbackAvailable: false,
      },
    });

    const request = new NextRequest('https://example.com/api/cage-lookup?cageCode=17038', {
      headers: { 'x-forwarded-for': '10.0.0.1' },
    });

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toContain('SAM upstream unavailable');
    expect(body.retryable).toBe(true);
  });

  it('returns 429 when SAM rate limits', async () => {
    vi.mocked(searchEntities).mockResolvedValue({
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

    const request = new NextRequest('https://example.com/api/cage-lookup?cageCode=17038', {
      headers: { 'x-forwarded-for': '10.0.0.2' },
    });

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toContain('Rate limit exceeded');
    expect(body.retryable).toBe(true);
  });

  it('returns empty success response for legitimate no-results', async () => {
    vi.mocked(searchEntities).mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const request = new NextRequest('https://example.com/api/cage-lookup?companyName=Nope', {
      headers: { 'x-forwarded-for': '10.0.0.3' },
    });

    const response = await GET(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.totalRecords).toBe(0);
    expect(body.error).toBeUndefined();
  });
});
