import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../utils')>();
  return {
    ...actual,
    makeSAMRequest: vi.fn(),
  };
});

import { searchEntities } from '../../entity-api';
import { makeSAMRequest } from '../../utils';

describe('searchEntities error handling', () => {
  beforeEach(() => {
    vi.mocked(makeSAMRequest).mockReset();
  });

  it('propagates SAM upstream errors instead of returning a success-shaped empty result', async () => {
    const upstreamError = {
      status: 503,
      message: 'SAM unavailable',
      retryable: true,
      fallbackAvailable: false,
    };
    vi.mocked(makeSAMRequest).mockResolvedValueOnce({
      data: null,
      error: upstreamError,
      fromCache: false,
    });

    const result = await searchEntities({ cageCode: '17038', size: 1 });

    expect(result.entities).toEqual([]);
    expect(result.totalCount).toBe(0);
    expect(result.fromCache).toBe(false);
    expect(result.error).toBe(upstreamError);
  });
});
