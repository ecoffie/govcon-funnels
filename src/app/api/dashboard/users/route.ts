import { NextRequest, NextResponse } from 'next/server';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';
import { queryUsers } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    if (!isAuthorized(extractPassword(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const users = await queryUsers();
    return NextResponse.json(users);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('KV_REST_API_URL')) {
      return NextResponse.json(
        { error: 'Users database not configured' },
        { status: 503 }
      );
    }
    console.error('GET /api/dashboard/users:', err);
    return NextResponse.json(
      { error: 'Failed to list users' },
      { status: 500 }
    );
  }
}
