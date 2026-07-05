import { NextRequest } from 'next/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  sendReminder: vi.fn(),
  sendSpeaker: vi.fn(),
  sendRegister: vi.fn(),
  sendRegisterPlaintext: vi.fn(),
  sendRecording: vi.fn(),
}));

vi.mock('@/lib/hubzone-registrations', () => ({
  getHubzoneRegistrations: vi.fn(),
}));

vi.mock('@/lib/supabase-leads', () => ({
  getHubzoneRegistrantsFromSupabase: vi.fn(async () => []),
}));

vi.mock('@/lib/email', () => ({
  sendHubzoneReminderEmail: mocks.sendReminder,
  sendHubzoneSpeakerEmail: mocks.sendSpeaker,
  sendHubzoneRegisterEmail: mocks.sendRegister,
  sendHubzoneRegisterPlaintext: mocks.sendRegisterPlaintext,
  sendHubzoneRecordingEmail: mocks.sendRecording,
}));

import { GET } from '../route';

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  vi.clearAllMocks();
  process.env = { ...ORIGINAL_ENV };
});

describe('hubzone admin reminder auth', () => {
  it('rejects the shareable tracker password on send-capable admin routes', async () => {
    process.env = {
      ...ORIGINAL_ENV,
      HUBZONE_TRACKER_PASSWORD: 'tracker-secret',
    };
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;

    const res = await GET(new NextRequest('https://govcongiants.com/api/admin/hubzone-reminder?password=tracker-secret&send=1'));

    expect(res.status).toBe(401);
    expect(mocks.sendReminder).not.toHaveBeenCalled();
    expect(mocks.sendSpeaker).not.toHaveBeenCalled();
  });
});
