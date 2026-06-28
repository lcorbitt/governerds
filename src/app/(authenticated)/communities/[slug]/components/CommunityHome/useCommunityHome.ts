import { useParams } from "next/navigation";

import { useCommunityQuery } from "@/hooks/queries/useCommunity";
import { EdgeFunctionError } from "@/lib/edge-function-fetch";

/**
 * Orchestration for a single community home page.
 */
export function useCommunityHome() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const communityQuery = useCommunityQuery(slug);

  const isNotFound =
    communityQuery.error instanceof EdgeFunctionError &&
    communityQuery.error.status === 404;

  return {
    slug,
    communityQuery,
    isNotFound,
  };
}
