import { NextResponse, type NextRequest } from "next/server";

import { sanitizeNextPath } from "@/lib/auth/next-path";
import { createServerSupabaseClient } from "@/lib/supabase/server";

/**
 * Auth callback bridge. Handles the PKCE code exchange for OAuth (Google,
 * Microsoft), magic links, and email confirmations. This is the narrow auth
 * route exception — it is not a domain API.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = sanitizeNextPath(searchParams.get("next")) ?? "/dashboard";

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/login?error=Sorry, we could not sign you in. Please try again.`,
  );
}
