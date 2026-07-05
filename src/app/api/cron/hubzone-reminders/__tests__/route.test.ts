import { NextRequest } from 'next/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  sendOneHour: vi.fn(),
  sendLive: vi.fn(),
  sendRecording: vi.fn(),
}));

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(() => ({ set: vi.fn() })),
}));

vi.mock('@/lib/hubzone-registrations', () => ({
  getHubzoneRegistrations: vi.fn(),
}));

vi.mock('@/lib/supabase-leads', () => ({
  getHubzoneRegistrantsFromSupabase: vi.fn(async () => []),
}));

vi.mock('@/lib/email', () => ({
  sendHubzoneOneHourEmail: mocks.sendOneHour,
  sendHubzoneLiveEmail: mocks.sendLive,
  sendHubzoneRecordingEmail: mocks.sendRecording,
}));

import { GET } from '../route';

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  vi.clearAllMocks();
  process.env = { ...ORIGINAL_ENV };
});

describe('hubzone reminder cron auth', () => {
  it('rejects the shareable tracker password on send-capable cron routes', async () => {
    process.env = {
      ...ORIGINAL_ENV,
      HUBZONE_TRACKER_PASSWORD: 'tracker-secret',
    };
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
    delete process.env.CRON_SECRET;

    const res = await GET(new NextRequest('https://govcongiants.com/api/cron/hubzone-reminders?password=tracker-secret&type=one-hour'));

    expect(res.status).toBe(401);
    expect(mocks.sendOneHour).not.toHaveBeenCalled();
    expect(mocks.sendLive).not.toHaveBeenCalled();
    expect(mocks.sendRecording).not.toHaveBeenCalled();
  });
});
