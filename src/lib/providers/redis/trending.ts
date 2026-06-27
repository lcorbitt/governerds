import "server-only";

import { getRedis } from "./client";

/**
 * Trending / hot-content scratch space backed by Redis sorted sets. This is a
 * stub for future forums and articles: score an entity, then read the top N.
 * No-ops when Redis is not configured.
 */
function key(period: string): string {
  return `trending:${period}`;
}

export async function recordTrendingHit(
  period: string,
  entityId: string,
  weight = 1,
): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.zincrby(key(period), weight, entityId);
}

export async function getTrending(
  period: string,
  limit = 10,
): Promise<string[]> {
  const redis = getRedis();
  if (!redis) return [];
  return redis.zrange<string[]>(key(period), 0, limit - 1, { rev: true });
}
