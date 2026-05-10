import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Federal Contract Opportunity Finder — AI-Powered Search & Alerts',
  description: 'Find federal contract opportunities 10x faster. AI-powered search across SAM.gov, Grants.gov, and 7,700+ forecasts. Smart alerts matched to your NAICS codes. Start free.',
  path: '/features/opportunity-finder',
  keywords: [
    'federal contract opportunity finder',
    'government contract search',
    'sam.gov search tool',
    'federal contract alerts',
    'government contract finder',
    'federal bid finder',
    'contract opportunity software',
  ],
});

const searchCapabilities = [
  {
    source: 'SAM.gov',
    icon: '🏛️',
    description: 'All active solicitations, pre-solicitations, sources sought, and awards',
    count: '150K+',
    label: 'Active opportunities',
  },
  {
    source: 'Grants.gov',
    icon: '💰',
    description: 'Federal grant opportunities from all agencies',
    count: '$700B+',
    label: 'Annual funding',
  },
  {
    source: 'Agency Forecasts',
    icon: '🔮',
    description: 'Planned procurements from Acquisition Gateway and agency portals',
    count: '7,700+',
    label: 'Forecasted opportunities',
  },
  {
    source: 'R&D Sources',
    icon: '🧪',
    description: 'NIH, NSF, DARPA, DOE Labs, SBIR/STTR opportunities',
    count: '4,500+',
    label: 'Research opportunities',
  },
];

const filterTypes = [
  { name: 'NAICS Codes', description: 'Filter by your certified codes' },
  { name: 'Set-Aside Type', description: '8(a), SDVOSB, WOSB, HUBZone, SBA' },
  { name: 'Agency', description: '200+ federal agencies' },
  { name: 'Contract Value', description: 'Minimum/maximum dollar amounts' },
  { name: 'Geography', description: 'State, region, or nationwide' },
  { name: 'Due Date', description: 'Days until close' },
  { name: 'Notice Type', description: 'RFP, RFQ, Sources Sought, Award' },
  { name: 'Keywords', description: 'AI-powered semantic search' },
];

const alertFeatures = [
  {
    title: 'Daily Match Digest',
    description: 'Wake up to opportunities matched to your NAICS codes and preferences. Ranked by fit score.',
    icon: '📬',
  },
  {
    title: 'Deadline Warnings',
    description: 'Get notified 7, 3, and 1 day before response deadlines. Never miss a due date.',
    icon: '⏰',
  },
  {
    title: 'Amendment Alerts',
    description: 'Know instantly when solicitations are modified, extended, or cancelled.',
    icon: '📝',
  },
  {
    title: 'Competitor Activity',
    description: 'See when competitors bid on opportunities you\'re tracking.',
    icon: '👀',
  },
];

const faqs = [
  {
    question: 'How is this different from searching SAM.gov directly?',
    answer: 'SAM.gov is the official source, but it\'s hard to search effectively. We pull SAM.gov data, combine it with forecasts and grants, add AI matching, and deliver only relevant opportunities to you. Save 10+ hours per week.',
  },
  {
    question: 'How often is the data updated?',
    answer: 'We sync with SAM.gov every 4 hours. Forecasts update weekly. Your daily briefing includes everything new since your last login.',
  },
  {
    question: 'Can I search by multiple NAICS codes?',
    answer: 'Yes. Set up your profile with all your NAICS codes, and we\'ll search across all of them simultaneously. No more running separate searches.',
  },
  {
    question: 'What about classified or non-public opportunities?',
    answer: 'We only index publicly available opportunities. For classified work, you\'ll need agency-specific access. However, we do capture pre-solicitation notices that help you prepare early.',
  },
  {
    question: 'How do forecasts help me win contracts?',
    answer: 'Forecasts show you what agencies plan to buy 6-18 months out. This gives you time to build relationships, position your company, and prepare capabilities before the RFP drops.',
  },
];

export default function OpportunityFinderPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'GovCon Giants Opportunity Finder',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'AI-powered federal contract opportunity search and alerts. Search SAM.gov, Grants.gov, and 7,700+ forecasts.',
        url: `${SITE_URL}/features/opportunity-finder`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier available',
        },
        featureList: [
          'SAM.gov integration',
          'Grants.gov search',
          'Agency forecast tracking',
          'AI-powered matching',
          'Daily email alerts',
          'Amendment notifications',
        ],
      }} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <span className="text-cyan-400 font-semibold">OPPORTUNITY FINDER</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Find Federal Contracts</span><br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              10x Faster Than SAM.gov
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Search <span className="text-cyan-400 font-semibold">SAM.gov + Grants.gov + 7,700 forecasts</span> in one place.
            AI matches opportunities to your profile. Alerts delivered daily.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free Search
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              View All Plans
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {searchCapabilities.map((cap) => (
              <div key={cap.source} className="text-center">
                <div className="text-2xl font-black text-cyan-400">{cap.count}</div>
                <div className="text-sm text-slate-500">{cap.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Search Every Federal Opportunity Source
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Stop running separate searches. We aggregate every public federal opportunity into one searchable database.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {searchCapabilities.map((source) => (
              <div key={source.source} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{source.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{source.source}</h3>
                    <div className="text-cyan-400 font-semibold">{source.count} {source.label}</div>
                  </div>
                </div>
                <p className="text-slate-400">{source.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Filter to Exactly What You Need
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            SAM.gov&apos;s search is frustrating. Ours has 8 filter types that actually work together.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filterTypes.map((filter) => (
              <div key={filter.name} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="text-white font-semibold mb-1">{filter.name}</div>
                <div className="text-slate-500 text-sm">{filter.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Matching */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            AI That Understands Your Business
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Set your profile once. Our AI matches every new opportunity to your capabilities, certifications, and past performance.
          </p>

          <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <div className="text-white font-semibold">Set Your Profile</div>
                      <div className="text-slate-400 text-sm">NAICS codes, certifications, contract size preferences, geographic focus</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <div className="text-white font-semibold">AI Scans Everything</div>
                      <div className="text-slate-400 text-sm">Every 4 hours, our AI checks new opportunities against your profile</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <div className="text-white font-semibold">Get Ranked Matches</div>
                      <div className="text-slate-400 text-sm">Opportunities scored 0-100% fit. Focus on high matches first.</div>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="flex-shrink-0 text-center">
                <div className="text-6xl font-black text-cyan-400 mb-2">92%</div>
                <div className="text-slate-400">Match Score</div>
                <div className="text-sm text-slate-500 mt-2">Average relevant result</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Alerts That Keep You Ahead
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Never miss an opportunity. Never get buried in irrelevant emails. Our alerts are smart.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {alertFeatures.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            SAM.gov vs GovCon Giants
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            SAM.gov is free but costs you hours. See the difference.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 text-sm border-b border-slate-800">
                  <th className="pb-4 pr-4">Feature</th>
                  <th className="pb-4 px-4 text-center">SAM.gov</th>
                  <th className="pb-4 px-4 text-center">GovCon Giants</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {[
                  { feature: 'Price', sam: 'Free', gcg: '$0 - $149/mo' },
                  { feature: 'Search all opportunity types', sam: true, gcg: true },
                  { feature: 'Grants.gov integration', sam: false, gcg: true },
                  { feature: 'Agency forecasts', sam: false, gcg: true },
                  { feature: 'AI matching', sam: false, gcg: true },
                  { feature: 'Daily digest emails', sam: false, gcg: true },
                  { feature: 'Amendment alerts', sam: false, gcg: true },
                  { feature: 'Save to pipeline', sam: false, gcg: true },
                  { feature: 'Competitor tracking', sam: false, gcg: true },
                  { feature: 'Time to find opportunities', sam: '2-3 hours/day', gcg: '15 min/day' },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-slate-800">
                    <td className="py-4 pr-4 text-slate-300">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.sam === 'boolean' ? (
                        row.sam ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>
                      ) : (
                        <span className="text-slate-400">{row.sam}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.gcg === 'boolean' ? (
                        row.gcg ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>
                      ) : (
                        <span className="text-cyan-400 font-semibold">{row.gcg}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Features */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Related Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/features/pipeline-crm" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition">
              <h3 className="text-white font-bold mb-2">Pipeline CRM</h3>
              <p className="text-slate-400 text-sm">Track opportunities from discovery to award.</p>
              <span className="text-cyan-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/features/ai-briefings" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition">
              <h3 className="text-white font-bold mb-2">AI Briefings</h3>
              <p className="text-slate-400 text-sm">Daily intelligence matched to your business.</p>
              <span className="text-cyan-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/features/recompete-tracker" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition">
              <h3 className="text-white font-bold mb-2">Recompete Tracker</h3>
              <p className="text-slate-400 text-sm">Find contracts coming up for rebid.</p>
              <span className="text-cyan-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-cyan-900/30 to-slate-900 border border-cyan-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Finding Contracts Today
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Free tier available. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free
            </Link>
            <Link
              href="/compare/sam-gov"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              Compare to SAM.gov
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
