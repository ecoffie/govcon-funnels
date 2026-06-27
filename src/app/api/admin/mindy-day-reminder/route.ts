import { NextRequest, NextResponse } from 'next/server';
import { getMindyDayRegistrantsFromSupabase } from '@/lib/supabase-leads';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

/**
 * Send one reminder through getmindy.ai's VERIFIED mail.getmindy.ai sender
 * (same path as the confirmation), NOT the local alerts@govcongiants.com Resend
 * path, which is unverified and spam-filtered. Endpoint + secret are derived from
 * the confirmation handoff env.
 */
async function sendViaGetMindy(
  to: string,
  name: string,
  variant: 'reminder' | 'live'
): Promise<{ ok: boolean; error?: string }> {
  const sendUrl = process.env.MINDY_LAUNCH_SEND_URL?.replace('send-confirmation', 'send-reminder');
  const sendSecret = process.env.MINDY_LAUNCH_SEND_SECRET;
  if (!sendUrl || !sendSecret) {
    return { ok: false, error: 'MINDY_LAUNCH_SEND_URL / MINDY_LAUNCH_SEND_SECRET not configured' };
  }
  try {
    const resp = await fetch(sendUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${sendSecret}` },
      body: JSON.stringify({ email: to, name, variant }),
    });
    const data = (await resp.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    return { ok: resp.ok && data.ok !== false, error: data.error };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'send failed' };
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * Mindy Day (June 27) day-of webinar-link blast — sends the branded "we're live"
 * email carrying the real join link to every registrant pulled from Supabase
 * `funnel_leads` (source = 'mindy-launch', written by /api/lead when someone
 * signs up at govcongiants.com/mindy-launch).
 *
 * Cloned from /api/admin/hubzone-reminder. Differences: source is mindy-launch,
 * Mindy navy→purple branding, attendees-only (no speaker roster), and the join
 * link is supplied at SEND time so it never has to live in code.
 *
 * Auth: shared admin password (?password=, x-admin-password header, or Bearer).
 *
 * The join link (REQUIRED for a real send):
 *   ?join=<url>   → the live Zoom/StreamYard/YouTube link, used for this blast.
 *                   Falls back to MINDY_DAY_JOIN_URL env, then the registration
 *                   page. A real send (?send=1) REFUSES to go out on the bare
 *                   registration-page fallback so nobody gets a dead "link".
 *
 * Modes (query params):
 *   ?dry=1                       → count recipients only, send nothing (default)
 *   ?test=you@email.com&join=…   → send ONE email to that address, nothing else
 *   ?send=1&join=…               → REAL blast to every registrant
 *   ?send=1&join=…&only=a@x,b@y  → restrict the blast to these addresses (retry)
 *
 * Resend is throttled lightly to stay friendly with the provider.
 */

const SEND_DELAY_MS = 250;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(request: NextRequest) {
  const provided = extractPassword(request);
  if (!isAuthorized(provided)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const dry = searchParams.get('dry') === '1' || (!searchParams.get('send') && !searchParams.get('test'));
  const send = searchParams.get('send') === '1';
  const testEmail = searchParams.get('test')?.trim() || null;
  // 'live' → ultra-short "we're live" email; default → punchy reminder.
  const variant: 'reminder' | 'live' = searchParams.get('variant') === 'live' ? 'live' : 'reminder';

  const onlyEmails = (searchParams.get('only') || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  try {
    // TEST MODE — one email to the given address, via the verified getmindy.ai sender.
    if (testEmail) {
      const res = await sendViaGetMindy(testEmail, 'Test Friend', variant);
      return NextResponse.json(
        { mode: 'test', to: testEmail, variant, sender: 'getmindy.ai (verified)', result: res },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    const baseList = await getMindyDayRegistrantsFromSupabase();
    const recipients = baseList
      .filter((r) => onlyEmails.length === 0 || onlyEmails.includes(r.email.toLowerCase()))
      .map((r) => ({ to: r.email, name: r.name }));

    // DRY MODE — report what *would* happen.
    if (dry || !send) {
      return NextResponse.json(
        {
          mode: 'dry',
          source: 'supabase:funnel_leads(source=mindy-launch)',
          sender: 'getmindy.ai (verified mail.getmindy.ai)',
          variant,
          recipientCount: recipients.length,
          sampleRecipients: recipients.slice(0, 5).map((r) => ({ name: r.name, email: r.to })),
          note: 'Add ?send=1 to blast. Optional: &variant=live, &only=a@x.com,b@y.com.',
        },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // REAL SEND — through the verified getmindy.ai sender.
    const results: { email: string; ok: boolean; error?: string }[] = [];
    for (const r of recipients) {
      const res = await sendViaGetMindy(r.to, r.name, variant);
      results.push({ email: r.to, ok: res.ok, error: res.error });
      await sleep(SEND_DELAY_MS);
    }
    const ok = results.filter((r) => r.ok).length;

    return NextResponse.json(
      {
        mode: 'send',
        sender: 'getmindy.ai (verified)',
        variant,
        sent: ok,
        failed: results.length - ok,
        total: results.length,
        failures: results.filter((r) => !r.ok),
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send Mindy Day reminders';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
