import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'APEX Accelerator Partnership — Help Your Clients Win More Contracts',
  description: 'Give your APEX Accelerator clients free access to federal contract intelligence. Track client wins for DoD reporting. Strengthen your grant renewal with documented outcomes.',
  path: '/for/apex-accelerators',
  keywords: [
    'apex accelerator partnership',
    'ptac software',
    'apex client tools',
    'dod contractor assistance',
    'apex grant reporting',
    'defense industrial base',
    'ptac client resources',
  ],
});

const metrics = [
  { value: '92', label: 'APEX Centers Nationwide' },
  { value: '$64.9B', label: 'Client Wins (FY24-25)' },
  { value: '$55M', label: 'DoD APEX Funding' },
  { value: '35%', label: 'Critical Tech Mandate' },
];

const painPoints = [
  {
    icon: '📊',
    title: 'Grant Reporting Pressure',
    description: 'DoD measures your success by client contract wins. But tracking those wins across hundreds of clients is manual and time-consuming.',
  },
  {
    icon: '🎯',
    title: 'Critical Tech Mandate',
    description: '35% of contracts must align with DoD Critical Tech Areas. How do you steer clients toward AI, cyber, microelectronics, and space opportunities?',
  },
  {
    icon: '💸',
    title: 'Tool Budget Constraints',
    description: 'GovWin costs $500+/month per user. You can\'t afford enterprise tools for every client. So they\'re stuck with SAM.gov.',
  },
];

const solutions = [
  {
    icon: '🆓',
    title: 'Free for All Your Clients',
    description: 'MI Free gives every client daily opportunity alerts, CAGE lookup, and expiring contract finder. No cost to you or them.',
    highlight: 'Zero budget impact',
  },
  {
    icon: '📈',
    title: 'Track Client Wins',
    description: 'When your clients win contracts through MI, we track it. One-click export for your annual DoD report showing program outcomes.',
    highlight: 'Simplify grant reporting',
  },
  {
    icon: '🛡️',
    title: 'Critical Tech Filters',
    description: 'Built-in filters for DoD Critical Tech Areas: AI, cybersecurity, microelectronics, hypersonics, space. Help clients find priority contracts.',
    highlight: 'Meet DoD mandates',
  },
  {
    icon: '🤝',
    title: 'Coach Dashboard',
    description: 'See which clients are active, what they\'re pursuing, and where they need help. Proactive counseling, not reactive firefighting.',
    highlight: 'Better client engagement',
  },
];

const comparison = [
  { feature: 'Free tier for clients', mi: true, govwin: false, govtribe: false },
  { feature: 'APEX partner program', mi: true, govwin: false, govtribe: false },
  { feature: 'Coach/advisor dashboard', mi: true, govwin: false, govtribe: false },
  { feature: 'Grant reporting export', mi: true, govwin: false, govtribe: false },
  { feature: 'Critical Tech Area filters', mi: true, govwin: true, govtribe: false },
  { feature: 'White-label option', mi: true, govwin: false, govtribe: false },
  { feature: 'Price per user', mi: 'Free/$49', govwin: '$200+', govtribe: '$99+' },
];

export default function ApexAcceleratorsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants for APEX Accelerators',
        description: 'Federal contract intelligence partnership for APEX Accelerator centers.',
        url: `${SITE_URL}/for/apex-accelerators`,
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-semibold">APEX ACCELERATOR PARTNERSHIP</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Help Your Clients Win.</span><br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Strengthen Your Grant.
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Give every client access to federal contract intelligence — <span className="text-green-400 font-semibold">at no cost</span>.
            Track their wins for DoD reporting. Turn client outcomes into grant justification.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="https://calendly.com/govconedumeet/apex-partnership"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
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
                <div className="text-2xl md:text-3xl font-black text-green-400">{stat.value}</div>
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
            The APEX Challenge
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Your funding depends on client outcomes. But helping hundreds of clients find and win contracts —
            while tracking results for DoD — is a massive lift.
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
          <div className="bg-gradient-to-br from-green-900/20 to-slate-900 border border-green-500/30 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              The Partnership Pitch
            </h2>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              <p className="text-lg text-slate-300 italic">
                &quot;If 100 of your clients use MI and win 50 more contracts worth $5M total, that&apos;s
                <span className="text-green-400 font-semibold"> 100 jobs created</span> +
                <span className="text-green-400 font-semibold"> $2M in capital accessed</span>.
                Those numbers go straight into your annual DoD report and strengthen your grant renewal.&quot;
              </p>
            </div>
            <p className="text-slate-400 text-center mt-6">
              MI isn&apos;t just a tool for your clients. It&apos;s a <span className="text-green-400 font-semibold">funding justification system</span> for your center.
            </p>
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
              <div key={solution.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{solution.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{solution.title}</h3>
                    <p className="text-slate-400 text-sm mb-3">{solution.description}</p>
                    <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full">
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
            Why APEX Centers Choose Us
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Enterprise tools aren&apos;t built for public service organizations. We are.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Feature</th>
                  <th className="text-center py-4 px-4 text-green-400 font-bold">MI</th>
                  <th className="text-center py-4 px-4 text-slate-500 font-medium">GovWin</th>
                  <th className="text-center py-4 px-4 text-slate-500 font-medium">GovTribe</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-slate-800">
                    <td className="py-4 px-4 text-white">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.mi === 'boolean' ? (
                        row.mi ? <span className="text-green-400 text-xl">✓</span> : <span className="text-slate-600">—</span>
                      ) : (
                        <span className="text-green-400 font-semibold">{row.mi}</span>
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
                      {typeof row.govtribe === 'boolean' ? (
                        row.govtribe ? <span className="text-slate-400">✓</span> : <span className="text-slate-600">—</span>
                      ) : (
                        <span className="text-slate-400">{row.govtribe}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How the Partnership Works
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">We Onboard Your Center</h3>
                <p className="text-slate-400">
                  Quick call to understand your client base, NAICS focus areas, and reporting needs.
                  We&apos;ll customize your coach dashboard and client signup flow.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Your Clients Get Free Access</h3>
                <p className="text-slate-400">
                  Send clients to your custom signup link. They get MI Free instantly — daily alerts,
                  CAGE lookup, expiring contracts, and more. No credit card required.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Track Engagement & Wins</h3>
                <p className="text-slate-400">
                  See client activity in your dashboard. When they report contract wins through MI,
                  those outcomes are tracked and attributed to your center.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0">4</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Export for DoD Reporting</h3>
                <p className="text-slate-400">
                  At report time, export client outcomes with one click. Contract wins, dollars awarded,
                  jobs created — all documented and ready for your annual submission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Placeholder */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8">
            Trusted by Defense Industrial Base Programs
          </h2>
          <p className="text-slate-400 mb-8">
            Join the growing network of APEX Accelerators using MI to serve their clients better.
          </p>
          <div className="flex justify-center gap-8 opacity-50">
            <div className="text-slate-500 text-sm">Partner logos coming soon</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Strengthen Your Grant Renewal
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Let&apos;s discuss how MI can help your clients win more contracts —
            and give you the outcomes data to prove it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://calendly.com/govconedumeet/apex-partnership"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Schedule Partnership Call
            </Link>
            <Link
              href="mailto:partnerships@govcongiants.com?subject=APEX%20Partnership%20Inquiry"
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
