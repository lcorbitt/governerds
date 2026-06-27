import "server-only";

import {
  dehydrate,
  HydrationBoundary,
  type QueryClient,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

import { getQueryClient } from "@/lib/query/get-query-client";

interface PrefetchBoundaryProps {
  prefetch: (queryClient: QueryClient) => Promise<void>;
  children: ReactNode;
}

/**
 * Server Component wrapper that prefetches TanStack Query data for a route,
 * dehydrates the cache, and hydrates it on the client via HydrationBoundary.
 */
export async function PrefetchBoundary({
  prefetch,
  children,
}: PrefetchBoundaryProps) {
  const queryClient = getQueryClient();
  await prefetch(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
