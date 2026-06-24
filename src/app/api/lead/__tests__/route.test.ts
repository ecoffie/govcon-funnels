import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  sendLeadToCrm: vi.fn(),
  sendToGoHighLevel: vi.fn(),
  sendConfirmationEmail: vi.fn(),
  saveLeadToSupabase: vi.fn(),
  countLeadsBySource: vi.fn(),
  getLeadPositionBySource: vi.fn(),
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
  countLeadsBySource: mocks.countLeadsBySource,
  getLeadPositionBySource: mocks.getLeadPositionBySource,
  recentDuplicateExists: mocks.recentDuplicateExists,
  MINDY_LAUNCH_ZOOM_CAP: 150,
}));

import { POST } from '../route';

describe('/api/lead', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.MINDY_LAUNCH_SEND_URL = 'https://getmindy.example/api/mindy-launch/send-confirmation';
    process.env.MINDY_LAUNCH_SEND_SECRET = 'mindy-secret';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 200 })));

    mocks.sendLeadToCrm.mockResolvedValue({ ghl: { ok: true }, slack: { ok: true } });
    mocks.sendToGoHighLevel.mockResolvedValue({ ok: true, contactId: 'contact-123' });
    mocks.sendConfirmationEmail.mockResolvedValue({ ok: true });
    mocks.saveLeadToSupabase.mockResolvedValue({ ok: true });
    mocks.countLeadsBySource.mockResolvedValue(42);
    mocks.getLeadPositionBySource.mockResolvedValue(12);
    mocks.recentDuplicateExists.mockResolvedValue(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.MINDY_LAUNCH_SEND_URL;
    delete process.env.MINDY_LAUNCH_SEND_SECRET;
  });

  it('recovers idempotent downstream delivery for recent duplicate Mindy submissions', async () => {
    mocks.recentDuplicateExists.mockResolvedValue(true);

    const response = await POST(
      new Request('https://govcongiants.com/api/lead', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Ada Lovelace',
          email: 'ada@example.com',
          phone: '555-0100',
          source: 'mindy-launch',
        }),
      }) as Parameters<typeof POST>[0]
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      success: true,
      duplicate: true,
      crm: { ghl: { ok: true, contactId: 'contact-123' } },
      mindyLaunch: { position: 12, getsZoom: true, zoomCap: 150 },
      mindyLaunchConfirmation: { ok: true },
    });

    expect(mocks.sendToGoHighLevel).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        phone: '555-0100',
        source: 'mindy-launch',
      })
    );
    expect(global.fetch).toHaveBeenCalledWith(
      'https://getmindy.example/api/mindy-launch/send-confirmation',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          authorization: 'Bearer mindy-secret',
        }),
        body: JSON.stringify({
          email: 'ada@example.com',
          name: 'Ada Lovelace',
          getsZoom: true,
        }),
      })
    );

    expect(mocks.sendLeadToCrm).not.toHaveBeenCalled();
    expect(mocks.saveLeadToSupabase).not.toHaveBeenCalled();
    expect(mocks.sendConfirmationEmail).not.toHaveBeenCalled();
  });

  it('uses the submitted email first position for Mindy Zoom status', async () => {
    mocks.getLeadPositionBySource.mockResolvedValue(151);
    mocks.countLeadsBySource.mockResolvedValue(500);

    const response = await POST(
      new Request('https://govcongiants.com/api/lead', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Grace Hopper',
          email: 'grace@example.com',
          source: 'mindy-launch',
        }),
      }) as Parameters<typeof POST>[0]
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.mindyLaunch).toEqual({ position: 151, getsZoom: false, zoomCap: 150 });
    expect(mocks.countLeadsBySource).not.toHaveBeenCalled();
    expect(mocks.sendLeadToCrm).toHaveBeenCalled();
    expect(mocks.saveLeadToSupabase).toHaveBeenCalled();
  });
});
