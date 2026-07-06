/**
 * Weekly "striking-distance actions" report.
 *
 * The plain striking-distance list (getStriking) tells you WHICH queries sit on
 * page 2. This turns that into an ACTION list: for each winnable query it maps
 * the exact page that ranks + its position, filters out noise (map-scraper junk,
 * the high-authority "giants" that need backlinks not internal links, and
 * queries a human already actioned), and ranks by opportunity so Monday's report
 * says "fix THESE pages this week."
 *
 * It deliberately does NOT auto-edit content — it surfaces targets for approval
 * (a human applies the internal-link fix with local file access). See
 * project_gcg_striking_distance_experiment memory for the playbook.
 */
import { gscQuery } from './client';
import { trailing28Windows } from './query';
import type { SeoSite } from '../seo-sites';
import { DEFAULT_SEO_SITE } from '../seo-sites';

export interface StrikingAction {
  query: string;
  page: string; // path, e.g. /blog/proposal-manager-career-path
  position: number;
  impressions: number;
  clicks: number;
  score: number; // impressions × how close to page 1 (higher = better opportunity)
}

// Queries that rank but aren't real internal-link opportunities:
//  - SBA HUBZone map scraper junk ("...county, pa, usa" "maps.certify.sba.gov")
//  - off-target queries where a page accidentally ranks (competitor tool names)
// Matched case-insensitively against the query text.
const NOISE_PATTERNS: RegExp[] = [
  /maps\.certify\.sba\.gov/i,
  /county.*usa/i,
  /g2xchange\.com/i,
  /bincs search engine/i,
  /"[^"]+"\s+"[^"]+"/, // multi-quoted "operator" queries = scraper/boolean noise
];

// The high-impression "giants": already have good titles + are well-linked, so
// their position ceiling is OFF-PAGE authority (backlinks), NOT internal links.
// Surfacing them weekly as "fixable" would be misleading — they belong to the
// backlink-outreach track. Keyed by the query root.
const GIANT_QUERIES: RegExp[] = [
  /^cage code/i,
  /^gsa schedule/i,
  /^naics code/i,
];

/**
 * Build the ranked action list for one site. `pos 8–20` widens the standard
 * striking band (getStriking uses >10) to include bottom-of-page-1 pages that
 * a link boost can lift into the high-CTR zone.
 */
export async function buildStrikingActions(
  ref: Date,
  site: SeoSite = DEFAULT_SEO_SITE,
): Promise<StrikingAction[]> {
  const { current } = trailing28Windows(ref);
  const su = site.gscSiteUrl;

  // 1) Candidate queries: page-2ish, with enough impressions to matter.
  const qRes = await gscQuery<{ rows?: Array<{ keys: string[]; position: number; impressions: number; clicks: number }> }>(
    {
      startDate: current.startDate,
      endDate: current.endDate,
      dimensions: ['query'],
      rowLimit: 500,
    },
    su,
  );
  const candidates = (qRes.rows || [])
    .filter((r) => r.position >= 8 && r.position <= 20 && r.impressions >= 40)
    .filter((r) => !NOISE_PATTERNS.some((re) => re.test(r.keys[0])))
    .filter((r) => !GIANT_QUERIES.some((re) => re.test(r.keys[0])))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15); // cap the per-query page lookups

  // 2) Map each candidate query → the page that actually ranks for it.
  const actions: StrikingAction[] = [];
  for (const c of candidates) {
    const pRes = await gscQuery<{ rows?: Array<{ keys: string[]; position: number; impressions: number; clicks: number }> }>(
      {
        startDate: current.startDate,
        endDate: current.endDate,
        dimensions: ['query', 'page'],
        dimensionFilterGroups: [{ filters: [{ dimension: 'query', operator: 'equals', expression: c.keys[0] }] }],
        rowLimit: 1,
      },
      su,
    );
    const top = (pRes.rows || [])[0];
    if (!top) continue;
    // The page that actually ranks for this query must itself be in the striking
    // band. Guards the case where the aggregate query sits at pos 9 but its top
    // page ranks far worse (e.g. the homepage at pos 60) — not a real target.
    if (top.position > 20) continue;
    const page = top.keys[1].replace(/^https?:\/\/[^/]+/, '') || '/';
    // Opportunity score: impressions weighted by closeness to page 1.
    // A pos-10 page one nudge away scores higher than a pos-19 page.
    const closeness = Math.max(0, 21 - top.position) / 13; // ~1.0 at pos 8, ~0.15 at pos 20
    actions.push({
      query: c.keys[0],
      page,
      position: Number(top.position.toFixed(1)),
      impressions: top.impressions,
      clicks: top.clicks,
      score: Math.round(top.impressions * closeness),
    });
  }

  // Collapse duplicate pages (several queries → one page): keep the best-scoring
  // query per page so the action list is "fix N pages," not "fix N queries."
  const byPage = new Map<string, StrikingAction>();
  for (const a of actions) {
    const cur = byPage.get(a.page);
    if (!cur || a.score > cur.score) byPage.set(a.page, a);
  }
  return [...byPage.values()].sort((a, b) => b.score - a.score);
}

/** Slack Block Kit for the weekly striking-distance action list. */
export function strikingActionsBlocks(siteLabel: string, actions: StrikingAction[]): unknown[] {
  if (actions.length === 0) {
    return [
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `*🎯 Striking-distance targets — ${siteLabel}*\n_No winnable page-2 pages this week (all clear or all giants)._` },
      },
    ];
  }
  const lines = actions
    .slice(0, 10)
    .map(
      (a, i) =>
        `${i + 1}. pos *${a.position}* · ${a.impressions.toLocaleString()} impr · \`${a.page}\`\n     → _"${a.query}"_`,
    )
    .join('\n');
  return [
    {
      type: 'header',
      text: { type: 'plain_text', text: `🎯 Striking-distance targets — ${siteLabel}`, emoji: true },
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: 'Page-2 pages one internal-link boost from page 1. Fix: add exact-match-anchor links from high-authority related pages. (Giants + map-scraper noise filtered out.)',
        },
      ],
    },
    { type: 'section', text: { type: 'mrkdwn', text: lines } },
  ];
}
