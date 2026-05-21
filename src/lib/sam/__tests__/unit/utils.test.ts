import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  validateCAGECode,
  generateCacheKey,
  checkRateLimit,
  incrementRateLimit,
  parseSAMError,
  makeSAMRequest,
  SAM_API_CONFIGS,
} from '../../utils';

describe('SAM Utils - Unit Tests', () => {
  describe('validateCAGECode', () => {
    it('accepts valid 5-character alphanumeric CAGE codes', () => {
      expect(validateCAGECode('1ABC2')).toBe(true);
      expect(validateCAGECode('ABCDE')).toBe(true);
      expect(validateCAGECode('12345')).toBe(true);
      expect(validateCAGECode('A1B2C')).toBe(true);
    });

    it('accepts lowercase CAGE codes (case insensitive)', () => {
      expect(validateCAGECode('abcde')).toBe(true);
      expect(validateCAGECode('a1b2c')).toBe(true);
    });

    it('rejects CAGE codes that are too short', () => {
      expect(validateCAGECode('ABC')).toBe(false);
      expect(validateCAGECode('1234')).toBe(false);
      expect(validateCAGECode('A')).toBe(false);
      expect(validateCAGECode('')).toBe(false);
    });

    it('rejects CAGE codes that are too long', () => {
      expect(validateCAGECode('ABCDEF')).toBe(false);
      expect(validateCAGECode('123456')).toBe(false);
      expect(validateCAGECode('A1B2C3')).toBe(false);
    });

    it('rejects CAGE codes with special characters', () => {
      expect(validateCAGECode('ABC-E')).toBe(false);
      expect(validateCAGECode('ABC_1')).toBe(false);
      expect(validateCAGECode('AB C1')).toBe(false);
      expect(validateCAGECode('AB@12')).toBe(false);
    });
  });

  describe('generateCacheKey', () => {
    it('generates consistent cache keys for same params', () => {
      const params = { cageCode: '12345', limit: 10 };
      const key1 = generateCacheKey('entity', params);
      const key2 = generateCacheKey('entity', params);
      expect(key1).toBe(key2);
    });

    it('generates different keys for different params', () => {
      const key1 = generateCacheKey('entity', { cageCode: '12345' });
      const key2 = generateCacheKey('entity', { cageCode: '54321' });
      expect(key1).not.toBe(key2);
    });

    it('generates different keys for different API types', () => {
      const params = { cageCode: '12345' };
      const key1 = generateCacheKey('entity', params);
      const key2 = generateCacheKey('awards', params);
      expect(key1).not.toBe(key2);
    });

    it('generates consistent keys regardless of param order', () => {
      const key1 = generateCacheKey('entity', { a: 1, b: 2 });
      const key2 = generateCacheKey('entity', { b: 2, a: 1 });
      expect(key1).toBe(key2);
    });
  });

  describe('checkRateLimit', () => {
    beforeEach(() => {
      // Reset rate limit state by checking a unique API type
    });

    it('allows first request', () => {
      const uniqueApiType = `test_${Date.now()}_first`;
      const result = checkRateLimit(uniqueApiType);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(1000); // requestsPerDay from RATE_LIMIT
    });

    it('decrements remaining after increment', () => {
      const uniqueApiType = `test_${Date.now()}_decrement`;
      checkRateLimit(uniqueApiType);
      incrementRateLimit(uniqueApiType);

      const result = checkRateLimit(uniqueApiType);
      expect(result.remaining).toBe(999);
    });

    it('returns resetIn time', () => {
      const uniqueApiType = `test_${Date.now()}_reset`;
      const result = checkRateLimit(uniqueApiType);
      expect(result.resetIn).toBeGreaterThan(0);
      expect(result.resetIn).toBeLessThanOrEqual(24 * 60 * 60 * 1000); // 24 hours
    });
  });

  describe('incrementRateLimit', () => {
    it('increments the counter', () => {
      const uniqueApiType = `test_${Date.now()}_increment`;
      checkRateLimit(uniqueApiType); // Initialize state

      incrementRateLimit(uniqueApiType);
      const result = checkRateLimit(uniqueApiType);

      expect(result.remaining).toBe(999);
    });

    it('does not throw if state not initialized', () => {
      expect(() => incrementRateLimit('nonexistent_api')).not.toThrow();
    });
  });

  describe('parseSAMError', () => {
    it('parses error with message property', () => {
      const body = { message: 'Rate limit exceeded' };
      const error = parseSAMError(429, body);

      expect(error.status).toBe(429);
      expect(error.message).toBe('Rate limit exceeded');
      expect(error.retryable).toBe(true);
      expect(error.fallbackAvailable).toBe(true);
    });

    it('stringifies error without message property', () => {
      const body = { error: 'Some error' };
      const error = parseSAMError(400, body);

      expect(error.status).toBe(400);
      expect(error.message).toContain('error');
      expect(error.retryable).toBe(false);
    });

    it('handles string body', () => {
      const body = 'Plain text error';
      const error = parseSAMError(500, body);

      expect(error.status).toBe(500);
      expect(error.message).toBe('Plain text error');
      expect(error.retryable).toBe(true);
    });

    it('marks 429 as retryable', () => {
      const error = parseSAMError(429, { message: 'Too many requests' });
      expect(error.retryable).toBe(true);
      expect(error.fallbackAvailable).toBe(true);
    });

    it('marks 5xx errors as retryable', () => {
      expect(parseSAMError(500, {}).retryable).toBe(true);
      expect(parseSAMError(502, {}).retryable).toBe(true);
      expect(parseSAMError(503, {}).retryable).toBe(true);
    });

    it('marks 4xx errors (except 429) as not retryable', () => {
      expect(parseSAMError(400, {}).retryable).toBe(false);
      expect(parseSAMError(401, {}).retryable).toBe(false);
      expect(parseSAMError(403, {}).retryable).toBe(false);
      expect(parseSAMError(404, {}).retryable).toBe(false);
    });
  });

  describe('makeSAMRequest failover', () => {
    it('tries a backup key when the primary key returns a plain 429', async () => {
      process.env.SAM_API_KEY_BACKUP = 'backup-api-key';
      const fetchMock = vi.mocked(global.fetch);
      fetchMock
        .mockResolvedValueOnce({
          ok: false,
          status: 429,
          text: async () => JSON.stringify({ message: 'Too many requests' }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          text: async () => JSON.stringify({ entityData: [], totalRecords: 0 }),
        } as Response);

      const result = await makeSAMRequest(
        SAM_API_CONFIGS.entity,
        '/entities',
        { samRegistered: 'Yes', page: 0, size: 1 },
        { useCache: false, bypassRateLimit: true }
      );

      expect(result.error).toBeNull();
      expect(result.data).toEqual({ entityData: [], totalRecords: 0 });
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(String(fetchMock.mock.calls[0][0])).toContain('api_key=test-entity-key');
      expect(String(fetchMock.mock.calls[1][0])).toContain('api_key=backup-api-key');
    });

    it('does not try a backup key for non-retryable request errors', async () => {
      process.env.SAM_API_KEY_BACKUP = 'backup-api-key';
      const fetchMock = vi.mocked(global.fetch);
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => JSON.stringify({ message: 'Bad request' }),
      } as Response);

      const result = await makeSAMRequest(
        SAM_API_CONFIGS.entity,
        '/entities',
        { samRegistered: 'Yes', page: 0, size: 1 },
        { useCache: false, bypassRateLimit: true }
      );

      expect(result.error?.status).toBe(400);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });
  });
});
