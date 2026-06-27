"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";

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
          title="Something went wrong"
          description="We hit an unexpected problem. Please try again. If it keeps happening, come back in a few minutes."
          onRetry={reset}
        />
      </body>
    </html>
  );
}
