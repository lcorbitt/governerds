"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { DEFAULT_LABEL, PROFILE_LINK_CLASS, ROOT_CLASS } from "./constants";
import { useUserAvatar } from "./useUserAvatar";

interface UserAvatarProps {
  className?: string;
  fallbackClassName?: string;
  /** When false, renders the avatar without a profile link. */
  linkToProfile?: boolean;
  label?: string;
}

/**
 * Shared profile avatar driven by the warm TanStack profile query. Used anywhere
 * the signed-in user's photo should appear in the authenticated shell.
 */
export function UserAvatar({
  className,
  fallbackClassName,
  linkToProfile = true,
  label,
}: UserAvatarProps) {
  const { src, fallbackInitial } = useUserAvatar();

  const avatar = (
    <Avatar className={cn(ROOT_CLASS, className)}>
      <AvatarImage key={src ?? "no-avatar"} src={src} alt="" />
      <AvatarFallback className={fallbackClassName}>
        {fallbackInitial}
      </AvatarFallback>
    </Avatar>
  );

  if (!linkToProfile) return avatar;

  return (
    <Link
      href="/settings"
      className={PROFILE_LINK_CLASS}
      aria-label={label ?? DEFAULT_LABEL}
    >
      {avatar}
    </Link>
  );
}
