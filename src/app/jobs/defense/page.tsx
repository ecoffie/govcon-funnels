import Link from 'next/link';
import { generateSeo, breadcrumbJsonLd } from '@/lib/seo';
import { searchJobs, transformJSearchJob } from '@/lib/jsearch';
import JobAlertSignup from '@/components/JobAlertSignup';
import type { Job } from '@/types/job';

export const dynamic = 'force-dynamic';

export const metadata = generateSeo({
  title: 'Defense Contractor Jobs | DoD Careers | $80K-$300K+',
  description: 'Find defense contractor jobs at DoD, Army, Navy, Air Force, and Space Force contractors. Capture managers, proposal managers, BD roles. $80K-$300K+ salaries.',
  path: '/jobs/defense',
  keywords: [
    'defense contractor jobs',
    'dod contractor jobs',
    'military contractor jobs',
    'defense industry jobs',
    'army contractor jobs',
    'navy contractor jobs',
    'air force contractor jobs',
    'cleared defense jobs',
  ],
});

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
      </div>
    </a>
  );
}

export default async function DefenseJobsPage() {
  // Search for defense-specific jobs
  const defenseQueries = [
    'defense contractor capture manager',
    'DoD business development',
    'military contractor proposal manager',
    'defense industry BD',
  ];

  // Run searches in parallel
  const results = await Promise.all(
    defenseQueries.slice(0, 2).map(query =>
      searchJobs({ query, num_pages: 1, date_posted: 'month' }).catch(() => ({ jobs: [], status: 'error' }))
    )
  );

  // Deduplicate and transform jobs
  const jobMap = new Map<string, Job>();
  for (const result of results) {
    for (const jsJob of result.jobs) {
      if (!jobMap.has(jsJob.job_id)) {
        jobMap.set(jsJob.job_id, transformJSearchJob(jsJob));
      }
    }
  }

  const jobs = Array.from(jobMap.values())
    .sort((a, b) => new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime())
    .slice(0, 25);

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Jobs', url: '/jobs' },
    { name: 'Defense', url: '/jobs/defense' },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
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
            <Link href="/jobs" className="hover:text-green-300">Jobs</Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">Defense</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Defense Contractor <span className="text-green-500">Jobs</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mb-6">
            Find BD, capture, and proposal roles at defense contractors supporting DoD, Army, Navy, Air Force, and Space Force missions. $80K-$300K+ salaries.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm">DoD</span>
            <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm">Army</span>
            <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm">Navy</span>
            <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm">Air Force</span>
            <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm">Space Force</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{jobs.length}+</div>
              <div className="text-sm text-slate-400">Active Jobs</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">$80K</div>
              <div className="text-sm text-slate-400">Min Salary</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">$300K+</div>
              <div className="text-sm text-slate-400">Max Salary</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">Daily</div>
              <div className="text-sm text-slate-400">Updated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <JobAlertSignup category="defense" categoryName="Defense" />
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400">No defense contractor jobs found at this time. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job, i) => (
                <JobCard key={job.id} job={job} featured={i === 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Explore Other <span className="text-green-500">Job Categories</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/jobs/capture-manager" className="bg-slate-800/50 border border-slate-700 hover:border-green-500/50 rounded-xl p-4 transition-colors">
              <div className="text-white font-semibold mb-1">Capture Manager</div>
              <div className="text-green-400 text-sm">$150K - $220K</div>
            </Link>
            <Link href="/jobs/proposal-manager" className="bg-slate-800/50 border border-slate-700 hover:border-green-500/50 rounded-xl p-4 transition-colors">
              <div className="text-white font-semibold mb-1">Proposal Manager</div>
              <div className="text-green-400 text-sm">$160K - $240K</div>
            </Link>
            <Link href="/jobs/bd-manager" className="bg-slate-800/50 border border-slate-700 hover:border-green-500/50 rounded-xl p-4 transition-colors">
              <div className="text-white font-semibold mb-1">BD Manager</div>
              <div className="text-green-400 text-sm">$150K - $250K</div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Land These <span className="text-green-500">Defense BD Roles</span>?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Our BD training programs teach you the exact skills defense contractors are looking for.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/upskilling" className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors">
              Learn About BD Training
            </Link>
            <Link href="/free-course" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors">
              Start Free Course
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
