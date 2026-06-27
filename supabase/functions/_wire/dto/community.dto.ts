/**
 * Wire contracts for community endpoints. Pure types, shared across runtimes.
 */
export interface CommunitySummary {
  id: string;
  name: string;
  slug: string;
}

export interface CommunityDetail extends CommunitySummary {
  settings: Record<string, unknown>;
}

export interface ListCommunitiesResponse {
  communities: CommunitySummary[];
}
