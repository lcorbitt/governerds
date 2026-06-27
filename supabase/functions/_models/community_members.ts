import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * All `.from("community_members")` access lives here. No cross-table orchestration.
 */
export interface CommunityMemberRow {
  id: string;
  community_id: string;
  user_id: string;
  role_id: string;
}

export async function hasCommunityMembership(
  client: SupabaseClient,
  userId: string,
  communityId: string,
): Promise<boolean> {
  const { data, error } = await client
    .from("community_members")
    .select("id")
    .eq("user_id", userId)
    .eq("community_id", communityId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data !== null;
}
