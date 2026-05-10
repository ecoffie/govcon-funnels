import Link from 'next/link';
import { generateSeo, SITE_URL, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Government Staffing Contracts — Market Intelligence for Agencies (NAICS 561320)',
  description: 'Federal contract intelligence for staffing agencies and temporary help services. Find staff aug contracts, GSA Schedule 738 opportunities, and labor category demand across federal agencies.',
  path: '/for/staffing-agencies',
  keywords: [
    'government staffing contracts',
    'federal staffing agency',
    '561320 government contracts',
    'temporary staffing government',
    'staff augmentation contracts',
    'GSA Schedule 738',
    'federal labor categories',
    'government temp services',
  ],
});

const features = [
  {
    icon: '👥',
    title: 'Labor Category Tracking',
    description: 'Monitor demand for specific labor categories across agencies. See which skills are in highest demand and where.',
  },
  {
    icon: '📋',
    title: 'GSA Schedule 738 Intelligence',
    description: 'Track opportunities under GSA Schedule 738 (HR & Staffing Solutions). Get alerts when task orders are posted.',
  },
  {
    icon: '🔔',
    title: 'Task Order Alerts',
    description: 'Get notified when agencies post task orders for staff augmentation under existing IDIQs and BPAs.',
  },
  {
    icon: '🔐',
    title: 'Clearance Requirement Filters',
    description: 'Filter opportunities by clearance level: Public Trust, Secret, Top Secret, TS/SCI. Match to your talent pool.',
  },
  {
    icon: '📍',
    title: 'Geographic Location Filtering',
    description: 'Find contracts by location (DC metro, remote, on-site). Match opportunities to where your candidates are.',
  },
  {
    icon: '💼',
    title: 'Prime Contractor Network',
    description: 'Access contacts at 800+ prime contractors actively seeking staffing subcontractors for their task orders.',
  },
];

const stats = [
  { value: '$4.2B+', label: 'Annual federal staffing spending (NAICS 561320)' },
  { value: '2,800+', label: 'Active staffing contracts in SAM.gov' },
  { value: '45%', label: 'Of staff aug contracts go to small businesses' },
  { value: '$150M', label: 'Average GSA Schedule 738 ceiling value' },
];

const faqs = [
  {
    question: 'Do I need a GSA Schedule to compete for federal staffing contracts?',
    answer: 'Not always. While GSA Schedule 738 (HR & Staffing Solutions) gives you access to task order competitions, many agencies also post open market staffing opportunities directly on SAM.gov. However, having a GSA Schedule significantly increases your addressable market since many agencies prefer to buy from schedule holders.',
  },
  {
    question: 'What labor categories are in highest demand in federal staffing?',
    answer: 'The top in-demand categories are: IT professionals (software developers, cybersecurity analysts, data scientists), program/project managers, administrative support, engineering professionals, and healthcare workers. Clearance requirements vary by agency, with defense and intelligence agencies requiring Secret or TS/SCI for many positions.',
  },
  {
    question: 'How do staffing agencies find subcontracting opportunities with primes?',
    answer: 'Prime contractors often need staffing partners to fulfill labor category requirements on large contracts. Our platform provides contact information for Small Business Liaison Officers (SBLOs) at major primes like Booz Allen, Leidos, CACI, and Peraton. We also track which primes are winning staff augmentation contracts and when they\'ll need subcontractor support.',
  },
  {
    question: 'What\'s the difference between staff augmentation and managed services contracts?',
    answer: 'Staff augmentation contracts provide individual labor categories (essentially "bodies") to augment the agency\'s existing team. The agency manages the work. Managed services contracts (NAICS 541611, 541512, etc.) involve delivering outcomes or services where your company manages the team. Many staffing agencies pursue both types.',
  },
  {
    question: 'How long does it take to win your first federal staffing contract?',
    answer: 'For agencies with an established commercial track record, expect 6-12 months from SAM.gov registration to first win. The timeline shortens if you: (1) pursue subcontracting first to build past performance, (2) target smaller task orders ($100K-$500K) instead of large prime contracts, and (3) focus on 2-3 labor categories where you have deep bench strength.',
  },
];

export default function StaffingAgenciesPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'GovCon Giants for Staffing Agencies',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: 'Federal contract intelligence for staffing agencies and temporary help services (NAICS 561320).',
        url: `${SITE_URL}/for/staffing-agencies`,
      }} />

      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
            <span className="text-purple-400 font-semibold">FOR STAFFING AGENCIES</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            <span className="text-white">Win Federal</span><br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Staffing Contracts
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Federal agencies spend <span className="text-purple-400 font-semibold">$4.2 billion annually</span> on
            temporary help and staff augmentation services. Find the contracts, track labor category demand,
            and connect with primes who need your talent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start Free — Find Staffing Contracts
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
                <div className="text-2xl md:text-3xl font-black text-purple-400">{stat.value}</div>
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
            The Federal Staffing Challenge
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Federal agencies need your talent, but finding the right opportunities at the right time
            is harder than it should be.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">🔍</div>
              <h3 className="text-white font-bold mb-2">Hidden Task Orders</h3>
              <p className="text-slate-400 text-sm">
                Most staff augmentation work comes through task orders under existing IDIQs.
                By the time you see them on SAM.gov, primes have already been positioning for weeks.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">⏱️</div>
              <h3 className="text-white font-bold mb-2">Short Turnarounds</h3>
              <p className="text-slate-400 text-sm">
                Staffing solicitations often have 7-14 day response windows. You need to know about
                them immediately and have your clearance-eligible candidates ready to go.
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-red-400 text-3xl mb-3">🎯</div>
              <h3 className="text-white font-bold mb-2">Clearance Matching</h3>
              <p className="text-slate-400 text-sm">
                Defense and intel contracts require specific clearance levels. Without filters for
                Secret, TS, or TS/SCI requirements, you waste time on opportunities you can&apos;t fill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Built for Staffing Agencies
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition">
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
            How Staffing Agencies Use Our Platform
          </h2>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Define Your Labor Categories</h3>
                <p className="text-slate-400">
                  Tell us which labor categories you specialize in (IT, engineering, admin, healthcare, etc.),
                  clearance levels you can support, and geographic locations where you have talent.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Get Daily Task Order Alerts</h3>
                <p className="text-slate-400">
                  Our AI monitors thousands of federal opportunities daily and surfaces staff augmentation
                  task orders, GSA Schedule 738 opportunities, and open market staffing solicitations matched to your profile.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Connect with Primes</h3>
                <p className="text-slate-400">
                  Access SBLO contacts at major primes (Booz Allen, Leidos, CACI, Peraton). See which primes
                  are winning staff aug contracts and position yourself as their staffing partner.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center flex-shrink-0">4</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Submit Faster, Win More</h3>
                <p className="text-slate-400">
                  With early visibility into opportunities and intel on agency preferences, you respond faster
                  with stronger proposals. That&apos;s how staffing agencies win in the federal market.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Common Use Cases
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-3">IT Staff Augmentation</h3>
              <p className="text-slate-400 text-sm mb-4">
                Track demand for developers, cybersecurity analysts, data scientists, and cloud engineers.
                Filter by clearance (Secret, TS/SCI) and location (remote vs. on-site).
              </p>
              <div className="text-purple-400 text-sm font-medium">
                Example: DHS needs 10 Python developers, Secret clearance, remote work authorized
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-3">Administrative Support</h3>
              <p className="text-slate-400 text-sm mb-4">
                Find opportunities for executive assistants, administrative assistants, program coordinators,
                and project support staff at federal agencies.
              </p>
              <div className="text-purple-400 text-sm font-medium">
                Example: VA needs 5 admin assistants, GS-7 equivalent, DC metro area
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-3">Engineering Services</h3>
              <p className="text-slate-400 text-sm mb-4">
                Monitor demand for civil, mechanical, electrical, and environmental engineers supporting
                infrastructure projects at agencies like DOT, Army Corps, and GSA.
              </p>
              <div className="text-purple-400 text-sm font-medium">
                Example: Army Corps needs 3 civil engineers, PE license required, Norfolk VA
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-white font-bold text-lg mb-3">Healthcare Staffing</h3>
              <p className="text-slate-400 text-sm mb-4">
                Track opportunities for nurses, physicians, medical technicians, and healthcare administrators
                at VA, DoD medical facilities, and Indian Health Service.
              </p>
              <div className="text-purple-400 text-sm font-medium">
                Example: VA needs 20 RNs, BSN required, Walter Reed National Military Medical Center
              </div>
            </div>
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
                <h3 className="text-white font-bold text-lg mb-3">{faq.question}</h3>
                <p className="text-slate-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Staffing Agency Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/guides/gsa-schedule" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <h3 className="text-white font-bold mb-2">GSA Schedule Guide</h3>
              <p className="text-slate-400 text-sm">How to get on GSA Schedule 738 (HR & Staffing Solutions).</p>
              <span className="text-purple-400 text-sm font-medium mt-3 inline-block">Read Guide →</span>
            </Link>
            <Link href="/guides/naics-codes" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <h3 className="text-white font-bold mb-2">NAICS Codes Guide</h3>
              <p className="text-slate-400 text-sm">Learn about NAICS 561320 (Temporary Help Services) and related codes.</p>
              <span className="text-purple-400 text-sm font-medium mt-3 inline-block">Learn More →</span>
            </Link>
            <Link href="/data/contractors" className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition">
              <h3 className="text-white font-bold mb-2">Prime Contractor Database</h3>
              <p className="text-slate-400 text-sm">Find primes who need staffing subcontractors for their task orders.</p>
              <span className="text-purple-400 text-sm font-medium mt-3 inline-block">Explore Database →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-purple-900/30 to-slate-900 border border-purple-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Finding Federal Staffing Contracts
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Get instant access to staff augmentation opportunities, labor category demand intel,
            and prime contractor contacts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-lg transition-all"
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
