import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';

const ORIGINAL_ENV = {
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  CRON_SECRET: process.env.CRON_SECRET,
  HUBZONE_TRACKER_PASSWORD: process.env.HUBZONE_TRACKER_PASSWORD,
  PURCHASES_ADMIN_PASSWORD: process.env.PURCHASES_ADMIN_PASSWORD,
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

describe('HUBZone reminder cron auth', () => {
  beforeEach(() => {
    delete process.env.ADMIN_PASSWORD;
    delete process.env.CRON_SECRET;
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    process.env.HUBZONE_TRACKER_PASSWORD = 'tracker-secret';
  });

  afterEach(() => {
    restoreEnv();
  });

  it('does not allow the shareable tracker password to trigger sends', async () => {
    const res = await GET(new NextRequest('https://example.com/api/cron/hubzone-reminders?dry=1', {
      headers: { 'x-admin-password': 'tracker-secret' },
    }));

    expect(res.status).toBe(401);
  });
});
