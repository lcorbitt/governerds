"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

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
      title="Something went wrong"
      description="We could not load this page right now. Please try again in a moment."
      onRetry={reset}
      homeHref="/dashboard"
      homeLabel="Back to dashboard"
    />
  );
}
