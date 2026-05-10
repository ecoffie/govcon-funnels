import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Features — Federal Contract Intelligence Platform | GovCon Giants',
  description: 'Discover federal contracts, track opportunities, and win more government work. AI-powered alerts, 800+ SBLO contacts, 7,700+ forecasts, and pipeline CRM. Built for small businesses.',
  path: '/features',
  keywords: [
    'government contracting software',
    'federal contract intelligence',
    'government contract finder',
    'federal opportunity alerts',
    'govcon software',
    'contract intelligence platform',
    'sam.gov alternative',
    'government contracting tools',
  ],
});

const features = [
  {
    id: 'opportunity-finder',
    icon: '🎯',
    title: 'Opportunity Finder',
    description: 'Search federal contracts across SAM.gov, Grants.gov, and 50+ state portals. AI-powered matching finds opportunities you\'d miss with manual searches.',
    stats: '24,000+ opportunities indexed',
    link: '/features/opportunity-finder',
  },
  {
    id: 'ai-briefings',
    icon: '🤖',
    title: 'AI-Powered Briefings',
    description: 'Daily and weekly intelligence briefings delivered to your inbox. Our AI analyzes thousands of opportunities and surfaces what matters for your business.',
    stats: 'Saves 10+ hours/week',
    link: '/features/ai-briefings',
  },
  {
    id: 'agency-intelligence',
    icon: '🏛️',
    title: 'Agency Pain Points',
    description: 'Know what agencies need before RFPs drop. 200+ agencies analyzed with budget priorities, modernization goals, and pain points.',
    stats: '200+ agencies analyzed',
    link: '/data/agencies',
  },
  {
    id: 'sblo-contacts',
    icon: '📇',
    title: 'SBLO Contact Database',
    description: 'Direct access to Small Business Liaison Officers at prime contractors. Email addresses and phone numbers for teaming outreach.',
    stats: '800+ SBLO contacts',
    link: '/data/contractors',
  },
  {
    id: 'forecasts',
    icon: '🔮',
    title: 'Forecast Intelligence',
    description: 'Track upcoming procurements before they hit SAM.gov. Aggregated from 13 agency sources for maximum coverage.',
    stats: '7,700+ forecasts',
    link: '/data/forecasts',
  },
  {
    id: 'recompetes',
    icon: '🔄',
    title: 'Expiring Contracts',
    description: 'Find contracts coming up for recompete. See incumbents, contract values, and expiration dates to plan your capture strategy.',
    stats: '5,000+ recompetes tracked',
    link: '/tools/expiring-contracts',
  },
  {
    id: 'pipeline-crm',
    icon: '📊',
    title: 'Pipeline CRM',
    description: 'Track opportunities from discovery to award. Collaborate with your team, manage gate reviews, and forecast your pipeline.',
    stats: 'Built for GovCon',
    link: '/features/pipeline-crm',
  },
  {
    id: 'contractor-database',
    icon: '🏢',
    title: 'Contractor Database',
    description: 'Research competitors and potential teaming partners. Contract history, NAICS codes, and award patterns for 3,500+ contractors.',
    stats: '3,500+ contractors',
    link: '/data/contractors',
  },
];

const comparisons = [
  { name: 'Deltek GovWin', price: '$6,000+/yr', link: '/compare/deltek' },
  { name: 'GovTribe', price: '$1,350+/yr', link: '/compare/govtribe' },
  { name: 'Federal Compass', price: 'Custom', link: '/compare/federal-compass' },
  { name: 'HigherGov', price: '$500+/yr', link: '/compare/highergov' },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'GovCon Giants Market Intelligence',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Federal contracting intelligence platform for small businesses. Find government contracts, track opportunities, and win more federal work.',
        url: `${SITE_URL}/features`,
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '0',
          highPrice: '499',
          priceCurrency: 'USD',
          offerCount: 3,
        },
        featureList: features.map(f => f.title).join(', '),
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-semibold">PLATFORM FEATURES</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">Everything You Need to</span><br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Win Federal Contracts
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Federal contract intelligence built for small businesses. Find opportunities, research agencies,
            track your pipeline, and compete with contractors 10x your size.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — No Credit Card
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              View Pricing
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">24K+</div>
              <div className="text-sm text-slate-500">Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">200+</div>
              <div className="text-sm text-slate-500">Agencies Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">7,700+</div>
              <div className="text-sm text-slate-500">Forecasts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">800+</div>
              <div className="text-sm text-slate-500">SBLO Contacts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Platform Capabilities
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Built by GovCon professionals who understand what small businesses need to compete
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.id}
                href={feature.link}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition-all group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="text-green-400 font-semibold text-sm">
                  {feature.stats}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-400">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Set Your Profile</h3>
              <p className="text-slate-400">
                Tell us your NAICS codes, target agencies, and certifications.
                We&apos;ll customize your intelligence feed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-400">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Get Daily Intelligence</h3>
              <p className="text-slate-400">
                Receive AI-curated opportunities, agency updates, and
                market intelligence delivered daily.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-400">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Win More Contracts</h3>
              <p className="text-slate-400">
                Track opportunities in your pipeline, connect with SBLOs for teaming,
                and submit more competitive bids.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            90% Less Than Enterprise Tools
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Get the intelligence you need without the enterprise price tag
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 gap-0 border-b border-slate-800">
              <div className="p-4 text-slate-400 font-medium">Platform</div>
              <div className="p-4 text-slate-400 font-medium text-center">Annual Cost</div>
              <div className="p-4"></div>
            </div>
            <div className="grid grid-cols-3 gap-0 border-b border-green-500/30 bg-green-500/5">
              <div className="p-4 text-white font-semibold">GovCon Giants MI Core</div>
              <div className="p-4 text-center">
                <span className="text-green-400 font-bold text-xl">$1,788/yr</span>
              </div>
              <div className="p-4 text-right">
                <Link href="/pricing" className="text-green-400 hover:text-green-300 font-medium">
                  View Plans →
                </Link>
              </div>
            </div>
            {comparisons.map((comp) => (
              <div key={comp.name} className="grid grid-cols-3 gap-0 border-b border-slate-800/50">
                <div className="p-4 text-slate-300">{comp.name}</div>
                <div className="p-4 text-center text-slate-400">{comp.price}</div>
                <div className="p-4 text-right">
                  <Link href={comp.link} className="text-slate-500 hover:text-white text-sm">
                    Compare →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Built for Small Business Contractors
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/for/8a-contractors" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-white mb-2">8(a) Contractors</h3>
              <p className="text-slate-400 text-sm">Find 8(a) set-asides and sole-source opportunities</p>
            </Link>
            <Link href="/for/sdvosb" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition">
              <div className="text-2xl mb-3">🎖️</div>
              <h3 className="text-lg font-bold text-white mb-2">SDVOSB</h3>
              <p className="text-slate-400 text-sm">Track VA and DoD veteran set-asides</p>
            </Link>
            <Link href="/for/hubzone" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition">
              <div className="text-2xl mb-3">📍</div>
              <h3 className="text-lg font-bold text-white mb-2">HUBZone</h3>
              <p className="text-slate-400 text-sm">Maximize your HUBZone price preference</p>
            </Link>
            <Link href="/for/wosb" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition">
              <div className="text-2xl mb-3">👩‍💼</div>
              <h3 className="text-lg font-bold text-white mb-2">WOSB/EDWOSB</h3>
              <p className="text-slate-400 text-sm">Women-owned set-aside opportunities</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Win More Federal Contracts?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start free and upgrade when you see results. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free Today
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              Compare Plans
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
