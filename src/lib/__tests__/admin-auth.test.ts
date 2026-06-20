import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getAdminPassword, isAuthorized } from '../admin-auth';

const ORIGINAL_ENV = { ...process.env };

function resetAdminEnv() {
  delete process.env.PURCHASES_ADMIN_PASSWORD;
  delete process.env.ADMIN_PASSWORD;
}

describe('admin-auth', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    resetAdminEnv();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('fails closed when no admin password is configured', () => {
    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('authorizes the configured purchases admin password', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'configured-secret';

    expect(getAdminPassword()).toBe('configured-secret');
    expect(isAuthorized('configured-secret')).toBe(true);
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });
});
