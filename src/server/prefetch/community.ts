import "server-only";

import type { QueryClient } from "@tanstack/react-query";

import { EDGE_FUNCTION_SLUGS } from "@/config/edge-function-slugs";
import { communityQueryKeys } from "@/hooks/queries/community.keys";
import { edgeFunctionFetchServer } from "@/lib/edge-function/fetch.server";
import type {
  CommunityDetail,
  ListCommunitiesResponse,
} from "@shared/dto/community.dto";

export async function prefetchCommunitiesQuery(
  queryClient: QueryClient,
): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey: communityQueryKeys.list(),
    queryFn: () =>
      edgeFunctionFetchServer<ListCommunitiesResponse>(
        EDGE_FUNCTION_SLUGS.listCommunities,
      ),
  });
}

export async function prefetchCommunityQuery(
  queryClient: QueryClient,
  slug: string,
): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey: communityQueryKeys.detail(slug),
    queryFn: () =>
      edgeFunctionFetchServer<CommunityDetail>(
        EDGE_FUNCTION_SLUGS.getCommunity,
        { query: { slug } },
      ),
  });
}
