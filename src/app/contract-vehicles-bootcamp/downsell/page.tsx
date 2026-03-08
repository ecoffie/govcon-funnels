import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Starter Training Option | GovCon Giants',
  description: 'Get a lower-cost training option to keep moving forward with federal contract vehicles.',
};

export default function ContractVehiclesDownsell() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 py-3 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-blue-400 font-medium">Step 3 of 4</span>
            <span className="text-slate-400">Alternative Offer</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Here Is a <span className="text-green-500">Lower-Cost</span> Path
            </h1>

            <p className="text-xl text-slate-500 leading-relaxed">
              If Pro is not the right fit yet, start with our{' '}
              <span className="text-blue-400 font-semibold">Starter Plan</span> and build momentum.
            </p>
          </div>

          <div className="bg-slate-900 border-2 border-blue-500 rounded-2xl p-8 mb-8 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</span>
            </div>

            <div className="text-center mb-6">
              <div className="text-blue-400 text-sm font-medium mb-2">STARTER PLAN</div>
              <h3 className="text-2xl font-bold text-white mb-2">GovCon Starter</h3>
              <p className="text-slate-500">Practical support and tools for early-stage execution</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Contract vehicle cheat sheets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Proposal and outreach templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Email scripts and playbooks</span>
                </li>
              </ul>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Monthly training updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Bootcamp recording access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Entry community support</span>
                </li>
              </ul>
            </div>

            <div className="text-center border-t border-slate-800 pt-6">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <div className="text-slate-500 line-through text-xl">$99</div>
                <div className="text-4xl font-bold text-white">$27</div>
                <div className="text-slate-400">/month</div>
              </div>
              <div className="text-blue-400 text-sm mb-6">Save 70% compared to Pro</div>

              <a
                href="https://federalhelpcenter.com/starter"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg text-center transition-all mb-4"
              >
                Join Starter for $27/month
              </a>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/contract-vehicles-bootcamp/thank-you"
              className="text-slate-500 hover:text-slate-400 text-sm transition-all"
            >
              No thanks, continue to my free access →
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
