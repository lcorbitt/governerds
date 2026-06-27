import "server-only";

import type { QueryClient } from "@tanstack/react-query";

import { EDGE_FUNCTION_SLUGS } from "@/config/edge-function-slugs";
import { featureFlagQueryKeys } from "@/hooks/queries/feature-flag.keys";
import { edgeFunctionFetchServer } from "@/lib/edge-function/fetch.server";
import type { FeatureFlagResponse } from "@shared/dto/feature-flag.dto";

export async function prefetchFeatureFlagQuery(
  queryClient: QueryClient,
  key: string,
): Promise<void> {
  await queryClient.prefetchQuery({
    queryKey: featureFlagQueryKeys.byKey(key),
    queryFn: () =>
      edgeFunctionFetchServer<FeatureFlagResponse>(
        EDGE_FUNCTION_SLUGS.getFeatureFlag,
        { query: { key } },
      ),
    staleTime: 60_000,
  });
}
