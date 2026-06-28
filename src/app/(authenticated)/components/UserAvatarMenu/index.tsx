"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { UserAvatar } from "@/components/shared/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppRouter } from "@/hooks/use-app-router";
import { signOut } from "@/lib/auth/client";

import { USER_AVATAR_MENU_COPY } from "./constants";

export function UserAvatarMenu() {
  const router = useAppRouter();
  const [signOutPending, setSignOutPending] = useState(false);

  async function handleSignOut() {
    setSignOutPending(true);
    try {
      await signOut();
      router.push("/login");
      router.refresh();
    } catch {
      toast.error(USER_AVATAR_MENU_COPY.signOutError);
      setSignOutPending(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="focus-visible:ring-ring rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-label={USER_AVATAR_MENU_COPY.triggerLabel}
        >
          <UserAvatar linkToProfile={false} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem asChild>
          <Link href="/settings">{USER_AVATAR_MENU_COPY.settings}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={signOutPending}
          onSelect={(event) => {
            event.preventDefault();
            void handleSignOut();
          }}
        >
          {signOutPending
            ? USER_AVATAR_MENU_COPY.signingOut
            : USER_AVATAR_MENU_COPY.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
