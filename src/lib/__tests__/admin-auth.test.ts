import { beforeEach, describe, expect, it } from 'vitest';
import { getAdminPassword, isAuthorized } from '../admin-auth';

describe('admin auth', () => {
  beforeEach(() => {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
  });

  it('fails closed when no admin secret is configured', () => {
    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('accepts only the configured admin secret', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'configured-secret';

    expect(isAuthorized('configured-secret')).toBe(true);
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });
});
