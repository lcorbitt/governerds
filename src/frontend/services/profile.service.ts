import { edgeFunctionFetch } from "@/lib/edge-function-fetch";
import { EDGE_FUNCTION_SLUGS } from "@/config/edge-function-slugs";
import type {
  ProfileResponse,
  UpdateProfileBody,
} from "@shared/dto/profile.dto";

/**
 * Browser-side HTTP adapters for the profile domain. No React here — these are
 * called only by TanStack Query hooks.
 */
export function getProfile(): Promise<ProfileResponse> {
  return edgeFunctionFetch<ProfileResponse>(EDGE_FUNCTION_SLUGS.getProfile);
}

export function updateProfile(
  body: UpdateProfileBody,
): Promise<ProfileResponse> {
  return edgeFunctionFetch<ProfileResponse, UpdateProfileBody>(
    EDGE_FUNCTION_SLUGS.updateProfile,
    { method: "PATCH", body },
  );
}
