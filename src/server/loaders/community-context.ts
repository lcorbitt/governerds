import "server-only";

/**
 * Returns the active community slug from the URL path when present. A fuller
 * cookie- or session-backed context loader can replace this when community-
 * scoped shells and routes ship.
 */
export function getActiveCommunitySlug(pathname: string): string | null {
  const match = pathname.match(/^\/communities\/([^/]+)/);
  return match?.[1] ?? null;
}
