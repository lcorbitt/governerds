import { events, inngest } from "@/lib/providers/jobs/publisher";
import type { ProfileUpdatedEventData } from "@/lib/jobs/catalog";

/**
 * Reacts to a profile update. Fans out side effects (audit log, search index)
 * without the profile service knowing about them.
 */
export const onProfileUpdated = inngest.createFunction(
  {
    id: "on-profile-updated",
    name: "On profile updated",
    triggers: [{ event: "profile/updated" }],
  },
  async ({ event, step }) => {
    const data = event.data as ProfileUpdatedEventData;

    await step.run("audit", async () =>
      events.publish({
        name: "audit/log",
        data: {
          actorId: data.ownerId,
          action: "profile.updated",
          resourceType: "profile",
          resourceId: data.profileId,
          metadata: { changedFields: data.changedFields },
        },
      }),
    );

    await step.run("search-index", async () =>
      events.publish({
        name: "search/index",
        data: {
          entityType: "profile",
          entityId: data.profileId,
          title: data.displayName ?? "Profile",
          metadata: { ownerId: data.ownerId },
        },
      }),
    );

    return { handled: true };
  },
);
