/**
 * POST /api/command-center/alert-selftest — controlled proof that alert dedupe works
 * in production, through the REAL sendAlert path.
 *
 * Sends the same clearly-labelled alert twice with a fixed key. Working dedupe means:
 * the first attempt posts ONE Slack message and records it in cc_alert_log, and the
 * second is swallowed as "deduped (4h window)". If the dedupe store is unreadable,
 * both attempts are withheld (sendAlert fails closed) and the response says so.
 *
 * OUTWARD-FACING: a successful first attempt posts one message to the Slack channel
 * behind SLACK_LEAD_WEBHOOK_URL. Run only when that post has been authorized.
 * A repeat within 4 hours posts nothing (the first attempt is already deduped).
 *
 * Auth: admin password (x-admin-password header, Bearer, or ?password=).
 */
import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized, extractPassword } from '@/lib/admin-auth';
import { sendAlert } from '@/lib/command-center';

export const dynamic = 'force-dynamic';

const SELFTEST_KEY = 'cc-dedupe-selftest';

export async function POST(request: NextRequest) {
  if (!isAuthorized(extractPassword(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const message = `[Controlled dedupe self-test — please ignore] ${new Date().toISOString()}. A second identical alert was attempted immediately and should not appear.`;
  const first = await sendAlert(SELFTEST_KEY, message);
  const second = await sendAlert(SELFTEST_KEY, message);

  // Proven only by the explicit statuses, never by message text.
  const proven = first.status === 'sent' && first.reason === undefined && second.status === 'deduped';
  const alreadyRan = first.status === 'deduped' && second.status === 'deduped';
  const verdict = proven
    ? 'proven: first sent and recorded, second suppressed'
    : alreadyRan
      ? 'dedupe read proven; a self-test already ran in the last 4h, so nothing was sent'
      : first.status === 'paused'
        ? 'alerting paused: dedupe store unavailable, both attempts withheld'
        : 'NOT proven — see first/second';

  return NextResponse.json({
    ok: proven || alreadyRan,
    verdict,
    key: SELFTEST_KEY,
    first,
    second,
  });
}
