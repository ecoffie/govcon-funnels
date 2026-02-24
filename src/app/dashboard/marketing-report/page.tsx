'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

const REPORT_SECTIONS = [
  'YouTube',
  'Instagram (GCG)',
  'Instagram (Eric Coffie)',
  'LinkedIn (GCG)',
  'LinkedIn (Eric Coffie)',
  'Podcast_Bookings',
  'Podcast',
  'Cold_Emails',
  'Free_Course',
  'Discovery_Calls',
  'FHC_Calls',
  'SEO',
  'Warm_Emails',
  'Sales',
];

const METRIC_LABELS: Record<string, string> = {
  top_of_funnel_content_outputs: 'Top of Funnel Content',
  total_email_sent: 'Total Emails Sent',
  free_course_opt_ins: 'Free Course Opt-ins',
  discovery_calls_booked: 'Discovery Calls Booked',
  discovery_calls_held: 'Discovery Calls Held',
  discovery_show_rate: 'Discovery Show Rate',
  fhc_calls_held: 'FHC Calls Held',
  close_rate: 'Close Rate',
  webinars_hosted: 'Webinars Hosted',
  webinar_attendees: 'Webinar Attendees',
  new_clients: 'New Clients',
  cash_collected: 'Cash Collected',
};

interface WeekData {
  week_start: string;
  weekly_summary_notes?: string;
  [key: string]: string | number | undefined;
}

interface ReportData {
  weeks: string[];
  current: WeekData | null;
  previous: WeekData | null;
  sections: Record<string, string>;
  history?: WeekData[];
}

function formatMetric(val: unknown): string {
  if (val === null || val === undefined) return '—';
  const n = Number(val);
  if (Number.isNaN(n)) return String(val);
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2);
}

function delta(current: number, previous: number): { text: string; up: boolean } {
  if (previous === 0) return { text: current > 0 ? '+' : '0', up: current >= 0 };
  const pct = ((current - previous) / previous) * 100;
  const up = pct >= 0;
  return { text: `${pct >= 0 ? '+' : ''}${pct.toFixed(0)}%`, up };
}

export default function MarketingReportPage() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);
  const [sectionEdits, setSectionEdits] = useState<Record<string, string>>({});
  const [savingSection, setSavingSection] = useState<string | null>(null);

  const fetchReport = useCallback(async (week?: string) => {
    const base = '/api/dashboard/report';
    const params = new URLSearchParams();
    if (week) params.set('week', week);
    params.set('history', '1');
    const url = `${base}?${params}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load report');
    return res.json();
  }, []);

  useEffect(() => {
    fetchReport()
      .then((data) => {
        setReport(data);
        setSelectedWeek(data.current?.week_start ?? data.weeks?.[0] ?? '');
        setSectionEdits(data.sections ?? {});
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [fetchReport]);

  const onWeekChange = async (week: string) => {
    setSelectedWeek(week);
    setLoading(true);
    try {
      const data = await fetchReport(week);
      setReport(data);
      setSectionEdits(data.sections ?? {});
    } finally {
      setLoading(false);
    }
  };

  const onSeed = async () => {
    setSeeding(true);
    setUploadMsg(null);
    try {
      const res = await fetch('/api/dashboard/report/seed', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Seed failed');
      setUploadMsg(`Loaded ${data.weeksImported ?? 0} weeks. ${data.message ?? ''}`);
      const fresh = await fetchReport();
      setReport(fresh);
      setSelectedWeek(fresh.current?.week_start ?? fresh.weeks?.[0] ?? '');
      setSectionEdits(fresh.sections ?? {});
    } catch (err) {
      setUploadMsg(err instanceof Error ? err.message : 'Seed failed');
    } finally {
      setSeeding(false);
    }
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadMsg(null);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/dashboard/report/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setUploadMsg(`Imported ${data.weeksImported ?? 0} weeks. ${data.message ?? ''}`);
      const fresh = await fetchReport();
      setReport(fresh);
      setSelectedWeek(fresh.current?.week_start ?? fresh.weeks?.[0] ?? '');
      setSectionEdits(fresh.sections ?? {});
    } catch (err) {
      setUploadMsg(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const saveSection = async (sectionKey: string) => {
    if (!selectedWeek) return;
    const content = sectionEdits[sectionKey] ?? '';
    setSavingSection(sectionKey);
    try {
      const res = await fetch('/api/dashboard/report/sections', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ week_start: selectedWeek, section: sectionKey, content }),
      });
      if (!res.ok) throw new Error('Save failed');
      const data = await fetchReport(selectedWeek);
      setReport(data);
      setSectionEdits(data.sections ?? {});
    } finally {
      setSavingSection(null);
    }
  };

  if (loading && !report) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-8 text-center text-slate-400">
        Loading report...
      </div>
    );
  }

  const current = report?.current ?? null;
  const previous = report?.previous ?? null;
  const weeks = report?.weeks ?? [];
  const history = report?.history ?? [];

  const chartData = history.map((h) => ({
    week: h.week_start?.slice(5) ?? '',
    fullWeek: h.week_start,
    emails: Number(h.total_email_sent) || 0,
    content: Number(h.top_of_funnel_content_outputs) || 0,
    discoveryBooked: Number(h.discovery_calls_booked) || 0,
    discoveryHeld: Number(h.discovery_calls_held) || 0,
    cash: Number(h.cash_collected) || 0,
    clients: Number(h.new_clients) || 0,
  }));

  const chartColors = {
    emails: '#22c55e',
    content: '#3b82f6',
    discoveryBooked: '#8b5cf6',
    discoveryHeld: '#ec4899',
    cash: '#eab308',
    clients: '#06b6d4',
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Marketing report</h2>

      {/* Metrics summary */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-white">Metrics summary</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Object.entries(METRIC_LABELS).map(([key, label]) => {
            const cur = current ? Number(current[key]) : 0;
            const prev = previous ? Number(previous[key]) : 0;
            const d = delta(cur, prev);
            return (
              <div
                key={key}
                className="rounded-xl border border-slate-700 bg-slate-900/70 p-4"
              >
                <p className="text-xs text-slate-400">{label}</p>
                <p className="text-xl font-bold text-white">{formatMetric(cur)}</p>
                {previous && (
                  <p className={`text-sm ${d.up ? 'text-green-400' : 'text-red-400'}`}>
                    vs last week: {d.text}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Charts */}
      {chartData.length > 0 && (
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Trends over time</h3>

          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <h4 className="mb-3 text-sm font-medium text-slate-300">Emails sent & content output</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="emails" name="Emails sent" stroke={chartColors.emails} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="content" name="Content outputs" stroke={chartColors.content} strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <h4 className="mb-3 text-sm font-medium text-slate-300">Discovery calls</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorBooked" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorHeld" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="discoveryBooked" name="Booked" fill="url(#colorBooked)" stroke={chartColors.discoveryBooked} strokeWidth={2} />
                  <Area type="monotone" dataKey="discoveryHeld" name="Held" fill="url(#colorHeld)" stroke={chartColors.discoveryHeld} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <h4 className="mb-3 text-sm font-medium text-slate-300">Cash collected & new clients</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Legend />
                  <Bar dataKey="cash" name="Cash collected" fill={chartColors.cash} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="clients" name="New clients" fill={chartColors.clients} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      )}

      {/* Week selector + upload */}
      <section className="flex flex-wrap items-center gap-4">
        <label className="text-sm text-slate-400">
          Week:
          <select
            value={selectedWeek}
            onChange={(e) => onWeekChange(e.target.value)}
            className="ml-2 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-white"
          >
            {weeks.length === 0 && <option value="">No data</option>}
            {weeks.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={onSeed}
          disabled={seeding}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500 disabled:opacity-50"
        >
          {seeding ? 'Loading...' : 'Load sample report'}
        </button>
        <label className="cursor-pointer rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50">
          {uploading ? 'Uploading...' : 'Upload Excel'}
          <input
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={onUpload}
            disabled={uploading}
          />
        </label>
        {uploadMsg && (
          <p className="text-sm text-slate-400">{uploadMsg}</p>
        )}
      </section>

      {/* Weekly summary notes */}
      {current?.weekly_summary_notes && (
        <section>
          <h3 className="mb-2 text-lg font-semibold text-white">Weekly summary</h3>
          <p className="rounded-xl border border-slate-700 bg-slate-900/70 p-4 text-slate-300">
            {current.weekly_summary_notes}
          </p>
        </section>
      )}

      {/* Editable sections */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-white">Section updates</h3>
        <p className="mb-4 text-sm text-slate-400">
          Update notes for each channel. Save each section when done.
        </p>
        <div className="space-y-4">
          {REPORT_SECTIONS.map((sectionKey) => (
            <div
              key={sectionKey}
              className="rounded-xl border border-slate-700 bg-slate-900/70 p-4"
            >
              <h4 className="mb-2 font-medium text-white">{sectionKey.replace(/_/g, ' ')}</h4>
              <textarea
                value={sectionEdits[sectionKey] ?? ''}
                onChange={(e) => setSectionEdits((s) => ({ ...s, [sectionKey]: e.target.value }))}
                placeholder="Add notes for this section..."
                className="mb-2 w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500"
                rows={3}
              />
              <button
                onClick={() => saveSection(sectionKey)}
                disabled={savingSection === sectionKey || !selectedWeek}
                className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-500 disabled:opacity-50"
              >
                {savingSection === sectionKey ? 'Saving...' : 'Save'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
