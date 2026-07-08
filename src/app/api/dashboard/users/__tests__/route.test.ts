import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { POST } from '../import/route';
import { importUsers, queryUsers } from '@/lib/db';

vi.mock('@/lib/db', () => ({
  queryUsers: vi.fn(),
  importUsers: vi.fn(),
}));

const ORIGINAL_ENV = process.env;

function getReq(headers?: HeadersInit) {
  return new NextRequest('https://govcongiants.com/api/dashboard/users', { headers });
}

function postReq(headers?: HeadersInit) {
  return new NextRequest('https://govcongiants.com/api/dashboard/users/import', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(headers || {}) },
    body: JSON.stringify({ users: [{ name: 'Jane Doe', email: 'jane@example.com' }] }),
  });
}

describe('dashboard users API auth', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.mocked(queryUsers).mockReset();
    vi.mocked(importUsers).mockReset();
  });

  it('does not list users without the admin password', async () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-secret';

    const res = await GET(getReq());

    expect(res.status).toBe(401);
    expect(queryUsers).not.toHaveBeenCalled();
  });

  it('lists users with the admin password', async () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-secret';
    vi.mocked(queryUsers).mockResolvedValue([
      { id: 'u1', username: 'jane.doe', display_name: 'Jane Doe', email: 'jane@example.com', active: true },
    ]);

    const res = await GET(getReq({ 'x-admin-password': 'admin-secret' }));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toHaveLength(1);
  });

  it('does not import users without the admin password', async () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-secret';

    const res = await POST(postReq());

    expect(res.status).toBe(401);
    expect(importUsers).not.toHaveBeenCalled();
  });

  it('imports users with the admin password', async () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-secret';
    vi.mocked(importUsers).mockResolvedValue([
      { id: 'u1', username: 'jane.doe', display_name: 'Jane Doe', email: 'jane@example.com', active: true },
    ]);

    const res = await POST(postReq({ 'x-admin-password': 'admin-secret' }));

    expect(res.status).toBe(201);
    await expect(res.json()).resolves.toMatchObject({ count: 1 });
  });
});
