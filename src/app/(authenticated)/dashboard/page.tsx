import { redirect } from "next/navigation";

import { PrefetchBoundary } from "@/lib/query/prefetch-boundary";
import { isSuperAdmin } from "@/server/loaders/access";
import { prefetchFeatureFlagQuery } from "@/server/prefetch/feature-flag";
import { requireSession } from "@/server/loaders/session";

import { Dashboard } from "./components/Dashboard";

/**
 * Dashboard page. Prefetches the new-dashboard feature flag on the server so
 * the client feature shell hydrates without a loading spinner.
 */
export default async function DashboardPage() {
  const session = await requireSession();
  if (isSuperAdmin(session)) redirect("/admin/overview");

  return (
    <PrefetchBoundary
      prefetch={(queryClient) =>
        prefetchFeatureFlagQuery(queryClient, "new-dashboard")
      }
    >
      <Dashboard />
    </PrefetchBoundary>
  );
}
