import { edgeFunctionFetch } from "@/lib/edge-function-fetch";
import { EDGE_FUNCTION_SLUGS } from "@/config/edge-function-slugs";
import type { FeatureFlagResponse } from "@shared/dto/feature-flag.dto";

/**
 * Browser-side adapter for evaluating a feature flag for the current user.
 */
export function getFeatureFlag(key: string): Promise<FeatureFlagResponse> {
  return edgeFunctionFetch<FeatureFlagResponse>(
    EDGE_FUNCTION_SLUGS.getFeatureFlag,
    { query: { key } },
  );
}
