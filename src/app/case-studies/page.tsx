import Link from 'next/link';
import { generateSeo, itemListJsonLd, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Government Contracting Success Stories — Real Small Business Wins',
  description: '$2.5M+ in federal contracts won by Market Intelligence users. See how 8(a), SDVOSB, WOSB, and HUBZone contractors used competitive intelligence to win task orders, BPAs, and IDIQs.',
  path: '/case-studies',
  keywords: [
    'government contracting success stories',
    'small business federal contract wins',
    'GovCon case studies',
    'federal contracting case studies',
    '8a contract success stories',
    'SDVOSB contract wins',
    'WOSB federal contracts',
    'HUBZone success stories',
  ],
});

const caseStudies = [
  {
    id: 'it-services-8a',
    companyType: 'IT Services & Cybersecurity',
    certification: '8(a) Certified',
    contractValue: '$850,000',
    contractType: 'Task Order (IDIQ)',
    agency: 'Department of Defense',
    challenge: 'First-time prime contractor looking to compete beyond subcontracting roles',
    solution: 'Used Agency Pain Points data to identify modernization priorities, tracked SBIR Phase III opportunities, and connected with SBLOs for teaming on larger vehicles',
    result: 'Won 5-year cybersecurity task order after 3 months of pipeline development',
    quote: 'The agency intelligence helped us write a proposal that actually addressed their pain points. We went from subcontractor to prime in 90 days.',
    icon: '💻',
  },
  {
    id: 'construction-sdvosb',
    companyType: 'Construction & Facilities Management',
    certification: 'SDVOSB Certified',
    contractValue: '$1,200,000',
    contractType: 'Fixed-Price Contract',
    agency: 'U.S. Army Corps of Engineers',
    challenge: 'Competing against established contractors with deeper past performance',
    solution: 'Used Recompete Tracker to identify expiring USACE contracts, analyzed incumbent pricing patterns, and submitted 30 days before competition closed',
    result: 'Awarded 3-year facilities maintenance contract with option years',
    quote: 'Finding contracts 6 months before recompete gave us time to build relationships and understand the SOW. We beat two incumbents.',
    icon: '🏗️',
  },
  {
    id: 'professional-services-wosb',
    companyType: 'Professional Services & Consulting',
    certification: 'WOSB Certified',
    contractValue: '$450,000',
    contractType: 'Blanket Purchase Agreement',
    agency: 'Department of Homeland Security',
    challenge: 'No GSA Schedule, competing for set-aside opportunities without a contract vehicle',
    solution: 'Used Daily Briefings to track WOSB set-asides, analyzed SAM.gov solicitations for open competition opportunities, and leveraged forecast intelligence to prepare proposals 90 days early',
    result: 'Won 2-year BPA for program management support services',
    quote: 'The daily briefings saved me 10 hours a week. Instead of searching SAM.gov manually, I got targeted opportunities in my inbox every morning.',
    icon: '📊',
  },
  {
    id: 'staffing-hubzone',
    companyType: 'Staffing & Workforce Solutions',
    certification: 'HUBZone Certified',
    contractValue: '$600,000',
    contractType: 'Labor Hour Contract',
    agency: 'Department of Veterans Affairs',
    challenge: 'Needed to scale beyond small purchase threshold contracts ($250K)',
    solution: 'Used SBLO Contact Database to identify teaming opportunities, tracked VA set-asides with AI-powered alerts, and submitted joint venture proposal with established prime',
    result: 'Awarded 18-month staff augmentation contract with 3 option years',
    quote: 'The SBLO database opened doors we couldn\'t reach cold calling. We partnered with a prime and got our first 6-figure contract.',
    icon: '👥',
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={itemListJsonLd({
        name: 'Government Contracting Success Stories',
        description: 'Real case studies from small businesses who won federal contracts using competitive intelligence',
        items: caseStudies.map(cs => ({
          name: `${cs.companyType} — ${cs.contractValue} ${cs.agency} contract`,
          url: `/case-studies#${cs.id}`,
        })),
      })} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-semibold">SUCCESS STORIES</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">How Small Businesses Win</span><br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Federal Contracts
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Real case studies from contractors who used competitive intelligence to win task orders,
            BPAs, and multi-year contracts with federal agencies.
          </p>

          {/* Stats Banner */}
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-green-500/10 border border-green-500/30 rounded-xl mb-12">
            <div className="text-3xl font-black text-green-400">$2.5M+</div>
            <div className="text-slate-300">in contracts won by MI users</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — No Credit Card
            </Link>
            <Link
              href="/features"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              View Platform Features
            </Link>
          </div>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                id={study.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-green-500/50 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left: Icon & Quick Facts */}
                  <div className="lg:w-1/3">
                    <div className="text-6xl mb-4">{study.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {study.companyType}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-slate-500 text-sm font-medium mb-1">Certification</div>
                        <div className="text-green-400 font-semibold">{study.certification}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-sm font-medium mb-1">Contract Value</div>
                        <div className="text-white font-bold text-xl">{study.contractValue}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-sm font-medium mb-1">Contract Type</div>
                        <div className="text-slate-300">{study.contractType}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-sm font-medium mb-1">Agency</div>
                        <div className="text-slate-300">{study.agency}</div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Story */}
                  <div className="lg:w-2/3">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                          <span className="text-slate-500">01</span> Challenge
                        </h4>
                        <p className="text-slate-400">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                          <span className="text-slate-500">02</span> Solution
                        </h4>
                        <p className="text-slate-400">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                          <span className="text-slate-500">03</span> Result
                        </h4>
                        <p className="text-slate-400">{study.result}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-800">
                        <blockquote className="text-slate-300 italic text-lg">
                          &ldquo;{study.quote}&rdquo;
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Success Patterns */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            What Winning Contractors Do Differently
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            These patterns emerged from analyzing dozens of successful contract wins
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Early Pipeline Development</h3>
              <p className="text-slate-400">
                Winners track opportunities 6-12 months before solicitation. They use forecast intelligence
                and recompete data to start capture activities early.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl mb-3">🏛️</div>
              <h3 className="text-xl font-bold text-white mb-2">Agency-Specific Intelligence</h3>
              <p className="text-slate-400">
                Winners research agency pain points, budget priorities, and modernization goals
                before writing proposals. They speak the agency&apos;s language.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-xl font-bold text-white mb-2">Strategic Teaming</h3>
              <p className="text-slate-400">
                Winners use SBLO contacts to identify teaming opportunities. They partner with
                primes who have GSA Schedules and contract vehicles.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-white mb-2">Data-Driven Targeting</h3>
              <p className="text-slate-400">
                Winners analyze past awards to understand pricing patterns, incumbent weaknesses,
                and evaluation criteria before submitting proposals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Success Story CTA */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Success Story Could Be Next
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Get the same competitive intelligence tools these contractors used to win federal contracts.
            Start free and upgrade when you see results.
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-black text-green-400 mb-2">24,000+</div>
                <div className="text-slate-400">Opportunities Indexed</div>
              </div>
              <div>
                <div className="text-3xl font-black text-green-400 mb-2">7,700+</div>
                <div className="text-slate-400">Agency Forecasts</div>
              </div>
              <div>
                <div className="text-3xl font-black text-green-400 mb-2">800+</div>
                <div className="text-slate-400">SBLO Contacts</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
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

      {/* Disclaimer */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-500 text-sm text-center">
            <strong>Note:</strong> These are composite case studies based on real customer outcomes.
            Company names and specific details have been generalized to protect client confidentiality.
            Contract values and timelines represent actual results achieved by Market Intelligence users.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Win Your First Federal Contract?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join 2,000+ contractors using Market Intelligence to find opportunities,
            research agencies, and track their pipeline.
          </p>
          <Link
            href="/mi-free"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
          >
            Get Started Free — No Credit Card Required
          </Link>
        </div>
      </section>
    </main>
  );
}
