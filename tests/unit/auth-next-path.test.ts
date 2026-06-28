import { describe, expect, it } from "vitest";

import { buildAuthHref, sanitizeNextPath } from "@/lib/auth/next-path";

describe("auth next path helpers", () => {
  it("accepts safe internal paths", () => {
    expect(sanitizeNextPath("/invite/accept?token=abc")).toBe(
      "/invite/accept?token=abc",
    );
  });

  it("rejects external and protocol-relative paths", () => {
    expect(sanitizeNextPath("https://evil.test")).toBeNull();
    expect(sanitizeNextPath("//evil.test")).toBeNull();
  });

  it("builds login and signup links with next params", () => {
    expect(buildAuthHref("/login", "/invite/accept?token=abc")).toBe(
      "/login?next=%2Finvite%2Faccept%3Ftoken%3Dabc",
    );
  });
});
