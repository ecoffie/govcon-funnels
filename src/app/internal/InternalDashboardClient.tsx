'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PREMIUM_PRODUCTS } from '@/app/premium/config';
import Flowchart from './Flowchart';

type TabId = 'quick-links' | 'how-it-fits' | 'funnels-lead' | 'plans';

type InternalDashboardClientProps = {
  topPriority: { title: string; description: string; link: string; rundown: string };
  quickLinks: { href: string; label: string }[];
  funnels: { path: string; name: string; external?: boolean }[];
  glossary: { term: string; def: string }[];
  levels: { id: string; label: string; definition: string; planKeys: string[] }[];
  internalPlanNotes: Record<string, { whereSold: string; afterSignup: string }>;
};

const TABS: { id: TabId; label: string }[] = [
  { id: 'quick-links', label: 'Quick links' },
  { id: 'how-it-fits', label: 'How it all fits together' },
  { id: 'funnels-lead', label: 'Funnels and lead flow' },
  { id: 'plans', label: 'Plans overview' },
];

export default function InternalDashboardClient(props: InternalDashboardClientProps) {
  const { topPriority, quickLinks, funnels, glossary, levels, internalPlanNotes } = props;
  const [activeTab, setActiveTab] = useState<TabId>('quick-links');
  const [searchQuery, setSearchQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  async function handleAsk() {
    const q = searchQuery.trim();
    if (!q) return;
    setSearchLoading(true);
    setAnswer(null);
    setSearchError(null);
    try {
      const res = await fetch('/api/internal/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSearchError(data.error || 'Something went wrong');
        return;
      }
      setAnswer(data.answer ?? '');
    } catch (e) {
      setSearchError('Request failed. Try again.');
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-white mb-2">
          Internal <span className="text-green-500">Dashboard</span>
        </h1>
        <p className="text-slate-400 mb-6">
          For the internal team: see plans, funnels, and how the backend works.
        </p>

        {/* Search bar */}
        <section className="mb-8">
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Ask a question about funnels, plans, or lead flow..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              className="flex-1 min-w-[200px] px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
            />
            <button
              type="button"
              onClick={handleAsk}
              disabled={searchLoading}
              className="px-5 py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold disabled:opacity-50 transition"
            >
              {searchLoading ? 'Asking…' : 'Ask'}
            </button>
          </div>
          {answer !== null && (
            <div className="mt-3 p-4 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 text-sm whitespace-pre-wrap">
              {answer}
            </div>
          )}
          {searchError && (
            <p className="mt-2 text-sm text-red-400">{searchError}</p>
          )}
        </section>

        {/* Top priority */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-3">Top priority</h2>
          <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-500 mb-1">{topPriority.title}</h3>
            <p className="text-slate-400 mb-3">{topPriority.description}</p>
            <a
              href={topPriority.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold mb-4"
            >
              Open funnel →
            </a>
            <p className="text-slate-500 text-sm">{topPriority.rundown}</p>
          </div>
        </section>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-slate-700 pb-1 mb-6">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-4 py-2 rounded-t-lg font-semibold text-sm transition ${
                activeTab === id
                  ? 'bg-slate-700 text-white border border-slate-600 border-b-slate-700 -mb-[1px]'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="min-h-[200px]">
          {activeTab === 'quick-links' && (
            <section>
              <div className="flex flex-wrap gap-3">
                {quickLinks.map(({ href, label }) => (
                  <a
                    key={href + label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-green-400 hover:bg-slate-700 transition"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'how-it-fits' && (
            <section>
              <Flowchart />
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-3">Definitions</h3>
                <ul className="space-y-3">
                  {glossary.map(({ term, def }) => (
                    <li key={term} className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                      <span className="font-medium text-green-500">{term}</span>
                      <span className="text-slate-400 text-sm ml-2">– {def}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {activeTab === 'funnels-lead' && (
            <section>
              <p className="text-slate-400 max-w-2xl mb-6">
                Lead forms post to <code className="bg-slate-800 px-1.5 py-0.5 rounded text-green-400">/api/lead</code>, which creates/updates a contact in GoHighLevel (with tags), sends a Slack notification, and can send a confirmation email.
              </p>
              <h3 className="text-lg font-semibold text-white mb-3">Funnel library</h3>
              <p className="text-slate-400 text-sm mb-3">All funnels and entry points with links.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {funnels.map((f) => (
                  <li key={f.path}>
                    {f.external ? (
                      <a href={f.path} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                        {f.name}
                      </a>
                    ) : (
                      <Link href={f.path} className="text-green-400 hover:underline">
                        {f.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === 'plans' && (
            <section>
              <p className="text-slate-400 mb-6 max-w-2xl">
                How we position each product by level (beginner / growing / scaling) and where it’s sold.
              </p>
              {levels.map((level) => (
                <div key={level.id} className="mb-8">
                  <h3 className="text-lg font-semibold text-green-500 mb-1">{level.label}</h3>
                  <p className="text-slate-500 text-sm mb-4">{level.definition}</p>
                  <ul className="space-y-4">
                    {level.planKeys.map((key) => {
                      const product = key === 'jan-31-replay'
                        ? { slug: 'jan-31-replay', title: 'Jan 31 Bootcamp Replay', price: 'One-time', href: '/jan-31-bootcamp-paid' }
                        : PREMIUM_PRODUCTS.find((p) => p.slug === key);
                      if (!product) return null;
                      const notes = internalPlanNotes[product.slug];
                      const href = 'href' in product ? product.href : (product as { ctaUrl: string }).ctaUrl;
                      const isExternal = href.startsWith('http') || href.startsWith('mailto:');
                      const cardContent = (
                        <>
                          <div className="font-medium text-white">{product.title}</div>
                          {'price' in product && product.price && (
                            <div className="text-slate-500 text-sm">{product.price}</div>
                          )}
                          {notes && (
                            <>
                              <div className="mt-2 text-slate-400 text-sm">
                                <span className="text-slate-500">Where sold:</span> {notes.whereSold}
                              </div>
                              <div className="mt-1 text-slate-500 text-sm">
                                <span className="text-slate-600">After signup:</span> {notes.afterSignup}
                              </div>
                            </>
                          )}
                        </>
                      );
                      return (
                        <li key={product.slug}>
                          {isExternal ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 block hover:border-green-600/50 transition"
                            >
                              {cardContent}
                            </a>
                          ) : (
                            <Link
                              href={href}
                              className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 block hover:border-green-600/50 transition"
                            >
                              {cardContent}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="pt-8 border-t border-slate-800 mt-8">
          <Link href="/" className="text-green-500 hover:text-green-400 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
