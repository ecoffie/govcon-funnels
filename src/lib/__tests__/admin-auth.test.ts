import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getAdminPassword, isAuthorized } from '../admin-auth';

const ORIGINAL_ENV = {
  PURCHASES_ADMIN_PASSWORD: process.env.PURCHASES_ADMIN_PASSWORD,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

describe('admin auth', () => {
  beforeEach(() => {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;
  });

  afterEach(() => {
    if (ORIGINAL_ENV.PURCHASES_ADMIN_PASSWORD === undefined) delete process.env.PURCHASES_ADMIN_PASSWORD;
    else process.env.PURCHASES_ADMIN_PASSWORD = ORIGINAL_ENV.PURCHASES_ADMIN_PASSWORD;

    if (ORIGINAL_ENV.ADMIN_PASSWORD === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = ORIGINAL_ENV.ADMIN_PASSWORD;
  });

  it('fails closed when no admin password env is configured', () => {
    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('accepts the configured purchases admin password', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'configured-secret';

    expect(getAdminPassword()).toBe('configured-secret');
    expect(isAuthorized('configured-secret')).toBe(true);
    expect(isAuthorized('wrong-secret')).toBe(false);
  });
});
