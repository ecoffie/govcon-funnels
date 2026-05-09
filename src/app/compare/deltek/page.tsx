import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'GovCon Giants vs Deltek GovWin [2026 Comparison] — 80% Features, 2% Cost',
  description: 'Compare GovCon Giants Market Intelligence to Deltek GovWin. Get federal contract intelligence, agency pain points, and opportunity alerts at a fraction of the cost. No 12-month contracts.',
  path: '/compare/deltek',
  keywords: [
    'deltek govwin alternative',
    'govwin competitor',
    'deltek alternative',
    'federal contract intelligence',
    'govwin pricing',
    'cheaper than govwin',
    'govwin vs',
    'government contracting tools',
  ],
});

const comparisonData = [
  {
    feature: 'Federal Opportunity Alerts',
    giants: { value: '✓', detail: 'Daily AI-matched alerts' },
    govwin: { value: '✓', detail: 'Daily alerts' },
  },
  {
    feature: 'SAM.gov Integration',
    giants: { value: '✓', detail: 'Real-time sync' },
    govwin: { value: '✓', detail: 'Real-time sync' },
  },
  {
    feature: 'Grants.gov Coverage',
    giants: { value: '✓', detail: 'Full search' },
    govwin: { value: '✓', detail: 'Full search' },
  },
  {
    feature: 'Agency Pain Points',
    giants: { value: '✓', detail: '200+ agencies analyzed' },
    govwin: { value: 'Limited', detail: 'Requires analyst calls' },
  },
  {
    feature: 'SBLO Contact Database',
    giants: { value: '✓', detail: '800+ contacts' },
    govwin: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Expiring Contracts',
    giants: { value: '✓', detail: '5,000+ recompetes' },
    govwin: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Contractor Database',
    giants: { value: '✓', detail: '3,500+ contractors' },
    govwin: { value: '✓', detail: 'Extensive' },
  },
  {
    feature: 'Pipeline CRM',
    giants: { value: '✓', detail: 'Built-in tracking' },
    govwin: { value: '✓', detail: 'Full CRM' },
  },
  {
    feature: 'Forecast Intelligence',
    giants: { value: '✓', detail: '7,700+ forecasts' },
    govwin: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'AI-Powered Briefings',
    giants: { value: '✓', detail: 'Daily/weekly summaries' },
    govwin: { value: '✗', detail: 'Manual research' },
  },
  {
    feature: 'Small Business Focus',
    giants: { value: '✓', detail: 'Built for SBs' },
    govwin: { value: 'Partial', detail: 'Enterprise focus' },
  },
  {
    feature: 'Free Tier',
    giants: { value: '✓', detail: 'MI Free forever' },
    govwin: { value: '✗', detail: 'No free option' },
  },
  {
    feature: 'Monthly Pricing',
    giants: { value: '$149/mo', detail: 'MI Core' },
    govwin: { value: '$6,000+/yr', detail: 'Annual only' },
  },
  {
    feature: 'Contract Length',
    giants: { value: 'Month-to-month', detail: 'Cancel anytime' },
    govwin: { value: '12-month minimum', detail: 'Annual contract' },
  },
];

const testimonials = [
  {
    quote: "I was paying $8,000/year for GovWin. Switched to GovCon Giants and I'm getting 90% of what I need for $1,800/year. No brainer.",
    author: "Owner, 8(a) IT Services Company",
  },
  {
    quote: "The agency pain points alone are worth the subscription. GovWin never gave me that level of actionable intelligence.",
    author: "BD Director, Small Defense Contractor",
  },
  {
    quote: "As a small business, I couldn't justify GovWin's pricing. MI Core gives me what I need to compete without breaking the bank.",
    author: "Founder, SDVOSB Professional Services",
  },
];

export default function DeltekComparisonPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants vs Deltek GovWin Comparison',
        description: 'Feature and pricing comparison between GovCon Giants Market Intelligence and Deltek GovWin for federal contract research.',
        url: `${SITE_URL}/compare/deltek`,
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-400 font-semibold">VS COMPARISON</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">GovCon Giants vs</span><br />
            <span className="text-red-500">Deltek GovWin</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Get <span className="text-green-400 font-semibold">80% of the features</span> at{' '}
            <span className="text-green-400 font-semibold">2% of the cost</span>.
            Built for small businesses who want to win government contracts without enterprise pricing.
          </p>

          {/* Price Comparison Banner */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="text-sm text-green-400 font-medium mb-1">GovCon Giants MI Core</div>
              <div className="text-4xl font-black text-white">$149<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-sm text-slate-400">Month-to-month, cancel anytime</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <div className="text-sm text-red-400 font-medium mb-1">Deltek GovWin</div>
              <div className="text-4xl font-black text-white">$6,000<span className="text-lg text-slate-400">+/yr</span></div>
              <div className="text-sm text-slate-400">12-month contract required</div>
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
                      <span className="text-slate-300 font-bold">Deltek GovWin</span>
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
                      <div className={`font-semibold ${row.govwin.value === '✓' ? 'text-slate-300' : row.govwin.value === '✗' ? 'text-red-400' : 'text-slate-400'}`}>
                        {row.govwin.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.govwin.detail}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Small Businesses Switch */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Why Small Businesses Switch from GovWin
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            GovWin is built for large enterprises with big budgets. We built Market Intelligence for the rest of us.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">Save $4,200+/Year</h3>
              <p className="text-slate-400">
                MI Core at $149/mo ($1,788/yr) vs GovWin at $6,000+/yr. That&apos;s money you can spend on proposals.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">🚫</div>
              <h3 className="text-xl font-bold text-white mb-2">No Long-Term Contracts</h3>
              <p className="text-slate-400">
                GovWin requires 12-month commitments. We&apos;re month-to-month because we earn your business every month.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Built for Small Business</h3>
              <p className="text-slate-400">
                SBLO contacts, set-aside filters, and features designed for small contractors — not billion-dollar primes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Switchers Say
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
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Is this really 80% of GovWin&apos;s features?</h3>
              <p className="text-slate-400">
                For small businesses, yes. We cover opportunity alerts, forecasts, expiring contracts, and agency intelligence.
                GovWin has additional features like bid/capture management suites, but most small businesses don&apos;t need (or use) them.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Can I migrate my data from GovWin?</h3>
              <p className="text-slate-400">
                Yes. Export your opportunities from GovWin and we&apos;ll help you import them into our Pipeline CRM.
                Contact support after signing up for assistance.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">What if I need more than 5 team members?</h3>
              <p className="text-slate-400">
                Contact us for enterprise pricing. We offer custom plans for larger teams at rates still well below GovWin.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Do you have the same data sources as GovWin?</h3>
              <p className="text-slate-400">
                We pull from the same public sources: SAM.gov, Grants.gov, USASpending, and agency forecasts.
                Our agency pain points data is proprietary and not available in GovWin.
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
            Ready to Stop Overpaying for Contract Intelligence?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of small businesses who switched from expensive enterprise tools.
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
