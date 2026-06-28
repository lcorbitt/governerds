"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

import {
  GLOBAL_ERROR_BODY_CLASS,
  GLOBAL_ERROR_DESCRIPTION,
  GLOBAL_ERROR_TITLE,
} from "@/app/constants";
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
      <body className={GLOBAL_ERROR_BODY_CLASS}>
        <ErrorState
          title={GLOBAL_ERROR_TITLE}
          description={GLOBAL_ERROR_DESCRIPTION}
          onRetry={reset}
        />
      </body>
    </html>
  );
}
