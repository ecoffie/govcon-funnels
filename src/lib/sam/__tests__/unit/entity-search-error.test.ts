import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { searchEntities } from '../../entity-api';

const originalEnv = { ...process.env };

beforeEach(() => {
  process.env = {
    ...originalEnv,
    SAM_ENTITY_API_KEY: 'entity-key',
  };
  delete process.env.SAM_API_KEY_BACKUP;
  vi.mocked(fetch).mockReset();
});

afterEach(() => {
  process.env = { ...originalEnv };
});

describe('searchEntities error handling', () => {
  it('propagates upstream SAM failures instead of returning success-shaped empty results', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'SAM unavailable' }), { status: 503 })
    );

    const result = await searchEntities({ legalBusinessName: 'Acme', size: 1 });

    expect(result.entities).toEqual([]);
    expect(result.totalCount).toBe(0);
    expect(result.error?.status).toBe(503);
    expect(result.error?.message).toBe('SAM unavailable');
  });
});
