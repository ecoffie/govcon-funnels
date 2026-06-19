import { describe, expect, it, afterEach } from 'vitest';
import { getAdminPassword, isAuthorized } from '../admin-auth';

const ORIGINAL_ADMIN = process.env.ADMIN_PASSWORD;
const ORIGINAL_PURCHASES_ADMIN = process.env.PURCHASES_ADMIN_PASSWORD;

function restoreEnv() {
  if (ORIGINAL_ADMIN === undefined) delete process.env.ADMIN_PASSWORD;
  else process.env.ADMIN_PASSWORD = ORIGINAL_ADMIN;

  if (ORIGINAL_PURCHASES_ADMIN === undefined) delete process.env.PURCHASES_ADMIN_PASSWORD;
  else process.env.PURCHASES_ADMIN_PASSWORD = ORIGINAL_PURCHASES_ADMIN;
}

describe('admin auth', () => {
  afterEach(() => {
    restoreEnv();
  });

  it('fails closed when no admin password is configured', () => {
    delete process.env.ADMIN_PASSWORD;
    delete process.env.PURCHASES_ADMIN_PASSWORD;

    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('uses the configured purchases admin password', () => {
    delete process.env.ADMIN_PASSWORD;
    process.env.PURCHASES_ADMIN_PASSWORD = ' configured-secret \n';

    expect(getAdminPassword()).toBe('configured-secret');
    expect(isAuthorized('configured-secret')).toBe(true);
    expect(isAuthorized('wrong-secret')).toBe(false);
  });
});
