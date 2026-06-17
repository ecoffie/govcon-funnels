import { NextRequest, NextResponse } from 'next/server';
import { getHubzoneRegistrations } from '@/lib/hubzone-registrations';
import {
  sendHubzoneOneHourEmail,
  sendHubzoneLiveEmail,
  sendHubzoneRecordingEmail,
} from '@/lib/email';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

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
 * Auth: Vercel cron sends `Authorization: Bearer <CRON_SECRET>`. We accept that
 * OR the admin/tracker password (?password=) for manual testing.
 * Gmail-throttled (400ms) to avoid the 454 login-cap seen on bulk bursts.
 */
const SEND_DELAY_MS = 400;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function authorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;
  const provided = extractPassword(req);
  const trackerPw = process.env.HUBZONE_TRACKER_PASSWORD;
  if (provided && trackerPw && provided === trackerPw) return true;
  return isAuthorized(provided);
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'one-hour';
  const dry = searchParams.get('dry') === '1';

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
    const summary = await getHubzoneRegistrations(new Date());
    const recipients = summary.registrants
      .filter((r) => !r.internal && r.email)
      .map((r) => ({ to: r.email, name: r.name }));

    if (dry) {
      return NextResponse.json(
        { mode: 'dry', type, count: recipients.length },
        { headers: { 'Cache-Control': 'no-store' } }
      );
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
