import { inngest } from "@/lib/providers/jobs/client";
import { createAdminClient } from "@/lib/supabase/admin";
import { env } from "@/lib/env/server";
import { captureServerEvent } from "@/lib/providers/analytics";
import type { Json } from "@/lib/supabase/database.types";
import type { AnalyticsTrackData } from "@/lib/jobs/catalog";

/**
 * Records an infrastructure analytics event both to our own `analytics_events`
 * table (durable, queryable) and to PostHog (dashboards). Product analytics are
 * intentionally out of scope for the foundation.
 */
export const trackAnalytics = inngest.createFunction(
  {
    id: "track-analytics",
    name: "Track analytics event",
    triggers: [{ event: "analytics/track" }],
  },
  async ({ event }) => {
    const data = event.data as AnalyticsTrackData;
    const supabase = createAdminClient();
    const { error } = await supabase.from("analytics_events").insert({
      event_name: data.eventName,
      user_id: data.userId ?? null,
      session_id: data.sessionId ?? null,
      properties: (data.properties ?? {}) as Json,
      environment: env.APP_ENV,
    });

    if (error) throw new Error(`Failed to record analytics: ${error.message}`);

    await captureServerEvent({
      event: data.eventName,
      distinctId: data.userId ?? data.sessionId ?? "anonymous",
      properties: data.properties,
    });

    return { tracked: true };
  },
);
