import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';

const ORIGINAL_ENV = {
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  CRON_SECRET: process.env.CRON_SECRET,
  GHL_API_KEY: process.env.GHL_API_KEY,
  GHL_LOCATION_ID: process.env.GHL_LOCATION_ID,
  PURCHASES_ADMIN_PASSWORD: process.env.PURCHASES_ADMIN_PASSWORD,
  SLACK_LEAD_WEBHOOK_URL: process.env.SLACK_LEAD_WEBHOOK_URL,
};

function restoreEnv() {
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

describe('Mindy re-ignite cron auth', () => {
  beforeEach(() => {
    process.env.CRON_SECRET = 'cron-secret';
    process.env.GHL_API_KEY = 'ghl-token';
    process.env.GHL_LOCATION_ID = 'location-id';
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-secret';
    delete process.env.ADMIN_PASSWORD;
    delete process.env.SLACK_LEAD_WEBHOOK_URL;

    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      text: async () => JSON.stringify({ contacts: [] }),
      json: async () => ({ contacts: [] }),
    } as Response);
  });

  afterEach(() => {
    restoreEnv();
  });

  it('rejects a spoofed Vercel cron header without a shared secret', async () => {
    const res = await GET(new NextRequest('https://example.com/api/cron/mindy-reignite?dry=true', {
      headers: { 'x-vercel-cron': '1' },
    }));

    expect(res.status).toBe(401);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('accepts the configured cron bearer secret', async () => {
    const res = await GET(new NextRequest('https://example.com/api/cron/mindy-reignite?dry=true', {
      headers: { authorization: 'Bearer cron-secret' },
    }));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(global.fetch).toHaveBeenCalled();
  });
});
