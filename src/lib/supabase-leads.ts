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
