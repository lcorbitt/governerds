import type { ReactNode } from "react";

import { requireSuperAdmin } from "@/server/loaders/access";

export default async function AdminSiteNavigationLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireSuperAdmin();
  return <>{children}</>;
}
