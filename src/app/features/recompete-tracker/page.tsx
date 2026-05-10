import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Federal Recompete Tracker — Find Expiring Contracts Before RFPs Drop',
  description: 'Track expiring federal contracts before solicitations post. Analyze incumbents, see contract history, and position early for recompetes. $500B+ in annual renewals.',
  path: '/features/recompete-tracker',
  keywords: [
    'federal recompete tracker',
    'expiring contracts finder',
    'government contract renewals',
    'incumbent analysis',
    'federal contract expiration',
    'recompete opportunities',
    'contract rebid tracker',
  ],
});

const timeline = [
  {
    period: '18-24 Months',
    action: 'Research & Identify',
    description: 'Identify expiring contracts in your space. Analyze incumbent performance.',
    color: 'blue',
  },
  {
    period: '12-18 Months',
    action: 'Position & Engage',
    description: 'Build agency relationships. Attend industry days. Shape requirements.',
    color: 'cyan',
  },
  {
    period: '6-12 Months',
    action: 'Sources Sought',
    description: 'Respond to RFIs. Demonstrate capabilities. Influence evaluation criteria.',
    color: 'green',
  },
  {
    period: '3-6 Months',
    action: 'Pre-RFP',
    description: 'Final positioning. Teaming finalized. Draft proposal sections.',
    color: 'amber',
  },
  {
    period: '0-3 Months',
    action: 'Proposal',
    description: 'RFP drops. Execute your prepared proposal strategy.',
    color: 'orange',
  },
];

const features = [
  {
    title: 'Expiration Tracking',
    description: 'See contracts expiring in your NAICS codes over the next 24 months. Filter by agency, size, and set-aside.',
    icon: '📅',
  },
  {
    title: 'Incumbent Analysis',
    description: 'Know who holds the contract, their award history, and any performance issues flagged in CPARS.',
    icon: '🔍',
  },
  {
    title: 'Contract History',
    description: 'See the full history: original award, modifications, option years exercised, and total value over time.',
    icon: '📊',
  },
  {
    title: 'Option Year Alerts',
    description: 'Get notified when agencies don\'t exercise options — often signals upcoming recompete.',
    icon: '🔔',
  },
  {
    title: 'Protest History',
    description: 'See if previous awards were protested. Understand the competitive landscape.',
    icon: '⚖️',
  },
  {
    title: 'Forecast Correlation',
    description: 'Match expiring contracts to agency forecasts. Confirm recompete timing.',
    icon: '🔮',
  },
];

const dataPoints = [
  { label: 'Contracts Tracked', value: '2.4M+', description: 'Active and historical contracts' },
  { label: 'Expiring Next 12 Mo', value: '180K+', description: 'Potential recompete opportunities' },
  { label: 'Average Lead Time', value: '18 Mo', description: 'Months between expiration and new award' },
  { label: 'Incumbent Win Rate', value: '72%', description: 'But varies significantly by agency' },
];

const incumbentFactors = [
  { factor: 'Strong relationship with CO', impact: 'high', incumbent: true },
  { factor: 'Written the SOW language', impact: 'high', incumbent: true },
  { factor: 'Price evaluation favors known costs', impact: 'medium', incumbent: true },
  { factor: 'Transition risk concerns', impact: 'medium', incumbent: true },
  { factor: 'Past performance documented', impact: 'high', incumbent: true },
  { factor: 'Complacency / declining service', impact: 'high', incumbent: false },
  { factor: 'Price creep over option years', impact: 'medium', incumbent: false },
  { factor: 'New requirements they can\'t meet', impact: 'high', incumbent: false },
  { factor: 'Agency wants fresh perspective', impact: 'medium', incumbent: false },
  { factor: 'Small business set-aside change', impact: 'high', incumbent: false },
];

const faqs = [
  {
    question: 'How far in advance should I track expiring contracts?',
    answer: 'Start 18-24 months before expiration. Agencies begin planning recompetes that early, and you need time to build relationships, understand requirements, and position your solution.',
  },
  {
    question: 'How accurate are the expiration dates?',
    answer: 'We pull directly from USAspending.gov and SAM.gov. Dates reflect current Period of Performance end dates. Note that contracts can be extended, so track whether options are being exercised.',
  },
  {
    question: 'Can I beat the incumbent?',
    answer: 'Incumbents win about 72% of recompetes, but that means 28% change hands. Look for signs of incumbent weakness: declining service quality, price increases, or changing requirements the incumbent can\'t meet.',
  },
  {
    question: 'What if the contract is extended instead of recompeted?',
    answer: 'Extensions happen, especially with bridge contracts when agencies aren\'t ready to recompete. Our option year alerts help you track this. Even with extensions, the recompete is still coming.',
  },
  {
    question: 'How do I find out about performance issues?',
    answer: 'CPARS (Contractor Performance Assessment Reports) are government-only, but we flag contracts where incumbents have publicly visible issues: protests, terminated contracts, or significant de-scoping.',
  },
];

export default function RecompeteTrackerPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'GovCon Giants Recompete Tracker',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Track expiring federal contracts and analyze incumbents for recompete opportunities.',
        url: `${SITE_URL}/features/recompete-tracker`,
        offers: {
          '@type': 'Offer',
          price: '149',
          priceCurrency: 'USD',
        },
        featureList: [
          'Contract expiration tracking',
          'Incumbent analysis',
          'Contract history',
          'Option year alerts',
          'Protest history',
          'Forecast correlation',
        ],
      }} />

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full mb-6">
            <span className="text-rose-400 font-semibold">RECOMPETE TRACKER</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Find Recompetes</span><br />
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Before the RFP Drops
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            <span className="text-rose-400 font-semibold">$500+ billion</span> in federal contracts expire and recompete every year.
            Track expiring contracts. Analyze incumbents. Position early to win.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Find Expiring Contracts
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              View Pricing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {dataPoints.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-rose-400">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Recompetes */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Why Recompetes Are Your Best Opportunity
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            New contracts are competitive. Recompetes give you intelligence and time to position.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-white font-bold mb-2">Known Requirements</h3>
              <p className="text-slate-400 text-sm">
                You can study the current contract. You know what they need — not a guess.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-white font-bold mb-2">Time to Prepare</h3>
              <p className="text-slate-400 text-sm">
                18-24 months lead time to build relationships and shape requirements.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-white font-bold mb-2">Incumbent Weaknesses</h3>
              <p className="text-slate-400 text-sm">
                28% of recompetes change hands. Find contracts where incumbents are vulnerable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            The Recompete Timeline
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            If you start when the RFP drops, you&apos;ve already lost. Here&apos;s the winning timeline.
          </p>

          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={item.period} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center gap-6">
                <div className="flex-shrink-0 w-32 text-center">
                  <div className="text-rose-400 font-bold">{item.period}</div>
                  <div className="text-slate-500 text-xs">Before Expiration</div>
                </div>
                <div className="flex-shrink-0 text-rose-400 text-2xl">
                  {i === 0 ? '🎯' : i === 1 ? '🤝' : i === 2 ? '📋' : i === 3 ? '📝' : '🚀'}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{item.action}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Our Recompete Tracker Does
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-rose-500/50 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incumbent Analysis */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Understanding Incumbent Advantage
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Incumbents win 72% of recompetes. Know what gives them advantage — and what creates vulnerability.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                <span>✓</span> Incumbent Advantages
              </h3>
              <div className="space-y-3">
                {incumbentFactors.filter(f => f.incumbent).map((factor) => (
                  <div key={factor.factor} className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
                    <span className="text-slate-300">{factor.factor}</span>
                    <span className={`text-xs px-2 py-1 rounded ${factor.impact === 'high' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {factor.impact} impact
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-rose-400 font-bold mb-4 flex items-center gap-2">
                <span>✗</span> Incumbent Vulnerabilities
              </h3>
              <div className="space-y-3">
                {incumbentFactors.filter(f => !f.incumbent).map((factor) => (
                  <div key={factor.factor} className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
                    <span className="text-slate-300">{factor.factor}</span>
                    <span className={`text-xs px-2 py-1 rounded ${factor.impact === 'high' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}`}>
                      {factor.impact} opportunity
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            What You&apos;ll See
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Here&apos;s what a contract expiration record looks like in our system:
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-rose-900/30 border-b border-slate-800 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">IT Help Desk Support Services</div>
                  <div className="text-slate-400 text-sm">Veterans Affairs • Contract #36C10B18C0033</div>
                </div>
                <div className="text-right">
                  <div className="text-rose-400 font-bold">$28.5M</div>
                  <div className="text-slate-500 text-sm">Total value</div>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-slate-500">Expires</div>
                  <div className="text-rose-400 font-semibold">Nov 30, 2026</div>
                </div>
                <div>
                  <div className="text-slate-500">Incumbent</div>
                  <div className="text-white">Acme IT Solutions</div>
                </div>
                <div>
                  <div className="text-slate-500">Set-Aside</div>
                  <div className="text-blue-400">SDVOSB</div>
                </div>
                <div>
                  <div className="text-slate-500">NAICS</div>
                  <div className="text-white">541512</div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <h4 className="text-white font-semibold mb-3">Contract History</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Original Award (2018)</span>
                    <span className="text-white">$18.2M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Option Year 1 (2019)</span>
                    <span className="text-white">$2.1M exercised</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Option Year 2 (2020)</span>
                    <span className="text-white">$2.3M exercised</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Modifications</span>
                    <span className="text-amber-400">+$5.9M (scope increase)</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <h4 className="text-white font-semibold mb-3">Signals</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Forecast confirmed</span>
                  <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded">Sources sought expected Q1</span>
                  <span className="bg-rose-500/20 text-rose-400 text-xs px-2 py-1 rounded">Last option year</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Features */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Related Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/features/opportunity-finder" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-rose-500/50 transition">
              <h3 className="text-white font-bold mb-2">Opportunity Finder</h3>
              <p className="text-slate-400 text-sm">Search for new opportunities and recompete solicitations.</p>
              <span className="text-rose-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/features/pipeline-crm" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-rose-500/50 transition">
              <h3 className="text-white font-bold mb-2">Pipeline CRM</h3>
              <p className="text-slate-400 text-sm">Track recompete pursuits through your pipeline.</p>
              <span className="text-rose-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/features/ai-briefings" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-rose-500/50 transition">
              <h3 className="text-white font-bold mb-2">AI Briefings</h3>
              <p className="text-slate-400 text-sm">Get alerts when tracked contracts show activity.</p>
              <span className="text-rose-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-rose-900/30 to-slate-900 border border-rose-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Finding Recompetes Today
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Get ahead of the competition. Track expiring contracts now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-lg transition-all"
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
