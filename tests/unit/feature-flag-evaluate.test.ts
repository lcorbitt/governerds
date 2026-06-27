import { describe, expect, it } from "vitest";

import {
  bucketFor,
  evaluateFlag,
  type FlagDefinition,
  type FlagTarget,
} from "../../supabase/functions/_services/feature-flag/evaluate";

const baseFlag: FlagDefinition = {
  key: "test-flag",
  type: "boolean",
  defaultValue: false,
  rolloutPercentage: 0,
  isActive: true,
  environments: {},
};

describe("evaluateFlag", () => {
  it("returns false when the flag is inactive", () => {
    expect(
      evaluateFlag({ ...baseFlag, isActive: false, defaultValue: true }, [], {
        environment: "local",
      }),
    ).toBe(false);
  });

  it("respects an environment override before anything else", () => {
    const flag = { ...baseFlag, environments: { production: true } };
    expect(evaluateFlag(flag, [], { environment: "production" })).toBe(true);
    expect(evaluateFlag(flag, [], { environment: "local" })).toBe(false);
  });

  it("applies a user target over the default", () => {
    const targets: FlagTarget[] = [
      { targetType: "user", targetId: "user-1", value: true },
    ];
    expect(
      evaluateFlag(baseFlag, targets, {
        environment: "local",
        userId: "user-1",
      }),
    ).toBe(true);
  });

  it("applies a role target when the user holds the role", () => {
    const targets: FlagTarget[] = [
      { targetType: "role", targetId: "admin", value: true },
    ];
    expect(
      evaluateFlag(baseFlag, targets, {
        environment: "local",
        userId: "user-1",
        roleSlugs: ["member", "admin"],
      }),
    ).toBe(true);
  });

  it("falls back to the default value", () => {
    expect(
      evaluateFlag({ ...baseFlag, defaultValue: true }, [], {
        environment: "local",
      }),
    ).toBe(true);
  });

  it("buckets percentage rollouts deterministically", () => {
    const flag: FlagDefinition = {
      ...baseFlag,
      type: "percentage",
      rolloutPercentage: 100,
    };
    expect(
      evaluateFlag(flag, [], { environment: "local", userId: "user-1" }),
    ).toBe(true);

    const zero: FlagDefinition = { ...flag, rolloutPercentage: 0 };
    expect(
      evaluateFlag(zero, [], { environment: "local", userId: "user-1" }),
    ).toBe(false);
  });

  it("produces a stable bucket for the same seed", () => {
    expect(bucketFor("user-1:test-flag")).toBe(bucketFor("user-1:test-flag"));
    expect(bucketFor("user-1:test-flag")).toBeGreaterThanOrEqual(0);
    expect(bucketFor("user-1:test-flag")).toBeLessThan(100);
  });
});
