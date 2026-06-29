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
import { useProfileQuery } from "@/hooks/queries/useProfile";
import { useAppRouter } from "@/hooks/use-app-router";
import { signOut } from "@/lib/auth/client";

import {
  DISPLAY_NAME_CLASS,
  DROPDOWN_CLASS,
  HEADER_AVATAR_CLASS,
  HEADER_CLASS,
  HEADER_TEXT_CLASS,
  ITEM_CLASS,
  ROLE_BADGE_CLASS,
  SETTINGS_LABEL,
  SIGN_OUT_ERROR_MESSAGE,
  SIGN_OUT_LABEL,
  SIGNING_OUT_LABEL,
  TRIGGER_CLASS,
  TRIGGER_LABEL,
} from "./constants";
import { resolveDisplayName, resolveRoleLabel } from "./utils";

interface ProfileMenuProps {
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

export function ProfileMenu({ isAdmin, isSuperAdmin }: ProfileMenuProps) {
  const router = useAppRouter();
  const profileQuery = useProfileQuery();
  const [signOutPending, setSignOutPending] = useState(false);

  const displayName = resolveDisplayName(profileQuery.data?.displayName);
  const roleLabel = resolveRoleLabel(isSuperAdmin, isAdmin);

  async function handleSignOut() {
    setSignOutPending(true);
    try {
      await signOut();
      router.push("/login");
      router.refresh();
    } catch {
      toast.error(SIGN_OUT_ERROR_MESSAGE);
      setSignOutPending(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={TRIGGER_CLASS}
          aria-label={TRIGGER_LABEL}
        >
          <UserAvatar linkToProfile={false} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={DROPDOWN_CLASS}>
        <div className={HEADER_CLASS}>
          <UserAvatar className={HEADER_AVATAR_CLASS} linkToProfile={false} />
          <div className={HEADER_TEXT_CLASS}>
            <p className={DISPLAY_NAME_CLASS}>{displayName}</p>
            <span className={ROLE_BADGE_CLASS}>{roleLabel}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className={ITEM_CLASS}>
          <Link href="/settings">{SETTINGS_LABEL}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={ITEM_CLASS}
          disabled={signOutPending}
          onSelect={(event) => {
            event.preventDefault();
            void handleSignOut();
          }}
        >
          {signOutPending ? SIGNING_OUT_LABEL : SIGN_OUT_LABEL}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
