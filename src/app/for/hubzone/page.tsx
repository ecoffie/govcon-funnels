import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'HUBZone Contracting Software — Find HUBZone Set-Aside Opportunities',
  description: 'Federal contracting intelligence for HUBZone certified businesses. Find HUBZone set-asides, leverage your 10% price evaluation preference, and track opportunities by region.',
  path: '/for/hubzone',
  keywords: [
    'hubzone contracting software',
    'hubzone opportunities',
    'hubzone set aside',
    'hubzone certification contracts',
    'hubzone price preference',
    'hubzone federal contracts',
  ],
});

const features = [
  {
    icon: '📍',
    title: 'HUBZone Set-Aside Filter',
    description: 'Filter opportunities specifically for HUBZone set-asides. See contracts where your certification gives you an advantage.',
  },
  {
    icon: '💰',
    title: 'Price Preference Tracking',
    description: 'Identify full-and-open competitions where your 10% price evaluation preference can be the difference between winning and losing.',
  },
  {
    icon: '🗺️',
    title: 'Geographic Intelligence',
    description: 'Track opportunities by your HUBZone regions. See which areas have the most contract activity.',
  },
  {
    icon: '🏛️',
    title: 'Agency HUBZone Goals',
    description: 'Agencies have 3% HUBZone spending goals. Target agencies behind on their goals — they\'re motivated buyers.',
  },
  {
    icon: '📇',
    title: 'Prime Teaming Contacts',
    description: '800+ SBLO contacts at primes who need HUBZone subcontractors to meet their small business requirements.',
  },
  {
    icon: '🔮',
    title: 'Forecast Intelligence',
    description: '7,700+ forecasted opportunities. Know what\'s coming and position early.',
  },
];

const stats = [
  { value: '$15B+', label: 'Annual HUBZone spending' },
  { value: '3%', label: 'Federal HUBZone goal' },
  { value: '10%', label: 'Price preference' },
  { value: '$4M', label: 'Sole-source threshold' },
];

export default function HUBZonePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants for HUBZone Contractors',
        description: 'Federal contracting intelligence for HUBZone certified businesses.',
        url: `${SITE_URL}/for/hubzone`,
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
            <span className="text-purple-400 font-semibold">FOR HUBZONE CONTRACTORS</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Maximize Your</span><br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              HUBZone Advantage
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Your HUBZone certification gives you a <span className="text-purple-400 font-semibold">10% price preference</span> on
            full-and-open competitions — plus access to HUBZone set-asides. We help you find both.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — Find HUBZone Opportunities
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
                <div className="text-2xl md:text-3xl font-black text-purple-400">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The HUBZone Advantage */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            The HUBZone Advantage
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            HUBZone certification offers unique benefits that other certifications don&apos;t.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-white font-bold mb-2">10% Price Preference</h3>
              <p className="text-slate-400 text-sm">
                On full-and-open competitions, your bid is evaluated as if it&apos;s 10% lower. This is huge for competitive pricing.
              </p>
            </div>
            <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-white font-bold mb-2">Set-Aside Contracts</h3>
              <p className="text-slate-400 text-sm">
                Compete only against other HUBZone firms on set-asides. Less competition, better odds.
              </p>
            </div>
            <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="text-white font-bold mb-2">Sole-Source Up to $4M</h3>
              <p className="text-slate-400 text-sm">
                Agencies can award you contracts up to $4 million without competition if you&apos;re HUBZone certified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Built for HUBZone Success
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HUBZone Maintenance */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Keeping Your HUBZone Status
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            HUBZone has strict residency requirements. We help you track compliance while you chase contracts.
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">HUBZone Requirements Checklist</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span><strong>Principal Office:</strong> Must be in a designated HUBZone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span><strong>Employee Residency:</strong> 35% of employees must live in HUBZone areas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span><strong>Size Standard:</strong> Must meet SBA size standards for your NAICS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span><strong>Recertification:</strong> Annual recertification required</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            HUBZone Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/hubzone-certification" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <h3 className="text-white font-bold mb-2">HUBZone Certification Guide</h3>
              <p className="text-slate-400 text-sm">Complete guide to getting and maintaining HUBZone status.</p>
              <span className="text-purple-400 text-sm font-medium mt-3 inline-block">Read Guide →</span>
            </Link>
            <Link href="/guides/8a-vs-hubzone-vs-sdvosb" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <h3 className="text-white font-bold mb-2">HUBZone vs Other Certs</h3>
              <p className="text-slate-400 text-sm">Compare HUBZone benefits to 8(a), SDVOSB, and WOSB.</p>
              <span className="text-purple-400 text-sm font-medium mt-3 inline-block">Compare →</span>
            </Link>
            <Link href="/data/agencies" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <h3 className="text-white font-bold mb-2">Agency Intelligence</h3>
              <p className="text-slate-400 text-sm">Find agencies prioritizing HUBZone contractors.</p>
              <span className="text-purple-400 text-sm font-medium mt-3 inline-block">Explore Agencies →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900/30 to-slate-900 border border-purple-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Make Your HUBZone Work Harder
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start free and find opportunities where your certification matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-lg transition-all"
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
