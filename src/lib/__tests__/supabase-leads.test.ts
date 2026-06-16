import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createClientMock } = vi.hoisted(() => ({
  createClientMock: vi.fn(),
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: createClientMock,
}));

type LeadRow = {
  email: string | null;
};

function mockSelectRows(rows: LeadRow[]) {
  const order = vi.fn().mockResolvedValue({ data: rows, error: null });
  const eq = vi.fn(() => ({ order }));
  const select = vi.fn(() => ({ eq }));
  const from = vi.fn(() => ({ select }));

  createClientMock.mockReturnValue({ from });

  return { from, select, eq, order };
}

describe('supabase lead helpers', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-key';
  });

  it('returns the first distinct signup position for duplicate Mindy launch submissions', async () => {
    const rows = [
      { email: 'first@example.com' },
      { email: 'early@example.com' },
      ...Array.from({ length: 149 }, (_, index) => ({ email: `late-${index}@example.com` })),
      { email: ' EARLY@example.com ' },
    ];
    const supabaseQuery = mockSelectRows(rows);
    const { getLeadPositionBySource, MINDY_LAUNCH_ZOOM_CAP } = await import('../supabase-leads');

    const position = await getLeadPositionBySource('mindy-launch', 'early@example.com');

    expect(position).toBe(2);
    expect(position).toBeLessThanOrEqual(MINDY_LAUNCH_ZOOM_CAP);
    expect(supabaseQuery.select).toHaveBeenCalledWith('email,created_at');
    expect(supabaseQuery.eq).toHaveBeenCalledWith('source', 'mindy-launch');
    expect(supabaseQuery.order).toHaveBeenCalledWith('created_at', { ascending: true });
  });

  it('returns null when the submitted email is not in the persisted source rows', async () => {
    mockSelectRows([{ email: 'someone@example.com' }]);
    const { getLeadPositionBySource } = await import('../supabase-leads');

    await expect(getLeadPositionBySource('mindy-launch', 'missing@example.com')).resolves.toBeNull();
  });
});
