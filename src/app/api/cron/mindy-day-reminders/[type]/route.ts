import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { getMindyDayRegistrantsFromSupabase } from '@/lib/supabase-leads';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

/**
 * Scheduled Mindy Day (Saturday, August 22, 2026 · 10:00 AM ET) webinar-link reminders.
 * Cloned from /api/cron/hubzone-reminders — same shape, idempotency, and auth.
 *
 * ⚠️ SCHEDULING IS NOT DEFINED HERE. There is no vercel.json cron (the 100-cron
 * cap would block the whole deploy). The schedule lives in `cron_jobs` rows in
 * Supabase, fired by the dispatcher — that table is the ONLY source of truth for
 * when these run. Editing this comment changes nothing at runtime; to reschedule,
 * update the rows. Cron expressions there are UTC.
 *
 * One route, several fires selected by ?type= (each has its OWN idempotency key,
 * so each genuinely sends — like HUBZone's one-hour/live/recording).
 * Live `cron_jobs` rows as of 2026-08-22 (job_name → cron_expr → ET wall time):
 *   heads-up → mindy-heads-up → `0 15 21 8 *` → Fri Aug 21, 11:00 AM ET
 *   morning  → mindy-morning  → `0 12 22 8 *` → Sat Aug 22,  8:00 AM ET
 *   live     → mindy-live     → `0 14 22 8 *` → Sat Aug 22, 10:00 AM ET (class start)
 *
 * The lifetime-* types are offer emails, not join-link reminders, and are
 * scheduled by their own rows. `mindy-lifetime-extension` and
 * `mindy-lifetime-finalclose` are both DISABLED (finalclose was disabled
 * 2026-08-22: it was still armed for Sun Aug 24 8 PM ET and would have blasted
 * 797 registrants with copy written for a June 29 deadline).
 *
 * NOTE ON TIMES: cron_expr is UTC and does not track DST, so a row pinned to a
 * date is only correct for that date's offset (Aug 2026 = EDT/UTC-4). These are
 * one-shot date-pinned rows, not recurring schedules — but they stay enabled and
 * will re-arm on the same calendar date next year unless disabled.
 *
 * The join link comes from MINDY_DAY_JOIN_URL env (a scheduled call can't pass
 * ?join=). A real send REFUSES the registration-page fallback so nobody gets a
 * dead link.
 *
 * Auth: Vercel cron sends `Authorization: Bearer <CRON_SECRET>`. We accept that
 * OR the admin password (?password=) for manual fire/testing.
 */

const FALLBACK_JOIN_URL = 'https://govcongiants.com/mindy-launch';
const SEND_DELAY_MS = 250;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * Idempotency guard so the cron and a manual backup fire can't double-send the
 * SAME type. Keyed per type with a 2-day TTL. Fails OPEN (returns true) if Redis
 * is down — better a possible dup than a missed send.
 */
async function claimSend(type: string): Promise<boolean> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return true;
  try {
    const redis = new Redis({ url, token });
    const res = await redis.set(`mindy-day:reminder-sent:${type}`, new Date().toISOString(), {
      nx: true,
      ex: 60 * 60 * 48,
    });
    return res === 'OK';
  } catch {
    return true; // fail open
  }
}

async function releaseSendClaim(type: string): Promise<void> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return;
  try {
    const redis = new Redis({ url, token });
    await redis.del(`mindy-day:reminder-sent:${type}`);
  } catch {
    // Best effort: the response still reports failure so the operator can force.
  }
}

function authorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;
  return isAuthorized(extractPassword(req));
}

const VALID_TYPES = [
  // pre-event reminders (carry the Zoom link, no pricing)
  'heads-up', 'morning', 'live',
  // POST-event Founders Lifetime offer sequence (pricing; no Zoom link)
  'lifetime-deal', 'lifetime-lastcall', 'lifetime-extension', 'lifetime-finalclose',
] as const;

// Map a lifetime cron type → the offer-email phase the getmindy.ai endpoint expects.
const LIFETIME_PHASE: Record<string, 'deal' | 'lastcall' | 'extension' | 'finalclose'> = {
  'lifetime-deal': 'deal',
  'lifetime-lastcall': 'lastcall',
  'lifetime-extension': 'extension',
  'lifetime-finalclose': 'finalclose',
};

export async function GET(req: NextRequest, ctx: { params: Promise<{ type: string }> }) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  // Type comes from the PATH segment (Vercel crons can't pass ?query=). A
  // ?type= override is still honored for manual/admin calls.
  const { type: typeParam } = await ctx.params;
  const type = (searchParams.get('type') || typeParam || 'morning') as (typeof VALID_TYPES)[number];
  const dry = searchParams.get('dry') === '1';
  const force = searchParams.get('force') === '1'; // bypass the idempotency guard
  const joinOverride = searchParams.get('join')?.trim() || null;

  if (!VALID_TYPES.includes(type)) {
    return NextResponse.json(
      { error: `Unknown type "${type}". Use ${VALID_TYPES.join(' | ')}.` },
      { status: 400 }
    );
  }

  const lifetimePhase = LIFETIME_PHASE[type];
  const isLifetime = !!lifetimePhase;
  const joinUrl = joinOverride || process.env.MINDY_DAY_JOIN_URL?.trim() || FALLBACK_JOIN_URL;
  const usingFallbackLink = joinUrl === FALLBACK_JOIN_URL;

  try {
    const baseList = await getMindyDayRegistrantsFromSupabase();
    const recipients = baseList.map((r) => ({ to: r.email, name: r.name }));

    if (dry) {
      return NextResponse.json(
        { mode: 'dry', type, count: recipients.length, ...(isLifetime ? { phase: lifetimePhase } : { joinUrl, usingFallbackLink }) },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // SAFETY GATE — pre-event reminders must carry a real Zoom link, never the
    // bare registration page. Lifetime offer emails carry no join link, so skip it.
    if (!isLifetime && usingFallbackLink) {
      return NextResponse.json(
        {
          error: 'Refusing to send: no real join link. Set MINDY_DAY_JOIN_URL env (or pass ?join=).',
          type,
          recipientCount: recipients.length,
        },
        { status: 400, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    if (recipients.length === 0) {
      return NextResponse.json(
        {
          error: 'Refusing to mark reminder sent: no Mindy Day recipients were loaded.',
          type,
        },
        { status: 500, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Validate the verified sender handoff before claiming idempotency. A missing
    // env var should be retryable, not mark the whole blast as already sent.
    const sendUrl = process.env.MINDY_LAUNCH_SEND_URL?.replace('send-confirmation', 'send-reminder');
    const sendSecret = process.env.MINDY_LAUNCH_SEND_SECRET;
    if (!sendUrl || !sendSecret) {
      return NextResponse.json(
        { error: 'MINDY_LAUNCH_SEND_URL / MINDY_LAUNCH_SEND_SECRET not configured — cannot send via getmindy.ai.' },
        { status: 500, headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Idempotency: cron + manual backup can both call this; only the first wins.
    if (!force) {
      const claimed = await claimSend(type);
      if (!claimed) {
        return NextResponse.json(
          { mode: 'skipped', type, reason: 'already sent (idempotency guard); use &force=1 to override' },
          { headers: { 'Cache-Control': 'no-store' } }
        );
      }
    }

    // Map the cron type to the send payload: lifetime-* → the offer email at the
    // right phase; 'live' → ultra-short "we're live"; everything else → reminder.
    const payloadBase = isLifetime
      ? { variant: 'lifetime' as const, phase: lifetimePhase }
      : { variant: (type === 'live' ? 'live' : 'reminder') as 'live' | 'reminder' };

    // Send through getmindy.ai's VERIFIED mail.getmindy.ai sender (same as the
    // confirmation email) — NOT the local alerts@govcongiants.com path, which is
    // unverified in Resend and gets spam-filtered. Derive the reminder endpoint
    // from the confirmation handoff URL; reuse the same shared secret.
    const results: { email: string; ok: boolean; error?: string }[] = [];
    for (const r of recipients) {
      try {
        const resp = await fetch(sendUrl, {
          method: 'POST',
          headers: { 'content-type': 'application/json', authorization: `Bearer ${sendSecret}` },
          body: JSON.stringify({ email: r.to, name: r.name, ...payloadBase }),
        });
        const data = (await resp.json().catch(() => ({}))) as { ok?: boolean; error?: string };
        results.push({ email: r.to, ok: resp.ok && data.ok !== false, error: data.error });
      } catch (e) {
        results.push({ email: r.to, ok: false, error: e instanceof Error ? e.message : 'send failed' });
      }
      await sleep(SEND_DELAY_MS);
    }

    const sent = results.filter((r) => r.ok).length;
    const failed = results.length - sent;
    if (failed > 0 && !force) {
      await releaseSendClaim(type);
    }
    return NextResponse.json(
      {
        mode: 'send',
        type,
        joinUrl,
        sent,
        failed,
        total: results.length,
        failures: results.filter((r) => !r.ok),
      },
      { status: failed > 0 ? 500 : 200, headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send Mindy Day reminders';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
