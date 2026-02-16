import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Join the Feb 28 Bootcamp – Pro Member Group | GovCon Giants',
  description: 'Get access to the Feb 28 Specifics and Proposals bootcamp with Pro Member Group. $99/month – live training, community, and tools.',
};

export default function Feb28Upsell() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Progress Bar */}
      <div className="bg-slate-900 py-3 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-green-500 font-medium">Step 2 of 4</span>
            <span className="text-slate-400">Special Offer</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 rounded-full green-glow" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-900/50 border border-amber-700/50 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>⚡</span> ONE-TIME OFFER – Join the Live Bootcamp
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join the Feb 28 Bootcamp: Specifics and Proposals
            </h1>

            <p className="text-xl text-slate-500 leading-relaxed">
              Get full access to the <span className="text-green-500 font-semibold">Pro Member Group</span> and attend the February 28th live bootcamp. $99/month – bootcamps, tools, live calls, and expert support.
            </p>
          </div>

          {/* Pro Membership Card */}
          <div className="bg-gradient-to-b from-slate-900/50 to-slate-800 border-2 border-green-600 rounded-2xl p-8 mb-8 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full green-glow">MOST POPULAR</span>
            </div>

            <div className="text-center mb-6">
              <div className="text-green-500 text-sm font-medium mb-2">PRO MEMBER GROUP</div>
              <h3 className="text-2xl font-bold text-white mb-2">Feb 28 Bootcamp + Ongoing Access</h3>
              <p className="text-slate-500">Live bootcamp on Specifics and Proposals, plus the full Pro experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Feb 28 Live Bootcamp Access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Monthly LIVE Bootcamps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Opportunity Hunter Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Private Community Access</span>
                </li>
              </ul>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Weekly Q&A Calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Proposal Review Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>All Future Resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Federal Contractor Database</span>
                </li>
              </ul>
            </div>

            <div className="text-center border-t border-slate-800/50 pt-6">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <div className="text-4xl font-bold text-white">$99</div>
                <div className="text-slate-400">/month</div>
              </div>
              <div className="text-green-500 text-sm mb-6">Cancel anytime</div>

              <a
                href="https://shop.govcongiants.org"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg text-center transition-all mb-4 green-glow"
              >
                Join Pro – $99/mo (Get Bootcamp Access)
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
            <p className="text-slate-500 text-center italic mb-4">
              &quot;The Pro membership gave me access to tools and training I couldn&apos;t find anywhere else. Within 3 months, I won my first $150K contract!&quot;
            </p>
            <p className="text-slate-500 text-sm text-center">— Pro Member</p>
          </div>

          {/* Skip Link */}
          <div className="text-center">
            <Link
              href="/feb-28-bootcamp/downsell"
              className="text-slate-500 hover:text-slate-400 text-sm transition-all"
            >
              No thanks, show me other options →
            </Link>
          </div>

          {/* Guarantee */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>30-day money-back guarantee • Cancel anytime</span>
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
