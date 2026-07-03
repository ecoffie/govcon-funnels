/**
 * The sites we produce SEO reports for. Single source of truth for
 * "which sites, which Search Console property, which Google Analytics property."
 *
 * The shared service account (mindy-bq-reader@market-assasin.iam.gserviceaccount.com)
 * already has GSC read access to all three properties (verified 2026-07-03), so no
 * per-site access grant is needed for the Search Console side.
 *
 * NOTE on the `gscSiteUrl` string — it is stored EXACTLY, never derived:
 *   - govcongiants.com / getmindy.ai are DOMAIN properties  → "sc-domain:<domain>"
 *   - encoregov.com is a URL-PREFIX property                → "https://encoregov.com/"
 * Getting this wrong returns 403 from the Search Console API.
 *
 * `ga4PropertyIdEnv` names the env var holding that site's NUMERIC GA4 property id
 * (not the "G-XXXX" measurement id). GA is an optional overlay: if the env is unset
 * or the SA isn't a Viewer on that property, the report degrades to search-only and
 * says so (see src/lib/ga/query.ts). GSC never depends on it.
 */
export interface SeoSite {
  key: string; // stable slug used on the CLI / cron ("govcongiants.com")
  label: string; // human label for report + Slack titles
  gscSiteUrl: string; // EXACT Search Console site-URL string (see note above)
  ga4PropertyIdEnv: string; // env var name holding the numeric GA4 property id
}

export const SEO_SITES: SeoSite[] = [
  {
    key: 'govcongiants.com',
    label: 'govcongiants.com',
    gscSiteUrl: 'sc-domain:govcongiants.com',
    ga4PropertyIdEnv: 'GA4_PROPERTY_ID',
  },
  {
    key: 'getmindy.ai',
    label: 'getmindy.ai',
    gscSiteUrl: 'sc-domain:getmindy.ai',
    ga4PropertyIdEnv: 'GA4_PROPERTY_ID_MINDY',
  },
  {
    key: 'encoregov.com',
    label: 'encoregov.com',
    gscSiteUrl: 'https://encoregov.com/', // URL-prefix property, NOT sc-domain:
    ga4PropertyIdEnv: 'GA4_PROPERTY_ID_ENCORE',
  },
];

/** The default site — keeps every no-arg caller reporting on govcongiants.com. */
export const DEFAULT_SEO_SITE = SEO_SITES[0];

/**
 * Resolve a site by its key (case-insensitive). Accepts a bare domain
 * ("encoregov.com") or the literal "all" handled by callers. Returns the
 * default site when `key` is falsy so existing no-arg callers are unchanged.
 */
export function resolveSeoSite(key?: string | null): SeoSite {
  if (!key) return DEFAULT_SEO_SITE;
  const norm = key.trim().toLowerCase();
  const found = SEO_SITES.find((s) => s.key.toLowerCase() === norm);
  if (!found) {
    const known = SEO_SITES.map((s) => s.key).join(', ');
    throw new Error(`Unknown SEO site "${key}". Known sites: ${known}`);
  }
  return found;
}
