import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'GovCon Giants vs Federal Compass [2026 Comparison] — More Intelligence, Less Cost',
  description: 'Compare GovCon Giants Market Intelligence to Federal Compass. Get AI-powered briefings, SBLO contacts, and agency pain points. Free tier available, no per-user pricing.',
  path: '/compare/federal-compass',
  keywords: [
    'federal compass alternative',
    'federal compass competitor',
    'federal compass vs',
    'federal compass pricing',
    'government contracting intelligence',
    'federal compass comparison',
    'market intelligence software',
    'federal compass review',
  ],
});

const comparisonData = [
  {
    feature: 'Federal Opportunity Search',
    giants: { value: '✓', detail: 'SAM.gov + Grants.gov' },
    compass: { value: '✓', detail: 'Multi-source aggregation' },
  },
  {
    feature: 'Pipeline Management',
    giants: { value: '✓', detail: 'Built-in CRM' },
    compass: { value: '✓', detail: 'Pipeline tools' },
  },
  {
    feature: 'Competitive Analysis',
    giants: { value: '✓', detail: 'Contractor profiles' },
    compass: { value: '✓', detail: 'Penetration analysis' },
  },
  {
    feature: 'AI-Powered Briefings',
    giants: { value: '✓', detail: 'Daily/weekly summaries' },
    compass: { value: 'Limited', detail: 'ML-based insights' },
  },
  {
    feature: 'Agency Pain Points',
    giants: { value: '✓', detail: '200+ agencies analyzed' },
    compass: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'SBLO Contact Database',
    giants: { value: '✓', detail: '800+ with email/phone' },
    compass: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Expiring Contracts',
    giants: { value: '✓', detail: '5,000+ recompetes' },
    compass: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Forecast Intelligence',
    giants: { value: '✓', detail: '7,700+ forecasts' },
    compass: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'API Access',
    giants: { value: 'Coming', detail: 'Q3 2026' },
    compass: { value: '✓', detail: '$5K-$15K/yr extra' },
  },
  {
    feature: 'Free Tier',
    giants: { value: '✓', detail: 'MI Free forever' },
    compass: { value: '✓', detail: '3 users, basic features' },
  },
  {
    feature: 'Pricing Model',
    giants: { value: 'Flat rate', detail: '$149/mo all features' },
    compass: { value: 'Per-user', detail: '$8-$24/user/mo' },
  },
  {
    feature: '5-User Team Cost',
    giants: { value: '$499/mo', detail: 'MI Team plan' },
    compass: { value: '$120-$600/mo', detail: 'Depends on tier' },
  },
  {
    feature: 'Contract Length',
    giants: { value: 'Month-to-month', detail: 'Cancel anytime' },
    compass: { value: 'Annual', detail: 'Billed yearly' },
  },
];

const testimonials = [
  {
    quote: "Federal Compass is great for data, but it doesn't tell me what agencies actually need. The pain points database changed how we position.",
    author: "BD Director, SDVOSB Technology Firm",
  },
  {
    quote: "We tried Federal Compass but the per-user pricing killed us. With 8 people needing access, GovCon Giants saves us thousands.",
    author: "CEO, 8(a) Professional Services",
  },
  {
    quote: "The AI briefings surface opportunities I would have missed. Federal Compass gave me data; this gives me action items.",
    author: "Capture Manager, Small Defense Contractor",
  },
];

export default function FederalCompassComparisonPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants vs Federal Compass Comparison',
        description: 'Feature and pricing comparison between GovCon Giants Market Intelligence and Federal Compass for federal contract research.',
        url: `${SITE_URL}/compare/federal-compass`,
        mainEntity: {
          '@type': 'Product',
          name: 'GovCon Giants Market Intelligence',
          description: 'Federal contracting intelligence platform for small businesses',
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: '0',
            highPrice: '499',
            priceCurrency: 'USD',
            offerCount: 3,
          },
        },
      }} />

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
            <span className="text-purple-400 font-semibold">VS COMPARISON</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">GovCon Giants vs</span><br />
            <span className="text-purple-500">Federal Compass</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Federal Compass has great data. We have that <em>plus</em>{' '}
            <span className="text-green-400 font-semibold">AI briefings</span>,{' '}
            <span className="text-green-400 font-semibold">agency pain points</span>, and{' '}
            <span className="text-green-400 font-semibold">SBLO contacts</span> — without per-user pricing.
          </p>

          {/* Price Comparison Banner */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="text-sm text-green-400 font-medium mb-1">GovCon Giants MI Core</div>
              <div className="text-4xl font-black text-white">$149<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-sm text-slate-400">Flat rate • All features • All users</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
              <div className="text-sm text-purple-400 font-medium mb-1">Federal Compass Premium</div>
              <div className="text-4xl font-black text-white">$24<span className="text-lg text-slate-400">/user/mo</span></div>
              <div className="text-sm text-slate-400">5 users = $120/mo + API fees</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Try Free — No Credit Card
            </Link>
            <Link
              href="#comparison"
              className="inline-block px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              See Full Comparison
            </Link>
          </div>
        </div>
      </section>

      {/* What We Have That Federal Compass Doesn't */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            What We Have That Federal Compass Doesn&apos;t
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Federal Compass excels at data aggregation. We add the intelligence layer that turns data into action.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered Briefings</h3>
              <p className="text-slate-400">
                Daily briefings analyze your pipeline, recommend go/no-go decisions, and surface opportunities you&apos;d miss.
                Not just data — actionable intelligence.
              </p>
            </div>
            <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Agency Pain Points</h3>
              <p className="text-slate-400">
                200+ agencies with analyzed challenges, GAO findings, and budget priorities.
                Know what they&apos;re struggling with before you write the proposal.
              </p>
            </div>
            <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-white mb-2">SBLO Contacts</h3>
              <p className="text-slate-400">
                800+ Small Business Liaison Officers with direct email and phone.
                Federal Compass doesn&apos;t have this data at any price tier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Per-User vs Flat Rate */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            The Hidden Cost of Per-User Pricing
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Federal Compass charges per user. As your team grows, costs multiply. We don&apos;t.
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-4 text-slate-400 font-medium">Team Size</th>
                  <th className="text-center py-4 text-green-400 font-bold">GovCon Giants</th>
                  <th className="text-center py-4 text-purple-400 font-bold">Federal Compass Premium</th>
                  <th className="text-center py-4 text-slate-400 font-medium">You Save</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800/50">
                  <td className="py-4 text-slate-300">1 user</td>
                  <td className="py-4 text-center text-green-400 font-semibold">$149/mo</td>
                  <td className="py-4 text-center text-slate-300">$24/mo</td>
                  <td className="py-4 text-center text-red-400">-$125</td>
                </tr>
                <tr className="border-b border-slate-800/50">
                  <td className="py-4 text-slate-300">3 users</td>
                  <td className="py-4 text-center text-green-400 font-semibold">$149/mo</td>
                  <td className="py-4 text-center text-slate-300">$72/mo</td>
                  <td className="py-4 text-center text-red-400">-$77</td>
                </tr>
                <tr className="border-b border-slate-800/50 bg-green-500/5">
                  <td className="py-4 text-white font-semibold">5 users</td>
                  <td className="py-4 text-center text-green-400 font-bold">$499/mo (Team)</td>
                  <td className="py-4 text-center text-slate-300">$120/mo</td>
                  <td className="py-4 text-center text-red-400">-$379</td>
                </tr>
                <tr className="border-b border-slate-800/50">
                  <td className="py-4 text-slate-300">10 users</td>
                  <td className="py-4 text-center text-green-400 font-semibold">$499/mo</td>
                  <td className="py-4 text-center text-slate-300">$240/mo</td>
                  <td className="py-4 text-center text-red-400">-$259</td>
                </tr>
                <tr>
                  <td className="py-4 text-slate-300">20 users</td>
                  <td className="py-4 text-center text-green-400 font-semibold">$499/mo</td>
                  <td className="py-4 text-center text-slate-300">$480/mo</td>
                  <td className="py-4 text-center text-green-400 font-bold">+$19/mo</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-slate-500 mt-4 text-center">
              * Federal Compass Premium at $24/user/mo. Does not include API fees ($5K-$15K/yr) or annual price increases.
            </p>
          </div>

          <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-2">💡 The Real Comparison</h3>
            <p className="text-slate-400">
              Federal Compass looks cheaper for small teams, but you&apos;re not getting agency pain points, SBLO contacts, or AI briefings.
              When you factor in the intelligence gap, GovCon Giants delivers more value per dollar spent.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section id="comparison" className="py-12 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Feature-by-Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 bg-green-500/5 rounded-t-lg">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-green-400 font-bold">GovCon Giants</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-purple-300 font-bold">Federal Compass</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center bg-green-500/5">
                      <div className={`font-semibold ${row.giants.value === '✓' ? 'text-green-400' : row.giants.value.includes('$') ? 'text-green-400' : row.giants.value === '✗' ? 'text-red-400' : 'text-amber-400'}`}>
                        {row.giants.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.giants.detail}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`font-semibold ${row.compass.value === '✓' ? 'text-slate-300' : row.compass.value === '✗' ? 'text-red-400' : 'text-amber-400'}`}>
                        {row.compass.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.compass.detail}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Federal Compass Strengths */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            When Federal Compass Makes Sense
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            We believe in honest comparisons. Here&apos;s where Federal Compass excels.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">🔌</div>
              <h3 className="text-xl font-bold text-white mb-2">API Access</h3>
              <p className="text-slate-400">
                Federal Compass has a mature API for custom integrations. If you need to pipe data into internal systems, they&apos;re ahead here.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-white mb-2">Solo Users</h3>
              <p className="text-slate-400">
                At $8-24/user/month, a single user saves money vs our $149 flat rate — if you don&apos;t need the intelligence features we add.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-2">Market Penetration Analysis</h3>
              <p className="text-slate-400">
                Their penetration analysis tools help identify market expansion opportunities. Strong for strategic planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Contractors Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <blockquote className="text-slate-300 mb-4">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="text-sm text-slate-500">— {t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 text-center mb-12">
            No per-user fees. No API surcharges. No surprises.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="text-green-400 font-semibold mb-2">MI FREE</div>
              <div className="text-4xl font-black text-white mb-1">$0</div>
              <div className="text-slate-500 mb-6">Forever free</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> 5 opportunity alerts/month
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> Agency pain points (preview)
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> CAGE code lookup
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> Expiring contracts search
                </li>
              </ul>
              <Link
                href="/mi-free"
                className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-center transition"
              >
                Start Free
              </Link>
            </div>

            {/* Core Tier */}
            <div className="bg-slate-900 border-2 border-green-500 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <div className="text-green-400 font-semibold mb-2">MI CORE</div>
              <div className="text-4xl font-black text-white mb-1">$149<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-slate-500 mb-6">Cancel anytime</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-500">✓</span> Unlimited opportunity alerts
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-500">✓</span> AI-powered briefings
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-500">✓</span> Full SBLO contacts
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-500">✓</span> Agency pain points
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-500">✓</span> Pipeline CRM
                </li>
              </ul>
              <Link
                href="https://mi.govcongiants.com/market-intelligence"
                className="block w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold text-center transition"
              >
                Get MI Core
              </Link>
            </div>

            {/* Team Tier */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="text-blue-400 font-semibold mb-2">MI TEAM</div>
              <div className="text-4xl font-black text-white mb-1">$499<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-slate-500 mb-6">Up to 5 users</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> Everything in Core
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> 5 team member seats
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> Team pipeline sharing
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span className="text-green-500">✓</span> Priority support
                </li>
              </ul>
              <Link
                href="https://mi.govcongiants.com/market-intelligence"
                className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-center transition"
              >
                Get MI Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Is Federal Compass really cheaper?</h3>
              <p className="text-slate-400">
                For solo users, yes — $24/mo vs $149/mo. But for teams of 5+, our flat pricing wins.
                Plus, Federal Compass doesn&apos;t include agency pain points or SBLO contacts at any tier.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Do you have the same data sources?</h3>
              <p className="text-slate-400">
                Both platforms pull from SAM.gov, USASpending, and similar public sources.
                The difference is in the analysis layer — our AI briefings and agency intelligence aren&apos;t just aggregated data.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">What about the API?</h3>
              <p className="text-slate-400">
                Federal Compass has a mature API (at extra cost). We&apos;re building ours for Q3 2026.
                If you need API access today, Federal Compass is the better choice for that specific use case.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Can I try before committing?</h3>
              <p className="text-slate-400">
                Yes — MI Free is free forever, no credit card required.
                Federal Compass also has a free tier (3 users, basic features).
                Try both and decide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Comparisons */}
      <section className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Other Comparisons</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/compare/deltek" className="text-sm text-slate-400 hover:text-white transition">
              vs Deltek GovWin →
            </Link>
            <Link href="/compare/govtribe" className="text-sm text-slate-400 hover:text-white transition">
              vs GovTribe →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for Intelligence, Not Just Data?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start free. See the difference AI-powered briefings and agency pain points make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — No Credit Card
            </Link>
            <Link
              href="https://mi.govcongiants.com/market-intelligence"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              See Full Features
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
