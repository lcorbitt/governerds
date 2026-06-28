import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * All `.from("roles")` access lives here. No cross-table orchestration.
 */
export async function getRoleIdBySlug(
  client: SupabaseClient,
  slug: string,
): Promise<string | null> {
  const { data, error } = await client
    .from("roles")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data?.id ?? null;
}
