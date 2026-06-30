export function getFallbackInitial(
  displayName: string | null | undefined,
): string {
  const trimmed = displayName?.trim();
  if (!trimmed) return "?";
  return trimmed.charAt(0).toUpperCase();
}
