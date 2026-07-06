import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getAdminPassword, isAuthorized } from '@/lib/admin-auth';
import { GET as hubzoneDashboardGET } from '@/app/api/hubzone/registrations/route';
import { GET as hubzoneReminderGET } from '@/app/api/admin/hubzone-reminder/route';
import { GET as hubzoneCronGET } from '@/app/api/cron/hubzone-reminders/route';

vi.mock('@/lib/hubzone-registrations', () => ({
  getHubzoneRegistrations: vi.fn(async () => ({
    count: 0,
    internalCount: 0,
    total: 0,
    goal: 100,
    pctToGoal: 0,
    webinarDate: '2026-06-17',
    daysUntil: 0,
    updatedAt: '2026-06-17T00:00:00.000Z',
    registrants: [],
  })),
}));

vi.mock('@/lib/supabase-leads', () => ({
  getHubzoneRegistrantsFromSupabase: vi.fn(async () => []),
}));

vi.mock('@/lib/email', () => ({
  sendHubzoneReminderEmail: vi.fn(),
  sendHubzoneSpeakerEmail: vi.fn(),
  sendHubzoneRegisterEmail: vi.fn(),
  sendHubzoneRegisterPlaintext: vi.fn(),
  sendHubzoneRecordingEmail: vi.fn(),
  sendHubzoneOneHourEmail: vi.fn(),
  sendHubzoneLiveEmail: vi.fn(),
}));

const ENV_KEYS = [
  'PURCHASES_ADMIN_PASSWORD',
  'ADMIN_PASSWORD',
  'HUBZONE_TRACKER_PASSWORD',
  'CRON_SECRET',
  'KV_REST_API_URL',
  'KV_REST_API_TOKEN',
] as const;

const originalEnv = { ...process.env };

function request(url: string, headers?: HeadersInit): NextRequest {
  return new NextRequest(url, { headers });
}

beforeEach(() => {
  for (const key of ENV_KEYS) {
    delete process.env[key];
  }
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});

describe('admin auth boundaries', () => {
  it('fails closed instead of accepting the source-known fallback password', () => {
    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('accepts the configured admin password', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'real-admin-secret';

    expect(getAdminPassword()).toBe('real-admin-secret');
    expect(isAuthorized('real-admin-secret')).toBe(true);
  });

  it('keeps the shareable tracker password limited to the read-only HUBZone dashboard', async () => {
    process.env.HUBZONE_TRACKER_PASSWORD = 'tracker-secret';

    const res = await hubzoneDashboardGET(
      request('https://govcongiants.com/api/hubzone/registrations?password=tracker-secret')
    );

    expect(res.status).toBe(200);
  });

  it('rejects the shareable tracker password on the manual HUBZone send route', async () => {
    process.env.HUBZONE_TRACKER_PASSWORD = 'tracker-secret';

    const res = await hubzoneReminderGET(
      request('https://govcongiants.com/api/admin/hubzone-reminder?dry=1&password=tracker-secret')
    );

    expect(res.status).toBe(401);
  });

  it('rejects the shareable tracker password on the HUBZone cron send route', async () => {
    process.env.HUBZONE_TRACKER_PASSWORD = 'tracker-secret';

    const res = await hubzoneCronGET(
      request('https://govcongiants.com/api/cron/hubzone-reminders?type=one-hour&dry=1&password=tracker-secret')
    );

    expect(res.status).toBe(401);
  });

  it('still allows Vercel cron Bearer auth on the HUBZone cron send route', async () => {
    process.env.CRON_SECRET = 'cron-secret';

    const res = await hubzoneCronGET(
      request('https://govcongiants.com/api/cron/hubzone-reminders?type=one-hour&dry=1', {
        authorization: 'Bearer cron-secret',
      })
    );
    const body = (await res.json()) as { mode?: string };

    expect(res.status).toBe(200);
    expect(body.mode).toBe('dry');
  });
});
