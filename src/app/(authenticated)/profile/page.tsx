import { PrefetchBoundary } from "@/lib/query/prefetch-boundary";
import { prefetchProfileQuery } from "@/server/prefetch/profile";

import { Profile } from "./components/Profile";

/**
 * Profile page. Prefetches the current user's profile on the server so the
 * client feature shell hydrates with warm TanStack Query cache.
 */
export default async function ProfilePage() {
  return (
    <PrefetchBoundary prefetch={prefetchProfileQuery}>
      <Profile />
    </PrefetchBoundary>
  );
}
