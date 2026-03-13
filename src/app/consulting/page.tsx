import Link from 'next/link';
import { generateSeo } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'GovCon Consulting — Expert Help Winning Federal Contracts',
  description: 'Get expert government contracting consulting. From capability statements to full proposal support — our team helps small businesses win federal contracts.',
  path: '/consulting',
  keywords: [
    'government contracting consulting',
    'govcon consultant',
    'federal contract consulting',
    'proposal writing services',
    'capability statement help',
    'SBA certification help',
  ],
});

const packages = [
  {
    name: 'Consulting Pack',
    price: '$500',
    description: 'One-on-one strategy sessions to get your business federal-ready. Perfect for businesses just getting started or needing targeted help on a specific area.',
    includes: [
      '2 x 60-minute strategy calls',
      'SAM.gov registration review',
      'NAICS code analysis',
      'Capability statement review',
      'Action plan with next steps',
    ],
    cta: 'Book Consulting Pack',
    href: 'https://calendly.com/govconedumeet/gcg-beginnerscall',
    popular: false,
  },
  {
    name: 'Accelerator',
    price: '$2,500',
    description: 'Intensive 30-day program to take your business from zero to bidding. Includes hands-on support through your first proposal submission.',
    includes: [
      'Everything in Consulting Pack',
      '4 x 60-minute strategy calls',
      'Bid/no-bid analysis on live opportunities',
      'Proposal outline and compliance matrix',
      'Teaming partner introductions',
      'Email support for 30 days',
    ],
    cta: 'Book Accelerator',
    href: 'https://calendly.com/govconedumeet/gcg-beginnerscall',
    popular: true,
  },
  {
    name: 'White Glove',
    price: 'Custom',
    description: 'Full-service government contracting support. We handle everything from market research to proposal writing. For businesses serious about winning.',
    includes: [
      'Everything in Accelerator',
      'Full market research report',
      'Proposal writing support',
      'Pricing strategy',
      'Oral presentation coaching',
      'Ongoing capture management',
      'Dedicated account manager',
    ],
    cta: 'Apply for White Glove',
    href: 'https://calendly.com/govconedumeet/gcg-beginnerscall',
    popular: false,
  },
];

export default function ConsultingPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'GovCon Giants Consulting',
        description: 'Expert government contracting consulting for small businesses.',
        url: `${SITE_URL}/consulting`,
        provider: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
      }} />

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            GovCon <span className="text-green-500">Consulting</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Stop guessing. Get expert guidance from a team that&apos;s helped businesses win over $2 billion in federal contracts.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`bg-slate-900 border rounded-2xl p-6 flex flex-col ${
                pkg.popular
                  ? 'border-green-600 ring-1 ring-green-600/20'
                  : 'border-slate-800'
              }`}
            >
              {pkg.popular && (
                <div className="text-green-500 text-xs font-bold uppercase tracking-wider mb-2">
                  Most Popular
                </div>
              )}
              <h2 className="text-2xl font-bold text-white mb-1">{pkg.name}</h2>
              <p className="text-3xl font-bold text-green-500 mb-4">{pkg.price}</p>
              <p className="text-slate-400 text-sm mb-6">{pkg.description}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.includes.map((item) => (
                  <li key={item} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={pkg.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center px-6 py-3 rounded-lg font-semibold transition ${
                  pkg.popular
                    ? 'bg-green-600 hover:bg-green-500 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* What We Help With */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Help With</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'SAM.gov Registration', desc: 'Get registered correctly the first time.' },
              { title: 'Capability Statements', desc: 'Professional docs that open doors.' },
              { title: 'SBA Certifications', desc: '8(a), SDVOSB, HUBZone, WOSB applications.' },
              { title: 'Market Research', desc: 'Identify your best target agencies and contracts.' },
              { title: 'Proposal Writing', desc: 'Compliant, compelling proposals that score high.' },
              { title: 'Bid/No-Bid Decisions', desc: 'Know which opportunities are worth pursuing.' },
              { title: 'Teaming & Subcontracting', desc: 'Find the right partners to win together.' },
              { title: 'Capture Management', desc: 'Strategic positioning before the RFP drops.' },
            ].map((item) => (
              <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h3 className="text-white font-bold mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-green-600/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Not Sure Which Package?</h2>
          <p className="text-slate-400 mb-6">
            Start with a free 15-minute call. We&apos;ll assess where you are and recommend the right path forward.
          </p>
          <Link
            href="https://calendly.com/govconedumeet/gcg-beginnerscall"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
          >
            Schedule Free Call
          </Link>
        </div>
      </section>
    </main>
  );
}
