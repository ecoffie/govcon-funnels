import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'SDVOSB Contracting Software — Find Veteran Set-Aside Opportunities',
  description: 'Federal contracting intelligence for Service-Disabled Veteran-Owned Small Businesses. Find SDVOSB and VOSB set-asides at VA, DoD, and all federal agencies.',
  path: '/for/sdvosb',
  keywords: [
    'sdvosb contracting software',
    'sdvosb opportunities',
    'veteran owned business contracts',
    'sdvosb set aside',
    'va sdvosb contracts',
    'vosb federal contracts',
    'service disabled veteran business',
  ],
});

const features = [
  {
    icon: '🎖️',
    title: 'SDVOSB Set-Aside Filter',
    description: 'Filter opportunities specifically for SDVOSB set-asides across all federal agencies, not just VA.',
  },
  {
    icon: '🏛️',
    title: 'VA Opportunity Tracking',
    description: 'VA has the highest SDVOSB spending. We track all VA opportunities and forecast upcoming needs.',
  },
  {
    icon: '🎯',
    title: 'DoD Veteran Priorities',
    description: 'DoD increasingly prioritizes veteran-owned businesses. Track defense opportunities that match your capabilities.',
  },
  {
    icon: '📇',
    title: 'Prime Contractor Teaming',
    description: '800+ SBLO contacts at primes seeking SDVOSB subcontractors to meet their small business goals.',
  },
  {
    icon: '📊',
    title: 'Agency SDVOSB Spending',
    description: 'See which agencies are meeting (or missing) their 3% SDVOSB goals — those missing are motivated buyers.',
  },
  {
    icon: '🔮',
    title: 'Forecast Intelligence',
    description: 'Know what\'s coming before it posts. 7,700+ forecasted opportunities in our database.',
  },
];

const stats = [
  { value: '$28B+', label: 'Annual SDVOSB spending' },
  { value: '3%', label: 'Mandatory federal goal' },
  { value: '4.5%', label: 'Actual achievement' },
  { value: '$4M', label: 'Sole-source threshold' },
];

export default function SDVOSBPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants for SDVOSB Contractors',
        description: 'Federal contracting intelligence for Service-Disabled Veteran-Owned Small Businesses.',
        url: `${SITE_URL}/for/sdvosb`,
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-400 font-semibold">FOR SDVOSB CONTRACTORS</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Federal Contracts for</span><br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Veteran-Owned Businesses
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            You served your country. Now leverage your <span className="text-amber-400 font-semibold">SDVOSB certification</span> to
            win federal contracts. We help you find the opportunities that value your service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — Find SDVOSB Opportunities
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
                <div className="text-2xl md:text-3xl font-black text-amber-400">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VA Focus */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                The VA Advantage
              </h2>
              <p className="text-slate-400 mb-4">
                The Department of Veterans Affairs is the largest buyer of SDVOSB services, with a statutory
                goal to award contracts to veteran-owned businesses whenever possible.
              </p>
              <p className="text-slate-400 mb-4">
                The Veterans First Contracting Program gives verified SDVOSBs priority on VA contracts —
                but you need to know where to look.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  VA healthcare facility opportunities
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  IT modernization projects
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  Construction and facilities
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-amber-400">✓</span>
                  Professional services contracts
                </li>
              </ul>
            </div>
            <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">VA SDVOSB Spending by Category</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Professional Services</span>
                    <span className="text-amber-400">$4.2B</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">IT & Technology</span>
                    <span className="text-amber-400">$3.1B</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Construction</span>
                    <span className="text-amber-400">$2.4B</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Medical & Healthcare</span>
                    <span className="text-amber-400">$1.8B</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Built for Veteran-Owned Success
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond VA */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            SDVOSB Opportunities Beyond VA
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            While VA is the biggest buyer, every federal agency has SDVOSB goals. We track opportunities across all agencies.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { agency: 'Department of Defense', spend: '$8.2B' },
              { agency: 'Department of VA', spend: '$6.1B' },
              { agency: 'GSA', spend: '$2.4B' },
              { agency: 'DHS', spend: '$1.8B' },
              { agency: 'HHS', spend: '$1.2B' },
              { agency: 'DOE', spend: '$890M' },
              { agency: 'Army Corps', spend: '$720M' },
              { agency: 'Other Agencies', spend: '$6.7B' },
            ].map((item) => (
              <div key={item.agency} className="bg-slate-900 border border-slate-800 rounded-lg p-4 text-center">
                <div className="text-amber-400 font-bold">{item.spend}</div>
                <div className="text-slate-400 text-sm">{item.agency}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            SDVOSB Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/vosb-certification" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition">
              <h3 className="text-white font-bold mb-2">SDVOSB Certification Guide</h3>
              <p className="text-slate-400 text-sm">Complete guide to SBA veteran certification process.</p>
              <span className="text-amber-400 text-sm font-medium mt-3 inline-block">Read Guide →</span>
            </Link>
            <Link href="/guides/8a-vs-hubzone-vs-sdvosb" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition">
              <h3 className="text-white font-bold mb-2">SDVOSB vs Other Certs</h3>
              <p className="text-slate-400 text-sm">Compare SDVOSB benefits to 8(a), HUBZone, and WOSB.</p>
              <span className="text-amber-400 text-sm font-medium mt-3 inline-block">Compare →</span>
            </Link>
            <Link href="/data/agencies" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition">
              <h3 className="text-white font-bold mb-2">Agency Intelligence</h3>
              <p className="text-slate-400 text-sm">Find agencies prioritizing SDVOSB contractors.</p>
              <span className="text-amber-400 text-sm font-medium mt-3 inline-block">Explore Agencies →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-amber-900/30 to-slate-900 border border-amber-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Your Service Earned This Opportunity
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start free and find SDVOSB set-asides matched to your capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-lg transition-all"
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
