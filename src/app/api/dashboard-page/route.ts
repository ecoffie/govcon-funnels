import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Serves public/dashboard.html so /dashboard.html always works
 * (rewrite in next.config sends /dashboard.html here).
 */
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'dashboard.html');
    const html = fs.readFileSync(filePath, 'utf-8');
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (err) {
    console.error('dashboard-page route:', err);
    return new NextResponse('Dashboard not found', { status: 404 });
  }
}
