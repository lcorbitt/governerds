"use client";

import { Button } from "@/components/ui/button";

import {
  CONNECTING_LABEL,
  GOOGLE_LABEL,
  MICROSOFT_LABEL,
  ROOT_CLASS,
} from "./constants";
import { useOAuthButtons } from "./useOAuthButtons";

/**
 * Continue-with-Google / Continue-with-Microsoft buttons. Shared across login
 * and signup. Labels are explicit and recognizable for our audience.
 */
export function OAuthButtons() {
  const { pending, handleClick } = useOAuthButtons();

  return (
    <div className={ROOT_CLASS}>
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={() => void handleClick("google")}
        disabled={pending !== null}
      >
        {pending === "google" ? CONNECTING_LABEL : GOOGLE_LABEL}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={() => void handleClick("azure")}
        disabled={pending !== null}
      >
        {pending === "azure" ? CONNECTING_LABEL : MICROSOFT_LABEL}
      </Button>
    </div>
  );
}
