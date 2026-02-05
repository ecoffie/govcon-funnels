import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Upgrade to Opportunity Hunter Pro | GovCon Giants',
  description: 'Get unlimited searches, detailed spending data, and agency contact info with Opportunity Hunter Pro.',
};

export default function OppUpsell() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Progress Bar */}
      <div className="bg-slate-900 py-3 px-6 border-b border-slate-800">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-green-500 font-medium">Step 2 of 3</span>
            <span className="text-slate-400">Almost there!</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full green-glow bg-green-600 rounded-full" style={{ width: '66%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Wait Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-900/50 border border-amber-700/50 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>⚡</span> LIFETIME DEAL - 90% OFF Today Only
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to 10x Your Results?
            </h1>

            <p className="text-xl text-slate-500 leading-relaxed">
              The free tool is great for getting started. But <span className="text-green-500 font-semibold">Opportunity Hunter Pro</span> gives you everything you need to actually WIN contracts.
            </p>
          </div>

          {/* Comparison Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Free Version */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="text-slate-400 text-sm font-medium mb-2">FREE VERSION</div>
              <h3 className="text-xl font-bold text-white mb-4">Opportunity Hunter</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Basic agency search</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>5 searches per day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Top 5 agency results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600 mt-1">✗</span>
                  <span className="line-through">Detailed spending data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600 mt-1">✗</span>
                  <span className="line-through">Agency pain points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600 mt-1">✗</span>
                  <span className="line-through">SBLO contact info</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600 mt-1">✗</span>
                  <span className="line-through">Export & print reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-600 mt-1">✗</span>
                  <span className="line-through">Saved searches</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="text-2xl font-bold text-white">$0</div>
                <div className="text-slate-500 text-sm">Limited features</div>
              </div>
            </div>

            {/* Pro Version */}
            <div className="bg-gradient-to-b from-slate-900/50 to-slate-800 border-2 border-green-600 rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="green-glow bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>
              </div>
              <div className="text-green-500 text-sm font-medium mb-2">PRO VERSION</div>
              <h3 className="text-xl font-bold text-white mb-4">Opportunity Hunter Pro</h3>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Advanced agency search</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>Unlimited</strong> searches</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span><strong>All agencies</strong> in results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Detailed spending breakdowns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Agency pain points analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>SBLO contact directory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Export & print PDF reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Save & track opportunities</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-slate-800/50">
                <div className="flex items-baseline gap-2">
                  <div className="text-slate-500 line-through text-xl">$500/yr</div>
                  <div className="text-4xl font-bold text-white">$49</div>
                </div>
                <div className="text-green-500 text-sm font-semibold">LIFETIME ACCESS - One-time payment</div>
              </div>
            </div>
          </div>

          {/* Pro Features */}
          <div className="mb-10 space-y-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">See What Pro Unlocks For You</h3>

            {/* Feature 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-3">All Agencies + Spending Data</h4>
              <p className="text-slate-400 mb-4">See every agency that buys what you sell, with detailed spending breakdowns.</p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Annual spending in your NAICS code</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Set-aside program preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Contract vehicle information</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-3">Understand Agency Pain Points</h4>
              <p className="text-slate-400 mb-4">Know what problems each agency faces so you can position your solution effectively.</p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Agency priorities and challenges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Budget and spending trends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Strategic focus areas</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h4 className="text-lg font-bold text-white mb-3">Complete Agency Directory</h4>
              <p className="text-slate-400 mb-4">Access every agency result, not just the top 5. Find opportunities others miss.</p>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Unlimited agency results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Export & print PDF reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Save & track opportunities</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 max-w-md mx-auto">
            <a
              href="https://buy.stripe.com/00wcN60ke97c5d384UfnO0i"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-8 py-4 green-glow bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg text-center transition-all"
            >
              Yes! Get Lifetime Access for $49
            </a>

            <Link
              href="/opp/thank-you"
              className="block w-full py-3 text-slate-500 hover:text-slate-400 text-sm text-center transition-all"
            >
              No thanks, I&apos;ll use the free version →
            </Link>
          </div>

          {/* Guarantee */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>30-day money-back guarantee • Lifetime access</span>
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
