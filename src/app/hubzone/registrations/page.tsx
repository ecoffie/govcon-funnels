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

const PW_KEY = 'hubzone-tracker-pw';

export default function RegistrationsTrackerPage() {
  const [password, setPassword] = useState<string | null>(null);
  const [pwInput, setPwInput] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [data, setData] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Restore a previously-entered password for this browser session.
  useEffect(() => {
    const saved = sessionStorage.getItem(PW_KEY);
    if (saved) setPassword(saved);
  }, []);

  const load = useCallback(async () => {
    if (!password) return;
    setLoading(true);
    try {
      const res = await fetch('/api/hubzone/registrations', {
        cache: 'no-store',
        headers: { 'x-admin-password': password },
      });
      if (res.status === 401) {
        // Bad/expired password — clear it and drop back to the login screen.
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
    // Auto-refresh every 60s so a left-open tab stays live.
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

  // Login screen — shown until a password is entered/restored.
  if (!password) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <form onSubmit={submitPassword}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 w-full max-w-sm text-center">
          <p className="text-xs font-semibold tracking-widest text-orange-600 uppercase">
            Registration Tracker
          </p>
          <h1 className="text-xl font-bold text-slate-900 mt-1 mb-1">HUBZone Webinar</h1>
          <p className="text-gray-500 text-sm mb-6">Team access only</p>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              autoFocus
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg pl-4 pr-12 py-2.5 text-center text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? '🙈' : '👁️'}
            </button>
          </div>
          {authError && <p className="text-red-500 text-sm mt-2">{authError}</p>}
          <button type="submit"
            className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-4 py-2.5 transition-colors">
            View Tracker
          </button>
        </form>
      </main>
    );
  }

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
