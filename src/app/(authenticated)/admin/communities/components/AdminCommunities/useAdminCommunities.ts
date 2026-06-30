"use client";

import { useState } from "react";

import { useSendCommunityInviteMutation } from "@/hooks/mutations/useCommunity";
import { runMutationWithToast } from "@/lib/toast/mutation-toast";
import type { CommunitySummary } from "@shared/dto/community.dto";

import {
  TOAST_INVITE_ERROR,
  TOAST_INVITE_LOADING,
  TOAST_INVITE_SUCCESS,
} from "./constants";

/**
 * Colocated orchestration for admin community management.
 */
export function useAdminCommunities() {
  const sendInviteMutation = useSendCommunityInviteMutation();
  const [inviteEmails, setInviteEmails] = useState<Record<string, string>>({});
  const [sendingInviteFor, setSendingInviteFor] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState<
    CommunitySummary | undefined
  >(undefined);

  function openCreateModal() {
    setEditingCommunity(undefined);
    setModalOpen(true);
  }

  function openEditModal(community: CommunitySummary) {
    setEditingCommunity(community);
    setModalOpen(true);
  }

  function handleModalOpenChange(open: boolean) {
    setModalOpen(open);
    if (!open) {
      setEditingCommunity(undefined);
    }
  }

  async function onSendInvite(communityId: string, communityName: string) {
    const email = inviteEmails[communityId]?.trim();
    if (!email) return;

    setSendingInviteFor(communityId);
    try {
      await runMutationWithToast(
        sendInviteMutation.mutateAsync({ communityId, email }),
        {
          loading: TOAST_INVITE_LOADING,
          success: TOAST_INVITE_SUCCESS.replace("{name}", communityName),
          errorFallback: TOAST_INVITE_ERROR,
        },
      );
      setInviteEmails((current) => ({ ...current, [communityId]: "" }));
    } finally {
      setSendingInviteFor(null);
    }
  }

  return {
    inviteEmails,
    setInviteEmails,
    sendingInviteFor,
    onSendInvite,
    modalOpen,
    editingCommunity,
    openCreateModal,
    openEditModal,
    handleModalOpenChange,
  };
}
