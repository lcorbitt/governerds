import { edgeFunctionFetch } from "@/lib/edge-function-fetch";
import { EDGE_FUNCTION_SLUGS } from "@/config/edge-function-slugs";
import type {
  CommunityDetail,
  ListCommunitiesResponse,
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
