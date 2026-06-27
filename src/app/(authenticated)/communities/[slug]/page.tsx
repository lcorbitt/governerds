import { PrefetchBoundary } from "@/lib/query/prefetch-boundary";
import { prefetchCommunityQuery } from "@/server/prefetch/community";

import { CommunityHome } from "./components/CommunityHome";

interface CommunityPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Community home page. Prefetches the community by slug on the server so the
 * client feature shell hydrates with warm TanStack Query cache.
 */
export default async function CommunityPage({ params }: CommunityPageProps) {
  const { slug } = await params;

  return (
    <PrefetchBoundary
      prefetch={(queryClient) => prefetchCommunityQuery(queryClient, slug)}
    >
      <CommunityHome />
    </PrefetchBoundary>
  );
}
