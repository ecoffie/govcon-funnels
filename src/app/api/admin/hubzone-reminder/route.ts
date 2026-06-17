import { NextRequest, NextResponse } from 'next/server';
import { getHubzoneRegistrations } from '@/lib/hubzone-registrations';
import { sendHubzoneReminderEmail, sendHubzoneSpeakerEmail } from '@/lib/email';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * Day-of HUBZone webinar reminder blast — sends the branded "tonight" email
 * (with the real Zoom join link) to every external registrant pulled live
 * from GoHighLevel. Also sends the speaker run-of-show email.
 *
 * Auth: shared admin password (?password=, x-admin-password header, or Bearer).
 *
 * Modes (query params):
 *   ?dry=1                 → count recipients only, send nothing (default-safe)
 *   ?test=you@email.com    → send ONE attendee email to that address, nothing else
 *   ?send=1                → REAL blast to all registrants
 *   ?speakers=a@x.com,b@y.com  → also send the speaker email to those addresses
 *                                (works with ?send=1; with ?dry it just lists them)
 *
 * Gmail SMTP is throttled (~120ms between sends) to stay under rate limits.
 */
const SEND_DELAY_MS = 120;
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
  const speakers = (searchParams.get('speakers') || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    // TEST MODE — single attendee email, no list pull needed beyond that
    if (testEmail) {
      const res = await sendHubzoneReminderEmail({ to: testEmail, name: 'Test Friend' });
      return NextResponse.json({ mode: 'test', to: testEmail, result: res }, { headers: { 'Cache-Control': 'no-store' } });
    }

    // Pull the live, de-duped, test/internal-filtered registrant list
    const summary = await getHubzoneRegistrations(new Date());
    const recipients = summary.registrants
      .filter((r) => !r.internal && r.email)
      .map((r) => ({ to: r.email, name: r.name }));

    // DRY MODE — report what *would* happen
    if (dry || !send) {
      return NextResponse.json(
        {
          mode: 'dry',
          attendeeCount: recipients.length,
          sampleRecipients: recipients.slice(0, 5).map((r) => ({ name: r.name, email: r.to })),
          speakerRecipients: speakers,
          note: 'No emails sent. Add ?send=1 to blast attendees, &speakers=a@x.com,b@y.com to also email speakers.',
        },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // REAL SEND
    const attendeeResults: { email: string; ok: boolean; error?: string }[] = [];
    for (const r of recipients) {
      const res = await sendHubzoneReminderEmail(r);
      attendeeResults.push({ email: r.to, ok: res.ok, error: res.error });
      await sleep(SEND_DELAY_MS);
    }

    const speakerResults: { email: string; ok: boolean; error?: string }[] = [];
    for (const email of speakers) {
      const res = await sendHubzoneSpeakerEmail({ to: email, name: 'Speaker' });
      speakerResults.push({ email, ok: res.ok, error: res.error });
      await sleep(SEND_DELAY_MS);
    }

    const attendeeOk = attendeeResults.filter((r) => r.ok).length;
    const speakerOk = speakerResults.filter((r) => r.ok).length;

    return NextResponse.json(
      {
        mode: 'send',
        attendees: { sent: attendeeOk, failed: attendeeResults.length - attendeeOk, total: attendeeResults.length },
        speakers: { sent: speakerOk, failed: speakerResults.length - speakerOk, total: speakerResults.length },
        failures: [...attendeeResults, ...speakerResults].filter((r) => !r.ok),
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send reminders';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
