/**
 * Synthetic checks cron — every 15 min (vercel.json). Runs the shared
 * synthetic suite (URL uptime, sitemap/robots, redirect contracts), persists
 * results to synthetic_checks, and fires deduped Slack alerts when thresholds trip:
 *   - any important URL 5xx / down / slow
 *   - JS errors >20/hour (from site_events)
 *   - lead pipeline destination failing >5% over the last 100 leads
 *
 * Monitoring-store problems (a table missing, a failed save, alert dedupe
 * unavailable) are NOT swallowed: they come back in `monitoringErrors` and make
 * `ok` false. They are deliberately NOT sent to Slack — the broken store is often
 * the dedupe store itself, so alerting on it would repeat every run.
 *
 * Auth: Vercel cron (Authorization: Bearer CRON_SECRET) or ?password= admin.
 */
import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized, extractPassword } from '@/lib/admin-auth';
import { ccClient, sendAlert } from '@/lib/command-center';
import { runSyntheticSuite } from '@/lib/synthetic';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

type AlertOutcome = { fired: string[]; monitoringErrors: string[] };

/** Record an alert attempt: fired, or — if alerting itself is broken — an error. */
function noteAlert(out: AlertOutcome, key: string, r: { sent: boolean; reason?: string }) {
  if (r.sent) out.fired.push(key);
  if (r.reason?.startsWith('alerting unavailable')) out.monitoringErrors.push(r.reason);
}

async function evaluateAlerts(out: AlertOutcome): Promise<void> {
  if (!ccClient) {
    out.monitoringErrors.push('Supabase not configured — threshold alerts not evaluated');
    return;
  }

  // JS errors >20 in the last hour
  try {
    const since = new Date(Date.now() - 3600_000).toISOString();
    const { count, error } = await ccClient
      .from('site_events')
      .select('id', { count: 'exact', head: true })
      .eq('event', 'js_error')
      .gte('ts', since);
    if (error) {
      out.monitoringErrors.push(`site_events: ${error.message} — JS-error alert not evaluated`);
    } else if ((count ?? 0) > 20) {
      noteAlert(out, 'js-errors-hourly', await sendAlert('js-errors-hourly', `${count} JS errors in the last hour on govcongiants.com (threshold 20). Check /dashboard/command-center.`));
    }
  } catch (e) {
    out.monitoringErrors.push(`site_events: ${e instanceof Error ? e.message : String(e)}`);
  }

  // Pipeline destination failure rate >5% over the last 100 non-canary leads
  try {
    const { data, error } = await ccClient
      .from('lead_pipeline_log')
      .select('ghl_ok,supabase_ok,slack_ok,email_ok')
      .neq('source', 'canary')
      .order('ts', { ascending: false })
      .limit(100);
    if (error) {
      out.monitoringErrors.push(`lead_pipeline_log: ${error.message} — pipeline failure-rate alert not evaluated`);
      return;
    }
    const rows = data ?? [];
    if (rows.length >= 10) {
      for (const dest of ['ghl_ok', 'supabase_ok', 'slack_ok', 'email_ok'] as const) {
        const attempted = rows.filter((r) => r[dest] !== null);
        const failed = attempted.filter((r) => r[dest] === false).length;
        const rate = attempted.length ? failed / attempted.length : 0;
        if (rate > 0.05) {
          const name = dest.replace('_ok', '');
          noteAlert(
            out,
            `pipeline-${name}-failing`,
            await sendAlert(
              `pipeline-${name}-failing`,
              `Lead pipeline destination *${name}* failing at ${(rate * 100).toFixed(1)}% over the last ${attempted.length} leads. Check /dashboard/command-center.`,
            ),
          );
        }
      }
    }
  } catch (e) {
    out.monitoringErrors.push(`lead_pipeline_log: ${e instanceof Error ? e.message : String(e)}`);
  }
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const auth = request.headers.get('authorization');
  const isCron = cronSecret && auth === `Bearer ${cronSecret}`;
  if (!isCron && !isAuthorized(extractPassword(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { checks, persistence } = await runSyntheticSuite();
  const failures = checks.filter((r) => !r.ok);
  const out: AlertOutcome = { fired: [], monitoringErrors: [] };
  if (!persistence.ok) {
    out.monitoringErrors.push(
      `synthetic_checks: saved ${persistence.saved}/${persistence.attempted} results — ${persistence.error}`,
    );
  }

  // Alert on each distinct failure class (deduped 4h inside sendAlert).
  for (const f of failures) {
    const key = `synthetic-${f.check}-${f.target ?? ''}`;
    noteAlert(
      out,
      key,
      await sendAlert(
        key,
        `Synthetic check *${f.check}* FAILED for ${f.target ?? 'target'} — status ${f.status ?? 'n/a'}${f.detail ? ` (${f.detail})` : ''}.`,
      ),
    );
  }
  await evaluateAlerts(out);

  const monitoringErrors = [...new Set(out.monitoringErrors)];
  if (monitoringErrors.length) console.error('[synthetic-checks] monitoring unavailable:', monitoringErrors);

  return NextResponse.json({
    ok: failures.length === 0 && monitoringErrors.length === 0,
    checksOk: failures.length === 0,
    ran: checks.length,
    failures: failures.map((f) => ({ check: f.check, target: f.target, status: f.status, detail: f.detail })),
    persistence,
    monitoringErrors,
    alertsSent: out.fired,
  });
}
