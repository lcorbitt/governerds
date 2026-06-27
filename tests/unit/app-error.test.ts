import { describe, expect, it } from "vitest";

import { ForbiddenError, toErrorResponse } from "@/lib/errors/app-error";

describe("toErrorResponse", () => {
  it("maps an AppError to its status and user message", () => {
    const result = toErrorResponse(new ForbiddenError());
    expect(result.status).toBe(403);
    expect(result.body.error.code).toBe("forbidden");
    expect(result.body.error.message).toMatch(/permission/i);
  });

  it("collapses unknown errors into a safe 500 without leaking details", () => {
    const result = toErrorResponse(new Error("database password is hunter2"));
    expect(result.status).toBe(500);
    expect(result.body.error.code).toBe("internal_error");
    expect(result.body.error.message).not.toContain("hunter2");
  });
});
