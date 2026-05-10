import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'WOSB/EDWOSB Contracting Software — Women-Owned Business Opportunities',
  description: 'Federal contracting intelligence for Women-Owned and Economically Disadvantaged Women-Owned Small Businesses. Find WOSB/EDWOSB set-asides across federal agencies.',
  path: '/for/wosb',
  keywords: [
    'wosb contracting software',
    'wosb opportunities',
    'edwosb contracts',
    'women owned business contracts',
    'wosb set aside',
    'women owned federal contracts',
    'wosb certification opportunities',
  ],
});

const features = [
  {
    icon: '👩‍💼',
    title: 'WOSB/EDWOSB Set-Aside Filter',
    description: 'Filter opportunities specifically for women-owned set-asides. See contracts reserved for certified businesses like yours.',
  },
  {
    icon: '📊',
    title: 'NAICS Industry Tracking',
    description: 'WOSB set-asides are available in specific NAICS codes. We track which industries have the most women-owned opportunities.',
  },
  {
    icon: '🏛️',
    title: 'Agency WOSB Spending',
    description: 'See which agencies are meeting (or missing) their 5% WOSB goals. Target agencies that prioritize women-owned contractors.',
  },
  {
    icon: '📇',
    title: 'Prime Teaming Contacts',
    description: '800+ SBLO contacts at primes seeking WOSB subcontractors to meet their small business requirements.',
  },
  {
    icon: '💎',
    title: 'EDWOSB Advantages',
    description: 'EDWOSB certification opens sole-source opportunities up to $7M for services. We track these high-value opportunities.',
  },
  {
    icon: '🔮',
    title: 'Forecast Intelligence',
    description: '7,700+ forecasted opportunities. Position early for contracts that match your capabilities.',
  },
];

const stats = [
  { value: '$26B+', label: 'Annual WOSB spending' },
  { value: '5%', label: 'Federal WOSB goal' },
  { value: '5.2%', label: 'Actual achievement' },
  { value: '$7M', label: 'EDWOSB sole-source threshold' },
];

export default function WOSBPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants for Women-Owned Businesses',
        description: 'Federal contracting intelligence for WOSB and EDWOSB certified businesses.',
        url: `${SITE_URL}/for/wosb`,
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full mb-6">
            <span className="text-pink-400 font-semibold">FOR WOSB/EDWOSB CONTRACTORS</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Federal Contracts for</span><br />
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              Women-Owned Businesses
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Your WOSB or EDWOSB certification gives you access to <span className="text-pink-400 font-semibold">$26+ billion</span> in
            federal contract spending reserved for women-owned businesses.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — Find WOSB Opportunities
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              View Pricing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-pink-400">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WOSB vs EDWOSB */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            WOSB vs EDWOSB: What&apos;s the Difference?
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Both certifications open doors. EDWOSB opens more.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-pink-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-pink-400 mb-4">WOSB</h3>
              <p className="text-slate-400 mb-4">Women-Owned Small Business</p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">✓</span>
                  <span>51% owned by women</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">✓</span>
                  <span>Managed by women</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">✓</span>
                  <span>Access to WOSB set-asides</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-1">✓</span>
                  <span>Eligible in designated NAICS</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-rose-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-rose-400 mb-4">EDWOSB</h3>
              <p className="text-slate-400 mb-4">Economically Disadvantaged WOSB</p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">✓</span>
                  <span>All WOSB benefits, plus:</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">✓</span>
                  <span>Access to EDWOSB set-asides</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">✓</span>
                  <span>Sole-source up to $7M (services)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 mt-1">✓</span>
                  <span>Sole-source up to $4M (goods)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Built for Women-Owned Success
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-pink-500/50 transition">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Industries */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Top Industries for WOSB Contracts
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            WOSB set-asides are available in underrepresented industries. Here&apos;s where the opportunities are.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { industry: 'Professional Services', naics: '541xxx', spend: '$5.2B' },
              { industry: 'IT Services', naics: '541512', spend: '$3.8B' },
              { industry: 'Construction', naics: '236xxx', spend: '$2.9B' },
              { industry: 'Healthcare Support', naics: '621xxx', spend: '$2.1B' },
              { industry: 'Administrative Services', naics: '561xxx', spend: '$1.8B' },
              { industry: 'Engineering Services', naics: '541330', spend: '$1.5B' },
              { industry: 'R&D Services', naics: '541715', spend: '$1.2B' },
              { industry: 'Staffing & HR', naics: '561320', spend: '$980M' },
            ].map((item) => (
              <div key={item.industry} className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <div className="text-white font-semibold">{item.industry}</div>
                  <div className="text-slate-500 text-sm">NAICS {item.naics}</div>
                </div>
                <div className="text-pink-400 font-bold">{item.spend}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            WOSB Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/wosb-certification" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-pink-500/50 transition">
              <h3 className="text-white font-bold mb-2">WOSB Certification Guide</h3>
              <p className="text-slate-400 text-sm">Complete guide to getting WOSB and EDWOSB certified.</p>
              <span className="text-pink-400 text-sm font-medium mt-3 inline-block">Read Guide →</span>
            </Link>
            <Link href="/guides/8a-vs-hubzone-vs-sdvosb" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-pink-500/50 transition">
              <h3 className="text-white font-bold mb-2">WOSB vs Other Certs</h3>
              <p className="text-slate-400 text-sm">Compare WOSB benefits to 8(a), HUBZone, and SDVOSB.</p>
              <span className="text-pink-400 text-sm font-medium mt-3 inline-block">Compare →</span>
            </Link>
            <Link href="/data/agencies" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-pink-500/50 transition">
              <h3 className="text-white font-bold mb-2">Agency Intelligence</h3>
              <p className="text-slate-400 text-sm">Find agencies prioritizing women-owned contractors.</p>
              <span className="text-pink-400 text-sm font-medium mt-3 inline-block">Explore Agencies →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-pink-900/30 to-slate-900 border border-pink-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Your Certification Deserves Results
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start free and find WOSB opportunities matched to your capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold text-lg transition-all"
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
