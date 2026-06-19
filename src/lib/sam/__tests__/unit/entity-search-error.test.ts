import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../utils', async () => {
  const actual = await vi.importActual<typeof import('../../utils')>('../../utils');

  return {
    ...actual,
    makeSAMRequest: vi.fn(),
  };
});

import { searchEntities } from '../../entity-api';
import { makeSAMRequest } from '../../utils';

const mockedMakeSAMRequest = vi.mocked(makeSAMRequest);

describe('Entity search error handling', () => {
  beforeEach(() => {
    mockedMakeSAMRequest.mockReset();
  });

  it('propagates SAM upstream errors instead of returning empty success', async () => {
    mockedMakeSAMRequest.mockResolvedValueOnce({
      data: null,
      error: {
        status: 503,
        message: 'SAM.gov unavailable',
        retryable: true,
        fallbackAvailable: true,
      },
      fromCache: false,
    });

    const result = await searchEntities({ cageCode: 'ABC12', size: 1 });

    expect(result.entities).toEqual([]);
    expect(result.totalCount).toBe(0);
    expect(result.error?.status).toBe(503);
    expect(result.error?.message).toBe('SAM.gov unavailable');
  });
});
