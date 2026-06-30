"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  useCreateCommunityMutation,
  useUpdateCommunityMutation,
} from "@/hooks/mutations/useCommunity";
import { suggestSlugFromName } from "@/lib/community/slug";
import { runMutationWithToast } from "@/lib/toast/mutation-toast";
import { useAppRouter } from "@/hooks/use-app-router";
import type { CommunitySummary } from "@shared/dto/community.dto";

import {
  TOAST_CREATE_ERROR,
  TOAST_CREATE_LOADING,
  TOAST_CREATE_SUCCESS,
  TOAST_UPDATE_ERROR,
  TOAST_UPDATE_LOADING,
  TOAST_UPDATE_SUCCESS,
} from "./constants";
import { communityFormSchema, type CommunityFormInput } from "./types";

interface UseCreateOrEditCommunityModalOptions {
  onOpenChange: (open: boolean) => void;
  community?: CommunitySummary;
}

/**
 * Form orchestration for creating or editing a community inside AppModal.
 */
export function useCreateOrEditCommunityModal({
  onOpenChange,
  community,
}: UseCreateOrEditCommunityModalOptions) {
  const router = useAppRouter();
  const createMutation = useCreateCommunityMutation();
  const updateMutation = useUpdateCommunityMutation();
  const [slugTouched, setSlugTouched] = useState(false);
  const isEditMode = community !== undefined;

  const form = useForm<CommunityFormInput>({
    resolver: zodResolver(communityFormSchema),
    defaultValues: community
      ? { name: community.name, slug: community.slug }
      : { name: "", slug: "" },
  });

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (isEditMode || slugTouched) return;

    form.setValue("slug", suggestSlugFromName(event.target.value), {
      shouldValidate: true,
    });
  }

  async function onSubmit(values: CommunityFormInput) {
    if (isEditMode && community) {
      await runMutationWithToast(
        updateMutation.mutateAsync({
          communityId: community.id,
          name: values.name,
          slug: values.slug,
        }),
        {
          loading: TOAST_UPDATE_LOADING,
          success: TOAST_UPDATE_SUCCESS,
          errorFallback: TOAST_UPDATE_ERROR,
        },
      );
      onOpenChange(false);
      return;
    }

    const created = await runMutationWithToast(
      createMutation.mutateAsync(values),
      {
        loading: TOAST_CREATE_LOADING,
        success: TOAST_CREATE_SUCCESS,
        errorFallback: TOAST_CREATE_ERROR,
      },
    );
    onOpenChange(false);
    router.push(`/communities/${created.slug}`);
    router.refresh();
  }

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const nameField = form.register("name");

  return {
    form,
    isEditMode,
    isSubmitting,
    nameField,
    handleNameChange,
    setSlugTouched,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
