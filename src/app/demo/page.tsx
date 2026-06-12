import Link from 'next/link';
import { generateSeo, SITE_URL, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import DemoTabs from './DemoTabs';

// SEO metadata
export const metadata = generateSeo({
  title: 'Government Contracting Software Demo | See Mindy in Action',
  description: 'Watch a live demo of Mindy platform. Search 24K+ opportunities, track contracts, AI briefings, and more. Try the federal contract finder demo free.',
  path: '/demo',
  keywords: [
    'government contracting software demo',
    'federal contract finder demo',
    'govcon tools demo',
    'government contract intelligence demo',
    'market intelligence demo',
    'sam.gov alternative demo',
    'federal opportunity finder demo',
    'contract tracking software demo',
  ],
});

const demos = [
  {
    id: 'opportunity-search',
    title: 'Opportunity Search',
    description: 'Search 24K+ federal contracts across SAM.gov, Grants.gov, NIH, DARPA, and 50+ state portals with AI-powered matching.',
    features: ['Advanced filters', 'Set-aside tracking', 'NAICS-based search', 'Real-time alerts'],
  },
  {
    id: 'pipeline-management',
    title: 'Pipeline Management',
    description: 'Track opportunities from discovery to award. Collaborate with your team and forecast your pipeline with built-in CRM.',
    features: ['Gate review tracking', 'Team collaboration', 'Win probability', 'Revenue forecasting'],
  },
  {
    id: 'ai-briefings',
    title: 'AI Briefings',
    description: 'Daily and weekly intelligence briefings powered by AI. Get curated opportunities and market insights in your inbox every morning.',
    features: ['Daily briefings', 'Custom preferences', 'Agency updates', 'Saves 10+ hrs/week'],
  },
  {
    id: 'contractor-database',
    title: 'Contractor Database',
    description: 'Research 3,500+ contractors with contract history, NAICS codes, SBLOs, and teaming opportunities.',
    features: ['Contract history', 'SBLO contacts', 'Teaming partners', 'Competitive intel'],
  },
];

const faqs = [
  {
    question: 'How long is the free trial?',
    answer: 'The free tier is unlimited and includes opportunity search, 7,700+ forecasts, and basic alerts. Upgrade anytime for AI briefings, Pipeline CRM, and SBLO contacts.',
  },
  {
    question: 'Do I need a credit card to try the demo?',
    answer: 'No. Create a free account with just your email. No credit card required for the free tier.',
  },
  {
    question: 'What data sources does Mindy use?',
    answer: 'We aggregate from SAM.gov, Grants.gov, USASpending, NIH RePORTER, DARPA, NSF, DOE Labs, acquisitiongateway.gov forecasts, and 50+ state contracting portals.',
  },
  {
    question: 'Can I export opportunity data?',
    answer: 'Yes. Pro and Core members can export search results to CSV/Excel for offline analysis and tracking.',
  },
  {
    question: 'How is this different from Deltek GovWin or GovTribe?',
    answer: 'We focus on small businesses with an affordable price ($149-499/yr vs $6,000+), AI-curated briefings, and direct SBLO contacts for teaming. No complex enterprise features you don\'t need.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'All members get email support. Core and Pro members get priority support with 24-hour response time.',
  },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* JSON-LD Schema */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Mindy',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Federal contracting intelligence platform for small businesses. Find government contracts, track opportunities, and win more federal work.',
        url: `${SITE_URL}/demo`,
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '0',
          highPrice: '499',
          priceCurrency: 'USD',
          offerCount: 3,
        },
        screenshot: `${SITE_URL}/images/demo-screenshot.png`,
        featureList: [
          'Opportunity Search',
          'Pipeline Management',
          'AI-Powered Briefings',
          'Contractor Database',
          'Forecast Intelligence',
          'SBLO Contact Database',
          'Recompete Tracker',
          'Agency Pain Points',
        ].join(', '),
      }} />

      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-semibold">INTERACTIVE DEMO</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">See Mindy</span><br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              in Action
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Watch how GovCon Giants helps small businesses find federal contracts, track opportunities,
            and compete with contractors 10x their size.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Try It Free - No Credit Card
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

      {/* Video Demo */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Platform Walkthrough
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Watch a 5-minute overview of the Mindy and see how contractors are using it to win more federal work.
            </p>
          </div>

          <div className="relative w-full aspect-video bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Mindy Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="text-center mt-6">
            <Link
              href="/mi-free"
              className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all"
            >
              Start Your Free Trial →
            </Link>
          </div>
        </div>
      </section>

      {/* See MI in Action - Tabbed Demos */}
      <DemoTabs demos={demos} />

      {/* Social Proof */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span className="text-green-400 font-semibold">TRUSTED BY 5,000+ CONTRACTORS</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Join the Contractors Using MI to Win More Work
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Small businesses across the country use Mindy to find opportunities,
            track their pipeline, and compete for federal contracts.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">5,000+</div>
              <div className="text-sm text-slate-500">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">24K+</div>
              <div className="text-sm text-slate-500">Opportunities Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">10+ hrs</div>
              <div className="text-sm text-slate-500">Saved Per Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">90%</div>
              <div className="text-sm text-slate-500">Less Than Enterprise</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <div className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-slate-400">8(a) Contractors</span>
            </div>
            <div className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-slate-400">SDVOSB</span>
            </div>
            <div className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-slate-400">HUBZone</span>
            </div>
            <div className="px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl">
              <span className="text-slate-400">WOSB/EDWOSB</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Demo & Trial FAQ
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Common questions about trying Mindy
          </p>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group"
              >
                <summary className="px-6 py-4 cursor-pointer list-none flex justify-between items-center hover:bg-slate-800/50 transition">
                  <span className="font-semibold text-white">{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-slate-400">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Free Trial
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            No credit card required. Access the opportunity finder, forecasts, and basic alerts free forever.
            Upgrade when you&apos;re ready for AI briefings and Pipeline CRM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
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
