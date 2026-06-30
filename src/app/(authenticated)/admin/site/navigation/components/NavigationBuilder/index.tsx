"use client";

import { AppModal } from "@/components/shared/AppModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AddNavigationItemModal } from "../AddNavigationItemModal";
import { NavigationItemList } from "../NavigationItemList";
import { NavigationPreview } from "../NavigationPreview";
import {
  ADD_ITEM_LABEL,
  BUILDER_GRID_CLASS,
  DELETE_CANCEL_LABEL,
  DELETE_CONFIRM_DESCRIPTION,
  DELETE_CONFIRM_LABEL,
  DELETE_CONFIRM_TITLE,
  DRAFT_BADGE_CLASS,
  EDITOR_PANEL_LABEL,
  HEADER_COPY_CLASS,
  HEADER_ROW_CLASS,
  MENU_DESCRIPTION,
  MENU_TITLE,
  PAGE_CLASS,
  PANEL_CLASS,
  PANEL_LABEL_CLASS,
  PREVIEW_ACTIVE_LABEL,
  PREVIEW_LABEL,
  PREVIEW_PANEL_LABEL,
  PUBLISH_LABEL,
  RESET_LABEL,
  SAVE_DRAFT_LABEL,
  SUBTITLE,
  SUBTITLE_CLASS,
  TITLE,
  TITLE_CLASS,
  TOOLBAR_CLASS,
  UNSAVED_DRAFT_LABEL,
} from "./constants";
import { useNavigationBuilder } from "./useNavigationBuilder";

export function NavigationBuilder() {
  const {
    draftItems,
    previewItems,
    hasUnsavedDraft,
    isPreviewMode,
    modalState,
    editingItem,
    deleteItemId,
    openAddModal,
    openEditModal,
    closeModal,
    saveItem,
    requestDeleteItem,
    confirmDeleteItem,
    cancelDeleteItem,
    handleReorder,
    handleIndent,
    handleOutdent,
    saveDraft,
    publish,
    resetDraft,
    togglePreview,
  } = useNavigationBuilder();

  return (
    <div className={PAGE_CLASS}>
      <div className={HEADER_ROW_CLASS}>
        <div className={HEADER_COPY_CLASS}>
          <h1 className={TITLE_CLASS}>{TITLE}</h1>
          <p className={SUBTITLE_CLASS}>{SUBTITLE}</p>
        </div>
        <div className={TOOLBAR_CLASS}>
          {hasUnsavedDraft ? (
            <span className={DRAFT_BADGE_CLASS}>{UNSAVED_DRAFT_LABEL}</span>
          ) : null}
          <Button type="button" onClick={() => openAddModal()}>
            {ADD_ITEM_LABEL}
          </Button>
          <Button type="button" variant="outline" onClick={saveDraft}>
            {SAVE_DRAFT_LABEL}
          </Button>
          <Button type="button" onClick={publish}>
            {PUBLISH_LABEL}
          </Button>
          <Button type="button" variant="outline" onClick={resetDraft}>
            {RESET_LABEL}
          </Button>
          <Button
            type="button"
            variant={isPreviewMode ? "secondary" : "outline"}
            onClick={togglePreview}
          >
            {isPreviewMode ? PREVIEW_ACTIVE_LABEL : PREVIEW_LABEL}
          </Button>
        </div>
      </div>

      <div className={BUILDER_GRID_CLASS}>
        <div className={PANEL_CLASS}>
          <p className={PANEL_LABEL_CLASS}>{EDITOR_PANEL_LABEL}</p>
          <Card className="flex min-h-0 flex-1 flex-col">
            <CardHeader>
              <CardTitle>{MENU_TITLE}</CardTitle>
              <CardDescription>{MENU_DESCRIPTION}</CardDescription>
            </CardHeader>
            <CardContent className="min-h-0 flex-1 overflow-y-auto">
              <NavigationItemList
                items={draftItems}
                onReorder={handleReorder}
                onEdit={openEditModal}
                onDelete={requestDeleteItem}
                onIndent={handleIndent}
                onOutdent={handleOutdent}
              />
            </CardContent>
          </Card>
        </div>

        <div className={PANEL_CLASS}>
          <p className={PANEL_LABEL_CLASS}>{PREVIEW_PANEL_LABEL}</p>
          <NavigationPreview items={previewItems} />
        </div>
      </div>

      <AddNavigationItemModal
        open={modalState !== null}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
        item={editingItem}
        onSave={saveItem}
      />

      <AppModal
        open={deleteItemId !== null}
        onOpenChange={(open) => {
          if (!open) cancelDeleteItem();
        }}
        title={DELETE_CONFIRM_TITLE}
        description={DELETE_CONFIRM_DESCRIPTION}
        confirmLabel={DELETE_CONFIRM_LABEL}
        cancelLabel={DELETE_CANCEL_LABEL}
        variant="destructive"
        onConfirm={confirmDeleteItem}
        onCancel={cancelDeleteItem}
      />
    </div>
  );
}
