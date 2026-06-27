import { useQuery } from "@tanstack/react-query";

import { getAdminOverview } from "@/frontend/services/admin.service";
import { adminQueryKeys } from "@/hooks/queries/admin.keys";

export { adminQueryKeys };

export function useAdminOverviewQuery() {
  return useQuery({
    queryKey: adminQueryKeys.overview(),
    queryFn: getAdminOverview,
  });
}
