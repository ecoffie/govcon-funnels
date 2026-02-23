import { NextRequest, NextResponse } from 'next/server';
import { importUsers } from '@/lib/db';

const DEFAULT_USERS = [
  'Sikandar',
  'Stephanie Couch',
  'Syed Jawad Hussain',
  'Usama Ashraf',
  'Yasir Khan',
  'Zach Golden',
  'Zeeshan Aamir Khan',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const provided = Array.isArray(body.names)
      ? body.names.filter((n: unknown) => typeof n === 'string')
      : [];
    const names = provided.length ? provided : DEFAULT_USERS;
    const users = await importUsers(names);
    return NextResponse.json(
      { count: users.length, users },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('DATABASE_URL')) {
      return NextResponse.json(
        { error: 'Users database not configured' },
        { status: 503 }
      );
    }
    console.error('POST /api/dashboard/users/import:', err);
    return NextResponse.json(
      { error: 'Failed to import users' },
      { status: 500 }
    );
  }
}
