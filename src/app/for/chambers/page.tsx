import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { PARTNERSHIP_CALL_URL } from '@/lib/booking';

export const metadata = generateSeo({
  title: 'Chamber of Commerce Partnership — Member Benefit That Drives Results',
  description: 'Add federal contracting intelligence to your chamber membership. Help members access $750B in government contracts. Increase member retention with tangible ROI.',
  path: '/for/chambers',
  keywords: [
    'chamber of commerce partnership',
    'chamber member benefits',
    'chamber government contracts',
    'small business chamber programs',
    'chamber member retention',
    'chamber value proposition',
    'local chamber benefits',
  ],
});

const metrics = [
  { value: '$750B+', label: 'Federal Contract Spending' },
  { value: '4,000+', label: 'Chambers Nationwide' },
  { value: '23%', label: 'Small Biz Pursuing GovCon' },
  { value: '3x', label: 'Higher Retention with ROI Benefits' },
];

const painPoints = [
  {
    icon: '📉',
    title: 'Member Retention',
    description: 'Members join, attend a few events, then cancel. You need benefits that deliver measurable business value.',
  },
  {
    icon: '🎯',
    title: 'Standing Out',
    description: 'Every chamber offers networking and advocacy. How do you differentiate when competing for members?',
  },
  {
    icon: '💼',
    title: 'Revenue Diversification',
    description: 'Dues and events only go so far. You need new revenue streams that also benefit members.',
  },
];

const solutions = [
  {
    icon: '🎁',
    title: 'Premium Member Benefit',
    description: 'Mindy Free for all members. Mindy Pro at discounted rates. Position government contracts as an exclusive chamber benefit.',
    highlight: 'Increase perceived value',
  },
  {
    icon: '📊',
    title: 'Track Member Wins',
    description: 'When members win government contracts through MI, you get notified. Showcase success stories in your newsletter.',
    highlight: 'Prove member ROI',
  },
  {
    icon: '💵',
    title: 'Revenue Share',
    description: 'Earn referral revenue when members upgrade to paid tiers. New revenue stream that aligns with member success.',
    highlight: 'Diversify income',
  },
  {
    icon: '🎓',
    title: 'GovCon Programming',
    description: 'We provide lunch-and-learn content, workshop materials, and speaker support. You deliver expert programming without hiring experts.',
    highlight: 'Ready-made events',
  },
];

const benefits = [
  {
    title: 'For Members',
    items: [
      'Free access to Mindy Free (daily alerts, CAGE lookup)',
      'Discounted Mindy Pro subscription ($49/mo vs $149)',
      'Access to GovCon training library',
      'Invitation to GovCon workshops',
      'Connection to teaming partner network',
    ],
  },
  {
    title: 'For Your Chamber',
    items: [
      'Differentiated membership value proposition',
      'Revenue share on paid conversions',
      'Member success stories for marketing',
      'Ready-made event programming',
      'Co-branded resources and landing page',
    ],
  },
];

const useCases = [
  {
    chamber: 'Metro Chamber',
    situation: '5,000 members, high churn rate, looking for unique benefits',
    result: 'Added MI as premium member benefit. 47 members won government contracts in year 1. Featured wins in monthly newsletter. Retention up 12%.',
  },
  {
    chamber: 'Defense Industry Chamber',
    situation: 'Regional chamber near military base, members want DoD contracts',
    result: 'Partnered for DoD-focused programming. 3 lunch-and-learns per year. MI filters opportunities by local installations. 23 new members joined specifically for GovCon benefit.',
  },
  {
    chamber: 'Minority Business Chamber',
    situation: 'Members eligible for 8(a), WOSB, HUBZone set-asides',
    result: 'MI filters by certification. Members find set-asides matched to their status. 31 contract wins totaling $4.2M in year 1.',
  },
];

export default function ChambersPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants for Chambers of Commerce',
        description: 'Federal contract intelligence partnership for Chambers of Commerce.',
        url: `${SITE_URL}/for/chambers`,
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="text-amber-400 font-semibold">CHAMBER PARTNERSHIP</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Member Benefits That</span><br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Actually Deliver ROI
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Government contracts are the ultimate member benefit — <span className="text-amber-400 font-semibold">$750 billion in annual spending</span>.
            Help your members access it. Keep them renewing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href={PARTNERSHIP_CALL_URL}
              className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Schedule Partnership Call
            </Link>
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              See What Members Get
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {metrics.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-amber-400">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            The Chamber Challenge
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Networking and advocacy are table stakes. You need member benefits that deliver
            measurable business results — or they&apos;ll find a chamber that does.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((pain) => (
              <div key={pain.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-3xl mb-3">{pain.icon}</div>
                <h3 className="text-white font-bold mb-2">{pain.title}</h3>
                <p className="text-slate-400 text-sm">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-900/20 to-slate-900 border border-amber-500/30 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              The Retention Equation
            </h2>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              <p className="text-lg text-slate-300 italic">
                &quot;A member who wins a $200K government contract because of your chamber&apos;s GovCon benefit
                isn&apos;t questioning their $500 annual dues. They&apos;re renewing for life.&quot;
              </p>
            </div>
            <p className="text-slate-400 text-center mt-6">
              Tangible wins create loyal members. MI helps your members win.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Your Chamber Gets
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution) => (
              <div key={solution.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{solution.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{solution.title}</h3>
                    <p className="text-slate-400 text-sm mb-3">{solution.description}</p>
                    <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full">
                      {solution.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Breakdown */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Benefits Breakdown
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((group) => (
              <div key={group.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-amber-400 mb-4">{group.title}</h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-300">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            How Chambers Use This
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Real scenarios from chambers like yours
          </p>

          <div className="space-y-6">
            {useCases.map((useCase) => (
              <div key={useCase.chamber} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    {useCase.chamber.charAt(0)}
                  </div>
                  <h3 className="text-white font-bold">{useCase.chamber}</h3>
                </div>
                <p className="text-slate-500 text-sm mb-3">
                  <strong className="text-slate-400">Situation:</strong> {useCase.situation}
                </p>
                <p className="text-slate-300">
                  <strong className="text-amber-400">Result:</strong> {useCase.result}
                </p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-center mt-6 text-sm">
            * Hypothetical scenarios based on typical chamber partnerships
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Getting Started
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Partnership Call</h3>
                <p className="text-slate-400">
                  30-minute call to understand your member base, industries, and goals.
                  We&apos;ll customize the partnership to fit your chamber.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Co-Branded Setup</h3>
                <p className="text-slate-400">
                  We create a custom signup page with your logo and messaging.
                  Members sign up as your chamber&apos;s clients.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Launch & Promote</h3>
                <p className="text-slate-400">
                  Announce the new benefit. We provide email copy, social graphics, and event materials.
                  Host a kickoff webinar together.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center flex-shrink-0">4</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Track & Celebrate</h3>
                <p className="text-slate-400">
                  We report on member engagement and wins. You showcase success stories
                  and demonstrate ROI at renewal time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-amber-900/30 to-slate-900 border border-amber-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Give Members a Reason to Renew
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Let&apos;s discuss how MI can become your chamber&apos;s most valuable member benefit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={PARTNERSHIP_CALL_URL}
              className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Schedule Partnership Call
            </Link>
            <Link
              href="mailto:partnerships@govcongiants.com?subject=Chamber%20Partnership%20Inquiry"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              Email Us
            </Link>
          </div>
          <p className="text-slate-500 text-sm mt-6">
            Questions? Contact partnerships@govcongiants.com
          </p>
        </div>
      </section>
    </main>
  );
}
