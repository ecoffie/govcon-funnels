import { Suspense } from 'react';
import Link from 'next/link';
import { generateSeo, breadcrumbJsonLd } from '@/lib/seo';
import { searchUSAJobs } from '@/lib/usajobs';
import { getDisplayCategories } from '@/lib/job-categories';
import JobListClient from './JobListClient';
import JobAlertSignup from '@/components/JobAlertSignup';

// Force dynamic rendering so env vars are available at runtime
export const dynamic = 'force-dynamic';

export const metadata = generateSeo({
  title: 'Government Contractor Jobs: $100K-$300K Roles (Hiring Now)',
  description: 'GovCon jobs updated daily: Capture Manager, Proposal Manager, Contracts, BD. Remote options, no clearance required for many. 500+ open positions.',
  path: '/jobs',
  keywords: [
    'government contractor jobs',
    '100k government contractor jobs',
    'federal contractor jobs',
    'capture manager jobs',
    'proposal manager jobs',
    'govcon jobs',
    'government contracting careers',
  ],
});

// Generate JSON-LD for the job listing page
function jobListJsonLd() {
  const categories = getDisplayCategories();
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Government Contracting Jobs',
    description: 'High-paying business development, capture, and proposal jobs in government contracting',
    numberOfItems: categories.length,
    itemListElement: categories.map((cat, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://govcongiants.org/jobs/${cat.slug}`,
      name: `${cat.name} Jobs`,
    })),
  };
}

async function JobStats() {
  const { total } = await searchUSAJobs({ limit: 1 });
  const categories = getDisplayCategories();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-green-400">{total}+</div>
        <div className="text-sm text-slate-400">Active Jobs</div>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-green-400">{categories.length}</div>
        <div className="text-sm text-slate-400">BD Role Types</div>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-green-400">$80K-$500K</div>
        <div className="text-sm text-slate-400">Salary Range</div>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-green-400">Daily</div>
        <div className="text-sm text-slate-400">Updated</div>
      </div>
    </div>
  );
}

export default async function JobsPage() {
  // Fetch initial jobs server-side
  const { jobs: initialJobs, total } = await searchUSAJobs({ limit: 25 });

  // Breadcrumb items for JSON-LD
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Jobs', url: '/jobs' },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* JSON-LD: ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobListJsonLd()) }}
      />
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbItems)) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-4">
            <Link href="/" className="hover:text-green-300">Home</Link>
            <span className="text-slate-600">/</span>
            <span>Jobs</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            GovCon <span className="text-green-500">Jobs</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mb-8">
            Find high-paying business development, capture, and proposal roles in government contracting. Salaries from $80K to $500K+.
          </p>

          {/* Quick category links */}
          <div className="flex flex-wrap gap-2">
            {getDisplayCategories().slice(0, 5).map((cat) => (
              <Link
                key={cat.slug}
                href={`/jobs?category=${cat.slug}`}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full text-sm transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<div className="animate-pulse bg-slate-800 h-32 rounded-xl" />}>
            <JobStats />
          </Suspense>

          {/* Job Alerts Signup */}
          <div className="mb-8">
            <JobAlertSignup />
          </div>

          <JobListClient initialJobs={initialJobs} initialTotal={total} />
        </div>
      </section>

      {/* Career Guides Section */}
      <section className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            GovCon <span className="text-green-500">Career Guides</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/blog/9-govcon-bd-jobs-150k"
              className="bg-slate-800/50 border border-slate-700 hover:border-green-500/50 rounded-xl p-6 transition-colors group"
            >
              <div className="text-green-400 text-sm font-medium mb-2">Career Guide</div>
              <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors mb-2">
                9 GovCon BD Jobs That Pay $150K+
              </h3>
              <p className="text-slate-400 text-sm">
                From Proposal Coordinator to VP of BD — learn the career paths, salary ranges, and skills needed.
              </p>
            </Link>
            <Link
              href="/blog/govcon-bd-jobs-no-experience"
              className="bg-slate-800/50 border border-slate-700 hover:border-green-500/50 rounded-xl p-6 transition-colors group"
            >
              <div className="text-green-400 text-sm font-medium mb-2">Getting Started</div>
              <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors mb-2">
                GovCon Jobs With No Experience
              </h3>
              <p className="text-slate-400 text-sm">
                5 entry-level roles that pay $70K-$100K and lead to six-figure BD careers.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Certification CTA */}
      <section className="py-12 px-6 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Land These <span className="text-green-500">High-Paying Roles</span>?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Our BD training programs teach you the exact skills employers are looking for. Graduates are landing $80K-$300K+ roles.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/upskilling"
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors"
            >
              Learn About BD Training
            </Link>
            <Link
              href="/free-course"
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
            >
              Start Free Course
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
