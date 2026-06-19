import { afterEach, describe, expect, it } from 'vitest';
import { getAdminPassword, isAuthorized } from '../admin-auth';

describe('admin auth', () => {
  const originalPurchasesPassword = process.env.PURCHASES_ADMIN_PASSWORD;
  const originalAdminPassword = process.env.ADMIN_PASSWORD;

  afterEach(() => {
    process.env.PURCHASES_ADMIN_PASSWORD = originalPurchasesPassword;
    process.env.ADMIN_PASSWORD = originalAdminPassword;
  });

  it('fails closed when no admin password is configured', () => {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;

    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('accepts the configured purchases admin password', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'configured-secret';
    delete process.env.ADMIN_PASSWORD;

    expect(isAuthorized('configured-secret')).toBe(true);
    expect(isAuthorized('wrong-secret')).toBe(false);
  });
});
