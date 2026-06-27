import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * DB client factories for Edge Functions.
 *
 *  - User client: anon key + caller JWT. RLS applies. Use for all reads/writes
 *    that should respect row-level security.
 *  - Service client: service-role key, bypasses RLS. Use ONLY after an explicit
 *    authorization check in a service.
 */
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

export function createUserClient(authHeader: string | null): SupabaseClient {
  return createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: authHeader ? { Authorization: authHeader } : {} },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function createServiceClient(): SupabaseClient {
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
