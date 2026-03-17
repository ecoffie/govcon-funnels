import { NextRequest, NextResponse } from 'next/server';
import { searchUSAJobs } from '@/lib/usajobs';
import type { JobCategory, JobSearchParams } from '@/types/job';

// Force dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Debug: log env var status
  console.log('API /jobs - USAJOBS_API_KEY exists:', !!process.env.USAJOBS_API_KEY);
  const { searchParams } = new URL(request.url);

  const params: JobSearchParams = {
    keyword: searchParams.get('keyword') || undefined,
    location: searchParams.get('location') || undefined,
    category: (searchParams.get('category') as JobCategory) || undefined,
    salaryMin: searchParams.get('salaryMin') ? parseInt(searchParams.get('salaryMin')!) : undefined,
    salaryMax: searchParams.get('salaryMax') ? parseInt(searchParams.get('salaryMax')!) : undefined,
    clearance: searchParams.get('clearance') || undefined,
    remote: searchParams.get('remote') === 'true' ? true : undefined,
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 25,
  };

  try {
    const { jobs, total } = await searchUSAJobs(params);

    return NextResponse.json({
      jobs,
      total,
      page: params.page || 1,
      totalPages: Math.ceil(total / (params.limit || 25)),
    });
  } catch (error) {
    console.error('Jobs API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
