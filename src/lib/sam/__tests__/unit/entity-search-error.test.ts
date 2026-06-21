import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { SAMError } from '../../utils';

vi.mock('../../utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../utils')>();
  return {
    ...actual,
    makeSAMRequest: vi.fn(),
  };
});

import { makeSAMRequest } from '../../utils';
import { searchEntities } from '../../entity-api';

describe('searchEntities error handling', () => {
  beforeEach(() => {
    vi.mocked(makeSAMRequest).mockReset();
  });

  it('propagates SAM upstream errors instead of returning a false empty success', async () => {
    const error: SAMError = {
      status: 503,
      message: 'SAM.gov unavailable',
      retryable: true,
      fallbackAvailable: false,
    };

    vi.mocked(makeSAMRequest).mockResolvedValue({
      data: null,
      error,
      fromCache: false,
    });

    const result = await searchEntities({ cageCode: '12345', size: 1 });

    expect(result).toMatchObject({
      entities: [],
      totalCount: 0,
      hasMore: false,
      fromCache: false,
      error,
    });
  });
});
