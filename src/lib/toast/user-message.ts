import { toast } from "sonner";

import { EdgeFunctionError } from "@/lib/edge-function/request";

/**
 * Returns a plain-language message suitable for our audience. Prefers the
 * server-provided user message when available.
 */
export function getUserErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof EdgeFunctionError) {
    return error.message;
  }
  return fallback;
}

export function showSuccess(message: string): void {
  toast.success(message);
}

export function showUserError(error: unknown, fallback: string): void {
  toast.error(getUserErrorMessage(error, fallback));
}
