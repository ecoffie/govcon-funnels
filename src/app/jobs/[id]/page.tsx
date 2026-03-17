import Link from 'next/link';
import { notFound } from 'next/navigation';
import { generateSeo, SITE_URL } from '@/lib/seo';
import { getJob, searchUSAJobs } from '@/lib/usajobs';
import { getCategoryInfo, formatSalary, CERTIFICATION_WEEKS } from '@/lib/job-categories';
import type { Metadata } from 'next';

interface JobPageProps {
  params: Promise<{ id: string }>;
}

// Generate JobPosting JSON-LD
function jobPostingJsonLd(job: NonNullable<Awaited<ReturnType<typeof getJob>>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.posted_date,
    validThrough: job.close_date,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.locationCity || job.location,
        addressRegion: job.locationState || '',
        addressCountry: 'US',
      },
    },
    ...(job.salary_min && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.salary_min,
          maxValue: job.salary_max || job.salary_min,
          unitText: 'YEAR',
        },
      },
    }),
    directApply: false,
    jobBenefits: 'Federal benefits package',
    applicantLocationRequirements: job.remote
      ? { '@type': 'Country', name: 'USA' }
      : undefined,
  };
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return generateSeo({
      title: 'Job Not Found',
      description: 'This job listing is no longer available.',
      path: `/jobs/${id}`,
    });
  }

  const categoryInfo = getCategoryInfo(job.category);
  const salaryStr = formatSalary(job.salary_min, job.salary_max);

  return generateSeo({
    title: `${job.title} at ${job.company} | ${salaryStr}`,
    description: `${job.title} position at ${job.company}. ${salaryStr} per year. ${job.location}. ${job.description.slice(0, 150)}...`,
    path: `/jobs/${id}`,
    keywords: [
      job.title.toLowerCase(),
      `${categoryInfo.name} jobs`,
      'government contracting jobs',
      job.company.toLowerCase(),
    ],
  });
}

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    notFound();
  }

  const categoryInfo = getCategoryInfo(job.category);
  const salaryStr = formatSalary(job.salary_min, job.salary_max);

  // Get similar jobs
  const { jobs: similarJobs } = await searchUSAJobs({
    category: job.category,
    limit: 4,
  });
  const otherJobs = similarJobs.filter((j) => j.id !== job.id).slice(0, 3);

  // Calculate dates
  const closeDate = new Date(job.close_date);
  const today = new Date();
  const daysUntilClose = Math.ceil((closeDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const postedDate = new Date(job.posted_date);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(job)) }}
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-slate-400 hover:text-green-400">Home</Link>
            <span className="text-slate-600">/</span>
            <Link href="/jobs" className="text-slate-400 hover:text-green-400">Jobs</Link>
            {job.category !== 'other' && (
              <>
                <span className="text-slate-600">/</span>
                <Link href={`/jobs?category=${job.category}`} className="text-slate-400 hover:text-green-400">
                  {categoryInfo.name}
                </Link>
              </>
            )}
            <span className="text-slate-600">/</span>
            <span className="text-green-400">{job.title}</span>
          </div>

          {/* Title */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{job.title}</h1>
              <p className="text-xl text-slate-400">{job.company}</p>
            </div>
            {job.category !== 'other' && (
              <span className="shrink-0 px-4 py-2 bg-green-500/10 text-green-400 text-sm font-medium rounded-full">
                {categoryInfo.name}
              </span>
            )}
          </div>

          {/* Quick info */}
          <div className="flex flex-wrap items-center gap-4 text-slate-400 mb-6">
            <span className="flex items-center gap-2 text-white font-semibold">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {salaryStr}/year
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {job.location}
            </span>
            {job.clearance && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {job.clearance}
              </span>
            )}
            {job.grade && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {job.grade}
              </span>
            )}
            {job.remote && (
              <span className="flex items-center gap-2 text-green-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Remote Eligible
              </span>
            )}
          </div>

          {/* Dates */}
          <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
            <span>Posted {postedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className={daysUntilClose <= 7 ? 'text-yellow-500' : ''}>
              {daysUntilClose > 0 ? `Closes in ${daysUntilClose} days` : 'Application closed'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <a
              href={job.apply_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              Apply on USAJobs
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save Job
            </button>
            <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left column - Job details */}
            <div className="md:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                <div className="prose prose-invert prose-slate max-w-none">
                  <p className="text-slate-300 whitespace-pre-wrap">{job.description}</p>
                </div>
              </div>

              {/* Qualifications */}
              {job.qualifications && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Qualifications</h2>
                  <div className="prose prose-invert prose-slate max-w-none">
                    <p className="text-slate-300 whitespace-pre-wrap">{job.qualifications}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right column - Certification CTA */}
            <div className="space-y-6">
              {/* Certification CTA */}
              {job.category !== 'other' && categoryInfo.certificationWeeks.length > 0 && (
                <div className="bg-gradient-to-b from-green-500/10 to-slate-900 border border-green-500/30 rounded-xl p-6">
                  <div className="flex items-center gap-2 text-green-400 mb-4">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
                    </svg>
                    <h3 className="text-lg font-bold">Want This Job?</h3>
                  </div>

                  <p className="text-slate-300 mb-4">
                    This role requires skills taught in our 30-Day BD Certification:
                  </p>

                  <ul className="space-y-2 mb-6">
                    {categoryInfo.certificationWeeks.map((week) => (
                      <li key={week} className="flex items-start gap-2 text-slate-300">
                        <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>
                          <strong className="text-white">Week {week}:</strong>{' '}
                          {CERTIFICATION_WEEKS[week as keyof typeof CERTIFICATION_WEEKS].title}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Link
                      href="/upskilling"
                      className="block w-full px-6 py-3 bg-green-600 hover:bg-green-500 text-white text-center font-bold rounded-lg transition-colors"
                    >
                      Get Certified - $997
                    </Link>
                    <Link
                      href="/free-course"
                      className="block w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-center font-semibold rounded-lg transition-colors"
                    >
                      Start Free Course
                    </Link>
                  </div>
                </div>
              )}

              {/* Quick stats */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Job Details</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Department</dt>
                    <dd className="text-white text-right">{job.department}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Organization</dt>
                    <dd className="text-white text-right">{job.company}</dd>
                  </div>
                  {job.grade && (
                    <div className="flex justify-between">
                      <dt className="text-slate-400">Grade Level</dt>
                      <dd className="text-white">{job.grade}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-slate-400">Telework</dt>
                    <dd className="text-white">{job.remote ? 'Yes' : 'No'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Jobs */}
      {otherJobs.length > 0 && (
        <section className="py-12 px-6 bg-slate-900/50 border-t border-slate-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Similar Jobs</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {otherJobs.map((otherJob) => (
                <Link
                  key={otherJob.id}
                  href={`/jobs/${otherJob.id}`}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-green-500/50 transition-colors"
                >
                  <h3 className="font-semibold text-white mb-1 line-clamp-1">{otherJob.title}</h3>
                  <p className="text-sm text-slate-400 mb-2">{otherJob.company}</p>
                  <p className="text-sm text-green-400">{formatSalary(otherJob.salary_min, otherJob.salary_max)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
