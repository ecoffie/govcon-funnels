import { NextRequest, NextResponse } from 'next/server';
import { extractPassword, isAuthorized } from '@/lib/admin-auth';
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
    if (!isAuthorized(extractPassword(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json().catch(() => ({}));
    const providedUsers = Array.isArray(body.users)
      ? body.users.filter(
          (u: unknown): u is { name: string; email?: string } =>
            !!u &&
            typeof u === 'object' &&
            typeof (u as { name?: unknown }).name === 'string'
        )
      : [];
    const provided = Array.isArray(body.names)
      ? body.names.filter((n: unknown) => typeof n === 'string')
      : [];
    const names = providedUsers.length
      ? providedUsers.map((u: { name: string; email?: string }) => u.name)
      : provided.length
        ? provided
        : DEFAULT_USERS;
    const emailByName: Record<string, string> = {};
    providedUsers.forEach((user: { name: string; email?: string }) => {
      if (typeof user.email === 'string' && user.email.trim()) {
        emailByName[user.name.trim()] = user.email.trim();
      }
    });
    const users = await importUsers(names, emailByName);
    return NextResponse.json(
      { count: users.length, users },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Database error';
    if (message.includes('KV_REST_API_URL')) {
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
