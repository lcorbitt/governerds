import { useQuery } from "@tanstack/react-query";

import { getFeatureFlag } from "@/frontend/services/feature-flag.service";
import {
  featureFlagQueryKeyRoot,
  featureFlagQueryKeys,
} from "@/hooks/queries/feature-flag.keys";

export { featureFlagQueryKeyRoot, featureFlagQueryKeys };

/**
 * Feature flag evaluation for the current user.
 */
export function useFeatureFlagQuery(key: string) {
  return useQuery({
    queryKey: featureFlagQueryKeys.byKey(key),
    queryFn: () => getFeatureFlag(key),
    staleTime: 60_000,
  });
}
