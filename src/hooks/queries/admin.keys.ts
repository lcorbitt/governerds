export const adminQueryKeyRoot = ["admin"] as const;

export const adminQueryKeys = {
  all: adminQueryKeyRoot,
  overview: () => [...adminQueryKeyRoot, "overview"] as const,
};
