import { NextResponse } from 'next/server';
import { sharedDashboardContent } from '@/lib/shared-content';

export async function GET() {
  return NextResponse.json(sharedDashboardContent);
}
