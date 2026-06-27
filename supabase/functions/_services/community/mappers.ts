import type { CommunityRow } from "@models/communities.ts";
import type {
  CommunityDetail,
  CommunitySummary,
} from "@shared/dto/community.dto.ts";

/**
 * Pure mapping between community rows and wire DTOs.
 */
export function toSummary(
  row: Pick<CommunityRow, "id" | "name" | "slug">,
): CommunitySummary {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
  };
}

export function toDetail(row: CommunityRow): CommunityDetail {
  return {
    ...toSummary(row),
    settings: row.settings ?? {},
  };
}
