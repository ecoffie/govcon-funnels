import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Best Government Contracting Software [2026] — Top 12 Tools Compared',
  description: 'Compare the best government contracting software for small businesses. We reviewed GovWin, GovTribe, Federal Compass, and 9 more tools. See pricing, features, and who each is best for.',
  path: '/best-government-contracting-software',
  keywords: [
    'best government contracting software',
    'government contracting software',
    'federal contract software',
    'govcon software',
    'government contract finder software',
    'federal contracting tools',
    'govwin alternative',
    'govtribe alternative',
  ],
});

interface Tool {
  rank: number;
  name: string;
  logo?: string;
  bestFor: string;
  pricing: string;
  pricingNote?: string;
  score: number;
  pros: string[];
  cons: string[];
  url: string;
  compareLink?: string;
  featured?: boolean;
}

const tools: Tool[] = [
  {
    rank: 1,
    name: 'GovCon Giants',
    bestFor: 'Small businesses on a budget',
    pricing: '$0 - $499/mo',
    pricingNote: 'Unlimited seats included',
    score: 9.2,
    pros: [
      '90% cheaper than enterprise tools',
      'AI-powered daily briefings',
      '800+ SBLO contacts with emails',
      '7,700+ forecast opportunities',
      'No per-user pricing',
    ],
    cons: [
      'Newer platform (launched 2024)',
      'Less historical data than GovWin',
      'API access coming soon',
    ],
    url: '/pricing',
    featured: true,
  },
  {
    rank: 2,
    name: 'GovWin IQ (Deltek)',
    bestFor: 'Large contractors with big budgets',
    pricing: '$12,000 - $119,000/yr',
    pricingNote: 'Per user pricing',
    score: 8.8,
    pros: [
      '150+ dedicated research analysts',
      'Deepest pre-RFP intelligence',
      '30+ years of historical data',
      'Comprehensive pipeline tracking',
    ],
    cons: [
      'Extremely expensive for small business',
      'Steep learning curve',
      'Per-user pricing adds up fast',
      'Contract required',
    ],
    url: 'https://www.deltek.com/en/products/government-contracting/govwin-iq',
    compareLink: '/compare/deltek',
  },
  {
    rank: 3,
    name: 'GovTribe',
    bestFor: 'SAM.gov power users',
    pricing: '$1,350 - $5,500/yr',
    pricingNote: 'Per user pricing',
    score: 8.2,
    pros: [
      'Excellent SAM.gov visualization',
      'Transparent pricing',
      'Good email alerts',
      'Solid FPDS/USASpending data',
    ],
    cons: [
      'Limited pre-RFP intelligence',
      'Per-user pricing',
      'No SBLO contacts',
      'SLED data limited',
    ],
    url: 'https://govtribe.com',
    compareLink: '/compare/govtribe',
  },
  {
    rank: 4,
    name: 'Federal Compass',
    bestFor: 'Capture management teams',
    pricing: '$0 - $15,000/user/yr',
    pricingNote: 'Custom enterprise pricing',
    score: 8.0,
    pros: [
      'Free tier available',
      'Strong competitive intelligence',
      'Good capture management features',
      'Solid data visualization',
    ],
    cons: [
      'Complex pricing tiers',
      'Per-user enterprise pricing',
      'Limited small business focus',
      'Steep learning curve',
    ],
    url: 'https://federalcompass.com',
    compareLink: '/compare/federal-compass',
  },
  {
    rank: 5,
    name: 'HigherGov',
    bestFor: 'Data-driven research',
    pricing: '$500 - $2,500/yr',
    pricingNote: 'Per user pricing',
    score: 7.8,
    pros: [
      'Excellent data pages for SEO',
      'Affordable entry tier',
      'Good CRM features',
      'Solid award tracking',
    ],
    cons: [
      'Limited pre-RFP intel',
      'No SBLO database',
      'Analysis tools basic',
      'Per-user pricing',
    ],
    url: 'https://highergov.com',
    compareLink: '/compare/highergov',
  },
  {
    rank: 6,
    name: 'EZGovOpps',
    bestFor: 'IDIQ and program tracking',
    pricing: '$2,700 - $6,000/yr',
    pricingNote: 'Per user pricing',
    score: 7.5,
    pros: [
      'Strong IDIQ/vehicle tracking',
      'Good file cabinet feature',
      'Program intelligence',
      'Veteran-owned business',
    ],
    cons: [
      'Dated user interface',
      'Limited modern features',
      'Higher price for features',
      'Per-user pricing',
    ],
    url: 'https://ezgovopps.com',
    compareLink: '/compare/ezgovopps',
  },
  {
    rank: 7,
    name: 'Bloomberg Government',
    bestFor: 'Policy and legislative tracking',
    pricing: '$7,500 - $14,000/yr',
    pricingNote: 'Per user pricing',
    score: 7.3,
    pros: [
      'Excellent policy intelligence',
      'Legislative tracking',
      'Regulatory analysis',
      'News and analysis',
    ],
    cons: [
      'Not BD-focused',
      'Expensive for small business',
      'Limited opportunity search',
      'Overkill for most contractors',
    ],
    url: 'https://about.bgov.com',
  },
  {
    rank: 8,
    name: 'Sweetspot',
    bestFor: 'AI proposal assistance',
    pricing: 'Custom',
    pricingNote: 'Contact for pricing',
    score: 7.0,
    pros: [
      'AI-powered proposal help',
      'Y Combinator backed',
      'Modern interface',
      'Quick opportunity search',
    ],
    cons: [
      'No public pricing',
      'Limited track record',
      'Less data than established tools',
      'Focus on proposals over BD',
    ],
    url: 'https://sweetspot.io',
    compareLink: '/compare/sweetspot',
  },
  {
    rank: 9,
    name: 'GovDash',
    bestFor: 'Enterprise BD enablement',
    pricing: 'Custom',
    pricingNote: 'Enterprise contracts only',
    score: 6.8,
    pros: [
      'AI-powered BD platform',
      'Proposal automation',
      'Claims 50% faster proposals',
      'Modern technology',
    ],
    cons: [
      'No public pricing',
      'Enterprise-focused',
      'Not for small businesses',
      'Limited information available',
    ],
    url: 'https://govdash.com',
    compareLink: '/compare/govdash',
  },
  {
    rank: 10,
    name: 'FedScout',
    bestFor: 'Budget-conscious beginners',
    pricing: 'Free - $99/mo',
    pricingNote: 'Limited free tier',
    score: 6.5,
    pros: [
      'Free tier available',
      'Win probability scoring',
      'Simple interface',
      'Affordable paid tier',
    ],
    cons: [
      'Limited data depth',
      'Basic features',
      'No pipeline CRM',
      'Limited agency intel',
    ],
    url: 'https://fedscout.com',
  },
  {
    rank: 11,
    name: 'SAM.gov',
    bestFor: 'Free official source',
    pricing: 'Free',
    pricingNote: 'Government operated',
    score: 6.0,
    pros: [
      'Free and official',
      'Complete opportunity data',
      'Entity registration',
      'Always available',
    ],
    cons: [
      'No analysis or intelligence',
      'Clunky interface',
      'No alerts or CRM',
      'No competitive intel',
    ],
    url: 'https://sam.gov',
    compareLink: '/compare/sam-gov',
  },
  {
    rank: 12,
    name: 'Fed-Spend',
    bestFor: 'AI-focused newcomer',
    pricing: '$49 - $199/mo',
    pricingNote: 'Monthly billing',
    score: 5.8,
    pros: [
      'AI-powered search',
      'Affordable pricing',
      'Modern interface',
      'Quick setup',
    ],
    cons: [
      'Newer platform',
      'Less historical data',
      'Limited integrations',
      'Smaller user base',
    ],
    url: 'https://fed-spend.com',
  },
];

export default function BestGovConSoftwarePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Best Government Contracting Software 2026',
        description: 'Comprehensive comparison of the best government contracting software for small businesses',
        url: `${SITE_URL}/best-government-contracting-software`,
        numberOfItems: tools.length,
        itemListElement: tools.map((tool) => ({
          '@type': 'ListItem',
          position: tool.rank,
          name: tool.name,
          url: tool.url.startsWith('http') ? tool.url : `${SITE_URL}${tool.url}`,
        })),
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-semibold text-sm">UPDATED MAY 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">
            Best Government Contracting Software for Small Business [2026]
          </h1>

          <p className="text-xl text-slate-400 mb-8">
            We reviewed 12 government contracting platforms to help you find the right tool for your business.
            Pricing, features, and honest assessments — including who each tool is best for.
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
            <p className="text-slate-300 text-sm">
              <strong className="text-white">How we ranked:</strong> We evaluated each platform on pricing transparency,
              small business focus, feature depth, ease of use, and value for money. Our team has hands-on experience
              with each tool through demos, trials, and real-world usage.
            </p>
          </div>

          {/* Quick Jump */}
          <div className="flex flex-wrap gap-2">
            {tools.slice(0, 6).map((tool) => (
              <a
                key={tool.name}
                href={`#${tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition"
              >
                {tool.rank}. {tool.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/50">
                  <th className="text-left p-4 text-slate-300 font-semibold">#</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Platform</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Best For</th>
                  <th className="text-left p-4 text-slate-300 font-semibold">Pricing</th>
                  <th className="text-center p-4 text-slate-300 font-semibold">Score</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr
                    key={tool.name}
                    className={`border-b border-slate-800 hover:bg-slate-800/50 transition ${
                      tool.featured ? 'bg-green-900/10' : ''
                    }`}
                  >
                    <td className="p-4 text-slate-400 font-medium">{tool.rank}</td>
                    <td className="p-4">
                      <a
                        href={`#${tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                        className={`font-semibold hover:underline ${tool.featured ? 'text-green-400' : 'text-white'}`}
                      >
                        {tool.name}
                        {tool.featured && (
                          <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded">OUR PICK</span>
                        )}
                      </a>
                    </td>
                    <td className="p-4 text-slate-400 text-sm">{tool.bestFor}</td>
                    <td className="p-4 text-slate-300 text-sm">{tool.pricing}</td>
                    <td className="p-4 text-center">
                      <span className={`font-bold ${tool.score >= 8 ? 'text-green-400' : tool.score >= 7 ? 'text-yellow-400' : 'text-slate-400'}`}>
                        {tool.score}/10
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Reviews */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Detailed Reviews</h2>

          <div className="space-y-12">
            {tools.map((tool) => (
              <div
                key={tool.name}
                id={tool.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}
                className={`rounded-2xl p-8 scroll-mt-24 ${
                  tool.featured
                    ? 'bg-gradient-to-br from-green-900/30 to-slate-900 border-2 border-green-500/50'
                    : 'bg-slate-900 border border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl font-black text-slate-600">#{tool.rank}</span>
                      <h3 className="text-2xl font-bold text-white">{tool.name}</h3>
                      {tool.featured && (
                        <span className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
                          EDITOR&apos;S CHOICE
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400">{tool.bestFor}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-black ${tool.score >= 8 ? 'text-green-400' : tool.score >= 7 ? 'text-yellow-400' : 'text-slate-400'}`}>
                      {tool.score}/10
                    </div>
                    <div className="text-slate-500 text-sm">Our Score</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-800/50 rounded-xl p-5">
                    <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Pros
                    </h4>
                    <ul className="space-y-2">
                      {tool.pros.map((pro) => (
                        <li key={pro} className="text-slate-300 text-sm flex items-start gap-2">
                          <span className="text-green-500 mt-1">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-5">
                    <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cons
                    </h4>
                    <ul className="space-y-2">
                      {tool.cons.map((con) => (
                        <li key={con} className="text-slate-300 text-sm flex items-start gap-2">
                          <span className="text-red-500 mt-1">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-700">
                  <div>
                    <span className="text-white font-semibold">{tool.pricing}</span>
                    {tool.pricingNote && (
                      <span className="text-slate-500 text-sm ml-2">({tool.pricingNote})</span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    {tool.compareLink && (
                      <Link
                        href={tool.compareLink}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition"
                      >
                        Full Comparison
                      </Link>
                    )}
                    <a
                      href={tool.url}
                      target={tool.url.startsWith('http') ? '_blank' : undefined}
                      rel={tool.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        tool.featured
                          ? 'bg-green-600 hover:bg-green-500 text-white'
                          : 'bg-slate-700 hover:bg-slate-600 text-white'
                      }`}
                    >
                      {tool.featured ? 'Try Free' : 'Visit Site'} →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Guide */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">How to Choose Government Contracting Software</h2>

          <div className="space-y-8 text-slate-300">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">1. Know Your Budget</h3>
              <p>
                Government contracting software ranges from free (SAM.gov) to $119,000/year (GovWin enterprise).
                For most small businesses, spending $1,500-$5,000/year gets you excellent capability.
                Avoid tools that charge per-user if you have a team — costs add up fast.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">2. Prioritize What Matters</h3>
              <p>
                Different tools excel at different things. If you need deep pre-RFP intelligence and have budget,
                GovWin is hard to beat. If you want affordable daily intelligence with SBLO contacts for teaming,
                GovCon Giants delivers more value per dollar. Know what features actually drive your wins.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">3. Consider Your Stage</h3>
              <p>
                <strong>New to GovCon?</strong> Start with free tools (SAM.gov, FedScout, GovCon Giants Free) to learn the landscape.
                <strong> Growing?</strong> Invest in a tool with alerts, pipeline tracking, and agency intelligence.
                <strong> Scaling?</strong> Look for team features, CRM integration, and dedicated support.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">4. Test Before You Buy</h3>
              <p>
                Every tool on this list offers either a free tier or free trial. Don&apos;t sign an annual contract
                without testing the platform with your actual NAICS codes and target agencies. The best tool
                for you depends on your specific market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Tool?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start with GovCon Giants for free and see how we compare. No credit card required.
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
              Compare Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
