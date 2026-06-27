import "server-only";

import type { EdgeFunctionSlug } from "@/config/edge-function-slugs";
import {
  executeEdgeFunctionFetch,
  type EdgeFetchOptions,
} from "@/lib/edge-function/request";
import { env } from "@/lib/env/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * Server-side Edge Function fetch for SSR prefetch. Reads the session from
 * request cookies via the Supabase server client.
 */
export async function edgeFunctionFetchServer<TResponse, TBody = unknown>(
  slug: EdgeFunctionSlug,
  options: EdgeFetchOptions<TBody> = {},
): Promise<TResponse> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return executeEdgeFunctionFetch<TResponse, TBody>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    session?.access_token,
    slug,
    options,
  );
}
