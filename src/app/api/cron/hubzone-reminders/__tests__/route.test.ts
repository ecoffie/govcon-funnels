import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../route';

const ORIGINAL_ENV = { ...process.env };

function resetEnv() {
  process.env = { ...ORIGINAL_ENV };
  delete process.env.PURCHASES_ADMIN_PASSWORD;
  delete process.env.ADMIN_PASSWORD;
  delete process.env.CRON_SECRET;
  process.env.HUBZONE_TRACKER_PASSWORD = 'hubzone2026';
}

describe('/api/cron/hubzone-reminders', () => {
  beforeEach(resetEnv);

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('rejects the shareable HUBZone tracker password on scheduled send routes', async () => {
    const req = new NextRequest(
      'https://govcongiants.com/api/cron/hubzone-reminders?type=recording&password=hubzone2026'
    );

    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(401);
    expect(body).toEqual({ error: 'Unauthorized' });
  });
});
