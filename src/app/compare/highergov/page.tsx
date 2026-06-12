import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'GovCon Giants vs HigherGov [2026] — Full Feature Comparison',
  description: 'Compare GovCon Giants to HigherGov. See how we stack up on pricing, agency intelligence, SBLO contacts, and features for small business federal contractors.',
  path: '/compare/highergov',
  keywords: [
    'highergov alternative',
    'highergov vs',
    'highergov competitor',
    'federal contract software',
    'government contracting tools',
    'highergov pricing',
  ],
});

const comparisonData = [
  {
    feature: 'Starting Price',
    giants: { value: '$0', detail: 'Free tier available' },
    competitor: { value: '$500/yr', detail: 'Per user' },
  },
  {
    feature: 'Full Platform Price',
    giants: { value: '$149/mo', detail: 'Unlimited seats' },
    competitor: { value: '$2,500/yr', detail: 'Per user' },
  },
  {
    feature: 'Opportunity Search',
    giants: { value: '✓', detail: 'AI-powered matching' },
    competitor: { value: '✓', detail: 'Keyword search' },
  },
  {
    feature: 'Agency Data Pages',
    giants: { value: '✓', detail: '200+ agencies' },
    competitor: { value: '✓', detail: 'Strong data pages' },
  },
  {
    feature: 'AI Briefings',
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
    giants: { value: '✓', detail: 'Proprietary research' },
    competitor: { value: 'Limited', detail: 'Basic profiles' },
  },
  {
    feature: 'Forecast Intelligence',
    giants: { value: '✓', detail: '7,700+ forecasts' },
    competitor: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Pipeline CRM',
    giants: { value: '✓', detail: 'Built-in tracking' },
    competitor: { value: '✓', detail: 'CRM features' },
  },
  {
    feature: 'Expiring Contracts',
    giants: { value: '✓', detail: '5,000+ tracked' },
    competitor: { value: '✓', detail: 'Available' },
  },
  {
    feature: 'Contractor Database',
    giants: { value: '✓', detail: '3,500+ contractors' },
    competitor: { value: '✓', detail: 'Extensive data' },
  },
  {
    feature: 'Per-User Pricing',
    giants: { value: '✗', detail: 'Unlimited seats' },
    competitor: { value: '✓', detail: 'Per user charges' },
  },
];

export default function HigherGovComparisonPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants vs HigherGov Comparison',
        url: `${SITE_URL}/compare/highergov`,
      }} />

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-400 font-semibold">VS COMPARISON</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">GovCon Giants vs</span><br />
            <span className="text-purple-400">HigherGov</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            HigherGov has great data pages, but we offer more intelligence features at a lower price point —
            <span className="text-green-400 font-semibold"> with no per-user charges</span>.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="text-sm text-green-400 font-medium mb-1">GovCon Giants Mindy Pro</div>
              <div className="text-4xl font-black text-white">$149<span className="text-lg text-slate-400">/mo</span></div>
              <div className="text-sm text-slate-400">Unlimited team members</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
              <div className="text-sm text-purple-400 font-medium mb-1">HigherGov</div>
              <div className="text-4xl font-black text-white">$500-$2,500<span className="text-lg text-slate-400">/yr</span></div>
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
                    <span className="text-purple-400 font-bold">HigherGov</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center bg-green-500/5">
                      <div className={`font-semibold ${row.giants.value === '✓' || row.giants.value === '$0' || row.giants.value === '✗' && row.feature === 'Per-User Pricing' ? 'text-green-400' : 'text-white'}`}>
                        {row.giants.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.giants.detail}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`font-semibold ${row.competitor.value === '✓' ? 'text-purple-400' : row.competitor.value === '✗' ? 'text-red-400' : 'text-slate-400'}`}>
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
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">No Per-User Pricing</h3>
              <p className="text-slate-400">
                HigherGov charges per user, which adds up for teams. Our Mindy Pro plan includes unlimited team members at $149/month —
                whether you&apos;re solo or have 10 people on your BD team.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl mb-4">📇</div>
              <h3 className="text-xl font-bold text-white mb-2">SBLO Contact Database</h3>
              <p className="text-slate-400">
                We include 800+ Small Business Liaison Officer contacts with email addresses and phone numbers for teaming outreach.
                HigherGov doesn&apos;t offer this data.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered Briefings</h3>
              <p className="text-slate-400">
                Our AI analyzes opportunities daily and surfaces what matters for your specific NAICS codes and certifications.
                HigherGov provides data — we provide intelligence.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold text-white mb-2">Agency Pain Points</h3>
              <p className="text-slate-400">
                Know what agencies need before RFPs drop. Our proprietary agency intelligence includes budget priorities,
                modernization goals, and pain points — not just basic profiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where HigherGov Excels */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Where HigherGov Excels
          </h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-slate-300 mb-4">
              To be fair, HigherGov does some things well:
            </p>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                Strong SEO-driven data pages for contractor and agency research
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                Solid award tracking and historical contract data
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">•</span>
                CRM features for pipeline management
              </li>
            </ul>
            <p className="text-slate-400 mt-4">
              If you prioritize data pages and have budget for per-user pricing, HigherGov is a reasonable option.
              But for intelligence and value, we believe GovCon Giants delivers more.
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
            <Link href="/compare/sam-gov" className="text-sm text-slate-400 hover:text-white transition">
              vs SAM.gov →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            More Intelligence. Better Price.
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
