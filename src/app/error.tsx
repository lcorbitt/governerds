"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";
import { ROUTE_ERROR_COPY } from "@/app/constants";

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
      title={ROUTE_ERROR_COPY.title}
      description={ROUTE_ERROR_COPY.description}
      onRetry={reset}
      homeHref="/dashboard"
      homeLabel={ROUTE_ERROR_COPY.goToDashboard}
    />
  );
}
