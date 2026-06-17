import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { NextRequest } from 'next/server';

const routeMocks = vi.hoisted(() => ({
  getHubzoneRegistrations: vi.fn(),
  sendHubzoneReminderEmail: vi.fn(),
  sendHubzoneSpeakerEmail: vi.fn(),
}));

vi.mock('@/lib/hubzone-registrations', () => ({
  getHubzoneRegistrations: routeMocks.getHubzoneRegistrations,
}));

vi.mock('@/lib/email', () => ({
  sendHubzoneReminderEmail: routeMocks.sendHubzoneReminderEmail,
  sendHubzoneSpeakerEmail: routeMocks.sendHubzoneSpeakerEmail,
}));

import { GET } from '../route';

function makeRequest(path: string): NextRequest {
  const url = new URL(path, 'https://govcongiants.com');
  return {
    url: url.toString(),
    headers: new Headers(),
    nextUrl: { searchParams: url.searchParams },
  } as unknown as NextRequest;
}

describe('/api/admin/hubzone-reminder', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-secret';
    process.env.HUBZONE_TRACKER_PASSWORD = 'tracker-secret';
    routeMocks.getHubzoneRegistrations.mockResolvedValue({ registrants: [] });
    routeMocks.sendHubzoneReminderEmail.mockResolvedValue({ ok: true });
    routeMocks.sendHubzoneSpeakerEmail.mockResolvedValue({ ok: true });
  });

  it('rejects the shareable tracker password for send-capable reminder actions', async () => {
    const response = await GET(makeRequest('/api/admin/hubzone-reminder?password=tracker-secret&test=lead@example.com'));

    expect(response.status).toBe(401);
    expect(routeMocks.sendHubzoneReminderEmail).not.toHaveBeenCalled();
    expect(routeMocks.sendHubzoneSpeakerEmail).not.toHaveBeenCalled();
  });

  it('allows the admin password to load the dry-run summary', async () => {
    routeMocks.getHubzoneRegistrations.mockResolvedValue({
      registrants: [{ email: 'lead@example.com', name: 'Lead Person', internal: false }],
    });

    const response = await GET(makeRequest('/api/admin/hubzone-reminder?password=admin-secret'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.mode).toBe('dry');
    expect(body.attendeeCount).toBe(1);
  });
});
