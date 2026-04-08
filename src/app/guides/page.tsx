import Link from 'next/link';
import { allGuides } from '@/content/guides';
import { generateSeo, itemListJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Federal Contractor Resources | GovCon Guides, Tools & Training',
  description: 'Federal contractor resources for every growth stage: beginner guides, SAM.gov registration, certifications, proposal writing, market research, tools, and expert support.',
  path: '/guides',
  keywords: [
    'federal contractor resources',
    'government contractor resources',
    'government contracting guides',
    'federal contracting resources',
    'how to become a government contractor',
    'how to win federal contracts',
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
  'naics-codes': {
    icon: '🏷️',
    shortDesc: 'Choose the right NAICS codes for positioning and opportunity fit.',
  },
  'ai-government-contracting': {
    icon: '🤖',
    shortDesc: 'How AI tools are transforming government contracting.',
  },
  'rfp-response': {
    icon: '📝',
    shortDesc: 'Respond to RFPs with a structured plan, timeline, and win strategy.',
  },
  'cmmc-certification': {
    icon: '🔒',
    shortDesc: 'Understand CMMC 2.0 requirements for defense contractors.',
  },
  'contract-vehicles': {
    icon: '🛣️',
    shortDesc: 'Learn the contract vehicles that shape federal buying pathways.',
  },
  'sources-sought': {
    icon: '📣',
    shortDesc: 'Use market research notices to position your business before the RFP.',
  },
};

const sectionDefinitions = [
  {
    title: 'Start Here',
    description: 'Core resources for becoming a government contractor and getting positioned correctly.',
    slugs: ['government-contracting-for-beginners', 'sam-gov-registration', 'cage-code', 'naics-codes'],
  },
  {
    title: 'Certifications',
    description: 'Certification guides that help federal contractors pursue set-aside opportunities.',
    slugs: ['sba-certifications', '8a-certification', 'vosb-certification', 'hubzone-certification', 'wosb-certification', 'cmmc-certification'],
  },
  {
    title: 'Find Work',
    description: 'Opportunity discovery, agency research, contract vehicles, and early positioning tactics.',
    slugs: ['finding-government-contracts', 'federal-market-research', 'contract-vehicles', 'sources-sought', 'gsa-schedule'],
  },
  {
    title: 'Proposals And Positioning',
    description: 'Resources for capability statements, teaming, capture planning, and proposal execution.',
    slugs: ['capability-statement', 'subcontracting-and-teaming', 'proposal-writing', 'rfp-response'],
  },
  {
    title: 'Growth Library',
    description: 'Advanced topics and emerging areas for modern federal contractor growth.',
    slugs: ['ai-government-contracting'],
  },
];

const featuredDestinations = [
  {
    title: 'CAGE Code Lookup Tool',
    description: 'Search contractors by CAGE code or company name using live SAM.gov data.',
    href: '/tools/cage-code-lookup',
    accent: 'text-green-400',
  },
  {
    title: 'Expiring Contracts Finder',
    description: 'Spot recompete opportunities before the solicitation hits the street.',
    href: '/tools/expiring-contracts',
    accent: 'text-green-400',
  },
  {
    title: 'GovCon Glossary',
    description: 'Learn the federal contracting terms that show up in solicitations and agency conversations.',
    href: '/glossary',
    accent: 'text-blue-400',
  },
  {
    title: 'Government Contract Help',
    description: 'Get expert support if you need guidance beyond self-serve resources.',
    href: '/government-contract-help',
    accent: 'text-amber-400',
  },
  {
    title: 'Proposal Writing Services',
    description: 'Move from education into done-with-you support for live bids and proposals.',
    href: '/proposal-writing-services',
    accent: 'text-amber-400',
  },
  {
    title: 'GovCon Tools',
    description: 'Explore free and premium tools for research, targeting, and contractor intelligence.',
    href: '/tools',
    accent: 'text-green-400',
  },
];

const featuredGuideSlugs = [
  'government-contracting-for-beginners',
  'sam-gov-registration',
  'cage-code',
  'gsa-schedule',
  'proposal-writing',
  'sba-certifications',
];

function getGuide(slug: string) {
  return allGuides.find((guide) => guide.slug === slug);
}

function GuideCard({ slug }: { slug: string }) {
  const guide = getGuide(slug);

  if (!guide) return null;

  const meta = guideDescriptions[guide.slug];

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="bg-slate-900 border border-slate-800 rounded-xl p-6 block hover:border-green-600/50 transition group"
    >
      <div className="text-3xl mb-3">{meta?.icon || '📖'}</div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition">
        {guide.title}
      </h3>
      <p className="text-slate-400 text-sm mb-3">
        {meta?.shortDesc || guide.metaDescription}
      </p>
      <span className="text-green-500 text-sm font-semibold">Read Guide →</span>
    </Link>
  );
}

export default function GuidesIndex() {
  const guidesListJsonLd = itemListJsonLd({
    name: 'Federal Contractor Resources',
    description: 'Guides and resources to help businesses become stronger federal contractors and win more government contracts.',
    items: allGuides.map((guide) => ({ name: guide.title, url: `/guides/${guide.slug}` })),
  });

  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={guidesListJsonLd} />

      <section className="pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-5">
              Federal Contractor Resource Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5">
              Federal Contractor <span className="text-green-500">Resources</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mb-4">
              A structured library for businesses that want to become stronger government contractors, win federal contracts, and grow from first registration to repeatable proposal execution.
            </p>
            <p className="text-slate-400 max-w-3xl">
              Start with the fundamentals if you are new to federal contracting, or jump straight to certifications, market research, proposals, tools, and expert support if you are already in motion.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] mt-10">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-2">How To Use This Hub</h2>
              <p className="text-slate-400 mb-6">
                Use the paths below based on where your business is today, then work through the grouped guide collections underneath.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                  <div className="text-sm font-semibold text-green-400 mb-2">For Beginners</div>
                  <h3 className="text-white font-bold mb-2">Start with registration, codes, and first-positioning basics</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Best if you are new to federal contracting and need a clear path from setup to first opportunities.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/guides/government-contracting-for-beginners" className="text-sm text-green-500 hover:text-green-400">
                      Beginner Guide →
                    </Link>
                    <Link href="/guides/sam-gov-registration" className="text-sm text-green-500 hover:text-green-400">
                      SAM.gov →
                    </Link>
                    <Link href="/guides/cage-code" className="text-sm text-green-500 hover:text-green-400">
                      CAGE Code →
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
                  <div className="text-sm font-semibold text-blue-400 mb-2">For Established Firms</div>
                  <h3 className="text-white font-bold mb-2">Focus on certifications, capture positioning, and proposal readiness</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Best if you already have registrations in place and want stronger pipeline quality, teaming, and win strategy.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/guides/sba-certifications" className="text-sm text-green-500 hover:text-green-400">
                      Certifications →
                    </Link>
                    <Link href="/guides/federal-market-research" className="text-sm text-green-500 hover:text-green-400">
                      Market Research →
                    </Link>
                    <Link href="/guides/proposal-writing" className="text-sm text-green-500 hover:text-green-400">
                      Proposal Writing →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Featured Resources</h2>
              <p className="text-slate-400 mb-5">
                High-priority destinations for research, learning, and expert help.
              </p>
              <div className="space-y-4">
                {featuredDestinations.map((destination) => (
                  <Link
                    key={destination.href}
                    href={destination.href}
                    className="block rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-green-600/40 transition"
                  >
                    <div className={`font-semibold mb-1 ${destination.accent}`}>{destination.title}</div>
                    <p className="text-sm text-slate-400">{destination.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Priority <span className="text-green-500">Guides</span>
              </h2>
              <p className="text-slate-400 max-w-2xl">
                Start with the pages that cover the highest-value federal contractor fundamentals and proven search opportunities.
              </p>
            </div>
            <Link href="/tools" className="text-green-500 hover:text-green-400 font-semibold shrink-0">
              Explore Tools →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGuideSlugs.map((slug) => (
              <GuideCard key={slug} slug={slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto space-y-10">
          {sectionDefinitions.map((section) => (
            <div key={section.title} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{section.title}</h2>
                  <p className="text-slate-400 max-w-3xl">{section.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.slugs.map((slug) => (
                  <GuideCard key={slug} slug={slug} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
