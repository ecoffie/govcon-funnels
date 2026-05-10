import Link from 'next/link';
import { generateSeo, serviceJsonLd, faqJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Government Contract Help — Expert Guidance for Small Businesses',
  description:
    'Need help with government contracting? GovCon Giants offers free courses, expert consulting, and AI-powered tools to help your small business win federal contracts.',
  path: '/government-contract-help',
  keywords: [
    'government contract help',
    'government contracting help',
    'help with government contracts',
    'federal contracting assistance',
    'government contract support',
    'small business government contracts help',
  ],
});

const faqs = [
  {
    question: 'How do I get started with government contracting?',
    answer:
      'Start by registering your business on SAM.gov (free), identifying your NAICS codes, and building a capability statement. Our free course walks you through every step from registration to your first proposal.',
  },
  {
    question: 'Do I need certifications to bid on government contracts?',
    answer:
      'No certifications are required for general small business set-asides. However, SBA certifications like 8(a), SDVOSB, HUBZone, and WOSB open additional set-aside and sole-source opportunities that can significantly increase your win rate.',
  },
  {
    question: 'How much does it cost to start bidding on government contracts?',
    answer:
      'SAM.gov registration is completely free. The main investment is your time to learn the process, research opportunities, and prepare proposals. Our free course and guides cover everything you need to get started at no cost.',
  },
  {
    question: 'How long does it take to win a government contract?',
    answer:
      'Most new contractors should expect 6-12 months from starting the process to their first win. This includes registration, market research, and the proposal cycle. Subcontracting can produce results faster.',
  },
  {
    question: 'Can a one-person business get government contracts?',
    answer:
      'Yes. Sole proprietors, LLCs, and small firms of any size can register on SAM.gov and compete for federal contracts. Many contracts, especially in professional services and IT, are well-suited for small teams.',
  },
];

const helpPaths = [
  {
    icon: '🎓',
    title: 'Free GovCon Course',
    description:
      'Our comprehensive video course covers SAM.gov registration, capability statements, finding opportunities, and submitting your first proposal — completely free.',
    cta: 'Start Learning Free',
    href: '/free-course',
  },
  {
    icon: '📚',
    title: 'In-Depth Guides',
    description:
      'Written guides on every topic — from SAM.gov registration and SBA certifications to proposal writing and federal market research.',
    cta: 'Browse Guides',
    href: '/guides',
  },
  {
    icon: '🤝',
    title: '1-on-1 Consulting',
    description:
      'Work directly with our team for SAM.gov registration review, NAICS code analysis, bid strategy, proposal support, and certification guidance.',
    cta: 'Book a Consultation',
    href: '/consulting',
  },
  {
    icon: '🛠️',
    title: 'AI-Powered Tools',
    description:
      'Market Assassin, Content Reaper, and Market Intelligence — AI tools built specifically for government contractors to find and win opportunities faster.',
    cta: 'Explore Tools',
    href: '/tools',
  },
  {
    icon: '⭐',
    title: 'Pro Membership',
    description:
      'Get full access to premium training, advanced tools, live bootcamps, and priority support to accelerate your government contracting growth.',
    cta: 'Go Pro',
    href: '/premium',
  },
  {
    icon: '🏋️',
    title: 'Bootcamp Training',
    description:
      'Intensive live training programs focused on specific skills — contract vehicles, proposal writing, and more. Hands-on, cohort-based learning.',
    cta: 'View Bootcamps',
    href: '/bootcamp',
  },
];

export default function GovernmentContractHelpPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd
        data={serviceJsonLd({
          name: 'Government Contract Help — GovCon Giants',
          description:
            'Expert government contracting guidance for small businesses including free courses, consulting, and AI-powered tools.',
          url: 'https://govcongiants.com/government-contract-help',
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Need Help With{' '}
            <span className="text-green-500">Government Contracts</span>?
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Whether you are just getting started or ready to scale, we have the
            training, tools, and expert support to help your small business win
            federal contracts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-course"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Start the Free Course
            </Link>
            <Link
              href="/consulting"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all border border-slate-700"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            How We Help Small Businesses Win
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpPaths.map((path) => (
              <div
                key={path.title}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col"
              >
                <div className="text-3xl mb-3">{path.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {path.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 flex-1">
                  {path.description}
                </p>
                <Link
                  href={path.href}
                  className="text-green-500 hover:text-green-400 text-sm font-semibold transition"
                >
                  {path.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            The Federal Market Is Waiting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">
                $700B+
              </div>
              <p className="text-slate-400 text-sm">
                Annual federal contract spending
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">23%</div>
              <p className="text-slate-400 text-sm">
                Reserved for small businesses by law
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-500 mb-2">
                $161B
              </div>
              <p className="text-slate-400 text-sm">
                Awarded to small businesses annually
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-slate-900 border border-green-600/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            Join thousands of small businesses already learning how to win
            government contracts. Start with our free course — no credit card
            required.
          </p>
          <Link
            href="/free-course"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
          >
            Start the Free Course
          </Link>
        </div>
      </section>
    </main>
  );
}
