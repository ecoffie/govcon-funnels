import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export const metadata = generateSeo({
  title: 'Federal Contractor Database — CAGE, UEI & Company Lookup',
  description: 'Search 500,000+ federal contractors by CAGE code, UEI, or company name. Find SAM registration status, certifications, and contract history.',
  path: '/data/contractors',
  keywords: [
    'federal contractor database',
    'CAGE code lookup',
    'UEI lookup',
    'SAM registration',
    'government contractor search',
    'find federal contractors',
  ],
});

// Example featured contractors for SEO (large primes)
const featuredContractors = [
  { name: 'Lockheed Martin Corporation', uei: 'DPFMPQXKVZCE', industry: 'Defense & Aerospace' },
  { name: 'Booz Allen Hamilton Inc.', uei: 'SGZLK6RA8P17', industry: 'IT & Consulting' },
  { name: 'General Dynamics Corporation', uei: 'QJC7Y6YFZXN5', industry: 'Defense Systems' },
  { name: 'Leidos Inc.', uei: 'TXKKGGVKNBQ2', industry: 'IT & Defense' },
  { name: 'SAIC Inc.', uei: 'Z4GNLHDWBQN5', industry: 'IT Services' },
  { name: 'Northrop Grumman Corporation', uei: 'HDUBDL9LLLX3', industry: 'Defense & Aerospace' },
];

const certificationTypes = [
  { code: '8a', label: '8(a) Business Development', description: 'SBA program for disadvantaged small businesses' },
  { code: 'sdvosb', label: 'SDVOSB', description: 'Service-Disabled Veteran-Owned Small Business' },
  { code: 'wosb', label: 'WOSB', description: 'Women-Owned Small Business' },
  { code: 'hubzone', label: 'HUBZone', description: 'Historically Underutilized Business Zone' },
];

export default function ContractorsIndexPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Federal Contractor Database',
        description: 'Search and research federal government contractors',
        url: `${SITE_URL}/data/contractors`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
      }} />

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Federal <span className="text-green-500">Contractor</span> Database
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Research 500,000+ federal contractors. Find SAM registration status, certifications, NAICS codes, and contract history.
          </p>

          {/* Search CTA */}
          <div className="max-w-xl mx-auto mb-12">
            <Link
              href="/tools/cage-code-lookup"
              className="block bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <div className="text-white font-semibold group-hover:text-green-400 transition">
                    Search by CAGE Code or Company Name
                  </div>
                  <div className="text-sm text-slate-400">
                    Free lookup tool — instant results
                  </div>
                </div>
                <svg className="w-5 h-5 text-slate-500 group-hover:text-green-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400">500K+</div>
              <div className="text-sm text-slate-400">Contractors</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400">Live</div>
              <div className="text-sm text-slate-400">SAM.gov Data</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-400">5yr</div>
              <div className="text-sm text-slate-400">Contract History</div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Certification */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Browse by Certification</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {certificationTypes.map((cert) => (
              <div
                key={cert.code}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{cert.label}</h3>
                    <p className="text-sm text-slate-400 mb-4">{cert.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                    Set-Aside
                  </span>
                </div>

                {/* Gated */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent flex items-end justify-center pb-3">
                  <Link
                    href="https://getmindy.ai/market-intelligence"
                    className="text-sm text-green-400 hover:text-green-300 font-medium"
                  >
                    Search {cert.label} contractors →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Contractors (for SEO) */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Top Federal Contractors</h2>
            <span className="text-sm text-slate-500">By contract value</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredContractors.map((contractor) => (
              <Link
                key={contractor.uei}
                href={`/data/contractors/${contractor.uei}`}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-lg font-bold text-green-400">
                    {contractor.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate group-hover:text-green-400 transition">
                      {contractor.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">{contractor.uei}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs">
                    {contractor.industry}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Research */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Contractor Intelligence</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📋', title: 'SAM Status', desc: 'Registration status & expiration' },
              { icon: '🏆', title: 'Certifications', desc: '8(a), SDVOSB, WOSB, HUBZone' },
              { icon: '📊', title: 'Contract History', desc: '5 years of federal awards' },
              { icon: '🤝', title: 'Teaming Partners', desc: 'Find complementary contractors' },
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

      {/* CTA */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Get Full Contractor Intelligence
          </h2>
          <p className="text-slate-400 mb-6">
            MI Core includes contract history, bid counts, competition analysis, and teaming partner recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://getmindy.ai/market-intelligence"
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold transition"
            >
              Get MI Core — $149/mo
            </Link>
            <Link
              href="/tools/cage-code-lookup"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition border border-slate-700"
            >
              Free CAGE Lookup
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
