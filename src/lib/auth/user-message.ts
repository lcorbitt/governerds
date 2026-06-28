/**
 * Maps Supabase Auth failures to plain-language messages for our audience.
 * Never surfaces raw codes, stack traces, or provider internals.
 */

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  email_exists:
    "That email is already registered. Try logging in, or reset your password if you forgot it.",
  user_already_exists:
    "That email is already registered. Try logging in, or reset your password if you forgot it.",
  over_email_send_rate_limit:
    "We sent too many emails in a short time. Please wait about an hour and try again.",
  over_request_rate_limit:
    "Too many attempts. Please wait a few minutes and try again.",
  over_sms_send_rate_limit:
    "Too many text messages were sent. Please wait a few minutes and try again.",
  invalid_credentials:
    "That email or password did not match. Please try again.",
  email_not_confirmed:
    "Please confirm your email before signing in. Check your inbox for the link.",
  weak_password:
    "Please choose a stronger password. Use at least 8 characters.",
  validation_failed: "Please check your email and password and try again.",
  signup_disabled:
    "New signups are not available right now. Please try again later.",
  otp_expired: "That link has expired. Please request a new one.",
  same_password: "Please choose a different password than your current one.",
  session_not_found: "Your session expired. Please sign in again.",
  session_expired: "Your session expired. Please sign in again.",
  user_banned:
    "This account cannot sign in right now. Contact support if you need help.",
  email_address_invalid:
    "That email address does not look valid. Please check it and try again.",
  captcha_failed: "We could not verify you are human. Please try again.",
  provider_disabled: "That sign-in option is not available right now.",
  oauth_provider_not_supported:
    "That sign-in option is not available right now.",
};

function readAuthErrorCode(error: unknown): string | undefined {
  if (typeof error !== "object" || error === null) return undefined;
  if (
    "code" in error &&
    typeof error.code === "string" &&
    error.code.length > 0
  ) {
    return error.code;
  }
  return undefined;
}

function readAuthErrorStatus(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null) return undefined;
  if ("status" in error && typeof error.status === "number") {
    return error.status;
  }
  return undefined;
}

function readAuthErrorMessage(error: unknown): string | undefined {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }
  return undefined;
}

function messageFromText(message: string): string | undefined {
  const normalized = message.toLowerCase();

  if (normalized.includes("rate limit") && normalized.includes("email")) {
    return AUTH_ERROR_MESSAGES.over_email_send_rate_limit;
  }
  if (normalized.includes("rate limit")) {
    return AUTH_ERROR_MESSAGES.over_request_rate_limit;
  }
  if (
    normalized.includes("already registered") ||
    normalized.includes("already been registered") ||
    normalized.includes("user already exists")
  ) {
    return AUTH_ERROR_MESSAGES.user_already_exists;
  }
  if (normalized.includes("invalid login credentials")) {
    return AUTH_ERROR_MESSAGES.invalid_credentials;
  }
  if (normalized.includes("email not confirmed")) {
    return AUTH_ERROR_MESSAGES.email_not_confirmed;
  }

  return undefined;
}

/**
 * Returns a user-safe auth message when `error` looks like a Supabase Auth
 * failure; otherwise returns `fallback`.
 */
export function getAuthErrorMessage(error: unknown, fallback: string): string {
  const code = readAuthErrorCode(error);
  if (code && AUTH_ERROR_MESSAGES[code]) {
    return AUTH_ERROR_MESSAGES[code];
  }

  if (readAuthErrorStatus(error) === 429) {
    return AUTH_ERROR_MESSAGES.over_request_rate_limit;
  }

  const message = readAuthErrorMessage(error);
  if (message) {
    const fromText = messageFromText(message);
    if (fromText) return fromText;
  }

  return fallback;
}

export function isAuthLikeError(error: unknown): boolean {
  return (
    readAuthErrorCode(error) !== undefined || readAuthErrorStatus(error) === 429
  );
}
