import { Suspense } from 'react';
import Link from 'next/link';
import { generateSeo, breadcrumbJsonLd } from '@/lib/seo';
import { searchGovConJobs } from '@/lib/jsearch';
import { searchUSAJobs } from '@/lib/usajobs';
import { getDisplayCategories } from '@/lib/job-categories';
import JobAlertSignup from '@/components/JobAlertSignup';
import type { Job } from '@/types/job';

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

// Job Card Component
function JobCard({ job, featured = false }: { job: Job; featured?: boolean }) {
  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return null;
    const fmt = (n: number) => `$${Math.round(n / 1000)}K`;
    if (min && max) return `${fmt(min)} - ${fmt(max)}`;
    if (min) return `${fmt(min)}+`;
    return `Up to ${fmt(max!)}`;
  };

  const getRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${diffDays >= 14 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${diffDays >= 60 ? 's' : ''} ago`;
  };

  const salary = formatSalary(job.salary_min, job.salary_max);

  return (
    <a
      href={job.apply_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block bg-slate-900 border rounded-xl p-5 hover:border-green-500/50 transition-all group ${
        featured ? 'border-green-500/30 ring-1 ring-green-500/20' : 'border-slate-800'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {featured && (
              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded">
                Featured
              </span>
            )}
            {job.remote && (
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">
                Remote
              </span>
            )}
            <span className="text-slate-500 text-xs">{getRelativeTime(job.posted_date)}</span>
          </div>
          <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors truncate">
            {job.title}
          </h3>
          <p className="text-slate-400 text-sm truncate">{job.company}</p>
        </div>
        {salary && (
          <div className="text-right shrink-0">
            <div className="text-green-400 font-semibold">{salary}</div>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-500">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>
        {job.clearance && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {job.clearance}
          </span>
        )}
        {job.grade && (
          <span className="px-2 py-0.5 bg-slate-800 rounded text-xs">{job.grade}</span>
        )}
      </div>
    </a>
  );
}

// Section component for job listings
function JobSection({
  title,
  subtitle,
  jobs,
  icon,
  accentColor = 'green'
}: {
  title: string;
  subtitle: string;
  jobs: Job[];
  icon: React.ReactNode;
  accentColor?: 'green' | 'blue' | 'purple';
}) {
  const colors = {
    green: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
  };
  const color = colors[accentColor];

  return (
    <div className={`rounded-2xl ${color.bg} border ${color.border} p-6 mb-8`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={color.text}>{icon}</div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-slate-400 mb-6">{subtitle}</p>

      {jobs.length === 0 ? (
        <p className="text-slate-500 text-center py-8">No jobs found at this time. Check back soon!</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <JobCard key={job.id} job={job} featured={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}

async function JobStats({ privateCount, federalCount }: { privateCount: number; federalCount: number }) {
  const categories = getDisplayCategories();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
        <div className="text-2xl font-bold text-green-400">{privateCount + federalCount}+</div>
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
  // Fetch both job sources in parallel
  const [privateJobs, federalJobs] = await Promise.all([
    searchGovConJobs({ limit: 15 }),
    searchUSAJobs({ limit: 15 }),
  ]);

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
            Find high-paying business development, capture, and proposal roles at government contractors AND federal agencies. Salaries from $80K to $500K+.
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
            <JobStats privateCount={privateJobs.total} federalCount={federalJobs.total} />
          </Suspense>

          {/* Job Alerts Signup */}
          <div className="mb-8">
            <JobAlertSignup />
          </div>

          {/* Private Sector BD Jobs (JSearch) */}
          <JobSection
            title="Private Sector BD Jobs"
            subtitle="Capture Manager, Proposal Manager, BD roles at government contractors like Booz Allen, Leidos, SAIC, Peraton"
            jobs={privateJobs.jobs}
            accentColor="green"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />

          {/* Federal Government Jobs (USAJobs) */}
          <JobSection
            title="Federal Government Jobs"
            subtitle="Contract Specialist, Program Analyst, Acquisition roles at federal agencies (GS positions)"
            jobs={federalJobs.jobs}
            accentColor="blue"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />
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
