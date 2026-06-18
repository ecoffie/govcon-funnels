import { NextRequest, NextResponse } from 'next/server';
import { getHubzoneRegistrations } from '@/lib/hubzone-registrations';
import { getHubzoneRegistrantsFromSupabase } from '@/lib/supabase-leads';
import {
  sendHubzoneReminderEmail,
  sendHubzoneSpeakerEmail,
  sendHubzoneRegisterEmail,
  sendHubzoneRegisterPlaintext,
  sendHubzoneRecordingEmail,
} from '@/lib/email';
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
 *   ?send=1                → REAL blast to all registrants + the speaker roster
 *   ?send=1&attendeesonly=1 → registrants only, skip the speaker emails
 *   ?send=1&speakersonly=1  → speaker emails only, skip the attendee blast
 *
 * Speaker roster is fixed below (Tim, Chad, Todd). Chad's email CCs his
 * Encore team. Eric is host/moderator and is not emailed by this route.
 *
 * Gmail SMTP is throttled (~120ms between sends) to stay under rate limits.
 */

/** Panelists for the run-of-show email. Eric hosts and isn't included here.
 *  Branden (GCG webinar QC) is CC'd on every speaker email. */
const GCG_QC_CC = 'branden@govcongiants.com';
const SPEAKER_ROSTER: { name: string; to: string; cc?: string[] }[] = [
  { name: 'Tim Hagerty', to: 'tim@teamingpro.com', cc: [GCG_QC_CC] },
  {
    name: 'Chad Eberly',
    to: 'ceberly@encore-funding.com',
    cc: ['dprovident@encore-funding.com', 'sschneider@encore-funding.com', 'ssweedler@encore-funding.com', GCG_QC_CC],
  },
  { name: 'Todd Rogers', to: 'T.rogers@oneltr.com', cc: [GCG_QC_CC] },
];
// 400ms between sends — 120ms tripped Gmail's per-connection login cap (454-4.7.0) near the end of a 54-send burst.
const SEND_DELAY_MS = 400;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Constant-time-ish compare so the tracker password check doesn't leak length/timing. */
function matches(provided: string, expected: string): boolean {
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export async function GET(request: NextRequest) {
  const provided = extractPassword(request);
  // Accept EITHER the shared admin password OR the shareable HUBZone tracker
  // password (same one that gates /api/hubzone/registrations).
  const trackerPw = process.env.HUBZONE_TRACKER_PASSWORD;
  const trackerOk = !!provided && !!trackerPw && matches(provided, trackerPw);
  if (!trackerOk && !isAuthorized(provided)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const dry = searchParams.get('dry') === '1' || (!searchParams.get('send') && !searchParams.get('test'));
  const send = searchParams.get('send') === '1';
  const testEmail = searchParams.get('test')?.trim() || null;
  const attendeesOnly = searchParams.get('attendeesonly') === '1';
  const speakersOnly = searchParams.get('speakersonly') === '1';
  const doAttendees = !speakersOnly;
  const doSpeakers = !attendeesOnly;
  // Retry filter: &only=a@x.com,b@y.com restricts the attendee blast to just
  // these addresses (used to re-send the few that Gmail rate-limited).
  const onlyEmails = (searchParams.get('only') || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  try {
    // PREVIEW MODE — send a single design to one address.
    //   ?preview=register&to=you@email.com   (list-blast register design)
    //   ?preview=recording&to=you@email.com  (recording + Mindy June 27 + contacts)
    const preview = searchParams.get('preview');
    const previewTo = searchParams.get('to')?.trim();
    if (preview === 'recording' && previewTo) {
      const res = await sendHubzoneRecordingEmail({ to: previewTo, name: 'there' });
      return NextResponse.json(
        { mode: 'preview', design: 'recording', to: previewTo, result: res },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }
    if (preview === 'register' && previewTo) {
      const asText = searchParams.get('format') === 'text';
      const res = asText
        ? await sendHubzoneRegisterPlaintext({ to: previewTo, name: 'there' })
        : await sendHubzoneRegisterEmail({ to: previewTo, name: 'there' });
      return NextResponse.json(
        { mode: 'preview', design: 'register', format: asText ? 'text' : 'html', to: previewTo, result: res },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // TEST MODE — send BOTH templates (attendee + speaker) to the test address
    if (testEmail) {
      const attendee = await sendHubzoneReminderEmail({ to: testEmail, name: 'Test Friend' });
      await sleep(SEND_DELAY_MS);
      const speaker = await sendHubzoneSpeakerEmail({ to: testEmail, name: 'Test Speaker' });
      return NextResponse.json(
        { mode: 'test', to: testEmail, attendeeEmail: attendee, speakerEmail: speaker },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // Source of truth: Supabase funnel_leads (GHL's pull is capped at 100/tag
    // with no pagination and was under-counting). Fall back to GHL only if
    // Supabase returns nothing. Includes the Encore/internal team on purpose.
    let baseList = await getHubzoneRegistrantsFromSupabase();
    let listSource = 'supabase';
    if (baseList.length === 0) {
      const summary = await getHubzoneRegistrations(new Date());
      baseList = summary.registrants
        .filter((r) => r.email)
        .map((r) => ({ email: r.email, name: r.name }));
      listSource = 'ghl-fallback';
    }
    const recipients = baseList
      .filter((r) => onlyEmails.length === 0 || onlyEmails.includes(r.email.toLowerCase()))
      .map((r) => ({ to: r.email, name: r.name }));

    // DRY MODE — report what *would* happen
    if (dry || !send) {
      return NextResponse.json(
        {
          mode: 'dry',
          listSource,
          willEmailAttendees: doAttendees,
          attendeeCount: doAttendees ? recipients.length : 0,
          sampleRecipients: recipients.slice(0, 5).map((r) => ({ name: r.name, email: r.to })),
          willEmailSpeakers: doSpeakers,
          speakerRecipients: doSpeakers
            ? SPEAKER_ROSTER.map((s) => ({ name: s.name, to: s.to, cc: s.cc || [] }))
            : [],
          note: 'No emails sent. Add ?send=1 to blast. Flags: &attendeesonly=1, &speakersonly=1.',
        },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }

    // REAL SEND
    const attendeeResults: { email: string; ok: boolean; error?: string }[] = [];
    if (doAttendees) {
      for (const r of recipients) {
        const res = await sendHubzoneReminderEmail(r);
        attendeeResults.push({ email: r.to, ok: res.ok, error: res.error });
        await sleep(SEND_DELAY_MS);
      }
    }

    const speakerResults: { email: string; ok: boolean; error?: string }[] = [];
    if (doSpeakers) {
      for (const s of SPEAKER_ROSTER) {
        const res = await sendHubzoneSpeakerEmail({ to: s.to, name: s.name, cc: s.cc });
        speakerResults.push({ email: s.to, ok: res.ok, error: res.error });
        await sleep(SEND_DELAY_MS);
      }
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
