'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

const SITE_URL = 'https://govcongiants.com';
const FREE_RESULTS_LIMIT = 15;

interface ContractResult {
  contractId: string;
  incumbent: string;
  agency: string;
  subAgency: string;
  value: number;
  valueFormatted: string;
  expirationDate: string;
  daysUntilExpiration: number;
  naicsCode: string;
  naicsDescription: string;
  state: string;
  competitionLevel: 'sole_source' | 'low' | 'medium' | 'high';
  numberOfBidders: number;
}

interface SearchResponse {
  contracts: ContractResult[];
  totalCount: number;
  displayedCount: number;
  hasMore: boolean;
  summary: {
    totalValue: number;
    totalValueFormatted: string;
    soleSourceCount: number;
    lowCompetitionCount: number;
    urgentCount: number;
  };
  upgrade?: {
    message: string;
    url: string;
  };
  error?: string;
}

// Common NAICS codes for quick search
const POPULAR_NAICS = [
  { code: '541512', name: 'Computer Systems Design' },
  { code: '541611', name: 'Management Consulting' },
  { code: '541330', name: 'Engineering Services' },
  { code: '541519', name: 'Other IT Services' },
  { code: '561210', name: 'Facilities Support' },
  { code: '236220', name: 'Commercial Construction' },
];

export default function ExpiringContractsPage() {
  const [naicsCode, setNaicsCode] = useState('');
  const [months, setMonths] = useState('6');
  const [results, setResults] = useState<ContractResult[]>([]);
  const [summary, setSummary] = useState<SearchResponse['summary'] | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Email gate state
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [email, setEmail] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [searchCount, setSearchCount] = useState(0);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!naicsCode.trim()) return;

    // Show email gate after 3 searches
    const newSearchCount = searchCount + 1;
    setSearchCount(newSearchCount);

    if (newSearchCount > 3 && !isUnlocked) {
      setShowEmailGate(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const params = new URLSearchParams({
        naics: naicsCode.trim(),
        months: months,
      });

      const response = await fetch(`/api/expiring-contracts?${params}`);
      const data: SearchResponse = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || 'Search failed. Please try again.');
        setResults([]);
        setTotalCount(0);
        setSummary(null);
      } else {
        setResults(data.contracts);
        setTotalCount(data.totalCount);
        setHasMore(data.hasMore);
        setSummary(data.summary);
      }
    } catch {
      setError('Network error. Please check your connection.');
      setResults([]);
      setTotalCount(0);
      setSummary(null);
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
          source: 'expiring-contracts',
          tags: ['expiring-contracts', 'free-tool'],
        }),
      });

      // Unlock searches regardless of API success
      setIsUnlocked(true);
      setShowEmailGate(false);

      // Trigger the search
      handleSearchAfterUnlock();
    } catch {
      // Still unlock on error - don't block user
      setIsUnlocked(true);
      setShowEmailGate(false);
      handleSearchAfterUnlock();
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleSearchAfterUnlock = async () => {
    if (!naicsCode.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const params = new URLSearchParams({
        naics: naicsCode.trim(),
        months: months,
      });

      const response = await fetch(`/api/expiring-contracts?${params}`);
      const data: SearchResponse = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || 'Search failed. Please try again.');
        setResults([]);
        setTotalCount(0);
        setSummary(null);
      } else {
        setResults(data.contracts);
        setTotalCount(data.totalCount);
        setHasMore(data.hasMore);
        setSummary(data.summary);
      }
    } catch {
      setError('Network error. Please check your connection.');
      setResults([]);
      setTotalCount(0);
      setSummary(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSearch = (code: string) => {
    setNaicsCode(code);
  };

  const getCompetitionBadge = (level: string) => {
    switch (level) {
      case 'sole_source':
        return { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Sole Source' };
      case 'low':
        return { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Low Competition' };
      case 'medium':
        return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Medium' };
      default:
        return { bg: 'bg-red-500/20', text: 'text-red-400', label: 'High Competition' };
    }
  };

  // JSON-LD for WebApplication with isAccessibleForFree for Google Helpful Content
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Free Expiring Government Contracts Finder',
    description: 'Find federal contracts expiring in the next 6-18 months. Identify recompete opportunities by NAICS code. Free tool powered by SAM.gov data.',
    url: `${SITE_URL}/tools/expiring-contracts`,
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
            Expiring Contracts <span className="text-green-500">Finder</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Find federal contracts expiring soon. Target recompete opportunities before they hit the street.
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="px-6 pb-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            {/* Quick NAICS Buttons */}
            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-2">Quick Search by Industry:</label>
              <div className="flex flex-wrap gap-2">
                {POPULAR_NAICS.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handleQuickSearch(item.code)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                      naicsCode === item.code
                        ? 'bg-green-600 border-green-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* NAICS Input */}
            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-2">Or enter NAICS code:</label>
              <input
                type="text"
                value={naicsCode}
                onChange={(e) => setNaicsCode(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter NAICS code (e.g., 541512)"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
                maxLength={6}
              />
            </div>

            {/* Months Selector */}
            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-2">Expiring within:</label>
              <div className="flex gap-3">
                {['3', '6', '12', '18'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonths(m)}
                    className={`flex-1 py-2 text-sm rounded-lg border transition ${
                      months === m
                        ? 'bg-green-600 border-green-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {m} months
                  </button>
                ))}
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={isLoading || !naicsCode.trim()}
              className="w-full px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
            >
              {isLoading ? 'Searching...' : 'Find Expiring Contracts'}
            </button>
          </form>
        </div>
      </section>

      {/* Email Gate Modal */}
      {showEmailGate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Unlock Free Searches
              </h3>
              <p className="text-slate-400 mb-6">
                Enter your email to continue searching for expiring contracts.
              </p>
              <form onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500 mb-4"
                />
                <button
                  type="submit"
                  disabled={isSubmittingEmail}
                  className="w-full px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 text-white font-semibold rounded-lg transition"
                >
                  {isSubmittingEmail ? 'Unlocking...' : 'Continue Searching'}
                </button>
              </form>
              <p className="mt-4 text-xs text-slate-500">
                No spam. We&apos;ll send you free GovCon tips and contract alerts.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <section className="px-6 pb-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {hasSearched && !error && (
        <section className="px-6 pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Summary Stats */}
            {summary && results.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-white">{totalCount}</p>
                  <p className="text-sm text-slate-400">Total Contracts</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-green-400">{summary.totalValueFormatted}</p>
                  <p className="text-sm text-slate-400">Total Value</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-purple-400">{summary.soleSourceCount}</p>
                  <p className="text-sm text-slate-400">Sole Source</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-orange-400">{summary.urgentCount}</p>
                  <p className="text-sm text-slate-400">Urgent (&lt;90 days)</p>
                </div>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                {results.length === 0 ? 'No contracts found' : `Showing ${results.length} of ${totalCount} contracts`}
              </h2>
            </div>

            {/* Results Table */}
            {results.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-800/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Incumbent</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Agency</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-slate-400">Value</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-slate-400">Expires</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-slate-400">Competition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {results.map((contract, idx) => {
                        const badge = getCompetitionBadge(contract.competitionLevel);
                        return (
                          <tr key={`${contract.contractId}-${idx}`} className="hover:bg-slate-800/30">
                            <td className="px-4 py-4">
                              <p className="text-white font-medium truncate max-w-[200px]">
                                {contract.incumbent || 'Unknown'}
                              </p>
                              <p className="text-sm text-slate-500">{contract.state}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-slate-300 truncate max-w-[180px]">{contract.agency}</p>
                            </td>
                            <td className="px-4 py-4 text-right">
                              <p className="text-green-400 font-semibold">{contract.valueFormatted}</p>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <p className={`font-medium ${contract.daysUntilExpiration <= 90 ? 'text-orange-400' : 'text-slate-300'}`}>
                                {contract.daysUntilExpiration} days
                              </p>
                            </td>
                            <td className="px-4 py-4 text-center">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
                                {badge.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Upsell CTA */}
            {hasMore && (
              <div className="mt-6 bg-gradient-to-r from-green-600/20 to-purple-600/20 border border-green-500/30 rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {totalCount - FREE_RESULTS_LIMIT}+ More Contracts Available
                </h3>
                <p className="text-slate-300 mb-4">
                  Get full access to all {totalCount} expiring contracts, plus email alerts and POC information.
                </p>
                <a
                  href="https://mi.govcongiants.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition"
                >
                  Upgrade to MI Core
                </a>
              </div>
            )}

            {/* No Results Message */}
            {results.length === 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
                <p className="text-slate-400 mb-4">
                  No expiring contracts found for NAICS code {naicsCode} in the next {months} months.
                </p>
                <p className="text-sm text-slate-500">
                  Try a broader NAICS code (first 3 digits) or extend the time range.
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
            <h2 className="text-2xl font-bold text-white mb-4">Why Track Expiring Contracts?</h2>
            <p className="text-slate-400 mb-4">
              When federal contracts expire, agencies must recompete them. This creates opportunities for new contractors to win work that was previously locked up by incumbents.
            </p>
            <ul className="space-y-3 text-slate-400 mb-6">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong className="text-white">Sole Source contracts</strong> often recompete as full & open - leveling the playing field.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong className="text-white">Track incumbents</strong> to learn what works and identify teaming opportunities.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong className="text-white">Plan ahead</strong> - start capability development 6-12 months before RFP release.</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/guides/government-contracting-for-beginners"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition"
              >
                Learn GovCon Basics
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
    </main>
  );
}
