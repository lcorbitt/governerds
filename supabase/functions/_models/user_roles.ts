import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * All `.from("user_roles")` access lives here, including the nested read that
 * resolves a user's roles and their permissions in one round-trip.
 */
export interface UserRoleWithPermissions {
  slug: string;
  permissions: string[];
}

interface NestedRow {
  roles: {
    slug: string;
    role_permissions: Array<{
      permissions: { resource: string; action: string } | null;
    }>;
  } | null;
}

export async function getRolesWithPermissionsForUser(
  client: SupabaseClient,
  userId: string,
): Promise<UserRoleWithPermissions[]> {
  const { data, error } = await client
    .from("user_roles")
    .select("roles(slug, role_permissions(permissions(resource, action)))")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return ((data ?? []) as unknown as NestedRow[])
    .map((row) => row.roles)
    .filter((role): role is NonNullable<NestedRow["roles"]> => Boolean(role))
    .map((role) => ({
      slug: role.slug,
      permissions: role.role_permissions
        .map((rp) =>
          rp.permissions
            ? `${rp.permissions.resource}:${rp.permissions.action}`
            : null,
        )
        .filter((p): p is string => Boolean(p)),
    }));
}
