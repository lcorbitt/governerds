import {
  ADMIN_ROLE_LABEL,
  DISPLAY_NAME_FALLBACK,
  MEMBER_ROLE_LABEL,
  SUPER_ADMIN_ROLE_LABEL,
} from "./constants";

export function resolveDisplayName(
  displayName: string | null | undefined,
): string {
  const trimmed = displayName?.trim();
  return trimmed || DISPLAY_NAME_FALLBACK;
}

export function resolveRoleLabel(
  isSuperAdmin: boolean,
  isAdmin: boolean,
): string {
  if (isSuperAdmin) return SUPER_ADMIN_ROLE_LABEL;
  if (isAdmin) return ADMIN_ROLE_LABEL;
  return MEMBER_ROLE_LABEL;
}
