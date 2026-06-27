import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * All `.from("audit_logs")` access lives here.
 */
export interface AuditLogRow {
  id: string;
  actor_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  created_at: string;
}

export async function countAuditLogsSince(
  client: SupabaseClient,
  sinceIso: string,
): Promise<number> {
  const { count, error } = await client
    .from("audit_logs")
    .select("id", { count: "exact", head: true })
    .gte("created_at", sinceIso);

  if (error) throw new Error(error.message);
  return count ?? 0;
}

export async function listRecentAuditLogs(
  client: SupabaseClient,
  limit: number,
): Promise<AuditLogRow[]> {
  const { data, error } = await client
    .from("audit_logs")
    .select("id, actor_id, action, resource_type, resource_id, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []) as AuditLogRow[];
}
