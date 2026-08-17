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

const LEAD_API = 'https://app.govcongiants.org/api/lead';
const SITE = 'https://govcongiants.com';

const IMPORTANT_URLS = [
  `${SITE}/`,
  `${SITE}/resources`,
  `${SITE}/podcast`,
  `${SITE}/blog`,
  `${SITE}/about`,
  `${SITE}/privacy-policy`,
  'https://app.govcongiants.org/jobs',
  'https://app.govcongiants.org/guides/federal-contract-vehicles-guide',
  'https://mi.govcongiants.com/',
  `${SITE}/sitemap.xml`,
];

export interface CheckResult extends CheckRow {}

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

/** Run the full suite, persist every result, return them. */
export async function runSyntheticSuite(): Promise<CheckResult[]> {
  const [canary, urls, content] = await Promise.all([
    runCanaryLead(),
    runUrlChecks(),
    runContentChecks(),
  ]);
  const all = [canary, ...urls, ...content];
  await Promise.all(all.map((r) => recordCheck(r)));
  return all;
}
