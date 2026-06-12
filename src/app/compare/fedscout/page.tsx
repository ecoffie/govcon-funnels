import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'GovCon Giants vs FedScout [2026 Comparison] — More Data, Better Intelligence',
  description: 'Compare Mindy to FedScout. Get agency pain points, SBLO contacts, 7,700+ forecasts, and AI briefings. More comprehensive than FedScout Free or Pro.',
  path: '/compare/fedscout',
  keywords: [
    'fedscout alternative',
    'fedscout competitor',
    'fedscout vs govcon giants',
    'better than fedscout',
    'fedscout pricing',
    'federal opportunity alerts',
    'government contract intelligence',
    'small business contract tools',
  ],
});

const comparisonData = [
  {
    feature: 'Federal Opportunity Alerts',
    giants: { value: '✓', detail: 'Daily AI-matched alerts' },
    fedscout: { value: '✓', detail: 'Daily alerts' },
  },
  {
    feature: 'SAM.gov Integration',
    giants: { value: '✓', detail: 'Real-time sync' },
    fedscout: { value: '✓', detail: 'Real-time sync' },
  },
  {
    feature: 'Grants.gov Coverage',
    giants: { value: '✓', detail: 'Full search' },
    fedscout: { value: '✓', detail: 'Available in Pro' },
  },
  {
    feature: 'Agency Pain Points',
    giants: { value: '✓', detail: '200+ agencies analyzed' },
    fedscout: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'SBLO Contact Database',
    giants: { value: '✓', detail: '800+ contacts' },
    fedscout: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Expiring Contracts',
    giants: { value: '✓', detail: '5,000+ recompetes' },
    fedscout: { value: 'Limited', detail: 'Basic search' },
  },
  {
    feature: 'Contractor Database',
    giants: { value: '✓', detail: '3,500+ contractors' },
    fedscout: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Pipeline CRM',
    giants: { value: '✓', detail: 'Built-in tracking' },
    fedscout: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Forecast Intelligence',
    giants: { value: '✓', detail: '7,700+ forecasts' },
    fedscout: { value: 'Limited', detail: 'Basic forecasts' },
  },
  {
    feature: 'AI-Powered Briefings',
    giants: { value: '✓', detail: 'Daily/weekly summaries' },
    fedscout: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Advanced Filtering',
    giants: { value: '✓', detail: 'NAICS, state, set-aside' },
    fedscout: { value: '✓', detail: 'Multiple filters' },
  },
  {
    feature: 'Free Tier Alerts',
    giants: { value: '5/month', detail: 'Mindy Free' },
    fedscout: { value: '3/month', detail: 'FedScout Free' },
  },
  {
    feature: 'Premium Pricing',
    giants: { value: '$149/mo', detail: 'Mindy Pro' },
    fedscout: { value: '$49-$99/mo', detail: 'Pro plans' },
  },
  {
    feature: 'Contract Length',
    giants: { value: 'Month-to-month', detail: 'Cancel anytime' },
    fedscout: { value: 'Month-to-month', detail: 'Cancel anytime' },
  },
];

const testimonials = [
  {
    quote: "FedScout's free tier was great to start, but we quickly outgrew it. GovCon Giants gives us way more data and intelligence for the price.",
    author: "Founder, 8(a) Professional Services",
  },
  {
    quote: "The SBLO contacts and agency pain points are game-changers. FedScout doesn't have anything close to this level of actionable intelligence.",
    author: "BD Manager, Small IT Contractor",
  },
  {
    quote: "We switched from FedScout Pro to Mindy Pro. For $50 more per month, we get 10x the features. The forecast database alone is worth it.",
    author: "Owner, SDVOSB Construction Firm",
  },
];

export default function FedScoutComparisonPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants vs FedScout Comparison',
        description: 'Feature and pricing comparison between Mindy and FedScout for federal contract research.',
        url: `${SITE_URL}/compare/fedscout`,
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
            name: 'How does GovCon Giants compare to FedScout Free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Both offer free tiers with limited alerts. GovCon Giants Mindy Free includes 5 alerts/month (vs FedScout\'s 3/month), plus agency pain points preview, CAGE code lookup, and expiring contracts search. For serious BD work, Mindy Pro ($149/mo) includes unlimited alerts, AI briefings, SBLO contacts, and 7,700+ forecasts that FedScout doesn\'t offer.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is GovCon Giants more expensive than FedScout Pro?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'GovCon Giants Mindy Pro is $149/month vs FedScout Pro at $49-$99/month, but you get significantly more features: 800+ SBLO contacts, 200+ agency pain points, 7,700+ forecasts, AI-powered briefings, and a built-in pipeline CRM. The additional cost provides 5-10x more intelligence.',
            },
          },
          {
            '@type': 'Question',
            name: 'What does GovCon Giants have that FedScout doesn\'t?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'GovCon Giants includes several unique datasets not available in FedScout: 800+ SBLO contacts with email/phone, 200+ agency pain points analysis, 7,700+ forecast opportunities, AI-powered daily briefings, and a built-in pipeline CRM to track your opportunities.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I migrate from FedScout to GovCon Giants?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Both platforms allow you to export your saved searches and tracked opportunities. You can easily recreate your filters in GovCon Giants and start receiving alerts. Contact support after signing up for migration assistance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which is better for small businesses: FedScout or GovCon Giants?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'FedScout is excellent for basic opportunity tracking at low cost. GovCon Giants is better for small businesses serious about winning contracts, offering deeper intelligence (SBLO contacts, agency pain points, comprehensive forecasts) and built-in CRM to manage your pipeline.',
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
            <span className="text-red-500">FedScout</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Get <span className="text-green-400 font-semibold">10x more data</span> with{' '}
            <span className="text-green-400 font-semibold">deeper intelligence</span>.
            Built for small businesses who need more than basic opportunity alerts.
          </p>

          {/* Price Comparison Banner */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="text-sm text-green-400 font-medium mb-1">GovCon Giants Mindy Pro</div>
              <div className="text-4xl font-black text-white">$149<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-sm text-slate-400">Unlimited alerts + AI intelligence</div>
            </div>
            <div className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-6">
              <div className="text-sm text-slate-400 font-medium mb-1">FedScout Pro</div>
              <div className="text-4xl font-black text-white">$49<span className="text-lg text-slate-400">-$99/mo</span></div>
              <div className="text-sm text-slate-400">Opportunity alerts only</div>
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
                      <span className="text-slate-300 font-bold">FedScout</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center bg-green-500/5">
                      <div className={`font-semibold ${row.giants.value === '✓' ? 'text-green-400' : row.giants.value.includes('$') || row.giants.value.includes('/') ? 'text-green-400' : 'text-white'}`}>
                        {row.giants.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.giants.detail}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`font-semibold ${row.fedscout.value === '✓' ? 'text-slate-300' : row.fedscout.value === '✗' ? 'text-red-400' : 'text-slate-400'}`}>
                        {row.fedscout.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.fedscout.detail}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Upgrade from FedScout */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Why Small Businesses Upgrade from FedScout
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            FedScout is great for basic opportunity tracking. GovCon Giants provides the intelligence you need to actually win.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-2">10x More Data</h3>
              <p className="text-slate-400">
                800+ SBLO contacts, 200+ agency pain points, 7,700+ forecasts, and 5,000+ expiring contracts. FedScout gives you opportunities; we give you intelligence.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered Insights</h3>
              <p className="text-slate-400">
                Daily and weekly AI briefings summarize your opportunities, market trends, and action items. No more manual research.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Built-in Pipeline CRM</h3>
              <p className="text-slate-400">
                Track opportunities from discovery to award. Set reminders, add notes, and manage your entire BD pipeline in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What FedScout Users Say After Switching
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
                Get Mindy Teams
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
              <h3 className="text-white font-semibold mb-2">How does GovCon Giants compare to FedScout Free?</h3>
              <p className="text-slate-400">
                Both offer free tiers with limited alerts. GovCon Giants Mindy Free includes 5 alerts/month (vs FedScout&apos;s 3/month), plus agency pain points preview, CAGE code lookup, and expiring contracts search. For serious BD work, Mindy Pro ($149/mo) includes unlimited alerts, AI briefings, SBLO contacts, and 7,700+ forecasts that FedScout doesn&apos;t offer.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Is GovCon Giants more expensive than FedScout Pro?</h3>
              <p className="text-slate-400">
                GovCon Giants Mindy Pro is $149/month vs FedScout Pro at $49-$99/month, but you get significantly more features: 800+ SBLO contacts, 200+ agency pain points, 7,700+ forecasts, AI-powered briefings, and a built-in pipeline CRM. The additional cost provides 5-10x more intelligence.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">What does GovCon Giants have that FedScout doesn&apos;t?</h3>
              <p className="text-slate-400">
                GovCon Giants includes several unique datasets not available in FedScout: 800+ SBLO contacts with email/phone, 200+ agency pain points analysis, 7,700+ forecast opportunities, AI-powered daily briefings, and a built-in pipeline CRM to track your opportunities.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Can I migrate from FedScout to GovCon Giants?</h3>
              <p className="text-slate-400">
                Yes. Both platforms allow you to export your saved searches and tracked opportunities. You can easily recreate your filters in GovCon Giants and start receiving alerts. Contact support after signing up for migration assistance.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Which is better for small businesses: FedScout or GovCon Giants?</h3>
              <p className="text-slate-400">
                FedScout is excellent for basic opportunity tracking at low cost. GovCon Giants is better for small businesses serious about winning contracts, offering deeper intelligence (SBLO contacts, agency pain points, comprehensive forecasts) and built-in CRM to manage your pipeline.
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
            Ready for Intelligence That Goes Beyond Opportunity Alerts?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of small businesses who upgraded from basic tracking to comprehensive contract intelligence.
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
