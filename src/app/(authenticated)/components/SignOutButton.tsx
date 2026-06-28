"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAppRouter } from "@/hooks/use-app-router";
import { signOut } from "@/lib/auth/client";

import { AUTHENTICATED_SHELL_COPY } from "./constants";

export function SignOutButton() {
  const router = useAppRouter();
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    setPending(true);
    try {
      await signOut();
      router.push("/login");
      router.refresh();
    } catch {
      toast.error(AUTHENTICATED_SHELL_COPY.signOutError);
      setPending(false);
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSignOut}
      disabled={pending}
    >
      {pending
        ? AUTHENTICATED_SHELL_COPY.signingOut
        : AUTHENTICATED_SHELL_COPY.signOut}
    </Button>
  );
}
