import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'GovCon Giants vs Sweetspot [2026] — AI GovCon Tools Compared',
  description: 'Compare GovCon Giants to Sweetspot for AI-powered government contracting. Transparent pricing, SBLO contacts, and agency intelligence vs Sweetspot\'s proposal focus.',
  path: '/compare/sweetspot',
  keywords: [
    'sweetspot alternative',
    'sweetspot government contracting',
    'sweetspot vs',
    'ai government contracting',
    'federal contract ai',
    'govcon ai tools',
  ],
});

const comparisonData = [
  {
    feature: 'Pricing',
    giants: { value: '$0-$499/mo', detail: 'Transparent tiers' },
    competitor: { value: 'Custom', detail: 'Contact for quote' },
  },
  {
    feature: 'Free Tier',
    giants: { value: '✓', detail: 'Mindy Free forever' },
    competitor: { value: '?', detail: 'Unclear' },
  },
  {
    feature: 'AI Opportunity Matching',
    giants: { value: '✓', detail: 'Daily briefings' },
    competitor: { value: '✓', detail: 'AI search' },
  },
  {
    feature: 'Proposal Assistance',
    giants: { value: 'Basic', detail: 'Content tools' },
    competitor: { value: '✓', detail: 'Core focus' },
  },
  {
    feature: 'Agency Intelligence',
    giants: { value: '✓', detail: '200+ analyzed' },
    competitor: { value: 'Limited', detail: 'Basic profiles' },
  },
  {
    feature: 'SBLO Contacts',
    giants: { value: '✓', detail: '800+ contacts' },
    competitor: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Forecast Data',
    giants: { value: '✓', detail: '7,700+ forecasts' },
    competitor: { value: '?', detail: 'Not documented' },
  },
  {
    feature: 'Pipeline CRM',
    giants: { value: '✓', detail: 'Built-in' },
    competitor: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Price Transparency',
    giants: { value: '✓', detail: 'Public pricing' },
    competitor: { value: '✗', detail: 'Contact required' },
  },
  {
    feature: 'Y Combinator Backed',
    giants: { value: '✗', detail: 'Bootstrapped' },
    competitor: { value: '✓', detail: 'YC backed' },
  },
];

export default function SweetspotComparisonPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants vs Sweetspot Comparison',
        url: `${SITE_URL}/compare/sweetspot`,
      }} />

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-400 font-semibold">VS COMPARISON</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">GovCon Giants vs</span><br />
            <span className="text-orange-400">Sweetspot</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Both use AI for government contracting. The difference?{' '}
            <span className="text-green-400 font-semibold">We show you our pricing upfront</span>{' '}
            and include intelligence features Sweetspot doesn&apos;t.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="text-sm text-green-400 font-medium mb-1">GovCon Giants</div>
              <div className="text-4xl font-black text-white">$0-$499<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-sm text-slate-400">Transparent, public pricing</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
              <div className="text-sm text-orange-400 font-medium mb-1">Sweetspot</div>
              <div className="text-4xl font-black text-white">Custom</div>
              <div className="text-sm text-slate-400">Contact for pricing</div>
            </div>
          </div>

          <Link
            href="/mi-free"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
          >
            Try Free — See Pricing Now
          </Link>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-12 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 bg-green-500/5">
                    <span className="text-green-400 font-bold">GovCon Giants</span>
                  </th>
                  <th className="text-center py-4 px-4">
                    <span className="text-orange-400 font-bold">Sweetspot</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center bg-green-500/5">
                      <div className={`font-semibold ${row.giants.value === '✓' ? 'text-green-400' : row.giants.value === '✗' ? 'text-slate-500' : 'text-white'}`}>
                        {row.giants.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.giants.detail}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`font-semibold ${row.competitor.value === '✓' ? 'text-orange-400' : row.competitor.value === '✗' || row.competitor.value === '?' ? 'text-slate-500' : 'text-slate-400'}`}>
                        {row.competitor.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.competitor.detail}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Different Focus */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Different Tools for Different Needs
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Sweetspot focuses on AI proposal writing. We focus on AI-powered business development intelligence.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-500/5 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">GovCon Giants Focus</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span><strong>Opportunity Discovery</strong> — Find contracts before competitors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span><strong>Agency Intelligence</strong> — Know what agencies need</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span><strong>Teaming Contacts</strong> — 800+ SBLO contacts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span><strong>Pipeline Management</strong> — Track your BD efforts</span>
                </li>
              </ul>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Sweetspot Focus</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">✓</span>
                  <span><strong>Proposal Writing</strong> — AI assistance for proposals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">✓</span>
                  <span><strong>Opportunity Search</strong> — AI-powered matching</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">?</span>
                  <span><strong>Limited Info</strong> — Many features undocumented</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">?</span>
                  <span><strong>Pricing Unknown</strong> — Contact required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Why Pricing Transparency Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="text-white font-semibold mb-2">Save Time</h3>
              <p className="text-slate-400 text-sm">Know instantly if a tool fits your budget. No sales calls required.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-white font-semibold mb-2">Make Better Decisions</h3>
              <p className="text-slate-400 text-sm">Compare features and pricing side-by-side. We&apos;re confident in our value.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-white font-semibold mb-2">Build Trust</h3>
              <p className="text-slate-400 text-sm">Hidden pricing often means higher prices. We have nothing to hide.</p>
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
              vs GovWin →
            </Link>
            <Link href="/compare/govdash" className="text-sm text-slate-400 hover:text-white transition">
              vs GovDash →
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
            AI-Powered Intelligence. Transparent Pricing.
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start free and see exactly what you get at every price point.
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
              See All Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
