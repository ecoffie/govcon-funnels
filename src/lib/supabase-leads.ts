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

type LeadEmailRow = {
  email?: string | null;
};

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

// Service-role client (server-only) — bypasses RLS for the insert.
const client =
  url && serviceKey
    ? createClient(url, serviceKey, { auth: { persistSession: false } })
    : null;

/**
 * Mindy Launch (June 27, 2026) Zoom-seat cap. First N signups get the live
 * Zoom link; everyone after watches on YouTube. Overbooked above the real
 * ~100 Zoom room cap to account for typical webinar no-show (~33%).
 * Shared by /api/lead (position on signup) and /api/mindy-launch/spots.
 */
export const MINDY_LAUNCH_ZOOM_CAP = 150;

function normalizeEmail(email: string | null | undefined): string {
  return (email ?? '').toLowerCase().trim();
}

export function countDistinctLeadEmails(rows: LeadEmailRow[]): number {
  const distinct = new Set(rows.map((row) => normalizeEmail(row.email)));
  distinct.delete('');
  return distinct.size;
}

/**
 * Given rows already ordered from oldest to newest, return the signup rank for
 * an email after collapsing duplicates. This keeps early registrants from
 * losing Zoom access if they submit again after the cap has filled.
 */
export function getDistinctSignupPosition(
  rows: LeadEmailRow[],
  email: string
): number | null {
  const target = normalizeEmail(email);
  if (!target) return null;

  const seen = new Set<string>();
  let position = 0;

  for (const row of rows) {
    const current = normalizeEmail(row.email);
    if (!current || seen.has(current)) continue;

    seen.add(current);
    position += 1;
    if (current === target) return position;
  }

  return null;
}

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
    return countDistinctLeadEmails(data ?? []);
  } catch (e) {
    console.error('countLeadsBySource threw:', e instanceof Error ? e.message : String(e));
    return null;
  }
}

/**
 * Return this email's distinct signup position for a source. The query is
 * ordered by the table's creation timestamp so duplicate submissions reuse the
 * person's first persisted position instead of the current aggregate count.
 */
export async function getLeadSignupPosition(
  source: string,
  email: string
): Promise<number | null> {
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('funnel_leads')
      .select('email, created_at')
      .eq('source', source)
      .order('created_at', { ascending: true });
    if (error) {
      console.error('getLeadSignupPosition failed:', error.message);
      return null;
    }
    return getDistinctSignupPosition(data ?? [], email);
  } catch (e) {
    console.error('getLeadSignupPosition threw:', e instanceof Error ? e.message : String(e));
    return null;
  }
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
