import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'GovCon Giants vs GovTribe [2026 Comparison] — Better Value for Small Business',
  description: 'Compare Mindy to GovTribe. Get federal contract intelligence, AI-powered briefings, and agency pain points. Free tier available.',
  path: '/compare/govtribe',
  keywords: [
    'govtribe alternative',
    'govtribe competitor',
    'govtribe vs',
    'govtribe pricing',
    'federal contract search tool',
    'govtribe comparison',
    'government contracting software',
    'govtribe free alternative',
  ],
});

const comparisonData = [
  {
    feature: 'Federal Opportunity Alerts',
    giants: { value: '✓', detail: 'AI-matched daily alerts' },
    govtribe: { value: '✓', detail: 'Daily alerts' },
  },
  {
    feature: 'SAM.gov Integration',
    giants: { value: '✓', detail: 'Real-time sync' },
    govtribe: { value: '✓', detail: 'Real-time sync' },
  },
  {
    feature: 'Grants.gov Coverage',
    giants: { value: '✓', detail: 'Full search + forecasts' },
    govtribe: { value: '✓', detail: 'Full search' },
  },
  {
    feature: 'AI-Powered Analysis',
    giants: { value: '✓', detail: 'Daily briefings, go/no-go' },
    govtribe: { value: '✗', detail: 'No AI features' },
  },
  {
    feature: 'Agency Pain Points',
    giants: { value: '✓', detail: '200+ agencies analyzed' },
    govtribe: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'SBLO Contact Database',
    giants: { value: '✓', detail: '800+ contacts w/ email' },
    govtribe: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Expiring Contracts Finder',
    giants: { value: '✓', detail: '5,000+ recompetes' },
    govtribe: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Contractor Profiles',
    giants: { value: '✓', detail: '317K+ federal contractors' },
    govtribe: { value: '✓', detail: 'Federal contractors' },
  },
  {
    feature: 'Funding History Charts',
    giants: { value: '✓', detail: '5yr award history (coming)' },
    govtribe: { value: '✓', detail: 'Award charts' },
  },
  {
    feature: 'Forecast Intelligence',
    giants: { value: '✓', detail: '7,700+ forecasts' },
    govtribe: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Pipeline CRM',
    giants: { value: '✓', detail: 'Built-in tracking' },
    govtribe: { value: '✓', detail: 'Pipeline tools' },
  },
  {
    feature: 'Salesforce Integration',
    giants: { value: '✗', detail: 'Not yet' },
    govtribe: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Free Tier',
    giants: { value: '✓', detail: 'Mindy Free forever' },
    govtribe: { value: '14-day trial', detail: 'Then paid only' },
  },
  {
    feature: 'Starting Price',
    giants: { value: '$149/mo', detail: 'Mindy Pro' },
    govtribe: { value: '$112/mo', detail: '$1,350/yr (Launch)' },
  },
  {
    feature: 'Full-Feature Price',
    giants: { value: '$149/mo', detail: 'Everything included' },
    govtribe: { value: '$333/mo', detail: '$4,000/yr (Growth)' },
  },
  {
    feature: 'Contract Length',
    giants: { value: 'Month-to-month', detail: 'Cancel anytime' },
    govtribe: { value: 'Annual', detail: 'Yearly billing' },
  },
];

const testimonials = [
  {
    quote: "The AI briefings alone justify the switch. GovTribe gave me data, GovCon Giants tells me what to do with it.",
    author: "BD Manager, SDVOSB IT Services",
  },
  {
    quote: "Agency pain points are gold for positioning. No other tool gives me that intelligence at any price.",
    author: "Owner, 8(a) Professional Services",
  },
  {
    quote: "I needed SBLO contacts to break into new agencies. GovTribe doesn't have that. Deal breaker.",
    author: "Founder, HUBZone Contractor",
  },
];

export default function GovTribeComparisonPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants vs GovTribe Comparison',
        description: 'Feature and pricing comparison between Mindy and GovTribe for federal contract research.',
        url: `${SITE_URL}/compare/govtribe`,
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

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <span className="text-blue-400 font-semibold">VS COMPARISON</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">GovCon Giants vs</span><br />
            <span className="text-blue-500">GovTribe</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            GovTribe is solid. We&apos;re better for small businesses.{' '}
            <span className="text-green-400 font-semibold">AI-powered briefings</span>,{' '}
            <span className="text-green-400 font-semibold">agency pain points</span>, and{' '}
            <span className="text-green-400 font-semibold">SBLO contacts</span> they don&apos;t have.
          </p>

          {/* Price Comparison Banner */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="text-sm text-green-400 font-medium mb-1">GovCon Giants Mindy Pro</div>
              <div className="text-4xl font-black text-white">$149<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-sm text-slate-400">Month-to-month • Full features</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="text-sm text-blue-400 font-medium mb-1">GovTribe Growth</div>
              <div className="text-4xl font-black text-white">$333<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-sm text-slate-400">$4,000/yr • Annual billing</div>
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

      {/* What We Have That GovTribe Doesn't */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            What We Have That GovTribe Doesn&apos;t
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            GovTribe does the basics well. We go further for small businesses who need to win.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered Briefings</h3>
              <p className="text-slate-400">
                Daily and weekly AI briefings analyze opportunities, suggest go/no-go decisions, and identify pursuit priorities.
                GovTribe has no AI features.
              </p>
            </div>
            <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Agency Pain Points</h3>
              <p className="text-slate-400">
                200+ agencies with analyzed challenges, budget priorities, and procurement patterns.
                Know what they&apos;re struggling with before you pitch.
              </p>
            </div>
            <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-white mb-2">SBLO Contacts</h3>
              <p className="text-slate-400">
                800+ Small Business Liaison Officers with direct email and phone.
                Build relationships with the people who advocate for small businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section id="comparison" className="py-12 px-6">
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
                      <span className="text-blue-300 font-bold">GovTribe</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center bg-green-500/5">
                      <div className={`font-semibold ${row.giants.value === '✓' ? 'text-green-400' : row.giants.value.includes('$') ? 'text-green-400' : row.giants.value === '✗' ? 'text-red-400' : 'text-white'}`}>
                        {row.giants.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.giants.detail}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`font-semibold ${row.govtribe.value === '✓' ? 'text-slate-300' : row.govtribe.value === '✗' ? 'text-red-400' : 'text-slate-400'}`}>
                        {row.govtribe.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.govtribe.detail}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* GovTribe Strengths (Fair Comparison) */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            When GovTribe Makes Sense
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            We believe in honest comparisons. GovTribe is a good tool — here&apos;s where it excels.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-white mb-2">Salesforce Integration</h3>
              <p className="text-slate-400">
                If your team lives in Salesforce, GovTribe&apos;s native integration is valuable. We don&apos;t have this yet.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">Lower Entry Price</h3>
              <p className="text-slate-400">
                GovTribe Launch at $112/mo ($1,350/yr) is cheaper than our $149/mo if you only need basics and commit to annual.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-white mb-2">Established Platform</h3>
              <p className="text-slate-400">
                GovTribe has been around longer. If you need a proven track record, they have more years in market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
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
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Start free, upgrade when you&apos;re ready. No annual contracts required.
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
              <h3 className="text-white font-semibold mb-2">Is GovTribe cheaper than GovCon Giants?</h3>
              <p className="text-slate-400">
                GovTribe Launch ($112/mo) is cheaper than Mindy Pro ($149/mo), but requires annual commitment.
                Our full features at $149/mo are cheaper than GovTribe Growth ($333/mo), and we offer month-to-month billing.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Do you have the same SAM.gov data?</h3>
              <p className="text-slate-400">
                Yes, we both pull from the same government sources: SAM.gov, Grants.gov, USASpending, and agency forecasts.
                The difference is what we add on top — AI analysis, agency pain points, and SBLO contacts.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Can I try before committing?</h3>
              <p className="text-slate-400">
                Yes. We have a free tier (Mindy Free) you can use forever. GovTribe offers a 14-day trial.
                Our approach lets you test at your own pace without a ticking clock.
              </p>
            </div>
            <div className="bg-slate-900 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">What if I need Salesforce integration?</h3>
              <p className="text-slate-400">
                If Salesforce integration is critical for your workflow, GovTribe is the better choice today.
                We plan to add integrations in the future, but don&apos;t have it currently.
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
            <Link href="/compare/federal-compass" className="text-sm text-slate-400 hover:text-white transition">
              vs Federal Compass →
            </Link>
            <Link href="/compare/bloomberg-government" className="text-sm text-slate-400 hover:text-white transition">
              vs Bloomberg Government →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Try the AI-Powered Alternative?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start free. No credit card. No annual contract. Upgrade when you see the value.
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
