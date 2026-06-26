import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const query = {
    select: vi.fn(),
    ilike: vi.fn(),
    gte: vi.fn(),
    eq: vi.fn(),
  };
  return {
    createClient: vi.fn(),
    from: vi.fn(),
    query,
  };
});

vi.mock('@supabase/supabase-js', () => ({
  createClient: mocks.createClient,
}));

describe('supabase lead duplicate checks', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role';

    mocks.query.select.mockReturnValue(mocks.query);
    mocks.query.ilike.mockReturnValue(mocks.query);
    mocks.query.gte.mockReturnValue(mocks.query);
    mocks.query.eq.mockResolvedValue({ count: 0, error: null });
    mocks.from.mockReturnValue(mocks.query);
    mocks.createClient.mockReturnValue({ from: mocks.from });
  });

  it('escapes Postgres LIKE wildcards before checking for recent duplicates', async () => {
    const { recentDuplicateExists } = await import('../supabase-leads');

    await recentDuplicateExists('A_B%\\C@example.com', 'mindy-launch');

    expect(mocks.query.ilike).toHaveBeenCalledWith('email', 'a\\_b\\%\\\\c@example.com');
    expect(mocks.query.eq).toHaveBeenCalledWith('source', 'mindy-launch');
  });
});
