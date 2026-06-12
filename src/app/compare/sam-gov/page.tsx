import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'GovCon Giants vs SAM.gov [2026] — Why Smart Contractors Use Both',
  description: 'SAM.gov is free and essential, but limited. See how GovCon Giants adds AI alerts, agency intelligence, SBLO contacts, and pipeline tracking to complement your SAM.gov workflow.',
  path: '/compare/sam-gov',
  keywords: [
    'sam.gov alternative',
    'better than sam.gov',
    'sam.gov limitations',
    'sam.gov vs',
    'federal contract search',
    'government contract finder',
    'sam.gov alerts',
  ],
});

const comparisonData = [
  {
    feature: 'Opportunity Search',
    giants: { value: '✓', detail: 'AI-powered matching' },
    sam: { value: '✓', detail: 'Basic search' },
  },
  {
    feature: 'Price',
    giants: { value: '$0-$149/mo', detail: 'Free tier available' },
    sam: { value: 'Free', detail: 'Government operated' },
  },
  {
    feature: 'Email Alerts',
    giants: { value: '✓', detail: 'Daily AI briefings' },
    sam: { value: 'Basic', detail: 'Simple notifications' },
  },
  {
    feature: 'Pipeline CRM',
    giants: { value: '✓', detail: 'Track all opportunities' },
    sam: { value: '✗', detail: 'No tracking features' },
  },
  {
    feature: 'Agency Intelligence',
    giants: { value: '✓', detail: '200+ agency pain points' },
    sam: { value: '✗', detail: 'No analysis' },
  },
  {
    feature: 'SBLO Contacts',
    giants: { value: '✓', detail: '800+ with emails' },
    sam: { value: '✗', detail: 'Not available' },
  },
  {
    feature: 'Forecast Data',
    giants: { value: '✓', detail: '7,700+ forecasts' },
    sam: { value: 'Limited', detail: 'Some agency data' },
  },
  {
    feature: 'Expiring Contracts',
    giants: { value: '✓', detail: '5,000+ tracked' },
    sam: { value: '✗', detail: 'Manual research' },
  },
  {
    feature: 'Competitive Intel',
    giants: { value: '✓', detail: 'Incumbent tracking' },
    sam: { value: '✗', detail: 'No competitor data' },
  },
  {
    feature: 'Grants.gov Integration',
    giants: { value: '✓', detail: 'Unified search' },
    sam: { value: '✗', detail: 'Separate system' },
  },
  {
    feature: 'User Interface',
    giants: { value: 'Modern', detail: 'Built for speed' },
    sam: { value: 'Basic', detail: 'Government standard' },
  },
  {
    feature: 'Mobile Experience',
    giants: { value: '✓', detail: 'Responsive design' },
    sam: { value: 'Limited', detail: 'Desktop focused' },
  },
];

export default function SamGovComparisonPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants vs SAM.gov Comparison',
        description: 'How GovCon Giants complements SAM.gov for federal contract research.',
        url: `${SITE_URL}/compare/sam-gov`,
      }} />

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-400 font-semibold">VS COMPARISON</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">GovCon Giants vs</span><br />
            <span className="text-blue-400">SAM.gov</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            SAM.gov is essential — it&apos;s the official source. But it lacks intelligence, alerts, and tracking.
            <span className="text-green-400 font-semibold"> We make SAM.gov data actionable.</span>
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl mx-auto mb-8">
            <p className="text-slate-300">
              <strong className="text-white">Important:</strong> GovCon Giants complements SAM.gov — it doesn&apos;t replace it.
              You still need SAM.gov for entity registration and official submissions. We add the intelligence layer that SAM.gov lacks.
            </p>
          </div>

          <Link
            href="/mi-free"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
          >
            Try Free — No Credit Card
          </Link>
        </div>
      </section>

      {/* What SAM.gov Does Well */}
      <section className="py-12 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            What SAM.gov Does Well
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="text-white font-semibold mb-2">Entity Registration</h3>
              <p className="text-slate-400 text-sm">Official registration system for federal contractors. Required for all government work.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="text-white font-semibold mb-2">Official Notices</h3>
              <p className="text-slate-400 text-sm">The authoritative source for federal solicitations. Complete and official.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">💵</div>
              <h3 className="text-white font-semibold mb-2">Free Access</h3>
              <p className="text-slate-400 text-sm">Government-operated and free for everyone. No subscription required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What SAM.gov Lacks */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            What SAM.gov Lacks (And We Provide)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-500/30 rounded-xl p-6">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-white font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-slate-400 text-sm mb-3">
                SAM.gov gives you raw data. We analyze it with AI to surface opportunities matched to your NAICS codes,
                certifications, and past performance.
              </p>
              <span className="text-green-400 text-sm font-semibold">Included in Mindy Pro →</span>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-500/30 rounded-xl p-6">
              <div className="text-3xl mb-3">🏛️</div>
              <h3 className="text-white font-semibold mb-2">Agency Intelligence</h3>
              <p className="text-slate-400 text-sm mb-3">
                Know what agencies need before RFPs drop. 200+ agencies analyzed with budget priorities, pain points, and modernization goals.
              </p>
              <span className="text-green-400 text-sm font-semibold">Included in Mindy Pro →</span>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-500/30 rounded-xl p-6">
              <div className="text-3xl mb-3">📇</div>
              <h3 className="text-white font-semibold mb-2">SBLO Contacts</h3>
              <p className="text-slate-400 text-sm mb-3">
                Direct access to 800+ Small Business Liaison Officers at prime contractors. Email addresses and phone numbers for teaming.
              </p>
              <span className="text-green-400 text-sm font-semibold">Included in Mindy Pro →</span>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-500/30 rounded-xl p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-white font-semibold mb-2">Pipeline CRM</h3>
              <p className="text-slate-400 text-sm mb-3">
                Track opportunities from discovery to award. SAM.gov has no pipeline tracking — you&apos;re left managing spreadsheets.
              </p>
              <span className="text-green-400 text-sm font-semibold">Included in Mindy Pro →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
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
                    <span className="text-blue-400 font-bold">SAM.gov</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-slate-800/50 ${i % 2 === 0 ? 'bg-slate-900/30' : ''}`}>
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center bg-green-500/5">
                      <div className={`font-semibold ${row.giants.value === '✓' || row.giants.value === 'Modern' ? 'text-green-400' : 'text-white'}`}>
                        {row.giants.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.giants.detail}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className={`font-semibold ${row.sam.value === '✓' || row.sam.value === 'Free' ? 'text-blue-400' : row.sam.value === '✗' ? 'text-red-400' : 'text-slate-400'}`}>
                        {row.sam.value}
                      </div>
                      <div className="text-xs text-slate-500">{row.sam.detail}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How They Work Together */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            How Smart Contractors Use Both
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            The best contractors don&apos;t choose one or the other — they use both strategically.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Discover with GovCon Giants</h3>
                <p className="text-slate-400">Use our AI alerts and agency intelligence to identify opportunities early — before competitors.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Research with Both</h3>
                <p className="text-slate-400">Dive deep on SAM.gov for official documents. Use our agency pain points and SBLO contacts for context.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Track in GovCon Giants</h3>
                <p className="text-slate-400">Manage your pipeline, notes, and follow-ups in our CRM. SAM.gov doesn&apos;t track your activity.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0">4</div>
              <div>
                <h3 className="text-white font-semibold mb-1">Submit via SAM.gov</h3>
                <p className="text-slate-400">When it&apos;s time to bid, submit through SAM.gov — the official channel for all federal procurements.</p>
              </div>
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
            Make SAM.gov Data Actionable
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start free and see how our intelligence layer transforms your federal BD workflow.
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
