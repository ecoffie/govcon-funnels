import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * `/about` — Eric's story, migrated from the podcast SPA in the 2026-08-24 one-site
 * consolidation.
 *
 * Deliberately rebuilt as a static server-rendered page rather than a faithful port of
 * the SPA's five animated client components (BioHero / StatsBand / StoryTimeline /
 * QuotesSection / MissionBanner + framer-motion + a GSAP count-up). The story, proof,
 * CTAs, and the /about URL are preserved; the animation machinery is not. It renders
 * without JavaScript, reads correctly on mobile, and has no layout shift.
 *
 * ⚠️ Two stats were REFRESHED, not copied. The SPA claimed "334+ episodes" and
 * "250K+ podcast listens". The Libsyn stats export (2026-03) shows 675 episodes
 * released 2019-05-10 → 2026-03-06 and 282,269 IAB downloads. Both SPA figures were
 * stale and understated. The numbers below are the verified ones, rounded DOWN so the
 * claim is never larger than reality.
 */

export const metadata: Metadata = {
  title: 'About Eric Coffie — From Zero to $20M in Federal Contracts',
  description:
    "Eric Coffie's story: two 8(a) startups, a $5M Air Force win, $20M+ in federal sales, and the podcast that gives the playbook away for free.",
  alternates: { canonical: 'https://govcongiants.com/about' },
  openGraph: {
    title: 'About Eric Coffie — GovCon Giants',
    description:
      'From everyday beginnings to teaching thousands of small businesses how to win federal contracts.',
    url: 'https://govcongiants.com/about',
    type: 'profile',
  },
};

const STATS = [
  { value: '$20M+', label: 'Federal sales built from zero' },
  { value: '675', label: 'Podcast episodes published' },
  { value: '282K+', label: 'Podcast downloads' },
] as const;

const TIMELINE = [
  {
    marker: '2008–2012',
    title: 'The climb.',
    body: 'Eric helps build two 8(a) small businesses from startup to millions in federal revenue — learning the system from the inside.',
  },
  {
    marker: 'The breakthrough',
    title: 'The $5M win.',
    body: 'Evankoff Construction wins a $5M Air Force base hospital exterior renovation. That single contract funds everything that comes next.',
  },
  {
    marker: '$20M+',
    title: 'Zero to Giant.',
    body: 'Evankoff grows past $20M in government sales. The playbook is proven — and Eric starts writing it down.',
  },
  {
    marker: '2017',
    title: 'Score Contracts → YouTube.',
    body: "A YouTube channel called 'Score Contracts' goes live. The mission: give away 99.9% for free.",
  },
  {
    marker: 'Today',
    title: 'GovCon Giants.',
    body: 'A podcast past 675 episodes, the Billion Dollar Playbook, and a community of everyday people winning extraordinary contracts.',
  },
] as const;

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Eric Coffie',
    jobTitle: 'Founder, GovCon Giants',
    url: 'https://govcongiants.com/about',
    description:
      'Federal contracting educator and host of the GovCon Giants Podcast. Built $20M+ in federal sales before teaching the process publicly.',
    sameAs: ['https://govcongiants.com', 'https://getmindy.ai'],
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <header>
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-300">
            About
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">
            Everyday people. Extraordinary federal contracts.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Eric Coffie didn&apos;t inherit a government contracting business. He learned the
            system from the inside, used it to build past $20M in federal sales, and then
            did the thing most people in this industry never do — he gave the playbook away.
          </p>
        </header>

        <section aria-label="By the numbers" className="mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-3xl font-bold text-white">{s.value}</span>
                  <span className="mt-1 block text-xs uppercase tracking-wide text-slate-400">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">How it happened</h2>
          <ol className="mt-8 flex flex-col gap-8 border-l border-slate-800 pl-6">
            {TIMELINE.map((t) => (
              <li key={t.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[1.65rem] top-2 h-2.5 w-2.5 rounded-full bg-violet-400"
                />
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-300">
                  {t.marker}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">{t.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-300">{t.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold">The mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Give away 99.9% for free. The information that decides who wins federal
            contracts shouldn&apos;t sit behind a five-figure consulting retainer — it should
            be something a small business owner can learn on a lunch break.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/podcast"
              className="rounded-lg bg-violet-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-violet-500"
            >
              Listen to the podcast
            </Link>
            <Link
              href="/resources"
              className="rounded-lg border border-slate-700 px-5 py-3 text-center font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Free resources
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
