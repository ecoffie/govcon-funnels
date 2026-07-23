'use client';

import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import CageCodeLookupWidget from '@/components/CageCodeLookupWidget';

const SITE_URL = 'https://govcongiants.com';

export default function CageCodeLookupPage() {
  // JSON-LD for WebApplication with isAccessibleForFree for Google Helpful Content
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free CAGE Code Lookup Tool',
    description: 'Look up any CAGE code or search federal contractors by company name. Free tool powered by SAM.gov data.',
    url: `${SITE_URL}/tools/cage-code-lookup`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: 'GovCon Giants',
      url: SITE_URL,
    },
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={webAppJsonLd} />

      {/* Hero */}
      <section className="pt-16 pb-8 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Free Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            CAGE Code <span className="text-green-500">Lookup</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Search 600,000+ federal contractors by CAGE code or company name. Powered by official SAM.gov data.
          </p>
        </div>
      </section>

      {/* Search + results (shared widget, also embedded on /guides/cage-code) */}
      <section className="px-6 pb-12">
        <CageCodeLookupWidget />
      </section>

      {/* Learn More Section */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">What is a CAGE Code?</h2>
            <p className="text-slate-400 mb-4">
              A CAGE (Commercial And Government Entity) code is a 5-character identifier assigned by the Defense Logistics Agency (DLA) to entities doing business with the federal government. Every business registered in SAM.gov receives a CAGE code.
            </p>
            <p className="text-slate-400 mb-6">
              CAGE codes are used to identify contractors on federal contracts, track past performance, and verify business eligibility for government opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/guides/cage-code"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition"
              >
                Read the Full Guide
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-700 hover:border-slate-600 text-slate-300 rounded-lg font-medium transition"
              >
                Explore More Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Need Help Finding Federal Contracts?
            </h2>
            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
              Our Market Assassin tool analyzes agency spending patterns and identifies the best opportunities for your business.
            </p>
            <Link
              href="/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-lg transition-all"
            >
              Try Market Assassin
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
