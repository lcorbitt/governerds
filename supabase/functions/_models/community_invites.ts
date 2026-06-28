import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * All `.from("community_invites")` access lives here. No cross-table orchestration.
 */
export interface CommunityInviteRow {
  id: string;
  community_id: string;
  email: string;
  invited_by: string;
  token_hash: string;
  expires_at: string;
  accepted_at: string | null;
  accepted_by: string | null;
  created_at: string;
}

const COLUMNS =
  "id, community_id, email, invited_by, token_hash, expires_at, accepted_at, accepted_by, created_at";

export async function insertInvite(
  client: SupabaseClient,
  input: {
    communityId: string;
    email: string;
    invitedBy: string;
    tokenHash: string;
    expiresAt: string;
  },
): Promise<CommunityInviteRow> {
  const { data, error } = await client
    .from("community_invites")
    .insert({
      community_id: input.communityId,
      email: input.email,
      invited_by: input.invitedBy,
      token_hash: input.tokenHash,
      expires_at: input.expiresAt,
    })
    .select(COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return data as CommunityInviteRow;
}

export async function findPendingByTokenHash(
  client: SupabaseClient,
  tokenHash: string,
): Promise<CommunityInviteRow | null> {
  const { data, error } = await client
    .from("community_invites")
    .select(COLUMNS)
    .eq("token_hash", tokenHash)
    .is("accepted_at", null)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as CommunityInviteRow | null;
}

export async function findPendingByCommunityAndEmail(
  client: SupabaseClient,
  communityId: string,
  email: string,
): Promise<CommunityInviteRow | null> {
  const { data, error } = await client
    .from("community_invites")
    .select(COLUMNS)
    .eq("community_id", communityId)
    .ilike("email", email)
    .is("accepted_at", null)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as CommunityInviteRow | null;
}

export async function markAccepted(
  client: SupabaseClient,
  inviteId: string,
  acceptedBy: string,
): Promise<void> {
  const { error } = await client
    .from("community_invites")
    .update({
      accepted_at: new Date().toISOString(),
      accepted_by: acceptedBy,
    })
    .eq("id", inviteId);

  if (error) throw new Error(error.message);
}

export async function getAuthUserIdByEmail(
  client: SupabaseClient,
  email: string,
): Promise<string | null> {
  const { data, error } = await client.rpc("get_auth_user_id_by_email", {
    p_email: email,
  });

  if (error) throw new Error(error.message);
  return (data as string | null) ?? null;
}
