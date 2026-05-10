import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Government Construction Contracts — Federal & Military Construction Bidding (NAICS 236220)',
  description: 'Federal contracting intelligence for construction contractors. Find MILCON, FSRM, and military construction opportunities. Track bonding requirements, Davis-Bacon wages, and MATOC/SATOC contracts.',
  path: '/for/construction',
  keywords: [
    'government construction contracts',
    'federal construction bidding',
    '236220 government contracts',
    'military construction contracts',
    'MILCON opportunities',
    'NAVFAC contracts',
    'USACE construction',
    'federal construction market intelligence',
  ],
});

const features = [
  {
    icon: '🏗️',
    title: 'MILCON & FSRM Tracking',
    description: 'Monitor Military Construction (MILCON) and Facility Sustainment, Restoration & Modernization (FSRM) opportunities across DOD installations.',
  },
  {
    icon: '💰',
    title: 'Bonding Requirement Filters',
    description: 'Filter opportunities by bonding requirements (Payment & Performance bonds). See bid/payment/performance bond thresholds upfront.',
  },
  {
    icon: '📋',
    title: 'Davis-Bacon Intelligence',
    description: 'Automatic Davis-Bacon wage determination tracking. Know prevailing wage requirements before you bid.',
  },
  {
    icon: '🔄',
    title: 'MATOC/SATOC/JOC Alerts',
    description: 'Track Multiple Award Task Order Contracts (MATOC), Single Award (SATOC), and Job Order Contracts (JOC) for construction services.',
  },
  {
    icon: '👷',
    title: 'Subcontractor Opportunities',
    description: 'Connect with prime contractors seeking construction subcontractors for large federal projects (DBE, MBE, WBE set-asides).',
  },
  {
    icon: '🔮',
    title: 'Project Forecast Intelligence',
    description: '7,700+ forecasted construction projects. See USACE, NAVFAC, and GSA PBS planned construction before solicitations drop.',
  },
];

const stats = [
  { value: '$50B+', label: 'Annual federal construction spending' },
  { value: '12,000+', label: 'Construction opportunities tracked' },
  { value: '$2M-$100M', label: 'Typical MILCON project range' },
  { value: '3 agencies', label: 'USACE, NAVFAC, GSA PBS (70% of spend)' },
];

const faqs = [
  {
    question: 'What is NAICS 236220 and why does it matter?',
    answer: 'NAICS 236220 covers Commercial and Institutional Building Construction. This code is used by federal agencies to classify construction projects for offices, warehouses, schools, hospitals, and military facilities. When bidding on federal construction, agencies use NAICS codes to determine size standards ($45M for 236220) and set-aside eligibility. Having 236220 registered in SAM.gov is required to bid on most federal building construction contracts.',
  },
  {
    question: 'What are MILCON and FSRM contracts?',
    answer: 'MILCON (Military Construction) refers to new construction projects on military installations—think new barracks, hangars, training facilities. Projects typically range $10M-$100M+. FSRM (Facility Sustainment, Restoration & Modernization) covers repairs, renovations, and maintenance of existing military facilities—smaller projects ($500K-$10M) but higher volume. USACE and NAVFAC award most MILCON/FSRM contracts, with 30-60 day bid windows.',
  },
  {
    question: 'Do I need bonding for federal construction contracts?',
    answer: 'Yes, for any federal construction contract over $150,000, you must provide Payment and Performance bonds (Miller Act requirement). Bonds typically cost 1-3% of contract value. For contracts under $150K, agencies may waive bonding at their discretion. Our platform shows bonding requirements upfront so you can pre-qualify opportunities based on your bonding capacity before investing time in a bid.',
  },
  {
    question: 'What are Davis-Bacon wage requirements?',
    answer: 'The Davis-Bacon Act requires contractors on federal construction projects over $2,000 to pay workers prevailing wages determined by the Department of Labor. Each project has a specific wage determination based on location and trade. Violating Davis-Bacon can result in contract termination and debarment. Our platform links to relevant wage determinations for each opportunity so you can accurately estimate labor costs during your bid preparation.',
  },
  {
    question: 'What is a MATOC and how do I get on one?',
    answer: 'A Multiple Award Task Order Contract (MATOC) is an IDIQ (Indefinite Delivery/Indefinite Quantity) contract where multiple contractors are pre-qualified to compete for individual task orders over 5-10 years. Examples: USACE&apos;s $5B MATOC for base operations support. To get on a MATOC, you compete during the initial solicitation (full proposal + past performance). Once awarded, you compete for individual task orders (smaller, faster bids). MATOCs are ideal for construction firms seeking recurring federal work.',
  },
];

export default function ConstructionContractorsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'GovCon Giants for Construction Contractors',
        applicationCategory: 'BusinessApplication',
        description: 'Federal construction market intelligence platform for contractors. Track MILCON, FSRM, bonding requirements, and Davis-Bacon wage determinations.',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      }} />

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

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-6">
            <span className="text-orange-400 font-semibold">FOR CONSTRUCTION CONTRACTORS</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Win More</span><br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Federal Construction Contracts
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            The federal government spends <span className="text-orange-400 font-semibold">$50+ billion annually</span> on
            construction. USACE, NAVFAC, and GSA PBS award thousands of MILCON and FSRM projects every year.
            We help you find them before your competitors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — Find Construction Opportunities
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              View Pricing
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-orange-400">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            The Federal Construction Bidding Challenge
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Federal construction is lucrative but complex. You&apos;re competing against national GCs
            with dedicated BD teams and decades of federal experience.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">⏱️</div>
              <h3 className="text-white font-bold mb-2">Short Bid Windows</h3>
              <p className="text-slate-400 text-sm">
                MILCON solicitations drop with 30-60 day windows. By the time you see it on SAM.gov,
                competitors have already been cultivating agency relationships for months.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">🔐</div>
              <h3 className="text-white font-bold mb-2">Bonding & Compliance</h3>
              <p className="text-slate-400 text-sm">
                Miller Act bonding, Davis-Bacon wages, certified payroll, Buy American provisions.
                Miss one requirement and you&apos;re disqualified. Or worse—debarred.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">📊</div>
              <h3 className="text-white font-bold mb-2">Complex Evaluation Criteria</h3>
              <p className="text-slate-400 text-sm">
                Federal construction bids require past performance narratives, project schedules,
                safety records, and small business subcontracting plans. It&apos;s not just a price bid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Built for Construction Contractors
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How Construction Contractors Use Our Platform
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Set Up Your Construction Profile</h3>
                <p className="text-slate-400">
                  Tell us your NAICS codes (236220, 237310, etc.), bonding capacity, geographic radius,
                  and project size sweet spot. We&apos;ll filter opportunities matched to your capabilities.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Get Daily MILCON & FSRM Alerts</h3>
                <p className="text-slate-400">
                  Our AI scans USACE, NAVFAC, GSA PBS, and other agencies daily for new construction
                  solicitations. You&apos;ll see forecasted projects months before they hit SAM.gov.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Research Agencies & Incumbents</h3>
                <p className="text-slate-400">
                  See which agencies award the most construction contracts, who holds the incumbency,
                  and when contracts expire. Find recompete opportunities where you can unseat the incumbent.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-400 font-bold flex items-center justify-center flex-shrink-0">4</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Build Relationships Before the RFP Drops</h3>
                <p className="text-slate-400">
                  With forecast intelligence, you can attend pre-solicitation conferences, submit capability
                  statements, and build rapport with contracting officers 6-12 months before the bid opens.
                  That&apos;s how you win federal construction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Federal Construction FAQs
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Construction Contractor Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/federal-contract-vehicles-guide" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition">
              <h3 className="text-white font-bold mb-2">Federal Contract Vehicles</h3>
              <p className="text-slate-400 text-sm">Learn about MATOCs, IDIQs, and other contract vehicles for construction.</p>
              <span className="text-orange-400 text-sm font-medium mt-3 inline-block">Read Guide →</span>
            </Link>
            <Link href="/guides/gsa-schedule" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition">
              <h3 className="text-white font-bold mb-2">GSA Schedule Guide</h3>
              <p className="text-slate-400 text-sm">How to get on GSA Schedule 56 for construction and facility maintenance.</p>
              <span className="text-orange-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/guides/finding-government-contracts" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition">
              <h3 className="text-white font-bold mb-2">Finding Government Contracts</h3>
              <p className="text-slate-400 text-sm">Where to search for federal construction opportunities beyond SAM.gov.</p>
              <span className="text-orange-400 text-sm font-medium mt-3 inline-block">Explore →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-orange-900/30 to-slate-900 border border-orange-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Winning Federal Construction Contracts
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join contractors tracking MILCON, FSRM, and military construction opportunities.
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
