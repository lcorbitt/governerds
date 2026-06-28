"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";
import { GLOBAL_ERROR_COPY } from "@/app/constants";

/**
 * Top-level error boundary. Reports to Sentry and shows a calm, plain-language
 * recovery screen — never a stack trace (OWASP A10).
 */
export default function GlobalError({
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
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <ErrorState
          title={GLOBAL_ERROR_COPY.title}
          description={GLOBAL_ERROR_COPY.description}
          onRetry={reset}
        />
      </body>
    </html>
  );
}
