import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * All `.from("feature_flags")` access lives here.
 */
export interface FeatureFlagRow {
  id: string;
  key: string;
  type: "boolean" | "percentage" | "targeted";
  default_value: boolean;
  rollout_percentage: number;
  is_active: boolean;
  environments: Record<string, boolean>;
}

export async function getFeatureFlagByKey(
  client: SupabaseClient,
  key: string,
): Promise<FeatureFlagRow | null> {
  const { data, error } = await client
    .from("feature_flags")
    .select(
      "id, key, type, default_value, rollout_percentage, is_active, environments",
    )
    .eq("key", key)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as FeatureFlagRow | null;
}
