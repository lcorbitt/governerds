/**
 * Dotenv loads blank `.env` entries as `""`. Optional Zod fields expect
 * `undefined`, not empty strings — normalize before parsing.
 */
export function coerceBlankEnv(
  source: Record<string, string | undefined>,
): Record<string, string | undefined> {
  const out: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(source)) {
    out[key] = value?.trim() === "" ? undefined : value;
  }
  return out;
}
