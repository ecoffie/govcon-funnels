/**
 * Weekly SEO report cron — pulls live Google Search Console data and
 * posts a summary to Slack.
 *
 * Scheduled by a single entry in vercel.json (Mondays 13:00 UTC = 9am ET).
 * This is the ONLY Vercel cron in the funnels repo, so the 100-cron-cap
 * concern (which applies to the Mindy repo) doesn't bite here.
 *
 * Auth: Vercel cron invocations send `Authorization: Bearer <CRON_SECRET>`.
 * We accept that, OR the admin password (for manual ?password= testing).
 *
 * Runtime needs GCP_SA_JSON (service account) + SLACK_LEAD_WEBHOOK_URL
 * set in the Vercel environment.
 */
import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized, extractPassword } from '@/lib/admin-auth';
import { buildReport, toSlackBlocks } from '@/lib/gsc/report';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function authorized(req: NextRequest): boolean {
  // Vercel cron secret (Authorization: Bearer <CRON_SECRET>).
  const auth = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;
  // Fall back to the shared admin password (manual trigger / testing).
  return isAuthorized(extractPassword(req));
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const webhookUrl = process.env.SLACK_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: 'SLACK_LEAD_WEBHOOK_URL not set' }, { status: 500 });
  }

  try {
    const report = await buildReport(new Date());
    const blocks = toSlackBlocks(report);

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `Weekly SEO report — ${report.totals.clicks.toLocaleString()} clicks, ${report.totals.impressions.toLocaleString()} impressions (28d)`,
        blocks,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `Slack post failed: ${res.status}`, detail: errText.slice(0, 300) },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      posted: true,
      totals: report.totals,
      range: report.range.current,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error('SEO report cron failed:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
