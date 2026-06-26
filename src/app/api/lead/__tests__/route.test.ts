import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  sendLeadToCrm: vi.fn(),
  sendToGoHighLevel: vi.fn(),
  sendConfirmationEmail: vi.fn(),
  saveLeadToSupabase: vi.fn(),
  recentDuplicateExists: vi.fn(),
}));

vi.mock('@/lib/crm', () => ({
  sendLeadToCrm: mocks.sendLeadToCrm,
  sendToGoHighLevel: mocks.sendToGoHighLevel,
}));

vi.mock('@/lib/email', () => ({
  sendConfirmationEmail: mocks.sendConfirmationEmail,
}));

vi.mock('@/lib/supabase-leads', () => ({
  saveLeadToSupabase: mocks.saveLeadToSupabase,
  recentDuplicateExists: mocks.recentDuplicateExists,
}));

describe('POST /api/lead', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.MINDY_LAUNCH_SEND_URL = 'https://getmindy.example/api/send';
    process.env.MINDY_LAUNCH_SEND_SECRET = 'send-secret';
    vi.mocked(global.fetch).mockResolvedValue(new Response('{}'));
  });

  it('recovers GHL and Mindy handoff on recent duplicate retries without duplicating local side effects', async () => {
    mocks.recentDuplicateExists.mockResolvedValue(true);
    mocks.sendToGoHighLevel.mockResolvedValue({ ok: true, contactId: 'contact-1' });
    const { POST } = await import('../route');

    const response = await POST(
      new Request('https://govcongiants.com/api/lead', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Ada Lovelace',
          email: 'ada@example.com',
          source: 'mindy-launch',
        }),
      }) as never
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      duplicate: true,
      crm: { ghl: { ok: true, contactId: 'contact-1' } },
    });
    expect(mocks.sendToGoHighLevel).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'ada@example.com', source: 'mindy-launch' })
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'https://getmindy.example/api/send',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ authorization: 'Bearer send-secret' }),
      })
    );
    expect(mocks.sendLeadToCrm).not.toHaveBeenCalled();
    expect(mocks.saveLeadToSupabase).not.toHaveBeenCalled();
    expect(mocks.sendConfirmationEmail).not.toHaveBeenCalled();
  });
});
