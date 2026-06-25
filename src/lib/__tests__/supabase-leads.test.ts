import { afterEach, describe, expect, it, vi } from 'vitest';

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
  vi.resetModules();
  vi.doUnmock('@supabase/supabase-js');
});

describe('recentDuplicateExists', () => {
  it('escapes ILIKE wildcards before checking email duplicates', async () => {
    let query: {
      select: ReturnType<typeof vi.fn>;
      ilike: ReturnType<typeof vi.fn>;
      gte: ReturnType<typeof vi.fn>;
      eq: ReturnType<typeof vi.fn>;
    };
    query = {
      select: vi.fn(() => query),
      ilike: vi.fn(() => query),
      gte: vi.fn(() => query),
      eq: vi.fn(async () => ({ count: 0, error: null })),
    };

    const client = {
      from: vi.fn(() => query),
    };

    vi.doMock('@supabase/supabase-js', () => ({
      createClient: vi.fn(() => client),
    }));

    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-key';

    const { recentDuplicateExists } = await import('@/lib/supabase-leads');
    await recentDuplicateExists('A_B%C\\D@example.com', 'mindy-launch');

    expect(query.ilike).toHaveBeenCalledWith('email', 'a\\_b\\%c\\\\d@example.com');
  });
});
