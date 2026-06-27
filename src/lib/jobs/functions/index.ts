import { sendEmail } from "./send-email";
import { onUserCreated } from "./on-user-created";
import { onProfileUpdated } from "./on-profile-updated";
import { writeAuditLog } from "./write-audit-log";
import { indexSearchDocument } from "./index-search-document";
import { invalidateCache } from "./invalidate-cache";
import { trackAnalytics } from "./track-analytics";

/**
 * Every Inngest function registered with the serve handler. Add new functions
 * here so they are picked up by the `/api/inngest` route.
 */
export const functions = [
  sendEmail,
  onUserCreated,
  onProfileUpdated,
  writeAuditLog,
  indexSearchDocument,
  invalidateCache,
  trackAnalytics,
];
