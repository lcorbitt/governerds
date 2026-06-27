import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * All `.from("communities")` access lives here. No cross-table orchestration.
 */
export interface CommunityRow {
  id: string;
  name: string;
  slug: string;
  settings: Record<string, unknown>;
}

const SUMMARY_COLUMNS = "id, name, slug";
const DETAIL_COLUMNS = "id, name, slug, settings";

export async function listCommunities(
  client: SupabaseClient,
): Promise<Pick<CommunityRow, "id" | "name" | "slug">[]> {
  const { data, error } = await client
    .from("communities")
    .select(SUMMARY_COLUMNS)
    .is("deleted_at", null)
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as Pick<CommunityRow, "id" | "name" | "slug">[];
}

export async function getCommunityBySlug(
  client: SupabaseClient,
  slug: string,
): Promise<CommunityRow | null> {
  const { data, error } = await client
    .from("communities")
    .select(DETAIL_COLUMNS)
    .eq("slug", slug)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as CommunityRow | null;
}
