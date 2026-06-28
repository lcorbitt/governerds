import type { SupabaseClient } from "@supabase/supabase-js";

import { getRolesWithPermissionsForUser } from "@models/user_roles.ts";
import {
  collectPermissions,
  hasPermission,
  isSuperAdminRole,
} from "./evaluate.ts";

/**
 * Authorization use cases. This is the single gate for permission checks in the
 * backend (OWASP A01: Broken Access Control). Handlers and other services call
 * these — they never query roles/permissions directly.
 */
export interface EffectiveAccess {
  roleSlugs: string[];
  permissions: string[];
}

export async function loadEffectiveAccess(
  client: SupabaseClient,
  userId: string,
): Promise<EffectiveAccess> {
  const roles = await getRolesWithPermissionsForUser(client, userId);
  return {
    roleSlugs: roles.map((r) => r.slug),
    permissions: collectPermissions(roles),
  };
}

export function checkPermission(
  access: EffectiveAccess,
  required: string,
): boolean {
  if (isSuperAdminRole(access.roleSlugs)) return true;
  return hasPermission(access.permissions, required);
}
