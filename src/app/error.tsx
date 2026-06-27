"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";

/**
 * Route-level error boundary. Reports to Sentry and shows a calm recovery
 * screen — never a stack trace (OWASP A10).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <ErrorState
      title="Something went wrong"
      description="We hit an unexpected problem on this page. Please try again. If it keeps happening, come back in a few minutes."
      onRetry={reset}
      homeHref="/dashboard"
      homeLabel="Go to dashboard"
    />
  );
}
