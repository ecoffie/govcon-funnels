import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      verify: vi.fn(),
      sendMail: vi.fn(),
    })),
  },
}));

vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: {
      send: vi.fn(),
    },
  })),
}));

describe('HUBZone email secrets', () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.HUBZONE_ZOOM_URL;
    delete process.env.HUBZONE_ZOOM_MEETING_ID;
    delete process.env.HUBZONE_ZOOM_PASSCODE;
    delete process.env.RESEND_API_KEY;
    delete process.env.SMTP_USER;
    delete process.env.SMTP_PASSWORD;
  });

  it('fails closed instead of sending Zoom emails without configured meeting details', async () => {
    const { sendHubzoneOneHourEmail } = await import('@/lib/email');

    const result = await sendHubzoneOneHourEmail({ to: 'person@example.com', name: 'Person' });

    expect(result).toEqual({
      ok: false,
      error: 'HUBZone Zoom details are not configured',
    });
  });
});
