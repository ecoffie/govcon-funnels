import Link from 'next/link';
import Image from 'next/image';
import { generateSeo } from '@/lib/seo';

export const metadata = generateSeo({
  title: 'Opportunity Hunter - Find Federal Contracts | GovCon Giants',
  description: 'Search SAM.gov opportunities in real-time or get daily alerts delivered to your inbox. Free tool with optional Pro upgrade for unlimited daily alerts.',
  path: '/opp',
  keywords: ['SAM.gov search', 'federal contract opportunities', 'government contract finder', 'opportunity hunter', 'govcon opportunities'],
});

const agencies = [
  "Department of Defense",
  "GSA",
  "Veterans Affairs",
  "Homeland Security",
  "HHS",
  "NASA",
  "Energy",
  "USDA"
];

const painPoints = [
  { before: "Spending hours on SAM.gov every day", after: "Get matched opportunities in your inbox" },
  { before: "Missing deadlines because you found out too late", after: "See deadlines ranked by urgency" },
  { before: "Not knowing which agencies buy what you sell", after: "See agencies ranked by your NAICS spending" },
  { before: "Guessing which set-asides to pursue", after: "Filter by your certifications instantly" },
];

export default function OpportunityPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section with Tool Preview */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm mb-6">
                🎯 FREE TOOL
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                Stop Wasting Hours on <span className="text-emerald-500">SAM.gov</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Opportunity Hunter finds federal contracts that match your business — filtered by NAICS, set-asides, and agency spending. In seconds, not hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://tools.govcongiants.org/opportunity-hunter"
                  className="py-4 px-8 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-all text-lg text-center"
                >
                  Try It Free →
                </Link>
                <Link
                  href="#demo"
                  className="py-4 px-8 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-all text-lg text-center"
                >
                  Watch Demo
                </Link>
              </div>
              <p className="text-slate-500 text-sm mt-4">No credit card required. Start searching in 30 seconds.</p>
            </div>

            {/* Right: Tool Screenshot Mockup */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 shadow-2xl border border-slate-700">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 bg-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-400">
                    tools.govcongiants.org/opportunity-hunter
                  </div>
                </div>
                {/* Tool Interface Mockup */}
                <div className="bg-slate-800 rounded-lg p-6 space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-white">Opportunity Hunter</h3>
                    <p className="text-slate-400 text-sm">Find agencies awarding contracts like yours</p>
                  </div>
                  {/* Search Form Mockup */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-700 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">Business Type</div>
                      <div className="text-sm text-white">8(a) Certified</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">NAICS Code</div>
                      <div className="text-sm text-white">541512</div>
                    </div>
                    <div className="bg-slate-700 rounded-lg p-3">
                      <div className="text-xs text-slate-400 mb-1">Location</div>
                      <div className="text-sm text-white">Virginia</div>
                    </div>
                  </div>
                  {/* Results Preview */}
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-emerald-400 font-semibold">29 Agencies Found</span>
                      <span className="text-emerald-400 text-sm">$817M Total</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">Dept. of Navy</span>
                        <span className="text-emerald-400 font-semibold">$326M</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white">Dept. of Army</span>
                        <span className="text-emerald-400 font-semibold">$179M</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>+ 27 more agencies...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-xs">Agencies</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-xs">To Use</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Logos Bar */}
      <section className="py-8 bg-slate-800 border-y border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-slate-400 text-sm mb-6">Search contracts from agencies like:</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {agencies.map((agency, index) => (
              <span key={index} className="text-slate-300 font-medium">{agency}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section id="demo" className="py-16 md:py-24 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">See It In Action</h2>
            <p className="text-slate-400 text-lg">Watch how Opportunity Hunter finds contracts in under 60 seconds</p>
          </div>

          {/* Video Embed Placeholder - Replace with actual video */}
          <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <div className="text-center">
                {/* Play Button */}
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-400 transition-all group-hover:scale-110">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-white font-semibold text-lg">Watch 2-Minute Demo</p>
                <p className="text-slate-400 text-sm mt-1">See how to find your best agency targets</p>
              </div>
            </div>
            {/* Replace this with actual video embed:
            <iframe
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            */}
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="py-16 md:py-24 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Old Way vs. The Smart Way</h2>
            <p className="text-slate-400 text-lg">Stop doing market research the hard way</p>
          </div>

          <div className="space-y-4">
            {painPoints.map((item, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4">
                {/* Before */}
                <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-red-400 text-xs font-semibold mb-1">THE OLD WAY</div>
                      <p className="text-slate-300">{item.before}</p>
                    </div>
                  </div>
                </div>
                {/* After */}
                <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-emerald-400 text-xs font-semibold mb-1">WITH OPPORTUNITY HUNTER</div>
                      <p className="text-slate-300">{item.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="https://tools.govcongiants.org/opportunity-hunter"
              className="inline-flex items-center gap-2 py-4 px-8 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-all text-lg"
            >
              Try Opportunity Hunter Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Alert Pro Upgrade Section */}
      <section id="alerts" className="py-16 md:py-24 px-4 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm mb-6">
              📧 UPGRADE TO ALERT PRO
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Too Busy to Search Every Day?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Let us do the searching for you. Alert Pro delivers matched opportunities to your inbox every morning — automatically.
            </p>
          </div>

          {/* Pricing Comparison */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-400">$0</span>
                  <span className="text-slate-500">/forever</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Unlimited tool searches
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  10 agencies shown
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  5 email alerts per week
                </li>
                <li className="flex items-center gap-3 text-slate-500">
                  <svg className="w-5 h-5 text-slate-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="line-through">Daily alerts</span>
                </li>
                <li className="flex items-center gap-3 text-slate-500">
                  <svg className="w-5 h-5 text-slate-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="line-through">All agencies + pain points</span>
                </li>
              </ul>
              <Link
                href="https://tools.govcongiants.org/opportunity-hunter"
                className="block text-center py-4 px-6 rounded-lg font-bold transition-all bg-slate-700 hover:bg-slate-600 text-white"
              >
                Start Free
              </Link>
            </div>

            {/* Alert Pro */}
            <div className="bg-gradient-to-br from-blue-900/50 to-slate-800 rounded-2xl p-8 border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Alert Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-blue-400">$19</span>
                  <span className="text-slate-400">/month</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <strong className="text-white">Unlimited daily alerts</strong>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  All agencies unlocked
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Agency pain points
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  CSV export
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cancel anytime
                </li>
              </ul>
              <Link
                href="https://buy.stripe.com/8x24gA1oifvAcFv3OEfnO0y"
                className="block text-center py-4 px-6 rounded-lg font-bold transition-all bg-blue-500 hover:bg-blue-400 text-white"
              >
                Get Alert Pro - $19/mo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Alert Email */}
      <section className="py-16 px-4 bg-slate-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">What Your Daily Alert Looks Like</h2>
            <p className="text-slate-400">Real opportunities delivered to your inbox every morning</p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Email Header */}
            <div className="bg-slate-100 px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">G</div>
                <div>
                  <p className="text-slate-900 font-semibold">GovCon Giants Alerts</p>
                  <p className="text-slate-500 text-sm">alerts@govcongiants.com</p>
                </div>
              </div>
              <p className="text-slate-900 font-semibold mt-3">🎯 12 New Opportunities Matching Your Profile - March 16</p>
            </div>
            {/* Email Body */}
            <div className="p-6 space-y-4">
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">Solicitation</span>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">SDVOSB</span>
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">⚡ Due in 7 days</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">IT Support Services - VA Medical Center</h4>
                <p className="text-slate-600 text-sm">Department of Veterans Affairs • NAICS 541512 • Est. $2.5M</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">Sources Sought</span>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">8(a)</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">Cloud Migration Services</h4>
                <p className="text-slate-600 text-sm">Department of Defense • NAICS 541519 • Due Apr 1</p>
              </div>
              <p className="text-center text-slate-400 text-sm py-2">+ 10 more opportunities in this alert...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Assassin Upsell */}
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-red-950/50 to-slate-900 rounded-2xl p-8 md:p-12 border border-red-500/30">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-sm mb-4">
                🎯 NEXT LEVEL
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Finding Opportunities is Just Step One</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                <strong className="text-white">Federal Market Assassin</strong> shows you exactly how to WIN — agency pain points, competitor analysis, and strategic positioning.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-4">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-medium text-white">Agency Pain Points</p>
                  <p className="text-slate-400 text-sm">Know what each agency needs</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-4">
                <span className="text-2xl">👥</span>
                <div>
                  <p className="font-medium text-white">Competitor Intelligence</p>
                  <p className="text-slate-400 text-sm">See who you&apos;re up against</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-4">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-medium text-white">Spending Analysis</p>
                  <p className="text-slate-400 text-sm">Historical contract data</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-4">
                <span className="text-2xl">📄</span>
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
      <section className="py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Next Contract?</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Join thousands of contractors who use Opportunity Hunter to find and win federal contracts.
          </p>
          <Link
            href="https://tools.govcongiants.org/opportunity-hunter"
            className="inline-flex items-center gap-2 py-4 px-10 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-all text-xl"
          >
            Launch Opportunity Hunter
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-slate-500 text-sm mt-4">Free forever • No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800">
        © 2026 GovCon Giants. All rights reserved.
      </footer>
    </main>
  );
}
