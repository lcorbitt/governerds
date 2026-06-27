import { serve } from "inngest/next";

import { inngest } from "@/lib/providers/jobs/client";
import { functions } from "@/lib/jobs/functions";

/**
 * Inngest webhook. This is the only domain-agnostic Next.js API route in the
 * app — a platform requirement, not a proxy in front of our Edge Functions.
 */
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions,
});
