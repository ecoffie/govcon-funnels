import { beforeEach, describe, expect, it, vi } from 'vitest';

const mailer = vi.hoisted(() => {
  const transport = {
    sendMail: vi.fn(),
    verify: vi.fn(),
  };

  return {
    transport,
    createTransport: vi.fn(() => transport),
  };
});

vi.mock('nodemailer', () => ({
  default: {
    createTransport: mailer.createTransport,
  },
}));

import { sendHubzoneReminderEmail } from '../email';

describe('HUBZone reminder email', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.HUBZONE_ZOOM_URL;
    delete process.env.HUBZONE_ZOOM_MEETING_ID;
    delete process.env.HUBZONE_ZOOM_PASSCODE;
    process.env.SMTP_USER = 'sender@example.com';
    process.env.SMTP_PASSWORD = 'smtp-secret';
    mailer.transport.sendMail.mockResolvedValue({
      messageId: 'message-id',
      response: '250 OK',
      accepted: ['lead@example.com'],
      rejected: [],
    });
  });

  it('fails closed when webinar access details are not configured', async () => {
    const result = await sendHubzoneReminderEmail({ to: 'lead@example.com', name: 'Lead Person' });

    expect(result).toEqual({ ok: false, error: 'HUBZone Zoom details not configured' });
    expect(mailer.transport.sendMail).not.toHaveBeenCalled();
  });

  it('uses webinar access details from environment variables', async () => {
    process.env.HUBZONE_ZOOM_URL = 'https://zoom.example.com/join';
    process.env.HUBZONE_ZOOM_MEETING_ID = '123 4567 8901';
    process.env.HUBZONE_ZOOM_PASSCODE = 'passcode-from-env';

    const result = await sendHubzoneReminderEmail({ to: 'lead@example.com', name: 'Lead Person' });
    const message = mailer.transport.sendMail.mock.calls[0][0];

    expect(result.ok).toBe(true);
    expect(mailer.transport.verify).not.toHaveBeenCalled();
    expect(message.html).toContain('https://zoom.example.com/join');
    expect(message.html).toContain('123 4567 8901');
    expect(message.html).toContain('passcode-from-env');
  });
});
