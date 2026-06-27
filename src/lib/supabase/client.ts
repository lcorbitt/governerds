"use client";

import { createBrowserClient } from "@supabase/ssr";

import { clientEnv } from "@/lib/env/client";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Browser Supabase client. Used only for auth session handling and Realtime
 * subscriptions. Domain reads/writes must go through Edge Functions via
 * `frontend/services`, never PostgREST directly.
 */
export function createClient() {
  return createBrowserClient<Database>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
