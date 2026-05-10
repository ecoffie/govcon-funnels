import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'GovCon Giants vs GovDash [2026] — AI BD Tools Compared',
  description: 'Compare GovCon Giants to GovDash. Transparent pricing and small business focus vs GovDash\'s enterprise AI BD enablement platform.',
  path: '/compare/govdash',
  keywords: [
    'govdash alternative',
    'govdash vs',
    'govdash pricing',
    'ai government contracting',
    'federal bd platform',
    'proposal automation',
  ],
});

const comparisonData = [
  {
    feature: 'Pricing',
    giants: { value: '$0-$499/mo', detail: 'Transparent tiers' },
    competitor: { value: 'Custom', detail: 'Enterprise only' },
  },
  {
    feature: 'Target Market',
    giants: { value: 'Small Business', detail: 'Built for SBs' },
    competitor: { value: 'Enterprise', detail: 'Large contractors' },
  },
  {
    feature: 'Free Tier',
    giants: { value: '✓', detail: 'MI Free forever' },
    competitor: { value: '✗', detail: 'No free option' },
  },
  {
    feature: 'Self-Service Signup',
    giants: { value: '✓', detail: 'Start instantly' },
    competitor: { value: '✗', detail: 'Sales required' },
  },
  {
    feature: 'AI Opportunity Matching',
    giants: { value: '✓', detail: 'Daily briefings' },
    competitor: { value: '✓', detail: 'AI-powered' },
  },
  {
    feature: 'Proposal Automation',
    giants: { value: 'Basic', detail: 'Content tools' },
    competitor: { value: '✓', detail: 'Core feature' },
  },
  {
    feature: 'SBLO Contacts',
    giants: { value: '✓', detail: '800+ contacts' },
    competitor: { value: '?', detail: 'Not documented' },
  },
  {
    feature: 'Agency Intelligence',
    giants: { value: '✓', detail: '200+ agencies' },
    competitor: { value: '?', detail: 'Limited info' },
  },
  {
    feature: 'Pipeline CRM',
    giants: { value: '✓', detail: 'Built-in' },
    competitor: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Minimum Contract',
    giants: { value: 'None', detail: 'Month-to-month' },
    competitor: { value: 'Annual+', detail: 'Enterprise terms' },
  },
];

export default function GovDashComparisonPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants vs GovDash Comparison',
        url: `${SITE_URL}/compare/govdash`,
      }} />

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-400 font-semibold">VS COMPARISON</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">GovCon Giants vs</span><br />
            <span className="text-indigo-400">GovDash</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            GovDash is AI-powered BD for enterprises. We&apos;re{' '}
            <span className="text-green-400 font-semibold">AI-powered intelligence for small businesses</span> —
            with transparent pricing you can see right now.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="text-sm text-green-400 font-medium mb-1">GovCon Giants</div>
              <div className="text-4xl font-black text-white">$0-$499<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-sm text-slate-400">Public pricing, start free</div>
            </div>
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-6">
              <div className="text-sm text-indigo-400 font-medium mb-1">GovDash</div>
              <div className="text-4xl font-black text-white">Custom</div>
              <div className="text-sm text-slate-400">Contact sales required</div>
            </div>
          </div>

          <Link
            href="/mi-free"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
          >
            Start Free — No Sales Call
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
                    <span className="text-indigo-400 font-bold">GovDash</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center bg-green-500/5">
                      <div className={`font-semibold ${row.giants.value === '✓' || row.giants.value === 'Small Business' || row.giants.value === 'None' ? 'text-green-400' : 'text-white'}`}>
                        {row.giants.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.giants.detail}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`font-semibold ${row.competitor.value === '✓' ? 'text-indigo-400' : row.competitor.value === '✗' || row.competitor.value === '?' ? 'text-slate-500' : 'text-slate-400'}`}>
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

      {/* Different Markets */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Built for Different Markets
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            GovDash targets enterprise contractors with dedicated BD teams. We built our platform for small businesses.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-500/5 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4">GovCon Giants</h3>
              <p className="text-slate-300 mb-4">Built for small business federal contractors:</p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  Start free, upgrade when ready
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  Self-service signup in 2 minutes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  Transparent, public pricing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  Month-to-month, cancel anytime
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  SBLO contacts for teaming
                </li>
              </ul>
            </div>
            <div className="bg-indigo-500/5 border border-indigo-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-indigo-400 mb-4">GovDash</h3>
              <p className="text-slate-300 mb-4">Built for enterprise contractors:</p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">✓</span>
                  AI proposal automation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">✓</span>
                  Full BD enablement suite
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">?</span>
                  Custom pricing (contact required)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">?</span>
                  Enterprise contracts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">?</span>
                  Limited public information
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* When to Choose Each */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Which Should You Choose?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-400 mb-4">Choose GovCon Giants if you:</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  Are a small business contractor
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  Want to start free and try before you buy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  Prefer transparent, predictable pricing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  Need SBLO contacts for teaming opportunities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">→</span>
                  Want to sign up without a sales call
                </li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-indigo-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-indigo-400 mb-4">Consider GovDash if you:</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">→</span>
                  Are a large enterprise contractor
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">→</span>
                  Have budget for enterprise software
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">→</span>
                  Need heavy proposal automation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">→</span>
                  Have a dedicated BD team
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-500">→</span>
                  Don&apos;t mind custom pricing discussions
                </li>
              </ul>
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
            <Link href="/compare/sweetspot" className="text-sm text-slate-400 hover:text-white transition">
              vs Sweetspot →
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
            Small Business Intelligence. No Sales Call Required.
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start free today and see why small businesses choose GovCon Giants.
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
