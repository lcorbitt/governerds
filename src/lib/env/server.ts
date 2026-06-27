import "server-only";

import { z } from "zod";

import { coerceBlankEnv } from "./coerce";

/**
 * Server-only environment schema. Validated once at module load so the app
 * fails fast on misconfiguration (OWASP A02: Security Misconfiguration).
 * Never import this file from client components.
 */
const serverEnvSchema = z.object({
  APP_ENV: z
    .enum(["local", "development", "staging", "production"])
    .default("local"),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // Upstash Redis (CacheProvider default)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  // Email (EmailProvider)
  EMAIL_PROVIDER: z.enum(["resend"]).default("resend"),
  RESEND_API_KEY: z.string().min(1).optional(),
  EMAIL_FROM: z.string().default("GoverNerds <onboarding@resend.dev>"),

  // Jobs (JobProvider)
  JOB_PROVIDER: z.enum(["inngest"]).default("inngest"),
  INNGEST_EVENT_KEY: z.string().min(1).optional(),
  INNGEST_SIGNING_KEY: z.string().min(1).optional(),

  // Analytics (AnalyticsProvider)
  ANALYTICS_PROVIDER: z.enum(["posthog", "none"]).default("none"),
  POSTHOG_API_KEY: z.string().min(1).optional(),
  POSTHOG_HOST: z.string().url().default("https://us.i.posthog.com"),

  // Monitoring (MonitoringProvider)
  SENTRY_DSN: z.string().url().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

function loadServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse(coerceBlankEnv(process.env));

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `Invalid server environment variables:\n${issues}\n\n` +
        "Copy .env.example to .env.local and fill in the required values.",
    );
  }

  return parsed.data;
}

export const env = loadServerEnv();
