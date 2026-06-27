import { inngest } from "@/lib/providers/jobs/client";
import { cacheDelete } from "@/lib/providers/redis/cache";
import type { CacheInvalidateData } from "@/lib/jobs/catalog";

/**
 * Invalidates a cached value. Subsystems emit `cache/invalidate` when a source
 * of truth changes (e.g. feature flag updated) so caches converge quickly.
 */
export const invalidateCache = inngest.createFunction(
  {
    id: "invalidate-cache",
    name: "Invalidate cache",
    triggers: [{ event: "cache/invalidate" }],
  },
  async ({ event }) => {
    const data = event.data as CacheInvalidateData;
    await cacheDelete(data.namespace, data.id);
    return { invalidated: true };
  },
);
