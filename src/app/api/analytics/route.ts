import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsSummary, isGa4Configured } from '@/lib/ga4';

// GA4 quotas are generous; cache for 10 min to avoid hammering on refresh.
export const revalidate = 600;

export async function GET(request: NextRequest) {
  if (!isGa4Configured()) {
    return NextResponse.json(
      {
        error: 'GA4 not configured',
        hint: 'Set GA4_PROPERTY_ID, GA4_SA_CLIENT_EMAIL, GA4_SA_PRIVATE_KEY. See tasks/ga4-dashboard-setup.md',
      },
      { status: 503 }
    );
  }

  const daysParam = request.nextUrl.searchParams.get('days');
  const days = Math.min(Math.max(Number(daysParam) || 28, 1), 365);

  try {
    const summary = await getAnalyticsSummary(days);
    return NextResponse.json({ days, ...summary });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: 'GA4 request failed', message },
      { status: 502 }
    );
  }
}
