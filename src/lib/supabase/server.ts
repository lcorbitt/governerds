import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { env } from "@/lib/env/server";
import type { Database } from "@/lib/supabase/database.types";

/**
 * Server Supabase client bound to the request cookies. RLS applies because it
 * uses the anon key plus the caller's JWT. Use this in Server Components,
 * `server/loaders`, and the Next.js API route for Inngest.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` is called from a Server Component where cookies are
            // read-only. The session refresh in middleware handles writes, so
            // this is safe to ignore.
          }
        },
      },
    },
  );
}
