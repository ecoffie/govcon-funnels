/**
 * On-demand SEO performance report for govcongiants.com.
 *
 * Pulls live Google Search Console data (clicks, impressions, CTR,
 * position) via the reused mindy-bq-reader service account and prints
 * a terminal report: site totals + 28d-over-28d deltas, top pages,
 * top queries, CTR opportunities, page-2 "striking distance" queries,
 * and the biggest movers up/down.
 *
 * Run:  npx tsx scripts/seo-report.ts
 *
 * Prereq: mindy-bq-reader@market-assasin.iam.gserviceaccount.com must
 * be added as a Restricted user on the govcongiants.com GSC property.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
import {
  trailing28Windows,
  getTotals,
  getTopPages,
  getTopQueries,
  getCtrLosers,
  getStriking,
  getPageDeltas,
  type GscRow,
} from '../src/lib/gsc/query';

const SITE = 'govcongiants.com';

function pct(n: number): string {
  return (n * 100).toFixed(1) + '%';
}
function pos(n: number): string {
  return n ? n.toFixed(1) : '—';
}
function shortPath(url: string): string {
  return url.replace(/^https?:\/\/[^/]+/, '') || '/';
}
function arrow(delta: number): string {
  if (delta > 0) return `▲ +${delta}`;
  if (delta < 0) return `▼ ${delta}`;
  return '  0';
}
function deltaPct(cur: number, prev: number): string {
  if (!prev) return cur ? 'new' : '—';
  const d = ((cur - prev) / prev) * 100;
  const s = d >= 0 ? '+' : '';
  return `${s}${d.toFixed(0)}%`;
}

async function main() {
  // Date.now() is unavailable in workflow scripts, but this is a normal
  // tsx script so new Date() is fine.
  const now = new Date();
  const { current, previous } = trailing28Windows(now);

  console.log('\n════════════════════════════════════════════════════════════');
  console.log(`  SEO PERFORMANCE REPORT — ${SITE}`);
  console.log(`  Current:  ${current.startDate} → ${current.endDate}  (trailing 28d)`);
  console.log(`  Previous: ${previous.startDate} → ${previous.endDate}`);
  console.log('════════════════════════════════════════════════════════════');

  const [curTotals, prevTotals] = await Promise.all([
    getTotals(current),
    getTotals(previous),
  ]);

  console.log('\n── SITE TOTALS (28d vs prior 28d) ──');
  console.log(
    `  Clicks:       ${curTotals.clicks.toLocaleString().padStart(8)}   (${deltaPct(
      curTotals.clicks,
      prevTotals.clicks
    )})`
  );
  console.log(
    `  Impressions:  ${curTotals.impressions.toLocaleString().padStart(8)}   (${deltaPct(
      curTotals.impressions,
      prevTotals.impressions
    )})`
  );
  console.log(
    `  CTR:          ${pct(curTotals.ctr).padStart(8)}   (prev ${pct(prevTotals.ctr)})`
  );
  console.log(
    `  Avg position: ${pos(curTotals.position).padStart(8)}   (prev ${pos(
      prevTotals.position
    )})`
  );

  const [topPages, topQueries, ctrLosers, striking, deltas] = await Promise.all([
    getTopPages(current, 15),
    getTopQueries(current, 15),
    getCtrLosers(current, 100, 12),
    getStriking(current, 12),
    getPageDeltas(current, previous),
  ]);

  const printRows = (rows: GscRow[], label: string) => {
    console.log(`\n── ${label} ──`);
    console.log('  clicks  impr    ctr     pos   key');
    for (const r of rows) {
      console.log(
        `  ${String(r.clicks).padStart(5)}  ${String(r.impressions).padStart(6)}  ${pct(
          r.ctr
        ).padStart(6)}  ${pos(r.position).padStart(5)}  ${shortPath(r.keys[0])}`
      );
    }
  };

  printRows(topPages, 'TOP PAGES BY CLICKS');
  printRows(topQueries, 'TOP QUERIES BY CLICKS');

  console.log('\n── CTR OPPORTUNITIES (high impressions, low CTR → rewrite title/meta) ──');
  console.log('  impr    ctr     pos   page');
  for (const r of ctrLosers) {
    console.log(
      `  ${String(r.impressions).padStart(6)}  ${pct(r.ctr).padStart(6)}  ${pos(
        r.position
      ).padStart(5)}  ${shortPath(r.keys[0])}`
    );
  }

  console.log('\n── STRIKING DISTANCE (page-2 queries, pos 11-20 → small push wins page 1) ──');
  console.log('  impr    pos   query');
  for (const r of striking) {
    console.log(
      `  ${String(r.impressions).padStart(6)}  ${pos(r.position).padStart(5)}  ${r.keys[0]}`
    );
  }

  const movers = deltas.filter((d) => d.clicks + d.prevClicks >= 5);
  const gainers = [...movers].sort((a, b) => b.clicksDelta - a.clicksDelta).slice(0, 8);
  const losers = [...movers].sort((a, b) => a.clicksDelta - b.clicksDelta).slice(0, 8);

  console.log('\n── BIGGEST GAINERS (clicks Δ vs prior 28d) ──');
  for (const d of gainers) {
    if (d.clicksDelta <= 0) break;
    console.log(`  ${arrow(d.clicksDelta).padStart(8)}  ${d.prevClicks}→${d.clicks}   ${shortPath(d.page)}`);
  }

  console.log('\n── BIGGEST DECLINERS ──');
  for (const d of losers) {
    if (d.clicksDelta >= 0) break;
    console.log(`  ${arrow(d.clicksDelta).padStart(8)}  ${d.prevClicks}→${d.clicks}   ${shortPath(d.page)}`);
  }

  console.log('\n════════════════════════════════════════════════════════════\n');
}

main().catch((e) => {
  console.error('\n❌ SEO report failed:', e instanceof Error ? e.message : e);
  if (String(e).includes('403') || String(e).includes('does not have')) {
    console.error(
      '\n→ Likely the service account is not yet added to the GSC property.\n' +
        '  Add  mindy-bq-reader@market-assasin.iam.gserviceaccount.com  as a\n' +
        '  Restricted user on the govcongiants.com property, then re-run.'
    );
  }
  process.exit(1);
});
