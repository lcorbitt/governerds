import { edgeFunctionFetch } from "@/lib/edge-function-fetch";
import { EDGE_FUNCTION_SLUGS } from "@/config/edge-function-slugs";
import type { PermissionsResponse } from "@shared/dto/access-control.dto";

/**
 * Browser-side adapter for the current user's roles and permissions. The server
 * always re-checks permissions on mutations; this read only drives UI affordances.
 */
export function getPermissions(): Promise<PermissionsResponse> {
  return edgeFunctionFetch<PermissionsResponse>(
    EDGE_FUNCTION_SLUGS.getPermissions,
  );
}
