import "server-only";

import { Ratelimit } from "@upstash/ratelimit";

import { getRedis } from "./client";

/**
 * Sliding-window rate limiting (OWASP A07: Authentication Failures / abuse).
 * When Redis is not configured we allow all requests so local development is
 * unblocked; production must always have Redis configured.
 */
export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

const limiters = new Map<string, Ratelimit>();

function getLimiter(name: string, limit: number, windowSeconds: number) {
  const redis = getRedis();
  if (!redis) return null;

  const cacheKey = `${name}:${limit}:${windowSeconds}`;
  let limiter = limiters.get(cacheKey);
  if (!limiter) {
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      prefix: `rl:${name}`,
      analytics: false,
    });
    limiters.set(cacheKey, limiter);
  }
  return limiter;
}

export async function rateLimit(
  name: string,
  identifier: string,
  options: { limit: number; windowSeconds: number },
): Promise<RateLimitResult> {
  const limiter = getLimiter(name, options.limit, options.windowSeconds);

  if (!limiter) {
    return {
      success: true,
      limit: options.limit,
      remaining: options.limit,
      reset: Date.now() + options.windowSeconds * 1000,
    };
  }

  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}
