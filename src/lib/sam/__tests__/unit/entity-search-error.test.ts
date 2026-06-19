import { describe, it, expect, vi, beforeEach } from 'vitest';

const utilsMocks = vi.hoisted(() => ({
  makeSAMRequest: vi.fn(),
}));

vi.mock('../../utils', async () => {
  const actual = await vi.importActual<typeof import('../../utils')>('../../utils');
  return {
    ...actual,
    makeSAMRequest: utilsMocks.makeSAMRequest,
  };
});

import { searchEntities } from '../../entity-api';

describe('searchEntities error propagation', () => {
  beforeEach(() => {
    utilsMocks.makeSAMRequest.mockReset();
  });

  it('returns upstream SAM errors instead of converting them to no results', async () => {
    const upstreamError = {
      status: 503,
      message: 'SAM unavailable',
      retryable: true,
      fallbackAvailable: true,
    };
    utilsMocks.makeSAMRequest.mockResolvedValue({
      data: null,
      error: upstreamError,
      fromCache: false,
    });

    const result = await searchEntities({ cageCode: '12345', size: 1 });

    expect(result).toMatchObject({
      entities: [],
      totalCount: 0,
      hasMore: false,
      fromCache: false,
      error: upstreamError,
    });
  });
});
