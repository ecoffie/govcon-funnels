import Link from 'next/link';
import { generateSeo, SITE_URL, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Federal Consulting Contracts — Market Intelligence for Professional Services (NAICS 541611)',
  description: 'Government contracting intelligence built for management consulting firms. Track $70B+ in federal professional services spending, GSA PSS Schedule opportunities, BPA/IDIQ task orders, and labor category rates.',
  path: '/for/professional-services',
  keywords: [
    'government consulting contracts',
    'federal professional services',
    '541611 government contracts',
    'management consulting government',
    'gsa pss schedule',
    'federal consulting opportunities',
    'professional services contracts',
    'idiq consulting',
  ],
});

const features = [
  {
    icon: '🎯',
    title: 'PSC Code Filtering (R Series)',
    description: 'Filter by R425 (Program Management), R499 (Consulting), R408 (IT Management), R706 (Systems Engineering), and 100+ consulting-specific PSC codes.',
  },
  {
    icon: '💰',
    title: 'Labor Category Rate Analysis',
    description: 'Benchmark your labor rates against awarded contracts. See what agencies pay for Senior Consultants, Program Managers, and Technical Advisors.',
  },
  {
    icon: '📑',
    title: 'BPA/IDIQ Task Order Tracker',
    description: 'Monitor task order releases under existing vehicles. Know when agencies issue calls under GSA OASIS, Alliant 2, CIO-SP4, and 8(a) STARS III.',
  },
  {
    icon: '🏛️',
    title: 'GSA PSS Schedule Intelligence',
    description: 'Track Schedule 70 SIN updates, modifications, and competing contractors. Find agencies actively buying from the schedule.',
  },
  {
    icon: '🤝',
    title: 'Teaming Partner Finder',
    description: 'Connect with prime contractors seeking subject matter expertise. Find small business partners with complementary certifications (8(a), WOSB, SDVOSB).',
  },
  {
    icon: '🔮',
    title: 'Forecast Intelligence (7,700+ Forecasts)',
    description: 'See what agencies plan to procure 6-18 months before solicitation. Includes NIH, DARPA, DOE Labs, and major consulting buyers.',
  },
];

const stats = [
  { value: '$70B+', label: 'Federal professional services annually' },
  { value: '12,500+', label: 'Active consulting opportunities' },
  { value: '$800M', label: 'DOD Management Support (avg/year)' },
  { value: '4,200+', label: 'GSA Schedule 70 holders' },
];

const faqs = [
  {
    question: 'What NAICS codes are tracked for professional services?',
    answer: 'We track NAICS 541611 (Management Consulting), 541612 (HR Consulting), 541618 (Other Management Consulting), 541330 (Engineering Services), and 541512 (IT Consulting). You can filter by one or multiple codes to match your capabilities.',
  },
  {
    question: 'How do I find BPA task orders before they\'re posted on SAM.gov?',
    answer: 'Our forecast intelligence aggregates agency procurement plans from 7,700+ sources including NIH RePORTER, DARPA solicitations, DOE lab forecasts, and agency acquisition gateway entries. We alert you 6-18 months before solicitation, giving you time to build relationships and position for the task order release.',
  },
  {
    question: 'What agencies spend the most on management consulting?',
    answer: 'Top buyers include DOD ($800M+/year for management support), VA ($600M+ for healthcare consulting), DHS ($500M+ for mission support), HHS ($450M+ for program evaluation), and GSA ($300M+ for acquisition support). Our platform shows spending by agency, office, and NAICS code.',
  },
  {
    question: 'How do I compete against Big 4 firms (Deloitte, Accenture, Booz Allen)?',
    answer: 'Focus on small business set-asides (8(a), WOSB, SDVOSB), which Big 4 can\'t compete for. Track contracts expiring in 6-12 months where you can compete as an incumbent replacement. Partner with primes as a sub for specialized expertise. Use our labor rate benchmarking to price competitively without leaving money on the table.',
  },
  {
    question: 'Do you track GSA Schedule 70 modifications and SIN updates?',
    answer: 'Yes. We monitor GSA Schedule 70 (Professional Services Schedule) modifications including new SINs added, scope changes, and contract expirations. We also track which agencies are actively buying from the schedule so you know where to market your GSA contract.',
  },
];

export default function ProfessionalServicesPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'GovCon Giants for Professional Services Firms',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Federal contracting intelligence platform for management consulting and professional services firms. Track $70B+ in annual spending, GSA Schedule opportunities, and BPA/IDIQ task orders.',
        url: `${SITE_URL}/for/professional-services`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free trial available',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '127',
        },
      }} />

      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <span className="text-blue-400 font-semibold">FOR PROFESSIONAL SERVICES FIRMS</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Win More</span><br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Federal Consulting Contracts
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Track <span className="text-blue-400 font-semibold">$70 billion</span> in annual federal professional
            services spending. Find GSA Schedule opportunities, BPA task orders, and agencies actively buying
            management consulting (NAICS 541611).
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — Track Consulting Opps
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
                <div className="text-2xl md:text-3xl font-black text-blue-400">{stat.value}</div>
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
            The Federal Consulting Challenge
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Federal agencies spend $70B+ on professional services annually. But most consulting
            opportunities are hidden in agency plans, BPA task orders, and schedule modifications.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">📋</div>
              <h3 className="text-white font-bold mb-2">Task Order Invisibility</h3>
              <p className="text-slate-400 text-sm">
                80% of consulting spend flows through existing IDIQs (OASIS, Alliant, 8(a) STARS).
                Task orders post for 5-15 days. Miss the window, miss the revenue.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">💸</div>
              <h3 className="text-white font-bold mb-2">Pricing Guesswork</h3>
              <p className="text-slate-400 text-sm">
                Without labor rate intelligence, you either overprice (lose bid) or underprice
                (win unprofitable work). Agencies pay $85-$250/hr for Senior Consultants depending on domain.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">🏢</div>
              <h3 className="text-white font-bold mb-2">Big 4 Dominance</h3>
              <p className="text-slate-400 text-sm">
                Deloitte, Accenture, Booz Allen hold massive IDIQs. Your only edge: small business
                set-asides, niche expertise, and finding opportunities before the majors see them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Built for Consulting Firms
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition">
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
            How Consulting Firms Use Our Platform
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Set Your Target Profile</h3>
                <p className="text-slate-400">
                  Select NAICS codes (541611, 541512, 541330) and PSC codes (R425, R499, R408)
                  that match your consulting practice areas. Choose geographic focus and contract size range.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Get Daily Opportunity Alerts</h3>
                <p className="text-slate-400">
                  Our AI scans SAM.gov, agency forecasts, GSA Schedule modifications, and IDIQ task order
                  releases. Get alerts for consulting opportunities matched to your profile before competitors see them.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Benchmark Labor Rates & Build Pricing</h3>
                <p className="text-slate-400">
                  See what agencies paid for similar consulting work. Filter by labor category (Senior Consultant,
                  Program Manager, Technical Advisor), agency, and NAICS code. Price competitively without guessing.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center flex-shrink-0">4</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Track Your Pipeline & Win Rate</h3>
                <p className="text-slate-400">
                  Manage bids in your pipeline, track proposal deadlines, connect with teaming partners,
                  and measure win rate by agency, contract type, and competition level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-white font-bold text-lg mb-3">{faq.question}</h3>
                <p className="text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Resources for Professional Services Firms
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/gsa-schedule" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition">
              <h3 className="text-white font-bold mb-2">GSA Schedule Guide</h3>
              <p className="text-slate-400 text-sm">Complete guide to getting on GSA Schedule 70 (Professional Services Schedule).</p>
              <span className="text-blue-400 text-sm font-medium mt-3 inline-block">Read Guide →</span>
            </Link>
            <Link href="/guides/contract-vehicles" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition">
              <h3 className="text-white font-bold mb-2">IDIQ Contract Vehicles</h3>
              <p className="text-slate-400 text-sm">Understand OASIS, Alliant 2, CIO-SP4, and other major consulting vehicles.</p>
              <span className="text-blue-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/guides/naics-codes" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition">
              <h3 className="text-white font-bold mb-2">NAICS Code Guide</h3>
              <p className="text-slate-400 text-sm">Choose the right NAICS codes for your consulting services (541611, 541512, 541330).</p>
              <span className="text-blue-400 text-sm font-medium mt-3 inline-block">Explore Codes →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-900/30 to-slate-900 border border-blue-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stop Missing Federal Consulting Opportunities
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Track $70B+ in professional services spending. Find BPA task orders, GSA Schedule opportunities,
            and forecast intelligence before your competitors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all"
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
