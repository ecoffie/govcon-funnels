import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { getHubzoneRegistrations } from '@/lib/hubzone-registrations';
import { getHubzoneRegistrantsFromSupabase } from '@/lib/supabase-leads';
import {
  sendHubzoneOneHourEmail,
  sendHubzoneLiveEmail,
  sendHubzoneRecordingEmail,
} from '@/lib/email';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

/**
 * Idempotency guard so the cron AND a manual backup fire can't double-send.
 * Marks a one-time "<type> already sent" key with a 2-day TTL. Returns true if
 * this call won the race (should send), false if already sent. Fails OPEN
 * (returns true) if Redis is unavailable — better to risk a dup than to miss
 * the send entirely.
 */
async function claimSend(type: string): Promise<boolean> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return true;
  try {
    const redis = new Redis({ url, token });
    // SET NX = only sets if absent; returns "OK" when it claimed the slot.
    const res = await redis.set(`hubzone:reminder-sent:${type}`, new Date().toISOString(), {
      nx: true,
      ex: 60 * 60 * 48,
    });
    return res === 'OK';
  } catch {
    return true; // fail open
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * Scheduled HUBZone webinar email reminders. One route, three jobs selected by
 * ?type=:
 *   one-hour   → "Starts in 1 hour" (cron 0 21 * * 3  = 5:00 PM EDT Wed)
 *   live       → "We're live now"   (cron 55 21 * * 3 = 5:55 PM EDT Wed)
 *   recording  → recording + Encore CTA (cron 0 14 * * 4 = 10 AM EDT Thu)
 *
 * Auth: Vercel cron sends `Authorization: Bearer <CRON_SECRET>`. Manual sends
 * require the shared admin password.
 * Gmail-throttled (400ms) to avoid the 454 login-cap seen on bulk bursts.
 */
const SEND_DELAY_MS = 400;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function authorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;
  const provided = extractPassword(req);
  return isAuthorized(provided);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'one-hour';
  const dry = searchParams.get('dry') === '1';
  const force = searchParams.get('force') === '1'; // bypass the idempotency guard

  const senders = {
    'one-hour': sendHubzoneOneHourEmail,
    live: sendHubzoneLiveEmail,
    recording: sendHubzoneRecordingEmail,
  } as const;

  const sender = senders[type as keyof typeof senders];
  if (!sender) {
    return NextResponse.json(
      { error: `Unknown type "${type}". Use one-hour | live | recording.` },
      { status: 400 }
    );
  }

  try {
    // Source of truth: Supabase funnel_leads (GHL pull is capped at 100/tag,
    // no pagination — it under-counted). Fall back to GHL only if empty.
    let baseList = await getHubzoneRegistrantsFromSupabase();
    if (baseList.length === 0) {
      const summary = await getHubzoneRegistrations(new Date());
      baseList = summary.registrants.filter((r) => r.email).map((r) => ({ email: r.email, name: r.name }));
    }
    const recipients = baseList.map((r) => ({ to: r.email, name: r.name }));

    if (dry) {
      return NextResponse.json(
        { mode: 'dry', type, count: recipients.length },
        { headers: { 'Cache-Control': 'no-store' } }
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

    const results: { email: string; ok: boolean; error?: string }[] = [];
    for (const r of recipients) {
      const res = await sender(r);
      results.push({ email: r.to, ok: res.ok, error: res.error });
      await sleep(SEND_DELAY_MS);
    }

    const sent = results.filter((r) => r.ok).length;
    return NextResponse.json(
      {
        mode: 'send',
        type,
        sent,
        failed: results.length - sent,
        total: results.length,
        failures: results.filter((r) => !r.ok),
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send reminders';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
