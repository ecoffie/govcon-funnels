import Link from 'next/link';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Federal Contractor Resource Hub | Everything You Need to Start',
  description: 'Complete resource hub for federal contractors. SAM.gov registration, CAGE codes, certifications, finding contracts, writing proposals — all in one place.',
  path: '/federal-contractor',
  keywords: [
    'federal contractor',
    'government contractor',
    'federal contracting',
    'government contracting resources',
    'how to become a federal contractor',
    'federal contractor requirements',
    'government contractor guide',
  ],
});

const gettingStarted = [
  {
    title: 'Government Contracting for Beginners',
    description: 'Start here if you\'re new to federal contracting',
    href: '/guides/government-contracting-for-beginners',
    icon: '🎯',
  },
  {
    title: 'SAM.gov Registration',
    description: 'Step-by-step guide to register your business',
    href: '/guides/sam-gov-registration',
    icon: '📋',
  },
  {
    title: 'CAGE Code Guide',
    description: 'Get your federal contractor ID number',
    href: '/guides/cage-code',
    icon: '🔑',
  },
  {
    title: 'Capability Statement',
    description: 'Create your one-page business resume',
    href: '/guides/capability-statement',
    icon: '📄',
  },
];

const certifications = [
  {
    title: 'SBA Certifications Overview',
    description: 'Compare 8(a), SDVOSB, HUBZone, WOSB',
    href: '/guides/sba-certifications',
    badge: 'Start Here',
  },
  {
    title: '8(a) Certification',
    description: 'Socially disadvantaged business program',
    href: '/guides/8a-certification',
  },
  {
    title: 'SDVOSB/VOSB Certification',
    description: 'Veteran-owned business programs',
    href: '/guides/vosb-certification',
  },
  {
    title: 'HUBZone Certification',
    description: 'Historically underutilized business zones',
    href: '/guides/hubzone-certification',
  },
  {
    title: 'WOSB/EDWOSB Certification',
    description: 'Women-owned business programs',
    href: '/guides/wosb-certification',
  },
  {
    title: 'GSA Schedule',
    description: 'Get on the GSA contract vehicle',
    href: '/guides/gsa-schedule',
  },
];

const winningContracts = [
  {
    title: 'Finding Government Contracts',
    description: 'Where to find federal opportunities',
    href: '/guides/finding-government-contracts',
    icon: '🔍',
  },
  {
    title: 'Federal Market Research',
    description: 'Research agencies and spending patterns',
    href: '/guides/federal-market-research',
    icon: '📊',
  },
  {
    title: 'Proposal Writing',
    description: 'Write winning government proposals',
    href: '/guides/proposal-writing',
    icon: '✍️',
  },
  {
    title: 'Subcontracting & Teaming',
    description: 'Partner with prime contractors',
    href: '/guides/subcontracting-and-teaming',
    icon: '🤝',
  },
];

const tools = [
  {
    title: 'Opportunity Scout',
    description: 'Search contracts by NAICS and agency',
    href: '/opp',
    badge: 'Free Tool',
  },
  {
    title: 'GovCon Glossary',
    description: '45+ terms every contractor should know',
    href: '/glossary',
  },
  {
    title: 'Free Beginner Course',
    description: 'Video training for new contractors',
    href: '/free-course',
  },
];

export default function FederalContractorPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Federal Contractor <span className="text-green-500">Resource Hub</span>
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            Everything you need to start and grow your government contracting business — organized by where you are in your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#getting-started" className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition">
              I&apos;m Just Starting
            </Link>
            <Link href="#certifications" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition">
              I Need Certifications
            </Link>
            <Link href="#winning" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition">
              I&apos;m Ready to Win
            </Link>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="py-16 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Phase 1</span>
            <h2 className="text-3xl font-bold text-white mt-1">Getting Started</h2>
            <p className="text-slate-400 mt-2">The essential first steps every federal contractor must complete</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gettingStarted.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-start gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-green-600/50 transition group"
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="text-white font-bold group-hover:text-green-400 transition">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-16 px-6 bg-slate-900/50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Phase 2</span>
            <h2 className="text-3xl font-bold text-white mt-1">Small Business Certifications</h2>
            <p className="text-slate-400 mt-2">Unlock set-aside contracts reserved for certified small businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-green-600/50 transition group block"
              >
                {item.badge && (
                  <span className="inline-block bg-green-600/20 text-green-500 text-xs font-semibold px-2 py-1 rounded mb-2">
                    {item.badge}
                  </span>
                )}
                <h3 className="text-white font-bold group-hover:text-green-400 transition">{item.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Winning Contracts */}
      <section id="winning" className="py-16 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Phase 3</span>
            <h2 className="text-3xl font-bold text-white mt-1">Winning Contracts</h2>
            <p className="text-slate-400 mt-2">Find opportunities and write proposals that win</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {winningContracts.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-start gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-green-600/50 transition group"
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="text-white font-bold group-hover:text-green-400 transition">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">Tools</span>
            <h2 className="text-3xl font-bold text-white mt-1">Free Tools & Resources</h2>
            <p className="text-slate-400 mt-2">Practical tools to accelerate your government contracting journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tools.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-green-600/50 transition group block"
              >
                {item.badge && (
                  <span className="inline-block bg-green-600/20 text-green-500 text-xs font-semibold px-2 py-1 rounded mb-2">
                    {item.badge}
                  </span>
                )}
                <h3 className="text-white font-bold group-hover:text-green-400 transition">{item.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-400 mb-8">
            Take our free beginner course and learn how to win your first federal contract.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/free-course" className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition">
              Start Free Course
            </Link>
            <Link href="/government-contract-help" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
