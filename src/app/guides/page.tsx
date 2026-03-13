import Link from 'next/link';
import { allGuides } from '@/content/guides';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Government Contracting Guides',
  description: 'Free comprehensive guides on government contracting — from SAM.gov registration to proposal writing. Learn how to win federal contracts for your small business.',
  path: '/guides',
  keywords: [
    'government contracting guides',
    'federal contracting resources',
    'how to win government contracts',
    'govcon training',
  ],
});

const guideDescriptions: Record<string, { icon: string; shortDesc: string }> = {
  'government-contracting-for-beginners': {
    icon: '🚀',
    shortDesc: 'Everything you need to know to start winning federal contracts.',
  },
  'sam-gov-registration': {
    icon: '📋',
    shortDesc: 'Step-by-step walkthrough of the SAM.gov registration process.',
  },
  'cage-code': {
    icon: '🔑',
    shortDesc: 'What a CAGE code is, how to get one, and how to look one up.',
  },
  'capability-statement': {
    icon: '📄',
    shortDesc: 'How to create a capability statement that gets you noticed.',
  },
  'sba-certifications': {
    icon: '🏅',
    shortDesc: '8(a), SDVOSB, HUBZone, and WOSB certifications explained.',
  },
  '8a-certification': {
    icon: '⭐',
    shortDesc: 'Deep-dive into the most powerful SBA certification program.',
  },
  'vosb-certification': {
    icon: '🎖️',
    shortDesc: 'VOSB and SDVOSB certification for veteran-owned businesses.',
  },
  'hubzone-certification': {
    icon: '📍',
    shortDesc: 'HUBZone requirements, map tool, and 10% price preference.',
  },
  'wosb-certification': {
    icon: '👩‍💼',
    shortDesc: 'WOSB and EDWOSB certification for women-owned businesses.',
  },
  'finding-government-contracts': {
    icon: '🔍',
    shortDesc: 'Where and how to find the right federal contract opportunities.',
  },
  'proposal-writing': {
    icon: '✍️',
    shortDesc: 'Write winning proposals that beat the competition.',
  },
  'subcontracting-and-teaming': {
    icon: '🤝',
    shortDesc: 'How to partner with primes and build your teaming portfolio.',
  },
  'federal-market-research': {
    icon: '📊',
    shortDesc: 'Analyze federal spending data to find your best opportunities.',
  },
  'gsa-schedule': {
    icon: '📑',
    shortDesc: 'How to get on a GSA Schedule and win task order work.',
  },
  'ai-government-contracting': {
    icon: '🤖',
    shortDesc: 'How AI tools are transforming government contracting.',
  },
};

export default function GuidesIndex() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Government Contracting <span className="text-green-500">Guides</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Free in-depth guides to help your small business win federal contracts. Start from the beginning or jump to the topic you need.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {allGuides.map((guide) => {
            const meta = guideDescriptions[guide.slug];
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 block hover:border-green-600/50 transition group"
              >
                <div className="text-3xl mb-3">{meta?.icon || '📖'}</div>
                <h2 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition">
                  {guide.title}
                </h2>
                <p className="text-slate-500 text-sm mb-3">
                  {meta?.shortDesc || guide.metaDescription}
                </p>
                <span className="text-green-500 text-sm font-semibold">Read Guide →</span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
