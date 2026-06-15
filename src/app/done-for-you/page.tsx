import Link from 'next/link';
import FomoCountdown from '@/components/FomoCountdown';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Done-for-You Federal Contract Consulting - Limited Spots',
  description:
    'Only 5 spots available this month. Let our team handle BD, proposals, and opportunity capture while you focus on delivery.',
  path: '/done-for-you',
  keywords: [
    'done for you government contracting',
    'white glove federal contract',
    'govcon consulting',
    'fractional business development',
    'federal contract consulting',
  ],
});

const CALENDLY_URL = 'https://calendly.com/govconedumeet/gcg-bd-discovery';

const SPOTS_TOTAL = 5;
const SPOTS_TAKEN = 2;

const stats = [
  { value: '$750B+', label: 'Annual Federal Spending' },
  { value: '23%', label: 'Set Aside for Small Biz' },
  { value: '5,000+', label: 'Members Trained' },
  { value: '$2B+', label: 'Contracts Won' },
];

const consultingPlans = [
  {
    emoji: '🧠',
    name: 'Consulting Pack',
    price: '20 hours of 1-on-1 support',
    description:
      'One-on-one consulting package with 20 dedicated hours to map strategy, review opportunities, and execute your next federal growth moves.',
    features: [
      '20 hours of direct consulting support',
      'Personalized strategy and execution plan',
      'Opportunity and proposal review sessions',
    ],
  },
  {
    emoji: '⚡',
    name: 'Accelerator Program',
    price: '90-day intensive with weekly 1:1 coaching',
    description:
      '90 days of intensive support with 12 weekly one-on-one coaching sessions. Get personalized guidance through the federal contracting process with step-by-step implementation support.',
    features: [
      '12 weekly 1:1 coaching sessions',
      '90-day intensive program',
      'Full Lifetime Program access',
      'Goal: contract-ready by completion',
    ],
  },
];

const whiteGloveFeatures = [
  {
    title: 'Dedicated Consultant',
    detail: 'Fractional BD support exclusively for your team',
  },
  {
    title: 'Tailored Strategy',
    detail: 'Custom strategy and execution designed for your company',
  },
  {
    title: 'Monthly Retainer Options',
    detail: 'Flexible retainer packages to fit your needs',
  },
  {
    title: 'Full-Service Support',
    detail: 'From opportunity identification to proposal submission and beyond',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Book a Strategy Call',
    body: 'A 30-minute call to understand your business, goals, and current pipeline.',
  },
  {
    step: 2,
    title: 'We Audit Your Capture Gaps',
    body: 'We review your SAM registration, certifications, past performance, and opportunity fit.',
  },
  {
    step: 3,
    title: 'You Pick Consulting or White Glove',
    body: 'Based on your stage, revenue, and bandwidth, we recommend the right level of support.',
  },
  {
    step: 4,
    title: 'We Get to Work',
    body: 'Opportunities flow in, proposals go out, and you focus on delivering the work.',
  },
];

const faqs = [
  {
    q: 'Why only 5 spots?',
    a: 'Done-for-you services are capacity-constrained. Each client gets a dedicated consultant and hands-on proposal support — we cap enrollment at 5 per month so every client gets the attention they paid for.',
  },
  {
    q: "What's the difference between Consulting and White Glove?",
    a: 'Consulting is done-WITH-you: we coach, review, and guide while you execute. White Glove is done-FOR-you: we run business development, identify opportunities, and lead proposal efforts for your company.',
  },
  {
    q: 'How fast can we start?',
    a: "Once you book a strategy call and we confirm fit, most clients are onboarded within 7 to 10 business days. If you're ready to move fast, we can accelerate.",
  },
  {
    q: 'Do you guarantee contract wins?',
    a: 'No ethical consultant can guarantee a specific win — the government makes awards, not us. What we guarantee is process: more qualified opportunities in your pipeline, higher-quality submissions, and measurable improvement in your win rate.',
  },
  {
    q: 'What industries do you cover?',
    a: 'Construction, IT and software, engineering services, professional services, medical and scientific equipment, logistics, and facilities. If your NAICS shows up in the federal budget, we can help.',
  },
  {
    q: 'What if I need to reschedule?',
    a: 'Easy — use the reschedule link in your Calendly confirmation email. No fees, no friction.',
  },
];

function SpotsTracker() {
  const spotsLeft = SPOTS_TOTAL - SPOTS_TAKEN;
  const percentTaken = (SPOTS_TAKEN / SPOTS_TOTAL) * 100;

  let barColor = 'bg-green-500';
  if (percentTaken >= 80) barColor = 'bg-red-500';
  else if (percentTaken >= 50) barColor = 'bg-amber-500';

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-white">
          {spotsLeft} of {SPOTS_TOTAL} spots remaining
        </span>
        <span className="text-xs text-slate-400">This month</span>
      </div>
      <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden border border-slate-700">
        <div
          className={`h-full ${barColor} transition-all`}
          style={{ width: `${percentTaken}%` }}
          role="progressbar"
          aria-valuenow={SPOTS_TAKEN}
          aria-valuemin={0}
          aria-valuemax={SPOTS_TOTAL}
          aria-label={`${SPOTS_TAKEN} of ${SPOTS_TOTAL} spots taken`}
        />
      </div>
      <p className="text-xs text-slate-500 mt-2 text-center">
        Once all 5 spots are filled, the door closes until next month.
      </p>
    </div>
  );
}

export default function DoneForYouPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="pt-14 pb-16 px-6 border-b border-slate-900">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-red-950 border border-red-900 text-red-400 px-4 py-2 rounded-full text-xs md:text-sm font-bold mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-hidden="true" />
            LIMITED ENROLLMENT — ENDS THIS MONTH
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Let Us Win Your Next{' '}
            <span className="text-green-500">Federal Contract</span> For You
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            We&apos;re only accepting <span className="text-white font-semibold">5 new clients</span>{' '}
            this month for Done-for-You GovCon services. Our team runs business development,
            opportunity capture, and proposals for you. After the spots fill,{' '}
            <span className="text-white font-semibold">the door closes until next cohort.</span>
          </p>

          {/* Countdown */}
          <div className="mb-8">
            <FomoCountdown />
          </div>

          {/* Spots tracker */}
          <div className="mb-10">
            <SpotsTracker />
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all green-glow"
            >
              Book My Strategy Call →
            </Link>
            <Link
              href="#programs"
              className="px-8 py-4 text-slate-300 hover:text-white font-semibold transition"
            >
              See the Programs ↓
            </Link>
          </div>

          <p className="text-xs text-slate-500 mt-6">
            30-minute strategy call. No pressure. Zero cost.
          </p>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-10 px-6 bg-slate-900/40">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-green-500 mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs anchor */}
      <div id="programs" />

      {/* Program 1: Consulting */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-900/50 border border-blue-700/50 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Consulting (one-on-one)</h2>
              <p className="text-slate-400">Hands-on support and guided implementation</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
            <p className="text-slate-300 leading-relaxed">
              You understand the basics of government contracting and have your SAM.gov registration.
              You may have submitted proposals or won small contracts. Now you need specific
              strategies, proposal training, and personalized guidance to scale your business and
              win larger contracts consistently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {consultingPlans.map((plan) => (
              <div
                key={plan.name}
                className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-blue-600/50 transition flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-lg bg-blue-900/50 border border-blue-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{plan.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-blue-300 text-sm">{plan.price}</p>
                  </div>
                </div>

                <p className="text-slate-400 mb-6">{plan.description}</p>

                <div className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <span className="text-blue-400 flex-shrink-0 mt-1">✓</span>
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition"
                >
                  Book a Call About {plan.name} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program 2: White Glove */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-900/50 border border-purple-700/50 flex items-center justify-center">
              <span className="text-2xl">👑</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">White Glove Service (Done for You)</h2>
              <p className="text-slate-400">Established business seeking done-for-you support</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
            <p className="text-slate-300 leading-relaxed">
              You&apos;re an established business with government contracting experience. You&apos;ve
              won contracts and understand the process, but you need dedicated support to scale
              operations, pursue larger opportunities, and maximize your federal revenue. You want a
              fractional business development team working exclusively for your company.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-900 border-2 border-purple-600 rounded-xl p-8 relative">
              <div className="absolute -top-3 left-4">
                <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  PREMIUM SERVICE
                </span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-purple-900/50 border border-purple-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">🤝</span>
                </div>
                <div>
                  <p className="text-purple-400 text-sm font-medium mb-1">Premium Service</p>
                  <h3 className="text-3xl font-bold text-white mb-2">White Glove Service</h3>
                  <p className="text-slate-400 text-sm">
                    Custom pricing — Contact us for details
                  </p>
                </div>
              </div>

              <p className="text-slate-300 mb-6 text-lg">
                Premium fractional business development services with dedicated consultant support
                tailored to your company. Get a team of experts working exclusively on your federal
                contracting goals.
              </p>

              <div className="space-y-4 mb-8">
                {whiteGloveFeatures.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <span className="text-purple-400 flex-shrink-0 mt-1 text-lg">✓</span>
                    <div>
                      <span className="text-white font-semibold block">{feature.title}</span>
                      <span className="text-slate-400 text-sm">{feature.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4 mb-6">
                <p className="text-purple-200 text-sm">
                  <strong>Perfect for:</strong> Companies generating $500K+ in revenue, pursuing
                  contracts $250K+, or seeking to scale their federal contracting operations
                  significantly.
                </p>
              </div>

              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-lg transition"
              >
                Apply for White Glove →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It <span className="text-green-500">Works</span>
            </h2>
            <p className="text-slate-400 text-lg">From call to contracts in 4 simple steps.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {howItWorks.map((step) => (
              <div
                key={step.step}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600 text-white font-black text-xl flex items-center justify-center">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked <span className="text-green-500">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group bg-slate-900 border border-slate-800 rounded-xl p-6 open:border-green-600/40 transition"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-lg font-semibold text-white">{faq.q}</span>
                  <span className="text-green-500 text-2xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-slate-300 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA band */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-green-600/30 rounded-2xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 bg-red-950 border border-red-900 text-red-400 px-4 py-2 rounded-full text-xs font-bold mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-hidden="true" />
              {SPOTS_TOTAL - SPOTS_TAKEN} SPOTS LEFT THIS MONTH
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Your next contract is <span className="text-green-500">waiting</span>.
            </h2>

            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Book a 30-minute strategy call. We&apos;ll audit your capture gaps, recommend the
              right program, and tell you honestly whether we&apos;re a fit.
            </p>

            <div className="mb-8">
              <FomoCountdown variant="compact" />
            </div>

            <div className="mb-8">
              <SpotsTracker />
            </div>

            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-xl transition-all green-glow"
            >
              Book My Strategy Call →
            </Link>

            <p className="text-xs text-slate-500 mt-4">
              Spots are claimed in the order calls are booked.
            </p>
          </div>
        </div>
      </section>

      {/* Footer note */}
      <footer className="py-10 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600 text-sm">
            Questions? Email{' '}
            <a
              href="mailto:hello@govconedu.com"
              className="text-slate-400 hover:text-white transition"
            >
              hello@govconedu.com
            </a>{' '}
            or call{' '}
            <a href="tel:5082906692" className="text-slate-400 hover:text-white transition">
              508-290-6692
            </a>
            .
          </p>
        </div>
      </footer>
    </main>
  );
}
