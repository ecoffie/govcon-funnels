import { describe, it, expect, vi, beforeEach } from 'vitest';

const makeSAMRequestMock = vi.hoisted(() => vi.fn());

vi.mock('../../utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../utils')>();
  return {
    ...actual,
    makeSAMRequest: makeSAMRequestMock,
  };
});

import { searchEntities } from '../../entity-api';

describe('searchEntities error handling', () => {
  beforeEach(() => {
    makeSAMRequestMock.mockReset();
  });

  it('propagates SAM.gov upstream errors instead of returning a false empty success', async () => {
    const samError = {
      status: 503,
      message: 'SAM.gov unavailable',
      retryable: true,
      fallbackAvailable: true,
    };

    makeSAMRequestMock.mockResolvedValueOnce({
      data: null,
      error: samError,
      fromCache: false,
    });

    const result = await searchEntities({ cageCode: '17038', size: 1 });

    expect(result).toEqual({
      entities: [],
      totalCount: 0,
      page: 1,
      pageSize: 1,
      hasMore: false,
      fromCache: false,
      error: samError,
    });
  });
});
