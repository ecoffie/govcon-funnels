/**
 * Shared SAM.gov API Utilities
 *
 * Rate limiting, caching, error handling for all SAM APIs
 */

import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Types
export interface SAMAPIConfig {
  apiType: 'opportunities' | 'awards' | 'entity' | 'subaward' | 'hierarchy';
  baseUrl: string;
  apiKey: string;
  cacheTTLHours: number;
}

export interface CacheEntry {
  id: string;
  cache_key: string;
  api_type: string;
  query_params: Record<string, unknown>;
  response_data: unknown;
  fetched_at: string;
  expires_at: string;
  hit_count: number;
}

export interface SAMError {
  status: number;
  message: string;
  retryable: boolean;
  fallbackAvailable: boolean;
}

// Constants
export const SAM_API_CONFIGS: Record<string, SAMAPIConfig> = {
  opportunities: {
    apiType: 'opportunities',
    baseUrl: 'https://api.sam.gov/opportunities/v2',
    apiKey: process.env.SAM_API_KEY || '',
    cacheTTLHours: 1
  },
  awards: {
    apiType: 'awards',
    baseUrl: 'https://api.sam.gov/contract-awards/v1',
    apiKey: process.env.SAM_CONTRACT_AWARDS_API_KEY || process.env.SAM_API_KEY || '',
    cacheTTLHours: 24
  },
  entity: {
    apiType: 'entity',
    baseUrl: 'https://api.sam.gov/entity-information/v3',
    apiKey: process.env.SAM_ENTITY_API_KEY || process.env.SAM_API_KEY || '',
    cacheTTLHours: 24
  },
  subaward: {
    apiType: 'subaward',
    baseUrl: 'https://api.sam.gov/prod/subaward/v1',
    apiKey: process.env.SAM_SUBAWARD_API_KEY || process.env.SAM_API_KEY || '',
    cacheTTLHours: 24
  },
  hierarchy: {
    apiType: 'hierarchy',
    baseUrl: 'https://api.sam.gov/prod/federalorganizations/v1',
    apiKey: process.env.SAM_HIERARCHY_API_KEY || process.env.SAM_API_KEY || '',
    cacheTTLHours: 168 // 7 days
  }
};

// Rate limit tracking (in-memory for now, could be Redis/KV)
const rateLimitState: Record<string, { count: number; resetAt: number }> = {};

// Track which API keys are throttled (reset at midnight UTC)
const throttledKeys: Record<string, number> = {}; // key -> throttled until timestamp

const RATE_LIMIT = {
  requestsPerDay: 1000,
  requestsPerMinute: 10,
  windowMs: 24 * 60 * 60 * 1000 // 24 hours
};

/**
 * Get available API keys for a given API type
 * Returns primary key first, then backup key
 */
function getAPIKeys(apiType: string): string[] {
  const keys: string[] = [];

  // Primary keys by API type
  const primaryKey = (() => {
    switch (apiType) {
      case 'entity':
        return process.env.SAM_ENTITY_API_KEY || process.env.SAM_API_KEY || '';
      case 'awards':
        return process.env.SAM_CONTRACT_AWARDS_API_KEY || process.env.SAM_API_KEY || '';
      case 'subaward':
        return process.env.SAM_SUBAWARD_API_KEY || process.env.SAM_API_KEY || '';
      case 'hierarchy':
        return process.env.SAM_HIERARCHY_API_KEY || process.env.SAM_API_KEY || '';
      default:
        return process.env.SAM_API_KEY || '';
    }
  })();

  if (primaryKey) keys.push(primaryKey);

  // Add backup key if available
  const backupKey = process.env.SAM_API_KEY_BACKUP || '';
  if (backupKey && backupKey !== primaryKey) {
    keys.push(backupKey);
  }

  return keys;
}

/**
 * Get the next available (non-throttled) API key
 */
function getAvailableAPIKey(apiType: string): string | null {
  const keys = getAPIKeys(apiType);
  const now = Date.now();

  for (const key of keys) {
    const throttledUntil = throttledKeys[key];
    if (!throttledUntil || throttledUntil < now) {
      // Key is available (not throttled or throttle expired)
      delete throttledKeys[key]; // Clean up expired throttle
      return key;
    }
  }

  // All keys are throttled
  return null;
}

/**
 * Mark an API key as throttled until the specified time
 */
function markKeyThrottled(apiKey: string, untilTimestamp: number): void {
  throttledKeys[apiKey] = untilTimestamp;
  console.log(`[SAM API] Key ${apiKey.slice(0, 10)}... throttled until ${new Date(untilTimestamp).toISOString()}`);
}

// Supabase client for caching
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn('Supabase not configured for SAM API caching');
    return null;
  }

  return createClient(url, key);
}

/**
 * Validate CAGE code format (5 alphanumeric characters)
 */
export function validateCAGECode(code: string): boolean {
  return /^[A-Z0-9]{5}$/i.test(code);
}

/**
 * Generate cache key from API type and query params
 */
export function generateCacheKey(apiType: string, params: Record<string, unknown>): string {
  const sortedParams = JSON.stringify(params, Object.keys(params).sort());
  return crypto.createHash('md5').update(`${apiType}:${sortedParams}`).digest('hex');
}

/**
 * Check rate limit before making request
 */
export function checkRateLimit(apiType: string): { allowed: boolean; remaining: number; resetIn: number } {
  const key = `sam_${apiType}`;
  const now = Date.now();

  if (!rateLimitState[key] || rateLimitState[key].resetAt < now) {
    rateLimitState[key] = {
      count: 0,
      resetAt: now + RATE_LIMIT.windowMs
    };
  }

  const state = rateLimitState[key];
  const remaining = RATE_LIMIT.requestsPerDay - state.count;
  const resetIn = Math.max(0, state.resetAt - now);

  return {
    allowed: remaining > 0,
    remaining,
    resetIn
  };
}

/**
 * Increment rate limit counter
 */
export function incrementRateLimit(apiType: string): void {
  const key = `sam_${apiType}`;
  if (rateLimitState[key]) {
    rateLimitState[key].count++;
  }
}

/**
 * Check cache for existing response
 */
export async function checkCache(
  apiType: string,
  params: Record<string, unknown>
): Promise<unknown | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const cacheKey = generateCacheKey(apiType, params);

  try {
    const { data, error } = await supabase
      .from('sam_api_cache')
      .select('response_data, expires_at, hit_count')
      .eq('cache_key', cacheKey)
      .single();

    if (error || !data) return null;

    // Check if expired
    if (new Date(data.expires_at) < new Date()) {
      // Delete expired entry
      await supabase.from('sam_api_cache').delete().eq('cache_key', cacheKey);
      return null;
    }

    // Increment hit count
    await supabase
      .from('sam_api_cache')
      .update({ hit_count: (data.hit_count || 0) + 1 })
      .eq('cache_key', cacheKey);

    console.log(`[SAM Cache HIT] ${apiType}:${cacheKey}`);
    return data.response_data;
  } catch (err) {
    console.error('[SAM Cache Error]', err);
    return null;
  }
}

/**
 * Store response in cache
 */
export async function storeInCache(
  apiType: string,
  params: Record<string, unknown>,
  response: unknown,
  ttlHours: number
): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  const cacheKey = generateCacheKey(apiType, params);
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000).toISOString();

  try {
    await supabase
      .from('sam_api_cache')
      .upsert({
        cache_key: cacheKey,
        api_type: apiType,
        query_params: params,
        response_data: response,
        fetched_at: new Date().toISOString(),
        expires_at: expiresAt,
        hit_count: 0
      }, { onConflict: 'cache_key' });

    console.log(`[SAM Cache STORE] ${apiType}:${cacheKey}, TTL: ${ttlHours}h`);
  } catch (err) {
    console.error('[SAM Cache Store Error]', err);
  }
}

/**
 * Parse SAM API error response
 */
export function parseSAMError(status: number, body: unknown): SAMError {
  const message = typeof body === 'object' && body !== null
    ? (body as Record<string, string>).message || JSON.stringify(body)
    : String(body);

  return {
    status,
    message,
    retryable: status === 429 || status >= 500,
    fallbackAvailable: status === 401 || status === 403 || status === 429 || status >= 500
  };
}

/**
 * Make a single SAM API request with a specific API key
 */
async function makeSingleRequest<T>(
  config: SAMAPIConfig,
  endpoint: string,
  params: Record<string, string | number | boolean>,
  apiKey: string
): Promise<{ data: T | null; error: SAMError | null; throttled: boolean }> {
  const url = new URL(`${config.baseUrl}${endpoint}`);
  url.searchParams.append('api_key', apiKey);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, String(value));
    }
  });

  try {
    console.log(`[SAM API Request] ${config.apiType}: ${url.pathname}?${url.searchParams.toString().replace(/api_key=[^&]+/, 'api_key=***')}`);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    incrementRateLimit(config.apiType);

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }

    // Check for SAM.gov throttling error (can come with HTTP 200 or 429, code 900804)
    if (data && typeof data === 'object' && 'code' in data && data.code === '900804') {
      const throttleData = data as { code: string; message: string; description: string; nextAccessTime: string };

      // Parse the next access time and mark this key as throttled
      // Format: "2026-Apr-03 00:00:00+0000 UTC"
      const nextAccess = new Date(throttleData.nextAccessTime.replace(' UTC', 'Z').replace(/(\d{4})-(\w{3})-(\d{2})/, '$1-$2-$3')).getTime();
      const throttleUntil = isNaN(nextAccess) ? Date.now() + 24 * 60 * 60 * 1000 : nextAccess;
      markKeyThrottled(apiKey, throttleUntil);

      console.log(`[SAM API] Key ${apiKey.slice(0, 10)}... throttled, trying backup...`);

      return {
        data: null,
        error: {
          status: 429,
          message: `SAM.gov API rate limit exceeded. Resets at ${throttleData.nextAccessTime}`,
          retryable: false,
          fallbackAvailable: true
        },
        throttled: true
      };
    }

    if (!response.ok) {
      return { data: null, error: parseSAMError(response.status, data), throttled: false };
    }

    return { data: data as T, error: null, throttled: false };
  } catch (err) {
    console.error(`[SAM API Error] ${config.apiType}:`, err);
    return {
      data: null,
      error: {
        status: 500,
        message: err instanceof Error ? err.message : 'Network error',
        retryable: true,
        fallbackAvailable: true
      },
      throttled: false
    };
  }
}

/**
 * Make SAM API request with rate limiting, caching, key rotation, and error handling
 */
export async function makeSAMRequest<T>(
  config: SAMAPIConfig,
  endpoint: string,
  params: Record<string, string | number | boolean>,
  options: {
    useCache?: boolean;
    bypassRateLimit?: boolean;
  } = {}
): Promise<{ data: T | null; error: SAMError | null; fromCache: boolean }> {
  const { useCache = true, bypassRateLimit = false } = options;

  // 1. Check cache first
  if (useCache) {
    const cached = await checkCache(config.apiType, params);
    if (cached) {
      return { data: cached as T, error: null, fromCache: true };
    }
  }

  // 2. Check internal rate limit
  if (!bypassRateLimit) {
    const rateLimit = checkRateLimit(config.apiType);
    if (!rateLimit.allowed) {
      return {
        data: null,
        error: {
          status: 429,
          message: `Rate limit exceeded. Resets in ${Math.ceil(rateLimit.resetIn / 1000 / 60)} minutes`,
          retryable: true,
          fallbackAvailable: true
        },
        fromCache: false
      };
    }
  }

  // 3. Try available API keys (with automatic failover)
  const apiKeys = getAPIKeys(config.apiType);
  let lastError: SAMError | null = null;

  for (let index = 0; index < apiKeys.length; index++) {
    const apiKey = apiKeys[index];
    // Skip throttled keys
    const throttledUntil = throttledKeys[apiKey];
    if (throttledUntil && throttledUntil > Date.now()) {
      console.log(`[SAM API] Skipping throttled key ${apiKey.slice(0, 10)}...`);
      continue;
    }

    const result = await makeSingleRequest<T>(config, endpoint, params, apiKey);

    if (result.throttled) {
      // Key was throttled, try next key
      lastError = result.error;
      continue;
    }

    if (result.error) {
      lastError = result.error;

      // Key-specific auth failures and retryable SAM errors should fail over
      // when a backup key is configured. Bad request errors should still fail fast.
      if (result.error.fallbackAvailable && index < apiKeys.length - 1) {
        console.warn(
          `[SAM API] Key ${apiKey.slice(0, 10)}... failed with ${result.error.status}, trying backup...`
        );
        continue;
      }

      return { data: null, error: result.error, fromCache: false };
    }

    // Success! Store in cache and return
    if (useCache && result.data) {
      await storeInCache(config.apiType, params, result.data, config.cacheTTLHours);
    }

    return { data: result.data, error: null, fromCache: false };
  }

  // All keys were throttled or no keys available
  return {
    data: null,
    error: lastError || {
      status: 429,
      message: 'All SAM.gov API keys are rate limited. Please try again later.',
      retryable: false,
      fallbackAvailable: false
    },
    fromCache: false
  };
}

/**
 * Exponential backoff retry
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      if (attempt < maxRetries - 1) {
        const delay = baseDelayMs * Math.pow(2, attempt);
        console.log(`[SAM Retry] Attempt ${attempt + 1} failed, retrying in ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Max retries exceeded');
}

/**
 * Clean expired cache entries (run periodically)
 */
export async function cleanExpiredCache(): Promise<number> {
  const supabase = getSupabaseClient();
  if (!supabase) return 0;

  try {
    const { data, error } = await supabase
      .from('sam_api_cache')
      .delete()
      .lt('expires_at', new Date().toISOString())
      .select('id');

    if (error) throw error;

    const count = data?.length || 0;
    console.log(`[SAM Cache Cleanup] Removed ${count} expired entries`);
    return count;
  } catch (err) {
    console.error('[SAM Cache Cleanup Error]', err);
    return 0;
  }
}

/**
 * Get rate limit status for all APIs
 */
export function getRateLimitStatus(): Record<string, { remaining: number; resetIn: string }> {
  const status: Record<string, { remaining: number; resetIn: string }> = {};

  for (const apiType of Object.keys(SAM_API_CONFIGS)) {
    const { remaining, resetIn } = checkRateLimit(apiType);
    status[apiType] = {
      remaining,
      resetIn: `${Math.ceil(resetIn / 1000 / 60)} minutes`
    };
  }

  return status;
}
