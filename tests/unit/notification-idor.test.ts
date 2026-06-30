import { describe, expect, it, vi } from "vitest";

import {
  markNotificationRead,
  NotificationNotFoundError,
} from "../../supabase/functions/_services/notification/notification.service.ts";

const { countUnreadNotifications, markNotificationReadById } = vi.hoisted(
  () => ({
    countUnreadNotifications: vi.fn(),
    markNotificationReadById: vi.fn(),
  }),
);

vi.mock("../../supabase/functions/_models/notifications.ts", () => ({
  countUnreadNotifications,
  markNotificationReadById,
  listNotificationsForUser: vi.fn(),
  insertNotification: vi.fn(),
  hasNotificationOfType: vi.fn(),
  markAllNotificationsRead: vi.fn(),
}));

describe("notification IDOR protections", () => {
  it("throws NotificationNotFoundError when mark-read affects zero rows", async () => {
    markNotificationReadById.mockResolvedValue(false);

    await expect(
      markNotificationRead({} as never, "user-a", {
        notificationId: "11111111-1111-1111-1111-111111111111",
      }),
    ).rejects.toBeInstanceOf(NotificationNotFoundError);

    expect(markNotificationReadById).toHaveBeenCalledWith(
      {},
      "user-a",
      "11111111-1111-1111-1111-111111111111",
    );
    expect(countUnreadNotifications).not.toHaveBeenCalled();
  });

  it("returns unread count when mark-read updates a row", async () => {
    markNotificationReadById.mockResolvedValue(true);
    countUnreadNotifications.mockResolvedValue(2);

    await expect(
      markNotificationRead({} as never, "user-a", {
        notificationId: "11111111-1111-1111-1111-111111111111",
      }),
    ).resolves.toEqual({ unreadCount: 2 });
  });
});
