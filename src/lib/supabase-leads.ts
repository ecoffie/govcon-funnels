/**
 * Backup store for funnel signups → Supabase `funnel_leads` table.
 * Runs alongside GoHighLevel; non-blocking. If env vars are missing or the
 * write fails, we log and move on — the user is never blocked, and the lead
 * is still captured in GHL + Slack.
 *
 * Env (set in .env.local + Vercel):
 *   NEXT_PUBLIC_SUPABASE_URL  (or SUPABASE_URL)
 *   SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from '@supabase/supabase-js';

type LeadPayload = {
  name?: string;
  email: string;
  phone?: string;
  source?: string;
  tags?: string[];
  [key: string]: unknown;
};

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

// Service-role client (server-only) — bypasses RLS for the insert.
const client =
  url && serviceKey
    ? createClient(url, serviceKey, { auth: { persistSession: false } })
    : null;

/**
 * Count distinct signups for a funnel source. Distinct-by-email so a refresh
 * or double-submit doesn't inflate the count (which would wrongly push a real
 * person past the Zoom cap). Returns null on any failure — callers fail soft.
 */
export async function countLeadsBySource(source: string): Promise<number | null> {
  if (!client) return null;
  try {
    // Pull just the email column for matching rows, then dedupe in memory.
    // Volume here is event-signup scale (hundreds), so this is cheap.
    const { data, error } = await client
      .from('funnel_leads')
      .select('email')
      .eq('source', source);
    if (error) {
      console.error('countLeadsBySource failed:', error.message);
      return null;
    }
    const distinct = new Set((data ?? []).map((r) => (r.email || '').toLowerCase().trim()));
    distinct.delete('');
    return distinct.size;
  } catch (e) {
    console.error('countLeadsBySource threw:', e instanceof Error ? e.message : String(e));
    return null;
  }
}

/**
 * Read the real HUBZone registrant list from Supabase (funnel_leads), deduped
 * by email. This is the source of truth for sends — GHL's API pull is capped
 * at 100/tag with no pagination and was under-counting. Drops obvious test
 * addresses. Returns [] on failure so callers can fall back to GHL.
 */
const HUBZONE_SOURCES = ['hubzone-webinar', 'hubzone-webinar-bottom'];
const TEST_EMAIL_RE = /\+|@example\.com$|(^|\b)(test|email-test)\b/i;

export async function getHubzoneRegistrantsFromSupabase(): Promise<
  { email: string; name: string }[]
> {
  if (!client) return [];
  try {
    const { data, error } = await client
      .from('funnel_leads')
      .select('email,name,created_at')
      .in('source', HUBZONE_SOURCES)
      .order('created_at', { ascending: true });
    if (error) {
      console.error('getHubzoneRegistrantsFromSupabase failed:', error.message);
      return [];
    }
    const byEmail = new Map<string, { email: string; name: string }>();
    for (const r of data ?? []) {
      const email = (r.email || '').toLowerCase().trim();
      if (!email || TEST_EMAIL_RE.test(email)) continue;
      // First occurrence wins (earliest signup); keep a real name if present.
      if (!byEmail.has(email)) byEmail.set(email, { email, name: (r.name || '').trim() });
      else if (!byEmail.get(email)!.name && r.name) byEmail.get(email)!.name = r.name.trim();
    }
    return [...byEmail.values()];
  } catch (e) {
    console.error('getHubzoneRegistrantsFromSupabase threw:', e instanceof Error ? e.message : String(e));
    return [];
  }
}

/**
 * Idempotency guard: has this exact (email, source) already been captured in the
 * last `windowSeconds`? Used by /api/lead to short-circuit a genuine double-submit
 * (double-click, browser retry, form re-fire) so we don't create duplicate leads in
 * GHL/Supabase or fire a second Slack ping + confirmation email.
 *
 * Window-scoped (default 120s) on purpose: a SAME person legitimately re-registering
 * weeks later (or for a different funnel) is NOT a dup. Email match is
 * case-insensitive. Returns false on any failure → fail OPEN (never block a real
 * signup because the dedup check errored).
 */
export async function recentDuplicateExists(
  email: string,
  source: string | undefined,
  windowSeconds = 120
): Promise<boolean> {
  if (!client) return false;
  const cleanEmail = (email || '').toLowerCase().trim();
  if (!cleanEmail) return false;
  try {
    const since = new Date(Date.now() - windowSeconds * 1000).toISOString();
    let query = client
      .from('funnel_leads')
      .select('email', { count: 'exact', head: true })
      .ilike('email', escapePostgrestLikePattern(cleanEmail))
      .gte('created_at', since);
    // Scope to the same funnel source so the same email on two DIFFERENT funnels
    // (e.g. hubzone-webinar then mindy-launch) both go through.
    if (source) query = query.eq('source', source);
    const { count, error } = await query;
    if (error) {
      console.error('recentDuplicateExists check failed (failing open):', error.message);
      return false;
    }
    return (count ?? 0) > 0;
  } catch (e) {
    console.error('recentDuplicateExists threw (failing open):', e instanceof Error ? e.message : String(e));
    return false;
  }
}

export function escapePostgrestLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, (match) => `\\${match}`);
}

export async function saveLeadToSupabase(
  lead: LeadPayload
): Promise<{ ok: boolean; error?: string }> {
  if (!client) return { ok: false, error: 'Supabase env not configured' };
  try {
    const { error } = await client.from('funnel_leads').insert({
      name: lead.name ?? null,
      email: lead.email,
      phone: lead.phone ?? null,
      source: lead.source ?? null,
      tags: Array.isArray(lead.tags) ? lead.tags : [],
      raw: lead,
    });
    if (error) {
      console.error('Supabase lead backup failed:', error.message);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('Supabase lead backup threw:', msg);
    return { ok: false, error: msg };
  }
}
