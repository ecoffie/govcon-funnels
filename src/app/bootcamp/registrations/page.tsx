'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';

interface Registrant {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  company: string | null;
  formLabel: string;
  source: string;
  signedUpAt: string;
  date: string;
  internal: boolean;
}

interface SourceBreakdown {
  label: string;
  count: number;
  pct: number;
}

interface CommandCenter {
  count: number;
  internalCount: number;
  total: number;
  goal: number;
  pctToGoal: number;
  webinarDate: string;
  daysUntil: number;
  updatedAt: string;
  neededPerDay: number;
  runRatePerDay: number;
  recentRatePerDay: number;
  projectedFinal: number;
  onTrack: boolean;
  last24h: number;
  last7d: number;
  daysSinceLast: number | null;
  momentum: 'accelerating' | 'steady' | 'cooling';
  sources: SourceBreakdown[];
  trend: { date: string; count: number }[];
  registrants: Registrant[];
}

const PW_KEY = 'mindy-bootcamp-tracker-pw';

function fmtDay(iso: string): string {
  if (!iso || iso === 'unknown') return '—';
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

function fmtDateTime(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

function Sparkbars({ trend }: { trend: { date: string; count: number }[] }) {
  if (!trend.length) return null;
  const max = Math.max(...trend.map((t) => t.count), 1);
  return (
    <div className="flex items-end gap-1.5 h-24">
      {trend.map((t) => (
        <div key={t.date} className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <span className="text-[10px] font-semibold text-gray-500">{t.count}</span>
          <div
            className="w-full rounded-t bg-purple-500/90 transition-all"
            style={{ height: `${Math.max(6, (t.count / max) * 60)}px` }}
            title={`${fmtDay(t.date)}: ${t.count}`}
          />
          <span className="text-[10px] text-gray-400 whitespace-nowrap">{fmtDay(t.date)}</span>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value, sub, tone = 'default' }: {
  label: string; value: React.ReactNode; sub?: string;
  tone?: 'default' | 'good' | 'bad' | 'warn';
}) {
  const valueColor = {
    default: 'text-slate-900', good: 'text-emerald-600',
    bad: 'text-red-500', warn: 'text-amber-500',
  }[tone];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">{label}</div>
      <div className={`text-2xl font-bold tabular-nums mt-1 ${valueColor}`}>{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

function downloadCsv(rows: Registrant[]) {
  const headers = ['Name', 'Email', 'Phone', 'Company', 'Source', 'Signed Up', 'Internal'];
  const escape = (v: string) => `"${(v ?? '').replace(/"/g, '""')}"`;
  const lines = [headers.join(',')];
  for (const r of rows) {
    lines.push([
      r.name, r.email, r.phone ?? '', r.company ?? '', r.formLabel,
      r.signedUpAt, r.internal ? 'yes' : 'no',
    ].map((v) => escape(String(v))).join(','));
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mindy-bootcamp-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function CommandCenterPage() {
  const [password, setPassword] = useState<string | null>(null);
  const [pwInput, setPwInput] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [data, setData] = useState<CommandCenter | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showInternal, setShowInternal] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(PW_KEY);
    if (saved) setPassword(saved);
  }, []);

  const load = useCallback(async () => {
    if (!password) return;
    setLoading(true);
    try {
      const res = await fetch('/api/mindy-bootcamp/registrations', {
        cache: 'no-store',
        headers: { 'x-admin-password': password },
      });
      if (res.status === 401) {
        sessionStorage.removeItem(PW_KEY);
        setPassword(null);
        setAuthError('Incorrect password.');
        return;
      }
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to load');
      setData(await res.json());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    if (!password) return;
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, [load, password]);

  function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    const pw = pwInput.trim();
    if (!pw) return;
    sessionStorage.setItem(PW_KEY, pw);
    setAuthError(null);
    setPwInput('');
    setPassword(pw);
  }

  const visibleRegistrants = useMemo(
    () => (data?.registrants ?? []).filter((r) => showInternal || !r.internal),
    [data, showInternal],
  );

  // ---- Login screen ----
  if (!password) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <form onSubmit={submitPassword}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 w-full max-w-sm text-center">
          <p className="text-xs font-semibold tracking-widest text-purple-600 uppercase">
            Command Center
          </p>
          <h1 className="text-xl font-bold text-slate-900 mt-1 mb-1">Mindy Bootcamp</h1>
          <p className="text-gray-500 text-sm mb-6">Team access only</p>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              autoFocus
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-2.5 text-center text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button type="button" onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              aria-label={showPw ? 'Hide password' : 'Show password'}>
              {showPw ? '🙈' : '👁️'}
            </button>
          </div>
          {authError && <p className="text-red-500 text-sm mt-2">{authError}</p>}
          <button type="submit"
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-4 py-2.5 transition-colors">
            Enter
          </button>
        </form>
      </main>
    );
  }

  const momentumChip = data && {
    accelerating: { txt: '▲ Accelerating', cls: 'text-emerald-700 bg-emerald-50' },
    steady: { txt: '— Steady', cls: 'text-gray-600 bg-gray-100' },
    cooling: { txt: '▼ Cooling', cls: 'text-red-600 bg-red-50' },
  }[data.momentum];

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
              Mindy
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-sm font-semibold text-slate-600">GovCon Giants</span>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-semibold tracking-widest text-purple-600 uppercase">
              Registration Command Center
            </p>
            <p className="text-sm text-gray-500">
              Mindy Bootcamp · {fmtDay(data?.webinarDate || '')}
            </p>
          </div>
        </div>

        {loading && !data ? (
          <div className="text-center text-gray-400 py-20">Loading command center…</div>
        ) : error ? (
          <div className="text-center text-red-500 py-20 text-sm">{error}</div>
        ) : data ? (
          <>
            {/* GOAL / PROGRESS BAR */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-5">
              <div className="flex items-end justify-between mb-3 flex-wrap gap-2">
                <div>
                  <span className="text-4xl font-extrabold text-purple-600 tabular-nums">{data.count}</span>
                  <span className="text-gray-400 text-lg"> / {data.goal} signups</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    data.onTrack ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                    {data.onTrack ? 'On track' : 'Behind pace'}
                  </span>
                  <span className="text-sm text-gray-500">{data.daysUntil} days left</span>
                </div>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all"
                  style={{ width: `${Math.min(100, data.pctToGoal)}%` }} />
              </div>
              <div className="text-xs text-gray-400 mt-1.5">
                {data.pctToGoal}% to goal · ~{Math.round(data.count * 0.67)} expected attendees (67% show)
              </div>
            </div>

            {/* PACE & PROJECTION */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Pace &amp; Projection</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <Stat label="Need / day" value={data.neededPerDay}
                sub={`to reach ${data.goal} in ${data.daysUntil}d`}
                tone={data.neededPerDay > data.recentRatePerDay ? 'bad' : 'good'} />
              <Stat label="Current pace" value={`${data.recentRatePerDay}/day`} sub="7-day avg" />
              <Stat label="Projected final" value={data.projectedFinal}
                sub="at current pace" tone={data.onTrack ? 'good' : 'bad'} />
              <Stat label="Gap to close" value={Math.max(0, data.goal - data.projectedFinal)}
                sub="goal − projection" tone="warn" />
            </div>

            {/* VELOCITY & RECENCY */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Velocity &amp; Recency</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <Stat label="Last 24h" value={data.last24h} tone={data.last24h > 0 ? 'good' : 'default'} />
              <Stat label="Last 7 days" value={data.last7d} />
              <Stat label="Since last reg"
                value={data.daysSinceLast === null ? '—' : data.daysSinceLast === 0 ? 'Today' : `${data.daysSinceLast}d`}
                tone={data.daysSinceLast !== null && data.daysSinceLast >= 2 ? 'bad' : 'default'} />
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Momentum</div>
                {momentumChip && (
                  <span className={`inline-block mt-2 text-sm font-semibold px-2.5 py-1 rounded-full ${momentumChip.cls}`}>
                    {momentumChip.txt}
                  </span>
                )}
                <div className="text-xs text-gray-400 mt-1">last 3d vs prior 3d</div>
              </div>
            </div>

            {/* TREND + SOURCE side by side */}
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Daily sign-ups</p>
                <Sparkbars trend={data.trend} />
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Source attribution</p>
                <div className="space-y-3">
                  {data.sources.map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-700">{s.label}</span>
                        <span className="text-gray-500 tabular-nums">{s.count} · {s.pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${s.pct}%` }} />
                      </div>
                    </div>
                  ))}
                  {data.internalCount > 0 && (
                    <p className="text-xs text-gray-400 pt-2">
                      +{data.internalCount} internal team sign-ups (excluded from goal)
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* WORKLIST */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 flex-wrap gap-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Follow-up worklist · {visibleRegistrants.length}
                </p>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                    <input type="checkbox" checked={showInternal}
                      onChange={(e) => setShowInternal(e.target.checked)}
                      className="accent-purple-500" />
                    Show team
                  </label>
                  <button onClick={() => downloadCsv(visibleRegistrants)}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-700 border border-purple-200 hover:border-purple-300 rounded-lg px-3 py-1.5">
                    ↓ Export CSV
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400 border-y border-gray-100">
                      <th className="px-6 py-2 font-semibold">Name</th>
                      <th className="px-3 py-2 font-semibold">Company</th>
                      <th className="px-3 py-2 font-semibold">Email</th>
                      <th className="px-3 py-2 font-semibold">Phone</th>
                      <th className="px-3 py-2 font-semibold">Source</th>
                      <th className="px-6 py-2 font-semibold whitespace-nowrap">Signed up</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {visibleRegistrants.map((r, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-2.5 font-medium text-slate-900 whitespace-nowrap">
                          {r.name}
                          {r.internal && (
                            <span className="ml-2 text-[10px] font-semibold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded uppercase">Team</span>
                          )}
                        </td>
                        <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">
                          {r.company || <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-3 py-2.5">
                          <a href={`mailto:${r.email}`} className="text-purple-600 hover:underline">{r.email}</a>
                        </td>
                        <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">
                          {r.phone ? <a href={`tel:${r.phone}`} className="hover:underline">{r.phone}</a> : <span className="text-gray-300">—</span>}
                        </td>
                        <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{r.formLabel}</td>
                        <td className="px-6 py-2.5 text-gray-500 whitespace-nowrap">{fmtDateTime(r.signedUpAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6">
              Auto-refreshes every minute · Updated{' '}
              {new Date(data.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </p>
          </>
        ) : null}
      </div>
    </main>
  );
}
