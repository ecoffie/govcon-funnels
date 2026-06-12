import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'GovCon Giants vs EZGovOpps [2026] — Feature & Price Comparison',
  description: 'Compare GovCon Giants to EZGovOpps for federal contract intelligence. Better pricing, AI briefings, and SBLO contacts vs EZGovOpps\' IDIQ tracking focus.',
  path: '/compare/ezgovopps',
  keywords: [
    'ezgovopps alternative',
    'ezgovopps vs',
    'ezgovopps pricing',
    'federal contract software',
    'government contracting tools',
  ],
});

const comparisonData = [
  {
    feature: 'Annual Price',
    giants: { value: '$1,788/yr', detail: 'Mindy Pro' },
    competitor: { value: '$2,700-$6,000/yr', detail: 'Per user' },
  },
  {
    feature: 'Per-User Pricing',
    giants: { value: '✗', detail: 'Unlimited seats' },
    competitor: { value: '✓', detail: 'Additional cost' },
  },
  {
    feature: 'IDIQ/Vehicle Tracking',
    giants: { value: '✓', detail: 'Available' },
    competitor: { value: '✓', detail: 'Core strength' },
  },
  {
    feature: 'AI-Powered Briefings',
    giants: { value: '✓', detail: 'Daily summaries' },
    competitor: { value: '✗', detail: 'Not available' },
  },
  {
    feature: 'SBLO Contacts',
    giants: { value: '✓', detail: '800+ with emails' },
    competitor: { value: '✗', detail: 'Not included' },
  },
  {
    feature: 'Agency Pain Points',
    giants: { value: '✓', detail: '200+ agencies' },
    competitor: { value: 'Limited', detail: 'Basic info' },
  },
  {
    feature: 'Forecast Intelligence',
    giants: { value: '✓', detail: '7,700+ forecasts' },
    competitor: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'User Interface',
    giants: { value: 'Modern', detail: '2024 design' },
    competitor: { value: 'Dated', detail: 'Older UI' },
  },
  {
    feature: 'File Cabinet Feature',
    giants: { value: 'Basic', detail: 'Document storage' },
    competitor: { value: '✓', detail: 'Strong feature' },
  },
  {
    feature: 'Free Tier',
    giants: { value: '✓', detail: 'Mindy Free forever' },
    competitor: { value: '✗', detail: 'Paid only' },
  },
];

export default function EZGovOppsComparisonPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants vs EZGovOpps Comparison',
        url: `${SITE_URL}/compare/ezgovopps`,
      }} />

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-400 font-semibold">VS COMPARISON</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">GovCon Giants vs</span><br />
            <span className="text-cyan-400">EZGovOpps</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            EZGovOpps excels at IDIQ tracking. We offer{' '}
            <span className="text-green-400 font-semibold">better value with more intelligence features</span>{' '}
            and a modern interface.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="text-sm text-green-400 font-medium mb-1">GovCon Giants Mindy Pro</div>
              <div className="text-4xl font-black text-white">$1,788<span className="text-lg text-slate-400">/yr</span></div>
              <div className="text-sm text-slate-400">Unlimited team members</div>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
              <div className="text-sm text-cyan-400 font-medium mb-1">EZGovOpps</div>
              <div className="text-4xl font-black text-white">$2,700+<span className="text-lg text-slate-400">/yr</span></div>
              <div className="text-sm text-slate-400">Per user pricing</div>
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
                    <span className="text-cyan-400 font-bold">EZGovOpps</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center bg-green-500/5">
                      <div className={`font-semibold ${row.giants.value === '✓' || row.giants.value === 'Modern' ? 'text-green-400' : row.giants.value === '✗' && row.feature === 'Per-User Pricing' ? 'text-green-400' : 'text-white'}`}>
                        {row.giants.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.giants.detail}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`font-semibold ${row.competitor.value === '✓' ? 'text-cyan-400' : row.competitor.value === '✗' ? 'text-red-400' : 'text-slate-400'}`}>
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

      {/* Key Differences */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Key Differences
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl mb-4">💻</div>
              <h3 className="text-xl font-bold text-white mb-2">Modern Interface</h3>
              <p className="text-slate-400">
                EZGovOpps has an older, dated interface. We built our platform in 2024 with modern UX principles —
                faster, cleaner, and easier to use.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">AI Intelligence Layer</h3>
              <p className="text-slate-400">
                Our AI analyzes opportunities daily and surfaces what matters for your business.
                EZGovOpps provides data — we provide actionable intelligence.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl mb-4">📇</div>
              <h3 className="text-xl font-bold text-white mb-2">SBLO Contacts</h3>
              <p className="text-slate-400">
                Access 800+ Small Business Liaison Officer contacts for teaming outreach.
                EZGovOpps doesn&apos;t offer this critical data for subcontracting.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">Better Value</h3>
              <p className="text-slate-400">
                Save 34% or more compared to EZGovOpps. No per-user pricing means your whole team gets access
                for one flat monthly fee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EZGovOpps Strengths */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Where EZGovOpps Excels
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-slate-300 mb-4">
              EZGovOpps has been around since the early 2000s and has some strengths:
            </p>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                Strong IDIQ and vehicle tracking with detailed program intelligence
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                File cabinet feature for organizing solicitation documents
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                Veteran-owned small business (good if you want to support VOSB)
              </li>
            </ul>
            <p className="text-slate-400 mt-4">
              If IDIQ tracking is your primary need and you don&apos;t mind the interface, EZGovOpps is solid.
              But for overall value and modern intelligence features, we believe we deliver more.
            </p>
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
            <Link href="/compare/govtribe" className="text-sm text-slate-400 hover:text-white transition">
              vs GovTribe →
            </Link>
            <Link href="/compare/highergov" className="text-sm text-slate-400 hover:text-white transition">
              vs HigherGov →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Better Features. Better Price. Better Experience.
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Try GovCon Giants free and see the difference for yourself.
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
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
