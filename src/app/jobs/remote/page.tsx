import Link from 'next/link';
import { generateSeo, breadcrumbJsonLd } from '@/lib/seo';
import { searchJobs, transformJSearchJob } from '@/lib/jsearch';
import JobAlertSignup from '@/components/JobAlertSignup';
import type { Job } from '@/types/job';

export const dynamic = 'force-dynamic';

export const metadata = generateSeo({
  title: 'Remote Government Contractor Jobs | Work From Home BD Careers | $80K-$250K+',
  description: 'Find remote government contractor jobs. Work from home BD, capture, proposal, and contracts roles at federal contractors. $80K-$250K+ salaries.',
  path: '/jobs/remote',
  keywords: [
    'remote government contractor jobs',
    'government contractor jobs remote',
    'work from home govcon jobs',
    'remote federal contractor jobs',
    'remote bd jobs',
    'remote proposal manager jobs',
    'remote capture manager jobs',
    'telecommute government jobs',
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
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-medium rounded">
              Remote
            </span>
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Work From Home
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

export default async function RemoteJobsPage() {
  // Search for remote GovCon jobs
  const remoteQueries = [
    'remote government contractor business development',
    'remote proposal manager federal',
    'remote capture manager',
    'remote contracts specialist federal',
  ];

  // Run searches in parallel
  const results = await Promise.all(
    remoteQueries.slice(0, 2).map(query =>
      searchJobs({ query, num_pages: 1, date_posted: 'month', remote_jobs_only: true }).catch(() => ({ jobs: [], status: 'error' }))
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
    { name: 'Remote', url: '/jobs/remote' },
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
            <span className="text-slate-400">Remote</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Remote GovCon <span className="text-green-500">Jobs</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mb-6">
            Work from home BD, capture, proposal, and contracts roles at government contractors. Find your next remote opportunity in federal contracting.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              100% Remote
            </span>
            <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm">Flexible Schedule</span>
            <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm">Work-Life Balance</span>
            <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm">No Commute</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{jobs.length}+</div>
              <div className="text-sm text-slate-400">Remote Jobs</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">$80K</div>
              <div className="text-sm text-slate-400">Min Salary</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">$250K+</div>
              <div className="text-sm text-slate-400">Max Salary</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">Daily</div>
              <div className="text-sm text-slate-400">Updated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Remote Benefits */}
      <section className="py-8 px-6 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Why Remote GovCon?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Competitive Pay</h3>
              <p className="text-slate-400 text-sm">Remote doesn't mean lower pay. GovCon remote roles offer $80K-$250K+ salaries.</p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Work Anywhere</h3>
              <p className="text-slate-400 text-sm">Support federal missions from anywhere. Many roles are fully remote.</p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Cleared Friendly</h3>
              <p className="text-slate-400 text-sm">Many remote roles accept or sponsor clearances for occasional on-site work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <JobAlertSignup category="remote" categoryName="Remote" />
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400">No remote GovCon jobs found at this time. Check back soon!</p>
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
            Want to Land a <span className="text-green-500">Remote BD Role</span>?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Our BD training programs teach you the exact skills contractors are looking for in remote employees.
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
