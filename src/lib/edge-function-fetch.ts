/**
 * Browser-side Edge Function fetch. Re-exported for backward compatibility.
 * Frontend services import from here; SSR prefetch uses `fetch.server.ts`.
 */
export {
  EdgeFunctionError,
  type EdgeFetchOptions,
} from "@/lib/edge-function/request";
export { edgeFunctionFetch } from "@/lib/edge-function/fetch.client";
