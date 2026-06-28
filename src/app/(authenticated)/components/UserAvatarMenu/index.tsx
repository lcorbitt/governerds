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

import {
  USER_AVATAR_MENU_DROPDOWN_CLASS,
  USER_AVATAR_MENU_SETTINGS_LABEL,
  USER_AVATAR_MENU_SIGN_OUT_ERROR_MESSAGE,
  USER_AVATAR_MENU_SIGN_OUT_LABEL,
  USER_AVATAR_MENU_SIGNING_OUT_LABEL,
  USER_AVATAR_MENU_TRIGGER_CLASS,
  USER_AVATAR_MENU_TRIGGER_LABEL,
} from "./constants";

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
      toast.error(USER_AVATAR_MENU_SIGN_OUT_ERROR_MESSAGE);
      setSignOutPending(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={USER_AVATAR_MENU_TRIGGER_CLASS}
          aria-label={USER_AVATAR_MENU_TRIGGER_LABEL}
        >
          <UserAvatar linkToProfile={false} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={USER_AVATAR_MENU_DROPDOWN_CLASS}
      >
        <DropdownMenuItem asChild>
          <Link href="/settings">{USER_AVATAR_MENU_SETTINGS_LABEL}</Link>
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
            ? USER_AVATAR_MENU_SIGNING_OUT_LABEL
            : USER_AVATAR_MENU_SIGN_OUT_LABEL}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
