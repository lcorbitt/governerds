export const ADMIN_COMMUNITY_MEMBER_SORT_COLUMNS = [
  "joined_at",
  "community_name",
  "member_name",
  "member_email",
  "role_slug",
] as const;

export type AdminCommunityMemberSortColumn =
  (typeof ADMIN_COMMUNITY_MEMBER_SORT_COLUMNS)[number];

export function normalizeAdminCommunityMemberSortColumn(
  raw: string,
): AdminCommunityMemberSortColumn {
  return ADMIN_COMMUNITY_MEMBER_SORT_COLUMNS.includes(
    raw as AdminCommunityMemberSortColumn,
  )
    ? (raw as AdminCommunityMemberSortColumn)
    : "joined_at";
}

export function defaultSortDirectionForAdminCommunityMemberColumn(
  column: AdminCommunityMemberSortColumn,
): "asc" | "desc" {
  return column === "joined_at" ? "desc" : "asc";
}

export function formatMemberJoinedAt(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  moderator: "Moderator",
  member: "Member",
};

const ROLE_DISPLAY_ORDER = [
  "super_admin",
  "admin",
  "moderator",
  "member",
] as const;

function formatRoleSlug(slug: string): string {
  return (
    ROLE_LABELS[slug] ??
    slug
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export function formatCommunityRoleSlug(slug: string): string {
  return formatRoleSlug(slug);
}

export function formatMemberRoleSlugs(
  communityRoleSlug: string,
  platformRoleSlugs: string[],
): string {
  const all = new Set([communityRoleSlug, ...platformRoleSlugs]);
  const ordered = ROLE_DISPLAY_ORDER.filter((slug) => all.has(slug));

  if (ordered.length === 0) {
    return "Member";
  }

  const display =
    ordered.length > 1 ? ordered.filter((slug) => slug !== "member") : ordered;

  return display.map(formatRoleSlug).join(", ");
}
