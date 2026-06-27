import { useQuery } from "@tanstack/react-query";

import { getPermissions } from "@/frontend/services/access-control.service";

const permissionsQueryKeyRoot = ["permissions"] as const;

export const permissionsQueryKeys = {
  all: permissionsQueryKeyRoot,
  me: () => [...permissionsQueryKeyRoot, "me"] as const,
};

/**
 * Permissions reads for UI affordances. Server-side authorization still runs
 * on every mutation via Edge Functions.
 */
export function usePermissionsQuery() {
  return useQuery({
    queryKey: permissionsQueryKeys.me(),
    queryFn: getPermissions,
  });
}
