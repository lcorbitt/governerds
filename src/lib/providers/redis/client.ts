import "server-only";

import { Redis } from "@upstash/redis";

import { env } from "@/lib/env/server";

/**
 * Centralized Redis access. Every Redis interaction in the app goes through the
 * helpers in `src/lib/providers/redis/*`, which use this single client factory.
 * Upstash for another provider means changing only this file.
 *
 * Returns `null` when Redis is not configured so local development works
 * without a Redis instance; callers degrade gracefully.
 */
let cached: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (cached !== undefined) return cached;

  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    cached = null;
    return cached;
  }

  cached = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });
  return cached;
}

export function isRedisConfigured(): boolean {
  return getRedis() !== null;
}
