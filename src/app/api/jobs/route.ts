import { NextRequest, NextResponse } from 'next/server';
import { searchGovConJobs } from '@/lib/jsearch';
import type { JobCategory } from '@/types/job';

// Force dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Debug: log env var status
  console.log('API /jobs - JSEARCH_API_KEY exists:', !!process.env.JSEARCH_API_KEY);
  const { searchParams } = new URL(request.url);

  const keyword = searchParams.get('keyword') || undefined;
  const category = (searchParams.get('category') as JobCategory) || undefined;
  const remote = searchParams.get('remote') === 'true' ? true : undefined;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 25;

  try {
    const { jobs, total } = await searchGovConJobs({
      keyword,
      category,
      remote,
      page,
      limit,
    });

    return NextResponse.json({
      jobs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Jobs API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
