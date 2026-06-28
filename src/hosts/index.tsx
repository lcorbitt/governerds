import { Toaster } from "@/components/ui/sonner";
import { ModalHost } from "@/hosts/modal-host";

/**
 * Global hosts: modals, toasts, and portals rendered once from the root shell.
 * Feature code triggers these (e.g. via `toast()` or `openModal()`), but they
 * live here so they are always mounted regardless of route.
 */
export function Hosts() {
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand
        visibleToasts={4}
      />
      <ModalHost />
    </>
  );
}
