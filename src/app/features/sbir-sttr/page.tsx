import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'SBIR/STTR Opportunity Finder — Track R&D Funding Across 11 Agencies',
  description: 'Find SBIR and STTR opportunities across all 11 participating agencies. Track Phase I, II, and III funding. $4+ billion in annual R&D grants for small businesses.',
  path: '/features/sbir-sttr',
  keywords: [
    'SBIR opportunity finder',
    'STTR grants software',
    'SBIR Phase I funding',
    'SBIR Phase II opportunities',
    'small business R&D grants',
    'SBIR tracker',
    'federal research funding',
  ],
});

const agencies = [
  { name: 'Department of Defense', abbr: 'DoD', budget: '$1.8B', color: 'blue' },
  { name: 'National Institutes of Health', abbr: 'NIH', budget: '$1.2B', color: 'green' },
  { name: 'Department of Energy', abbr: 'DOE', budget: '$400M', color: 'amber' },
  { name: 'NASA', abbr: 'NASA', budget: '$230M', color: 'red' },
  { name: 'National Science Foundation', abbr: 'NSF', budget: '$220M', color: 'purple' },
  { name: 'Dept. of Homeland Security', abbr: 'DHS', budget: '$70M', color: 'slate' },
  { name: 'Dept. of Agriculture', abbr: 'USDA', budget: '$45M', color: 'emerald' },
  { name: 'Dept. of Education', abbr: 'ED', budget: '$25M', color: 'cyan' },
  { name: 'Dept. of Commerce', abbr: 'DOC', budget: '$20M', color: 'orange' },
  { name: 'Dept. of Transportation', abbr: 'DOT', budget: '$15M', color: 'pink' },
  { name: 'Environmental Protection Agency', abbr: 'EPA', budget: '$10M', color: 'lime' },
];

const phases = [
  {
    phase: 'Phase I',
    subtitle: 'Proof of Concept',
    funding: '$50K - $275K',
    duration: '6-12 months',
    description: 'Establish technical merit, feasibility, and commercial potential of the proposed innovation.',
    icon: '🔬',
  },
  {
    phase: 'Phase II',
    subtitle: 'Full R&D',
    funding: '$500K - $1.5M',
    duration: '2 years',
    description: 'Continue R&D efforts initiated in Phase I. Develop prototype and demonstrate commercial potential.',
    icon: '🔧',
  },
  {
    phase: 'Phase III',
    subtitle: 'Commercialization',
    funding: 'No SBIR funds',
    duration: 'Varies',
    description: 'Commercialize technology using non-SBIR federal or private funding. Win production contracts.',
    icon: '🚀',
  },
];

const features = [
  {
    title: 'Multi-Agency Tracking',
    description: 'One dashboard to track SBIR/STTR across all 11 agencies. No more checking multiple portals.',
    icon: '🏛️',
  },
  {
    title: 'Topic Matching',
    description: 'AI matches your technical capabilities to relevant research topics before solicitations open.',
    icon: '🎯',
  },
  {
    title: 'Deadline Alerts',
    description: 'Never miss a submission deadline. Get alerts 30, 14, and 7 days before close.',
    icon: '⏰',
  },
  {
    title: 'Award Tracking',
    description: 'See who wins what. Analyze competitor patterns and identify collaboration opportunities.',
    icon: '📊',
  },
  {
    title: 'Phase II Pipeline',
    description: 'Track your Phase I projects through to Phase II submission. Stay organized across years.',
    icon: '📈',
  },
  {
    title: 'Commercialization Intel',
    description: 'Find Phase III opportunities and production contracts that build on successful SBIR work.',
    icon: '💰',
  },
];

const stats = [
  { value: '$4.1B+', label: 'Annual SBIR/STTR funding' },
  { value: '11', label: 'Participating agencies' },
  { value: '6,000+', label: 'Awards per year' },
  { value: '23%', label: 'Phase I to Phase II rate' },
];

const faqs = [
  {
    question: 'What\'s the difference between SBIR and STTR?',
    answer: 'SBIR (Small Business Innovation Research) requires the small business to perform at least 2/3 of Phase I work and 1/2 of Phase II work. STTR (Small Business Technology Transfer) requires partnership with a research institution (university, federal lab) that performs at least 30% of the work.',
  },
  {
    question: 'Do I need to be an existing federal contractor?',
    answer: 'No! SBIR/STTR is specifically designed for innovative small businesses, including startups with no federal contracting experience. You just need to be a US-based small business (under 500 employees).',
  },
  {
    question: 'How do I find the right topics for my technology?',
    answer: 'Our AI matches your technology description and past work to relevant research topics across all agencies. We flag topics before solicitations open so you have time to prepare.',
  },
  {
    question: 'What happens after Phase I?',
    answer: 'If Phase I is successful, you can apply for Phase II funding ($500K-$1.5M) to continue R&D. About 23% of Phase I awards lead to Phase II. Our pipeline tracker helps you manage this transition.',
  },
  {
    question: 'How does this compare to SBIR.gov?',
    answer: 'SBIR.gov is the official portal but it\'s hard to search across agencies effectively. We aggregate all agencies, add AI matching, and include award intelligence so you can see who wins what.',
  },
];

export default function SBIRSTTRPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'GovCon Giants SBIR/STTR Tracker',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'SBIR and STTR opportunity finder across all 11 participating federal agencies.',
        url: `${SITE_URL}/features/sbir-sttr`,
        offers: {
          '@type': 'Offer',
          price: '149',
          priceCurrency: 'USD',
        },
        featureList: [
          'Multi-agency tracking',
          'Topic matching AI',
          'Deadline alerts',
          'Award tracking',
          'Phase II pipeline',
          'Commercialization intel',
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-6">
            <span className="text-orange-400 font-semibold">SBIR/STTR TRACKER</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Win R&D Funding From</span><br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              11 Federal Agencies
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            <span className="text-orange-400 font-semibold">$4+ billion</span> in annual SBIR/STTR funding.
            Track opportunities across DoD, NIH, DOE, NASA, and 7 more agencies in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Find SBIR Opportunities
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              View Pricing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-orange-400">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agencies */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            11 Agencies, One Dashboard
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Each agency has different topics, deadlines, and submission processes. We track them all.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {agencies.map((agency) => (
              <div key={agency.abbr} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold">{agency.abbr}</span>
                  <span className="text-orange-400 font-semibold text-sm">{agency.budget}</span>
                </div>
                <div className="text-slate-500 text-xs">{agency.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phases */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Understanding the SBIR Phases
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            SBIR/STTR is a phased program. We help you track opportunities and manage your pipeline through all phases.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {phases.map((phase) => (
              <div key={phase.phase} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-4xl mb-4">{phase.icon}</div>
                <h3 className="text-xl font-bold text-white">{phase.phase}</h3>
                <div className="text-orange-400 text-sm font-medium mb-3">{phase.subtitle}</div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">Funding:</span>
                    <span className="text-white">{phase.funding}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">Duration:</span>
                    <span className="text-white">{phase.duration}</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Our SBIR Tracker Does
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Matching */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            AI-Powered Topic Matching
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Describe your technology once. We match it to relevant research topics across all agencies.
          </p>

          <div className="bg-slate-900 border border-orange-500/30 rounded-xl p-8">
            <h3 className="text-white font-bold mb-6">Example: Autonomous Systems Company</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-orange-400 font-semibold mb-3">Your Capabilities</h4>
                <div className="bg-slate-800/50 rounded-lg p-4 text-slate-300 text-sm">
                  &quot;Autonomous navigation systems for GPS-denied environments using
                  computer vision and machine learning for real-time obstacle detection
                  and path planning.&quot;
                </div>
              </div>
              <div>
                <h4 className="text-orange-400 font-semibold mb-3">Matched Topics</h4>
                <div className="space-y-2">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-400 text-xs font-bold">DoD</span>
                      <span className="text-green-400 text-xs">94% match</span>
                    </div>
                    <div className="text-white text-sm">Autonomous Ground Vehicle Navigation</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-red-400 text-xs font-bold">NASA</span>
                      <span className="text-green-400 text-xs">87% match</span>
                    </div>
                    <div className="text-white text-sm">Autonomous Systems for Planetary Exploration</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-amber-400 text-xs font-bold">DOE</span>
                      <span className="text-green-400 text-xs">81% match</span>
                    </div>
                    <div className="text-white text-sm">AI for Nuclear Facility Inspection</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Award Intelligence */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Learn From Past Awards
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            See who wins, what they proposed, and how much they received. Intelligence to improve your proposals.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-orange-400 mb-2">6,000+</div>
              <div className="text-white font-semibold mb-2">Annual Awards</div>
              <div className="text-slate-400 text-sm">Searchable by topic, agency, and keyword</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-orange-400 mb-2">10 Years</div>
              <div className="text-white font-semibold mb-2">Award History</div>
              <div className="text-slate-400 text-sm">Track competitors and collaborators</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-black text-orange-400 mb-2">Phase III</div>
              <div className="text-white font-semibold mb-2">Tracking</div>
              <div className="text-slate-400 text-sm">See which SBIR projects become production contracts</div>
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
            <Link href="/features/opportunity-finder" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition">
              <h3 className="text-white font-bold mb-2">Opportunity Finder</h3>
              <p className="text-slate-400 text-sm">Search beyond SBIR to all federal opportunities.</p>
              <span className="text-orange-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/features/ai-briefings" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition">
              <h3 className="text-white font-bold mb-2">AI Briefings</h3>
              <p className="text-slate-400 text-sm">Get SBIR topics in your daily briefing.</p>
              <span className="text-orange-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/features/pipeline-crm" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition">
              <h3 className="text-white font-bold mb-2">Pipeline CRM</h3>
              <p className="text-slate-400 text-sm">Track SBIR projects through phases.</p>
              <span className="text-orange-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            SBIR/STTR Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/guides/sbir-sttr" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition">
              <h3 className="text-white font-bold mb-2">SBIR/STTR Complete Guide</h3>
              <p className="text-slate-400 text-sm">Everything you need to know about the program.</p>
              <span className="text-orange-400 text-sm font-medium mt-3 inline-block">Read Guide →</span>
            </Link>
            <Link href="/guides/sbir-proposal-writing" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition">
              <h3 className="text-white font-bold mb-2">SBIR Proposal Writing</h3>
              <p className="text-slate-400 text-sm">Tips for winning Phase I and Phase II proposals.</p>
              <span className="text-orange-400 text-sm font-medium mt-3 inline-block">Read Guide →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-orange-900/30 to-slate-900 border border-orange-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            $4 Billion in Annual Funding Awaits
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start tracking SBIR/STTR opportunities today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-lg transition-all"
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
