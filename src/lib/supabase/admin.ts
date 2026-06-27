import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { env } from "@/lib/env/server";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Privileged service-role client that bypasses RLS. Use ONLY after an explicit
 * authorization check in a service. Never expose to the browser and never use
 * it to satisfy a request without first verifying the caller's permissions.
 */
export function createAdminClient() {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is required to create the admin client.",
    );
  }

  return createSupabaseClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
}
