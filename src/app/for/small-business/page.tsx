import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Small Business Government Contracting Software — Find Federal Contracts',
  description: 'Federal contracting intelligence built for small businesses. Find set-asides, track opportunities, and compete with larger contractors. Start free, no credit card required.',
  path: '/for/small-business',
  keywords: [
    'small business government contracts',
    'small business set aside finder',
    'small business federal contracts',
    'government contracting small business',
    'sba small business contracts',
    'federal small business opportunities',
  ],
});

const setAsides = [
  {
    name: 'Small Business Set-Aside',
    code: 'SBA',
    description: 'General small business set-asides for any qualified small business',
    spend: '$145B+',
    link: '/for/small-business',
  },
  {
    name: '8(a) Business Development',
    code: '8(a)',
    description: 'Socially and economically disadvantaged small businesses',
    spend: '$29B+',
    link: '/for/8a-contractors',
  },
  {
    name: 'SDVOSB',
    code: 'SDVOSB',
    description: 'Service-Disabled Veteran-Owned Small Businesses',
    spend: '$28B+',
    link: '/for/sdvosb',
  },
  {
    name: 'WOSB/EDWOSB',
    code: 'WOSB',
    description: 'Women-Owned Small Businesses',
    spend: '$26B+',
    link: '/for/wosb',
  },
  {
    name: 'HUBZone',
    code: 'HUBZone',
    description: 'Historically Underutilized Business Zones',
    spend: '$15B+',
    link: '/for/hubzone',
  },
];

const features = [
  {
    icon: '🎯',
    title: 'Set-Aside Filters',
    description: 'Filter by SBA, 8(a), SDVOSB, WOSB, HUBZone, or any combination. See only opportunities you\'re eligible to compete for.',
  },
  {
    icon: '🏛️',
    title: 'Agency Intelligence',
    description: '200+ federal agencies analyzed with spending data, pain points, and small business goals. Know where to focus.',
  },
  {
    icon: '📇',
    title: 'Prime Contractor Contacts',
    description: '800+ SBLO contacts at large primes who need small business subcontractors for their contracts.',
  },
  {
    icon: '🔮',
    title: 'Forecast Intelligence',
    description: '7,700+ forecasted opportunities. Know what\'s coming before it hits SAM.gov.',
  },
  {
    icon: '📊',
    title: 'Pipeline CRM',
    description: 'Track opportunities from discovery to award. Stay organized without expensive enterprise tools.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Briefings',
    description: 'Daily intelligence briefings matched to your NAICS codes and certifications. Save 10+ hours/week.',
  },
];

const stats = [
  { value: '$175B+', label: 'Small business contract spending' },
  { value: '23%', label: 'Federal goal for small business' },
  { value: '27%', label: 'Actual small business achievement' },
  { value: '45K+', label: 'Small business contracts/year' },
];

export default function SmallBusinessPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants for Small Businesses',
        description: 'Federal contracting intelligence built for small businesses.',
        url: `${SITE_URL}/for/small-business`,
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-semibold">FOR SMALL BUSINESSES</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Compete for Federal Contracts</span><br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Without Enterprise Budgets
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            The federal government spends <span className="text-green-400 font-semibold">$175+ billion</span> with
            small businesses every year. You don&apos;t need a $25K/year GovWin subscription to find your share.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — No Credit Card
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
                <div className="text-2xl md:text-3xl font-black text-green-400">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Set-Aside Programs */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Small Business Set-Aside Programs
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            The government has specific spending goals for different categories of small businesses.
            We help you find opportunities in every category.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {setAsides.map((program) => (
              <Link
                key={program.code}
                href={program.link}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm font-bold">
                    {program.code}
                  </span>
                  <span className="text-green-400 font-bold">{program.spend}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition">
                  {program.name}
                </h3>
                <p className="text-slate-400 text-sm">{program.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Small Business Challenge */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            The Small Business Challenge
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Competing for federal contracts as a small business is hard. We built our platform to level the playing field.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-red-400">✗</span> Without Intelligence Tools
              </h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">→</span>
                  <span>Hours searching SAM.gov daily</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">→</span>
                  <span>Miss opportunities before they close</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">→</span>
                  <span>No insight into agency needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">→</span>
                  <span>Can&apos;t afford enterprise tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">→</span>
                  <span>Struggle to find teaming partners</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-green-400">✓</span> With GovCon Giants
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Daily AI briefings matched to your profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Alerts before opportunities close</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">→</span>
                  <span>Agency pain points and budgets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">→</span>
                  <span>$149/mo instead of $25K/year</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">→</span>
                  <span>800+ SBLO contacts for teaming</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything Small Businesses Need
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Enterprise Intelligence. Small Business Pricing.
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Why pay enterprise prices when you can get the intelligence you need at a fraction of the cost?
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-red-500/30 rounded-xl p-6 text-center">
              <div className="text-slate-400 text-sm mb-2">Deltek GovWin</div>
              <div className="text-3xl font-black text-white mb-1">$12,000+</div>
              <div className="text-slate-500 text-sm">per year</div>
            </div>
            <div className="bg-slate-900 border border-amber-500/30 rounded-xl p-6 text-center">
              <div className="text-slate-400 text-sm mb-2">GovTribe</div>
              <div className="text-3xl font-black text-white mb-1">$1,350+</div>
              <div className="text-slate-500 text-sm">per year</div>
            </div>
            <div className="bg-slate-900 border-2 border-green-500 rounded-xl p-6 text-center">
              <div className="text-green-400 text-sm mb-2 font-semibold">GovCon Giants</div>
              <div className="text-3xl font-black text-green-400 mb-1">$149/mo</div>
              <div className="text-slate-500 text-sm">or start free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Getting Started is Easy
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="text-white font-bold mb-2">Sign Up Free</h3>
              <p className="text-slate-400 text-sm">No credit card required. Get instant access to MI Free with basic features.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="text-white font-bold mb-2">Set Your Profile</h3>
              <p className="text-slate-400 text-sm">Tell us your NAICS codes, certifications, and preferences. We&apos;ll customize your feed.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="text-white font-bold mb-2">Find Opportunities</h3>
              <p className="text-slate-400 text-sm">Get daily alerts, explore agency intelligence, and build your pipeline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Win Federal Contracts?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of small businesses using GovCon Giants to find and win government work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free Today
            </Link>
            <Link
              href="/features"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              See All Features
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
