import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'GovCon Giants vs Bloomberg Government [2026 Comparison] — BD Focus, 98% Lower Cost',
  description: 'Compare Mindy to Bloomberg Government. Get federal contract intelligence, opportunity alerts, and agency pain points for small businesses. No $10K/year subscription.',
  path: '/compare/bloomberg-government',
  keywords: [
    'bloomberg government alternative',
    'bgov alternative',
    'bloomberg government competitor',
    'cheaper than bgov',
    'bloomberg government pricing',
    'small business alternative to bgov',
    'federal contract intelligence',
    'government contracting tools',
  ],
});

const comparisonData = [
  {
    feature: 'Federal Opportunity Alerts',
    giants: { value: '✓', detail: 'Daily AI-matched alerts' },
    bgov: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'SAM.gov Integration',
    giants: { value: '✓', detail: 'Real-time sync' },
    bgov: { value: '✓', detail: 'Real-time sync' },
  },
  {
    feature: 'Grants.gov Coverage',
    giants: { value: '✓', detail: 'Full search' },
    bgov: { value: '✓', detail: 'Full search' },
  },
  {
    feature: 'Agency Pain Points',
    giants: { value: '✓', detail: '200+ agencies analyzed' },
    bgov: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'SBLO Contact Database',
    giants: { value: '✓', detail: '800+ contacts' },
    bgov: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Expiring Contracts',
    giants: { value: '✓', detail: '5,000+ recompetes' },
    bgov: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Contractor Database',
    giants: { value: '✓', detail: '3,500+ contractors' },
    bgov: { value: '✓', detail: 'Extensive' },
  },
  {
    feature: 'Pipeline CRM',
    giants: { value: '✓', detail: 'Built-in tracking' },
    bgov: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Forecast Intelligence',
    giants: { value: '✓', detail: '7,700+ forecasts' },
    bgov: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'AI-Powered Briefings',
    giants: { value: '✓', detail: 'Daily/weekly summaries' },
    bgov: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Business Development Focus',
    giants: { value: '✓', detail: 'Built for BD/Capture' },
    bgov: { value: 'Partial', detail: 'Policy/legislative focus' },
  },
  {
    feature: 'Policy & Legislative Tracking',
    giants: { value: 'Limited', detail: 'Not primary focus' },
    bgov: { value: '✓', detail: 'Extensive coverage' },
  },
  {
    feature: 'Small Business Focus',
    giants: { value: '✓', detail: 'Built for SBs' },
    bgov: { value: 'Limited', detail: 'Enterprise focus' },
  },
  {
    feature: 'Free Tier',
    giants: { value: '✓', detail: 'Mindy Free forever' },
    bgov: { value: '✗', detail: 'No free option' },
  },
  {
    feature: 'Monthly Pricing',
    giants: { value: '$149/mo', detail: 'Mindy Pro' },
    bgov: { value: '$625-$1,167/mo', detail: 'Annual subscription' },
  },
  {
    feature: 'Contract Length',
    giants: { value: 'Month-to-month', detail: 'Cancel anytime' },
    bgov: { value: '12-month minimum', detail: 'Annual contract' },
  },
];

const testimonials = [
  {
    quote: "Bloomberg Government is amazing for policy tracking, but we needed BD tools. GovCon Giants gave us everything we needed for contract pursuit at a fraction of the price.",
    author: "Director of Capture, Professional Services Firm",
  },
  {
    quote: "BGOV was costing us $10K/year and we were only using 20% of it. Mindy Pro has the exact features we need for $1,800/year.",
    author: "Owner, 8(a) IT Services Company",
  },
  {
    quote: "The SBLO contacts and agency pain points alone are worth more than what we pay. BGOV didn't have anything like this.",
    author: "BD Manager, Small Defense Contractor",
  },
];

export default function BloombergGovernmentComparisonPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants vs Bloomberg Government Comparison',
        description: 'Feature and pricing comparison between Mindy and Bloomberg Government for federal contract research.',
        url: `${SITE_URL}/compare/bloomberg-government`,
        mainEntity: {
          '@type': 'Product',
          name: 'Mindy',
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

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is GovCon Giants a good alternative to Bloomberg Government for BD?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, if your primary focus is business development and contract pursuit. Bloomberg Government excels at policy and legislative tracking, while GovCon Giants is purpose-built for BD teams who need opportunity alerts, forecasts, agency intelligence, and SBLO contacts at an affordable price.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does Bloomberg Government offer that GovCon Giants doesn\'t?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bloomberg Government offers extensive policy tracking, legislative analysis, congressional documents, and regulatory monitoring. If your role requires deep policy intelligence, BGOV is the better choice. If you\'re focused on winning contracts, GovCon Giants provides better value.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much cheaper is GovCon Giants than Bloomberg Government?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Significantly cheaper. Bloomberg Government costs $7,500-$14,000/year. GovCon Giants Mindy Pro is $149/month ($1,788/year), saving you $5,700-$12,200 annually. Mindy Free is available at $0 forever.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I use both Bloomberg Government and GovCon Giants together?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, many organizations use Bloomberg Government for policy intelligence and GovCon Giants for BD/capture activities. The tools complement each other, with minimal feature overlap.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does GovCon Giants have the same data sources as Bloomberg Government?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For contract data, yes. We both pull from SAM.gov, USASpending, and agency forecasts. Bloomberg Government adds extensive policy databases and congressional documents. GovCon Giants adds proprietary agency pain points data and SBLO contacts not available in BGOV.',
            },
          },
        ],
      }} />

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-400 font-semibold">VS COMPARISON</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">GovCon Giants vs</span><br />
            <span className="text-red-500">Bloomberg Government</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            <span className="text-green-400 font-semibold">BD-focused intelligence</span> at{' '}
            <span className="text-green-400 font-semibold">98% lower cost</span>.
            Built for small businesses who need contract opportunities, not policy analysis.
          </p>

          {/* Price Comparison Banner */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="text-sm text-green-400 font-medium mb-1">GovCon Giants Mindy Pro</div>
              <div className="text-4xl font-black text-white">$149<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-sm text-slate-400">Month-to-month, cancel anytime</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <div className="text-sm text-red-400 font-medium mb-1">Bloomberg Government</div>
              <div className="text-4xl font-black text-white">$625<span className="text-lg text-slate-400">+/mo</span></div>
              <div className="text-sm text-slate-400">$7,500-$14,000/year subscription</div>
            </div>
          </div>

          <Link
            href="/mi-free"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
          >
            Try Free — No Credit Card
          </Link>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-12 px-6 bg-slate-900/50">
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
                      <span className="text-slate-300 font-bold">Bloomberg Gov</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center bg-green-500/5">
                      <div className={`font-semibold ${row.giants.value === '✓' ? 'text-green-400' : row.giants.value.includes('$') ? 'text-green-400' : 'text-slate-400'}`}>
                        {row.giants.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.giants.detail}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`font-semibold ${row.bgov.value === '✓' ? 'text-slate-300' : row.bgov.value === '✗' ? 'text-red-400' : 'text-slate-400'}`}>
                        {row.bgov.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.bgov.detail}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Small Businesses Choose Us */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Why BD Teams Choose GovCon Giants Over BGOV
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Bloomberg Government is built for policy professionals. We built Mindy for BD and capture teams.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">BD-Focused Features</h3>
              <p className="text-slate-400">
                BGOV excels at policy. We excel at BD. SBLO contacts, agency pain points, pipeline CRM, and AI briefings built for contract pursuit.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">Save $5,700-$12,200/Year</h3>
              <p className="text-slate-400">
                Mindy Pro at $1,788/yr vs BGOV at $7,500-$14,000/yr. That&apos;s serious money you can invest in proposal development.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">Built for Small Business</h3>
              <p className="text-slate-400">
                Set-aside filters, small business officers database, and pricing designed for companies under $50M — not Fortune 500 primes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What BD Teams Say
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

      {/* What You Get */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What&apos;s Included in Mindy Pro ($149/mo)
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Unlimited daily opportunity alerts',
              'AI-powered daily briefings',
              '200+ agency pain points',
              '800+ SBLO contacts with email/phone',
              '7,700+ forecast opportunities',
              '5,000+ expiring contracts',
              '3,500+ contractor database',
              'Pipeline CRM to track opportunities',
              'Federal Market Assassin research tool',
              'Content Reaper proposal tool',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 p-4 bg-slate-900 rounded-lg">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Start free, upgrade when you&apos;re ready. No sales calls required.
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
                  <span className="text-green-500">✓</span> Full SBLO contact info
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-500">✓</span> Pipeline CRM
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-500">✓</span> All premium tools
                </li>
              </ul>
              <Link
                href="https://getmindy.ai/market-intelligence"
                className="block w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold text-center transition"
              >
                Get Mindy Pro
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
                href="https://getmindy.ai/market-intelligence"
                className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-center transition"
              >
                Get Mindy Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Is GovCon Giants a good alternative to Bloomberg Government for BD?</h3>
              <p className="text-slate-400">
                Yes, if your primary focus is business development and contract pursuit. Bloomberg Government excels at policy and legislative tracking, while GovCon Giants is purpose-built for BD teams who need opportunity alerts, forecasts, agency intelligence, and SBLO contacts at an affordable price.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">What does Bloomberg Government offer that GovCon Giants doesn&apos;t?</h3>
              <p className="text-slate-400">
                Bloomberg Government offers extensive policy tracking, legislative analysis, congressional documents, and regulatory monitoring. If your role requires deep policy intelligence, BGOV is the better choice. If you&apos;re focused on winning contracts, GovCon Giants provides better value.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">How much cheaper is GovCon Giants than Bloomberg Government?</h3>
              <p className="text-slate-400">
                Significantly cheaper. Bloomberg Government costs $7,500-$14,000/year. GovCon Giants Mindy Pro is $149/month ($1,788/year), saving you $5,700-$12,200 annually. Mindy Free is available at $0 forever.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Can I use both Bloomberg Government and GovCon Giants together?</h3>
              <p className="text-slate-400">
                Yes, many organizations use Bloomberg Government for policy intelligence and GovCon Giants for BD/capture activities. The tools complement each other, with minimal feature overlap.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Does GovCon Giants have the same data sources as Bloomberg Government?</h3>
              <p className="text-slate-400">
                For contract data, yes. We both pull from SAM.gov, USASpending, and agency forecasts. Bloomberg Government adds extensive policy databases and congressional documents. GovCon Giants adds proprietary agency pain points data and SBLO contacts not available in BGOV.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Comparisons */}
      <section className="py-8 px-6 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Other Comparisons</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/compare/deltek" className="text-sm text-slate-400 hover:text-white transition">
              vs Deltek GovWin →
            </Link>
            <Link href="/compare/govtribe" className="text-sm text-slate-400 hover:text-white transition">
              vs GovTribe →
            </Link>
            <Link href="/compare/federal-compass" className="text-sm text-slate-400 hover:text-white transition">
              vs Federal Compass →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready for BD-Focused Intelligence at Small Business Pricing?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of small businesses who chose purpose-built contract intelligence over expensive policy platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — No Credit Card
            </Link>
            <Link
              href="https://getmindy.ai/market-intelligence"
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
