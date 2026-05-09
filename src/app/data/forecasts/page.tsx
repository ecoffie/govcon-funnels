import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Federal Contract Forecasts — 7,700+ Upcoming Opportunities',
  description: 'Search 7,700+ federal contract forecasts from DOD, VA, HHS, GSA and more. Find upcoming opportunities before they hit SAM.gov.',
  path: '/data/forecasts',
  keywords: [
    'federal contract forecasts',
    'government contract forecast',
    'upcoming federal contracts',
    'DOD forecast',
    'acquisition forecast',
    'pre-solicitation opportunities',
  ],
});

// Example agencies with forecasts
const forecastAgencies = [
  { code: 'DOD', name: 'Department of Defense', count: 3200, color: 'red' },
  { code: 'VA', name: 'Department of Veterans Affairs', count: 890, color: 'blue' },
  { code: 'HHS', name: 'Health and Human Services', count: 720, color: 'green' },
  { code: 'DHS', name: 'Department of Homeland Security', count: 650, color: 'amber' },
  { code: 'DOE', name: 'Department of Energy', count: 480, color: 'purple' },
  { code: 'NASA', name: 'NASA', count: 410, color: 'cyan' },
  { code: 'GSA', name: 'General Services Administration', count: 380, color: 'emerald' },
  { code: 'DOJ', name: 'Department of Justice', count: 290, color: 'pink' },
];

// Top NAICS codes with forecast counts
const topNaicsCodes = [
  { code: '541512', desc: 'Computer Systems Design', count: 1240 },
  { code: '541519', desc: 'Other IT Services', count: 890 },
  { code: '541611', desc: 'Management Consulting', count: 720 },
  { code: '541330', desc: 'Engineering Services', count: 680 },
  { code: '561210', desc: 'Facilities Support', count: 520 },
  { code: '541990', desc: 'Other Professional Services', count: 410 },
];

export default function ForecastsIndexPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Federal Contract Forecasts Database',
        description: 'Search 7,700+ federal contract forecasts and upcoming government opportunities',
        url: `${SITE_URL}/data/forecasts`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
      }} />

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Updated Monthly from Agency Sources
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Federal Contract <span className="text-green-500">Forecasts</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Get ahead of your competition. Search 7,700+ contract forecasts from DOD, VA, HHS, NASA and more — before they hit SAM.gov.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-400">7,700+</div>
              <div className="text-sm text-slate-400">Forecasts</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-400">11</div>
              <div className="text-sm text-slate-400">Agencies</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-amber-400">FY25-27</div>
              <div className="text-sm text-slate-400">Coverage</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-400">$180B+</div>
              <div className="text-sm text-slate-400">Est. Value</div>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="https://mi.govcongiants.com/market-intelligence"
            className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold text-lg transition"
          >
            Search Forecasts — MI Core $149/mo
          </Link>
        </div>
      </section>

      {/* Sample Forecasts - GATED */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Sample Forecasts</h2>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative">
            {/* Blurred preview rows */}
            <div className="divide-y divide-slate-800">
              {[
                { agency: 'DOD', title: '████████ Cloud Migration ████████', value: '$25M-$50M', date: 'Q2 FY2026' },
                { agency: 'VA', title: '████████ Healthcare IT ████████', value: '$10M-$15M', date: 'Q3 FY2026' },
                { agency: 'HHS', title: '████████ Data Analytics ████████', value: '$5M-$10M', date: 'Q1 FY2026' },
                { agency: 'NASA', title: '████████ Engineering Support ████████', value: '$15M-$25M', date: 'Q4 FY2026' },
                { agency: 'GSA', title: '████████ Facilities Management ████████', value: '$3M-$8M', date: 'Q2 FY2026' },
              ].map((forecast, i) => (
                <div key={i} className="p-4 flex items-center justify-between opacity-60 blur-[2px] select-none pointer-events-none">
                  <div className="flex items-center gap-4">
                    <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs font-medium">
                      {forecast.agency}
                    </span>
                    <span className="text-white">{forecast.title}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-400 font-medium">{forecast.value}</span>
                    <span className="text-slate-500">{forecast.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Gate overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent flex items-end justify-center pb-12">
              <div className="text-center">
                <p className="text-slate-400 mb-4">Unlock 7,700+ contract forecasts</p>
                <Link
                  href="https://mi.govcongiants.com/market-intelligence"
                  className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
                >
                  Get MI Core — $149/mo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Agency */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Browse by Agency</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {forecastAgencies.map((agency) => (
              <div
                key={agency.code}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xl font-bold text-${agency.color}-400`}>{agency.code}</span>
                  <span className="text-2xl font-bold text-white">{agency.count.toLocaleString()}</span>
                </div>
                <p className="text-sm text-slate-400 mb-4 line-clamp-1">{agency.name}</p>
                <Link
                  href="https://mi.govcongiants.com/market-intelligence"
                  className="text-sm text-green-400 hover:text-green-300 font-medium"
                >
                  Search {agency.code} forecasts →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by NAICS */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Top NAICS Codes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topNaicsCodes.map((naics) => (
              <div
                key={naics.code}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-green-400 font-medium">{naics.code}</span>
                  <span className="text-sm text-slate-500">{naics.count} forecasts</span>
                </div>
                <p className="text-white text-sm mb-3">{naics.desc}</p>
                <Link
                  href="https://mi.govcongiants.com/market-intelligence"
                  className="text-xs text-slate-400 hover:text-green-400"
                >
                  View forecasts →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Forecast Intelligence</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📅', title: 'Award Timeline', desc: 'Quarter and fiscal year forecasts' },
              { icon: '💰', title: 'Value Ranges', desc: 'Estimated contract values' },
              { icon: '🏷️', title: 'Set-Asides', desc: '8(a), SDVOSB, WOSB, HUBZone' },
              { icon: '🏢', title: 'Office Details', desc: 'Contracting office & POC info' },
            ].map((item) => (
              <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">How Forecasts Give You an Edge</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-white font-semibold mb-2">Find Early</h3>
              <p className="text-sm text-slate-400">Forecasts are published 6-18 months before solicitations appear on SAM.gov</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-white font-semibold mb-2">Build Relationships</h3>
              <p className="text-sm text-slate-400">Reach out to program offices before the RFP drops — position yourself early</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-white font-semibold mb-2">Win More</h3>
              <p className="text-sm text-slate-400">Contractors who shape requirements win 40% more often than reactive bidders</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Stop Chasing — Start Shaping
          </h2>
          <p className="text-slate-400 mb-6">
            MI Core gives you full access to 7,700+ forecasts, daily alerts, and AI-powered briefings to help you win more contracts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://mi.govcongiants.com/market-intelligence"
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold transition"
            >
              Get MI Core — $149/mo
            </Link>
            <Link
              href="/guides/federal-market-research"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition border border-slate-700"
            >
              Learn Market Research
            </Link>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-8 px-6 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Related Resources</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/finding-government-contracts" className="text-sm text-slate-400 hover:text-white transition">
              Finding Government Contracts →
            </Link>
            <Link href="/guides/sources-sought" className="text-sm text-slate-400 hover:text-white transition">
              Sources Sought Guide →
            </Link>
            <Link href="/guides/capture-management" className="text-sm text-slate-400 hover:text-white transition">
              Capture Management →
            </Link>
            <Link href="/data/agencies" className="text-sm text-slate-400 hover:text-white transition">
              Agency Database →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
