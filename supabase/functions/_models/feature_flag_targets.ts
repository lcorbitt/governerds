import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * All `.from("feature_flag_targets")` access lives here.
 */
export interface FeatureFlagTargetRow {
  target_type: "user" | "role" | "community";
  target_id: string;
  value: boolean;
}

export async function getTargetsForFlag(
  client: SupabaseClient,
  flagId: string,
): Promise<FeatureFlagTargetRow[]> {
  const { data, error } = await client
    .from("feature_flag_targets")
    .select("target_type, target_id, value")
    .eq("flag_id", flagId);

  if (error) throw new Error(error.message);
  return (data ?? []) as FeatureFlagTargetRow[];
}
