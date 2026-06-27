import type { ReactNode } from "react";

import { requireSession } from "@/server/loaders/session";

/**
 * Member group layout (Phase 1 stub). Reserved for signed-in users who get a
 * distinct shell from primary users (e.g. community members). For now it
 * simply requires a session; its own shell and role redirect arrive later.
 */
export default async function MemberLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireSession();
  return <>{children}</>;
}
