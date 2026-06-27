import { edgeFunctionFetch } from "@/lib/edge-function-fetch";
import { EDGE_FUNCTION_SLUGS } from "@/config/edge-function-slugs";
import type { AdminOverviewResponse } from "@shared/dto/admin.dto";

export function getAdminOverview(): Promise<AdminOverviewResponse> {
  return edgeFunctionFetch<AdminOverviewResponse>(
    EDGE_FUNCTION_SLUGS.getAdminOverview,
  );
}
