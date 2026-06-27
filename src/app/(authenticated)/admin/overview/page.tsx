import { PrefetchBoundary } from "@/lib/query/prefetch-boundary";
import { prefetchAdminOverviewQuery } from "@/server/prefetch/admin";

import { AdminOverview } from "./components/AdminOverview";

export default async function AdminOverviewPage() {
  return (
    <PrefetchBoundary prefetch={prefetchAdminOverviewQuery}>
      <AdminOverview />
    </PrefetchBoundary>
  );
}
