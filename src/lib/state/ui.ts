import { atom } from "jotai";

import type { AppModalSize } from "@/components/shared/AppModal";

/**
 * Ephemeral, client-only UI state. Jotai is for transient interface state only
 * (open/closed, active step, filters). Never mirror server data here — that is
 * TanStack Query's job. Mirroring server state in atoms causes dual-source bugs.
 */
export const mobileNavOpenAtom = atom(false);

export type ModalState = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  size?: AppModalSize;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const modalAtom = atom<ModalState>({
  open: false,
  title: "",
});
