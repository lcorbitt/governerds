import "server-only";

import type { QueryClient } from "@tanstack/react-query";

import {
  prefetchAdminCommunitiesQuery,
  prefetchCommunitiesQuery,
} from "@/server/prefetch/community";
import { prefetchNotificationsQuery } from "@/server/prefetch/notifications";
import { prefetchProfileQuery } from "@/server/prefetch/profile";

export async function prefetchAuthenticatedShellQueries(
  queryClient: QueryClient,
  isSuperAdmin: boolean,
): Promise<void> {
  await Promise.all([
    isSuperAdmin
      ? prefetchAdminCommunitiesQuery(queryClient)
      : prefetchCommunitiesQuery(queryClient),
    prefetchNotificationsQuery(queryClient),
    prefetchProfileQuery(queryClient),
  ]);
}
