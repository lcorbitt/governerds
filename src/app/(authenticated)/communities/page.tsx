import { PrefetchBoundary } from "@/lib/query/prefetch-boundary";
import { prefetchCommunitiesQuery } from "@/server/prefetch/community";

import { Communities } from "./components/Communities";

/**
 * Communities list page. Prefetches the caller's communities on the server so
 * the client feature shell hydrates with warm TanStack Query cache.
 */
export default async function CommunitiesPage() {
  return (
    <PrefetchBoundary prefetch={prefetchCommunitiesQuery}>
      <Communities />
    </PrefetchBoundary>
  );
}
