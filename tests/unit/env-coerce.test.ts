import { describe, expect, it } from "vitest";

import { coerceBlankEnv } from "@/lib/env/coerce";

describe("coerceBlankEnv", () => {
  it("turns blank strings into undefined", () => {
    expect(
      coerceBlankEnv({
        SENTRY_DSN: "",
        INNGEST_SIGNING_KEY: "   ",
        NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54521",
      }),
    ).toEqual({
      SENTRY_DSN: undefined,
      INNGEST_SIGNING_KEY: undefined,
      NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54521",
    });
  });
});
