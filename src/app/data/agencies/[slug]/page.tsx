import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { agencies, getAgencyBySlug, getAllAgencySlugs, getSubAgencies } from '@/content/agencies';
import enrichmentData from '@/content/agency-enrichment.json';

// Richer agency data exported from market-assassin's databases (307 agencies,
// 10 pain points + 10 priorities each, real budget authority, and a count of
// subcontracting contacts). Keyed by exact agency name. Regenerate with
// `node scripts/export-agency-enrichment.js`. See that script for the policy on
// why contacts are a COUNT only (PII gated to Mindy Pro).
interface AgencyEnrichment {
  painPoints: string[];
  priorities: string[];
  budget: { fy2025: number | null; fy2026: number | null; changePercent: number | null; trend: string | null } | null;
  subcontractingContacts: number;
}
const ENRICHMENT = (enrichmentData as { agencies: Record<string, AgencyEnrichment> }).agencies;

function fmtBillions(n: number | null): string {
  if (!n) return '—';
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`;
  return `$${n.toLocaleString()}`;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllAgencySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const agency = getAgencyBySlug(slug);
  if (!agency) return {};

  return generateSeo({
    title: `${agency.name} Contracts & Opportunities | ${agency.abbreviation} Pain Points`,
    description: `Find ${agency.abbreviation} government contracts and understand agency priorities. ${agency.spending?.total || 'Billions'} in spending, key pain points, and how to win ${agency.name} contracts.`,
    path: `/data/agencies/${slug}`,
    keywords: [
      `${agency.abbreviation} contracts`,
      `${agency.name} opportunities`,
      `${agency.abbreviation} pain points`,
      `sell to ${agency.abbreviation}`,
      `${agency.abbreviation} small business`,
      `${agency.abbreviation} procurement`,
    ],
  });
}

export default async function AgencyPage({ params }: Props) {
  const { slug } = await params;
  const agency = getAgencyBySlug(slug);

  if (!agency) {
    notFound();
  }

  const subAgencies = getSubAgencies(slug);
  const parentAgency = agency.parent ? getAgencyBySlug(agency.parent) : null;

  // Merge the richer exported data by agency name. Fall back to the static
  // content when an agency isn't in the enrichment set (so nothing regresses).
  const enrich = ENRICHMENT[agency.name];
  const painPointCount = enrich?.painPoints.length || agency.painPoints.length;
  const priorityCount = enrich?.priorities.length || agency.priorities.length;
  const contactCount = enrich?.subcontractingContacts || 0;
  // Two real pain points shown unblurred as proof the data is real; the rest gated.
  const samplePainPoints = (enrich?.painPoints || agency.painPoints).slice(0, 2);
  const budget = enrich?.budget;

  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'GovernmentOrganization',
        name: agency.name,
        alternateName: agency.abbreviation,
        description: agency.description,
        url: `${SITE_URL}/data/agencies/${slug}`,
      }} />

      {/* Breadcrumb */}
      <div className="py-4 px-6 bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/data/agencies" className="hover:text-white transition">Agencies</Link>
            {parentAgency && (
              <>
                <span>/</span>
                <Link href={`/data/agencies/${parentAgency.slug}`} className="hover:text-white transition">
                  {parentAgency.abbreviation}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-white">{agency.abbreviation}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-slate-800 rounded-xl flex items-center justify-center text-3xl font-bold text-green-400 flex-shrink-0">
              {agency.abbreviation.slice(0, 3)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  agency.category === 'defense' ? 'bg-red-500/20 text-red-400' :
                  agency.category === 'civilian' ? 'bg-blue-500/20 text-blue-400' :
                  agency.category === 'intelligence' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {agency.category.charAt(0).toUpperCase() + agency.category.slice(1)}
                </span>
                {agency.parent && parentAgency && (
                  <span className="text-slate-500 text-sm">
                    Part of <Link href={`/data/agencies/${parentAgency.slug}`} className="text-slate-400 hover:text-white">{parentAgency.abbreviation}</Link>
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {agency.name}
              </h1>
              <p className="text-lg text-slate-400 max-w-3xl">
                {agency.description}
              </p>
            </div>
          </div>

          {/* Teaser Stats — real counts from the exported databases */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl font-bold text-green-400">{painPointCount}</div>
              <div className="text-sm text-slate-400">Pain Points Identified</div>
              <div className="text-xs text-slate-500">Updated Monthly</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-400">{priorityCount}</div>
              <div className="text-sm text-slate-400">Budget Priorities</div>
              <div className="text-xs text-slate-500">FY2025-2026</div>
            </div>
            {contactCount > 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-400">{contactCount.toLocaleString()}</div>
                <div className="text-sm text-slate-400">Subcontracting Contacts</div>
                <div className="text-xs text-slate-500">Primes w/ sub plans</div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-amber-400">{agency.naicsCodes?.length || 0}</div>
                <div className="text-sm text-slate-400">Top NAICS Codes</div>
                <div className="text-xs text-slate-500">By spending volume</div>
              </div>
            )}
            {budget?.fy2026 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-emerald-400">{fmtBillions(budget.fy2026)}</div>
                <div className="text-sm text-slate-400">FY2026 Budget Authority</div>
                <div className="text-xs text-slate-500">
                  {budget.trend === 'declining' ? '▼' : budget.trend === 'growing' ? '▲' : '◆'} vs FY2025
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-amber-400">{agency.naicsCodes?.length || 0}</div>
                <div className="text-sm text-slate-400">Top NAICS Codes</div>
                <div className="text-xs text-slate-500">By spending volume</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gated Content - All data behind paywall */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Pain Points - GATED */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Agency Pain Points
            </h2>

            {/* Two REAL pain points shown as proof the data is real, then the rest gated. */}
            <div className="space-y-4 mb-6">
              {samplePainPoints.map((point, i) => (
                <div key={`real-${i}`} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-300">{point}</span>
                </div>
              ))}
              {[samplePainPoints.length + 1, samplePainPoints.length + 2, samplePainPoints.length + 3].map((num) => (
                <div key={num} className="flex items-start gap-3 opacity-50 blur-[3px] select-none pointer-events-none">
                  <span className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {num}
                  </span>
                  <span className="text-slate-300">████████ ██████████ ████████ ██████ ███████</span>
                </div>
              ))}
            </div>

            {/* Gate overlay */}
            <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-slate-900 via-slate-900/98 to-transparent flex items-end justify-center pb-8">
              <div className="text-center">
                <p className="text-slate-400 mb-4 text-sm">Unlock all {painPointCount} pain points for {agency.abbreviation}</p>
                <Link
                  href="https://getmindy.ai/market-intelligence"
                  className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
                >
                  Get Mindy Pro — $149/mo
                </Link>
              </div>
            </div>
          </div>

          {/* Budget Priorities - GATED */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">💰</span> Budget Priorities
            </h2>

            {/* Blurred preview */}
            <div className="space-y-4 mb-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-start gap-3 opacity-50 blur-[3px] select-none pointer-events-none">
                  <span className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {num}
                  </span>
                  <span className="text-slate-300">████████ ██████████ ████████ ██████ ███████</span>
                </div>
              ))}
            </div>

            {/* Gate overlay */}
            <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-slate-900 via-slate-900/98 to-transparent flex items-end justify-center pb-8">
              <div className="text-center">
                <p className="text-slate-400 mb-4 text-sm">See what {agency.abbreviation} is prioritizing in FY2025-2026</p>
                <Link
                  href="https://getmindy.ai/market-intelligence"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition"
                >
                  Get Mindy Pro — $149/mo
                </Link>
              </div>
            </div>
          </div>

          {/* Subcontracting Contacts — count + teaser, PII gated to Mindy Pro */}
          {contactCount > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-2xl">📇</span> Subcontracting Contacts
              </h2>
              <p className="text-slate-400 text-sm mb-6">
                <span className="text-purple-300 font-semibold">{contactCount.toLocaleString()} prime contractors</span> with
                active subcontracting plans serve {agency.abbreviation} — your fastest path in as a sub.
              </p>

              {/* Blurred contact rows */}
              <div className="space-y-3 mb-6">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center gap-3 opacity-50 blur-[3px] select-none pointer-events-none">
                    <span className="w-8 h-8 bg-purple-500/20 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-slate-300 text-sm">████████ ████████ ██████</div>
                      <div className="text-slate-500 text-xs">SBLO · ██████@████████.com</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gate overlay */}
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-900 via-slate-900/98 to-transparent flex items-end justify-center pb-8">
                <div className="text-center">
                  <p className="text-slate-400 mb-4 text-sm">Get all {contactCount.toLocaleString()} {agency.abbreviation} subcontracting contacts in Mindy</p>
                  <Link
                    href="https://getmindy.ai/market-intelligence"
                    className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition"
                  >
                    Get Mindy Pro — $149/mo
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Spending Data - GATED */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span> Spending Data
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="text-sm text-slate-500 mb-1">Total Contract Spending</div>
                <div className="text-2xl font-bold text-slate-600 blur-sm select-none">$XXX.XB</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="text-sm text-slate-500 mb-1">Small Business Awards</div>
                <div className="text-2xl font-bold text-slate-600 blur-sm select-none">$XX.XB</div>
              </div>
            </div>

            {/* Gate overlay */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/98 to-transparent flex items-end justify-center pb-6">
              <Link
                href="https://getmindy.ai/market-intelligence"
                className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
              >
                View Spending Data
              </Link>
            </div>
          </div>

          {/* NAICS Codes - GATED */}
          {agency.naicsCodes && agency.naicsCodes.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🏷️</span> Top NAICS Codes
              </h2>
              <p className="text-slate-400 mb-4">
                Most common industry codes for {agency.abbreviation} contracts:
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {agency.naicsCodes.map((code) => (
                  <span key={code} className="px-3 py-1.5 bg-slate-800 text-slate-500 rounded-lg text-sm font-mono blur-[3px] select-none">
                    XXXXXX
                  </span>
                ))}
              </div>

              {/* Gate overlay */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900 via-slate-900/98 to-transparent flex items-end justify-center pb-4">
                <Link
                  href="https://getmindy.ai/market-intelligence"
                  className="text-sm text-green-400 hover:text-green-300 font-medium transition"
                >
                  Unlock NAICS codes with Mindy Pro →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sub-agencies - Keep visible for navigation */}
      {subAgencies.length > 0 && (
        <section className="py-8 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6">
              {agency.abbreviation} Sub-Agencies & Commands
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subAgencies.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/data/agencies/${sub.slug}`}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-green-400 font-bold">{sub.abbreviation}</span>
                  </div>
                  <h3 className="text-white font-medium group-hover:text-green-400 transition">
                    {sub.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Value Prop / CTA */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-3">
                Get Full {agency.abbreviation} Intelligence
              </h2>
              <p className="text-slate-400">
                Stop guessing. Get the data you need to win {agency.name} contracts.
              </p>
            </div>

            <div className="bg-slate-900/50 border-2 border-green-500 rounded-xl p-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-green-400 font-semibold mb-2">MI CORE</div>
                <div className="text-4xl font-bold text-white mb-2">$149<span className="text-lg text-slate-400">/mo</span></div>
                <p className="text-slate-400 text-sm mb-6">Full access to 200+ agencies</p>

                <ul className="space-y-2 mb-6 text-left">
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="text-green-500">✓</span> All {painPointCount} pain points for {agency.abbreviation}
                  </li>
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="text-green-500">✓</span> Budget priorities & spending data
                  </li>
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="text-green-500">✓</span> SBLO contacts with email/phone
                  </li>
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="text-green-500">✓</span> AI-powered daily briefings
                  </li>
                  <li className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="text-green-500">✓</span> 7,700+ forecast opportunities
                  </li>
                </ul>

                <Link
                  href="https://getmindy.ai/market-intelligence"
                  className="block w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold text-center transition"
                >
                  Get Mindy Pro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 px-6 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Related Resources</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guides/finding-government-contracts" className="text-sm text-slate-400 hover:text-white transition">
              Finding Government Contracts →
            </Link>
            <Link href="/guides/proposal-writing" className="text-sm text-slate-400 hover:text-white transition">
              Proposal Writing Guide →
            </Link>
            <Link href="/guides/sba-certifications" className="text-sm text-slate-400 hover:text-white transition">
              SBA Certifications →
            </Link>
            <Link href="/tools/expiring-contracts" className="text-sm text-slate-400 hover:text-white transition">
              Expiring Contracts Finder →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
