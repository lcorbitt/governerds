import * as Sentry from "@sentry/nextjs";

/**
 * Next.js instrumentation hook. Initializes Sentry on the server and edge
 * runtimes. Safe when `SENTRY_DSN` is absent — the SDK simply does nothing.
 */
export async function register() {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;

  const tracesSampleRate = process.env.APP_ENV === "production" ? 0.1 : 1.0;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({ dsn, tracesSampleRate });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({ dsn, tracesSampleRate });
  }
}

export const onRequestError = Sentry.captureRequestError;
