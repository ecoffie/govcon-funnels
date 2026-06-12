/**
 * Google Search Console API client for govcongiants.com.
 *
 * Auth model: reuses the SAME service account as Mindy's BigQuery
 * setup — `mindy-bq-reader@market-assasin.iam.gserviceaccount.com`,
 * passed via the `GCP_SA_JSON` env var (base64-encoded JSON, or raw
 * JSON, or JSON with escaped \n — same tolerant parser as Mindy).
 *
 * Manual prerequisite (one time, in the GSC web UI):
 *   Search Console → govcongiants.com property → Settings →
 *   Users and permissions → Add user →
 *   mindy-bq-reader@market-assasin.iam.gserviceaccount.com (Restricted)
 *
 * Property is a DOMAIN property, so the API site URL is
 *   sc-domain:govcongiants.com
 */
import { GoogleAuth } from 'google-auth-library';

// Domain property — verified via DNS, covers all subdomains/protocols.
export const GSC_SITE_URL = 'sc-domain:govcongiants.com';

const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

let _auth: GoogleAuth | null = null;

function parseSaJson(raw: string): Record<string, unknown> {
  // Accept: raw JSON, base64 JSON, or JSON with escaped \n in the PEM.
  // Mirrors market-assassin/src/lib/bigquery/client.ts.
  const trimmed = raw.trim();
  if (trimmed.startsWith('{')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return JSON.parse(trimmed.replace(/\\n/g, '\n'));
    }
  }
  const decoded = Buffer.from(trimmed, 'base64').toString('utf8');
  return JSON.parse(decoded);
}

export function getServiceAccountEmail(): string {
  const raw = process.env.GCP_SA_JSON;
  if (!raw) return 'ADC (no GCP_SA_JSON)';
  try {
    return (
      (parseSaJson(raw) as { client_email?: string }).client_email ||
      'no client_email in SA'
    );
  } catch (e) {
    return `parse failed: ${e instanceof Error ? e.message : 'unknown'}`;
  }
}

function getAuth(): GoogleAuth {
  if (_auth) return _auth;
  const raw = process.env.GCP_SA_JSON;
  if (raw) {
    const credentials = parseSaJson(raw);
    _auth = new GoogleAuth({ credentials: credentials as never, scopes: SCOPES });
  } else {
    // Local dev fallback: Application Default Credentials.
    _auth = new GoogleAuth({ scopes: SCOPES });
  }
  return _auth;
}

/**
 * POST to the Search Analytics query endpoint and return parsed JSON.
 * https://developers.google.com/webmaster-tools/v1/searchanalytics/query
 */
export async function gscQuery<T = unknown>(body: Record<string, unknown>): Promise<T> {
  const auth = getAuth();
  const token = await auth.getAccessToken();
  if (!token) throw new Error('GSC auth: could not obtain access token');

  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    GSC_SITE_URL
  )}/searchAnalytics/query`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GSC API ${res.status}: ${text.slice(0, 500)}`);
  }
  return (await res.json()) as T;
}
