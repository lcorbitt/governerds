import type { SupabaseClient } from "@supabase/supabase-js";

import { getFeatureFlagByKey } from "@models/feature_flags.ts";
import { getTargetsForFlag } from "@models/feature_flag_targets.ts";
import { loadEffectiveAccess } from "@services/access-control/access-control.service.ts";
import { evaluateFlag } from "./evaluate.ts";

/**
 * Feature-flag use case: evaluate a flag for the current user. Pulls the flag,
 * its targets, and the user's roles, then delegates to the pure evaluator.
 */
export async function evaluateFlagForUser(
  client: SupabaseClient,
  params: {
    key: string;
    environment: string;
    userId: string | null;
    communityId?: string | null;
  },
): Promise<boolean> {
  const flag = await getFeatureFlagByKey(client, params.key);
  if (!flag) return false;

  const targets = await getTargetsForFlag(client, flag.id);

  let roleSlugs: string[] = [];
  if (params.userId) {
    const access = await loadEffectiveAccess(client, params.userId);
    roleSlugs = access.roleSlugs;
  }

  return evaluateFlag(
    {
      key: flag.key,
      type: flag.type,
      defaultValue: flag.default_value,
      rolloutPercentage: flag.rollout_percentage,
      isActive: flag.is_active,
      environments: flag.environments ?? {},
    },
    targets.map((t) => ({
      targetType: t.target_type,
      targetId: t.target_id,
      value: t.value,
    })),
    {
      environment: params.environment,
      userId: params.userId,
      roleSlugs,
      communityId: params.communityId,
    },
  );
}
