import { useCommunitiesQuery } from "@/hooks/queries/useCommunity";

/**
 * Orchestration for the communities list page.
 */
export function useCommunities() {
  const communitiesQuery = useCommunitiesQuery();

  return {
    communitiesQuery,
  };
}
