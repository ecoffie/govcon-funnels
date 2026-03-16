import Link from 'next/link';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Opportunity Hunter - Find Federal Contracts | GovCon Giants',
  description: 'Search SAM.gov opportunities in real-time or get daily alerts delivered to your inbox. Free tool with optional Pro upgrade for unlimited daily alerts.',
  path: '/opp',
  keywords: ['SAM.gov search', 'federal contract opportunities', 'government contract finder', 'opportunity hunter', 'govcon opportunities'],
});

const agencies = [
  "DoD", "GSA", "VA", "DHS", "HHS", "NASA", "DOE", "USDA"
];

const toolFeatures = [
  { icon: "🔍", title: "Real-Time Search", desc: "Search SAM.gov opportunities instantly" },
  { icon: "🎯", title: "NAICS Filtering", desc: "Filter by your industry codes" },
  { icon: "🏷️", title: "Set-Aside Types", desc: "SDVOSB, 8(a), WOSB, HUBZone & more" },
  { icon: "📊", title: "Agency Analysis", desc: "See spending trends by agency" },
  { icon: "⏰", title: "Deadline Tracking", desc: "Never miss a response deadline" },
  { icon: "📥", title: "Export Results", desc: "Download opportunities as CSV" },
];

const alertFeatures = [
  { icon: "📧", title: "Daily Delivery", desc: "Opportunities sent to your inbox" },
  { icon: "♾️", title: "Unlimited Opps", desc: "No cap on daily opportunities" },
  { icon: "⚡", title: "Priority Scoring", desc: "Best matches ranked first" },
  { icon: "🔔", title: "Never Miss Out", desc: "Automated monitoring 24/7" },
];

export default function OpportunityPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm mb-6">
              🎯 OPPORTUNITY HUNTER
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Find Federal Contracts <span className="text-emerald-500">Your Way</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Search SAM.gov opportunities in real-time with our free tool, or let us deliver matched opportunities to your inbox daily.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://tools.govcongiants.org/opportunity-hunter"
                className="py-4 px-8 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-all text-lg"
              >
                Launch Opportunity Hunter
              </Link>
              <Link
                href="#alerts"
                className="py-4 px-8 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all text-lg"
              >
                Set Up Alerts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section className="section bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Opportunity Hunter Tool</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our free search tool lets you explore SAM.gov opportunities in real-time. Filter by NAICS, agency, set-aside type, and more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {toolFeatures.map((feature, index) => (
              <div key={index} className="card hover:translate-y-[-4px] transition-transform">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="https://tools.govcongiants.org/opportunity-hunter"
              className="inline-flex items-center gap-2 py-4 px-8 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-all text-lg"
            >
              Search Opportunities Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="text-slate-500 text-sm mt-3">100% Free - No signup required</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-8 bg-slate-900 border-y border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-slate-400 mb-4">Opportunities from agencies like:</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {agencies.map((agency, index) => (
              <span key={index} className="text-slate-300 font-semibold">{agency}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Alert Pro Section */}
      <section id="alerts" className="section bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm mb-6">
              📧 ALERT PRO
            </div>
            <h2 className="text-3xl font-bold mb-4">Too Busy to Search Every Day?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Let us do the searching for you. Alert Pro delivers unlimited matched opportunities to your inbox every morning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Free Alerts */}
            <div className="card border border-slate-700">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Free Alerts</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-slate-400">$0</span>
                  <span className="text-slate-500">/forever</span>
                </div>
                <p className="text-slate-500 text-sm mt-2">Weekly email digest</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  5 opportunities per week
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  NAICS code matching
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Set-aside filtering
                </li>
              </ul>
              <Link
                href="https://tools.govcongiants.org/alerts/signup"
                className="block text-center py-4 px-6 rounded-lg font-bold transition-all bg-slate-700 hover:bg-slate-600 text-white"
              >
                Start Free
              </Link>
            </div>

            {/* Alert Pro */}
            <div className="card border-2 border-emerald-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                BEST VALUE
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Alert Pro</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-emerald-500">$19</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">Daily unlimited alerts</p>
              </div>
              <ul className="space-y-3 mb-8">
                {alertFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature.title}
                  </li>
                ))}
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cancel anytime
                </li>
              </ul>
              <Link
                href="https://buy.stripe.com/8x24gA1oifvAcFv3OEfnO0y"
                className="block text-center py-4 px-6 rounded-lg font-bold transition-all bg-emerald-500 hover:bg-emerald-400 text-white"
              >
                Go Pro - $19/mo
              </Link>
            </div>
          </div>

          {/* How Alerts Work */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-8">How Alerts Work</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold mb-2">Set Your Profile</h4>
                <p className="text-slate-400 text-sm">NAICS codes, set-asides, location</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold mb-2">We Scan Daily</h4>
                <p className="text-slate-400 text-sm">Our system checks SAM.gov every day</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="font-semibold mb-2">Get Your Alerts</h4>
                <p className="text-slate-400 text-sm">Matches delivered to your inbox</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Alert */}
      <section className="section bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Sample Alert Email</h2>
          <div className="card border border-slate-700">
            <div className="bg-slate-800 -m-6 mb-6 p-4 rounded-t-lg border-b border-slate-700">
              <p className="text-sm text-slate-400">From: GovCon Giants &lt;alerts@govcongiants.com&gt;</p>
              <p className="text-sm text-slate-400">Subject: 🎯 12 New Opportunities - March 16, 2026</p>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex gap-2 mb-2">
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-medium">Solicitation</span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-medium">SDVOSB</span>
                  <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs font-medium">⚡ Due Soon</span>
                </div>
                <h4 className="font-semibold text-white mb-1">IT Support Services - VA Medical Center</h4>
                <p className="text-slate-400 text-sm">Department of Veterans Affairs • NAICS 541512 • Due Mar 23, 2026</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex gap-2 mb-2">
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-medium">Sources Sought</span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs font-medium">8(a)</span>
                </div>
                <h4 className="font-semibold text-white mb-1">Cloud Migration Services</h4>
                <p className="text-slate-400 text-sm">Department of Defense • NAICS 541519 • Due Apr 1, 2026</p>
              </div>
              <p className="text-center text-slate-500 text-sm pt-2">+ 10 more opportunities...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Assassin Upsell */}
      <section className="section bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="card border-2 border-red-500/30 bg-gradient-to-br from-slate-900 to-red-950/20">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm mb-4">
                🎯 READY TO WIN?
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Finding Opportunities is Just Step One</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                <strong className="text-white">Federal Market Assassin</strong> shows you exactly how to win — agency pain points, competitor analysis, and strategic positioning reports.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-white">Agency Pain Points</p>
                  <p className="text-slate-400 text-sm">Know what each agency needs most</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-white">Competitor Intelligence</p>
                  <p className="text-slate-400 text-sm">See who you&apos;re up against</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-white">Spending Analysis</p>
                  <p className="text-slate-400 text-sm">Historical contract data by NAICS</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium text-white">PDF Reports</p>
                  <p className="text-slate-400 text-sm">Use in your proposals</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link
                href="https://tools.govcongiants.org/market-assassin"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 px-8 rounded-lg transition-all"
              >
                Explore Market Assassin
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <p className="text-slate-500 text-sm mt-3">Starting at $297</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-slate-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Start Finding Opportunities Today</h2>
          <p className="text-slate-400 mb-8">
            Search now with our free tool, or set up daily alerts to never miss an opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://tools.govcongiants.org/opportunity-hunter"
              className="py-4 px-8 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-all"
            >
              Launch Opportunity Hunter
            </Link>
            <Link
              href="https://buy.stripe.com/8x24gA1oifvAcFv3OEfnO0y"
              className="py-4 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all"
            >
              Get Alert Pro - $19/mo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        © 2026 GovCon Giants. All rights reserved.
      </footer>
    </main>
  );
}
