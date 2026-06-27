import "server-only";

import { getRedis } from "./client";

/**
 * Generic TTL cache. Keys are namespaced so different subsystems never collide.
 * When Redis is not configured, reads miss and writes no-op so the app keeps
 * working in local development.
 */
function key(namespace: string, id: string): string {
  return `cache:${namespace}:${id}`;
}

export async function cacheGet<T>(
  namespace: string,
  id: string,
): Promise<T | null> {
  const redis = getRedis();
  if (!redis) return null;
  return (await redis.get<T>(key(namespace, id))) ?? null;
}

export async function cacheSet<T>(
  namespace: string,
  id: string,
  value: T,
  ttlSeconds: number,
): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.set(key(namespace, id), value, { ex: ttlSeconds });
}

export async function cacheDelete(
  namespace: string,
  id: string,
): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.del(key(namespace, id));
}

/**
 * Read-through cache helper: returns the cached value or computes, stores, and
 * returns a fresh one.
 */
export async function cached<T>(
  namespace: string,
  id: string,
  ttlSeconds: number,
  compute: () => Promise<T>,
): Promise<T> {
  const hit = await cacheGet<T>(namespace, id);
  if (hit !== null) return hit;

  const value = await compute();
  await cacheSet(namespace, id, value, ttlSeconds);
  return value;
}
