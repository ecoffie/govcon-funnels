import Link from 'next/link';
import { generateSeo, SITE_URL, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Federal IT Contracting Software — Track 541512 Contracts & Vehicles',
  description: 'Market intelligence built for IT contractors. Track $90B+ in federal IT spending, GSA Schedule 70, STARS III, CIO-SP4, SBIR/STTR opportunities, and expiring contracts in NAICS 541512.',
  path: '/for/it-contractors',
  keywords: [
    'government contracting for IT companies',
    'federal IT contracts',
    '541512 government contracts',
    'IT contractor software',
    'GSA Schedule 70',
    'federal technology contracts',
    'SBIR STTR opportunities',
    'CIO-SP4 contracts',
  ],
});

const features = [
  {
    icon: '🚀',
    title: 'Contract Vehicle Tracking',
    description: 'Monitor GSA IT Schedule 70, STARS III, CIO-SP4, Alliant 3, and 100+ other vehicles. Know which IDIQs to pursue for your technology stack.',
  },
  {
    icon: '🔬',
    title: 'SBIR/STTR R&D Opportunities',
    description: 'Track $4B+ in R&D funding from DOD, NIH, NSF, DOE. Find Phase I/II/III opportunities matched to your tech capabilities.',
  },
  {
    icon: '📡',
    title: 'Task Order Alerts',
    description: 'Get alerts for task orders under your target IDIQs. Catch $500K-$50M opportunities before they close.',
  },
  {
    icon: '🔄',
    title: 'Recompete Intelligence',
    description: 'Track expiring contracts in your tech domain. Know when incumbents are vulnerable and agencies are looking for fresh approaches.',
  },
  {
    icon: '🏛️',
    title: 'Agency IT Spending',
    description: 'See which agencies spend the most on IT: DOD ($50B+), VA ($10B+), DHS ($8B+), Treasury ($5B+). Target your BD strategically.',
  },
  {
    icon: '🎯',
    title: 'NAICS 541512 Intelligence',
    description: 'Filter by computer systems design services (541512). See who\'s winning, what they\'re bidding, and where opportunities are growing.',
  },
];

const stats = [
  { value: '$90B+', label: 'Federal IT spending annually' },
  { value: '12,000+', label: 'Active IT contracts in our database' },
  { value: '$4B+', label: 'SBIR/STTR R&D funding per year' },
  { value: '100+', label: 'Tracked IT contract vehicles' },
];

const faqs = [
  {
    question: 'What contract vehicles should IT companies pursue?',
    answer: 'The most important vehicles for IT contractors are: GSA IT Schedule 70 (baseline for federal IT procurement), STARS III (small business GWAC for IT services, up to $50B ceiling), CIO-SP4 (NIH GWAC for health IT, $50B ceiling), Alliant 3 (unrestricted IT GWAC, $75B ceiling), NASA SEWP VI (hardware/software products), and 8(a) STARS III (for 8(a) certified IT firms). Start with GSA Schedule 70 - it opens doors to 80% of federal IT opportunities.',
  },
  {
    question: 'How do I find SBIR/STTR opportunities for my technology?',
    answer: 'SBIR/STTR topics are released 3 times per year by 11 federal agencies. Our platform aggregates all topics from DOD (largest funder at $2B/year), NIH ($1.2B), NSF ($220M), DOE ($200M), NASA, DHS, and others. We parse technical abstracts and match them to your technology keywords (AI/ML, cybersecurity, cloud, IoT, etc.). Phase I awards are $50K-$275K for 6-12 months of R&D. Phase II awards are $750K-$2M for 2 years. Phase III transitions to production contracts without competition.',
  },
  {
    question: 'What\'s the difference between a vehicle and a task order?',
    answer: 'A contract vehicle is a pre-competed contract that agencies use to buy IT services quickly. Think of it like a membership - once you have it, you can compete for specific projects (task orders) without going through full and open competition. For example, if you have GSA Schedule 70, an agency can issue a task order request and you can bid against other Schedule 70 holders only. Task orders range from $100K to $100M+ and are where the real money is made.',
  },
  {
    question: 'How long does it take to win your first federal IT contract?',
    answer: 'Timeline varies by contract type: Small purchases under $250K (SAT): 30-90 days from solicitation to award. Set-asides (8(a), SDVOSB, HUBZone): 3-6 months. Full and open competition: 6-12 months. SBIR Phase I: 4-6 months from topic release to award. The fastest path is pursuing small set-asides while building relationships for larger opportunities. Most IT contractors win their first contract within 6-18 months of serious BD effort.',
  },
  {
    question: 'Which agencies spend the most on IT contractors?',
    answer: 'The top federal IT spenders are: Department of Defense ($50B+ annually - DISA, Air Force, Army, Navy all have major IT needs), Department of Veterans Affairs ($10B+ - massive EHR modernization underway), Department of Homeland Security ($8B+ - CBP, TSA, ICE, CISA all need IT infrastructure), Department of Treasury ($5B+ - IRS modernization is a multi-year effort), and Health and Human Services ($4B+ - CMS, CDC, NIH all fund health IT). Focus your BD on 2-3 agencies where your tech capabilities align with their mission-critical needs.',
  },
];

export default function ITContractorsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Mindy for IT Contractors',
        applicationCategory: 'BusinessApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Market intelligence platform for federal IT contractors. Track contracts, vehicles, SBIR/STTR opportunities, and expiring contracts in NAICS 541512.',
        operatingSystem: 'Web',
        url: `${SITE_URL}/for/it-contractors`,
      }} />

      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-semibold">FOR IT CONTRACTORS</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Win Federal IT Contracts in</span><br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              NAICS 541512
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            The federal government spends <span className="text-green-400 font-semibold">$90 billion annually</span> on
            IT services. But finding the right opportunities buried in contract vehicles, task orders, and SBIR topics
            is a full-time job. We do that job for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — Track IT Opportunities
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
                <div className="text-2xl md:text-3xl font-black text-green-400">{stat.value}</div>
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
            The IT Contractor Challenge
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            You build great technology. But federal IT procurement is a maze of contract vehicles, task orders,
            and acronyms that make it hard to find opportunities matched to your capabilities.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">🔀</div>
              <h3 className="text-white font-bold mb-2">Vehicle Confusion</h3>
              <p className="text-slate-400 text-sm">
                GSA Schedule 70, STARS III, CIO-SP4, Alliant 3, SEWP... which vehicles matter for your tech stack?
                Applying to the wrong ones wastes 6-12 months.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">💸</div>
              <h3 className="text-white font-bold mb-2">Hidden Task Orders</h3>
              <p className="text-slate-400 text-sm">
                $50M task orders get posted to FedBizOpps with 14 days notice and obscure titles. By the time you find
                them, the incumbent has already been working the opportunity for months.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">🧪</div>
              <h3 className="text-white font-bold mb-2">SBIR/STTR Overload</h3>
              <p className="text-slate-400 text-sm">
                11 agencies release 2,000+ SBIR/STTR topics per year. Finding the 3-5 topics that match your tech
                requires reading thousands of pages of technical abstracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Built for IT Contractors
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract Vehicles Section */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Key IT Contract Vehicles We Track
          </h2>

          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-2">GSA IT Schedule 70</h3>
              <p className="text-slate-400 text-sm mb-2">
                The foundation for federal IT procurement. Required for most agency direct buys. Covers hardware,
                software, IT services, cloud, and cybersecurity.
              </p>
              <span className="text-green-400 text-xs font-medium">Ceiling: Unlimited | Timeline: 4-6 months | Best for: All IT contractors</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-2">STARS III (Small Business GWAC)</h3>
              <p className="text-slate-400 text-sm mb-2">
                Small business GWAC for IT services across all federal agencies. Includes 8(a) STARS III track for certified firms.
              </p>
              <span className="text-green-400 text-xs font-medium">Ceiling: $50B | Timeline: Open periodically | Best for: Small business IT services</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-2">CIO-SP4 (NIH Health IT)</h3>
              <p className="text-slate-400 text-sm mb-2">
                NIH&apos;s Chief Information Officer - Solutions and Partners 4. Health IT, scientific computing, and IT services for HHS agencies.
              </p>
              <span className="text-green-400 text-xs font-medium">Ceiling: $50B | Timeline: 10-year IDIQ | Best for: Health IT and scientific computing</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-2">Alliant 3 (Unrestricted GWAC)</h3>
              <p className="text-slate-400 text-sm mb-2">
                GSA&apos;s unrestricted IT GWAC for large, complex enterprise IT. Available to all business sizes.
              </p>
              <span className="text-green-400 text-xs font-medium">Ceiling: $75B | Timeline: Competed periodically | Best for: Enterprise IT integrators</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-2">NASA SEWP VI</h3>
              <p className="text-slate-400 text-sm mb-2">
                Solutions for Enterprise-Wide Procurement. Focus on hardware, software licenses, and IT products (not services).
              </p>
              <span className="text-green-400 text-xs font-medium">Ceiling: Unlimited | Timeline: Open contract | Best for: IT hardware/software resellers</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How IT Contractors Use Our Platform
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Set Up Your Tech Profile</h3>
                <p className="text-slate-400">
                  Tell us your technology stack (cloud, cybersecurity, AI/ML, software dev, data analytics, etc.),
                  contract vehicles you hold, and target contract size. We&apos;ll match opportunities to your capabilities.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Get Daily IT Opportunity Alerts</h3>
                <p className="text-slate-400">
                  Our AI scans thousands of sources daily: SAM.gov solicitations, SBIR/STTR topics, agency forecasts,
                  task order releases, and expiring contracts. You get a personalized feed matched to your tech domain.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Track Vehicles & Recompetes</h3>
                <p className="text-slate-400">
                  Monitor which contract vehicles to pursue based on your tech stack and business size. Get alerts when
                  incumbents are nearing contract expiration - your best chance to break in.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 font-bold flex items-center justify-center flex-shrink-0">4</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Win Your First Federal IT Contract</h3>
                <p className="text-slate-400">
                  With better intelligence, you target the right vehicles, find opportunities earlier, and build
                  relationships before RFPs drop. That&apos;s how IT contractors go from zero to $10M in federal revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-3">{faq.question}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            IT Contractor Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/gsa-schedule" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition">
              <h3 className="text-white font-bold mb-2">GSA Schedule Guide</h3>
              <p className="text-slate-400 text-sm">Complete guide to getting on GSA Schedule 70 and winning task orders.</p>
              <span className="text-green-400 text-sm font-medium mt-3 inline-block">Read Guide →</span>
            </Link>
            <Link href="/blog/federal-contract-vehicles-guide" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition">
              <h3 className="text-white font-bold mb-2">Contract Vehicles Guide</h3>
              <p className="text-slate-400 text-sm">GWAC vs IDIQ vs BPA - which vehicles matter for IT contractors.</p>
              <span className="text-green-400 text-sm font-medium mt-3 inline-block">Compare →</span>
            </Link>
            <Link href="/guides/sbir-sttr" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition">
              <h3 className="text-white font-bold mb-2">SBIR/STTR Guide</h3>
              <p className="text-slate-400 text-sm">How to win R&D funding for innovative technology development.</p>
              <span className="text-green-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Win More Federal IT Contracts
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start free and track IT opportunities matched to your technology stack.
          </p>
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
    </main>
  );
}
