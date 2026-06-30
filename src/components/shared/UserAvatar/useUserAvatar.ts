"use client";

import { useProfileQuery } from "@/hooks/queries/useProfile";
import { resolveAvatarDisplayUrl } from "@/lib/profile/avatar-url";

import { getFallbackInitial } from "./utils";

export function useUserAvatar() {
  const profileQuery = useProfileQuery();
  const displayName = profileQuery.data?.displayName;
  const src = resolveAvatarDisplayUrl(
    profileQuery.data?.avatarUrl,
    profileQuery.data?.updatedAt,
  );

  return {
    src,
    fallbackInitial: getFallbackInitial(displayName),
  };
}
