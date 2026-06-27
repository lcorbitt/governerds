/**
 * Pure feature-flag evaluation. No I/O, no Deno or npm imports, so it is the
 * single source of truth for flag logic AND is unit-testable with Vitest.
 *
 * Evaluation order (first match wins):
 *   1. Environment override
 *   2. User target
 *   3. Role target
 *   4. Community target
 *   5. Percentage rollout (deterministic hash of userId + flag key)
 *   6. Default value
 */
export type FlagType = "boolean" | "percentage" | "targeted";
export type FlagTargetType = "user" | "role" | "community";

export interface FlagDefinition {
  key: string;
  type: FlagType;
  defaultValue: boolean;
  rolloutPercentage: number;
  isActive: boolean;
  environments: Record<string, boolean>;
}

export interface FlagTarget {
  targetType: FlagTargetType;
  targetId: string;
  value: boolean;
}

export interface EvaluationContext {
  environment: string;
  userId?: string | null;
  roleSlugs?: string[];
  communityId?: string | null;
}

/**
 * Deterministic 0-99 bucket from a string. Stable across runs so a user keeps
 * the same rollout decision for a given flag.
 */
export function bucketFor(seed: string): number {
  let hash = 5381;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 33) ^ seed.charCodeAt(i);
  }
  return Math.abs(hash) % 100;
}

export function evaluateFlag(
  flag: FlagDefinition,
  targets: FlagTarget[],
  context: EvaluationContext,
): boolean {
  if (!flag.isActive) return false;

  // 1. Environment override
  if (
    Object.prototype.hasOwnProperty.call(flag.environments, context.environment)
  ) {
    return flag.environments[context.environment];
  }

  // 2. User target
  if (context.userId) {
    const userTarget = targets.find(
      (t) => t.targetType === "user" && t.targetId === context.userId,
    );
    if (userTarget) return userTarget.value;
  }

  // 3. Role target
  if (context.roleSlugs && context.roleSlugs.length > 0) {
    const roleTarget = targets.find(
      (t) => t.targetType === "role" && context.roleSlugs!.includes(t.targetId),
    );
    if (roleTarget) return roleTarget.value;
  }

  // 4. Community target
  if (context.communityId) {
    const communityTarget = targets.find(
      (t) => t.targetType === "community" && t.targetId === context.communityId,
    );
    if (communityTarget) return communityTarget.value;
  }

  // 5. Percentage rollout
  if (flag.type === "percentage" && context.userId) {
    return bucketFor(`${context.userId}:${flag.key}`) < flag.rolloutPercentage;
  }

  // 6. Default
  return flag.defaultValue;
}
