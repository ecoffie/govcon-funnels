import Link from 'next/link';
import { generateSeo } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'GovCon Tools — Find, Research & Win Federal Contracts',
  description: 'Powerful tools built for government contractors. Market research, opportunity hunting, competitor analysis, recompete tracking, and contractor database — all in one place.',
  path: '/tools',
  keywords: [
    'government contract search tool',
    'federal market research tool',
    'contractor database',
    'govcon tools',
    'opportunity hunter',
    'federal spending analysis',
  ],
});

const freeTools = [
  {
    name: 'CAGE Code Lookup',
    tagline: 'Search 600,000+ Federal Contractors',
    description: 'Look up any CAGE code or search by company name. Find contractor details, NAICS codes, certifications, and registration status — all powered by official SAM.gov data.',
    features: ['Search by CAGE code', 'Search by company name', 'NAICS & certifications', 'Free to use'],
    href: '/tools/cage-code-lookup',
    icon: '🔎',
    color: 'green',
    isFree: true,
  },
  {
    name: 'Expiring Contracts Finder',
    tagline: 'Find Recompete Opportunities Before They Hit the Street',
    description: 'Search for federal contracts expiring in the next 6-18 months. Identify sole source and low-competition contracts that will recompete — giving you time to prepare.',
    features: ['Search by NAICS code', 'Expiration timeline', 'Competition level', 'Free to use'],
    href: '/tools/expiring-contracts',
    icon: '📅',
    color: 'green',
    isFree: true,
  },
];

const tools = [
  {
    name: 'Market Assassin',
    tagline: 'Federal Market Research on Autopilot',
    description: 'Analyze agency spending patterns, identify target agencies, and uncover contract trends. Pull data from USAspending and SAM.gov contract data to build your capture strategy.',
    features: ['Agency spending breakdowns', 'NAICS code analysis', 'Contract trend reports', 'Competitor intelligence'],
    href: 'https://mi.govcongiants.com/federal-market-assassin',
    icon: '🎯',
    color: 'red',
    included: true,
  },
  {
    name: 'Content Reaper',
    tagline: 'AI-Powered Proposal Content Extraction',
    description: 'Extract and organize reusable content from past proposals, SOWs, and PWS documents. Build a searchable content library that makes future proposals faster.',
    features: ['Document analysis', 'Content extraction', 'Searchable library', 'Proposal acceleration'],
    href: 'https://mi.govcongiants.com/content-reaper',
    icon: '📑',
    color: 'purple',
    included: true,
  },
  {
    name: 'Opportunity Hunter',
    tagline: 'Find the Right Contracts, Faster',
    description: 'Search SAM.gov contract opportunities by NAICS code, keywords, set-aside type, and agency. Get matched opportunities delivered to your inbox.',
    features: ['SAM.gov integration', 'NAICS filtering', 'Set-aside filters', 'Email alerts'],
    href: 'https://mi.govcongiants.com/opportunity-hunter',
    icon: '🔍',
    color: 'blue',
    included: false,
  },
  {
    name: 'Contractor Database',
    tagline: 'Find Teaming Partners & Subcontractors',
    description: 'Search our database of 3,500+ vetted government contractors to find teaming partners, mentors, and subcontracting opportunities. Includes 800+ SBLO contacts.',
    features: ['3,500+ contractor profiles', 'SBLO contact info', 'Certification filters', 'Teaming recommendations'],
    href: 'https://mi.govcongiants.com/contractor-database',
    icon: '🤝',
    color: 'green',
    included: true,
  },
  {
    name: 'Recompete Tracker',
    tagline: 'Never Miss a Recompete Opportunity',
    description: 'Track 5,000+ expiring federal contracts and get alerts when recompete opportunities are posted. Position yourself months before the solicitation drops.',
    features: ['5,000+ expiring contracts', 'Agency tracking', 'Timeline reminders', 'Incumbent data'],
    href: 'https://mi.govcongiants.com/expiring-contracts',
    icon: '🔔',
    color: 'amber',
    included: true,
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'GovCon Giants Tools',
        description: 'Government contracting tools for small businesses',
        url: `${SITE_URL}/tools`,
        numberOfItems: tools.length,
        itemListElement: tools.map((tool, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: tool.name,
          description: tool.description,
        })),
      }} />

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            GovCon <span className="text-green-500">Tools</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Purpose-built tools to help you find, research, and win government contracts. Stop doing federal market research manually.
          </p>
        </div>
      </section>

      {/* Free Tools */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded">FREE</span>
            Free Tools
          </h2>
          <div className="space-y-6">
            {freeTools.map((tool) => (
              <div
                key={tool.name}
                className="bg-slate-900 border-2 border-green-500/30 rounded-2xl p-8 hover:border-green-500/50 transition"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-green-500/20 flex items-center justify-center text-3xl">
                      {tool.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded">FREE</span>
                    </div>
                    <p className="text-green-500 font-medium mb-3">{tool.tagline}</p>
                    <p className="text-slate-400 mb-4">{tool.description}</p>
                    <ul className="grid grid-cols-2 gap-2 mb-6">
                      {tool.features.map((feature) => (
                        <li key={feature} className="text-slate-500 text-sm flex items-center gap-2">
                          <span className="text-green-500">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={tool.href}
                      className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
                    >
                      Try Free →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MI Free CTA */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Want All These Tools?</h2>
                <p className="text-slate-400">Start with MI Free — get daily alerts and access to our free tools. No credit card required.</p>
              </div>
              <Link
                href="/mi-free"
                className="flex-shrink-0 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
              >
                Get MI Free →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Tools Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Premium Tools</h2>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">Included in MI Core — $149/mo</span>
          </div>
          <div className="space-y-8">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center text-3xl">
                    {tool.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-1">{tool.name}</h2>
                  <p className="text-green-500 font-medium mb-3">{tool.tagline}</p>
                  <p className="text-slate-400 mb-4">{tool.description}</p>
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {tool.features.map((feature) => (
                      <li key={feature} className="text-slate-500 text-sm flex items-center gap-2">
                        <span className="text-green-500">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tool.href}
                    className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
                  >
                    {tool.included ? 'Included in MI Core →' : 'Try Free →'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-green-600/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Start Free, Upgrade When Ready</h2>
          <p className="text-slate-400 mb-6">
            MI Free gives you daily opportunity alerts and access to our free tools. Upgrade to MI Core ($149/mo) for the full intelligence platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Get MI Free
            </Link>
            <Link
              href="https://mi.govcongiants.com/market-intelligence"
              className="inline-block px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              See MI Core
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
