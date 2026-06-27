import { inngest, jobs } from "@/lib/providers/jobs/client";
import type { UserCreatedData } from "@/lib/jobs/catalog";

/**
 * Reacts to a new user. The database trigger already creates the profile row
 * and assigns the default `member` role, so here we fan out side effects:
 * welcome email and an audit entry. Kept small and idempotent.
 */
export const onUserCreated = inngest.createFunction(
  {
    id: "on-user-created",
    name: "On user created",
    triggers: [{ event: "user/created" }],
  },
  async ({ event, step }) => {
    const data = event.data as UserCreatedData;

    await step.run("send-welcome-email", async () =>
      jobs.emit({
        name: "email/send",
        data: {
          template: "notification",
          to: data.email,
          payload: {
            heading: "Welcome to GoverNerds",
            body: "Your account is ready. We are glad you are here.",
          },
        },
      }),
    );

    await step.run("audit", async () =>
      jobs.emit({
        name: "audit/log",
        data: {
          actorId: data.userId,
          action: "user.created",
          resourceType: "user",
          resourceId: data.userId,
        },
      }),
    );

    return { handled: true };
  },
);
