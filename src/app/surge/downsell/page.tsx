import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Starter Plan - More Affordable Option | GovCon Giants',
  description: 'Not ready for Pro? Our Starter Plan gives you essential tools at a fraction of the cost.',
};

export default function SurgeDownsell() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Progress Bar */}
      <div className="bg-slate-900 py-3 px-6 border-b border-slate-800">
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

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Wait! Here&apos;s a <span className="text-green-500">More Affordable</span> Option
            </h1>

            <p className="text-xl text-slate-500 leading-relaxed">
              Not ready for Pro? Our <span className="text-blue-400 font-semibold">Starter Plan</span> gives you essential tools at a fraction of the cost.
            </p>
          </div>

          {/* Starter Plan Card */}
          <div className="bg-slate-900 border-2 border-blue-500 rounded-2xl p-8 mb-8 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</span>
            </div>

            <div className="text-center mb-6">
              <div className="text-blue-400 text-sm font-medium mb-2">STARTER PLAN</div>
              <h3 className="text-2xl font-bold text-white mb-2">GovCon Starter</h3>
              <p className="text-slate-500">Perfect for beginners who want to get started without a big commitment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Mini Courses & Premium Webinars</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Scale Using Certifications Training</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Starter Member Community</span>
                </li>
              </ul>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Welcome + Tour Onboarding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Technical Support Access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Community Events & Updates</span>
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

          {/* Comparison */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-4 text-center">Quick Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left text-slate-400 py-2">Feature</th>
                    <th className="text-center text-slate-400 py-2">Free</th>
                    <th className="text-center text-blue-400 py-2">Starter</th>
                    <th className="text-center text-green-500 py-2">Pro</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-800">
                    <td className="py-2">Surge Resources</td>
                    <td className="text-center">✓</td>
                    <td className="text-center text-blue-400">✓</td>
                    <td className="text-center text-green-500">✓</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2">Email Templates</td>
                    <td className="text-center text-slate-600">✗</td>
                    <td className="text-center text-blue-400">✓</td>
                    <td className="text-center text-green-500">✓</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2">Live Bootcamps</td>
                    <td className="text-center text-slate-600">✗</td>
                    <td className="text-center text-slate-600">✗</td>
                    <td className="text-center text-green-500">✓</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2">Opportunity Hunter Pro</td>
                    <td className="text-center text-slate-600">✗</td>
                    <td className="text-center text-slate-600">✗</td>
                    <td className="text-center text-green-500">✓</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2">Weekly Q&A Calls</td>
                    <td className="text-center text-slate-600">✗</td>
                    <td className="text-center text-slate-600">✗</td>
                    <td className="text-center text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-white">Price</td>
                    <td className="text-center">$0</td>
                    <td className="text-center text-blue-400 font-bold">$27/mo</td>
                    <td className="text-center text-green-500 font-bold">$99/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Skip Link */}
          <div className="text-center">
            <Link
              href="/surge/thank-you"
              className="text-slate-500 hover:text-slate-400 text-sm transition-all"
            >
              No thanks, just give me the free resources →
            </Link>
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
