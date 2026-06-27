import { events, inngest } from "@/lib/providers/jobs/publisher";
import type { AppEvent } from "@/lib/jobs/catalog";

export { inngest };

/**
 * Thin job-provider abstraction. Application and service code calls
 * `jobs.emit(event)` with a fully-typed `AppEvent`; swapping Inngest for another
 * queue means changing only `src/lib/providers/jobs/publisher.ts`.
 */
export const jobs = {
  emit(event: AppEvent): Promise<unknown> {
    return events.publish(event);
  },
};
