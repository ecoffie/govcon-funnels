import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Partnership Programs — Help Your Members Win Government Contracts',
  description: 'Partner with GovCon Giants to give your members free access to federal contracting intelligence. Programs for APEX Accelerators, SBDCs, and Chambers of Commerce.',
  path: '/partners',
  keywords: [
    'government contracting partnership',
    'sbdc partnership',
    'apex accelerator partnership',
    'chamber of commerce partnership',
    'govcon tools partner',
    'federal contracting reseller',
    'small business resource partner',
  ],
});

const partnerTypes = [
  {
    name: 'APEX Accelerators',
    tagline: 'Strengthen Your DoD Grant Renewal',
    description: 'Help clients win defense contracts. Track outcomes for your annual DoD report. Meet Critical Tech Area mandates with built-in filters.',
    color: 'green',
    stats: [
      { value: '92', label: 'Centers Nationwide' },
      { value: '$55M', label: 'DoD Funding' },
    ],
    benefits: [
      'Free MI for all clients',
      'DoD Critical Tech filters',
      'Coach dashboard',
      'Grant reporting export',
    ],
    href: '/for/apex-accelerators',
    cta: 'APEX Partnership Details',
  },
  {
    name: 'SBDCs',
    tagline: 'Boost Capital Accessed & Jobs Created',
    description: 'Government contracts are capital accessed. Help clients win them, track the outcomes, and prove your 10x ROI to SBA.',
    color: 'blue',
    stats: [
      { value: '1,000+', label: 'Centers Nationwide' },
      { value: '$7.8B', label: 'Capital Accessed' },
    ],
    benefits: [
      'Free MI for all clients',
      'Capital tracking',
      'Jobs calculator',
      'SBA reporting export',
    ],
    href: '/for/sbdc',
    cta: 'SBDC Partnership Details',
  },
  {
    name: 'Chambers of Commerce',
    tagline: 'Member Benefits That Drive Retention',
    description: 'Give members access to $750B in federal contracts. Track their wins. Revenue share on upgrades. Differentiate your chamber.',
    color: 'amber',
    stats: [
      { value: '4,000+', label: 'Chambers Nationwide' },
      { value: '3x', label: 'Retention with ROI Benefits' },
    ],
    benefits: [
      'Free MI for members',
      'Revenue share program',
      'Co-branded resources',
      'Event programming',
    ],
    href: '/for/chambers',
    cta: 'Chamber Partnership Details',
  },
];

const whyPartner = [
  {
    icon: '🆓',
    title: 'Free for Your Clients',
    description: 'Mindy Free gives every client daily opportunity alerts, CAGE lookup, and research tools. No cost to you or them.',
  },
  {
    icon: '📊',
    title: 'Track Outcomes',
    description: 'When clients win contracts through MI, we track it. Export-ready reports for your funding submissions.',
  },
  {
    icon: '🎓',
    title: 'Training Resources',
    description: 'Point clients to our guide library, video training, and courses. Expert content without hiring experts.',
  },
  {
    icon: '🤝',
    title: 'White-Label Option',
    description: 'Co-branded signup pages, custom reporting, and your logo on the dashboard. Make it yours.',
  },
];

const colorClasses = {
  green: {
    badge: 'bg-green-500/10 border-green-500/30 text-green-400',
    stat: 'text-green-400',
    button: 'bg-green-600 hover:bg-green-500',
    border: 'hover:border-green-500/50',
  },
  blue: {
    badge: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    stat: 'text-blue-400',
    button: 'bg-blue-600 hover:bg-blue-500',
    border: 'hover:border-blue-500/50',
  },
  amber: {
    badge: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    stat: 'text-amber-400',
    button: 'bg-amber-600 hover:bg-amber-500',
    border: 'hover:border-amber-500/50',
  },
};

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'GovCon Giants Partnership Programs',
        description: 'Partnership programs for organizations helping small businesses pursue government contracts.',
        url: `${SITE_URL}/partners`,
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Help Your Clients Win</span><br />
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">
              Government Contracts
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Partner with GovCon Giants to give your members, clients, or constituents access to
            federal contracting intelligence — <span className="text-white font-semibold">for free</span>.
            Track their wins. Strengthen your funding justification.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://calendly.com/govconedumeet/partnership"
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold text-lg transition-all"
            >
              Schedule Partnership Call
            </Link>
            <Link
              href="mailto:partnerships@govcongiants.com"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              Email Us
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Partnership Programs
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnerTypes.map((partner) => {
              const colors = colorClasses[partner.color as keyof typeof colorClasses];
              return (
                <div
                  key={partner.name}
                  className={`bg-slate-900 border border-slate-800 rounded-2xl p-8 ${colors.border} transition`}
                >
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${colors.badge}`}>
                    {partner.name.toUpperCase()}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{partner.tagline}</h3>
                  <p className="text-slate-400 mb-6">{partner.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {partner.stats.map((stat) => (
                      <div key={stat.label}>
                        <div className={`text-2xl font-black ${colors.stat}`}>{stat.value}</div>
                        <div className="text-xs text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-6">
                    {partner.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className={colors.stat}>✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={partner.href}
                    className={`block text-center py-3 ${colors.button} text-white rounded-lg font-semibold transition`}
                  >
                    {partner.cta} →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Organizations Partner With Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPartner.map((reason) => (
              <div key={reason.title} className="text-center">
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h3 className="text-white font-bold mb-2">{reason.title}</h3>
                <p className="text-slate-400 text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Pitch */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              From Tool to Funding Justification
            </h2>
            <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-700">
              <p className="text-lg text-slate-300 italic">
                &quot;MI isn&apos;t just a tool you give clients. It&apos;s a system that tracks their contract wins —
                wins that become <span className="text-green-400 font-semibold">capital accessed</span>,
                <span className="text-blue-400 font-semibold"> jobs created</span>, and
                <span className="text-amber-400 font-semibold"> economic impact</span> in your annual funding report.
                Every client win strengthens your grant renewal.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            We&apos;re Built for Public Service
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Enterprise tools charge per seat. We charge nothing for your clients.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-slate-400 font-medium">Capability</th>
                  <th className="text-center py-4 px-4 text-white font-bold">MI</th>
                  <th className="text-center py-4 px-4 text-slate-500 font-medium">GovWin</th>
                  <th className="text-center py-4 px-4 text-slate-500 font-medium">GovTribe</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800">
                  <td className="py-4 px-4 text-white">Free tier for clients</td>
                  <td className="py-4 px-4 text-center"><span className="text-green-400 text-xl">✓</span></td>
                  <td className="py-4 px-4 text-center"><span className="text-slate-600">—</span></td>
                  <td className="py-4 px-4 text-center"><span className="text-slate-600">—</span></td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-4 px-4 text-white">Partner program</td>
                  <td className="py-4 px-4 text-center"><span className="text-green-400 text-xl">✓</span></td>
                  <td className="py-4 px-4 text-center"><span className="text-slate-600">—</span></td>
                  <td className="py-4 px-4 text-center"><span className="text-slate-600">—</span></td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-4 px-4 text-white">Advisor dashboard</td>
                  <td className="py-4 px-4 text-center"><span className="text-green-400 text-xl">✓</span></td>
                  <td className="py-4 px-4 text-center"><span className="text-slate-600">—</span></td>
                  <td className="py-4 px-4 text-center"><span className="text-slate-600">—</span></td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-4 px-4 text-white">Grant reporting export</td>
                  <td className="py-4 px-4 text-center"><span className="text-green-400 text-xl">✓</span></td>
                  <td className="py-4 px-4 text-center"><span className="text-slate-600">—</span></td>
                  <td className="py-4 px-4 text-center"><span className="text-slate-600">—</span></td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-4 px-4 text-white">White-label option</td>
                  <td className="py-4 px-4 text-center"><span className="text-green-400 text-xl">✓</span></td>
                  <td className="py-4 px-4 text-center"><span className="text-slate-600">—</span></td>
                  <td className="py-4 px-4 text-center"><span className="text-slate-600">—</span></td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-4 px-4 text-white">Price per user</td>
                  <td className="py-4 px-4 text-center"><span className="text-green-400 font-semibold">Free/$149</span></td>
                  <td className="py-4 px-4 text-center"><span className="text-slate-400">$200+</span></td>
                  <td className="py-4 px-4 text-center"><span className="text-slate-400">$99+</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Let&apos;s Talk Partnership
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Schedule a 30-minute call to discuss how MI can serve your organization and clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://calendly.com/govconedumeet/partnership"
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold text-lg transition-all"
            >
              Schedule Partnership Call
            </Link>
            <Link
              href="mailto:partnerships@govcongiants.com"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              partnerships@govcongiants.com
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
