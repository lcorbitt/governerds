import { QueryClient, isServer } from "@tanstack/react-query";
import { cache } from "react";

/**
 * Shared TanStack Query defaults. Used by the browser provider and SSR prefetch.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

const getServerQueryClient = cache(() => makeQueryClient());

/**
 * Returns a QueryClient for the current runtime. On the server, React `cache()`
 * deduplicates within a single request. In the browser, a singleton is reused.
 */
export function getQueryClient() {
  if (isServer) return getServerQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
