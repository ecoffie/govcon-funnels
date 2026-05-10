import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: '8(a) Contracting Software — Find Sole-Source & Set-Aside Opportunities',
  description: 'Federal contracting intelligence built for 8(a) certified businesses. Find 8(a) sole-source opportunities, set-asides, and teaming partners. Track your 9-year program window.',
  path: '/for/8a-contractors',
  keywords: [
    '8a contracting software',
    '8a sole source opportunities',
    '8a set aside finder',
    '8a certification opportunities',
    'sba 8a contracts',
    '8a business development',
    'federal 8a opportunities',
  ],
});

const features = [
  {
    icon: '🎯',
    title: '8(a) Set-Aside Filter',
    description: 'Filter opportunities specifically for 8(a) set-asides. See only the contracts you\'re eligible to compete for.',
  },
  {
    icon: '💎',
    title: 'Sole-Source Tracking',
    description: 'Monitor 8(a) sole-source opportunities up to $4.5M (goods) or $7M (services). The fastest path to your first federal win.',
  },
  {
    icon: '📊',
    title: 'Program Timeline Tracker',
    description: 'Track your 9-year 8(a) program window. Get reminders for key milestones and certification renewals.',
  },
  {
    icon: '🏛️',
    title: 'Agency 8(a) Spending',
    description: 'See which agencies spend the most with 8(a) contractors. Target agencies that prioritize your certification.',
  },
  {
    icon: '📇',
    title: 'Prime Contractor Contacts',
    description: '800+ SBLO contacts at primes actively seeking 8(a) subcontractors for their contracts.',
  },
  {
    icon: '🔮',
    title: 'Forecast Intelligence',
    description: '7,700+ forecasted opportunities. Know what\'s coming before it hits SAM.gov.',
  },
];

const stats = [
  { value: '$29B+', label: '8(a) contract spending annually' },
  { value: '4,500+', label: '8(a) set-asides in our database' },
  { value: '$4.5M', label: 'Sole-source threshold (goods)' },
  { value: '$7M', label: 'Sole-source threshold (services)' },
];

export default function EightAContractorsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants for 8(a) Contractors',
        description: 'Federal contracting intelligence built for 8(a) certified businesses.',
        url: `${SITE_URL}/for/8a-contractors`,
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <span className="text-blue-400 font-semibold">FOR 8(a) CONTRACTORS</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Maximize Your</span><br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              8(a) Certification
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Your 8(a) certification opens doors to <span className="text-blue-400 font-semibold">$29 billion</span> in
            annual contract spending. But only if you find the right opportunities. We help you find them.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — Find 8(a) Opportunities
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
                <div className="text-2xl md:text-3xl font-black text-blue-400">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            The 8(a) Challenge
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            You worked hard to get certified. Now the clock is ticking on your 9-year window.
            Every month without a win is opportunity lost.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">⏰</div>
              <h3 className="text-white font-bold mb-2">Limited Time</h3>
              <p className="text-slate-400 text-sm">
                9 years sounds like a lot until you realize it takes 6-18 months to win your first contract.
                Every day counts.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">🔍</div>
              <h3 className="text-white font-bold mb-2">Hidden Opportunities</h3>
              <p className="text-slate-400 text-sm">
                Sole-source opportunities don&apos;t always post publicly. By the time you see them on SAM.gov,
                someone else has been cultivating them for months.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">🏢</div>
              <h3 className="text-white font-bold mb-2">Competition</h3>
              <p className="text-slate-400 text-sm">
                Over 9,000 active 8(a) firms competing for the same set-asides. You need intelligence
                to find opportunities others miss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Built for 8(a) Success
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How 8(a) Contractors Use Our Platform
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Set Up Your 8(a) Profile</h3>
                <p className="text-slate-400">
                  Tell us your NAICS codes, geographic preferences, and contract size sweet spot.
                  We&apos;ll filter opportunities specifically for your capabilities.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Get Daily 8(a) Alerts</h3>
                <p className="text-slate-400">
                  Our AI scans thousands of opportunities daily and surfaces 8(a) set-asides and potential
                  sole-source opportunities matched to your profile.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Build Your Pipeline</h3>
                <p className="text-slate-400">
                  Track opportunities in your pipeline, connect with prime contractors for teaming,
                  and research agencies that prioritize 8(a) spending.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0">4</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Win Before Your Window Closes</h3>
                <p className="text-slate-400">
                  With better intelligence, you find opportunities faster, build relationships earlier,
                  and submit stronger bids. That&apos;s how you maximize your 8(a) certification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            8(a) Contractor Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/8a-certification" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition">
              <h3 className="text-white font-bold mb-2">8(a) Certification Guide</h3>
              <p className="text-slate-400 text-sm">Complete guide to getting and maintaining your 8(a) status.</p>
              <span className="text-blue-400 text-sm font-medium mt-3 inline-block">Read Guide →</span>
            </Link>
            <Link href="/guides/8a-vs-hubzone-vs-sdvosb" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition">
              <h3 className="text-white font-bold mb-2">8(a) vs Other Certifications</h3>
              <p className="text-slate-400 text-sm">How 8(a) compares to HUBZone, SDVOSB, and WOSB programs.</p>
              <span className="text-blue-400 text-sm font-medium mt-3 inline-block">Compare →</span>
            </Link>
            <Link href="/data/agencies" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition">
              <h3 className="text-white font-bold mb-2">Agency Intelligence</h3>
              <p className="text-slate-400 text-sm">See which agencies spend the most with 8(a) contractors.</p>
              <span className="text-blue-400 text-sm font-medium mt-3 inline-block">Explore Agencies →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Make Your 8(a) Certification Count
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start free and find 8(a) opportunities matched to your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all"
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
