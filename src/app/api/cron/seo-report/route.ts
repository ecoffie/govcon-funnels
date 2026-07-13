/**
 * Weekly SEO report cron — pulls live Google Search Console data and
 * posts a summary to the #seo Slack channel.
 *
 * Scheduled by a single entry in vercel.json (Mondays 12:00 UTC = 8am ET).
 * This is the ONLY Vercel cron in the funnels repo.
 *
 * WHY chat.postMessage (not the lead webhook):
 *   #seo is fed by the "Govcon Giants" bot via chat.postMessage — market-assassin
 *   posts getmindy.ai there, the encore repo posts encoregov.com. This repo owns
 *   govcongiants.com, so it posts govcongiants.com to #seo the same way.
 *   The OLD code posted via SLACK_LEAD_WEBHOOK_URL, which is the LEAD-notification
 *   webhook bound to the leads channel — so govcongiants' report was silently
 *   landing in the leads channel and never appeared in #seo (fixed 2026-07-13).
 *   chat.postMessage also returns real delivery status (channel_not_found /
 *   not_in_channel), so a misroute is loud instead of a fire-and-forget 200.
 *
 * Default scope is govcongiants.com ONLY (getmindy.ai + encoregov.com are already
 * posted to #seo by their own repos — reporting them here would duplicate). Use
 * ?site=<domain> for one site or ?site=all to force every site in SEO_SITES.
 *
 * Auth: Vercel cron invocations send `Authorization: Bearer <CRON_SECRET>`.
 * We accept that, OR the admin password (for manual ?password= testing).
 *
 * Runtime needs GCP_SA_JSON (service account), SLACK_SEO_BOT_TOKEN (the Govcon
 * Giants bot, a member of #seo) and optionally SEO_SLACK_CHANNEL (defaults to the
 * #seo channel id).
 */
import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized, extractPassword } from '@/lib/admin-auth';
import { buildReport, toSlackBlocks } from '@/lib/gsc/report';
import { buildStrikingActions, strikingActionsBlocks } from '@/lib/gsc/striking-actions';
import { SEO_SITES, DEFAULT_SEO_SITE, resolveSeoSite } from '@/lib/seo-sites';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// #seo channel id (govcongiants.slack.com). Overridable via SEO_SLACK_CHANNEL.
const DEFAULT_SEO_CHANNEL = 'C061RDR722J';

function authorized(req: NextRequest): boolean {
  // Vercel cron secret (Authorization: Bearer <CRON_SECRET>).
  const auth = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;
  // Fall back to the shared admin password (manual trigger / testing).
  return isAuthorized(extractPassword(req));
}

/**
 * Post to Slack via chat.postMessage. Unlike an incoming webhook (which returns a
 * bare "ok" body and can't tell you the message was actually delivered), this
 * returns `{ ok, error }` — so a misrouted/blocked post surfaces a real error
 * (channel_not_found, not_in_channel, invalid_blocks, …) instead of a silent gap.
 */
async function postMessage(
  token: string,
  channel: string,
  text: string,
  blocks: unknown[]
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ channel, text, blocks, mrkdwn: true }),
    });
    return (await res.json()) as { ok: boolean; error?: string };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Post a short failure notice so a site that failed to report is visible instead
 * of just silently missing from the channel. Best-effort: swallow a failure here.
 */
async function postFailureNotice(
  token: string,
  channel: string,
  siteLabel: string,
  error: string
): Promise<void> {
  const result = await postMessage(
    token,
    channel,
    `⚠️ Weekly SEO report — ${siteLabel} — could not be generated this run. ${error.slice(0, 300)}`,
    []
  );
  if (!result.ok) {
    console.error(`SEO report: failed to post failure notice for ${siteLabel}:`, result.error);
  }
}

/**
 * Retry an async call with BACKOFF between attempts. GSC intermittently 5xx's /
 * times out on the biggest queries (govcongiants.com); spacing the attempts gives
 * a transient error time to clear so the site isn't silently dropped.
 */
async function withBackoff<T>(fn: () => Promise<T>, label: string, attempts = 3, baseDelayMs = 2500): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (i < attempts - 1) {
        const delay = baseDelayMs * (i + 1);
        console.warn(`SEO report: ${label} attempt ${i + 1}/${attempts} failed, retrying in ${delay}ms:`, e instanceof Error ? e.message : e);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  throw lastErr;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const token = process.env.SLACK_SEO_BOT_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'SLACK_SEO_BOT_TOKEN not set' }, { status: 500 });
  }
  const channel = process.env.SEO_SLACK_CHANNEL || DEFAULT_SEO_CHANNEL;

  // Scope: default = govcongiants.com only (this repo's site for #seo). getmindy.ai
  // + encoregov.com are posted to #seo by their own repos, so we don't duplicate.
  // ?site=all forces every site; ?site=<domain> targets one.
  const siteParam = new URL(req.url).searchParams.get('site');
  let sites;
  try {
    if (siteParam === 'all') sites = SEO_SITES;
    else if (siteParam) sites = [resolveSeoSite(siteParam)];
    else sites = [DEFAULT_SEO_SITE];
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 400 });
  }

  const results: Array<{ site: string; posted: boolean; error?: string; totals?: unknown }> = [];

  for (const site of sites) {
    try {
      // GSC occasionally returns a transient 5xx/timeout; retry with backoff so a
      // blip doesn't silently drop a site.
      const report = await withBackoff(() => buildReport(new Date(), site), site.key);
      const blocks = toSlackBlocks(report);

      const result = await postMessage(
        token,
        channel,
        `Weekly SEO report — ${site.label} — ${report.totals.clicks.toLocaleString()} clicks, ${report.totals.impressions.toLocaleString()} impressions (28d)`,
        blocks
      );

      if (!result.ok) {
        const error = `Slack post failed: ${result.error}`;
        results.push({ site: site.key, posted: false, error });
        await postFailureNotice(token, channel, site.label, error);
        continue;
      }
      results.push({ site: site.key, posted: true, totals: report.totals });

      // Weekly striking-distance ACTION list: page-2 pages one internal-link boost
      // from page 1. Best-effort — a failure here must never fail the main report.
      try {
        const actions = await buildStrikingActions(new Date(), site);
        await postMessage(
          token,
          channel,
          `Striking-distance targets — ${site.label} — ${actions.length} winnable page(s)`,
          strikingActionsBlocks(site.label, actions)
        );
      } catch (saErr) {
        console.warn(`Striking-distance actions failed for ${site.key}:`, saErr instanceof Error ? saErr.message : saErr);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      console.error(`SEO report cron failed for ${site.key}:`, message);
      results.push({ site: site.key, posted: false, error: message });
      // A silent gap reads as "that site has no data." Post a short notice so a
      // failed site is visible and self-explaining, not just missing.
      await postFailureNotice(token, channel, site.label, message);
    }
  }

  const allFailed = results.length > 0 && results.every((r) => !r.posted);
  return NextResponse.json({ ok: !allFailed, channel, results }, { status: allFailed ? 502 : 200 });
}
