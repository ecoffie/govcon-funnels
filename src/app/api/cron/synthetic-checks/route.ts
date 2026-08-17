/**
 * Synthetic checks cron — every 15 min (vercel.json). Runs the shared
 * synthetic suite (canary lead, URL uptime, sitemap/robots), persists results
 * to synthetic_checks, and fires deduped Slack alerts when thresholds trip:
 *   - canary lead fails (lead pipeline is down)
 *   - any important URL 5xx / down / slow
 *   - JS errors >20/hour (from site_events)
 *   - lead pipeline destination failing >5% over the last 100 leads
 *
 * Auth: Vercel cron (Authorization: Bearer CRON_SECRET) or ?password= admin.
 */
import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized, extractPassword } from '@/lib/admin-auth';
import { ccClient, sendAlert } from '@/lib/command-center';
import { runSyntheticSuite } from '@/lib/synthetic';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

async function evaluateAlerts(): Promise<string[]> {
  const fired: string[] = [];
  if (!ccClient) return fired;

  // JS errors >20 in the last hour
  try {
    const since = new Date(Date.now() - 3600_000).toISOString();
    const { count } = await ccClient
      .from('site_events')
      .select('id', { count: 'exact', head: true })
      .eq('event', 'js_error')
      .gte('ts', since);
    if ((count ?? 0) > 20) {
      const r = await sendAlert('js-errors-hourly', `${count} JS errors in the last hour on govcongiants.com (threshold 20). Check /dashboard/command-center.`);
      if (r.sent) fired.push('js-errors-hourly');
    }
  } catch { /* alerting must never break the cron */ }

  // Pipeline destination failure rate >5% over the last 100 non-canary leads
  try {
    const { data } = await ccClient
      .from('lead_pipeline_log')
      .select('ghl_ok,supabase_ok,slack_ok,email_ok')
      .neq('source', 'canary')
      .order('ts', { ascending: false })
      .limit(100);
    const rows = data ?? [];
    if (rows.length >= 10) {
      for (const dest of ['ghl_ok', 'supabase_ok', 'slack_ok', 'email_ok'] as const) {
        const attempted = rows.filter((r) => r[dest] !== null);
        const failed = attempted.filter((r) => r[dest] === false).length;
        const rate = attempted.length ? failed / attempted.length : 0;
        if (rate > 0.05) {
          const name = dest.replace('_ok', '');
          const r = await sendAlert(
            `pipeline-${name}-failing`,
            `Lead pipeline destination *${name}* failing at ${(rate * 100).toFixed(1)}% over the last ${attempted.length} leads. Check /dashboard/command-center.`,
          );
          if (r.sent) fired.push(`pipeline-${name}-failing`);
        }
      }
    }
  } catch { /* ignore */ }

  return fired;
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const auth = request.headers.get('authorization');
  const isCron = cronSecret && auth === `Bearer ${cronSecret}`;
  if (!isCron && !isAuthorized(extractPassword(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = await runSyntheticSuite();
  const failures = results.filter((r) => !r.ok);

  // Alert on each distinct failure class (deduped 4h inside sendAlert).
  const alerts: string[] = [];
  for (const f of failures) {
    const key = `synthetic-${f.check}-${f.target ?? ''}`;
    const r = await sendAlert(
      key,
      `Synthetic check *${f.check}* FAILED for ${f.target ?? 'target'} — status ${f.status ?? 'n/a'}${f.detail ? ` (${f.detail})` : ''}.`,
    );
    if (r.sent) alerts.push(key);
  }
  alerts.push(...(await evaluateAlerts()));

  return NextResponse.json({
    ok: failures.length === 0,
    ran: results.length,
    failures: failures.map((f) => ({ check: f.check, target: f.target, status: f.status, detail: f.detail })),
    alertsSent: alerts,
  });
}
