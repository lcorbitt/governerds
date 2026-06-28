export const communityQueryKeyRoot = ["community"] as const;

export const communityQueryKeys = {
  list: () => [...communityQueryKeyRoot, "list"] as const,
  detail: (slug: string) => [...communityQueryKeyRoot, "detail", slug] as const,
  adminList: () => [...communityQueryKeyRoot, "admin", "list"] as const,
};
