import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, Search, X } from 'lucide-react';
import EpisodeRow from '@/components/EpisodeRow';
import type { Episode } from '@/data/episodes';
import { episodes } from '@/data/episodes';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 12;

type SortDir = 'newest' | 'oldest';

/** Topic filter keyword map (podcast.md §Data) — lowercase substring matchers over title + description. */
const TOPICS: { label: string; keywords: string[] }[] = [
  { label: 'All', keywords: [] },
  { label: '8(a)', keywords: ['8(a)'] },
  { label: 'CMMC', keywords: ['cmmc'] },
  { label: 'Subcontracting', keywords: ['subcontract'] },
  { label: 'SAM.gov', keywords: ['sam.gov', 'samgov'] },
  { label: 'Proposals', keywords: ['proposal', 'rfp', 'rfq'] },
  { label: 'Teaming', keywords: ['teaming', 'partner', 'prime'] },
  { label: 'Getting Paid', keywords: ['payment', 'invoice', 'paid', 'billing'] },
  { label: 'Mindset', keywords: ['mindset', 'experience', 'foundation', 'recession'] },
];

function monthLabel(yearMonth: string): string {
  const d = new Date(`${yearMonth}-01T00:00:00`);
  if (Number.isNaN(d.getTime())) return yearMonth;
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
}

interface MonthGroup {
  key: string;
  label: string;
  eps: Episode[];
}

/**
 * Archive controls + episode archive list (podcast.md §3–4).
 * Sticky filter bar (search debounced 150ms, topic chips with a sliding
 * layoutId pill, newest/oldest sort toggle) over a month-grouped EpisodeRow
 * list with 12-at-a-time "Load more" pagination (scroll-to-load sentinel on
 * mobile) and a clear-filters empty state.
 */
export default function EpisodeArchive() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [topic, setTopic] = useState('All');
  const [sort, setSort] = useState<SortDir>('newest');
  // Pagination is keyed to the filter signature: when filters change the key
  // changes and the count falls back to PAGE_SIZE — no reset effect needed.
  const filterKey = `${debouncedQuery}|${topic}|${sort}`;
  const [pagination, setPagination] = useState({ key: filterKey, count: PAGE_SIZE });
  const visibleCount = pagination.key === filterKey ? pagination.count : PAGE_SIZE;
  const sentinelRef = useRef<HTMLDivElement>(null);

  // 150ms debounce on the search box
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 150);
    return () => clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    const active = TOPICS.find((t) => t.label === topic) ?? TOPICS[0];
    const matches = episodes.filter((ep) => {
      const hay = `${ep.title} ${ep.description}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      if (active.keywords.length > 0 && !active.keywords.some((k) => hay.includes(k))) {
        return false;
      }
      return true;
    });
    return matches.sort((a, b) =>
      sort === 'newest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
  }, [debouncedQuery, topic, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => {
    setPagination((p) => {
      const base = p.key === filterKey ? p.count : PAGE_SIZE;
      return { key: filterKey, count: Math.min(base + PAGE_SIZE, filtered.length) };
    });
  }, [filterKey, filtered.length]);

  const groups = useMemo<MonthGroup[]>(() => {
    const out: MonthGroup[] = [];
    for (const ep of visible) {
      const key = ep.date.slice(0, 7);
      const last = out[out.length - 1];
      if (last && last.key === key) last.eps.push(ep);
      else out.push({ key, label: monthLabel(key), eps: [ep] });
    }
    return out;
  }, [visible]);

  // Scroll-to-load on mobile: sentinel near the end of the list appends 12
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    if (!window.matchMedia('(max-width: 767px)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: '240px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const clearFilters = () => {
    setQuery('');
    setDebouncedQuery('');
    setTopic('All');
    setSort('newest');
  };

  return (
    <>
      {/* -------------------- Section 3 — sticky archive controls -------------------- */}
      <div className="sticky top-[72px] z-40 border-b border-line bg-base/90 backdrop-blur-[12px]">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="container-gg flex flex-wrap items-center gap-x-5 gap-y-3 py-2.5"
        >
          {/* Search */}
          <div className="relative w-full sm:w-[320px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search episodes… e.g. CMMC, 8(a), subcontracting"
              aria-label="Search episodes"
              className="h-11 w-full rounded-lg border border-line bg-raised pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-500 transition-colors hover:text-slate-900 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Topic chips — sliding green pill via layoutId */}
          <div
            className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter by topic"
          >
            {TOPICS.map((t) => {
              const isActive = topic === t.label;
              return (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => setTopic(t.label)}
                  aria-pressed={isActive}
                  className="relative shrink-0 rounded-full px-4 py-2 font-mono text-xs transition-colors cursor-pointer"
                >
                  {isActive && (
                    <motion.span
                      layoutId="topic-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-brand"
                    />
                  )}
                  <span
                    className={cn(
                      'relative z-10 transition-colors duration-150',
                      isActive ? 'font-semibold text-brand-ink' : 'text-slate-500 hover:text-slate-900',
                    )}
                  >
                    {t.label}
                  </span>
                  {!isActive && <span className="absolute inset-0 rounded-full bg-raised" />}
                </button>
              );
            })}
          </div>

          {/* Sort toggle */}
          <button
            type="button"
            onClick={() => setSort((s) => (s === 'newest' ? 'oldest' : 'newest'))}
            className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-lg border border-line bg-raised px-3.5 py-2.5 font-mono text-[13px] text-slate-600 transition-colors hover:border-brand hover:text-brand cursor-pointer"
            aria-label={`Sort episodes, currently ${sort}`}
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            {sort === 'newest' ? 'NEWEST' : 'OLDEST'}
          </button>
        </motion.div>
      </div>

      {/* --------------------- Section 4 — episode archive list --------------------- */}
      <section className="pb-16 md:pb-24">
        <div className="container-gg">
          <div className="mx-auto max-w-[960px]">
            {/* Result count — crossfades on change */}
            <div className="flex h-10 items-center font-mono text-xs tracking-[0.14em] text-slate-500">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`${visible.length}-${filtered.length}-${topic}-${sort}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  SHOWING {visible.length} OF {filtered.length} EPISODES
                </motion.span>
              </AnimatePresence>
            </div>

            {filtered.length === 0 ? (
              /* Empty state */
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col items-center gap-6 border-t border-line py-20 text-center"
              >
                <p className="font-mono text-sm tracking-[0.14em] text-slate-500">
                  NO EPISODES MATCH — TRY &ldquo;CMMC&rdquo;
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-brand-ink transition-all duration-150 hover:-translate-y-px hover:bg-brand-hover active:scale-[0.98] cursor-pointer"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              /* key re-mounts the list so the stagger re-runs on filter change */
              <div key={`${topic}-${sort}-${debouncedQuery}`}>
                {groups.map((group) => (
                  <div key={group.key}>
                    {/* Sticky month/year sub-header (top 136px = 72px nav + 64px bar);
                        static below sm where the wrapped filter bar is taller */}
                    <div className="z-10 border-b border-line bg-base py-3 sm:sticky sm:top-[136px]">
                      <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.3 }}
                        className="font-mono text-sm font-medium tracking-[0.18em] text-brand"
                      >
                        {group.label}
                      </motion.h2>
                    </div>
                    <div>
                      {group.eps.map((ep, i) => (
                        <EpisodeRow key={ep.link} episode={ep} index={Math.min(i, 8)} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination: Load more (desktop) + scroll sentinel (mobile) */}
            {hasMore && (
              <>
                <div ref={sentinelRef} className="h-px" aria-hidden />
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={loadMore}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-transparent px-7 py-3.5 text-[15px] font-semibold text-slate-900 transition-all duration-150 hover:border-brand hover:text-brand cursor-pointer"
                  >
                    Load more episodes
                    <span className="font-mono text-xs text-slate-500">
                      ({filtered.length - visible.length} left)
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
