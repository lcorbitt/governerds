import { useParams } from "next/navigation";

import { useCommunityQuery } from "@/hooks/queries/useCommunity";

/**
 * Orchestration for a single community home page.
 */
export function useCommunityHome() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const communityQuery = useCommunityQuery(slug);

  return {
    slug,
    communityQuery,
  };
}
