import { events, inngest } from "@/lib/providers/jobs/publisher";
import type { CommunityCreatedEventData } from "@/lib/jobs/catalog";

/**
 * Reacts to a new community. Fans out audit logging and search indexing.
 */
export const onCommunityCreated = inngest.createFunction(
  {
    id: "on-community-created",
    name: "On community created",
    triggers: [{ event: "community/created" }],
  },
  async ({ event, step }) => {
    const data = event.data as CommunityCreatedEventData;

    await step.run("audit", async () =>
      events.publish({
        name: "audit/log",
        data: {
          actorId: data.createdBy,
          action: "community.created",
          resourceType: "community",
          resourceId: data.communityId,
          metadata: { name: data.name, slug: data.slug },
        },
      }),
    );

    await step.run("search-index", async () =>
      events.publish({
        name: "search/index",
        data: {
          entityType: "community",
          entityId: data.communityId,
          title: data.name,
          metadata: { slug: data.slug },
        },
      }),
    );

    return { handled: true };
  },
);
