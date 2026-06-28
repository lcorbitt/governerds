"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import {
  AUTHENTICATED_ROUTE_ERROR_BACK_TO_DASHBOARD_LABEL,
  AUTHENTICATED_ROUTE_ERROR_DESCRIPTION,
  AUTHENTICATED_ROUTE_ERROR_TITLE,
} from "@/app/constants";
import { ErrorState } from "@/components/shared/error-state";

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
      title={AUTHENTICATED_ROUTE_ERROR_TITLE}
      description={AUTHENTICATED_ROUTE_ERROR_DESCRIPTION}
      onRetry={reset}
      homeHref="/dashboard"
      homeLabel={AUTHENTICATED_ROUTE_ERROR_BACK_TO_DASHBOARD_LABEL}
    />
  );
}
