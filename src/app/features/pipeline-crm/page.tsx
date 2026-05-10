import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Federal Contracting CRM — Pipeline & Capture Management Software',
  description: 'Track government contracts from discovery to award. Capture management, team collaboration, win probability scoring. Built for small business contractors. $149/month.',
  path: '/features/pipeline-crm',
  keywords: [
    'federal contracting CRM',
    'government contract pipeline',
    'capture management software',
    'federal contract tracking',
    'government contractor CRM',
    'BD pipeline management',
    'contract capture software',
  ],
});

const pipelineStages = [
  {
    stage: 'Discovery',
    description: 'Opportunities you\'re watching but haven\'t committed to pursuing',
    color: 'slate',
    activities: ['Market research', 'Requirements review', 'Initial fit assessment'],
  },
  {
    stage: 'Qualification',
    description: 'Evaluating bid/no-bid decision criteria',
    color: 'blue',
    activities: ['Capability gap analysis', 'Competitive assessment', 'Resource check'],
  },
  {
    stage: 'Active Pursuit',
    description: 'Committed to pursuing, actively positioning',
    color: 'cyan',
    activities: ['Relationship building', 'Solution development', 'Team formation'],
  },
  {
    stage: 'Proposal',
    description: 'RFP released, proposal in development',
    color: 'amber',
    activities: ['Proposal writing', 'Pricing', 'Reviews', 'Submission'],
  },
  {
    stage: 'Submitted',
    description: 'Proposal submitted, awaiting decision',
    color: 'purple',
    activities: ['Q&A responses', 'Orals prep', 'BAFO preparation'],
  },
  {
    stage: 'Won/Lost',
    description: 'Award decision made',
    color: 'green',
    activities: ['Lessons learned', 'Debrief request', 'Transition planning'],
  },
];

const features = [
  {
    title: 'Kanban Pipeline View',
    description: 'Drag and drop opportunities between stages. See your entire pipeline at a glance.',
    icon: '📊',
  },
  {
    title: 'Win Probability Scoring',
    description: 'AI-calculated win probability based on your past performance, competition, and positioning.',
    icon: '🎯',
  },
  {
    title: 'Team Collaboration',
    description: 'Assign team members, share notes, track activities. Everyone sees the same data.',
    icon: '👥',
  },
  {
    title: 'Document Library',
    description: 'Store RFPs, amendments, past proposals, and capture materials in one place.',
    icon: '📁',
  },
  {
    title: 'Activity Timeline',
    description: 'Log calls, meetings, and BD activities. See full history for every opportunity.',
    icon: '📅',
  },
  {
    title: 'Custom Fields',
    description: 'Add fields specific to your capture process. Contract vehicle, teaming partners, etc.',
    icon: '⚙️',
  },
];

const comparisonData = [
  { feature: 'Basic pipeline tracking', salesforce: true, pipedrive: true, gcg: true },
  { feature: 'Custom stages', salesforce: true, pipedrive: true, gcg: true },
  { feature: 'Team collaboration', salesforce: true, pipedrive: true, gcg: true },
  { feature: 'Government contract data', salesforce: false, pipedrive: false, gcg: true },
  { feature: 'SAM.gov integration', salesforce: false, pipedrive: false, gcg: true },
  { feature: 'Win probability (GovCon-trained)', salesforce: false, pipedrive: false, gcg: true },
  { feature: 'Agency intelligence', salesforce: false, pipedrive: false, gcg: true },
  { feature: 'Contractor database', salesforce: false, pipedrive: false, gcg: true },
  { feature: 'Set-aside tracking', salesforce: false, pipedrive: false, gcg: true },
  { feature: 'Price per month', salesforce: '$300+', pipedrive: '$99+', gcg: '$149' },
];

const faqs = [
  {
    question: 'Why not just use Salesforce or Pipedrive?',
    answer: 'Generic CRMs weren\'t built for government contracting. They don\'t understand NAICS codes, set-asides, contract vehicles, or agency budgets. You\'d spend months customizing them. Ours works out of the box for federal BD.',
  },
  {
    question: 'How does win probability work?',
    answer: 'Our AI considers multiple factors: your past performance in similar work, competitor analysis, agency buying patterns, your relationship with the contracting office, and capture maturity. It updates as you log activities.',
  },
  {
    question: 'Can I import existing opportunities?',
    answer: 'Yes. Import from Excel/CSV, or paste a SAM.gov notice URL and we\'ll pull all the details automatically.',
  },
  {
    question: 'How many users can I add?',
    answer: 'MI Core ($149/mo) includes 3 users. MI Team ($499/mo) includes unlimited users. No per-seat pricing like enterprise CRMs.',
  },
  {
    question: 'Can I track teaming partners?',
    answer: 'Yes. Add teaming partners to any opportunity. See their past performance, capability gaps you need to fill, and contact information.',
  },
];

export default function PipelineCRMPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'GovCon Giants Pipeline CRM',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Federal contracting CRM and capture management software built for government contractors.',
        url: `${SITE_URL}/features/pipeline-crm`,
        offers: {
          '@type': 'Offer',
          price: '149',
          priceCurrency: 'USD',
        },
        featureList: [
          'Kanban pipeline view',
          'Win probability scoring',
          'Team collaboration',
          'Document library',
          'SAM.gov integration',
          'Activity tracking',
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
            <span className="text-emerald-400 font-semibold">PIPELINE CRM</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Track Contracts From</span><br />
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Discovery to Award
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Stop losing opportunities in spreadsheets. Our CRM is <span className="text-emerald-400 font-semibold">built for government contractors</span> —
            with SAM.gov integration, win probability scoring, and team collaboration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Try Pipeline CRM Free
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              View Pricing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-emerald-400">6</div>
              <div className="text-sm text-slate-500">Pipeline stages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-emerald-400">$149</div>
              <div className="text-sm text-slate-500">Per month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-black text-emerald-400">3</div>
              <div className="text-sm text-slate-500">Users included</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Stages */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            A Pipeline Built for Government BD
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Six stages that match how federal contracts actually move, not how SaaS companies think sales work.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pipelineStages.map((stage, i) => (
              <div key={stage.stage} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full bg-${stage.color}-500/20 text-${stage.color}-400 flex items-center justify-center font-bold`}>
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white">{stage.stage}</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4">{stage.description}</p>
                <div className="space-y-1">
                  {stage.activities.map((activity) => (
                    <div key={activity} className="text-sm text-slate-500 flex items-center gap-2">
                      <span className="text-emerald-400">→</span> {activity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything You Need to Win
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Win Probability */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Know Your Odds Before You Bid
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Our AI calculates win probability based on factors that actually matter in government contracting.
          </p>

          <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-8">
            <h3 className="text-white font-bold mb-6">Win Probability Factors</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-emerald-400 font-semibold mb-3">What We Analyze</h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Your past performance on similar work
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Incumbent contractor history
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Agency buying patterns
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Competition analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Set-aside eligibility alignment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Capture maturity score
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-emerald-400 font-semibold mb-3">Score Interpretation</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-green-400 font-bold">75-100%</div>
                    <div className="text-slate-300">Strong position — pursue aggressively</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-amber-400 font-bold">50-74%</div>
                    <div className="text-slate-300">Competitive — worth the investment</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-orange-400 font-bold">25-49%</div>
                    <div className="text-slate-300">Uphill battle — need differentiation</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 text-red-400 font-bold">0-24%</div>
                    <div className="text-slate-300">Consider no-bid — save resources</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Why Not Generic CRMs?
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Salesforce and Pipedrive work for SaaS sales. Federal contracting needs something different.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 text-sm border-b border-slate-800">
                  <th className="pb-4 pr-4">Feature</th>
                  <th className="pb-4 px-4 text-center">Salesforce</th>
                  <th className="pb-4 px-4 text-center">Pipedrive</th>
                  <th className="pb-4 px-4 text-center">GovCon Giants</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="border-b border-slate-800">
                    <td className="py-4 pr-4 text-slate-300">{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.salesforce === 'boolean' ? (
                        row.salesforce ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>
                      ) : (
                        <span className="text-slate-400">{row.salesforce}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.pipedrive === 'boolean' ? (
                        row.pipedrive ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>
                      ) : (
                        <span className="text-slate-400">{row.pipedrive}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {typeof row.gcg === 'boolean' ? (
                        row.gcg ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>
                      ) : (
                        <span className="text-emerald-400 font-semibold">{row.gcg}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6 bg-slate-900/50">
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
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Related Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/features/opportunity-finder" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition">
              <h3 className="text-white font-bold mb-2">Opportunity Finder</h3>
              <p className="text-slate-400 text-sm">Search SAM.gov, Grants.gov, and forecasts.</p>
              <span className="text-emerald-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/features/ai-briefings" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition">
              <h3 className="text-white font-bold mb-2">AI Briefings</h3>
              <p className="text-slate-400 text-sm">Daily intelligence matched to your pipeline.</p>
              <span className="text-emerald-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/features/recompete-tracker" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition">
              <h3 className="text-white font-bold mb-2">Recompete Tracker</h3>
              <p className="text-slate-400 text-sm">Find expiring contracts to add to your pipeline.</p>
              <span className="text-emerald-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-900/30 to-slate-900 border border-emerald-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stop Losing Opportunities in Spreadsheets
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Get a CRM that understands government contracting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg transition-all"
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
