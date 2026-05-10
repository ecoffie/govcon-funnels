'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

const SITE_URL = 'https://govcongiants.com';
const FREE_RESULTS_LIMIT = 3;

interface EntityResult {
  cageCode: string | null;
  uei: string;
  name: string;
  dba: string | null;
  city: string;
  state: string;
  country: string;
  status: string;
  expirationDate: string | null;
  daysUntilExpiration?: number;
  naics: string[];
  certifications: {
    has8a: boolean;
    hasSDVOSB: boolean;
    hasWOSB: boolean;
    hasHUBZone: boolean;
    all: string[];
  };
}

interface SearchResponse {
  entities: EntityResult[];
  totalRecords: number;
  error?: string;
}

export default function CageCodeLookupPage() {
  const [searchType, setSearchType] = useState<'cageCode' | 'companyName'>('cageCode');
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<EntityResult[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Email gate state
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [email, setEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const params = new URLSearchParams({
        [searchType]: searchValue.trim(),
        limit: '25',
      });

      const response = await fetch(`/api/cage-lookup?${params}`);
      const data: SearchResponse = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || 'Search failed. Please try again.');
        setResults([]);
        setTotalRecords(0);
      } else {
        setResults(data.entities);
        setTotalRecords(data.totalRecords);
        // Show email gate if there are more than FREE_RESULTS_LIMIT results
        if (data.entities.length > FREE_RESULTS_LIMIT && !isUnlocked) {
          setShowEmailGate(true);
        }
      }
    } catch {
      setError('Network error. Please check your connection.');
      setResults([]);
      setTotalRecords(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmittingEmail(true);

    try {
      // Send to lead API
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: '',
          source: 'cage-code-lookup',
          tags: ['cage-lookup', 'free-tool'],
        }),
      });

      // Unlock results regardless of API success
      setIsUnlocked(true);
      setShowEmailGate(false);
    } catch {
      // Still unlock on error - don't block user
      setIsUnlocked(true);
      setShowEmailGate(false);
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const visibleResults = isUnlocked ? results : results.slice(0, FREE_RESULTS_LIMIT);
  const hiddenCount = results.length - FREE_RESULTS_LIMIT;

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

      {/* Search Form */}
      <section className="px-6 pb-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            {/* Search Type Toggle */}
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  value="cageCode"
                  checked={searchType === 'cageCode'}
                  onChange={(e) => setSearchType(e.target.value as 'cageCode' | 'companyName')}
                  className="w-4 h-4 text-green-500 bg-slate-800 border-slate-600 focus:ring-green-500"
                />
                <span className="text-white">CAGE Code</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  value="companyName"
                  checked={searchType === 'companyName'}
                  onChange={(e) => setSearchType(e.target.value as 'cageCode' | 'companyName')}
                  className="w-4 h-4 text-green-500 bg-slate-800 border-slate-600 focus:ring-green-500"
                />
                <span className="text-white">Company Name</span>
              </label>
            </div>

            {/* Search Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchType === 'cageCode' ? 'Enter 5-character CAGE code (e.g., 1ABC2)' : 'Enter company name'}
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
                maxLength={searchType === 'cageCode' ? 5 : 100}
              />
              <button
                type="submit"
                disabled={isLoading || !searchValue.trim()}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>

            {searchType === 'cageCode' && (
              <p className="mt-2 text-sm text-slate-500">
                CAGE codes are 5 alphanumeric characters (e.g., 0ABC1, 1XYZ2)
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section className="px-6 pb-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-medium">{error}</p>
              {error.includes('daily limit') && (
                <p className="text-slate-400 text-sm mt-2">
                  SAM.gov API has strict daily limits. The limit resets at midnight UTC.
                  In the meantime, you can search directly on{' '}
                  <a
                    href="https://sam.gov/search/?index=ei&page=1&sort=-modifiedDate&pageSize=25&sfm%5Bstatus%5D%5Bis_active%5D=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:underline"
                  >
                    SAM.gov
                  </a>.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {hasSearched && !error && (
        <section className="px-6 pb-12">
          <div className="max-w-3xl mx-auto">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                {results.length === 0 ? 'No results found' : `${totalRecords} result${totalRecords !== 1 ? 's' : ''} found`}
              </h2>
              {results.length > 0 && !isUnlocked && (
                <span className="text-sm text-slate-400">
                  Showing {Math.min(FREE_RESULTS_LIMIT, results.length)} of {totalRecords}
                </span>
              )}
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {visibleResults.map((entity, idx) => (
                <div
                  key={entity.uei || idx}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {entity.name}
                      </h3>
                      {entity.dba && (
                        <p className="text-sm text-slate-400 mb-2">
                          DBA: {entity.dba}
                        </p>
                      )}
                      <p className="text-slate-400">
                        {entity.city}{entity.state ? `, ${entity.state}` : ''}{entity.country !== 'USA' ? ` (${entity.country})` : ''}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-sm">CAGE:</span>
                        <span className="font-mono text-green-400 font-semibold">
                          {entity.cageCode || 'N/A'}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          entity.status === 'Active'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {entity.status}
                      </span>
                    </div>
                  </div>

                  {/* NAICS Codes */}
                  {entity.naics.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-800">
                      <span className="text-xs text-slate-500 uppercase tracking-wider">NAICS:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {entity.naics.map((code) => (
                          <span
                            key={code}
                            className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300"
                          >
                            {code}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {(entity.certifications.has8a || entity.certifications.hasSDVOSB || entity.certifications.hasWOSB || entity.certifications.hasHUBZone) && (
                    <div className="mt-2">
                      <span className="text-xs text-slate-500 uppercase tracking-wider">Certifications:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {entity.certifications.has8a && (
                          <span className="px-2 py-0.5 bg-blue-500/20 rounded text-xs text-blue-400">8(a)</span>
                        )}
                        {entity.certifications.hasSDVOSB && (
                          <span className="px-2 py-0.5 bg-blue-500/20 rounded text-xs text-blue-400">SDVOSB</span>
                        )}
                        {entity.certifications.hasWOSB && (
                          <span className="px-2 py-0.5 bg-blue-500/20 rounded text-xs text-blue-400">WOSB</span>
                        )}
                        {entity.certifications.hasHUBZone && (
                          <span className="px-2 py-0.5 bg-blue-500/20 rounded text-xs text-blue-400">HUBZone</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Email Gate */}
            {showEmailGate && hiddenCount > 0 && !isUnlocked && (
              <div className="mt-6 bg-slate-900 border-2 border-green-500/30 rounded-xl p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {hiddenCount} More Result{hiddenCount !== 1 ? 's' : ''} Available
                  </h3>
                  <p className="text-slate-400 mb-4">
                    Enter your email to unlock all results
                  </p>
                  <form onSubmit={handleEmailSubmit} className="flex gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingEmail}
                      className="px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 text-white font-semibold rounded-lg transition"
                    >
                      {isSubmittingEmail ? 'Unlocking...' : 'Unlock'}
                    </button>
                  </form>
                  <p className="mt-3 text-xs text-slate-500">
                    No spam. We&apos;ll send you free GovCon tips.
                  </p>
                </div>
              </div>
            )}

            {/* No Results Message */}
            {results.length === 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
                <p className="text-slate-400 mb-4">
                  No contractors found matching your search.
                </p>
                <p className="text-sm text-slate-500">
                  {searchType === 'cageCode'
                    ? 'Make sure you entered a valid 5-character CAGE code.'
                    : 'Try a different company name or search by CAGE code.'}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

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
