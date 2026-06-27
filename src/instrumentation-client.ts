import * as Sentry from "@sentry/nextjs";

/**
 * Client-side Sentry initialization. Runs in the browser. No-ops without a DSN.
 */
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate:
      process.env.NEXT_PUBLIC_APP_ENV === "production" ? 0.1 : 1.0,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
