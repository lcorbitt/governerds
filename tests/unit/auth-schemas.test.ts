import { describe, expect, it } from "vitest";

import { loginSchema, signupSchema } from "@/lib/auth/schemas";

describe("auth schemas", () => {
  it("rejects an invalid email with a plain-language message", () => {
    const result = loginSchema.safeParse({ email: "nope", password: "x" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "";
      expect(message).toMatch(/valid email/i);
      expect(message).not.toMatch(/regex|pattern/i);
    }
  });

  it("requires passwords of at least 8 characters on signup", () => {
    const result = signupSchema.safeParse({
      email: "person@example.com",
      password: "short",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toMatch(/8 characters/i);
    }
  });

  it("accepts valid credentials", () => {
    expect(
      signupSchema.safeParse({
        email: "person@example.com",
        password: "longenough",
      }).success,
    ).toBe(true);
  });
});
