import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { agencies, getAgencyBySlug, getAllAgencySlugs, getSubAgencies } from '@/content/agencies';

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

          {/* Spending Stats */}
          {agency.spending && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {agency.spending.total && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <div className="text-3xl font-bold text-green-400">{agency.spending.total}</div>
                  <div className="text-sm text-slate-400">Total Contract Spending</div>
                  <div className="text-xs text-slate-500">{agency.spending.year}</div>
                </div>
              )}
              {agency.spending.smallBusiness && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <div className="text-3xl font-bold text-blue-400">{agency.spending.smallBusiness}</div>
                  <div className="text-sm text-slate-400">Small Business Awards</div>
                  <div className="text-xs text-slate-500">{agency.spending.year}</div>
                </div>
              )}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-3xl font-bold text-amber-400">{agency.painPoints.length}</div>
                <div className="text-sm text-slate-400">Known Pain Points</div>
                <div className="text-xs text-slate-500">Updated Monthly</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Pain Points */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Agency Pain Points
            </h2>
            <ul className="space-y-4">
              {agency.painPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-300">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-800">
              <p className="text-sm text-slate-500 mb-3">
                Full analysis with 50+ pain points, source documents, and action recommendations
              </p>
              <Link
                href="/mi-free"
                className="inline-block px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded-lg font-medium transition"
              >
                Get Full Intel →
              </Link>
            </div>
          </div>

          {/* Budget Priorities */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">💰</span> Budget Priorities
            </h2>
            <ul className="space-y-4">
              {agency.priorities.map((priority, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-slate-300">{priority}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-800">
              <p className="text-sm text-slate-500 mb-3">
                Daily updates on new opportunities matching these priorities
              </p>
              <Link
                href="/mi-free"
                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg font-medium transition"
              >
                Get Daily Alerts →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NAICS Codes */}
      {agency.naicsCodes && agency.naicsCodes.length > 0 && (
        <section className="py-8 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">📊</span> Top NAICS Codes
              </h2>
              <p className="text-slate-400 mb-4">
                Most common industry codes for {agency.abbreviation} contracts:
              </p>
              <div className="flex flex-wrap gap-2">
                {agency.naicsCodes.map((code) => (
                  <Link
                    key={code}
                    href={`/guides/naics-codes#${code}`}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-mono transition"
                  >
                    {code}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sub-agencies */}
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
                    {sub.spending?.total && (
                      <span className="text-xs text-slate-500">{sub.spending.total}</span>
                    )}
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

      {/* CTA */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Win More {agency.abbreviation} Contracts
          </h2>
          <p className="text-slate-400 mb-6">
            Get matched opportunities from {agency.name}, agency pain points, and SBLO contacts. Start free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold transition"
            >
              Get Free Access
            </Link>
            <Link
              href={`https://mi.govcongiants.com/opportunity-hunter?agency=${encodeURIComponent(agency.abbreviation)}`}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition border border-slate-700"
            >
              Search {agency.abbreviation} Opportunities
            </Link>
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
