import type { EdgeFunctionSlug } from "@/config/edge-function-slugs";
import { clientEnv } from "@/lib/env/client";
import { createClient } from "@/lib/supabase/client";

import {
  executeEdgeFunctionFetch,
  type EdgeFetchOptions,
} from "@/lib/edge-function/request";

/**
 * Browser-side Edge Function fetch. Attaches the caller's session token from
 * the Supabase browser client so RLS applies.
 */
export async function edgeFunctionFetch<TResponse, TBody = unknown>(
  slug: EdgeFunctionSlug,
  options: EdgeFetchOptions<TBody> = {},
): Promise<TResponse> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return executeEdgeFunctionFetch<TResponse, TBody>(
    clientEnv.NEXT_PUBLIC_SUPABASE_URL,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    session?.access_token,
    slug,
    options,
  );
}
