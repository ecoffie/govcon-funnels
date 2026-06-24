import { afterEach, describe, expect, it } from 'vitest';
import { getAdminPassword, isAuthorized } from '../admin-auth';

const ORIGINAL_ENV = { ...process.env };

describe('admin auth', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('fails closed when no admin password env is configured', () => {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;

    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('accepts ADMIN_PASSWORD when purchase admin password is unset', () => {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    process.env.ADMIN_PASSWORD = 'shared-secret';

    expect(getAdminPassword()).toBe('shared-secret');
    expect(isAuthorized('shared-secret')).toBe(true);
    expect(isAuthorized('wrong-secret')).toBe(false);
  });

  it('prefers PURCHASES_ADMIN_PASSWORD over ADMIN_PASSWORD', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'purchase-secret';
    process.env.ADMIN_PASSWORD = 'shared-secret';

    expect(getAdminPassword()).toBe('purchase-secret');
    expect(isAuthorized('purchase-secret')).toBe(true);
    expect(isAuthorized('shared-secret')).toBe(false);
  });
});
