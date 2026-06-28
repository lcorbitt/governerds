"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createClient } from "@/lib/supabase/client";
import {
  invalidateProfileQueries,
  useProfileQuery,
} from "@/hooks/queries/useProfile";
import { useUpdateProfileMutation } from "@/hooks/mutations/useProfile";
import { openModal } from "@/lib/modal/open-modal";
import { runMutationWithToast } from "@/lib/toast/mutation-toast";

import { PROFILE_COPY } from "./constants";

const profileFormSchema = z.object({
  displayName: z
    .string()
    .max(80, "Please keep your name under 80 characters.")
    .optional(),
  bio: z
    .string()
    .max(500, "Please keep your bio under 500 characters.")
    .optional(),
});

type ProfileFormInput = z.infer<typeof profileFormSchema>;

/**
 * Colocated UI orchestration for the profile page. Owns the form, toasts, modals,
 * and the Realtime subscription. The subscription invalidates the profile query via
 * the helper from the query domain file — it never hand-edits the cache.
 */
export function useProfile() {
  const queryClient = useQueryClient();
  const profileQuery = useProfileQuery();
  const updateProfileMutation = useUpdateProfileMutation();

  const form = useForm<ProfileFormInput>({
    resolver: zodResolver(profileFormSchema),
    values: {
      displayName: profileQuery.data?.displayName ?? "",
      bio: profileQuery.data?.bio ?? "",
    },
  });

  useEffect(() => {
    const ownerId = profileQuery.data?.ownerId;
    if (!ownerId) return;

    const supabase = createClient();
    const channel = supabase
      .channel(`profile:${ownerId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `owner_id=eq.${ownerId}`,
        },
        () => {
          invalidateProfileQueries(queryClient);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profileQuery.data?.ownerId, queryClient]);

  async function onSubmit(values: ProfileFormInput) {
    await runMutationWithToast(
      updateProfileMutation.mutateAsync({
        displayName: values.displayName,
        bio: values.bio,
      }),
      {
        loading: PROFILE_COPY.toastSaving,
        success: PROFILE_COPY.toastSaved,
        errorFallback: PROFILE_COPY.toastError,
      },
    );
  }

  function resetForm() {
    if (!form.formState.isDirty) {
      form.reset({
        displayName: profileQuery.data?.displayName ?? "",
        bio: profileQuery.data?.bio ?? "",
      });
      return;
    }

    openModal({
      title: PROFILE_COPY.discardTitle,
      description: PROFILE_COPY.discardDescription,
      confirmLabel: PROFILE_COPY.discardConfirm,
      cancelLabel: PROFILE_COPY.discardCancel,
      variant: "destructive",
      onConfirm: () => {
        form.reset({
          displayName: profileQuery.data?.displayName ?? "",
          bio: profileQuery.data?.bio ?? "",
        });
      },
    });
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    resetForm,
    profileQuery,
    isSaving: updateProfileMutation.isPending,
    isDirty: form.formState.isDirty,
  };
}
