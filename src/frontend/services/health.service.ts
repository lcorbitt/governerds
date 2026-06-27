import { edgeFunctionFetch } from "@/lib/edge-function-fetch";
import { EDGE_FUNCTION_SLUGS } from "@/config/edge-function-slugs";
import type { HealthResponse } from "@shared/dto/health.dto";

/**
 * Browser-side adapter for the platform health check.
 */
export function getHealth(): Promise<HealthResponse> {
  return edgeFunctionFetch<HealthResponse>(EDGE_FUNCTION_SLUGS.getHealth);
}
