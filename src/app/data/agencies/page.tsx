import Link from 'next/link';
import { generateSeo, SITE_URL } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { agencies, getAgenciesByCategory } from '@/content/agencies';

export const metadata = generateSeo({
  title: 'Federal Agencies Database — Pain Points, Spending & Contracts',
  description: 'Research 35+ federal agencies with spending data, pain points, and budget priorities. Find the right agencies for your government contracting business.',
  path: '/data/agencies',
  keywords: [
    'federal agencies',
    'government agencies list',
    'agency spending data',
    'federal contracting agencies',
    'DOD contracts',
    'civilian agency contracts',
  ],
});

const categoryInfo = {
  defense: {
    label: 'Defense',
    color: 'red',
    description: 'Department of Defense and military branches',
  },
  civilian: {
    label: 'Civilian',
    color: 'blue',
    description: 'Non-defense cabinet agencies and departments',
  },
  intelligence: {
    label: 'Intelligence',
    color: 'purple',
    description: 'Intelligence community agencies',
  },
  independent: {
    label: 'Independent',
    color: 'green',
    description: 'Independent agencies and commissions',
  },
};

export default function AgenciesIndexPage() {
  const defenseAgencies = getAgenciesByCategory('defense');
  const civilianAgencies = getAgenciesByCategory('civilian');
  const independentAgencies = getAgenciesByCategory('independent');

  // Calculate totals
  const totalSpending = agencies.reduce((sum, a) => {
    if (a.spending?.total && !a.parent) {
      const num = parseFloat(a.spending.total.replace(/[$B]/g, ''));
      return sum + (isNaN(num) ? 0 : num);
    }
    return sum;
  }, 0);

  return (
    <main className="min-h-screen bg-slate-950">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Federal Agencies Database',
        description: 'Comprehensive database of federal agencies with spending and contracting data',
        url: `${SITE_URL}/data/agencies`,
        numberOfItems: agencies.length,
        itemListElement: agencies.slice(0, 10).map((agency, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: agency.name,
          url: `${SITE_URL}/data/agencies/${agency.slug}`,
        })),
      }} />

      {/* Hero */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Federal <span className="text-green-500">Agencies</span> Database
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            Research {agencies.length} federal agencies with spending data, pain points, and budget priorities to target your government contracting efforts.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400">{agencies.length}</div>
              <div className="text-sm text-slate-400">Agencies</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400">${Math.round(totalSpending)}B+</div>
              <div className="text-sm text-slate-400">Total Spending</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-400">175+</div>
              <div className="text-sm text-slate-400">Pain Points</div>
            </div>
          </div>
        </div>
      </section>

      {/* Defense Agencies */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
              Defense
            </span>
            <h2 className="text-2xl font-bold text-white">Department of Defense</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {defenseAgencies.map((agency) => (
              <Link
                key={agency.slug}
                href={`/data/agencies/${agency.slug}`}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-red-500/50 transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-red-400">{agency.abbreviation}</span>
                  {agency.spending?.total && (
                    <span className="text-sm text-slate-500">{agency.spending.total}</span>
                  )}
                </div>
                <h3 className="text-white font-medium mb-2 group-hover:text-red-400 transition">
                  {agency.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {agency.painPoints.length} pain points • {agency.priorities.length} priorities
                </p>
                {agency.parent && (
                  <div className="mt-2 text-xs text-slate-600">
                    Part of {agency.parent.toUpperCase()}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Civilian Agencies */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
              Civilian
            </span>
            <h2 className="text-2xl font-bold text-white">Civilian Agencies</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {civilianAgencies.map((agency) => (
              <Link
                key={agency.slug}
                href={`/data/agencies/${agency.slug}`}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-blue-400">{agency.abbreviation}</span>
                  {agency.spending?.total && (
                    <span className="text-sm text-slate-500">{agency.spending.total}</span>
                  )}
                </div>
                <h3 className="text-white font-medium mb-2 group-hover:text-blue-400 transition">
                  {agency.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {agency.painPoints.length} pain points • {agency.priorities.length} priorities
                </p>
                {agency.parent && (
                  <div className="mt-2 text-xs text-slate-600">
                    Part of {agency.parent.toUpperCase()}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Independent Agencies */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
              Independent
            </span>
            <h2 className="text-2xl font-bold text-white">Independent Agencies</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {independentAgencies.map((agency) => (
              <Link
                key={agency.slug}
                href={`/data/agencies/${agency.slug}`}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-green-500/50 transition group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-green-400">{agency.abbreviation}</span>
                  {agency.spending?.total && (
                    <span className="text-sm text-slate-500">{agency.spending.total}</span>
                  )}
                </div>
                <h3 className="text-white font-medium mb-2 group-hover:text-green-400 transition">
                  {agency.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {agency.painPoints.length} pain points • {agency.priorities.length} priorities
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-900/30 to-slate-900 border border-green-500/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Get Deeper Agency Intelligence
          </h2>
          <p className="text-slate-400 mb-6">
            Mindy Free includes daily opportunity alerts, 200+ agency pain points, and SBLO contacts to help you win more contracts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/mi-free"
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold transition"
            >
              Get Free Access
            </Link>
            <Link
              href="/guides/finding-government-contracts"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition border border-slate-700"
            >
              How to Find Contracts
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
