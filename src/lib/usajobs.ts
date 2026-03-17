import type { Job, USAJobsSearchResult, USAJobsItem, JobSearchParams } from '@/types/job';
import { categorizeJob } from './job-categories';

const USAJOBS_API_BASE = 'https://data.usajobs.gov/api/search';

// BD-related keywords to search for relevant jobs
const BD_SEARCH_KEYWORDS = [
  'business development',
  'capture manager',
  'proposal manager',
  'proposal coordinator',
  'pricing analyst',
  'contract specialist',
  'contracts administrator',
  'capture',
  'proposal',
  'BD',
];

interface USAJobsClientOptions {
  apiKey?: string;
  email?: string;
}

function getCredentials(): USAJobsClientOptions {
  return {
    apiKey: process.env.USAJOBS_API_KEY,
    email: process.env.USAJOBS_EMAIL || 'hello@govconedu.com',
  };
}

// Transform USAJobs API response to our Job type
function transformJob(item: USAJobsItem): Job {
  const desc = item.MatchedObjectDescriptor;
  const details = desc.UserArea?.Details;

  // Parse salary
  const remuneration = desc.PositionRemuneration?.[0];
  let salaryMin: number | null = null;
  let salaryMax: number | null = null;

  if (remuneration) {
    salaryMin = parseFloat(remuneration.MinimumRange) || null;
    salaryMax = parseFloat(remuneration.MaximumRange) || null;

    // Convert hourly to annual if needed
    if (remuneration.RateIntervalCode === 'PH' && salaryMin) {
      salaryMin = salaryMin * 2080; // 40 hours * 52 weeks
      salaryMax = salaryMax ? salaryMax * 2080 : null;
    }
  }

  // Parse location
  const location = desc.PositionLocation?.[0];
  const locationStr = location?.LocationName || 'Location not specified';
  const locationCity = location?.CityName || '';
  const locationState = location?.CountrySubDivisionCode || '';

  // Parse grade
  const grades = desc.JobGrade?.map(g => g.Code).join('/') || null;

  // Categorize the job
  const category = categorizeJob(desc.PositionTitle);

  return {
    id: item.MatchedObjectId,
    title: desc.PositionTitle,
    company: desc.OrganizationName,
    department: desc.DepartmentName,
    location: locationStr,
    locationCity,
    locationState,
    salary_min: salaryMin,
    salary_max: salaryMax,
    grade: grades,
    clearance: details?.SecurityClearance || null,
    remote: details?.TeleworkEligible || false,
    posted_date: desc.PublicationStartDate,
    close_date: desc.ApplicationCloseDate,
    apply_url: desc.ApplyURI?.[0] || desc.PositionURI,
    description: details?.JobSummary || '',
    qualifications: desc.QualificationSummary || '',
    category,
    source: 'usajobs',
  };
}

// Search USAJobs API
export async function searchUSAJobs(params: JobSearchParams = {}): Promise<{
  jobs: Job[];
  total: number;
}> {
  const { apiKey, email } = getCredentials();

  // Log for debugging
  console.log('USAJobs API - apiKey exists:', !!apiKey, 'email:', email);

  if (!apiKey) {
    console.warn('USAJOBS_API_KEY not set, returning mock data');
    return { jobs: getMockJobs(), total: getMockJobs().length };
  }

  const searchParams = new URLSearchParams();

  // Build search query
  if (params.keyword) {
    searchParams.set('Keyword', params.keyword);
  } else {
    // Default to BD-related keywords
    searchParams.set('Keyword', BD_SEARCH_KEYWORDS.join(' OR '));
  }

  if (params.location) {
    searchParams.set('LocationName', params.location);
  }

  // Salary filters
  if (params.salaryMin) {
    searchParams.set('RemunerationMinimumAmount', params.salaryMin.toString());
  }

  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 25;
  searchParams.set('Page', page.toString());
  searchParams.set('ResultsPerPage', limit.toString());

  // Sort by date
  searchParams.set('SortField', 'PublicationStartDate');
  searchParams.set('SortDirection', 'Desc');

  const url = `${USAJOBS_API_BASE}?${searchParams.toString()}`;

  try {
    console.log('Fetching USAJobs:', url);

    const response = await fetch(url, {
      headers: {
        'Authorization-Key': apiKey,
        'User-Agent': email || 'hello@govconedu.com',
        'Host': 'data.usajobs.gov',
      },
      cache: 'no-store', // Don't cache - fetch fresh each time
    });

    console.log('USAJobs response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('USAJobs API error response:', errorText);
      throw new Error(`USAJobs API error: ${response.status}`);
    }

    const data: USAJobsSearchResult = await response.json();
    console.log('USAJobs result count:', data.SearchResult?.SearchResultCount);

    const jobs = data.SearchResult.SearchResultItems.map(transformJob);

    // Apply category filter if specified
    const filteredJobs = params.category
      ? jobs.filter(j => j.category === params.category)
      : jobs;

    return {
      jobs: filteredJobs,
      total: data.SearchResult.SearchResultCountAll,
    };
  } catch (error) {
    console.error('USAJobs API error:', error);
    // Return mock data on error so the page still works
    const mockJobs = getMockJobs();
    return { jobs: mockJobs, total: mockJobs.length };
  }
}

// Get a single job by ID
export async function getJob(id: string): Promise<Job | null> {
  const { apiKey, email } = getCredentials();

  if (!apiKey) {
    const mockJobs = getMockJobs();
    return mockJobs.find(j => j.id === id) || null;
  }

  // USAJobs doesn't have a direct get-by-ID endpoint
  // We search by PositionID
  const url = `${USAJOBS_API_BASE}?PositionID=${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization-Key': apiKey,
        'User-Agent': email || 'hello@govconedu.com',
        'Host': 'data.usajobs.gov',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`USAJobs API error: ${response.status}`);
    }

    const data: USAJobsSearchResult = await response.json();
    if (data.SearchResult.SearchResultCount === 0) {
      return null;
    }

    return transformJob(data.SearchResult.SearchResultItems[0]);
  } catch (error) {
    console.error('USAJobs API error:', error);
    return null;
  }
}

// Mock data for development without API key
function getMockJobs(): Job[] {
  return [
    {
      id: 'mock-1',
      title: 'Capture Manager',
      company: 'Department of Defense',
      department: 'Defense Logistics Agency',
      location: 'Fort Belvoir, Virginia',
      locationCity: 'Fort Belvoir',
      locationState: 'VA',
      salary_min: 150000,
      salary_max: 195000,
      grade: 'GS-14',
      clearance: 'Secret',
      remote: false,
      posted_date: '2026-03-15',
      close_date: '2026-03-30',
      apply_url: 'https://www.usajobs.gov/job/mock-1',
      description: 'Lead capture management activities for major defense acquisitions. Develop win strategies, conduct competitive assessments, and manage capture teams.',
      qualifications: 'Experience in federal acquisition, capture management, and business development. PMP certification preferred.',
      category: 'capture-manager',
      source: 'usajobs',
    },
    {
      id: 'mock-2',
      title: 'Senior Proposal Manager',
      company: 'General Services Administration',
      department: 'GSA',
      location: 'Washington, DC',
      locationCity: 'Washington',
      locationState: 'DC',
      salary_min: 160000,
      salary_max: 210000,
      grade: 'GS-15',
      clearance: null,
      remote: true,
      posted_date: '2026-03-14',
      close_date: '2026-04-05',
      apply_url: 'https://www.usajobs.gov/job/mock-2',
      description: 'Manage complex proposal efforts for GSA Schedule and GWAC contracts. Lead cross-functional teams to develop compliant, compelling proposals.',
      qualifications: 'APMP certification, 10+ years proposal experience, government contracting expertise required.',
      category: 'proposal-manager',
      source: 'usajobs',
    },
    {
      id: 'mock-3',
      title: 'Business Development Manager',
      company: 'Department of Homeland Security',
      department: 'DHS',
      location: 'Arlington, Virginia',
      locationCity: 'Arlington',
      locationState: 'VA',
      salary_min: 145000,
      salary_max: 185000,
      grade: 'GS-14',
      clearance: 'Top Secret',
      remote: false,
      posted_date: '2026-03-13',
      close_date: '2026-03-28',
      apply_url: 'https://www.usajobs.gov/job/mock-3',
      description: 'Identify and pursue new business opportunities within DHS. Build relationships with contracting officers and program managers.',
      qualifications: 'Experience in federal business development, pipeline management, and customer engagement.',
      category: 'bd-manager',
      source: 'usajobs',
    },
    {
      id: 'mock-4',
      title: 'Proposal Coordinator',
      company: 'Department of Veterans Affairs',
      department: 'VA',
      location: 'Remote',
      locationCity: '',
      locationState: '',
      salary_min: 95000,
      salary_max: 125000,
      grade: 'GS-12',
      clearance: null,
      remote: true,
      posted_date: '2026-03-12',
      close_date: '2026-04-01',
      apply_url: 'https://www.usajobs.gov/job/mock-4',
      description: 'Support proposal development activities including scheduling, compliance tracking, and document management.',
      qualifications: 'Experience with federal proposals, SharePoint, and project coordination.',
      category: 'proposal-coordinator',
      source: 'usajobs',
    },
    {
      id: 'mock-5',
      title: 'Pricing Analyst',
      company: 'Department of the Army',
      department: 'Army Contracting Command',
      location: 'Huntsville, Alabama',
      locationCity: 'Huntsville',
      locationState: 'AL',
      salary_min: 120000,
      salary_max: 155000,
      grade: 'GS-13',
      clearance: 'Secret',
      remote: false,
      posted_date: '2026-03-11',
      close_date: '2026-03-26',
      apply_url: 'https://www.usajobs.gov/job/mock-5',
      description: 'Develop cost proposals, analyze pricing strategies, and ensure competitive yet compliant bid pricing.',
      qualifications: 'CPA or similar certification, experience with FAR cost accounting, Excel expertise.',
      category: 'pricing-analyst',
      source: 'usajobs',
    },
    {
      id: 'mock-6',
      title: 'Contract Specialist',
      company: 'Department of the Navy',
      department: 'NAVSEA',
      location: 'San Diego, California',
      locationCity: 'San Diego',
      locationState: 'CA',
      salary_min: 110000,
      salary_max: 145000,
      grade: 'GS-13',
      clearance: 'Secret',
      remote: false,
      posted_date: '2026-03-10',
      close_date: '2026-03-25',
      apply_url: 'https://www.usajobs.gov/job/mock-6',
      description: 'Administer complex contracts, process modifications, and ensure compliance with federal regulations.',
      qualifications: 'FAC-C Level III or DAWIA certification, 5+ years federal contracting experience.',
      category: 'contracts-administrator',
      source: 'usajobs',
    },
  ];
}

export { getMockJobs };
