'use client';

import { useEffect, useState, useCallback } from 'react';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

const STORAGE_KEY = 'dashboard_team_checklist_v1';

const DEFAULT_ITEMS: ChecklistItem[] = [
  { id: 'fix-dashboard', label: 'Fix and turn on the dashboard', checked: false },
  { id: 'fix-seo', label: 'Fix the SEO on the site', checked: false },
  { id: 'finalize-landing', label: 'Finalize bootcamp landing page headline and CTA', checked: false },
  { id: 'qa-forms', label: 'QA all registration forms and tracking parameters', checked: false },
  { id: 'configure-crm', label: 'Configure CRM tags and pipeline stage for bootcamp leads', checked: false },
  { id: 'verify-slack', label: 'Verify Slack lead and task notifications are active', checked: false },
  { id: 'promo-email', label: 'Schedule promotional email and SMS sequence', checked: false },
  { id: 'social-assets', label: 'Publish social promo assets and ad links', checked: false },
  { id: 'test-signup', label: 'Run full test signup flow (form → CRM → Slack → email)', checked: false },
  { id: 'bootcamp-replay', label: 'Post-bootcamp replay and follow-up sequence', checked: false },
  { id: 'review-metrics', label: 'Review conversion metrics and lessons learned', checked: false },
];

export default function TeamChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>(DEFAULT_ITEMS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ChecklistItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
        }
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((updated: ChecklistItem[]) => {
    setItems(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      persist(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
    },
    [items, persist],
  );

  const resetAll = useCallback(() => {
    persist(DEFAULT_ITEMS);
  }, [persist]);

  const completed = items.filter((i) => i.checked).length;
  const total = items.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (!loaded) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-8 text-center text-slate-400">
        Loading checklist...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Branden &amp; Eric To Do&apos;s</h2>
          <p className="mt-1 text-sm text-slate-400">
            Click items to mark them complete. Progress is saved automatically.
          </p>
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-md border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-700"
        >
          Reset checklist
        </button>
      </div>

      {/* Progress bar */}
      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-300">
            {completed} of {total} completed
          </span>
          <span className={pct === 100 ? 'font-semibold text-green-400' : 'text-slate-400'}>
            {pct}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-green-500 transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Checklist */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className={[
                'flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition',
                item.checked
                  ? 'border-green-900/40 bg-green-950/30 text-slate-500 line-through'
                  : 'border-slate-700 bg-slate-900/70 text-slate-200 hover:border-slate-500',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border text-xs',
                  item.checked
                    ? 'border-green-600 bg-green-600 text-white'
                    : 'border-slate-500 bg-transparent',
                ].join(' ')}
              >
                {item.checked ? '✓' : ''}
              </span>
              <span className="text-sm">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
