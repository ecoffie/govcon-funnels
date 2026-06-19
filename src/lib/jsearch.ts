/**
 * JSearch API client for private sector job listings
 * Aggregates jobs from LinkedIn, Indeed, Glassdoor, ZipRecruiter
 * https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
 */

export interface JSearchJob {
  job_id: string;
  job_title: string;
  job_description: string;
  employer_name: string;
  employer_logo: string | null;
  employer_website: string | null;
  employer_company_type: string | null;
  job_publisher: string;
  job_employment_type: string;
  job_apply_link: string;
  job_apply_is_direct: boolean;
  job_is_remote: boolean;
  job_city: string;
  job_state: string;
  job_country: string;
  job_min_salary: number | null;
  job_max_salary: number | null;
  job_salary_currency: string | null;
  job_salary_period: string | null;
  job_posted_at_datetime_utc: string;
  job_offer_expiration_datetime_utc: string | null;
  job_required_experience: {
    no_experience_required: boolean;
    required_experience_in_months: number | null;
    experience_mentioned: boolean;
  } | null;
  job_required_skills: string[] | null;
  job_highlights: {
    Qualifications?: string[];
    Responsibilities?: string[];
    Benefits?: string[];
  } | null;
}

export interface JSearchResponse {
  status: string;
  request_id: string;
  data: JSearchJob[];
}

export interface JSearchParams {
  query: string;
  page?: number;
  num_pages?: number;
  date_posted?: 'all' | 'today' | '3days' | 'week' | 'month';
  remote_jobs_only?: boolean;
  employment_types?: string; // FULLTIME, CONTRACTOR, PARTTIME, INTERN
  job_requirements?: string; // under_3_years_experience, more_than_3_years_experience, no_experience, no_degree
  radius?: number;
}

const JSEARCH_API_BASE = 'https://jsearch.p.rapidapi.com';
const SAFE_FALLBACK_APPLY_URL = 'about:blank';

function getApiKey(): string {
  const key = process.env.JSEARCH_API_KEY || process.env.RAPIDAPI_KEY;
  if (!key) {
    throw new Error('JSEARCH_API_KEY or RAPIDAPI_KEY environment variable not set');
  }
  return key;
}

/**
 * Search for jobs using JSearch API
 */
export async function searchJobs(params: JSearchParams): Promise<{
  jobs: JSearchJob[];
  status: string;
}> {
  const apiKey = getApiKey();

  const searchParams = new URLSearchParams();
  searchParams.set('query', params.query);
  searchParams.set('page', String(params.page || 1));
  searchParams.set('num_pages', String(params.num_pages || 1));

  if (params.date_posted) {
    searchParams.set('date_posted', params.date_posted);
  }
  if (params.remote_jobs_only) {
    searchParams.set('remote_jobs_only', 'true');
  }
  if (params.employment_types) {
    searchParams.set('employment_types', params.employment_types);
  }
  if (params.job_requirements) {
    searchParams.set('job_requirements', params.job_requirements);
  }
  if (params.radius) {
    searchParams.set('radius', String(params.radius));
  }

  const url = `${JSEARCH_API_BASE}/search?${searchParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('JSearch API error:', response.status, error);
    throw new Error(`JSearch API error: ${response.status}`);
  }

  const data: JSearchResponse = await response.json();

  return {
    jobs: data.data || [],
    status: data.status,
  };
}

/**
 * Get job details by ID
 */
export async function getJobDetails(jobId: string): Promise<JSearchJob | null> {
  const apiKey = getApiKey();

  const url = `${JSEARCH_API_BASE}/job-details?job_id=${encodeURIComponent(jobId)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('JSearch API error:', response.status);
    return null;
  }

  const data: JSearchResponse = await response.json();
  return data.data?.[0] || null;
}

// GovCon BD-specific search queries
export const GOVCON_BD_QUERIES = [
  'capture manager government contractor',
  'proposal manager federal contractor',
  'business development manager government contracts',
  'BD director federal',
  'capture director defense contractor',
  'proposal coordinator government',
  'pricing analyst federal contracts',
  'contracts manager government contractor',
];

/**
 * Search for GovCon BD jobs across multiple queries
 * Returns deduplicated results sorted by date
 */
export async function searchGovConBDJobs(options: {
  limit?: number;
  datePosted?: 'all' | 'today' | '3days' | 'week' | 'month';
} = {}): Promise<JSearchJob[]> {
  const { limit = 25, datePosted = 'month' } = options;

  // Run searches in parallel for speed
  const searches = GOVCON_BD_QUERIES.slice(0, 4).map(query =>
    searchJobs({
      query,
      num_pages: 1,
      date_posted: datePosted,
    }).catch(err => {
      console.error(`JSearch query failed for "${query}":`, err);
      return { jobs: [], status: 'error' };
    })
  );

  const results = await Promise.all(searches);

  // Deduplicate by job_id
  const jobMap = new Map<string, JSearchJob>();
  for (const result of results) {
    for (const job of result.jobs) {
      if (!jobMap.has(job.job_id)) {
        jobMap.set(job.job_id, job);
      }
    }
  }

  // Sort by posted date (newest first)
  let jobs = Array.from(jobMap.values());
  jobs.sort((a, b) =>
    new Date(b.job_posted_at_datetime_utc).getTime() -
    new Date(a.job_posted_at_datetime_utc).getTime()
  );

  // Limit results
  return jobs.slice(0, limit);
}

/**
 * Format salary for display
 */
export function formatSalary(job: JSearchJob): string | null {
  if (!job.job_min_salary && !job.job_max_salary) {
    return null;
  }

  const currency = job.job_salary_currency || 'USD';
  const period = job.job_salary_period || 'YEAR';

  const formatNum = (n: number) => {
    if (n >= 1000) {
      return `$${Math.round(n / 1000)}K`;
    }
    return `$${n}`;
  };

  let salaryStr = '';
  if (job.job_min_salary && job.job_max_salary) {
    salaryStr = `${formatNum(job.job_min_salary)} - ${formatNum(job.job_max_salary)}`;
  } else if (job.job_min_salary) {
    salaryStr = `${formatNum(job.job_min_salary)}+`;
  } else if (job.job_max_salary) {
    salaryStr = `Up to ${formatNum(job.job_max_salary)}`;
  }

  if (period === 'HOUR') {
    salaryStr += '/hr';
  } else if (period === 'MONTH') {
    salaryStr += '/mo';
  }

  return salaryStr;
}

/**
 * Get relative time string
 */
export function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
}

/**
 * Allow only safe external URLs for job application links.
 * Untrusted feed URLs must never be rendered directly into href.
 */
export function sanitizeApplyUrl(url: string | null | undefined): string {
  if (!url) {
    return SAFE_FALLBACK_APPLY_URL;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch {
    // Ignore malformed URLs and use safe fallback below.
  }

  return SAFE_FALLBACK_APPLY_URL;
}

// Import Job type and categorization
import type { Job, JobCategory } from '@/types/job';
import { categorizeJob } from './job-categories';

/**
 * Transform JSearch job to our Job type
 */
export function transformJSearchJob(jsJob: JSearchJob): Job {
  const location = [jsJob.job_city, jsJob.job_state].filter(Boolean).join(', ') || 'Location not specified';

  // Calculate a close date (30 days from posted if not specified)
  const postedDate = new Date(jsJob.job_posted_at_datetime_utc);
  const closeDate = jsJob.job_offer_expiration_datetime_utc
    ? new Date(jsJob.job_offer_expiration_datetime_utc)
    : new Date(postedDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  return {
    id: jsJob.job_id,
    title: jsJob.job_title,
    company: jsJob.employer_name,
    department: jsJob.employer_company_type || '',
    location,
    locationCity: jsJob.job_city || '',
    locationState: jsJob.job_state || '',
    salary_min: jsJob.job_min_salary,
    salary_max: jsJob.job_max_salary,
    grade: null, // JSearch doesn't have GS grades
    clearance: null, // Would need to parse from description
    remote: jsJob.job_is_remote,
    posted_date: jsJob.job_posted_at_datetime_utc,
    close_date: closeDate.toISOString(),
    apply_url: sanitizeApplyUrl(jsJob.job_apply_link),
    description: jsJob.job_description || '',
    qualifications: jsJob.job_highlights?.Qualifications?.join(' ') || '',
    category: categorizeJob(jsJob.job_title),
    source: 'jsearch',
  };
}

/**
 * Search for GovCon BD jobs and return them in our Job format
 */
export async function searchGovConJobs(params: {
  keyword?: string;
  category?: JobCategory;
  remote?: boolean;
  limit?: number;
  page?: number;
}): Promise<{ jobs: Job[]; total: number }> {
  const { keyword, category, remote, limit = 25, page = 1 } = params;

  // Build search query
  let query = keyword || '';

  // If no keyword and no category, use default BD search
  if (!query && !category) {
    query = 'capture manager OR proposal manager OR business development government contractor';
  }

  // If category specified, add category keywords to query
  if (category && category !== 'other') {
    const categoryKeywords: Record<string, string> = {
      'capture-manager': 'capture manager government contractor',
      'proposal-manager': 'proposal manager federal',
      'bd-manager': 'business development manager government contractor',
      'capture-director': 'capture director federal',
      'proposal-coordinator': 'proposal coordinator government',
      'pricing-analyst': 'pricing analyst federal contracts',
      'contracts-administrator': 'contracts manager government contractor',
      'vp-business-development': 'VP business development federal contractor',
      'bd-consultant': 'business development consultant government',
    };
    query = categoryKeywords[category] || query;
  }

  try {
    const result = await searchJobs({
      query,
      page,
      num_pages: 1,
      remote_jobs_only: remote,
      date_posted: 'month',
    });

    // Transform and filter jobs
    let jobs = result.jobs.map(transformJSearchJob);

    // Filter by category if specified
    if (category && category !== 'other') {
      jobs = jobs.filter(j => j.category === category);
    }

    // Limit results
    jobs = jobs.slice(0, limit);

    return {
      jobs,
      total: result.jobs.length, // JSearch doesn't give total count
    };
  } catch (error) {
    console.error('JSearch error:', error);
    return { jobs: [], total: 0 };
  }
}
