"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import {
  ROUTE_ERROR_DESCRIPTION,
  ROUTE_ERROR_GO_TO_DASHBOARD_LABEL,
  ROUTE_ERROR_TITLE,
} from "@/app/constants";
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
      title={ROUTE_ERROR_TITLE}
      description={ROUTE_ERROR_DESCRIPTION}
      onRetry={reset}
      homeHref="/dashboard"
      homeLabel={ROUTE_ERROR_GO_TO_DASHBOARD_LABEL}
    />
  );
}
