import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * All `.from("analytics_events")` access lives here.
 */
export interface AnalyticsEventRow {
  id: string;
  event_name: string;
  user_id: string | null;
  environment: string;
  created_at: string;
}

export async function countAnalyticsEventsSince(
  client: SupabaseClient,
  sinceIso: string,
): Promise<number> {
  const { count, error } = await client
    .from("analytics_events")
    .select("id", { count: "exact", head: true })
    .gte("created_at", sinceIso);

  if (error) throw new Error(error.message);
  return count ?? 0;
}

export async function listRecentAnalyticsEvents(
  client: SupabaseClient,
  limit: number,
): Promise<AnalyticsEventRow[]> {
  const { data, error } = await client
    .from("analytics_events")
    .select("id, event_name, user_id, environment, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []) as AnalyticsEventRow[];
}
