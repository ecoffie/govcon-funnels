import { describe, expect, it, afterEach } from 'vitest';
import { getAdminPassword, isAuthorized } from '../admin-auth';

const originalPurchasesPassword = process.env.PURCHASES_ADMIN_PASSWORD;
const originalAdminPassword = process.env.ADMIN_PASSWORD;

function restoreEnv(name: 'PURCHASES_ADMIN_PASSWORD' | 'ADMIN_PASSWORD', value: string | undefined) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

afterEach(() => {
  restoreEnv('PURCHASES_ADMIN_PASSWORD', originalPurchasesPassword);
  restoreEnv('ADMIN_PASSWORD', originalAdminPassword);
});

describe('admin auth', () => {
  it('fails closed when no admin password is configured', () => {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;

    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('authorizes only the configured admin password', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'configured-secret';
    delete process.env.ADMIN_PASSWORD;

    expect(isAuthorized('configured-secret')).toBe(true);
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });
});
