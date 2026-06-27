/**
 * Application error hierarchy.
 *
 * Every thrown error carries a machine-readable `code`, an HTTP `status`, and a
 * `userMessage` written in plain language for our non-technical audience. The
 * raw `message` is for logs only and must never be shown to end users
 * (OWASP A10: Mishandling of Exceptional Conditions).
 */
export type ErrorCode =
  | "validation_error"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "rate_limited"
  | "conflict"
  | "internal_error";

export interface AppErrorOptions {
  code: ErrorCode;
  status: number;
  userMessage: string;
  message?: string;
  cause?: unknown;
  details?: Record<string, unknown>;
}

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly userMessage: string;
  readonly details?: Record<string, unknown>;

  constructor(options: AppErrorOptions) {
    super(options.message ?? options.userMessage);
    this.name = "AppError";
    this.code = options.code;
    this.status = options.status;
    this.userMessage = options.userMessage;
    this.details = options.details;
    if (options.cause) this.cause = options.cause;
  }
}

export class ValidationError extends AppError {
  constructor(
    userMessage = "Please check the highlighted fields and try again.",
    details?: Record<string, unknown>,
  ) {
    super({ code: "validation_error", status: 400, userMessage, details });
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(userMessage = "Please sign in to continue.") {
    super({ code: "unauthorized", status: 401, userMessage });
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(userMessage = "You do not have permission to do that.") {
    super({ code: "forbidden", status: 403, userMessage });
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends AppError {
  constructor(userMessage = "We could not find what you were looking for.") {
    super({ code: "not_found", status: 404, userMessage });
    this.name = "NotFoundError";
  }
}

export class RateLimitedError extends AppError {
  constructor(
    userMessage = "You are doing that too quickly. Please wait a moment and try again.",
  ) {
    super({ code: "rate_limited", status: 429, userMessage });
    this.name = "RateLimitedError";
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Convert any thrown value into a safe, serializable error payload. Unknown
 * errors collapse to a generic internal error so internals never leak.
 */
export function toErrorResponse(error: unknown): {
  status: number;
  body: {
    error: {
      code: ErrorCode;
      message: string;
      details?: Record<string, unknown>;
    };
  };
} {
  if (isAppError(error)) {
    return {
      status: error.status,
      body: {
        error: {
          code: error.code,
          message: error.userMessage,
          details: error.details,
        },
      },
    };
  }

  return {
    status: 500,
    body: {
      error: {
        code: "internal_error",
        message: "Something went wrong on our end. Please try again shortly.",
      },
    },
  };
}
