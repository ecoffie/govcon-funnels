import { afterEach, describe, expect, it } from 'vitest';
import { getAdminPassword, isAuthorized } from '../admin-auth';

const ORIGINAL_PURCHASES_ADMIN_PASSWORD = process.env.PURCHASES_ADMIN_PASSWORD;
const ORIGINAL_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

afterEach(() => {
  process.env.PURCHASES_ADMIN_PASSWORD = ORIGINAL_PURCHASES_ADMIN_PASSWORD;
  process.env.ADMIN_PASSWORD = ORIGINAL_ADMIN_PASSWORD;
});

describe('admin-auth', () => {
  it('fails closed when no admin secret is configured', () => {
    delete process.env.PURCHASES_ADMIN_PASSWORD;
    delete process.env.ADMIN_PASSWORD;

    expect(getAdminPassword()).toBeNull();
    expect(isAuthorized('galata-assassin-2026')).toBe(false);
  });

  it('trims configured env secrets before comparison', () => {
    process.env.PURCHASES_ADMIN_PASSWORD = 'real-secret\n';
    delete process.env.ADMIN_PASSWORD;

    expect(getAdminPassword()).toBe('real-secret');
    expect(isAuthorized('real-secret')).toBe(true);
  });
});
