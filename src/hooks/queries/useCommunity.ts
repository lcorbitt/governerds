import { useQuery, type QueryClient } from "@tanstack/react-query";

import {
  getCommunity,
  listCommunities,
} from "@/frontend/services/community.service";
import {
  communityQueryKeyRoot,
  communityQueryKeys,
} from "@/hooks/queries/community.keys";

export { communityQueryKeyRoot, communityQueryKeys };

/**
 * Community reads, query keys, and invalidation helpers.
 */
export function useCommunitiesQuery() {
  return useQuery({
    queryKey: communityQueryKeys.list(),
    queryFn: listCommunities,
  });
}

export function useCommunityQuery(slug: string) {
  return useQuery({
    queryKey: communityQueryKeys.detail(slug),
    queryFn: () => getCommunity(slug),
    enabled: slug.length > 0,
  });
}

export function invalidateCommunityQueries(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: communityQueryKeyRoot });
}
