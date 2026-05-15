import Link from 'next/link';
import { PARTNERSHIP_CALL_URL } from '@/lib/booking';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'SBDC Partnership — Help Clients Access Federal Capital',
  description: 'Give your SBDC clients free access to federal contract intelligence. Track capital accessed and jobs created for SBA reporting. Prove 10x ROI on your funding.',
  path: '/for/sbdc',
  keywords: [
    'sbdc partnership',
    'small business development center tools',
    'sbdc client resources',
    'sba grant reporting',
    'sbdc capital accessed',
    'sbdc jobs created',
    'government contracting sbdc',
  ],
});

const metrics = [
  { value: '1,000+', label: 'SBDC Centers Nationwide' },
  { value: '$7.8B', label: 'Capital Accessed Annually' },
  { value: '80,000+', label: 'Jobs Created Annually' },
  { value: '10x', label: 'ROI Claimed to Congress' },
];

const painPoints = [
  {
    icon: '💰',
    title: 'Capital Access Metrics',
    description: 'SBA measures your success by capital your clients access. Government contracts are capital — but are you tracking them?',
  },
  {
    icon: '👥',
    title: 'Jobs Created Reporting',
    description: 'Every contract win creates jobs. But connecting client wins to your center\'s annual report is tedious manual work.',
  },
  {
    icon: '🎓',
    title: 'GovCon Expertise Gap',
    description: 'Most advisors aren\'t government contracting experts. How do you guide clients through FAR, SAM.gov, and contract vehicles?',
  },
];

const solutions = [
  {
    icon: '🆓',
    title: 'Free for Every Client',
    description: 'MI Free gives every client daily opportunity alerts, CAGE code lookup, and contract research tools. Zero cost to your center.',
    highlight: 'No budget required',
  },
  {
    icon: '💵',
    title: 'Track Capital Accessed',
    description: 'When clients win contracts through MI, those dollars count as capital accessed. Automatic attribution to your center for SBA reporting.',
    highlight: 'Boost your #1 metric',
  },
  {
    icon: '📊',
    title: 'Jobs Created Calculator',
    description: 'Our formula converts contract wins to estimated jobs. Export-ready numbers for your annual SBA submission.',
    highlight: 'Simplify reporting',
  },
  {
    icon: '🎓',
    title: 'GovCon Training Library',
    description: 'Point clients to our guides, videos, and courses. Fill your expertise gap with curated content from former contracting officers.',
    highlight: 'Become GovCon experts',
  },
];

const comparison = [
  { feature: 'Free tier for clients', mi: true, govwin: false, deltek: false },
  { feature: 'SBDC partner program', mi: true, govwin: false, deltek: false },
  { feature: 'Advisor dashboard', mi: true, govwin: false, deltek: false },
  { feature: 'SBA reporting export', mi: true, govwin: false, deltek: false },
  { feature: 'Training content library', mi: true, govwin: true, deltek: true },
  { feature: 'Co-branded resources', mi: true, govwin: false, deltek: false },
  { feature: 'Price per user', mi: 'Free/$149', govwin: '$200+', deltek: '$300+' },
];

const clientJourney = [
  {
    stage: 'Discovery',
    without: 'Client googles "how to get government contracts" and gets overwhelmed',
    with: 'You send them to your SBDC\'s MI signup page — instant access to real opportunities',
  },
  {
    stage: 'Research',
    without: 'Client struggles with SAM.gov for weeks, doesn\'t understand what they\'re looking at',
    with: 'Client gets curated opportunities matched to their NAICS, set-aside eligibility, and location',
  },
  {
    stage: 'Pursuit',
    without: 'Client asks you questions you can\'t answer about RFPs, past performance, pricing',
    with: 'Client accesses training library and guides. You look like a GovCon expert.',
  },
  {
    stage: 'Win',
    without: 'Client wins a contract. You find out 6 months later (or never).',
    with: 'Client logs win in MI. You get notified. Capital accessed goes on your report.',
  },
];

export default function SBDCPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants for SBDCs',
        description: 'Federal contract intelligence partnership for Small Business Development Centers.',
        url: `${SITE_URL}/for/sbdc`,
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <span className="text-blue-400 font-semibold">SBDC PARTNERSHIP</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Turn Client Wins Into</span><br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Grant Justification
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Government contracts are capital accessed. Jobs created. Economic impact.
            Help clients win more contracts — and prove your center&apos;s <span className="text-blue-400 font-semibold">10x ROI to SBA</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href={PARTNERSHIP_CALL_URL}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Schedule Partnership Call
            </Link>
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              See What Clients Get Free
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {metrics.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-blue-400">{stat.value}</div>
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
            The SBDC Challenge
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Your funding formula rewards capital accessed and jobs created.
            Government contracts deliver both — but only if you can track them.
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
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-500/30 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              The Funding Connection
            </h2>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              <p className="text-lg text-slate-300 italic">
                &quot;When your client wins a $500K government contract, that&apos;s
                <span className="text-blue-400 font-semibold"> $500K in capital accessed</span>,
                <span className="text-blue-400 font-semibold"> ~5 jobs created</span>, and
                <span className="text-blue-400 font-semibold"> direct economic impact</span>.
                Those are the exact metrics SBA uses to justify your funding.&quot;
              </p>
            </div>
            <p className="text-slate-400 text-center mt-6">
              Every contract win strengthens your annual report. MI helps you track them all.
            </p>
          </div>
        </div>
      </section>

      {/* Client Journey Comparison */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            The Client Journey: Without vs. With MI
          </h2>

          <div className="space-y-6">
            {clientJourney.map((journey) => (
              <div key={journey.stage} className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{journey.stage}</span>
                </div>
                <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4">
                  <span className="text-red-400 text-xs font-semibold mb-2 block">WITHOUT MI</span>
                  <p className="text-slate-400 text-sm">{journey.without}</p>
                </div>
                <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-4">
                  <span className="text-green-400 text-xs font-semibold mb-2 block">WITH MI</span>
                  <p className="text-slate-300 text-sm">{journey.with}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Your Center Gets
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution) => (
              <div key={solution.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{solution.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{solution.title}</h3>
                    <p className="text-slate-400 text-sm mb-3">{solution.description}</p>
                    <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full">
                      {solution.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Built for Public Service, Not Enterprise
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Enterprise tools charge per seat. We charge nothing for your clients.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-blue-400 font-bold">MI</th>
                  <th className="text-center py-4 px-4 text-slate-500 font-medium">GovWin</th>
                  <th className="text-center py-4 px-4 text-slate-500 font-medium">Deltek</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-slate-800">
                    <td className="py-4 px-4 text-white">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.mi === 'boolean' ? (
                        row.mi ? <span className="text-blue-400 text-xl">✓</span> : <span className="text-slate-600">—</span>
                      ) : (
                        <span className="text-blue-400 font-semibold">{row.mi}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.govwin === 'boolean' ? (
                        row.govwin ? <span className="text-slate-400">✓</span> : <span className="text-slate-600">—</span>
                      ) : (
                        <span className="text-slate-400">{row.govwin}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.deltek === 'boolean' ? (
                        row.deltek ? <span className="text-slate-400">✓</span> : <span className="text-slate-600">—</span>
                      ) : (
                        <span className="text-slate-400">{row.deltek}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prove Your 10x ROI
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Let&apos;s discuss how MI can help your clients win government contracts —
            and give you the metrics to justify your SBA funding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={PARTNERSHIP_CALL_URL}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Schedule Partnership Call
            </Link>
            <Link
              href="mailto:partnerships@govcongiants.com?subject=SBDC%20Partnership%20Inquiry"
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
