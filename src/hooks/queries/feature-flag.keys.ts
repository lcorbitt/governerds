export const featureFlagQueryKeyRoot = ["feature-flag"] as const;

export const featureFlagQueryKeys = {
  byKey: (key: string) => [...featureFlagQueryKeyRoot, key] as const,
};
