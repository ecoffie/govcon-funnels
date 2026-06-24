import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { importReportFromBuffer } from '@/lib/import-report';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';

const DEFAULT_SEED_PATH = '/Users/kkii/Downloads/Weekly Growth Report (1).xlsx';

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(extractPassword(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const path = process.env.SEED_REPORT_PATH ?? DEFAULT_SEED_PATH;
    if (!existsSync(path)) {
      return NextResponse.json(
        { error: `File not found: ${path}. Set SEED_REPORT_PATH or place the Excel file at the default path.` },
        { status: 404 }
      );
    }
    const buf = await readFile(path);
    const result = await importReportFromBuffer(buf);
    return NextResponse.json(result);
  } catch (err) {
    console.error('POST /api/dashboard/report/seed:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Seed failed' },
      { status: 500 }
    );
  }
}
