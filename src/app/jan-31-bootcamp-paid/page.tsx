import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jan 31 Bootcamp Replay (Paid) | GovCon Giants',
  description:
    'Get instant access to the full Jan 31 Bootcamp replay, training assets, and your next-step action plan.',
};

const highlights = [
  {
    icon: '📹',
    title: 'Full Bootcamp Replay',
    desc: 'Watch every session on-demand with lifetime access.',
  },
  {
    icon: '🧭',
    title: 'Implementation Roadmap',
    desc: 'Turn the training into a clear, step-by-step plan.',
  },
  {
    icon: '📄',
    title: 'Templates & Handouts',
    desc: 'Download the same resources shared during the event.',
  },
  {
    icon: '🎯',
    title: 'Opportunity-Focused',
    desc: 'Learn how to identify real contracts to pursue next.',
  },
  {
    icon: '⚡️',
    title: 'Fast-Start Strategy',
    desc: 'Shorten the time between “learning” and “submitting bids.”',
  },
  {
    icon: '✅',
    title: 'Beginner-Friendly',
    desc: 'Built for first-time government contractors and small teams.',
  },
];

export default function Jan31PaidBootcampLandingPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                BOOTCAMP REPLAY ACCESS
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Get Instant Access to the{' '}
                <span className="text-green-500">Jan 31 Bootcamp</span> Replay
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                If you missed the live event—or want the full recording—this is
                the fastest way to catch up and start executing immediately.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-10">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Lifetime replay access
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Watch in chapters
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Includes resources
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/jan-31-bootcamp-paid/checkout"
                  className="btn-primary inline-block green-glow text-center"
                >
                  Get Access Now →
                </Link>
                <Link
                  href="/free-course"
                  className="inline-block text-center px-6 py-4 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  Start Free Course Instead
                </Link>
              </div>
            </div>

            <div className="card green-glow">
              <h3 className="text-2xl font-bold mb-3 text-center">
                What You Get
              </h3>
              <p className="text-slate-300 text-center mb-8">
                Replay + resources + a clear plan to take action.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {highlights.slice(0, 4).map((h) => (
                  <div
                    key={h.title}
                    className="flex gap-4 items-start p-4 rounded-xl border border-slate-700 bg-slate-900/40"
                  >
                    <div className="text-3xl leading-none">{h.icon}</div>
                    <div>
                      <div className="font-semibold text-white">{h.title}</div>
                      <div className="text-sm text-slate-400">{h.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/jan-31-bootcamp-paid/checkout"
                  className="btn-primary w-full block text-center green-glow"
                >
                  Continue to Secure Checkout →
                </Link>
                <p className="text-center text-sm text-slate-400 mt-3">
                  Secure payment powered by Stripe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Built to Help You Execute
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            This replay is organized so you can take action quickly—not just
            “watch and forget.”
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="card hover:translate-y-[-4px] transition-transform"
              >
                <div className="text-4xl mb-4">{h.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{h.title}</h3>
                <p className="text-slate-400">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-lg mx-auto">
          <div className="card green-glow text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Watch?</h2>
            <p className="text-slate-300 mb-6">
              Get immediate access to the replay and resources.
            </p>
            <Link
              href="/jan-31-bootcamp-paid/checkout"
              className="btn-primary inline-block green-glow"
            >
              Go to Checkout →
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        © 2026 GovCon Giants. All rights reserved.
      </footer>
    </main>
  );
}

