import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Upstash-backed fixed-window rate limiter for public, unauthenticated POST
 * endpoints (lead capture, newsletter signup) that fan out to GHL / Slack /
 * Resend and would otherwise be abusable as spam amplifiers.
 *
 * Design:
 *  - Per-client-IP fixed window via a single INCR + EXPIRE (no extra deps; we
 *    deliberately do NOT pull in @upstash/ratelimit for a simple counter).
 *  - FAILS OPEN: if Redis isn't configured or is unreachable, requests are
 *    allowed. A signup must never be blocked because the limiter is down — the
 *    limiter exists to stop floods, not to gate legitimate conversions.
 *  - Reuses the same STORAGE_KV_REST_API_* (prefixed) / KV_REST_API_* env pair
 *    the rest of the app uses, so no new store/env is required.
 */

let redisClient: Redis | null = null;
let redisResolved = false;

function getRedis(): Redis | null {
  if (redisResolved) return redisClient;
  redisResolved = true;
  const url = process.env.STORAGE_KV_REST_API_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.STORAGE_KV_REST_API_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    // Not configured → limiter is a no-op (fail open).
    redisClient = null;
    return null;
  }
  redisClient = new Redis({ url, token });
  return redisClient;
}

/** Best-effort client IP from Vercel's forwarding headers. */
export function clientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    // First entry is the original client.
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

export type RateLimitResult = {
  allowed: boolean;
  /** Requests remaining in the current window (best-effort). */
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
  limit: number;
};

/**
 * Increment the counter for `key` and decide if the caller is within `limit`
 * per `windowSeconds`. Fails open (allowed:true) on any Redis error.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<RateLimitResult> {
  const redis = getRedis();
  if (!redis) {
    return { allowed: true, remaining: limit, retryAfter: 0, limit };
  }
  try {
    const redisKey = `ratelimit:${key}`;
    const count = await redis.incr(redisKey);
    if (count === 1) {
      // First hit in this window — start the TTL.
      await redis.expire(redisKey, windowSeconds);
    }
    if (count > limit) {
      // Over the limit — find out how long until the window resets.
      const ttl = await redis.ttl(redisKey);
      const retryAfter = ttl > 0 ? ttl : windowSeconds;
      return { allowed: false, remaining: 0, retryAfter, limit };
    }
    return {
      allowed: true,
      remaining: Math.max(0, limit - count),
      retryAfter: 0,
      limit,
    };
  } catch (err) {
    // Redis down / transient error → never block a real user.
    console.error('rateLimit check failed (allowing request):', err);
    return { allowed: true, remaining: limit, retryAfter: 0, limit };
  }
}

/**
 * Convenience guard for a route: rate-limits by client IP under `bucket`.
 * Returns a ready-to-send 429 NextResponse when over the limit, or null when
 * the request should proceed.
 */
export async function enforceIpRateLimit(
  request: NextRequest,
  bucket: string,
  limit: number,
  windowSeconds: number
): Promise<NextResponse | null> {
  const ip = clientIp(request);
  const result = await rateLimit(`${bucket}:${ip}`, limit, windowSeconds);
  if (result.allowed) return null;
  return NextResponse.json(
    { error: 'Too many requests. Please slow down and try again shortly.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(result.retryAfter),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': '0',
      },
    }
  );
}
