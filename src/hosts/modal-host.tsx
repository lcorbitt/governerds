"use client";

import { useAtom } from "jotai";

import { AppModal } from "@/components/shared/app-modal";
import { modalAtom } from "@/lib/state/ui";

/**
 * Global modal host. Reads imperative modal state and renders a single AppModal.
 */
export function ModalHost() {
  const [modal, setModal] = useAtom(modalAtom);

  return (
    <AppModal
      open={modal.open}
      onOpenChange={(open) => setModal((prev) => ({ ...prev, open }))}
      title={modal.title}
      description={modal.description}
      confirmLabel={modal.confirmLabel}
      cancelLabel={modal.cancelLabel}
      variant={modal.variant}
      size={modal.size}
      onConfirm={modal.onConfirm}
      onCancel={modal.onCancel}
    />
  );
}
