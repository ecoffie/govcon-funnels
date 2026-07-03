/**
 * GA4 traffic metrics for the SEO report — sessions, users, engagement, and the
 * traffic-source breakdown, period-over-period on the SAME trailing-28d windows
 * the GSC report uses (so search + traffic line up — one canonical stat set).
 *
 * GSC answers "search visibility"; GA answers "did traffic actually come."
 */
import { getAnalyticsClient, getPropertyId } from './client';
import { trailing28Windows, type DateRange } from '../gsc/query';
import { DEFAULT_SEO_SITE, type SeoSite } from '../seo-sites';

export interface GaTotals {
  sessions: number;
  users: number;
  engagedSessions: number;
  prevSessions: number;
  prevUsers: number;
  prevEngagedSessions: number;
}

export interface GaChannel {
  channel: string; // e.g. "Organic Search", "Direct", "Referral"
  sessions: number;
}

export interface GaReport {
  available: boolean;         // false if not configured / access missing
  reason?: string;            // why unavailable, for honest reporting
  range: { current: DateRange; previous: DateRange };
  totals: GaTotals;
  channels: GaChannel[];      // current-period sessions by default channel group
}

async function runReport(range: DateRange, metrics: string[], dimensions: string[] = [], propertyId?: string) {
  const client = getAnalyticsClient();
  const property = `properties/${propertyId ?? getPropertyId()}`;
  const [resp] = await client.runReport({
    property,
    dateRanges: [{ startDate: range.startDate, endDate: range.endDate }],
    metrics: metrics.map((name) => ({ name })),
    dimensions: dimensions.map((name) => ({ name })),
  });
  return resp;
}

// The GA client's row shape is loosely typed (google.analytics.data.v1beta.IRow);
// read the metric value defensively rather than reproduce that interface.
function metricVal(row: unknown, i: number): number {
  const mv = (row as { metricValues?: Array<{ value?: string | null }> } | undefined)?.metricValues;
  return Number(mv?.[i]?.value ?? 0);
}

/** Build the GA slice of the report. Returns available:false (never throws) when
 *  GA4_PROPERTY_ID is unset or the SA lacks access, so the report degrades to
 *  search-only honestly instead of failing the whole run. */
export async function buildGaReport(ref: Date, site: SeoSite = DEFAULT_SEO_SITE): Promise<GaReport> {
  const { current, previous } = trailing28Windows(ref);
  const empty: GaReport = {
    available: false,
    range: { current, previous },
    totals: { sessions: 0, users: 0, engagedSessions: 0, prevSessions: 0, prevUsers: 0, prevEngagedSessions: 0 },
    channels: [],
  };

  const propertyId = getPropertyId(site);
  if (!propertyId) {
    return { ...empty, reason: `${site.ga4PropertyIdEnv} not set — add ${site.label}'s numeric GA4 property id to the env.` };
  }

  try {
    const METRICS = ['sessions', 'totalUsers', 'engagedSessions'];
    const [cur, prev, byChannel] = await Promise.all([
      runReport(current, METRICS, [], propertyId),
      runReport(previous, METRICS, [], propertyId),
      runReport(current, ['sessions'], ['sessionDefaultChannelGroup'], propertyId),
    ]);

    const curRow = cur.rows?.[0];
    const prevRow = prev.rows?.[0];

    const channels: GaChannel[] = (byChannel.rows ?? [])
      .map((r) => ({
        channel: r.dimensionValues?.[0]?.value ?? '(unknown)',
        sessions: Number(r.metricValues?.[0]?.value ?? 0),
      }))
      .sort((a, b) => b.sessions - a.sessions);

    return {
      available: true,
      range: { current, previous },
      totals: {
        sessions: metricVal(curRow, 0),
        users: metricVal(curRow, 1),
        engagedSessions: metricVal(curRow, 2),
        prevSessions: metricVal(prevRow, 0),
        prevUsers: metricVal(prevRow, 1),
        prevEngagedSessions: metricVal(prevRow, 2),
      },
      channels,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    // Most common: 403 PERMISSION_DENIED (SA not added as Viewer on the property).
    return { ...empty, reason: `GA Data API error: ${msg.slice(0, 200)}` };
  }
}
