import type { CommunitySummary } from "@shared/dto/community.dto";

import { FALLBACK_LABEL } from "./constants";

export function getCommunitySlugFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/communities\/([^/]+)/);
  return match?.[1] ?? null;
}

export function resolveActiveCommunity({
  pathname,
  communities,
  activeCommunityName,
  activeSlug,
}: {
  pathname: string;
  communities: CommunitySummary[] | undefined;
  activeCommunityName: string | undefined;
  activeSlug: string | null;
}): { name: string; slug: string | null } {
  if (activeSlug && activeCommunityName) {
    return { name: activeCommunityName, slug: activeSlug };
  }

  const slugFromPath = getCommunitySlugFromPath(pathname);
  if (slugFromPath) {
    const fromList = communities?.find((c) => c.slug === slugFromPath);
    if (fromList) {
      return { name: fromList.name, slug: fromList.slug };
    }
  }

  const firstCommunity = communities?.[0];
  if (firstCommunity) {
    return { name: firstCommunity.name, slug: firstCommunity.slug };
  }

  return { name: FALLBACK_LABEL, slug: null };
}
