"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useProfileQuery } from "@/hooks/queries/useProfile";
import { useUpdateProfileMutation } from "@/hooks/mutations/useProfile";
import { useAvatarUploadMutation } from "@/hooks/mutations/useAvatarUpload";
import { openModal } from "@/lib/modal/open-modal";
import { runMutationWithToast } from "@/lib/toast/mutation-toast";
import { DISPLAY_NAME_MAX_LENGTH } from "@shared/profile/validation";

import {
  PROFILE_AVATAR_UPLOADING_LABEL,
  PROFILE_DISCARD_CANCEL_LABEL,
  PROFILE_DISCARD_CONFIRM_LABEL,
  PROFILE_DISCARD_DESCRIPTION,
  PROFILE_DISCARD_TITLE,
  PROFILE_TOAST_AVATAR_ERROR,
  PROFILE_TOAST_AVATAR_SAVED,
  PROFILE_TOAST_ERROR,
  PROFILE_TOAST_SAVED,
  PROFILE_TOAST_SAVING,
} from "./constants";
import {
  resolveProfileFieldError,
  resolveProfileSaveErrorMessage,
} from "./utils";

const profileFormSchema = z.object({
  displayName: z
    .string()
    .max(
      DISPLAY_NAME_MAX_LENGTH,
      `Please keep your name under ${DISPLAY_NAME_MAX_LENGTH} characters.`,
    )
    .optional(),
  bio: z
    .string()
    .max(500, "Please keep your bio under 500 characters.")
    .optional(),
});

type ProfileFormInput = z.infer<typeof profileFormSchema>;

/**
 * Colocated UI orchestration for the profile page. Owns the form, toasts, and
 * modals. Profile Realtime sync lives in the authenticated shell.
 */
export function useProfile() {
  const profileQuery = useProfileQuery();
  const updateProfileMutation = useUpdateProfileMutation();
  const avatarUploadMutation = useAvatarUploadMutation();

  const form = useForm<ProfileFormInput>({
    resolver: zodResolver(profileFormSchema),
    values: {
      displayName: profileQuery.data?.displayName ?? "",
      bio: profileQuery.data?.bio ?? "",
    },
  });

  async function onSubmit(values: ProfileFormInput) {
    form.clearErrors("displayName");

    try {
      await runMutationWithToast(
        updateProfileMutation.mutateAsync({
          displayName: values.displayName?.trim(),
          bio: values.bio,
        }),
        {
          loading: PROFILE_TOAST_SAVING,
          success: PROFILE_TOAST_SAVED,
          errorFallback: PROFILE_TOAST_ERROR,
          resolveErrorMessage: resolveProfileSaveErrorMessage,
        },
      );
    } catch (error) {
      const fieldError = resolveProfileFieldError(error);
      if (fieldError) {
        form.setError(fieldError.field, { message: fieldError.message });
        return;
      }
      throw error;
    }
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
      title: PROFILE_DISCARD_TITLE,
      description: PROFILE_DISCARD_DESCRIPTION,
      confirmLabel: PROFILE_DISCARD_CONFIRM_LABEL,
      cancelLabel: PROFILE_DISCARD_CANCEL_LABEL,
      variant: "destructive",
      onConfirm: () => {
        form.reset({
          displayName: profileQuery.data?.displayName ?? "",
          bio: profileQuery.data?.bio ?? "",
        });
      },
    });
  }

  async function onAvatarSelected(file: File | null) {
    if (!file) return;

    await runMutationWithToast(avatarUploadMutation.mutateAsync(file), {
      loading: PROFILE_AVATAR_UPLOADING_LABEL,
      success: PROFILE_TOAST_AVATAR_SAVED,
      errorFallback: PROFILE_TOAST_AVATAR_ERROR,
    });
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    onAvatarSelected,
    resetForm,
    profileQuery,
    isSaving: updateProfileMutation.isPending,
    isUploadingAvatar: avatarUploadMutation.isPending,
    isDirty: form.formState.isDirty,
  };
}
