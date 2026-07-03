/**
 * On-demand SEO performance report — govcongiants.com, getmindy.ai, or encoregov.com.
 *
 * Pulls live Google Search Console data via the reused mindy-bq-reader
 * service account and prints a terminal report. Shares its data-building
 * with the weekly Slack cron (src/lib/gsc/report.ts → buildReport).
 *
 * Run:
 *   npx tsx scripts/seo-report.ts                 # default: govcongiants.com
 *   npx tsx scripts/seo-report.ts getmindy.ai     # one site
 *   npx tsx scripts/seo-report.ts encoregov.com
 *   npx tsx scripts/seo-report.ts all             # every site in SEO_SITES
 *
 * Prereq: mindy-bq-reader@market-assasin.iam.gserviceaccount.com must have
 * GSC read access on the property (all three already granted, verified 2026-07-03).
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
import { buildReport, pct, deltaPct, shortPath } from '../src/lib/gsc/report';
import type { GscRow } from '../src/lib/gsc/query';
import { buildGaReport } from '../src/lib/ga/query';
import { SEO_SITES, resolveSeoSite, type SeoSite } from '../src/lib/seo-sites';

function pos(n: number): string {
  return n ? n.toFixed(1) : '—';
}

async function reportForSite(site: SeoSite) {
  const r = await buildReport(new Date(), site);

  console.log('\n════════════════════════════════════════════════════════════');
  console.log(`  SEO PERFORMANCE REPORT — ${site.label}`);
  console.log(`  Current:  ${r.range.current.startDate} → ${r.range.current.endDate}  (trailing 28d)`);
  console.log(`  Previous: ${r.range.previous.startDate} → ${r.range.previous.endDate}`);
  console.log('════════════════════════════════════════════════════════════');

  const t = r.totals;
  console.log('\n── SITE TOTALS (28d vs prior 28d) ──');
  console.log(`  Clicks:       ${t.clicks.toLocaleString().padStart(8)}   (${deltaPct(t.clicks, t.prevClicks)})`);
  console.log(`  Impressions:  ${t.impressions.toLocaleString().padStart(8)}   (${deltaPct(t.impressions, t.prevImpressions)})`);
  console.log(`  CTR:          ${pct(t.ctr).padStart(8)}   (prev ${pct(t.prevCtr)})`);
  console.log(`  Avg position: ${pos(t.position).padStart(8)}   (prev ${pos(t.prevPosition)})`);

  const printRows = (rows: GscRow[], label: string) => {
    console.log(`\n── ${label} ──`);
    console.log('  clicks  impr    ctr     pos   key');
    for (const row of rows) {
      console.log(
        `  ${String(row.clicks).padStart(5)}  ${String(row.impressions).padStart(6)}  ${pct(row.ctr).padStart(6)}  ${pos(row.position).padStart(5)}  ${shortPath(row.keys[0])}`
      );
    }
  };

  printRows(r.topPages, 'TOP PAGES BY CLICKS');
  printRows(r.topQueries, 'TOP QUERIES BY CLICKS');

  console.log('\n── CTR OPPORTUNITIES (high impressions, low CTR) ──');
  console.log('  impr    ctr     pos   page');
  for (const row of r.ctrLosers) {
    console.log(`  ${String(row.impressions).padStart(6)}  ${pct(row.ctr).padStart(6)}  ${pos(row.position).padStart(5)}  ${shortPath(row.keys[0])}`);
  }

  console.log('\n── STRIKING DISTANCE (page-2 queries, pos 11-20) ──');
  console.log('  impr    pos   query');
  for (const row of r.striking) {
    console.log(`  ${String(row.impressions).padStart(6)}  ${pos(row.position).padStart(5)}  ${row.keys[0]}`);
  }

  console.log('\n── BIGGEST GAINERS (clicks Δ vs prior 28d) ──');
  for (const d of r.gainers) {
    console.log(`  ${('▲ +' + d.clicksDelta).padStart(8)}  ${d.prevClicks}→${d.clicks}   ${shortPath(d.page)}`);
  }

  console.log('\n── BIGGEST DECLINERS ──');
  if (r.decliners.length === 0) console.log('  (none)');
  for (const d of r.decliners) {
    console.log(`  ${('▼ ' + d.clicksDelta).padStart(8)}  ${d.prevClicks}→${d.clicks}   ${shortPath(d.page)}`);
  }

  // ── GOOGLE ANALYTICS (traffic) — the overlay: GSC = visibility, GA = did they come.
  const ga = await buildGaReport(new Date(), site);
  console.log('\n── GOOGLE ANALYTICS — TRAFFIC (28d vs prior 28d) ──');
  if (!ga.available) {
    console.log(`  (unavailable) ${ga.reason ?? ''}`);
  } else {
    const g = ga.totals;
    console.log(`  Sessions:          ${g.sessions.toLocaleString().padStart(8)}   (${deltaPct(g.sessions, g.prevSessions)})`);
    console.log(`  Users:             ${g.users.toLocaleString().padStart(8)}   (${deltaPct(g.users, g.prevUsers)})`);
    console.log(`  Engaged sessions:  ${g.engagedSessions.toLocaleString().padStart(8)}   (${deltaPct(g.engagedSessions, g.prevEngagedSessions)})`);
    console.log('\n  Sessions by channel:');
    for (const c of ga.channels.slice(0, 8)) {
      console.log(`    ${String(c.sessions).padStart(6)}  ${c.channel}`);
    }
  }

  console.log('\n════════════════════════════════════════════════════════════\n');
}

async function main() {
  // CLI: [site] — a domain key, "all", or nothing (→ govcongiants.com default).
  const arg = (process.argv[2] || '').trim().toLowerCase();
  const sites = arg === 'all' ? SEO_SITES : [resolveSeoSite(arg || undefined)];

  for (const site of sites) {
    try {
      await reportForSite(site);
    } catch (e) {
      // One site failing (e.g. a bad GA grant) shouldn't kill the rest.
      console.error(`\n❌ ${site.label} report failed:`, e instanceof Error ? e.message : e);
      if (String(e).includes('403') || String(e).includes('does not have')) {
        console.error(
          `\n→ Likely the service account can't read ${site.label}'s GSC property (${site.gscSiteUrl}).\n` +
            '  Add  mindy-bq-reader@market-assasin.iam.gserviceaccount.com  to that property, then re-run.'
        );
      }
      if (sites.length === 1) process.exit(1);
    }
  }
}

main().catch((e) => {
  console.error('\n❌ SEO report failed:', e instanceof Error ? e.message : e);
  process.exit(1);
});
