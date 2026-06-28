import { events, inngest } from "@/lib/providers/jobs/publisher";
import type { CommunityInviteSentEventData } from "@/lib/jobs/catalog";

/**
 * Reacts to a community invite being created. Sends the invitation email.
 */
export const onCommunityInviteSent = inngest.createFunction(
  {
    id: "on-community-invite-sent",
    name: "On community invite sent",
    triggers: [{ event: "community/invite-sent" }],
  },
  async ({ event, step }) => {
    const data = event.data as CommunityInviteSentEventData;

    await step.run("send-invite-email", async () =>
      events.publish({
        name: "email/send",
        data: {
          template: "invite",
          to: data.email,
          payload: {
            inviterName: data.inviterName,
            communityName: data.communityName,
            acceptUrl: data.acceptUrl,
          },
        },
      }),
    );

    return { handled: true };
  },
);
