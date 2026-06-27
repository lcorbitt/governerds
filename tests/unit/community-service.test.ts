import { describe, expect, it } from "vitest";

import {
  toDetail,
  toSummary,
} from "../../supabase/functions/_services/community/mappers";

describe("community mappers", () => {
  it("maps a community row to a summary DTO", () => {
    expect(
      toSummary({
        id: "c1",
        name: "GoverNerds HQ",
        slug: "governerds-hq",
      }),
    ).toEqual({
      id: "c1",
      name: "GoverNerds HQ",
      slug: "governerds-hq",
    });
  });

  it("maps a community row to a detail DTO with settings", () => {
    expect(
      toDetail({
        id: "c1",
        name: "GoverNerds HQ",
        slug: "governerds-hq",
        settings: { theme: "default" },
      }),
    ).toEqual({
      id: "c1",
      name: "GoverNerds HQ",
      slug: "governerds-hq",
      settings: { theme: "default" },
    });
  });

  it("defaults missing settings to an empty object", () => {
    expect(
      toDetail({
        id: "c1",
        name: "GoverNerds HQ",
        slug: "governerds-hq",
        settings: undefined as unknown as Record<string, unknown>,
      }).settings,
    ).toEqual({});
  });
});
