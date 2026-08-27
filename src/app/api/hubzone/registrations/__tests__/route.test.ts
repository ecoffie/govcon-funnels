import { beforeEach, describe, expect, it, vi } from 'vitest';

const getHubzoneRegistrations = vi.fn();

vi.mock('@/lib/hubzone-registrations', () => ({
  getHubzoneRegistrations: (...args: unknown[]) => getHubzoneRegistrations(...args),
}));

import { GET } from '@/app/api/hubzone/registrations/route';

describe('retired HUBZone registrations API', () => {
  beforeEach(() => {
    getHubzoneRegistrations.mockReset();
    delete process.env.HUBZONE_TRACKER_PASSWORD;
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
  });

  it('returns 404 without a password and never loads registrants', async () => {
    process.env.HUBZONE_TRACKER_PASSWORD = 'tracker-placeholder';
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-placeholder';

    const res = await GET();

    expect(res.status).toBe(404);
    expect(getHubzoneRegistrations).not.toHaveBeenCalled();
  });

  it('returns 404 when a tracker-password placeholder env is present', async () => {
    process.env.HUBZONE_TRACKER_PASSWORD = 'tracker-placeholder';

    const res = await GET();

    expect(res.status).toBe(404);
    expect(getHubzoneRegistrations).not.toHaveBeenCalled();
  });

  it('returns 404 when an admin-password placeholder env is present', async () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'admin-placeholder';
    process.env.ADMIN_PASSWORD = 'admin-placeholder-alt';

    const res = await GET();

    expect(res.status).toBe(404);
    expect(getHubzoneRegistrations).not.toHaveBeenCalled();
  });
});
