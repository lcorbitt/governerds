"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { AdminSidebar, AdminSidebarMobile } from "../AdminSidebar";

import {
  AUTHENTICATED_SHELL_BODY_ADMIN_LAYOUT_CLASS,
  AUTHENTICATED_SHELL_BODY_ADMIN_MAIN_CLASS,
  AUTHENTICATED_SHELL_BODY_DEFAULT_MAIN_CLASS,
} from "./constants";

interface AuthenticatedShellBodyProps {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  children: ReactNode;
}

export function AuthenticatedShellBody({
  isAdmin,
  isSuperAdmin,
  children,
}: AuthenticatedShellBodyProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const showAdminSidebar = isAdminRoute && isAdmin;

  if (showAdminSidebar) {
    return (
      <div className={AUTHENTICATED_SHELL_BODY_ADMIN_LAYOUT_CLASS}>
        <AdminSidebarMobile isSuperAdmin={isSuperAdmin} />
        <AdminSidebar isSuperAdmin={isSuperAdmin} />
        <main
          id="main-content"
          className={AUTHENTICATED_SHELL_BODY_ADMIN_MAIN_CLASS}
        >
          {children}
        </main>
      </div>
    );
  }

  return (
    <main
      id="main-content"
      className={AUTHENTICATED_SHELL_BODY_DEFAULT_MAIN_CLASS}
    >
      {children}
    </main>
  );
}
