import { NextRequest, NextResponse } from 'next/server';
import { getMindyDayRegistrantsFromSupabase } from '@/lib/supabase-leads';
import { sendMindyDayReminderEmail } from '@/lib/email';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

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

const FALLBACK_JOIN_URL = 'https://govcongiants.com/mindy-launch';
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
  const joinOverride = searchParams.get('join')?.trim() || null;
  // Resolve the link the email will carry: explicit ?join= wins, then env.
  const joinUrl = joinOverride || process.env.MINDY_DAY_JOIN_URL?.trim() || FALLBACK_JOIN_URL;
  const usingFallbackLink = joinUrl === FALLBACK_JOIN_URL;

  const onlyEmails = (searchParams.get('only') || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  try {
    // TEST MODE — one email to the given address. Allowed on the fallback link
    // so you can preview the design, but the response flags it.
    if (testEmail) {
      const res = await sendMindyDayReminderEmail({ to: testEmail, name: 'Test Friend', joinUrl });
      return NextResponse.json(
        { mode: 'test', to: testEmail, joinUrl, usingFallbackLink, result: res },
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
          recipientCount: recipients.length,
          joinUrl,
          usingFallbackLink,
          sampleRecipients: recipients.slice(0, 5).map((r) => ({ name: r.name, email: r.to })),
          note: usingFallbackLink
            ? 'No real join link set. Pass ?join=<live url> (or set MINDY_DAY_JOIN_URL). A real send is BLOCKED on the fallback link.'
            : 'Add ?send=1 (keep &join=) to blast. Optional: &only=a@x.com,b@y.com to restrict.',
        },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // SAFETY GATE — never blast the bare registration page as the "link".
    if (usingFallbackLink) {
      return NextResponse.json(
        {
          error: 'Refusing to send: no real join link provided.',
          fix: 'Pass ?join=<live Zoom/StreamYard/YouTube url> or set MINDY_DAY_JOIN_URL.',
          recipientCount: recipients.length,
        },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // REAL SEND
    const results: { email: string; ok: boolean; error?: string }[] = [];
    for (const r of recipients) {
      const res = await sendMindyDayReminderEmail({ ...r, joinUrl });
      results.push({ email: r.to, ok: res.ok, error: res.error });
      await sleep(SEND_DELAY_MS);
    }
    const ok = results.filter((r) => r.ok).length;

    return NextResponse.json(
      {
        mode: 'send',
        joinUrl,
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
