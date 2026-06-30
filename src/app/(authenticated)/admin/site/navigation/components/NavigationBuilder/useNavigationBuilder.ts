"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  SEED_NAVIGATION_ITEMS,
  TOAST_DELETE_SUCCESS,
  TOAST_PUBLISH_SUCCESS,
  TOAST_RESET_SUCCESS,
  TOAST_SAVE_DRAFT_SUCCESS,
} from "./constants";
import type { NavigationItem, NavigationModalState } from "./types";
import {
  areNavigationItemsEqual,
  cloneNavigationItems,
  indentItem,
  insertNavigationItem,
  outdentItem,
  removeItemAndDescendants,
  reorderNavigationItems,
  updateNavigationItem,
} from "./utils";

export function useNavigationBuilder() {
  const [publishedItems, setPublishedItems] = useState<NavigationItem[]>(() =>
    cloneNavigationItems(SEED_NAVIGATION_ITEMS),
  );
  const [draftItems, setDraftItems] = useState<NavigationItem[]>(() =>
    cloneNavigationItems(SEED_NAVIGATION_ITEMS),
  );
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [modalState, setModalState] = useState<NavigationModalState>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const hasUnsavedDraft = useMemo(
    () => !areNavigationItemsEqual(draftItems, publishedItems),
    [draftItems, publishedItems],
  );

  const previewItems = useMemo(
    () => (isPreviewMode ? draftItems : publishedItems),
    [draftItems, isPreviewMode, publishedItems],
  );

  const editingItem = useMemo(() => {
    if (modalState?.mode !== "edit") return undefined;
    return draftItems.find((item) => item.id === modalState.itemId);
  }, [draftItems, modalState]);

  const openAddModal = useCallback((parentId: string | null = null) => {
    setModalState({ mode: "add", parentId });
  }, []);

  const openEditModal = useCallback((itemId: string) => {
    setModalState({ mode: "edit", itemId });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(null);
  }, []);

  const saveItem = useCallback(
    (item: NavigationItem) => {
      setDraftItems((current) => {
        const exists = current.some((entry) => entry.id === item.id);
        if (exists) {
          return updateNavigationItem(current, item.id, item);
        }

        const parentId =
          modalState?.mode === "add" ? (modalState.parentId ?? null) : null;
        return insertNavigationItem(current, item, parentId);
      });
      closeModal();
    },
    [closeModal, modalState],
  );

  const requestDeleteItem = useCallback((itemId: string) => {
    setDeleteItemId(itemId);
  }, []);

  const confirmDeleteItem = useCallback(() => {
    if (!deleteItemId) return;
    setDraftItems((current) => removeItemAndDescendants(current, deleteItemId));
    setDeleteItemId(null);
    toast.success(TOAST_DELETE_SUCCESS);
  }, [deleteItemId]);

  const cancelDeleteItem = useCallback(() => {
    setDeleteItemId(null);
  }, []);

  const handleReorder = useCallback(
    (activeId: string, overId: string, dragOffset: number) => {
      setDraftItems((current) =>
        reorderNavigationItems(current, activeId, overId, dragOffset),
      );
    },
    [],
  );

  const handleIndent = useCallback((itemId: string) => {
    setDraftItems((current) => indentItem(current, itemId));
  }, []);

  const handleOutdent = useCallback((itemId: string) => {
    setDraftItems((current) => outdentItem(current, itemId));
  }, []);

  const saveDraft = useCallback(() => {
    toast.success(TOAST_SAVE_DRAFT_SUCCESS);
  }, []);

  const publish = useCallback(() => {
    setPublishedItems(cloneNavigationItems(draftItems));
    toast.success(TOAST_PUBLISH_SUCCESS);
  }, [draftItems]);

  const resetDraft = useCallback(() => {
    setDraftItems(cloneNavigationItems(publishedItems));
    toast.success(TOAST_RESET_SUCCESS);
  }, [publishedItems]);

  const togglePreview = useCallback(() => {
    setIsPreviewMode((current) => !current);
  }, []);

  return {
    draftItems,
    previewItems,
    publishedItems,
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
  };
}
