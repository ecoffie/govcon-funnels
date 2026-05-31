import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchEntities } from '../../entity-api';
import { makeSAMRequest } from '../../utils';

vi.mock('../../utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../utils')>();
  return {
    ...actual,
    makeSAMRequest: vi.fn(),
  };
});

const mockedMakeSAMRequest = vi.mocked(makeSAMRequest);

describe('Entity search error handling', () => {
  beforeEach(() => {
    mockedMakeSAMRequest.mockReset();
  });

  it('propagates upstream SAM errors instead of returning a no-results success', async () => {
    mockedMakeSAMRequest.mockResolvedValueOnce({
      data: null,
      fromCache: false,
      error: {
        status: 503,
        message: 'SAM unavailable',
        retryable: true,
        fallbackAvailable: true,
      },
    });

    const result = await searchEntities({ cageCode: '17038', size: 1 });

    expect(result.entities).toEqual([]);
    expect(result.totalCount).toBe(0);
    expect(result.error).toMatchObject({
      status: 503,
      message: 'SAM unavailable',
    });
  });
});
