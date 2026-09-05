/**
 * Synthetic monitoring suite — shared by the 15-min cron
 * (/api/cron/synthetic-checks) and the on-demand verify endpoint
 * (/api/command-center/verify). Every probe records a row in
 * synthetic_checks and returns its result for the caller.
 *
 * Probes:
 *   1. canary-lead  — POST a throwaway lead through /api/lead, verify all
 *      four destinations (GHL/Supabase/Slack/email) report ok, then delete
 *      the GHL contact so the CRM stays clean.
 *   2. url          — GET the important pages: expect 200, no redirect chain,
 *      <3s TTFB.
 *   3. sitemap      — sitemap.xml is 200 and contains <url> entries.
 *   4. robots       — robots.txt is 200 and mentions the sitemap.
 */
import { recordCheck, type CheckRow } from '@/lib/command-center';

const SITE = 'https://govcongiants.com';
const LEAD_API = `${SITE}/api/lead`;

const IMPORTANT_URLS = [
  `${SITE}/`,
  `${SITE}/resources`,
  `${SITE}/podcast`,
  `${SITE}/blog`,
  `${SITE}/about`,
  `${SITE}/privacy-policy`,
  `${SITE}/jobs`,
  `${SITE}/guides/federal-contract-vehicles-guide`,
  // mi.govcongiants.com is NOT listed here. It is a redirect-only legacy bridge to
  // getmindy.ai, so the `url` check's "200 with no redirect chain" expectation was
  // wrong for it — see runLegacyBridgeChecks() below, which asserts the contract it
  // actually has.
  // The /funding + /encore-funding redirect target. A PARTNER-OWNED url, which is
  // why it is monitored: on 2026-08-24 we found every funding referral had been
  // landing on a 404 because Encore reversed a domain migration without notice, and
  // nothing told us. An outbound destination we do not control is exactly the thing
  // that rots silently — watch it like our own routes.
  'https://gov.encore-funding.com/govcon-giants-partner-government-contractor-funding/',
  `${SITE}/sitemap.xml`,
];

export type CheckResult = CheckRow;

async function timeFetch(url: string, init?: RequestInit): Promise<{ res: Response; ms: number; redirects: number }> {
  const start = Date.now();
  let redirects = 0;
  let current = url;
  let res = await fetch(current, { redirect: 'manual', ...init });
  // Follow up to 5 redirects manually so we can count the chain length.
  while (res.status >= 300 && res.status < 400 && res.headers.get('location') && redirects < 5) {
    redirects++;
    current = new URL(res.headers.get('location')!, current).toString();
    res = await fetch(current, { redirect: 'manual', ...init });
  }
  return { res, ms: Date.now() - start, redirects };
}

/** Canary lead through the full pipeline, then clean up the GHL contact. */
export async function runCanaryLead(): Promise<CheckResult> {
  const email = `canary+${Date.now()}@example.com`;
  const start = Date.now();
  try {
    const res = await fetch(LEAD_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: SITE },
      body: JSON.stringify({ email, source: 'canary' }),
    });
    const ms = Date.now() - start;
    const json = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      crm?: { ghl?: { ok?: boolean; contactId?: string } };
      supabase?: { ok?: boolean };
      slack?: { ok?: boolean };
      email?: { ok?: boolean };
    };
    const destOk = {
      ghl: !!json.crm?.ghl?.ok,
      supabase: !!json.supabase?.ok,
      slack: !!json.slack?.ok,
      email: !!json.email?.ok,
    };
    const ok = res.status === 200 && !!json.success && Object.values(destOk).every(Boolean);

    // Clean up the canary contact in GHL so the CRM isn't polluted.
    const contactId = json.crm?.ghl?.contactId;
    if (contactId && process.env.GHL_API_KEY) {
      try {
        await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${process.env.GHL_API_KEY}`,
            Version: '2021-07-28',
          },
        });
      } catch {
        /* cleanup is best-effort */
      }
    }

    return {
      check: 'canary-lead',
      target: LEAD_API,
      ok,
      status: res.status,
      duration_ms: ms,
      detail: `destinations: ${Object.entries(destOk).map(([k, v]) => `${k}=${v ? 'ok' : 'FAIL'}`).join(' ')}`,
    };
  } catch (e) {
    return {
      check: 'canary-lead',
      target: LEAD_API,
      ok: false,
      duration_ms: Date.now() - start,
      detail: e instanceof Error ? e.message : String(e),
    };
  }
}

export async function runUrlChecks(): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  for (const url of IMPORTANT_URLS) {
    try {
      const { res, ms, redirects } = await timeFetch(url);
      const ok = res.status === 200 && redirects <= 1 && ms < 3000;
      results.push({
        check: 'url',
        target: url,
        ok,
        status: res.status,
        duration_ms: ms,
        detail: redirects > 0 ? `redirects=${redirects}` : undefined,
      });
    } catch (e) {
      results.push({
        check: 'url',
        target: url,
        ok: false,
        detail: e instanceof Error ? e.message : String(e),
      });
    }
  }
  return results;
}

export async function runContentChecks(): Promise<CheckResult[]> {
  const out: CheckResult[] = [];
  // sitemap.xml — 200 and actually contains URL entries
  try {
    const { res, ms } = await timeFetch(`${SITE}/sitemap.xml`);
    const text = res.ok ? await res.text() : '';
    const urlCount = (text.match(/<url>/g) || []).length;
    out.push({
      check: 'sitemap',
      target: `${SITE}/sitemap.xml`,
      ok: res.status === 200 && urlCount > 10,
      status: res.status,
      duration_ms: ms,
      detail: `urls=${urlCount}`,
    });
  } catch (e) {
    out.push({ check: 'sitemap', target: `${SITE}/sitemap.xml`, ok: false, detail: String(e) });
  }
  // robots.txt — 200 and points at the sitemap
  try {
    const { res, ms } = await timeFetch(`${SITE}/robots.txt`);
    const text = res.ok ? await res.text() : '';
    out.push({
      check: 'robots',
      target: `${SITE}/robots.txt`,
      ok: res.status === 200 && /sitemap:/i.test(text),
      status: res.status,
      duration_ms: ms,
    });
  } catch (e) {
    out.push({ check: 'robots', target: `${SITE}/robots.txt`, ok: false, detail: String(e) });
  }
  return out;
}

/**
 * Hosts retired in the Phase 4 canonicalization. Each must PERMANENTLY REDIRECT to
 * govcongiants.com and must never serve indexable 200 content again.
 *
 * This is the regression contract for the 2026-09-05 incident class. Two failure modes
 * are caught here:
 *
 *  1. A retired host starts serving 200 again (a domain reattached to a deployment, or
 *     a redirect rule dropped). That silently recreates duplicate content across hosts
 *     and splits ranking signals — the condition Phase 4 exists to end.
 *  2. A redirect points somewhere other than the canonical host, or bounces more than
 *     once. Multi-hop chains leak crawl budget; a cycle takes routes down outright,
 *     which is exactly what happened when app.govcongiants.org and the old SPA pointed
 *     at each other.
 *
 * podcast.govcongiants.org is intentionally ABSENT: it is attached to the
 * govcon-giants-site project, so its redirect is not ours to define here. Add it once
 * that host moves to this project.
 */
const RETIRED_HOSTS = [
  'https://app.govcongiants.org',
  'https://govcongiants.org',
  'https://www.govcongiants.org',
  'https://guides.govcongiants.org',
  'https://funnels.govcongiants.org',
  'https://www.govcongiants.com',
];

/**
 * Paths probed on each retired host — root plus a deep path, to catch rules that only
 * cover one shape.
 *
 * The root is not redundant. `/:path*` does not match a bare `/` for a subdomain
 * attached to this Vercel project: app./, guides./ and funnels./ each served the app at
 * the root while every deeper path redirected correctly, leaving three duplicate
 * homepages indexable. Explicit `"source": "/"` rules fixed it; this probe is what
 * catches a regression.
 */
const RETIRED_PROBE_PATHS = ['/', '/guides/8a-certification'];

export async function runCanonicalHostChecks(): Promise<CheckResult[]> {
  const out: CheckResult[] = [];
  for (const host of RETIRED_HOSTS) {
    for (const path of RETIRED_PROBE_PATHS) {
      const url = `${host}${path}`;
      try {
        // Do NOT follow redirects: we are asserting on the FIRST response.
        const start = Date.now();
        const res = await fetch(url, { redirect: 'manual' });
        const ms = Date.now() - start;
        const location = res.headers.get('location') ?? '';
        const isPermanent = res.status === 301 || res.status === 308;
        const targetsCanonical =
          location.startsWith('https://govcongiants.com') ||
          // Same-origin relative Location on a host that is itself being redirected
          // still resolves to the canonical host once followed.
          location.startsWith('/');
        const ok = isPermanent && targetsCanonical;
        out.push({
          check: 'canonical-host',
          target: url,
          ok,
          status: res.status,
          duration_ms: ms,
          detail: ok
            ? `-> ${location}`
            : res.status === 200
              ? 'SERVING 200 — retired host must not serve indexable content'
              : `status=${res.status} location=${location || '(none)'}`,
        });
      } catch (e) {
        out.push({
          check: 'canonical-host',
          target: url,
          ok: false,
          detail: e instanceof Error ? e.message : String(e),
        });
      }
    }
  }
  return out;
}

/**
 * LEGACY BRIDGES — hostnames that redirect to a product on a DIFFERENT canonical host.
 *
 * These are not part of the govcongiants.com consolidation and must not be folded into
 * it. mi.govcongiants.com is a legacy entrance to Mindy, which is a distinct product
 * living on getmindy.ai; pointing it at govcongiants.com would send users and link
 * equity to the wrong product.
 *
 * The contract is the same shape as a retired host, but the approved destination is
 * getmindy.ai rather than the canonical site:
 *   - permanent redirect (301/308), never temporary
 *   - lands on the EXACT approved destination host
 *   - path and query are preserved
 *   - serves no independent indexable 200 content of its own
 *   - one hop, no cycle, no unexpected intermediate hostname
 *
 * Why this exists: mi.govcongiants.com was previously listed in IMPORTANT_URLS, whose
 * `url` check requires "200, no redirect chain, <3s". A redirect-only bridge can never
 * satisfy that, so the probe was reporting a failure for a host that was behaving
 * exactly as intended — noise that trains people to ignore the check.
 */
const LEGACY_BRIDGES: { host: string; destination: string; paths: string[] }[] = [
  {
    host: 'https://mi.govcongiants.com',
    destination: 'https://getmindy.ai',
    // Root plus a deep path: a rule covering only one shape is a common failure.
    paths: ['/', '/pricing'],
  },
];

/** Hostnames a bridge must never route through on its way to the destination. */
const UNEXPECTED_INTERMEDIATES = [
  'govcongiants.com',
  'www.govcongiants.com',
  'app.govcongiants.org',
  'govcongiants.org',
  'www.govcongiants.org',
  'guides.govcongiants.org',
  'funnels.govcongiants.org',
  'podcast.govcongiants.org',
  'shop.govcongiants.com',
];

export async function runLegacyBridgeChecks(): Promise<CheckResult[]> {
  const out: CheckResult[] = [];
  for (const bridge of LEGACY_BRIDGES) {
    for (const path of bridge.paths) {
      const url = `${bridge.host}${path}`;
      const target = `${bridge.destination}${path}`;
      try {
        const start = Date.now();
        // Do NOT follow: assert on the FIRST response, so a 200 is caught as a failure.
        const res = await fetch(url, { redirect: 'manual' });
        const ms = Date.now() - start;
        const location = res.headers.get('location') ?? '';

        const isPermanent = res.status === 301 || res.status === 308;
        const exactDestination = location === target;
        const onApprovedHost = location.startsWith(`${bridge.destination}/`);
        const noCycle = !location.startsWith(bridge.host);
        const noBadIntermediate = !UNEXPECTED_INTERMEDIATES.some((h) =>
          location.startsWith(`https://${h}/`),
        );

        const ok =
          isPermanent && exactDestination && onApprovedHost && noCycle && noBadIntermediate;

        const why = !isPermanent
          ? res.status === 200
            ? 'SERVING 200 — a legacy bridge must not serve indexable content'
            : `not a permanent redirect (status=${res.status})`
          : !noCycle
            ? 'redirects to itself — cycle'
            : !noBadIntermediate
              ? `routes through an unexpected intermediate: ${location}`
              : !exactDestination
                ? `expected ${target}, got ${location || '(no Location)'}`
                : '';

        out.push({
          check: 'legacy-bridge',
          target: url,
          ok,
          status: res.status,
          duration_ms: ms,
          detail: ok ? `-> ${location}` : why,
        });
      } catch (e) {
        out.push({
          check: 'legacy-bridge',
          target: url,
          ok: false,
          detail: e instanceof Error ? e.message : String(e),
        });
      }
    }

    // Query strings must survive the hop, or tracked/paginated links break silently.
    const qsUrl = `${bridge.host}/pricing?utm_source=synthetic&page=2`;
    try {
      const res = await fetch(qsUrl, { redirect: 'manual' });
      const location = res.headers.get('location') ?? '';
      const ok =
        (res.status === 301 || res.status === 308) &&
        location === `${bridge.destination}/pricing?utm_source=synthetic&page=2`;
      out.push({
        check: 'legacy-bridge',
        target: qsUrl,
        ok,
        status: res.status,
        detail: ok ? 'query preserved' : `query not preserved: ${location || '(none)'}`,
      });
    } catch (e) {
      out.push({
        check: 'legacy-bridge',
        target: qsUrl,
        ok: false,
        detail: e instanceof Error ? e.message : String(e),
      });
    }
  }
  return out;
}

/** Run the full suite, persist every result, return them. */
export async function runSyntheticSuite(): Promise<CheckResult[]> {
  const [canary, urls, content, canonicalHosts, bridges] = await Promise.all([
    runCanaryLead(),
    runUrlChecks(),
    runContentChecks(),
    runCanonicalHostChecks(),
    runLegacyBridgeChecks(),
  ]);
  const all = [canary, ...urls, ...content, ...canonicalHosts, ...bridges];
  await Promise.all(all.map((r) => recordCheck(r)));
  return all;
}
