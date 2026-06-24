import { NextRequest, NextResponse } from 'next/server';
import { upsertSection, REPORT_SECTIONS } from '@/lib/report-db';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

export async function PATCH(request: NextRequest) {
  try {
    if (!isAuthorized(extractPassword(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { week_start, section, content } = body;

    if (!week_start || typeof week_start !== 'string') {
      return NextResponse.json({ error: 'week_start required' }, { status: 400 });
    }
    if (!section || typeof section !== 'string') {
      return NextResponse.json({ error: 'section required' }, { status: 400 });
    }
    if (!REPORT_SECTIONS.includes(section)) {
      return NextResponse.json({ error: `Invalid section. Must be one of: ${REPORT_SECTIONS.join(', ')}` }, { status: 400 });
    }

    await upsertSection(week_start, section, typeof content === 'string' ? content : String(content ?? ''));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('PATCH /api/dashboard/report/sections:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Update failed' },
      { status: 500 }
    );
  }
}
