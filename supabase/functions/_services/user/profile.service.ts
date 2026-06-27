import type { SupabaseClient } from "@supabase/supabase-js";

import {
  getProfileByOwnerId,
  updateProfileByOwnerId,
  type ProfileRow,
} from "@models/profiles.ts";
import { publishEvent } from "@services/events/publisher.ts";
import type {
  ProfileResponse,
  UpdateProfileBody,
} from "@shared/dto/profile.dto.ts";

const PATCH_KEY_TO_FIELD: Record<string, string> = {
  display_name: "displayName",
  bio: "bio",
  avatar_url: "avatarUrl",
};

/**
 * Profile use cases. Owns validation and mapping between DB rows and wire DTOs.
 * The caller's RLS-bound client is passed in so row security applies.
 */
function toResponse(row: ProfileRow): ProfileResponse {
  return {
    id: row.id,
    ownerId: row.owner_id,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    bio: row.bio,
  };
}

export async function getProfile(
  client: SupabaseClient,
  userId: string,
): Promise<ProfileResponse | null> {
  const row = await getProfileByOwnerId(client, userId);
  return row ? toResponse(row) : null;
}

export async function updateProfile(
  client: SupabaseClient,
  userId: string,
  body: UpdateProfileBody,
): Promise<ProfileResponse> {
  const patch: { display_name?: string; bio?: string; avatar_url?: string } =
    {};
  if (body.displayName !== undefined) patch.display_name = body.displayName;
  if (body.bio !== undefined) patch.bio = body.bio;
  if (body.avatarUrl !== undefined) patch.avatar_url = body.avatarUrl;

  const row = await updateProfileByOwnerId(client, userId, patch);
  const response = toResponse(row);

  const changedFields = Object.keys(patch).map(
    (key) => PATCH_KEY_TO_FIELD[key] ?? key,
  );

  await publishEvent({
    name: "profile/updated",
    data: {
      profileId: response.id,
      ownerId: response.ownerId,
      displayName: response.displayName,
      changedFields,
    },
  });

  return response;
}
