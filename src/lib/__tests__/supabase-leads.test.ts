import fs from 'node:fs';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: mocks.createClient,
}));

async function loadSupabaseLeads(client: unknown) {
  vi.resetModules();
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-key';
  mocks.createClient.mockReturnValue(client);
  return import('../supabase-leads');
}

afterEach(() => {
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  mocks.createClient.mockReset();
});

describe('supabase lead dedupe helpers', () => {
  it('escapes PostgREST ILIKE metacharacters before checking recent duplicates', async () => {
    const gte = vi.fn().mockResolvedValue({ count: 0, error: null });
    const ilike = vi.fn().mockReturnValue({ gte });
    const select = vi.fn().mockReturnValue({ ilike });
    const from = vi.fn().mockReturnValue({ select });
    const { recentDuplicateExists } = await loadSupabaseLeads({ from });

    await recentDuplicateExists('John_Doe%a\\b@example.com', undefined);

    expect(ilike).toHaveBeenCalledWith('email', 'john\\_doe\\%a\\\\b@example.com');
  });

  it('returns the submitted email first signup position instead of the mutable total count', async () => {
    const order = vi.fn().mockResolvedValue({
      data: [
        { email: 'first@example.com', created_at: '2026-06-20T10:00:00Z' },
        { email: 'early@example.com', created_at: '2026-06-20T10:01:00Z' },
        { email: 'first@example.com', created_at: '2026-06-20T10:02:00Z' },
        { email: 'late@example.com', created_at: '2026-06-20T10:03:00Z' },
      ],
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ order });
    const select = vi.fn().mockReturnValue({ eq });
    const from = vi.fn().mockReturnValue({ select });
    const { getLeadPositionBySource } = await loadSupabaseLeads({ from });

    await expect(getLeadPositionBySource('mindy-launch', 'EARLY@example.com')).resolves.toBe(2);
  });
});

describe('funnel lead dedupe migration', () => {
  it('uses an expression index and excludes historical duplicates from enforcement', () => {
    const migration = fs.readFileSync(
      path.join(process.cwd(), 'supabase/migrations/20260620_funnel_leads_dedup.sql'),
      'utf8'
    );

    expect(migration).toContain('dedup_enforced boolean NOT NULL DEFAULT false');
    expect(migration).toContain('ALTER COLUMN dedup_enforced SET DEFAULT true');
    expect(migration).toContain("coalesce(source, '')");
    expect(migration).toContain("date_trunc('minute', created_at AT TIME ZONE 'UTC')");
    expect(migration).toContain('WHERE dedup_enforced');
    expect(migration).not.toContain('GENERATED ALWAYS');
    expect(migration).not.toContain('to_char');
  });
});
