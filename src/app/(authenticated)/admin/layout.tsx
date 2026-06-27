import type { ReactNode } from "react";

import { requireAdmin } from "@/server/loaders/access";

/**
 * Admin subtree gate. A nested layout — NOT a route group — that requires an
 * admin role. Non-admins are redirected to their dashboard. This is the
 * coarse UI gate; mutations are still authorized server-side.
 */
export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();
  return <>{children}</>;
}
