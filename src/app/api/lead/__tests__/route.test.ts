import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/lead/route';
import { sendLeadToCrm, sendToGoHighLevel } from '@/lib/crm';
import { sendConfirmationEmail } from '@/lib/email';
import { recentDuplicateExists, saveLeadToSupabase } from '@/lib/supabase-leads';

vi.mock('@/lib/crm', () => ({
  sendLeadToCrm: vi.fn(),
  sendToGoHighLevel: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendConfirmationEmail: vi.fn(),
}));

vi.mock('@/lib/supabase-leads', () => ({
  recentDuplicateExists: vi.fn(),
  saveLeadToSupabase: vi.fn(),
}));

const originalEnv = { ...process.env };

function leadRequest(body: Record<string, unknown>) {
  return new Request('https://govcongiants.com/api/lead', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('/api/lead', () => {
  beforeEach(() => {
    process.env = { ...originalEnv };
    vi.mocked(recentDuplicateExists).mockResolvedValue(false);
    vi.mocked(sendLeadToCrm).mockResolvedValue({ slack: { ok: true } });
    vi.mocked(sendToGoHighLevel).mockResolvedValue({ ok: true, contactId: 'contact-1' });
    vi.mocked(saveLeadToSupabase).mockResolvedValue({ ok: true });
    vi.mocked(sendConfirmationEmail).mockResolvedValue({ ok: true });
    vi.mocked(global.fetch).mockResolvedValue(new Response('{}', { status: 200 }));
  });

  it('recovers idempotent handoffs on duplicate Mindy Launch retries', async () => {
    process.env.GHL_API_KEY = 'ghl-key';
    process.env.GHL_LOCATION_ID = 'location-id';
    process.env.MINDY_LAUNCH_SEND_URL = 'https://getmindy.ai/api/mindy-launch/send-confirmation';
    process.env.MINDY_LAUNCH_SEND_SECRET = 'send-secret';
    vi.mocked(recentDuplicateExists).mockResolvedValue(true);

    const response = await POST(
      leadRequest({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        source: 'mindy-launch',
      }) as never
    );

    await expect(response.json()).resolves.toMatchObject({
      success: true,
      duplicate: true,
      crm: { ghl: { ok: true, contactId: 'contact-1' } },
    });
    expect(sendToGoHighLevel).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'ada@example.com', source: 'mindy-launch' })
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'https://getmindy.ai/api/mindy-launch/send-confirmation',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ authorization: 'Bearer send-secret' }),
      })
    );
    expect(saveLeadToSupabase).not.toHaveBeenCalled();
    expect(sendLeadToCrm).not.toHaveBeenCalled();
    expect(sendConfirmationEmail).not.toHaveBeenCalled();
  });
});
