"use client";

import { useState } from "react";

import { signInWithOAuth, type OAuthProvider } from "@/lib/auth/client";
import { showUserError } from "@/lib/toast/user-message";

import { OAUTH_ERROR_FALLBACK } from "./constants";

export function useOAuthButtons() {
  const [pending, setPending] = useState<OAuthProvider | null>(null);

  async function handleClick(provider: OAuthProvider) {
    setPending(provider);
    try {
      await signInWithOAuth(provider);
    } catch (error) {
      showUserError(error, OAUTH_ERROR_FALLBACK);
      setPending(null);
    }
  }

  return { pending, handleClick };
}
