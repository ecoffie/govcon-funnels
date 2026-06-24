import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';
import { getHubzoneRegistrantsFromSupabase } from '@/lib/supabase-leads';
import { sendHubzoneRecordingEmail } from '@/lib/email';

vi.mock('@/lib/supabase-leads', () => ({
  getHubzoneRegistrantsFromSupabase: vi.fn(),
}));

vi.mock('@/lib/hubzone-registrations', () => ({
  getHubzoneRegistrations: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendHubzoneOneHourEmail: vi.fn(),
  sendHubzoneLiveEmail: vi.fn(),
  sendHubzoneRecordingEmail: vi.fn(),
}));

const mockedSupabaseRegistrants = vi.mocked(getHubzoneRegistrantsFromSupabase);
const mockedRecordingEmail = vi.mocked(sendHubzoneRecordingEmail);

const ORIGINAL_ADMIN = process.env.ADMIN_PASSWORD;
const ORIGINAL_PURCHASES_ADMIN = process.env.PURCHASES_ADMIN_PASSWORD;
const ORIGINAL_TRACKER = process.env.HUBZONE_TRACKER_PASSWORD;
const ORIGINAL_CRON = process.env.CRON_SECRET;

function restoreEnv() {
  if (ORIGINAL_ADMIN === undefined) delete process.env.ADMIN_PASSWORD;
  else process.env.ADMIN_PASSWORD = ORIGINAL_ADMIN;

  if (ORIGINAL_PURCHASES_ADMIN === undefined) delete process.env.PURCHASES_ADMIN_PASSWORD;
  else process.env.PURCHASES_ADMIN_PASSWORD = ORIGINAL_PURCHASES_ADMIN;

  if (ORIGINAL_TRACKER === undefined) delete process.env.HUBZONE_TRACKER_PASSWORD;
  else process.env.HUBZONE_TRACKER_PASSWORD = ORIGINAL_TRACKER;

  if (ORIGINAL_CRON === undefined) delete process.env.CRON_SECRET;
  else process.env.CRON_SECRET = ORIGINAL_CRON;
}

function request(password: string) {
  return new NextRequest('http://localhost/api/cron/hubzone-reminders?type=recording&dry=1', {
    headers: { 'x-admin-password': password },
  });
}

describe('/api/cron/hubzone-reminders auth', () => {
  beforeEach(() => {
    restoreEnv();
    delete process.env.ADMIN_PASSWORD;
    delete process.env.CRON_SECRET;
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-secret';
    process.env.HUBZONE_TRACKER_PASSWORD = 'tracker-secret';
    mockedSupabaseRegistrants.mockReset();
    mockedRecordingEmail.mockReset();
    mockedSupabaseRegistrants.mockResolvedValue([{ email: 'lead@example.com', name: 'Lead Example' }]);
    mockedRecordingEmail.mockResolvedValue({ ok: true });
  });

  it('does not authorize the read-only tracker password', async () => {
    const res = await GET(request('tracker-secret'));

    expect(res.status).toBe(401);
    expect(mockedSupabaseRegistrants).not.toHaveBeenCalled();
    expect(mockedRecordingEmail).not.toHaveBeenCalled();
  });

  it('still authorizes the configured admin password for dry runs', async () => {
    const res = await GET(request('admin-secret'));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ mode: 'dry', type: 'recording', count: 1 });
    expect(mockedRecordingEmail).not.toHaveBeenCalled();
  });
});
