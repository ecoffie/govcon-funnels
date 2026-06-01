/**
 * Google Analytics 4 Data API client.
 *
 * Auth via a service account that has been granted "Viewer" on the GA4 property.
 * Set these env vars (see tasks/ga4-dashboard-setup.md):
 *   - GA4_PROPERTY_ID            e.g. "328855144" (numeric, NOT the G-XXXX measurement id)
 *   - GA4_SA_CLIENT_EMAIL        service account email
 *   - GA4_SA_PRIVATE_KEY         service account private key (with \n escapes)
 *
 * The /mi-free A/B test fires two events (see src/lib/ab-test.ts):
 *   - ab_test_assignment  params: test_id, test_name, variant_id, variant_name
 *   - ab_test_conversion  params: test_id, test_name, variant_id, conversion_type
 * Both carry variant_id, so we join on variant_id to compute conversion rate per variant.
 */
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;

let client: BetaAnalyticsDataClient | null = null;

function getClient(): BetaAnalyticsDataClient {
  if (client) return client;

  const clientEmail = process.env.GA4_SA_CLIENT_EMAIL;
  const privateKey = process.env.GA4_SA_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey || !PROPERTY_ID) {
    throw new Error(
      'GA4 not configured. Set GA4_PROPERTY_ID, GA4_SA_CLIENT_EMAIL, GA4_SA_PRIVATE_KEY.'
    );
  }

  client = new BetaAnalyticsDataClient({
    credentials: { client_email: clientEmail, private_key: privateKey },
  });
  return client;
}

export function isGa4Configured(): boolean {
  return Boolean(
    process.env.GA4_PROPERTY_ID &&
      process.env.GA4_SA_CLIENT_EMAIL &&
      process.env.GA4_SA_PRIVATE_KEY
  );
}

export interface AnalyticsSummary {
  totals: {
    activeUsers: number;
    newUsers: number;
    sessions: number;
    screenPageViews: number;
    // percent change vs the prior period of equal length
    activeUsersChangePct: number | null;
  };
  topLandingPages: { path: string; sessions: number; users: number }[];
  abTest: {
    variantName: string;
    assignments: number;
    conversions: number;
    conversionRatePct: number;
  }[];
}

const property = () => `properties/${PROPERTY_ID}`;

/** Build a GA4 dateRange relative offset string. */
function num(v: string | null | undefined): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Fetch the full dashboard summary in parallel.
 * @param days lookback window in days (default 28)
 */
export async function getAnalyticsSummary(days = 28): Promise<AnalyticsSummary> {
  const analytics = getClient();
  const start = `${days}daysAgo`;
  const priorStart = `${days * 2}daysAgo`;
  const priorEnd = `${days + 1}daysAgo`;

  const totalsMetrics = [
    { name: 'activeUsers' },
    { name: 'newUsers' },
    { name: 'sessions' },
    { name: 'screenPageViews' },
  ];

  const [curTotalsRes, priorTotalsRes, topPagesRes, abRes] = await Promise.all([
    // Current-period totals
    analytics.runReport({
      property: property(),
      dateRanges: [{ startDate: start, endDate: 'today' }],
      metrics: totalsMetrics,
    }),
    // Prior-period totals (equal length, immediately before) for % change
    analytics.runReport({
      property: property(),
      dateRanges: [{ startDate: priorStart, endDate: priorEnd }],
      metrics: totalsMetrics,
    }),
    // Top landing pages by sessions
    analytics.runReport({
      property: property(),
      dateRanges: [{ startDate: start, endDate: 'today' }],
      dimensions: [{ name: 'landingPagePlusQueryString' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 15,
    }),
    // A/B test: count assignment + conversion events grouped by event + variant_id
    analytics.runReport({
      property: property(),
      dateRanges: [{ startDate: start, endDate: 'today' }],
      dimensions: [
        { name: 'eventName' },
        { name: 'customEvent:variant_id' },
        { name: 'customEvent:variant_name' },
      ],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          inListFilter: {
            values: ['ab_test_assignment', 'ab_test_conversion'],
          },
        },
      },
    }),
  ]);

  // --- Totals + % change ---
  const cur = curTotalsRes[0].rows?.[0];
  const prior = priorTotalsRes[0].rows?.[0];

  const curUsers = num(cur?.metricValues?.[0]?.value);
  const priorUsers = num(prior?.metricValues?.[0]?.value);
  const activeUsersChangePct =
    priorUsers > 0 ? ((curUsers - priorUsers) / priorUsers) * 100 : null;

  const totals = {
    activeUsers: curUsers,
    newUsers: num(cur?.metricValues?.[1]?.value),
    sessions: num(cur?.metricValues?.[2]?.value),
    screenPageViews: num(cur?.metricValues?.[3]?.value),
    activeUsersChangePct,
  };

  // --- Top landing pages ---
  const topLandingPages = (topPagesRes[0].rows ?? []).map((r) => ({
    path: r.dimensionValues?.[0]?.value ?? '(unknown)',
    sessions: num(r.metricValues?.[0]?.value),
    users: num(r.metricValues?.[1]?.value),
  }));

  // --- A/B test join on variant_id ---
  const byVariant = new Map<
    string,
    { variantName: string; assignments: number; conversions: number }
  >();
  for (const r of abRes[0].rows ?? []) {
    const event = r.dimensionValues?.[0]?.value;
    const variantId = r.dimensionValues?.[1]?.value ?? '(unset)';
    const variantName = r.dimensionValues?.[2]?.value;
    const count = num(r.metricValues?.[0]?.value);

    const entry =
      byVariant.get(variantId) ??
      { variantName: variantId, assignments: 0, conversions: 0 };
    // assignment events carry variant_name; prefer it as the label
    if (variantName && variantName !== '(not set)') entry.variantName = variantName;
    if (event === 'ab_test_assignment') entry.assignments += count;
    if (event === 'ab_test_conversion') entry.conversions += count;
    byVariant.set(variantId, entry);
  }

  const abTest = [...byVariant.values()]
    .map((v) => ({
      ...v,
      conversionRatePct:
        v.assignments > 0 ? (v.conversions / v.assignments) * 100 : 0,
    }))
    .sort((a, b) => b.assignments - a.assignments);

  return { totals, topLandingPages, abTest };
}
