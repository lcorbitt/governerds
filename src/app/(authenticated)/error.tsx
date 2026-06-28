"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";
import { AUTHENTICATED_ROUTE_ERROR_COPY } from "@/app/constants";

export default function AuthenticatedError({
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
      title={AUTHENTICATED_ROUTE_ERROR_COPY.title}
      description={AUTHENTICATED_ROUTE_ERROR_COPY.description}
      onRetry={reset}
      homeHref="/dashboard"
      homeLabel={AUTHENTICATED_ROUTE_ERROR_COPY.backToDashboard}
    />
  );
}
