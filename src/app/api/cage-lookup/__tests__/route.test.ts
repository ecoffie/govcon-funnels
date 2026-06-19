import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/lib/sam', () => ({
  searchEntities: vi.fn(),
  validateCAGECode: vi.fn((code: string) => /^[A-Z0-9]{5}$/i.test(code)),
}));

import { searchEntities } from '@/lib/sam';
import { GET } from '../route';

const mockSearchEntities = vi.mocked(searchEntities);

function createRequest(url: string): NextRequest {
  return new NextRequest(url, {
    headers: {
      'x-forwarded-for': `203.0.113.${Math.floor(Math.random() * 200) + 1}`,
    },
  });
}

describe('/api/cage-lookup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 503 when SAM entity lookup fails instead of masking it as no results', async () => {
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

    const response = await GET(createRequest('https://example.com/api/cage-lookup?cageCode=12345'));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toBe('SAM.gov lookup is temporarily unavailable. Please try again later.');
    expect(body.upstreamStatus).toBe(500);
    expect(mockSearchEntities).toHaveBeenCalledWith({
      cageCode: '12345',
      legalBusinessName: undefined,
      size: 10,
    });
  });

  it('returns 429 when SAM entity lookup is rate limited', async () => {
    mockSearchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
      error: {
        status: 429,
        message: 'SAM.gov rate limit exceeded',
        retryable: true,
        fallbackAvailable: true,
      },
    });

    const response = await GET(createRequest('https://example.com/api/cage-lookup?companyName=Acme'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.upstreamStatus).toBe(429);
  });

  it('preserves empty success responses for legitimate no-match searches', async () => {
    mockSearchEntities.mockResolvedValue({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 10,
      hasMore: false,
      fromCache: false,
    });

    const response = await GET(createRequest('https://example.com/api/cage-lookup?companyName=NoSuchCompany'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.entities).toEqual([]);
    expect(body.totalRecords).toBe(0);
    expect(body.note).toBeUndefined();
  });
});
