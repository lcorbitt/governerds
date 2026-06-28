/**
 * Validates an internal redirect path to prevent open redirects.
 */
export function sanitizeNextPath(
  next: string | null | undefined,
): string | null {
  if (!next) return null;
  if (!next.startsWith("/") || next.startsWith("//")) return null;
  return next;
}

export function buildAuthHref(
  basePath: "/login" | "/signup",
  nextPath: string | null,
): string {
  if (!nextPath) return basePath;
  return `${basePath}?next=${encodeURIComponent(nextPath)}`;
}
