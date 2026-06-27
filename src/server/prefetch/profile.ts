import "server-only";

import type { QueryClient } from "@tanstack/react-query";

import { EDGE_FUNCTION_SLUGS } from "@/config/edge-function-slugs";
import { profileQueryKeys } from "@/hooks/queries/profile.keys";
import { edgeFunctionFetchServer } from "@/lib/edge-function/fetch.server";
import type { ProfileResponse } from "@shared/dto/profile.dto";

export async function prefetchProfileQuery(
  queryClient: QueryClient,
): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey: profileQueryKeys.me(),
    queryFn: () =>
      edgeFunctionFetchServer<ProfileResponse>(EDGE_FUNCTION_SLUGS.getProfile),
  });
}
