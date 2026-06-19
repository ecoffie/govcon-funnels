import { beforeEach, describe, expect, it, vi } from 'vitest';

const utilsMocks = vi.hoisted(() => ({
  makeSAMRequest: vi.fn(),
}));

vi.mock('../../utils', () => ({
  SAM_API_CONFIGS: {
    entity: {
      apiType: 'entity',
      baseUrl: 'https://api.sam.gov/entity-information/v3',
      apiKey: 'test-key',
      cacheTTLHours: 24,
    },
  },
  makeSAMRequest: utilsMocks.makeSAMRequest,
  validateCAGECode: (code: string) => /^[A-Z0-9]{5}$/i.test(code),
}));

import { searchEntities } from '../../entity-api';

describe('searchEntities error handling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('propagates upstream SAM errors instead of converting them to empty results', async () => {
    const samError = {
      status: 503,
      message: 'SAM outage',
      retryable: true,
      fallbackAvailable: true,
    };
    utilsMocks.makeSAMRequest.mockResolvedValue({
      data: null,
      error: samError,
      fromCache: false,
    });

    const result = await searchEntities({ cageCode: '12345', size: 1 });

    expect(result.entities).toEqual([]);
    expect(result.totalCount).toBe(0);
    expect(result.error).toBe(samError);
  });
});
