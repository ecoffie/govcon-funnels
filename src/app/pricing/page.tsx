import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Pricing — Federal Contract Intelligence | 90% Less Than GovWin',
  description: 'Federal contracting intelligence at $149/month — not $25,000/year. Compare our pricing to GovWin, GovTribe, and other enterprise tools. Start free, no credit card required.',
  path: '/pricing',
  keywords: [
    'government contracting software pricing',
    'govwin pricing',
    'govwin alternative',
    'govtribe pricing',
    'federal contract intelligence pricing',
    'affordable govcon software',
    'government contract finder cost',
  ],
});

const tiers = [
  {
    name: 'Mindy Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with federal contracting intelligence. No credit card required.',
    cta: 'Start Free',
    ctaLink: '/mi-free',
    highlighted: false,
    features: [
      '5 opportunity searches/day',
      'Basic agency profiles (200+ agencies)',
      'Weekly intelligence briefing',
      'CAGE code lookup tool',
      'Federal glossary access',
    ],
    notIncluded: [
      'Daily AI briefings',
      'SBLO contact database',
      'Pipeline CRM',
      'Forecast intelligence',
      'Priority support',
    ],
  },
  {
    name: 'Mindy Pro',
    price: '$149',
    period: '/month',
    annualPrice: '$1,788/year',
    description: 'Everything you need to find and win federal contracts. Our most popular plan.',
    cta: 'Start 14-Day Trial',
    ctaLink: '/mi-core',
    highlighted: true,
    badge: 'MOST POPULAR',
    features: [
      'Unlimited opportunity searches',
      'Daily AI-powered briefings',
      'Full agency intelligence (pain points, budgets)',
      '800+ SBLO contacts with emails',
      '7,700+ forecast opportunities',
      'Expiring contracts tracker',
      'Pipeline CRM (unlimited opportunities)',
      'Email + chat support',
    ],
    notIncluded: [
      'Team collaboration',
      'Custom briefing schedules',
      'API access',
    ],
  },
  {
    name: 'Mindy Teams',
    price: '$499',
    period: '/month',
    annualPrice: '$5,988/year',
    description: 'For BD teams that need to collaborate on federal opportunities.',
    cta: 'Contact Sales',
    ctaLink: 'mailto:hello@govconedu.com?subject=MI%20Team%20Inquiry',
    highlighted: false,
    features: [
      'Everything in Mindy Pro',
      'Up to 10 team members',
      'Shared pipeline & notes',
      'Custom briefing schedules',
      'Win/loss tracking & analytics',
      'Dedicated account manager',
      'Priority support',
      'API access (coming soon)',
    ],
    notIncluded: [],
  },
];

const competitors = [
  { name: 'GovWin IQ', price: '$12,000 - $119,000/yr', savings: '93-99%' },
  { name: 'GovTribe', price: '$1,350 - $5,500/yr', savings: '0-67%' },
  { name: 'Federal Compass', price: 'Up to $15,000/user/yr', savings: '88%+' },
  { name: 'EZGovOpps', price: '$2,700 - $6,000/yr', savings: '34-70%' },
  { name: 'Bloomberg Government', price: '$7,500 - $14,000/yr', savings: '76-87%' },
];

const faqs = [
  {
    question: 'How does GovCon Giants compare to GovWin?',
    answer: 'GovWin is an enterprise tool designed for large contractors with dedicated BD teams and $12K-$119K/year budgets. We built GovCon Giants for small businesses who need 80% of the capability at 2% of the cost. You get opportunity intelligence, agency analysis, and pipeline tracking — without the enterprise price tag.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Mindy Pro comes with a 14-day free trial. Mindy Free is completely free forever with no credit card required. Start with Mindy Free and upgrade when you see the value.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. All plans are month-to-month with no long-term contracts. Cancel anytime from your account settings — no phone calls or cancellation fees.',
  },
  {
    question: 'What data sources do you use?',
    answer: 'We aggregate data from SAM.gov, Grants.gov, USASpending.gov, and 50+ other federal sources. Our AI analyzes thousands of opportunities daily to surface what matters for your specific NAICS codes and certifications.',
  },
  {
    question: 'Do you offer annual discounts?',
    answer: 'Yes. Pay annually and save 2 months (get 12 months for the price of 10). Contact us for annual billing options.',
  },
  {
    question: 'What if I need help getting started?',
    answer: 'All paid plans include email support. Mindy Teams includes a dedicated account manager for onboarding. We also have 140+ free guides and video tutorials to help you get the most from the platform.',
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Mindy',
        description: 'Federal contracting intelligence platform for small businesses',
        url: `${SITE_URL}/pricing`,
        brand: {
          '@type': 'Brand',
          name: 'GovCon Giants',
        },
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '0',
          highPrice: '499',
          priceCurrency: 'USD',
          offerCount: 3,
          offers: tiers.map((tier) => ({
            '@type': 'Offer',
            name: tier.name,
            price: tier.price.replace('$', '').replace(',', ''),
            priceCurrency: 'USD',
            priceValidUntil: '2027-12-31',
            availability: 'https://schema.org/InStock',
          })),
        },
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-semibold">90% LESS THAN ENTERPRISE TOOLS</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">Enterprise Intelligence.</span><br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Small Business Pricing.
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Why pay $25,000/year for GovWin when you can get the intelligence you need for $149/month?
            Built for small business contractors who want to compete — not go broke trying.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400 mb-12">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No credit card for free plan
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              14-day free trial on paid plans
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 ${
                  tier.highlighted
                    ? 'bg-gradient-to-b from-green-900/40 to-slate-900 border-2 border-green-500'
                    : 'bg-slate-900 border border-slate-800'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-black text-white">{tier.price}</span>
                    <span className="text-slate-400">{tier.period}</span>
                  </div>
                  {tier.annualPrice && (
                    <p className="text-sm text-slate-500 mt-1">{tier.annualPrice} billed annually</p>
                  )}
                  <p className="text-slate-400 text-sm mt-4">{tier.description}</p>
                </div>

                <Link
                  href={tier.ctaLink}
                  className={`block w-full py-4 rounded-xl font-bold text-center transition mb-8 ${
                    tier.highlighted
                      ? 'bg-green-600 hover:bg-green-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  {tier.cta}
                </Link>

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-slate-300">What&apos;s included:</p>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.notIncluded.length > 0 && (
                    <>
                      <div className="border-t border-slate-800 my-4"></div>
                      <ul className="space-y-3">
                        {tier.notIncluded.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm">
                            <svg className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-slate-500">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-16 px-6 mt-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Compare the Costs
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            See how GovCon Giants Mindy Pro ($1,788/year) stacks up against enterprise tools
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 gap-0 border-b border-slate-800 bg-slate-800/50">
              <div className="p-4 text-slate-300 font-semibold">Platform</div>
              <div className="p-4 text-slate-300 font-semibold text-center">Annual Cost</div>
              <div className="p-4 text-slate-300 font-semibold text-center">Your Savings</div>
            </div>
            <div className="grid grid-cols-3 gap-0 border-b border-green-500/30 bg-green-500/5">
              <div className="p-4 text-white font-semibold flex items-center gap-2">
                <span className="text-green-400">GovCon Giants Mindy Pro</span>
              </div>
              <div className="p-4 text-center">
                <span className="text-green-400 font-bold text-xl">$1,788/yr</span>
              </div>
              <div className="p-4 text-center text-slate-400">—</div>
            </div>
            {competitors.map((comp) => (
              <div key={comp.name} className="grid grid-cols-3 gap-0 border-b border-slate-800/50 hover:bg-slate-800/30 transition">
                <div className="p-4 text-slate-300">{comp.name}</div>
                <div className="p-4 text-center text-slate-400">{comp.price}</div>
                <div className="p-4 text-center">
                  <span className="text-green-400 font-semibold">{comp.savings} less</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">
            * Prices based on publicly available information as of 2026. Competitor pricing may vary by contract.
          </p>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-4 text-slate-300 font-semibold">Feature</th>
                  <th className="text-center p-4 text-slate-300 font-semibold">Mindy Free</th>
                  <th className="text-center p-4 text-green-400 font-semibold">Mindy Pro</th>
                  <th className="text-center p-4 text-slate-300 font-semibold">Mindy Teams</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Opportunity Search', free: '5/day', core: 'Unlimited', team: 'Unlimited' },
                  { feature: 'Agency Profiles', free: 'Basic', core: 'Full Intel', team: 'Full Intel' },
                  { feature: 'AI Briefings', free: 'Weekly', core: 'Daily', team: 'Custom Schedule' },
                  { feature: 'SBLO Contacts', free: '—', core: '800+', team: '800+' },
                  { feature: 'Forecast Intelligence', free: '—', core: '7,700+', team: '7,700+' },
                  { feature: 'Pipeline CRM', free: '—', core: 'Unlimited', team: 'Team Shared' },
                  { feature: 'Expiring Contracts', free: '—', core: 'Full Access', team: 'Full Access' },
                  { feature: 'Team Members', free: '1', core: '1', team: 'Up to 10' },
                  { feature: 'Support', free: 'Community', core: 'Email + Chat', team: 'Priority + AM' },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-slate-800">
                    <td className="p-4 text-slate-300">{row.feature}</td>
                    <td className="p-4 text-center text-slate-400">{row.free}</td>
                    <td className="p-4 text-center text-green-400 font-medium">{row.core}</td>
                    <td className="p-4 text-center text-slate-300">{row.team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD FAQ Schema */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }} />

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Winning Federal Contracts?
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
