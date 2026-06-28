/**
 * Pure access-control helpers. No I/O, no Deno/npm imports: single source of
 * truth for permission logic and unit-testable with Vitest.
 *
 * Permissions are strings in the form `resource:action` (e.g. `users:manage`).
 * A user's effective permissions are the union of permissions granted by all of
 * their roles.
 */
export interface RoleWithPermissions {
  slug: string;
  permissions: string[];
}

export function permissionKey(resource: string, action: string): string {
  return `${resource}:${action}`;
}

export function collectPermissions(roles: RoleWithPermissions[]): string[] {
  const set = new Set<string>();
  for (const role of roles) {
    for (const permission of role.permissions) {
      set.add(permission);
    }
  }
  return [...set];
}

export function hasPermission(
  effectivePermissions: string[],
  required: string,
): boolean {
  return effectivePermissions.includes(required);
}

export function isSuperAdminRole(roleSlugs: string[]): boolean {
  return roleSlugs.includes("super_admin");
}
