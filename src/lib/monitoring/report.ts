import * as Sentry from "@sentry/nextjs";

import { isAppError } from "@/lib/errors/app-error";

/**
 * Reports an unexpected error to Sentry. Expected `AppError`s with 4xx status
 * are user-facing and not worth alerting on, so we skip them. No-ops cleanly
 * when Sentry has no DSN configured.
 */
export function reportError(
  error: unknown,
  context?: Record<string, unknown>,
): void {
  if (isAppError(error) && error.status < 500) return;

  Sentry.captureException(error, context ? { extra: context } : undefined);
}
