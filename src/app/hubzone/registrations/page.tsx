'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

interface Registrant {
  name: string;
  company: string | null;
  date: string;
  internal: boolean;
}

interface Summary {
  count: number;
  internalCount: number;
  total: number;
  webinarDate: string;
  daysUntil: number;
  registrants: Registrant[];
  trend: { date: string; count: number }[];
  updatedAt: string;
}

function formatDate(iso: string): string {
  if (!iso || iso === 'unknown') return '';
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

function Sparkbars({ trend }: { trend: { date: string; count: number }[] }) {
  if (!trend.length) return null;
  const max = Math.max(...trend.map((t) => t.count), 1);
  return (
    <div className="flex items-end gap-1.5 h-20">
      {trend.map((t) => (
        <div key={t.date} className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <div
            className="w-full rounded-t bg-orange-500/90 transition-all"
            style={{ height: `${Math.max(8, (t.count / max) * 64)}px` }}
            title={`${formatDate(t.date)}: ${t.count}`}
          />
          <span className="text-[10px] text-gray-400 whitespace-nowrap">{formatDate(t.date)}</span>
        </div>
      ))}
    </div>
  );
}

export default function RegistrationsTrackerPage() {
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/hubzone/registrations', { cache: 'no-store' });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to load');
      setData(await res.json());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    // Auto-refresh every 60s so a left-open tab stays live.
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, [load]);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
          <Image src="/hubzone/logo-gcg.png" alt="GovCon Giants" width={120} height={40}
            className="h-8 w-auto object-contain" />
          <span className="text-gray-300">×</span>
          <Image src="/hubzone/logo-encore.png" alt="Encore Funding" width={120} height={40}
            className="h-8 w-auto object-contain" />
        </div>

        <div className="text-center mb-2">
          <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase">
            Live Registration Tracker
          </p>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">HUBZone Webinar</h1>
          <p className="text-gray-500 text-sm">Wednesday, June 17, 2026 · 6:00–8:00 PM EST</p>
        </div>

        {/* Hero count */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 my-6 text-center">
          {loading && !data ? (
            <div className="text-gray-400 py-8">Loading…</div>
          ) : error ? (
            <div className="text-red-500 py-8 text-sm">{error}</div>
          ) : data ? (
            <>
              <div className="text-6xl font-extrabold text-orange-500 tabular-nums">{data.count}</div>
              <div className="text-gray-500 mt-1">registered</div>
              <div className="flex items-center justify-center gap-6 mt-6 text-sm">
                <div>
                  <div className="text-xl font-bold text-slate-900 tabular-nums">{data.daysUntil}</div>
                  <div className="text-gray-400">days to go</div>
                </div>
                {data.internalCount > 0 && (
                  <div>
                    <div className="text-xl font-bold text-slate-900 tabular-nums">+{data.internalCount}</div>
                    <div className="text-gray-400">team</div>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>

        {/* Trend */}
        {data && data.trend.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Daily sign-ups
            </p>
            <Sparkbars trend={data.trend} />
          </div>
        )}

        {/* Registrant list */}
        {data && data.registrants.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 pt-5 pb-2">
              Who's registered
            </p>
            <ul className="divide-y divide-gray-100">
              {data.registrants.map((r, i) => (
                <li key={i} className="flex items-center justify-between px-6 py-3">
                  <div className="min-w-0">
                    <span className="font-medium text-slate-900">{r.name}</span>
                    {r.company && (
                      <span className="text-gray-400 text-sm"> · {r.company}</span>
                    )}
                    {r.internal && (
                      <span className="ml-2 text-[10px] font-semibold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded uppercase">
                        Team
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-3">{formatDate(r.date)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data && (
          <p className="text-center text-xs text-gray-400 mt-6">
            Auto-refreshes every minute · Last updated{' '}
            {new Date(data.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </p>
        )}
      </div>
    </main>
  );
}
