import { NextRequest, NextResponse } from 'next/server';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';
import { importReportFromBuffer } from '@/lib/import-report';

export async function POST(request: NextRequest) {
  if (!isAuthorized(extractPassword(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const result = await importReportFromBuffer(buf);
    return NextResponse.json(result);
  } catch (err) {
    console.error('POST /api/dashboard/report/upload:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
