'use client';

import { useState, FormEvent } from 'react';

interface Designation {
  type: string;
  label: string;
  county: string | null;
  state: string | null;
  status: string | null;
  effective: string | null;
  expires: string | null;
}

interface CheckResult {
  qualified: boolean;
  statusLabel: string;
  formattedAddress: string | null;
  location: { lat: number; lng: number } | null;
  designations: Designation[];
  untilDate: string | null;
  nextEvaluationYear: string | null;
  queryDate: string;
  error?: string;
  fallbackUrl?: string;
}

/**
 * Live HUBZone address checker, embedded on /guides/hubzone-certification —
 * GSC shows that page ranks for "hubzone map" / "hubzone checker" / "hubzone
 * by zip code" intent, so the check must be completable on the page. Data
 * comes from /api/hubzone-check (proxies the official SBA HUBZone map).
 */
export default function HubzoneCheckWidget() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (e: FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/hubzone-check?q=${encodeURIComponent(address.trim())}`);
      const data: CheckResult = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || 'Lookup failed. Please try again.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const mapUrl = result?.location
    ? `https://maps.certify.sba.gov/hubzone/map#center=${result.location.lat},${result.location.lng}&zoom=14`
    : 'https://maps.certify.sba.gov/hubzone/map';

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleCheck} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-white font-semibold mb-1">Check an address against the current HUBZone map</p>
        <p className="text-sm text-slate-400 mb-4">
          Enter a street address, city + state, or ZIP code. Results come from the official SBA HUBZone map data.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. 123 Main St, Detroit, MI"
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
            maxLength={120}
          />
          <button
            type="submit"
            disabled={isLoading || !address.trim()}
            className="px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
          >
            {isLoading ? 'Checking…' : 'Check Address'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-400 font-medium">{error}</p>
          <p className="text-slate-400 text-sm mt-2">
            You can always check directly on the{' '}
            <a href="https://maps.certify.sba.gov/hubzone/map" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
              official SBA HUBZone map
            </a>.
          </p>
        </div>
      )}

      {result && (
        <div
          className={`mt-4 rounded-xl border-2 p-6 ${
            result.qualified ? 'bg-green-500/10 border-green-500/40' : 'bg-slate-900 border-slate-700'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-2xl ${result.qualified ? '' : 'opacity-70'}`}>{result.qualified ? '✅' : '❌'}</span>
            <div>
              <p className={`text-xl font-bold ${result.qualified ? 'text-green-400' : 'text-slate-200'}`}>
                {result.statusLabel}
              </p>
              {result.formattedAddress && (
                <p className="text-sm text-slate-400">{result.formattedAddress}</p>
              )}
            </div>
          </div>

          {result.designations.length > 0 && (
            <div className="mt-4 space-y-2">
              {result.designations.map((d, i) => (
                <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-lg px-4 py-3 text-sm">
                  <span className="text-white font-medium">{d.label}</span>
                  {(d.county || d.state) && (
                    <span className="text-slate-400"> — {[d.county, d.state].filter(Boolean).join(', ')}</span>
                  )}
                  {d.status && <span className="text-slate-400"> · {d.status}</span>}
                  {d.expires && <span className="text-amber-400"> · expires {d.expires}</span>}
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-800 text-sm text-slate-400 space-y-2">
            <p>
              Checked against the SBA map as of {result.queryDate}
              {result.nextEvaluationYear ? ` · next SBA evaluation: ${result.nextEvaluationYear}` : ''}.{' '}
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                View this location on the official SBA map →
              </a>
            </p>
            <p>
              <strong className="text-slate-300">Remember:</strong> certification requires BOTH your principal office
              in a HUBZone <em>and</em> 35% of employees living in HUBZones — check your office address and employee
              home addresses separately. Boundaries can split a single street.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
