import { describe, expect, it } from "vitest";

import { getAuthErrorMessage, isAuthLikeError } from "@/lib/auth/user-message";
import { getUserErrorMessage } from "@/lib/toast/user-message";

function authError(code: string, message = code, status?: number) {
  return { code, message, status, name: "AuthApiError" };
}

describe("getAuthErrorMessage", () => {
  it("maps duplicate email codes to a login hint", () => {
    expect(
      getAuthErrorMessage(authError("user_already_exists"), "fallback"),
    ).toContain("already registered");
    expect(
      getAuthErrorMessage(authError("email_exists"), "fallback"),
    ).toContain("already registered");
  });

  it("maps email rate limits to a wait message", () => {
    expect(
      getAuthErrorMessage(
        authError("over_email_send_rate_limit", "email rate limit exceeded"),
        "fallback",
      ),
    ).toContain("wait about an hour");
  });

  it("maps HTTP 429 without a known code", () => {
    expect(
      getAuthErrorMessage(
        authError("unexpected_failure", "too many requests", 429),
        "fallback",
      ),
    ).toContain("Too many attempts");
  });

  it("maps invalid credentials for login", () => {
    expect(
      getAuthErrorMessage(authError("invalid_credentials"), "fallback"),
    ).toContain("did not match");
  });

  it("maps unconfirmed email", () => {
    expect(
      getAuthErrorMessage(authError("email_not_confirmed"), "fallback"),
    ).toContain("confirm your email");
  });

  it("falls back for unknown auth errors", () => {
    expect(
      getAuthErrorMessage(authError("mystery_code"), "Please try again."),
    ).toBe("Please try again.");
  });

  it("falls back for non-auth errors", () => {
    expect(getAuthErrorMessage(new Error("network"), "Please try again.")).toBe(
      "Please try again.",
    );
  });
});

describe("isAuthLikeError", () => {
  it("detects coded auth failures", () => {
    expect(isAuthLikeError(authError("invalid_credentials"))).toBe(true);
  });

  it("detects rate-limit status without a code", () => {
    expect(isAuthLikeError({ status: 429, message: "Too many requests" })).toBe(
      true,
    );
  });

  it("rejects unrelated errors", () => {
    expect(isAuthLikeError(new Error("boom"))).toBe(false);
  });
});

describe("getUserErrorMessage", () => {
  it("routes auth errors through the auth mapper", () => {
    expect(
      getUserErrorMessage(
        authError("over_email_send_rate_limit"),
        "We could not create your account. Please try again.",
      ),
    ).toContain("wait about an hour");
  });
});
