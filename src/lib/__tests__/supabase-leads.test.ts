import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const order = vi.fn();
  const eq = vi.fn(() => ({ order }));
  const select = vi.fn(() => ({ eq }));
  const insert = vi.fn();
  const from = vi.fn(() => ({ select, insert }));
  const createClient = vi.fn(() => ({ from }));
  return { createClient, from, select, eq, order, insert };
});

vi.mock('@supabase/supabase-js', () => ({
  createClient: mocks.createClient,
}));

async function importSupabaseLeads() {
  vi.resetModules();
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';
  return import('../supabase-leads');
}

describe('supabase lead helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.order.mockReset();
  });

  it('returns an existing email first signup position after later duplicate submissions', async () => {
    const rows = [
      { email: 'early@example.com' },
      ...Array.from({ length: 150 }, (_, index) => ({ email: `later-${index}@example.com` })),
      { email: ' Early@Example.com ' },
    ];
    mocks.order.mockResolvedValue({ data: rows, error: null });

    const { getLeadPositionBySource, MINDY_LAUNCH_ZOOM_CAP } = await importSupabaseLeads();

    const position = await getLeadPositionBySource('mindy-launch', 'early@example.com');

    expect(position).toBe(1);
    expect(position! <= MINDY_LAUNCH_ZOOM_CAP).toBe(true);
    expect(mocks.from).toHaveBeenCalledWith('funnel_leads');
    expect(mocks.select).toHaveBeenCalledWith('email,created_at');
    expect(mocks.eq).toHaveBeenCalledWith('source', 'mindy-launch');
    expect(mocks.order).toHaveBeenCalledWith('created_at', { ascending: true });
  });

  it('counts distinct emails by source', async () => {
    mocks.order.mockResolvedValue({
      data: [
        { email: 'one@example.com' },
        { email: ' One@Example.com ' },
        { email: 'two@example.com' },
        { email: '' },
      ],
      error: null,
    });

    const { countLeadsBySource } = await importSupabaseLeads();

    await expect(countLeadsBySource('mindy-launch')).resolves.toBe(2);
  });

  it('returns null when the submitted email is not persisted', async () => {
    mocks.order.mockResolvedValue({
      data: [{ email: 'someone-else@example.com' }],
      error: null,
    });

    const { getLeadPositionBySource } = await importSupabaseLeads();

    await expect(getLeadPositionBySource('mindy-launch', 'missing@example.com')).resolves.toBeNull();
  });
});
