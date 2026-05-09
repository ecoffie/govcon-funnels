import { NextRequest, NextResponse } from 'next/server';
import { getContractorFundingHistory } from '@/lib/usaspending';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const uei = searchParams.get('uei');
  const name = searchParams.get('name');
  const years = parseInt(searchParams.get('years') || '5', 10);

  if (!uei) {
    return NextResponse.json(
      { error: 'UEI parameter is required' },
      { status: 400 }
    );
  }

  if (!name) {
    return NextResponse.json(
      { error: 'Company name parameter is required' },
      { status: 400 }
    );
  }

  // Validate UEI format (12 alphanumeric characters)
  if (!/^[A-Z0-9]{12}$/.test(uei)) {
    return NextResponse.json(
      { error: 'Invalid UEI format. Must be 12 alphanumeric characters.' },
      { status: 400 }
    );
  }

  // Limit years to 1-10
  const validYears = Math.max(1, Math.min(years, 10));

  try {
    const data = await getContractorFundingHistory(uei, name, validYears);

    if (!data) {
      return NextResponse.json(
        { error: 'No funding data found for this contractor' },
        { status: 404 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800', // Cache 1 day, stale for 1 week
      },
    });
  } catch (error) {
    console.error('Contractor funding API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contractor funding data' },
      { status: 500 }
    );
  }
}
