'use client';

import { useEffect, useState } from 'react';

interface AnalyticsData {
  days: number;
  totals: {
    activeUsers: number;
    newUsers: number;
    sessions: number;
    screenPageViews: number;
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

const RANGES = [
  { days: 7, label: '7d' },
  { days: 28, label: '28d' },
  { days: 90, label: '90d' },
];

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function StatCard({
  label,
  value,
  changePct,
}: {
  label: string;
  value: string;
  changePct?: number | null;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-1 text-3xl font-bold text-white">{value}</div>
      {changePct != null && (
        <div
          className={`mt-1 text-sm font-semibold ${
            changePct >= 0 ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {changePct >= 0 ? '↑' : '↓'} {Math.abs(changePct).toFixed(1)}% vs prior
        </div>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  const [days, setDays] = useState(28);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/analytics?days=${days}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.hint || json.message || json.error);
        return json;
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [days]);

  // Winning variant = highest conversion rate with a meaningful sample
  const winner =
    data?.abTest
      ?.filter((v) => v.assignments >= 10)
      .sort((a, b) => b.conversionRatePct - a.conversionRatePct)[0] ?? null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Site Analytics</h2>
        <div className="flex gap-1 rounded-lg border border-slate-700 bg-slate-900/70 p-1">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setDays(r.days)}
              className={`rounded-md px-3 py-1 text-sm font-semibold transition ${
                days === r.days
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-slate-400">Loading GA4 data…</p>}

      {error && (
        <div className="rounded-xl border border-amber-700/50 bg-amber-950/30 p-5 text-amber-200">
          <p className="font-semibold">Analytics unavailable</p>
          <p className="mt-1 text-sm text-amber-300/80">{error}</p>
        </div>
      )}

      {data && !loading && (
        <>
          {/* Totals */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard
              label={`Active users (${days}d)`}
              value={fmt(data.totals.activeUsers)}
              changePct={data.totals.activeUsersChangePct}
            />
            <StatCard label="New users" value={fmt(data.totals.newUsers)} />
            <StatCard label="Sessions" value={fmt(data.totals.sessions)} />
            <StatCard label="Page views" value={fmt(data.totals.screenPageViews)} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top landing pages */}
            <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
              <h3 className="mb-3 text-lg font-semibold text-white">
                Top landing pages
              </h3>
              <div className="space-y-1">
                {data.topLandingPages.length === 0 && (
                  <p className="text-sm text-slate-400">No data in range.</p>
                )}
                {data.topLandingPages.map((p) => (
                  <div
                    key={p.path}
                    className="flex items-center justify-between gap-3 border-b border-slate-800 py-1.5 text-sm"
                  >
                    <span className="truncate font-mono text-slate-300" title={p.path}>
                      {p.path}
                    </span>
                    <span className="shrink-0 font-semibold text-white">
                      {fmt(p.sessions)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* A/B test */}
            <section className="rounded-xl border border-slate-700 bg-slate-900/70 p-5">
              <h3 className="mb-1 text-lg font-semibold text-white">
                /mi-free A/B test
              </h3>
              {winner && (
                <p className="mb-3 text-sm">
                  <span className="font-semibold text-green-400">
                    {winner.variantName}
                  </span>{' '}
                  <span className="text-slate-400">
                    winning — {winner.conversionRatePct.toFixed(1)}% conversion
                  </span>
                </p>
              )}
              <div className="space-y-2">
                {data.abTest.length === 0 && (
                  <p className="text-sm text-slate-400">
                    No A/B events yet. Verify variant_id / variant_name are
                    registered as GA4 custom dimensions (see setup doc).
                  </p>
                )}
                {data.abTest.map((v) => {
                  const isWinner = winner && v.variantName === winner.variantName;
                  return (
                    <div
                      key={v.variantName}
                      className={`rounded-lg border p-3 ${
                        isWinner
                          ? 'border-green-700/60 bg-green-950/20'
                          : 'border-slate-800 bg-slate-900/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-white">
                          {v.variantName}
                        </span>
                        <span className="font-bold text-white">
                          {v.conversionRatePct.toFixed(1)}%
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {v.conversions} conversions / {v.assignments} assignments
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <p className="text-xs text-slate-500">
            Live from GA4 Data API · cached 10 min · {days}-day window vs prior{' '}
            {days} days
          </p>
        </>
      )}
    </div>
  );
}
