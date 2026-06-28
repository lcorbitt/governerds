import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  acceptInvite,
  createCommunity,
  sendCommunityInvite,
} from "@/frontend/services/community.service";
import { invalidateCommunityQueries } from "@/hooks/queries/useCommunity";

/**
 * Community writes. Thin TanStack layer; toasts and navigation live in
 * colocated UI hooks.
 */
export function useCreateCommunityMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommunity,
    onSuccess: () => invalidateCommunityQueries(queryClient),
  });
}

export function useSendCommunityInviteMutation() {
  return useMutation({
    mutationFn: sendCommunityInvite,
  });
}

export function useAcceptInviteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptInvite,
    onSuccess: () => invalidateCommunityQueries(queryClient),
  });
}
