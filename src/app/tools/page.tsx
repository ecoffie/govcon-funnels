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

const tools = [
  {
    name: 'Market Assassin',
    tagline: 'Federal Market Research on Autopilot',
    description: 'Analyze agency spending patterns, identify target agencies, and uncover contract trends. Pull data from USAspending and SAM.gov contract data to build your capture strategy.',
    features: ['Agency spending breakdowns', 'NAICS code analysis', 'Contract trend reports', 'Competitor intelligence'],
    href: 'https://shop.govcongiants.org',
    icon: '🎯',
    color: 'red',
  },
  {
    name: 'Content Reaper',
    tagline: 'AI-Powered Proposal Content Extraction',
    description: 'Extract and organize reusable content from past proposals, SOWs, and PWS documents. Build a searchable content library that makes future proposals faster.',
    features: ['Document analysis', 'Content extraction', 'Searchable library', 'Proposal acceleration'],
    href: 'https://shop.govcongiants.org',
    icon: '📑',
    color: 'purple',
  },
  {
    name: 'Opportunity Hunter',
    tagline: 'Find the Right Contracts, Faster',
    description: 'Search SAM.gov contract opportunities by NAICS code, keywords, set-aside type, and agency. Get matched opportunities delivered to your inbox.',
    features: ['SAM.gov integration', 'NAICS filtering', 'Set-aside filters', 'Email alerts'],
    href: '/opp',
    icon: '🔍',
    color: 'blue',
  },
  {
    name: 'Contractor Database',
    tagline: 'Find Teaming Partners & Subcontractors',
    description: 'Search our database of vetted government contractors to find teaming partners, mentors, and subcontracting opportunities. Build relationships that win contracts.',
    features: ['Contractor profiles', 'NAICS matching', 'Certification filters', 'Direct contact'],
    href: 'https://shop.govcongiants.org',
    icon: '🤝',
    color: 'green',
  },
  {
    name: 'Recompete Tracker',
    tagline: 'Never Miss a Recompete Opportunity',
    description: 'Track expiring federal contracts and get alerts when recompete opportunities are posted. Position yourself months before the solicitation drops.',
    features: ['Expiring contract alerts', 'Agency tracking', 'Timeline reminders', 'Recompete intelligence'],
    href: 'https://shop.govcongiants.org',
    icon: '🔔',
    color: 'amber',
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

      {/* Tools Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto space-y-8">
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
                    {...(tool.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {tool.href === '/opp' ? 'Try Free →' : 'Get Access →'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-green-600/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Need Help Choosing the Right Tool?</h2>
          <p className="text-slate-400 mb-6">
            Book a free call with our team and we&apos;ll help you figure out which tools match your business goals.
          </p>
          <Link
            href="https://calendly.com/govconedumeet/gcg-beginnerscall"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
          >
            Book a Free Call
          </Link>
        </div>
      </section>
    </main>
  );
}
