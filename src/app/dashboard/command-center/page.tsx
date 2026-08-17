/**
 * /dashboard/command-center — site observability: health strip (uptime,
 * latency, JS errors, deploys), traffic funnel, top clicks, lead pipeline
 * per destination, top errors, and a deploy change log. All data is real:
 * site_events / lead_pipeline_log / synthetic_checks (Supabase) + the
 * Vercel deployments API. Server-rendered, no client JS.
 */
import { ccClient } from '@/lib/command-center';

export const dynamic = 'force-dynamic';

const VERCEL_TEAM = 'team_w3016JFXskPwzWfNUjFO8fes';
const VERCEL_PROJECTS = ['govcon-giants-site', 'govcon-funnels'];

// ------------------------------------------------------------ data loaders ---

interface DeployInfo {
  project: string;
  sha: string;
  message: string;
  created: string;
  state: string;
}

async function loadDeploys(): Promise<DeployInfo[]> {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) return [];
  const out: DeployInfo[] = [];
  for (const project of VERCEL_PROJECTS) {
    try {
      const res = await fetch(
        `https://api.vercel.com/v6/deployments?projectId=${project}&teamId=${VERCEL_TEAM}&limit=1&target=production`,
        { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' },
      );
      const json = await res.json();
      const d = json.deployments?.[0];
      if (d) {
        out.push({
          project,
          sha: (d.meta?.githubCommitSha ?? '').slice(0, 7),
          message: (d.meta?.githubCommitMessage ?? '').split('\n')[0].slice(0, 80),
          created: new Date(d.created).toLocaleString('en-US', { timeZone: 'America/New_York' }),
          state: d.state,
        });
      }
    } catch {
      /* show what we have */
    }
  }
  return out;
}

interface CheckStatus {
  check: string;
  target: string;
  ok: boolean;
  ts: string;
  duration_ms: number | null;
  detail: string | null;
}

async function loadLatestChecks(): Promise<CheckStatus[]> {
  if (!ccClient) return [];
  // Latest status per (check, target) over the last 2 hours.
  const since = new Date(Date.now() - 2 * 3600_000).toISOString();
  const { data } = await ccClient
    .from('synthetic_checks')
    .select('check,target,ok,ts,duration_ms,detail')
    .gte('ts', since)
    .order('ts', { ascending: false })
    .limit(500);
  const seen = new Map<string, CheckStatus>();
  for (const r of data ?? []) {
    const key = `${r.check}|${r.target}`;
    if (!seen.has(key)) seen.set(key, r as CheckStatus);
  }
  return [...seen.values()];
}

interface PipelineRow {
  ts: string;
  source: string;
  duplicate: boolean;
  ghl_ok: boolean | null;
  supabase_ok: boolean | null;
  slack_ok: boolean | null;
  email_ok: boolean | null;
  duration_ms: number | null;
}

async function loadPipeline(days: number): Promise<PipelineRow[]> {
  if (!ccClient) return [];
  const since = new Date(Date.now() - days * 86400_000).toISOString();
  const { data } = await ccClient
    .from('lead_pipeline_log')
    .select('ts,source,duplicate,ghl_ok,supabase_ok,slack_ok,email_ok,duration_ms')
    .gte('ts', since)
    .order('ts', { ascending: false })
    .limit(5000);
  return (data ?? []) as PipelineRow[];
}

interface EventRow {
  ts: string;
  event: string;
  label: string | null;
  page: string | null;
  meta: Record<string, unknown> | null;
}

async function loadEvents(days: number): Promise<EventRow[]> {
  if (!ccClient) return [];
  const since = new Date(Date.now() - days * 86400_000).toISOString();
  const { data } = await ccClient
    .from('site_events')
    .select('ts,event,label,page,meta')
    .gte('ts', since)
    .order('ts', { ascending: false })
    .limit(10000);
  return (data ?? []) as EventRow[];
}

async function loadErrorCount(sinceIso: string): Promise<number> {
  if (!ccClient) return 0;
  const { count } = await ccClient
    .from('site_events')
    .select('id', { count: 'exact', head: true })
    .eq('event', 'js_error')
    .gte('ts', sinceIso);
  return count ?? 0;
}

// ------------------------------------------------------------ UI helpers ---

function pct(n: number, d: number): string {
  if (!d) return '—';
  return `${((n / d) * 100).toFixed(1)}%`;
}

function Pill({ ok, label }: { ok: boolean | null; label: string }) {
  const cls =
    ok === null
      ? 'bg-slate-700 text-slate-300'
      : ok
        ? 'bg-green-900/60 text-green-400 border border-green-700'
        : 'bg-red-900/60 text-red-400 border border-red-700';
  return <span className={`rounded px-2 py-0.5 text-xs font-semibold ${cls}`}>{label}</span>;
}

function Bar({ value, max, color = 'bg-green-500' }: { value: number; max: number; color?: string }) {
  const w = max > 0 ? Math.max(2, Math.round((value / max) * 100)) : 0;
  return (
    <div className="h-2 w-full rounded bg-slate-800">
      <div className={`h-2 rounded ${color}`} style={{ width: `${w}%` }} />
    </div>
  );
}

// ------------------------------------------------------------ page ---------

export default async function CommandCenterPage() {
  const now = Date.now();
  const [deploys, checks, pipeline, events, errors24h, errorsPrev24h] = await Promise.all([
    loadDeploys(),
    loadLatestChecks(),
    loadPipeline(30),
    loadEvents(7),
    loadErrorCount(new Date(now - 86400_000).toISOString()),
    loadErrorCount(new Date(now - 2 * 86400_000).toISOString()),
  ]);
  const errorsPrior = errorsPrev24h - errors24h;

  // Funnel (7d)
  const pageViews = events.filter((e) => e.event === 'page_view').length;
  const ctaClicks = events.filter((e) => e.event === 'cta_click').length;
  const formSubmits = events.filter((e) => e.event === 'form_submit').length;
  const leads7d = pipeline.filter((p) => !p.duplicate && p.source !== 'canary' && now - new Date(p.ts).getTime() < 7 * 86400_000);

  // API latency (24h, non-canary)
  const lat = pipeline
    .filter((p) => p.duration_ms != null && now - new Date(p.ts).getTime() < 86400_000)
    .map((p) => p.duration_ms!)
    .sort((a, b) => a - b);
  const p50 = lat.length ? lat[Math.floor(lat.length * 0.5)] : null;
  const p95 = lat.length ? lat[Math.floor(lat.length * 0.95)] : null;

  // Top clicks (7d)
  const clickCounts = new Map<string, { label: string; page: string; count: number }>();
  for (const e of events) {
    if (e.event !== 'cta_click' && e.event !== 'outbound_click') continue;
    const key = `${e.label}|${e.page}`;
    const cur = clickCounts.get(key) ?? { label: e.label ?? '?', page: e.page ?? '?', count: 0 };
    cur.count++;
    clickCounts.set(key, cur);
  }
  const topClicks = [...clickCounts.values()].sort((a, b) => b.count - a.count).slice(0, 25);

  // Top JS errors (7d)
  const errorCounts = new Map<string, number>();
  for (const e of events) {
    if (e.event !== 'js_error') continue;
    const key = `${e.label} (${e.page})`;
    errorCounts.set(key, (errorCounts.get(key) ?? 0) + 1);
  }
  const topErrors = [...errorCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);

  // Leads by source (30d) with per-destination delivery rates
  const bySource = new Map<string, { total: number; ghl: number[]; supabase: number[]; email: number[] }>();
  for (const p of pipeline) {
    if (p.duplicate || p.source === 'canary') continue;
    const cur = bySource.get(p.source) ?? { total: 0, ghl: [], supabase: [], email: [] };
    cur.total++;
    if (p.ghl_ok !== null) cur.ghl.push(p.ghl_ok ? 1 : 0);
    if (p.supabase_ok !== null) cur.supabase.push(p.supabase_ok ? 1 : 0);
    if (p.email_ok !== null) cur.email.push(p.email_ok ? 1 : 0);
    bySource.set(p.source, cur);
  }
  const sources = [...bySource.entries()].sort((a, b) => b[1].total - a[1].total);

  const canary = checks.find((c) => c.check === 'canary-lead');
  const urlChecks = checks.filter((c) => c.check === 'url');
  const urlFailures = urlChecks.filter((c) => !c.ok);

  return (
    <div className="space-y-10">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-white">Command Center</h2>
        <p className="text-sm text-slate-500">
          Rendered {new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET · live data
        </p>
      </div>

      {/* 1. Health strip */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-green-400">Is everything working right now?</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Canary lead (15 min)</p>
            {canary ? (
              <>
                <Pill ok={canary.ok} label={canary.ok ? 'PASSING' : 'FAILING'} />
                <p className="mt-2 text-xs text-slate-400">
                  {canary.duration_ms}ms · {canary.detail}
                </p>
              </>
            ) : (
              <p className="text-sm text-slate-500">No run yet — cron fires every 15 min.</p>
            )}
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Uptime ({urlChecks.length} URLs)</p>
            <Pill ok={urlFailures.length === 0 && urlChecks.length > 0} label={urlFailures.length === 0 ? `${urlChecks.length}/${urlChecks.length} UP` : `${urlFailures.length} DOWN`} />
            {urlFailures.slice(0, 3).map((f) => (
              <p key={f.target} className="mt-1 truncate text-xs text-red-400">
                {f.target} — {f.detail ?? f.ok}
              </p>
            ))}
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Lead API latency (24h)</p>
            <p className="text-xl font-bold text-white">{p50 != null ? `${p50}ms` : '—'}</p>
            <p className="text-xs text-slate-400">p50 · p95 {p95 != null ? `${p95}ms` : '—'} · {lat.length} leads</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">JS errors (24h)</p>
            <p className={`text-xl font-bold ${errors24h > 20 ? 'text-red-400' : 'text-white'}`}>{errors24h}</p>
            <p className="text-xs text-slate-400">prior 24h: {Math.max(0, errorsPrior)}</p>
          </div>
        </div>
      </section>

      {/* 2. Deploys / change log */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-green-400">Did the last change break anything?</h3>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          {deploys.length === 0 ? (
            <p className="text-sm text-slate-500">Set VERCEL_API_TOKEN to show production deploys here.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                  <th className="pb-2">Project</th>
                  <th className="pb-2">Deploy</th>
                  <th className="pb-2">Commit</th>
                  <th className="pb-2">When (ET)</th>
                </tr>
              </thead>
              <tbody>
                {deploys.map((d) => (
                  <tr key={d.project} className="border-t border-slate-800">
                    <td className="py-2 font-mono text-slate-300">{d.project}</td>
                    <td className="py-2"><Pill ok={d.state === 'READY'} label={d.state} /></td>
                    <td className="py-2 text-slate-300"><span className="mr-2 font-mono text-green-400">{d.sha}</span>{d.message}</td>
                    <td className="py-2 text-slate-400">{d.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* 3. Funnel */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-green-400">What are visitors doing? (7 days)</h3>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: 'Page views', value: pageViews },
            { label: 'CTA clicks', value: ctaClicks },
            { label: 'Form submits', value: formSubmits },
            { label: 'Leads delivered', value: leads7d.length },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-white">{s.value}</p>
              <div className="mt-2"><Bar value={s.value} max={pageViews || 1} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Top clicks */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-green-400">Top clicked elements (7 days)</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          {topClicks.length === 0 ? (
            <p className="text-sm text-slate-500">No click data yet — the beacon ships with the next govcon-giants-site deploy.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                  <th className="pb-2">Element</th>
                  <th className="pb-2">Page</th>
                  <th className="pb-2 text-right">Clicks</th>
                  <th className="pb-2 text-right">% of clicks</th>
                </tr>
              </thead>
              <tbody>
                {topClicks.map((c, i) => (
                  <tr key={i} className="border-t border-slate-800">
                    <td className="max-w-[280px] truncate py-2 text-slate-200">{c.label}</td>
                    <td className="py-2 font-mono text-xs text-slate-400">{c.page}</td>
                    <td className="py-2 text-right font-semibold text-white">{c.count}</td>
                    <td className="py-2 text-right text-slate-400">{pct(c.count, ctaClicks)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* 5. Leads by source + pipeline health */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-green-400">Are leads flowing end-to-end? (30 days)</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          {sources.length === 0 ? (
            <p className="text-sm text-slate-500">No pipeline data yet — logging starts with the next govcon-funnels deploy.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                  <th className="pb-2">Source</th>
                  <th className="pb-2 text-right">Leads</th>
                  <th className="pb-2 text-right">GHL</th>
                  <th className="pb-2 text-right">Supabase</th>
                  <th className="pb-2 text-right">Email</th>
                  <th className="pb-2">Flag</th>
                </tr>
              </thead>
              <tbody>
                {sources.map(([source, s]) => {
                  const rate = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 1);
                  const worst = Math.min(rate(s.ghl), rate(s.supabase), rate(s.email));
                  return (
                    <tr key={source} className="border-t border-slate-800">
                      <td className="max-w-[240px] truncate py-2 font-mono text-xs text-slate-200">{source}</td>
                      <td className="py-2 text-right font-semibold text-white">{s.total}</td>
                      <td className="py-2 text-right text-slate-300">{pct(s.ghl.reduce((a, b) => a + b, 0), s.ghl.length)}</td>
                      <td className="py-2 text-right text-slate-300">{pct(s.supabase.reduce((a, b) => a + b, 0), s.supabase.length)}</td>
                      <td className="py-2 text-right text-slate-300">{pct(s.email.reduce((a, b) => a + b, 0), s.email.length)}</td>
                      <td className="py-2">{worst < 0.95 ? <Pill ok={false} label="UNDER 95%" /> : <Pill ok label="healthy" />}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* 6. Top errors */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-green-400">Top JS errors (7 days)</h3>
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
          {topErrors.length === 0 ? (
            <p className="text-sm text-green-400">No JS errors recorded. ✅</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {topErrors.map(([msg, count]) => (
                <li key={msg} className="flex items-start justify-between gap-4 border-b border-slate-800 pb-2">
                  <span className="font-mono text-xs text-red-300">{msg}</span>
                  <span className="shrink-0 font-semibold text-white">{count}×</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
