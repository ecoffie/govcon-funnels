import Link from 'next/link';
import type { Job } from '@/types/job';
import { formatSalary, getCategoryInfo, getCertificationMatch } from '@/lib/job-categories';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

export function getJobDestination(job: Job): string {
  return job.source === 'jsearch' ? job.apply_url : `/jobs/view/${job.id}`;
}

export default function JobCard({ job, featured = false }: JobCardProps) {
  const categoryInfo = getCategoryInfo(job.category);
  const certMatch = getCertificationMatch(job.category);
  const destination = getJobDestination(job);
  const isExternalDestination = job.source === 'jsearch';
  const cardClass = `block bg-slate-900 border rounded-xl p-6 hover:border-green-500/50 transition-all hover:translate-y-[-2px] ${
    featured ? 'border-green-500/30 ring-1 ring-green-500/20' : 'border-slate-800'
  }`;

  // Calculate days until close
  const closeDate = new Date(job.close_date);
  const today = new Date();
  const daysUntilClose = Math.ceil((closeDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate days since posted
  const postedDate = new Date(job.posted_date);
  const daysSincePosted = Math.floor((today.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));

  const cardContent = (
    <>
      {featured && (
        <div className="flex items-center gap-2 text-yellow-500 text-sm font-semibold mb-3">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          FEATURED
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white truncate">{job.title}</h3>
          <p className="text-slate-400 mt-1">{job.company}</p>
        </div>
        {job.category !== 'other' && (
          <span className="shrink-0 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full">
            {categoryInfo.shortName}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm text-slate-400">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-white font-medium">{formatSalary(job.salary_min, job.salary_max)}</span>
        </span>

        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>

        {job.clearance && (
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {job.clearance}
          </span>
        )}

        {job.remote && (
          <span className="flex items-center gap-1.5 text-green-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Remote
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800 text-sm">
        <span className="text-slate-500">
          Posted {daysSincePosted === 0 ? 'today' : `${daysSincePosted} day${daysSincePosted === 1 ? '' : 's'} ago`}
        </span>
        {daysUntilClose > 0 ? (
          <span className={`${daysUntilClose <= 7 ? 'text-yellow-500' : 'text-slate-500'}`}>
            Closes in {daysUntilClose} day{daysUntilClose === 1 ? '' : 's'}
          </span>
        ) : (
          <span className="text-red-500">Closed</span>
        )}
      </div>

      {certMatch && job.category !== 'other' && (
        <div className="mt-4 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
            </svg>
            <span className="font-medium">Get Certified</span>
            <span className="text-slate-400">- Skills match: {certMatch}</span>
          </div>
        </div>
      )}
    </>
  );

  if (isExternalDestination) {
    return (
      <a
        href={destination}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={destination} className={cardClass}>
      {cardContent}
    </Link>
  );
}
