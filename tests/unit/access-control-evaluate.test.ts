import { describe, expect, it } from "vitest";

import {
  collectPermissions,
  hasPermission,
  permissionKey,
} from "../../supabase/functions/_services/access-control/evaluate";

describe("access control", () => {
  it("builds a resource:action key", () => {
    expect(permissionKey("users", "manage")).toBe("users:manage");
  });

  it("unions permissions across roles without duplicates", () => {
    const permissions = collectPermissions([
      { slug: "member", permissions: ["users:read"] },
      { slug: "admin", permissions: ["users:read", "users:manage"] },
    ]);
    expect(permissions.sort()).toEqual(["users:manage", "users:read"]);
  });

  it("checks for a specific permission", () => {
    const permissions = ["users:read", "admin:access"];
    expect(hasPermission(permissions, "admin:access")).toBe(true);
    expect(hasPermission(permissions, "users:manage")).toBe(false);
  });
});
