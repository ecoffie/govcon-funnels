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
  'https://mi.govcongiants.com/',
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

/** Paths probed on each retired host — root plus a deep path, to catch rules that
 *  only cover one shape. */
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

/** Run the full suite, persist every result, return them. */
export async function runSyntheticSuite(): Promise<CheckResult[]> {
  const [canary, urls, content, canonicalHosts] = await Promise.all([
    runCanaryLead(),
    runUrlChecks(),
    runContentChecks(),
    runCanonicalHostChecks(),
  ]);
  const all = [canary, ...urls, ...content, ...canonicalHosts];
  await Promise.all(all.map((r) => recordCheck(r)));
  return all;
}
