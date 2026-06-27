export const profileQueryKeyRoot = ["profile"] as const;

export const profileQueryKeys = {
  me: () => [...profileQueryKeyRoot, "me"] as const,
};
