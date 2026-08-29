import { readFileSync } from 'node:fs';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: mocks.createClient,
}));

function makeQueryResult(result: { count: number | null; error: { message: string } | null }) {
  const query: Record<string, ReturnType<typeof vi.fn>> = {};
  query.select = vi.fn(() => query);
  query.ilike = vi.fn(() => query);
  query.gte = vi.fn(() => query);
  query.eq = vi.fn(() => query);
  query.then = vi.fn((resolve, reject) => Promise.resolve(result).then(resolve, reject));
  return query;
}

describe('lead dedupe safeguards', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-key';
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  });

  it('escapes SQL LIKE wildcards before checking for recent duplicate emails', async () => {
    const query = makeQueryResult({ count: 0, error: null });
    mocks.createClient.mockReturnValue({ from: vi.fn(() => query) });

    const { recentDuplicateExists } = await import('../supabase-leads');

    await recentDuplicateExists('John_Doe%\\Smith@Example.com', 'hubzone-webinar');

    expect(query.ilike).toHaveBeenCalledWith(
      'email',
      'john\\_doe\\%\\\\smith@example.com'
    );
    expect(query.eq).toHaveBeenCalledWith('source', 'hubzone-webinar');
  });

  it('keeps the Supabase migration on immutable index expressions', () => {
    const migration = readFileSync(
      path.resolve(process.cwd(), 'supabase/migrations/20260620_funnel_leads_dedup.sql'),
      'utf8'
    );

    expect(migration).not.toMatch(/GENERATED\s+ALWAYS/i);
    expect(migration).not.toMatch(/to_char\s*\(/i);
    expect(migration).toContain("date_trunc('minute', created_at AT TIME ZONE 'UTC')");
    expect(migration).toMatch(/WHERE\s+dedup_enforced/i);
  });
});
