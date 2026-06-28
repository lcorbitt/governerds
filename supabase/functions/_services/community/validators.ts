/**
 * Pure slug helpers for community creation. Shared by service validation and tests.
 */
const SLUG_PATTERN = /^[a-z0-9-]+$/;

export function suggestSlugFromName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

export function isValidCommunitySlug(slug: string): boolean {
  return slug.length >= 3 && slug.length <= 50 && SLUG_PATTERN.test(slug);
}

export function normalizeCommunityEmail(email: string): string {
  return email.trim().toLowerCase();
}
