import { describe, expect, it, vi } from 'vitest';

vi.mock('../../utils', async () => {
  const actual = await vi.importActual<typeof import('../../utils')>('../../utils');
  return {
    ...actual,
    makeSAMRequest: vi.fn(),
  };
});

import { searchEntities } from '../../entity-api';
import { makeSAMRequest } from '../../utils';

describe('searchEntities error handling', () => {
  it('preserves upstream SAM errors instead of returning a silent empty result', async () => {
    vi.mocked(makeSAMRequest).mockResolvedValueOnce({
      data: null,
      error: {
        status: 503,
        message: 'SAM unavailable',
        retryable: true,
        fallbackAvailable: true,
      },
      fromCache: false,
    });

    const result = await searchEntities({ cageCode: '12345', size: 1 });

    expect(result.entities).toEqual([]);
    expect(result.totalCount).toBe(0);
    expect(result.error).toEqual(
      expect.objectContaining({ status: 503, message: 'SAM unavailable' })
    );
  });
});
