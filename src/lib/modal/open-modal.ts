import { getDefaultStore } from "jotai";

import type { ModalState } from "@/lib/state/ui";
import { modalAtom } from "@/lib/state/ui";

const store = getDefaultStore();

export function openModal(options: Omit<ModalState, "open">): void {
  store.set(modalAtom, { ...options, open: true });
}

export function closeModal(): void {
  store.set(modalAtom, (prev) => ({ ...prev, open: false }));
}
