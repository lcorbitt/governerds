import type { SupabaseClient } from "@supabase/supabase-js";

import { getCommunityBySlug, listCommunities } from "@models/communities.ts";
import { hasCommunityMembership } from "@models/community_members.ts";
import type {
  CommunityDetail,
  ListCommunitiesResponse,
} from "@shared/dto/community.dto.ts";

import { toDetail, toSummary } from "./mappers.ts";

/**
 * Community read use cases. Uses the caller's RLS-bound client so membership
 * rules apply at the database layer.
 */
export async function listCommunitiesForUser(
  client: SupabaseClient,
): Promise<ListCommunitiesResponse> {
  const rows = await listCommunities(client);
  return {
    communities: rows.map(toSummary),
  };
}

export async function getCommunityBySlugForUser(
  client: SupabaseClient,
  userId: string,
  slug: string,
): Promise<CommunityDetail | null> {
  const row = await getCommunityBySlug(client, slug);
  if (!row) return null;

  const isMember = await hasCommunityMembership(client, userId, row.id);
  if (!isMember) return null;

  return toDetail(row);
}
