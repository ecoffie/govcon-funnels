import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Join Pro Member Group | GovCon Giants',
  description: 'Join the Pro Member Group for $99/month. Live bootcamps, proposal training, expert coaching, and 4,000+ member community.',
};

export default function ProMemberGroupPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="py-6 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-white">GovCon</span>
            <span className="text-2xl font-bold text-green-500">Giants</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-900/50 border border-green-700/50 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              RECOMMENDED
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to <span className="text-green-500">Master</span> Proposal Writing?
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed">
              Our <span className="text-purple-400 font-semibold">Pro Members</span> get live training, expert coaching, and hands-on workshops to write winning proposals.
            </p>
          </div>

          {/* Event Card */}
          <div className="bg-gradient-to-b from-purple-900/30 to-slate-900 border-2 border-purple-600 rounded-2xl p-8 mb-8 relative" style={{ boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)' }}>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)' }}>LIVE EVENT</span>
            </div>

            <div className="text-center mb-6">
              <div className="text-purple-400 text-sm font-medium mb-2">PROPOSAL WRITING SURGE</div>
              <h3 className="text-2xl font-bold text-white mb-2">8-Hour Live Proposal Workshop</h3>
              <p className="text-slate-400">Saturday | 9AM - 5PM Eastern | Virtual Event</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Proposal Fundamentals & Compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Simplified Acquisition Proposals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Full & Open RFP Technical Approach</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Past Performance Write-Up Framework</span>
                </li>
              </ul>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>GSA/GWAC Task Order Proposals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Live Compliance Matrix Workshop</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Live Technical Approach Drafting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">✓</span>
                  <span>Full Recording Access Forever</span>
                </li>
              </ul>
            </div>

            {/* What's Included in Pro */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
              <h4 className="text-white font-bold mb-4 text-center">Plus Everything in Pro Membership:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-slate-400">
                <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Monthly Live Bootcamps</div>
                <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Market Intelligence Pro</div>
                <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Weekly Q&A Calls</div>
                <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Pro Member Community</div>
                <div className="flex items-center gap-2"><span className="text-green-500">✓</span> All Bootcamp Replays</div>
                <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Premium Webinars</div>
              </div>
            </div>

            {/* Pricing & CTAs */}
            <div className="text-center border-t border-slate-800/50 pt-6">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <div className="text-4xl font-bold text-white">$99</div>
                <div className="text-slate-400">/month</div>
              </div>
              <div className="text-green-500 text-sm mb-6">or $799/year (save $389)</div>

              <a
                href="https://federalhelpcenter.com/pro"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg text-center transition-all mb-4"
                style={{ boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)' }}
              >
                Yes! Join Pro & Get Bootcamp Access
              </a>

              <a
                href="https://federalhelpcenter.com/pro-annual"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-lg text-center transition-all border border-slate-600"
              >
                Save $389 - Get Annual for $799
              </a>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
            <div className="flex justify-center gap-1 mb-4">
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
            </div>
            <p className="text-slate-400 text-center italic mb-4">
              &quot;Before the bootcamp, I had submitted 12 proposals with zero wins. After learning the compliance matrix system, I won my first $180K contract within 60 days.&quot;
            </p>
            <p className="text-slate-500 text-sm text-center">— Pro Member, IT Services</p>
          </div>

          {/* View Other Options */}
          <div className="text-center">
            <Link
              href="/premium"
              className="text-slate-500 hover:text-slate-400 text-sm transition-all"
            >
              View all premium options →
            </Link>
          </div>

          {/* Guarantee */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>30-day money-back guarantee · Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600 text-sm">© 2026 GovCon Giants. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
