import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'GovCon Giants vs Fed-Spend [2026 Comparison] — More Comprehensive Intelligence',
  description: 'Compare GovCon Giants Market Intelligence to Fed-Spend. Get agency pain points, 800+ SBLO contacts, 7,700+ forecasts, contractor database, and AI briefings. More data than Fed-Spend Pro.',
  path: '/compare/fed-spend',
  keywords: [
    'fed-spend alternative',
    'fed spend competitor',
    'fed-spend vs govcon giants',
    'better than fed-spend',
    'fed-spend pricing',
    'federal opportunity intelligence',
    'government contract ai',
    'small business contract tools',
  ],
});

const comparisonData = [
  {
    feature: 'Federal Opportunity Alerts',
    giants: { value: '✓', detail: 'Daily AI-matched alerts' },
    fedspend: { value: '✓', detail: 'AI-powered alerts' },
  },
  {
    feature: 'SAM.gov Integration',
    giants: { value: '✓', detail: 'Real-time sync' },
    fedspend: { value: '✓', detail: 'Real-time sync' },
  },
  {
    feature: 'Grants.gov Coverage',
    giants: { value: '✓', detail: 'Full search' },
    fedspend: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Agency Pain Points',
    giants: { value: '✓', detail: '200+ agencies analyzed' },
    fedspend: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'SBLO Contact Database',
    giants: { value: '✓', detail: '800+ contacts' },
    fedspend: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Expiring Contracts',
    giants: { value: '✓', detail: '5,000+ recompetes' },
    fedspend: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Contractor Database',
    giants: { value: '✓', detail: '3,500+ contractors' },
    fedspend: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Pipeline CRM',
    giants: { value: '✓', detail: 'Built-in tracking' },
    fedspend: { value: 'Basic', detail: 'Saved searches' },
  },
  {
    feature: 'Forecast Intelligence',
    giants: { value: '✓', detail: '7,700+ forecasts' },
    fedspend: { value: 'Limited', detail: 'Basic forecasts' },
  },
  {
    feature: 'AI-Powered Briefings',
    giants: { value: '✓', detail: 'Daily/weekly summaries' },
    fedspend: { value: 'Partial', detail: 'AI summaries' },
  },
  {
    feature: 'Proposal Tools',
    giants: { value: '✓', detail: 'Content Reaper' },
    fedspend: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Market Research',
    giants: { value: '✓', detail: 'Federal Market Assassin' },
    fedspend: { value: 'Basic', detail: 'Spending data' },
  },
  {
    feature: 'Small Business Focus',
    giants: { value: '✓', detail: 'Built for SBs' },
    fedspend: { value: '✓', detail: 'Small business friendly' },
  },
  {
    feature: 'Free Tier',
    giants: { value: '✓', detail: 'MI Free forever' },
    fedspend: { value: '✓', detail: 'Free plan available' },
  },
  {
    feature: 'Premium Pricing',
    giants: { value: '$149/mo', detail: 'MI Core' },
    fedspend: { value: '$49-$199/mo', detail: 'Pro/Enterprise' },
  },
  {
    feature: 'Contract Length',
    giants: { value: 'Month-to-month', detail: 'Cancel anytime' },
    fedspend: { value: 'Month-to-month', detail: 'Cancel anytime' },
  },
];

const testimonials = [
  {
    quote: "Fed-Spend has great AI features, but we needed more data. The SBLO contacts and agency pain points in GovCon Giants give us a massive competitive advantage.",
    author: "Capture Manager, Professional Services Firm",
  },
  {
    quote: "We tried Fed-Spend but found the contractor database lacking. GovCon Giants has 3,500+ contractors and way more comprehensive forecasts.",
    author: "Owner, 8(a) Construction Company",
  },
  {
    quote: "The combination of opportunity alerts, forecasts, and actual contact info for SBLOs made GovCon Giants the clear winner for us.",
    author: "BD Director, Small Defense Contractor",
  },
];

export default function FedSpendComparisonPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants vs Fed-Spend Comparison',
        description: 'Feature and pricing comparison between GovCon Giants Market Intelligence and Fed-Spend for federal contract research.',
        url: `${SITE_URL}/compare/fed-spend`,
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

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does GovCon Giants compare to Fed-Spend for AI features?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Both platforms use AI for opportunity matching and summaries. GovCon Giants goes further with AI-powered daily briefings that summarize your entire pipeline, market trends, and recommended actions. We also include AI-powered proposal tools (Content Reaper) not available in Fed-Spend.',
            },
          },
          {
            '@type': 'Question',
            name: 'What unique data does GovCon Giants have vs Fed-Spend?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'GovCon Giants includes several datasets not available in Fed-Spend: 800+ SBLO contacts with direct email/phone, 200+ agency pain points analysis, 3,500+ contractor database with past performance, and 7,700+ comprehensive forecasts from 50+ agency sources.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is GovCon Giants more expensive than Fed-Spend?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'GovCon Giants MI Core is $149/month, which is comparable to Fed-Spend Pro ($49-$199/month depending on features). For the price, you get significantly more data: SBLO contacts, agency pain points, contractor database, and comprehensive forecasts that Fed-Spend doesn\'t offer.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I switch from Fed-Spend to GovCon Giants?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Both are month-to-month subscriptions with no long-term contracts. You can sign up for GovCon Giants MI Free to test it alongside Fed-Spend, then cancel Fed-Spend when ready. Contact support for migration assistance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which platform is better for small businesses?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Both are small business friendly. Fed-Spend offers good AI-powered opportunity tracking. GovCon Giants provides more comprehensive intelligence with SBLO contacts, agency pain points, contractor research, and built-in proposal tools — making it better for small businesses serious about winning contracts.',
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
            <span className="text-red-500">Fed-Spend</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            <span className="text-green-400 font-semibold">AI + more comprehensive data</span> for{' '}
            <span className="text-green-400 font-semibold">better intelligence</span>.
            Built for small businesses who need more than opportunity tracking.
          </p>

          {/* Price Comparison Banner */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="text-sm text-green-400 font-medium mb-1">GovCon Giants MI Core</div>
              <div className="text-4xl font-black text-white">$149<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-sm text-slate-400">Complete intelligence suite</div>
            </div>
            <div className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-6">
              <div className="text-sm text-slate-400 font-medium mb-1">Fed-Spend Pro</div>
              <div className="text-4xl font-black text-white">$49<span className="text-lg text-slate-400">-$199/mo</span></div>
              <div className="text-sm text-slate-400">Feature-dependent pricing</div>
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
                      <span className="text-slate-300 font-bold">Fed-Spend</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center bg-green-500/5">
                      <div className={`font-semibold ${row.giants.value === '✓' ? 'text-green-400' : row.giants.value.includes('$') ? 'text-green-400' : 'text-white'}`}>
                        {row.giants.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.giants.detail}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`font-semibold ${row.fedspend.value === '✓' ? 'text-slate-300' : row.fedspend.value === '✗' ? 'text-red-400' : 'text-slate-400'}`}>
                        {row.fedspend.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.fedspend.detail}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Choose GovCon Giants */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Why Small Businesses Choose GovCon Giants Over Fed-Spend
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Fed-Spend offers solid AI-powered opportunity tracking. GovCon Giants provides comprehensive intelligence you need to win.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-white mb-2">800+ SBLO Contacts</h3>
              <p className="text-slate-400">
                Direct email and phone numbers for Small Business Liaison Officers across federal agencies. Fed-Spend doesn&apos;t have this critical BD data.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">200+ Agency Pain Points</h3>
              <p className="text-slate-400">
                Proprietary analysis of what each agency is struggling with, pulled from GAO reports, audits, and strategic plans. Win themes on a silver platter.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-white mb-2">3,500+ Contractor Database</h3>
              <p className="text-slate-400">
                Research competitors, find teaming partners, and identify incumbents. Includes past performance and contract history not available in Fed-Spend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Users Say After Switching
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
            What&apos;s Included in MI Core ($149/mo)
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
                href="https://getmindy.ai/market-intelligence"
                className="block w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-center transition"
              >
                Get MI Team
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
              <h3 className="text-white font-semibold mb-2">How does GovCon Giants compare to Fed-Spend for AI features?</h3>
              <p className="text-slate-400">
                Both platforms use AI for opportunity matching and summaries. GovCon Giants goes further with AI-powered daily briefings that summarize your entire pipeline, market trends, and recommended actions. We also include AI-powered proposal tools (Content Reaper) not available in Fed-Spend.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">What unique data does GovCon Giants have vs Fed-Spend?</h3>
              <p className="text-slate-400">
                GovCon Giants includes several datasets not available in Fed-Spend: 800+ SBLO contacts with direct email/phone, 200+ agency pain points analysis, 3,500+ contractor database with past performance, and 7,700+ comprehensive forecasts from 50+ agency sources.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Is GovCon Giants more expensive than Fed-Spend?</h3>
              <p className="text-slate-400">
                GovCon Giants MI Core is $149/month, which is comparable to Fed-Spend Pro ($49-$199/month depending on features). For the price, you get significantly more data: SBLO contacts, agency pain points, contractor database, and comprehensive forecasts that Fed-Spend doesn&apos;t offer.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Can I switch from Fed-Spend to GovCon Giants?</h3>
              <p className="text-slate-400">
                Yes. Both are month-to-month subscriptions with no long-term contracts. You can sign up for GovCon Giants MI Free to test it alongside Fed-Spend, then cancel Fed-Spend when ready. Contact support for migration assistance.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Which platform is better for small businesses?</h3>
              <p className="text-slate-400">
                Both are small business friendly. Fed-Spend offers good AI-powered opportunity tracking. GovCon Giants provides more comprehensive intelligence with SBLO contacts, agency pain points, contractor research, and built-in proposal tools — making it better for small businesses serious about winning contracts.
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
            Ready for AI + Comprehensive Intelligence Data?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of small businesses who chose the most comprehensive federal contract intelligence platform.
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
