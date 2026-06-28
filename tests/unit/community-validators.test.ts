import { describe, expect, it } from "vitest";

import {
  isValidCommunitySlug,
  normalizeCommunityEmail,
  suggestSlugFromName,
} from "../../supabase/functions/_services/community/validators";

describe("community validators", () => {
  it("suggests a slug from a community name", () => {
    expect(suggestSlugFromName("GoverNerds HQ")).toBe("governerds-hq");
  });

  it("validates slug format", () => {
    expect(isValidCommunitySlug("governerds-hq")).toBe(true);
    expect(isValidCommunitySlug("ab")).toBe(false);
    expect(isValidCommunitySlug("Bad Slug")).toBe(false);
  });

  it("normalizes invite emails", () => {
    expect(normalizeCommunityEmail("  Member@Local.Test ")).toBe(
      "member@local.test",
    );
  });
});
