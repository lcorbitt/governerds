import { describe, expect, it } from "vitest";

import { formatLoadingMessage } from "@/components/shared/LoadingState/constants";

describe("formatLoadingMessage", () => {
  it("builds a sentence-case loading label for a resource name", () => {
    expect(formatLoadingMessage("users")).toBe("Loading users…");
  });
});
