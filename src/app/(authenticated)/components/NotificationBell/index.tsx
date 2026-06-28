"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import {
  invalidateNotificationQueries,
  useNotificationsQuery,
} from "@/hooks/queries/useNotifications";
import { useMarkNotificationReadMutation } from "@/hooks/mutations/useNotification";
import { cn } from "@/lib/utils";

import {
  NOTIFICATION_BELL_ACTION_LINK_CLASS,
  NOTIFICATION_BELL_BADGE_CLASS,
  NOTIFICATION_BELL_DROPDOWN_CLASS,
  NOTIFICATION_BELL_EMPTY_MESSAGE,
  NOTIFICATION_BELL_ERROR_MESSAGE,
  NOTIFICATION_BELL_ICON_CLASS,
  NOTIFICATION_BELL_ITEM_BODY_CLASS,
  NOTIFICATION_BELL_ITEM_CLASS,
  NOTIFICATION_BELL_ITEM_HEADER_CLASS,
  NOTIFICATION_BELL_ITEM_TITLE_CLASS,
  NOTIFICATION_BELL_ITEM_TITLE_READ_CLASS,
  NOTIFICATION_BELL_ITEM_TITLE_UNREAD_CLASS,
  NOTIFICATION_BELL_LABEL,
  NOTIFICATION_BELL_LABEL_CLASS,
  NOTIFICATION_BELL_LOADING_MESSAGE,
  NOTIFICATION_BELL_MARK_ALL_READ_BUTTON_CLASS,
  NOTIFICATION_BELL_MARK_ALL_READ_LABEL,
  NOTIFICATION_BELL_MARK_READ_BUTTON_CLASS,
  NOTIFICATION_BELL_MARK_READ_LABEL,
  NOTIFICATION_BELL_STATUS_MESSAGE_CLASS,
  NOTIFICATION_BELL_TITLE,
  NOTIFICATION_BELL_TRIGGER_CLASS,
} from "./constants";

interface NotificationBellProps {
  userId: string;
}

/**
 * In-app notification bell with unread badge, dropdown list, and Realtime refresh.
 */
export function NotificationBell({ userId }: NotificationBellProps) {
  const queryClient = useQueryClient();
  const notificationsQuery = useNotificationsQuery();
  const markReadMutation = useMarkNotificationReadMutation();

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          invalidateNotificationQueries(queryClient);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, userId]);

  const unreadCount = notificationsQuery.data?.unreadCount ?? 0;
  const items = notificationsQuery.data?.items ?? [];

  async function handleMarkAllRead() {
    if (unreadCount === 0) return;
    await markReadMutation.mutateAsync({ all: true });
  }

  async function handleMarkOneRead(notificationId: string) {
    await markReadMutation.mutateAsync({ notificationId });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={NOTIFICATION_BELL_TRIGGER_CLASS}
          aria-label={NOTIFICATION_BELL_LABEL}
        >
          <Bell className={NOTIFICATION_BELL_ICON_CLASS} />
          {unreadCount > 0 ? (
            <span className={NOTIFICATION_BELL_BADGE_CLASS}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={NOTIFICATION_BELL_DROPDOWN_CLASS}
      >
        <DropdownMenuLabel className={NOTIFICATION_BELL_LABEL_CLASS}>
          <span>{NOTIFICATION_BELL_TITLE}</span>
          {unreadCount > 0 ? (
            <button
              type="button"
              className={NOTIFICATION_BELL_MARK_ALL_READ_BUTTON_CLASS}
              disabled={markReadMutation.isPending}
              onClick={() => void handleMarkAllRead()}
            >
              {NOTIFICATION_BELL_MARK_ALL_READ_LABEL}
            </button>
          ) : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notificationsQuery.isPending ? (
          <p className={NOTIFICATION_BELL_STATUS_MESSAGE_CLASS}>
            {NOTIFICATION_BELL_LOADING_MESSAGE}
          </p>
        ) : notificationsQuery.isError ? (
          <p className={NOTIFICATION_BELL_STATUS_MESSAGE_CLASS}>
            {NOTIFICATION_BELL_ERROR_MESSAGE}
          </p>
        ) : items.length === 0 ? (
          <p className={NOTIFICATION_BELL_STATUS_MESSAGE_CLASS}>
            {NOTIFICATION_BELL_EMPTY_MESSAGE}
          </p>
        ) : (
          items.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className={NOTIFICATION_BELL_ITEM_CLASS}
              onSelect={(event) => event.preventDefault()}
            >
              <div className={NOTIFICATION_BELL_ITEM_HEADER_CLASS}>
                <p
                  className={cn(
                    NOTIFICATION_BELL_ITEM_TITLE_CLASS,
                    item.readAt
                      ? NOTIFICATION_BELL_ITEM_TITLE_READ_CLASS
                      : NOTIFICATION_BELL_ITEM_TITLE_UNREAD_CLASS,
                  )}
                >
                  {item.title}
                </p>
                {!item.readAt ? (
                  <button
                    type="button"
                    className={NOTIFICATION_BELL_MARK_READ_BUTTON_CLASS}
                    disabled={markReadMutation.isPending}
                    onClick={() => void handleMarkOneRead(item.id)}
                  >
                    {NOTIFICATION_BELL_MARK_READ_LABEL}
                  </button>
                ) : null}
              </div>
              <p className={NOTIFICATION_BELL_ITEM_BODY_CLASS}>{item.body}</p>
              {item.actionUrl ? (
                <Link
                  href={item.actionUrl}
                  className={NOTIFICATION_BELL_ACTION_LINK_CLASS}
                  onClick={() => {
                    if (!item.readAt) void handleMarkOneRead(item.id);
                  }}
                >
                  View
                </Link>
              ) : null}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
