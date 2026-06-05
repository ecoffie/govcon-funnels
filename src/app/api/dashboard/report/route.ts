import { NextRequest, NextResponse } from 'next/server';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';
import {
  getReportWeeksWithData,
  getWeekMetrics,
  getWeekSections,
  getAllWeeksMetrics,
} from '@/lib/report-db';

export async function GET(request: NextRequest) {
  if (!isAuthorized(extractPassword(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const weekParam = searchParams.get('week');
    const includeHistory = searchParams.get('history') === '1';

    const weeks = await getReportWeeksWithData();
    let currentWeek = weekParam ?? weeks[0] ?? null;
    if (currentWeek && !weeks.includes(currentWeek)) {
      currentWeek = weeks[0] ?? null;
    }

    const current = currentWeek ? await getWeekMetrics(currentWeek) : null;
    const sections = currentWeek ? await getWeekSections(currentWeek) : {};

    const currentIdx = currentWeek ? weeks.indexOf(currentWeek) : -1;
    const previousWeek = currentIdx >= 0 && currentIdx < weeks.length - 1 ? weeks[currentIdx + 1] : null;
    const previous = previousWeek ? await getWeekMetrics(previousWeek) : null;

    const body: Record<string, unknown> = { weeks, current, previous, sections };
    if (includeHistory) {
      body.history = await getAllWeeksMetrics();
    }

    return NextResponse.json(body);
  } catch (err) {
    console.error('GET /api/dashboard/report:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to load report' },
      { status: 500 }
    );
  }
}
