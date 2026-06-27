import "server-only";

import { PostHog } from "posthog-node";

import { env } from "@/lib/env/server";

/**
 * Server-side PostHog client for infrastructure analytics only (login, signup,
 * page_view, flag_evaluated, error). Product analytics are intentionally out of
 * scope for the foundation. No-ops when PostHog is not configured.
 */
let client: PostHog | null | undefined;

function getClient(): PostHog | null {
  if (client !== undefined) return client;

  if (env.ANALYTICS_PROVIDER !== "posthog" || !env.POSTHOG_API_KEY) {
    client = null;
    return client;
  }

  client = new PostHog(env.POSTHOG_API_KEY, { host: env.POSTHOG_HOST });
  return client;
}

export async function captureServerEvent(params: {
  event: string;
  distinctId: string;
  properties?: Record<string, unknown>;
}): Promise<void> {
  const ph = getClient();
  if (!ph) return;

  ph.capture({
    distinctId: params.distinctId,
    event: params.event,
    properties: params.properties,
  });
  await ph.flush();
}
