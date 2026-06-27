import { createServiceClient } from "@services/db.ts";
import type { HealthResponse } from "@shared/dto/health.dto.ts";

/**
 * Health use case: verify the database and Redis are reachable. Used by uptime
 * checks and load balancers.
 */
async function checkDatabase(): Promise<boolean> {
  try {
    const client = createServiceClient();
    const { error } = await client.from("feature_flags").select("id").limit(1);
    return !error;
  } catch {
    return false;
  }
}

async function checkRedis(): Promise<boolean> {
  const url = Deno.env.get("UPSTASH_REDIS_REST_URL");
  const token = Deno.env.get("UPSTASH_REDIS_REST_TOKEN");
  if (!url || !token) return true; // Not configured locally — treat as healthy.

  try {
    const res = await fetch(`${url}/ping`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getHealth(): Promise<HealthResponse> {
  const [database, redis] = await Promise.all([checkDatabase(), checkRedis()]);
  return {
    status: database && redis ? "ok" : "degraded",
    checks: { database, redis },
    timestamp: new Date().toISOString(),
  };
}
