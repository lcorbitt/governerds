import "server-only";

import { redirect } from "next/navigation";

import { requireSession, type SessionContext } from "@/server/loaders/session";

const ADMIN_ROLES = ["admin", "super_admin"];
export const SUPER_ADMIN_ROLE = "super_admin";

/**
 * Requires the current user to hold an admin role, or redirects them to their
 * home. Used by the nested `admin/layout.tsx` to gate the admin subtree.
 */
export async function requireAdmin(): Promise<SessionContext> {
  const session = await requireSession();
  const isAdmin = session.roleSlugs.some((slug) => ADMIN_ROLES.includes(slug));
  if (!isAdmin) redirect("/dashboard");
  return session;
}

/**
 * Requires the super_admin role for analytics-focused admin routes.
 */
export async function requireSuperAdmin(): Promise<SessionContext> {
  const session = await requireSession();
  if (!isSuperAdmin(session)) redirect("/admin/flags");
  return session;
}

export function isSuperAdmin(session: SessionContext): boolean {
  return session.roleSlugs.includes(SUPER_ADMIN_ROLE);
}

export function isAdmin(session: SessionContext): boolean {
  return session.roleSlugs.some((slug) => ADMIN_ROLES.includes(slug));
}
