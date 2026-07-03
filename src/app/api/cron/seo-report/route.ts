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
import { SEO_SITES, resolveSeoSite } from '@/lib/seo-sites';

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

  // ?site=<domain> reports one site; default = all sites in SEO_SITES.
  // One site failing (e.g. a transient GSC 5xx) must not block the others,
  // so each site posts its own Slack message and we collect per-site results.
  const siteParam = new URL(req.url).searchParams.get('site');
  let sites;
  try {
    sites = siteParam ? [resolveSeoSite(siteParam)] : SEO_SITES;
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 400 });
  }

  const results: Array<{ site: string; posted: boolean; error?: string; totals?: unknown }> = [];

  for (const site of sites) {
    try {
      const report = await buildReport(new Date(), site);
      const blocks = toSlackBlocks(report);

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `Weekly SEO report — ${site.label} — ${report.totals.clicks.toLocaleString()} clicks, ${report.totals.impressions.toLocaleString()} impressions (28d)`,
          blocks,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        results.push({ site: site.key, posted: false, error: `Slack post failed: ${res.status} ${errText.slice(0, 200)}` });
        continue;
      }
      results.push({ site: site.key, posted: true, totals: report.totals });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      console.error(`SEO report cron failed for ${site.key}:`, message);
      results.push({ site: site.key, posted: false, error: message });
    }
  }

  const allFailed = results.length > 0 && results.every((r) => !r.posted);
  return NextResponse.json({ ok: !allFailed, results }, { status: allFailed ? 502 : 200 });
}
