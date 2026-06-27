import "server-only";

import { getRedis } from "./client";

/**
 * Short-lived temporary tokens (invites, verification short-codes). Stored with
 * a TTL so they expire automatically. Token values should be opaque and random;
 * we store only a hash-friendly identifier as the key.
 */
function key(type: string, token: string): string {
  return `token:${type}:${token}`;
}

export async function storeToken(
  type: string,
  token: string,
  payload: Record<string, unknown>,
  ttlSeconds: number,
): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  await redis.set(key(type, token), payload, { ex: ttlSeconds });
}

export async function consumeToken<T = Record<string, unknown>>(
  type: string,
  token: string,
): Promise<T | null> {
  const redis = getRedis();
  if (!redis) return null;

  const k = key(type, token);
  const payload = await redis.get<T>(k);
  if (payload !== null) {
    await redis.del(k);
  }
  return payload ?? null;
}
