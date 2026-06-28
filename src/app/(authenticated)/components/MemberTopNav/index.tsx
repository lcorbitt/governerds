"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { NotificationBell } from "../NotificationBell";
import { UserAvatarMenu } from "../UserAvatarMenu";
import {
  MEMBER_TOP_NAV_ACTIONS_CLASS,
  MEMBER_TOP_NAV_ADMIN_LABEL,
  MEMBER_TOP_NAV_BRAND_CLASS,
  MEMBER_TOP_NAV_BRAND_LABEL,
  MEMBER_TOP_NAV_COMMUNITIES_LABEL,
  MEMBER_TOP_NAV_DASHBOARD_LABEL,
  MEMBER_TOP_NAV_HEADER_CLASS,
  MEMBER_TOP_NAV_NAV_CLASS,
  MEMBER_TOP_NAV_SEARCH_INPUT_CLASS,
  MEMBER_TOP_NAV_SEARCH_PLACEHOLDER,
  MEMBER_TOP_NAV_TAB_LINK_ACTIVE_CLASS,
  MEMBER_TOP_NAV_TAB_LINK_CLASS,
  MEMBER_TOP_NAV_TAB_LINK_INACTIVE_CLASS,
  MEMBER_TOP_NAV_TABS_CLASS,
} from "./constants";

interface MemberTopNavProps {
  userId: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

interface NavTabConfig {
  href: string;
  label: string;
  match: (pathname: string) => boolean;
}

function NavTabLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        MEMBER_TOP_NAV_TAB_LINK_CLASS,
        isActive
          ? MEMBER_TOP_NAV_TAB_LINK_ACTIVE_CLASS
          : MEMBER_TOP_NAV_TAB_LINK_INACTIVE_CLASS,
      )}
    >
      {label}
    </Link>
  );
}

export function MemberTopNav({
  userId,
  isAdmin,
  isSuperAdmin,
}: MemberTopNavProps) {
  const pathname = usePathname();
  const brandHref = isSuperAdmin ? "/admin/overview" : "/dashboard";
  const adminHref = isSuperAdmin ? "/admin/overview" : "/admin/communities";

  const tabs: NavTabConfig[] = [
    ...(isSuperAdmin
      ? []
      : [
          {
            href: "/dashboard",
            label: MEMBER_TOP_NAV_DASHBOARD_LABEL,
            match: (path: string) => path === "/dashboard",
          },
        ]),
    {
      href: "/communities",
      label: MEMBER_TOP_NAV_COMMUNITIES_LABEL,
      match: (path: string) => path.startsWith("/communities"),
    },
    ...(isAdmin || isSuperAdmin
      ? [
          {
            href: adminHref,
            label: MEMBER_TOP_NAV_ADMIN_LABEL,
            match: (path: string) => path.startsWith("/admin"),
          },
        ]
      : []),
  ];

  return (
    <header className={MEMBER_TOP_NAV_HEADER_CLASS}>
      <nav className={MEMBER_TOP_NAV_NAV_CLASS}>
        <Link href={brandHref} className={MEMBER_TOP_NAV_BRAND_CLASS}>
          {MEMBER_TOP_NAV_BRAND_LABEL}
        </Link>

        <div className={MEMBER_TOP_NAV_TABS_CLASS}>
          {tabs.map((tab) => (
            <NavTabLink
              key={tab.href}
              {...tab}
              isActive={tab.match(pathname)}
            />
          ))}
        </div>

        <div className={MEMBER_TOP_NAV_ACTIONS_CLASS}>
          <Input
            disabled
            aria-hidden
            placeholder={MEMBER_TOP_NAV_SEARCH_PLACEHOLDER}
            className={MEMBER_TOP_NAV_SEARCH_INPUT_CLASS}
          />
          <NotificationBell userId={userId} />
          <UserAvatarMenu />
        </div>
      </nav>
    </header>
  );
}
