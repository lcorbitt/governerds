import { edgeFunctionFetch } from "@/lib/edge-function-fetch";
import { EDGE_FUNCTION_SLUGS } from "@/config/edge-function-slugs";
import type {
  AcceptInviteBody,
  AcceptInviteResponse,
  AdminCommunitiesResponse,
  CommunityDetail,
  CreateCommunityBody,
  ListCommunitiesResponse,
  SendCommunityInviteBody,
  SendCommunityInviteResponse,
} from "@shared/dto/community.dto";

/**
 * Browser-side HTTP adapters for the community domain. No React here — these are
 * called only by TanStack Query hooks.
 */
export function listCommunities(): Promise<ListCommunitiesResponse> {
  return edgeFunctionFetch<ListCommunitiesResponse>(
    EDGE_FUNCTION_SLUGS.listCommunities,
  );
}

export function getCommunity(slug: string): Promise<CommunityDetail> {
  return edgeFunctionFetch<CommunityDetail>(EDGE_FUNCTION_SLUGS.getCommunity, {
    query: { slug },
  });
}

export function listAdminCommunities(): Promise<AdminCommunitiesResponse> {
  return edgeFunctionFetch<AdminCommunitiesResponse>(
    EDGE_FUNCTION_SLUGS.listAdminCommunities,
  );
}

export function createCommunity(
  body: CreateCommunityBody,
): Promise<CommunityDetail> {
  return edgeFunctionFetch<CommunityDetail, CreateCommunityBody>(
    EDGE_FUNCTION_SLUGS.createCommunity,
    { method: "POST", body },
  );
}

export function sendCommunityInvite(
  body: SendCommunityInviteBody,
): Promise<SendCommunityInviteResponse> {
  return edgeFunctionFetch<
    SendCommunityInviteResponse,
    SendCommunityInviteBody
  >(EDGE_FUNCTION_SLUGS.sendCommunityInvite, { method: "POST", body });
}

export function acceptInvite(
  body: AcceptInviteBody,
): Promise<AcceptInviteResponse> {
  return edgeFunctionFetch<AcceptInviteResponse, AcceptInviteBody>(
    EDGE_FUNCTION_SLUGS.acceptInvite,
    { method: "POST", body },
  );
}
