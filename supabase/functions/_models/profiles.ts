import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * All `.from("profiles")` access lives here. No cross-table orchestration.
 */
export interface ProfileRow {
  id: string;
  owner_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
}

const COLUMNS = "id, owner_id, display_name, avatar_url, bio";

export async function getProfileByOwnerId(
  client: SupabaseClient,
  ownerId: string,
): Promise<ProfileRow | null> {
  const { data, error } = await client
    .from("profiles")
    .select(COLUMNS)
    .eq("owner_id", ownerId)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as ProfileRow | null;
}

export async function updateProfileByOwnerId(
  client: SupabaseClient,
  ownerId: string,
  patch: { display_name?: string; bio?: string; avatar_url?: string },
): Promise<ProfileRow> {
  const { data, error } = await client
    .from("profiles")
    .update(patch)
    .eq("owner_id", ownerId)
    .select(COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return data as ProfileRow;
}

export async function countProfiles(client: SupabaseClient): Promise<number> {
  const { count, error } = await client
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .is("deleted_at", null);

  if (error) throw new Error(error.message);
  return count ?? 0;
}
