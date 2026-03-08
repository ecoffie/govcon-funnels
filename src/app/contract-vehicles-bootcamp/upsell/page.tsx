import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Upgrade to Pro Training | GovCon Giants',
  description:
    'Unlock live coaching, advanced templates, and implementation support for contract vehicles strategy.',
};

export default function ContractVehiclesUpsell() {
  return (
    <main className="min-h-screen bg-slate-950">
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

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-900/50 border border-amber-700/50 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>⚡</span> ONE-TIME OFFER - For New Members Only
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want Help Applying This to Real Opportunities?
            </h1>

            <p className="text-xl text-slate-500 leading-relaxed">
              You now understand the vehicles. <span className="text-green-500 font-semibold">Pro Members</span>{' '}
              get hands-on implementation support, live sessions, and advanced tools to turn that knowledge
              into submitted bids.
            </p>
          </div>

          <div className="bg-gradient-to-b from-slate-900/50 to-slate-800 border-2 border-green-600 rounded-2xl p-8 mb-8 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full green-glow">
                MOST POPULAR
              </span>
            </div>

            <div className="text-center mb-6">
              <div className="text-green-500 text-sm font-medium mb-2">PRO MEMBER GROUP</div>
              <h3 className="text-2xl font-bold text-white mb-2">Federal Help Center Pro</h3>
              <p className="text-slate-500">Get guided support to execute on IDIQs, BPAs, and task orders</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Contract vehicle targeting framework</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Monthly live implementation bootcamps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Opportunity Hunter Pro access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Proposal and capture templates</span>
                </li>
              </ul>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Weekly Q&A and strategy calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Private GovCon community</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Deal reviews and feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>All future resources and updates</span>
                </li>
              </ul>
            </div>

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
                className="block w-full px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg text-center transition-all mb-4 green-glow"
              >
                Yes! Join Pro for $99/month
              </a>

              <a
                href="https://federalhelpcenter.com/pro-annual"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-8 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold text-lg text-center transition-all border border-slate-700"
              >
                Save $389 - Get Annual for $799
              </a>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/contract-vehicles-bootcamp/downsell"
              className="text-slate-500 hover:text-slate-400 text-sm transition-all"
            >
              No thanks, show me other options →
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600 text-sm">© 2026 GovCon Giants. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
