"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AdminCommunitiesTable } from "../AdminCommunitiesTable";
import { CreateOrEditCommunityModal } from "../CreateOrEditCommunityModal";
import {
  CREATE_BUTTON_ICON_CLASS,
  CREATE_BUTTON_LABEL,
  HEADER_ROW_CLASS,
  HEADER_TEXT_CLASS,
  LIST_CARD_DESCRIPTION,
  LIST_CARD_TITLE,
  PAGE_CLASS,
  SUBTITLE,
  SUBTITLE_CLASS,
  TITLE,
  TITLE_CLASS,
} from "./constants";
import { useAdminCommunities } from "./useAdminCommunities";

export function AdminCommunities() {
  const {
    inviteEmails,
    setInviteEmails,
    sendingInviteFor,
    onSendInvite,
    modalOpen,
    editingCommunity,
    openCreateModal,
    openEditModal,
    handleModalOpenChange,
  } = useAdminCommunities();

  return (
    <div className={PAGE_CLASS}>
      <div className={HEADER_ROW_CLASS}>
        <div className={HEADER_TEXT_CLASS}>
          <h1 className={TITLE_CLASS}>{TITLE}</h1>
          <p className={SUBTITLE_CLASS}>{SUBTITLE}</p>
        </div>
        <Button type="button" size="lg" onClick={openCreateModal}>
          <Plus className={CREATE_BUTTON_ICON_CLASS} aria-hidden />
          {CREATE_BUTTON_LABEL}
        </Button>
      </div>

      <CreateOrEditCommunityModal
        key={modalOpen ? (editingCommunity?.id ?? "create") : "closed"}
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
        community={editingCommunity}
      />

      <Card>
        <CardHeader>
          <CardTitle>{LIST_CARD_TITLE}</CardTitle>
          <CardDescription>{LIST_CARD_DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <AdminCommunitiesTable
            inviteEmails={inviteEmails}
            setInviteEmails={setInviteEmails}
            sendingInviteFor={sendingInviteFor}
            onSendInvite={onSendInvite}
            onEditCommunity={openEditModal}
          />
        </CardContent>
      </Card>
    </div>
  );
}
