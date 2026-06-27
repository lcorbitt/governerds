import "server-only";

import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface SessionContext {
  user: User;
  roleSlugs: string[];
}

/**
 * Reads the current session and the user's role slugs for SSR. Used by route
 * group layouts to gate access. Returns `null` when there is no session.
 *
 * Reading the session and roles directly via the Supabase server client (rather
 * than over HTTP) is the documented SSR exception: it avoids a round-trip for
 * the auth bootstrap that every authenticated page needs.
 */
export async function getSessionContext(): Promise<SessionContext | null> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("user_roles")
    .select("roles(slug)")
    .eq("user_id", user.id);

  // The nested relationship is not described in our hand-written Relationships,
  // so we narrow the shape explicitly here.
  const rows = (data ?? []) as unknown as Array<{
    roles: { slug: string } | null;
  }>;
  const roleSlugs = rows
    .map((row) => row.roles?.slug)
    .filter((slug): slug is string => Boolean(slug));

  return { user, roleSlugs };
}

/**
 * Requires an authenticated session or redirects to login. For use at the top
 * of `(authenticated)` group layouts.
 */
export async function requireSession(): Promise<SessionContext> {
  const session = await getSessionContext();
  if (!session) redirect("/login");
  return session;
}

/**
 * Redirects already-authenticated users away from auth pages (login, signup).
 */
export async function redirectIfAuthenticated(
  to = "/dashboard",
): Promise<void> {
  const session = await getSessionContext();
  if (session) redirect(to);
}
