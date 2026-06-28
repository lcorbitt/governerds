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

export async function insertCommunityMember(
  client: SupabaseClient,
  input: { communityId: string; userId: string; roleId: string },
): Promise<CommunityMemberRow> {
  const { data, error } = await client
    .from("community_members")
    .insert({
      community_id: input.communityId,
      user_id: input.userId,
      role_id: input.roleId,
    })
    .select("id, community_id, user_id, role_id")
    .single();

  if (error) throw new Error(error.message);
  return data as CommunityMemberRow;
}
