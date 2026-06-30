import { serveWithResourceOwnership } from "@http/middleware/index.ts";
import { getNotificationUserId } from "@models/notifications.ts";
import { handle } from "./handler.ts";

serveWithResourceOwnership(
  handle,
  {
    name: "mark-notification-read",
    limit: 60,
    windowSeconds: 60,
  },
  {
    loadOwnerId: async (ctx) => {
      const body = await ctx.req
        .clone()
        .json()
        .catch(() => null);
      if (
        body &&
        typeof body === "object" &&
        "all" in body &&
        body.all === true
      ) {
        return ctx.user!.id;
      }

      const notificationId =
        body &&
        typeof body === "object" &&
        "notificationId" in body &&
        typeof body.notificationId === "string"
          ? body.notificationId
          : null;
      if (!notificationId) return null;

      return getNotificationUserId(ctx.userClient!, notificationId);
    },
  },
);
