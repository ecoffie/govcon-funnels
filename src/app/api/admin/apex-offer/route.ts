import { NextRequest, NextResponse } from 'next/server';
import { getMindyDayRegistrantsFromSupabase } from '@/lib/supabase-leads';
import { listPurchases, type PurchaseRecord } from '@/lib/purchase-attribution';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

/**
 * "Earn Your Way In" — the APEX referral offer blast (slide 123 of the Mindy
 * launch deck). Goes to every Mindy Day registrant (Supabase funnel_leads,
 * source = 'mindy-launch') MINUS anyone who bought Mindy over the weekend.
 *
 * Cloned from /api/admin/mindy-day-reminder. Differences:
 *   - variant = 'apex-offer' (the APEX email template on the getmindy.ai sender)
 *   - SUPPRESSION: subtract weekend Mindy purchasers, read from the shared
 *     cross-site purchase index (listPurchases, site='mindy') by created-at.
 *
 * Auth: shared admin password (?password=, x-admin-password header, or Bearer).
 *
 * Suppression window (overridable; defaults to Mindy Day weekend):
 *   ?since=ISO  default 2026-06-27T00:00:00-04:00 (Sat, Mindy Day, ET)
 *   ?until=ISO  default now
 *
 * Modes:
 *   ?dry=1                      → count recipients + suppressed, send nothing (default)
 *   ?test=you@email.com         → send ONE apex-offer email to that address only
 *   ?send=1                     → REAL blast to every (non-suppressed) registrant
 *   ?send=1&only=a@x,b@y        → restrict the blast to these addresses (retry)
 */

const SEND_DELAY_MS = 250;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const DEFAULT_SINCE = '2026-06-27T00:00:00-04:00'; // Mindy Day (Sat), ET
const MINDY_PRODUCT_IDS = new Set(['mindy-pro-monthly', 'mindy-pro-annual']);

function isMindyPurchase(purchase: PurchaseRecord): boolean {
  if ((purchase.site || '').toLowerCase() === 'mindy') return true;
  return MINDY_PRODUCT_IDS.has((purchase.product_id || '').toLowerCase());
}

async function sendApexViaGetMindy(
  to: string,
  name: string,
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
      body: JSON.stringify({ email: to, name, variant: 'apex-offer' }),
    });
    const data = (await resp.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    return { ok: resp.ok && data.ok !== false, error: data.error };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'send failed' };
  }
}

/** Emails that bought Mindy within [since, until] — read from the shared index. */
async function getWeekendMindyBuyerEmails(
  since: number,
  until: number,
): Promise<Set<string>> {
  const purchases = await listPurchases(1000);
  const out = new Set<string>();
  for (const p of purchases) {
    if (!isMindyPurchase(p)) continue;
    // created_at is a clean ISO string (ms). raw_created is Stripe epoch SECONDS,
    // so it must NOT be compared against millisecond bounds — prefer created_at,
    // and normalize raw_created (×1000) only as a fallback.
    const ts = p.created_at
      ? Date.parse(p.created_at)
      : typeof p.raw_created === 'number'
        ? (p.raw_created < 1e12 ? p.raw_created * 1000 : p.raw_created)
        : NaN;
    if (!Number.isFinite(ts) || ts < since || ts > until) continue;
    const email = (p.customer_email || '').trim().toLowerCase();
    if (email) out.add(email);
  }
  return out;
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const provided = extractPassword(request);
  if (!isAuthorized(provided)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const dry = searchParams.get('dry') === '1' || (!searchParams.get('send') && !searchParams.get('test'));
  const send = searchParams.get('send') === '1';
  const testEmail = searchParams.get('test')?.trim() || null;
  const onlyEmails = (searchParams.get('only') || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const since = Date.parse(searchParams.get('since') || DEFAULT_SINCE);
  const until = searchParams.get('until') ? Date.parse(searchParams.get('until')!) : Date.now();

  try {
    // TEST MODE — one apex-offer email to the given address.
    if (testEmail) {
      const res = await sendApexViaGetMindy(testEmail, 'Test Friend');
      return NextResponse.json(
        { mode: 'test', to: testEmail, variant: 'apex-offer', sender: 'getmindy.ai (verified)', result: res },
        { headers: { 'Cache-Control': 'no-store' } },
      );
    }

    const baseList = await getMindyDayRegistrantsFromSupabase();
    const suppressed = await getWeekendMindyBuyerEmails(since, until);

    const recipients = baseList
      .filter((r) => !suppressed.has(r.email.toLowerCase()))
      .filter((r) => onlyEmails.length === 0 || onlyEmails.includes(r.email.toLowerCase()))
      .map((r) => ({ to: r.email, name: r.name }));

    const suppressedHits = baseList.filter((r) => suppressed.has(r.email.toLowerCase()));

    // DRY MODE — report what *would* happen (default).
    if (dry || !send) {
      return NextResponse.json(
        {
          mode: 'dry',
          source: 'supabase:funnel_leads(source=mindy-launch)',
          sender: 'getmindy.ai (verified mail.getmindy.ai)',
          variant: 'apex-offer',
          suppressionWindow: { since: new Date(since).toISOString(), until: new Date(until).toISOString() },
          registrantCount: baseList.length,
          weekendMindyBuyers: suppressed.size,
          suppressedFromThisList: suppressedHits.length,
          recipientCount: recipients.length,
          sampleSuppressed: suppressedHits.slice(0, 8).map((r) => r.email),
          sampleRecipients: recipients.slice(0, 5).map((r) => ({ name: r.name, email: r.to })),
          note: 'Add ?send=1 to blast. Override window with ?since=ISO&until=ISO. Test first with ?test=you@email.com.',
        },
        { headers: { 'Cache-Control': 'no-store' } },
      );
    }

    // REAL SEND.
    const results: { email: string; ok: boolean; error?: string }[] = [];
    for (const r of recipients) {
      const res = await sendApexViaGetMindy(r.to, r.name);
      results.push({ email: r.to, ok: res.ok, error: res.error });
      await sleep(SEND_DELAY_MS);
    }
    const ok = results.filter((r) => r.ok).length;

    return NextResponse.json(
      {
        mode: 'send',
        variant: 'apex-offer',
        suppressedFromThisList: suppressedHits.length,
        sent: ok,
        failed: results.length - ok,
        total: results.length,
        failures: results.filter((r) => !r.ok),
      },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send APEX offer';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
