import type { ReactNode } from "react";

import { requireSuperAdmin } from "@/server/loaders/access";

export default async function AdminOverviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireSuperAdmin();
  return <>{children}</>;
}
