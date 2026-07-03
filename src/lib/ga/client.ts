/**
 * Google Analytics (GA4) Data API client for govcongiants.com.
 *
 * Auth model: reuses the SAME service account as GSC + Mindy's BigQuery —
 * `mindy-bq-reader@market-assasin.iam.gserviceaccount.com`, via the `GCP_SA_JSON`
 * env var (base64 JSON, raw JSON, or JSON with escaped \n — same tolerant parser
 * as src/lib/gsc/client.ts). Mirrors the GSC client so both search + traffic run
 * off one credential.
 *
 * Manual prerequisite (one time, in the GA web UI):
 *   Google Analytics → Admin → Property Access Management → Add →
 *   mindy-bq-reader@market-assasin.iam.gserviceaccount.com → role: Viewer
 * AND set GA4_PROPERTY_ID (the numeric property id, e.g. 123456789) in the env.
 * Without both, the Data API returns 403 PERMISSION_DENIED.
 */
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { DEFAULT_SEO_SITE, type SeoSite } from '../seo-sites';

// Numeric GA4 property id (NOT the "G-XXXX" measurement id) for a site.
// Each site names its own env var (SEO_SITES[].ga4PropertyIdEnv); defaults
// to govcongiants.com's GA4_PROPERTY_ID so single-site callers are unchanged.
export function getPropertyId(site: SeoSite = DEFAULT_SEO_SITE): string {
  return (process.env[site.ga4PropertyIdEnv] || '').trim();
}

function parseSaJson(raw: string): Record<string, unknown> {
  // Accept: raw JSON, base64 JSON, or JSON with escaped \n in the PEM.
  const trimmed = raw.trim();
  if (trimmed.startsWith('{')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return JSON.parse(trimmed.replace(/\\n/g, '\n'));
    }
  }
  return JSON.parse(Buffer.from(trimmed, 'base64').toString('utf8'));
}

let _client: BetaAnalyticsDataClient | null = null;

export function getAnalyticsClient(): BetaAnalyticsDataClient {
  if (_client) return _client;
  const raw = process.env.GCP_SA_JSON;
  if (raw) {
    const credentials = parseSaJson(raw) as { client_email?: string; private_key?: string };
    _client = new BetaAnalyticsDataClient({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
    });
  } else {
    // Local dev fallback: Application Default Credentials.
    _client = new BetaAnalyticsDataClient();
  }
  return _client;
}
