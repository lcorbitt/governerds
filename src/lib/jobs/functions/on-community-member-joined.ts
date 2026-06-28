import { events, inngest } from "@/lib/providers/jobs/publisher";
import type { CommunityMemberJoinedEventData } from "@/lib/jobs/catalog";

/**
 * Reacts to a user joining a community via invite acceptance.
 */
export const onCommunityMemberJoined = inngest.createFunction(
  {
    id: "on-community-member-joined",
    name: "On community member joined",
    triggers: [{ event: "community/member-joined" }],
  },
  async ({ event, step }) => {
    const data = event.data as CommunityMemberJoinedEventData;

    await step.run("audit", async () =>
      events.publish({
        name: "audit/log",
        data: {
          actorId: data.userId,
          action: "community.member_joined",
          resourceType: "community",
          resourceId: data.communityId,
          metadata: {
            slug: data.communitySlug,
            inviteId: data.inviteId ?? null,
          },
        },
      }),
    );

    return { handled: true };
  },
);
