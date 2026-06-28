"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flag,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  ADMIN_SIDEBAR_ASIDE_CLASS,
  ADMIN_SIDEBAR_BACK_LINK_CLASS,
  ADMIN_SIDEBAR_BACK_TO_COMMUNITIES_LABEL,
  ADMIN_SIDEBAR_BACK_TO_DASHBOARD_LABEL,
  ADMIN_SIDEBAR_COMING_SOON_BADGE_CLASS,
  ADMIN_SIDEBAR_COMING_SOON_LABEL,
  ADMIN_SIDEBAR_FEATURE_FLAGS_LABEL,
  ADMIN_SIDEBAR_FOOTER_CLASS,
  ADMIN_SIDEBAR_HEADER_CLASS,
  ADMIN_SIDEBAR_MANAGE_COMMUNITIES_LABEL,
  ADMIN_SIDEBAR_MOBILE_NAV_CLASS,
  ADMIN_SIDEBAR_MOBILE_TAB_ACTIVE_CLASS,
  ADMIN_SIDEBAR_MOBILE_TAB_CLASS,
  ADMIN_SIDEBAR_MOBILE_TAB_INACTIVE_CLASS,
  ADMIN_SIDEBAR_MODERATION_LABEL,
  ADMIN_SIDEBAR_NAV_CLASS,
  ADMIN_SIDEBAR_NAV_ICON_CLASS,
  ADMIN_SIDEBAR_NAV_LABEL_CLASS,
  ADMIN_SIDEBAR_NAV_LINK_ACTIVE_CLASS,
  ADMIN_SIDEBAR_NAV_LINK_CLASS,
  ADMIN_SIDEBAR_NAV_LINK_INACTIVE_CLASS,
  ADMIN_SIDEBAR_OVERVIEW_LABEL,
  ADMIN_SIDEBAR_PLATFORM_SETTINGS_LABEL,
  ADMIN_SIDEBAR_SUBTITLE,
  ADMIN_SIDEBAR_SUBTITLE_CLASS,
  ADMIN_SIDEBAR_TITLE,
  ADMIN_SIDEBAR_TITLE_CLASS,
  ADMIN_SIDEBAR_USERS_LABEL,
} from "./constants";

interface AdminSidebarProps {
  isSuperAdmin: boolean;
}

interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  superAdminOnly?: boolean;
  comingSoon?: boolean;
}

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    href: "/admin/overview",
    label: ADMIN_SIDEBAR_OVERVIEW_LABEL,
    icon: LayoutDashboard,
    superAdminOnly: true,
  },
  {
    href: "/admin/communities",
    label: ADMIN_SIDEBAR_MANAGE_COMMUNITIES_LABEL,
    icon: UsersRound,
  },
  {
    href: "/admin/flags",
    label: ADMIN_SIDEBAR_FEATURE_FLAGS_LABEL,
    icon: Flag,
    comingSoon: true,
  },
  {
    href: "/admin/users",
    label: ADMIN_SIDEBAR_USERS_LABEL,
    icon: Users,
    comingSoon: true,
  },
  {
    href: "/admin/moderation",
    label: ADMIN_SIDEBAR_MODERATION_LABEL,
    icon: Shield,
    comingSoon: true,
  },
  {
    href: "/admin/settings",
    label: ADMIN_SIDEBAR_PLATFORM_SETTINGS_LABEL,
    icon: Settings,
    superAdminOnly: true,
    comingSoon: true,
  },
];

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/admin/overview") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({ isSuperAdmin }: AdminSidebarProps) {
  const pathname = usePathname();
  const visibleItems = ADMIN_NAV_ITEMS.filter(
    (item) => !item.superAdminOnly || isSuperAdmin,
  );
  const backHref = isSuperAdmin ? "/communities" : "/dashboard";
  const backLabel = isSuperAdmin
    ? ADMIN_SIDEBAR_BACK_TO_COMMUNITIES_LABEL
    : ADMIN_SIDEBAR_BACK_TO_DASHBOARD_LABEL;

  return (
    <aside className={ADMIN_SIDEBAR_ASIDE_CLASS}>
      <div className={ADMIN_SIDEBAR_HEADER_CLASS}>
        <p className={ADMIN_SIDEBAR_TITLE_CLASS}>{ADMIN_SIDEBAR_TITLE}</p>
        <p className={ADMIN_SIDEBAR_SUBTITLE_CLASS}>{ADMIN_SIDEBAR_SUBTITLE}</p>
      </div>

      <nav className={ADMIN_SIDEBAR_NAV_CLASS}>
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                ADMIN_SIDEBAR_NAV_LINK_CLASS,
                isActive
                  ? ADMIN_SIDEBAR_NAV_LINK_ACTIVE_CLASS
                  : ADMIN_SIDEBAR_NAV_LINK_INACTIVE_CLASS,
              )}
            >
              <Icon className={ADMIN_SIDEBAR_NAV_ICON_CLASS} aria-hidden />
              <span className={ADMIN_SIDEBAR_NAV_LABEL_CLASS}>
                {item.label}
              </span>
              {item.comingSoon ? (
                <span className={ADMIN_SIDEBAR_COMING_SOON_BADGE_CLASS}>
                  {ADMIN_SIDEBAR_COMING_SOON_LABEL}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className={ADMIN_SIDEBAR_FOOTER_CLASS}>
        <Link href={backHref} className={ADMIN_SIDEBAR_BACK_LINK_CLASS}>
          {backLabel}
        </Link>
      </div>
    </aside>
  );
}

export function AdminSidebarMobile({ isSuperAdmin }: AdminSidebarProps) {
  const pathname = usePathname();
  const visibleItems = ADMIN_NAV_ITEMS.filter(
    (item) => !item.superAdminOnly || isSuperAdmin,
  );

  return (
    <nav
      aria-label={ADMIN_SIDEBAR_TITLE}
      className={ADMIN_SIDEBAR_MOBILE_NAV_CLASS}
    >
      {visibleItems.map((item) => {
        const isActive = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              ADMIN_SIDEBAR_MOBILE_TAB_CLASS,
              isActive
                ? ADMIN_SIDEBAR_MOBILE_TAB_ACTIVE_CLASS
                : ADMIN_SIDEBAR_MOBILE_TAB_INACTIVE_CLASS,
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
