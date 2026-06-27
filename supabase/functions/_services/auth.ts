import { createUserClient } from "@services/db.ts";

/**
 * Resolves the authenticated user from the request Authorization header.
 * Returns null when there is no valid session. The returned client is bound to
 * the caller's JWT so RLS applies to any subsequent queries.
 */
export async function getAuthedUser(req: Request): Promise<{
  user: { id: string; email: string | null };
  userClient: ReturnType<typeof createUserClient>;
} | null> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;

  const userClient = createUserClient(authHeader);
  const { data, error } = await userClient.auth.getUser();
  if (error || !data.user) return null;

  return {
    user: { id: data.user.id, email: data.user.email ?? null },
    userClient,
  };
}
