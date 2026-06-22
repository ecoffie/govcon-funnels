import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GET as getAdminHubzoneReminder } from '@/app/api/admin/hubzone-reminder/route';
import { GET as getCronHubzoneReminder } from '@/app/api/cron/hubzone-reminders/route';
import { getHubzoneRegistrantsFromSupabase } from '@/lib/supabase-leads';

vi.mock('@/lib/supabase-leads', () => ({
  getHubzoneRegistrantsFromSupabase: vi.fn(async () => [{ email: 'person@example.com', name: 'Person' }]),
}));

vi.mock('@/lib/hubzone-registrations', () => ({
  getHubzoneRegistrations: vi.fn(async () => ({ registrants: [] })),
}));

vi.mock('@/lib/email', () => ({
  sendHubzoneReminderEmail: vi.fn(async () => ({ ok: true })),
  sendHubzoneSpeakerEmail: vi.fn(async () => ({ ok: true })),
  sendHubzoneRegisterEmail: vi.fn(async () => ({ ok: true })),
  sendHubzoneRegisterPlaintext: vi.fn(async () => ({ ok: true })),
  sendHubzoneRecordingEmail: vi.fn(async () => ({ ok: true })),
  sendHubzoneOneHourEmail: vi.fn(async () => ({ ok: true })),
  sendHubzoneLiveEmail: vi.fn(async () => ({ ok: true })),
}));

describe('HUBZone reminder send auth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-secret';
    process.env.HUBZONE_TRACKER_PASSWORD = 'tracker-secret';
    process.env.CRON_SECRET = 'cron-secret';
  });

  it('rejects the shareable tracker password on the admin send route', async () => {
    const req = new NextRequest('https://govcongiants.com/api/admin/hubzone-reminder?password=tracker-secret&send=1');

    const res = await getAdminHubzoneReminder(req);

    expect(res.status).toBe(401);
    expect(getHubzoneRegistrantsFromSupabase).not.toHaveBeenCalled();
  });

  it('allows the admin password on the admin send route', async () => {
    const req = new NextRequest('https://govcongiants.com/api/admin/hubzone-reminder?password=admin-secret&dry=1');

    const res = await getAdminHubzoneReminder(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.mode).toBe('dry');
    expect(body.attendeeCount).toBe(1);
  });

  it('rejects the shareable tracker password on the scheduled send route', async () => {
    const req = new NextRequest('https://govcongiants.com/api/cron/hubzone-reminders?password=tracker-secret&type=recording');

    const res = await getCronHubzoneReminder(req);

    expect(res.status).toBe(401);
  });

  it('allows the cron bearer secret on the scheduled send route', async () => {
    const req = new NextRequest('https://govcongiants.com/api/cron/hubzone-reminders?type=recording&dry=1', {
      headers: { authorization: 'Bearer cron-secret' },
    });

    const res = await getCronHubzoneReminder(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ mode: 'dry', type: 'recording', count: 1 });
  });
});
