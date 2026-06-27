import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/env/server", () => ({
  env: {
    JOB_PROVIDER: "inngest",
    INNGEST_EVENT_KEY: undefined,
  },
}));
vi.mock("@/lib/logging/logger", () => ({
  logger: { info: vi.fn(), error: vi.fn() },
}));

import type { AppEvent } from "@/lib/jobs/catalog";
import {
  events,
  resetPublisherForTests,
  setPublisherForTests,
} from "@/lib/providers/jobs/publisher";

describe("events.publish", () => {
  beforeEach(() => {
    resetPublisherForTests();
  });

  it("delegates to the configured publisher", async () => {
    const publish = vi.fn().mockResolvedValue(undefined);
    setPublisherForTests({ publish });

    const event: AppEvent = {
      name: "profile/updated",
      data: {
        profileId: "p1",
        ownerId: "u1",
        displayName: "Ada",
        changedFields: ["displayName"],
      },
    };

    await events.publish(event);

    expect(publish).toHaveBeenCalledWith(event);
  });
});

describe("AppEvent catalog", () => {
  it("accepts a profile/updated domain event payload", () => {
    const event: AppEvent = {
      name: "profile/updated",
      data: {
        profileId: "11111111-1111-1111-1111-111111111111",
        ownerId: "22222222-2222-2222-2222-222222222222",
        displayName: "Member",
        changedFields: ["displayName", "bio"],
      },
    };

    expect(event.name).toBe("profile/updated");
    expect(event.data.changedFields).toEqual(["displayName", "bio"]);
  });

  it("accepts integration command events", () => {
    const event: AppEvent = {
      name: "audit/log",
      data: {
        actorId: "u1",
        action: "profile.updated",
        resourceType: "profile",
        resourceId: "p1",
      },
    };

    expect(event.name).toBe("audit/log");
  });
});
