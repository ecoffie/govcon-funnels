import { afterEach, describe, expect, it } from 'vitest';
import { getAdminPassword, isAuthorized } from '../admin-auth';

const ORIGINAL_ENV = process.env;

describe('admin auth', () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('fails closed when no admin password is configured', () => {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;

    expect(getAdminPassword()).toBe('');
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('accepts the configured admin password', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'configured-secret';
    delete process.env.ADMIN_PASSWORD;

    expect(isAuthorized('configured-secret')).toBe(true);
    expect(isAuthorized('wrong-secret')).toBe(false);
  });
});
