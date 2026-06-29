"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/lib/supabase/client";
import {
  invalidateProfileQueries,
  patchProfileQueryDataFromRealtimeRow,
  type ProfileRealtimeRow,
} from "@/hooks/queries/useProfile";

interface ProfileRealtimeSyncProps {
  userId: string;
}

/**
 * Keeps the shared profile query in sync across the authenticated shell. Any
 * profile row update (avatar, display name, bio) patches the cache so every
 * `useProfileQuery` subscriber updates together.
 */
export function ProfileRealtimeSync({ userId }: ProfileRealtimeSyncProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`profile:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `owner_id=eq.${userId}`,
        },
        (payload) => {
          const patched = patchProfileQueryDataFromRealtimeRow(
            queryClient,
            payload.new as ProfileRealtimeRow,
          );
          if (!patched) {
            void invalidateProfileQueries(queryClient);
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [queryClient, userId]);

  return null;
}
