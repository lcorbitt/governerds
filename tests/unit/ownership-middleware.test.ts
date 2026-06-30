import { describe, expect, it, vi } from "vitest";

import type { HandlerContext } from "../../supabase/functions/_http/context.ts";
import { withResourceOwnership } from "../../supabase/functions/_http/middleware/ownership.ts";

const { loadEffectiveAccess } = vi.hoisted(() => ({
  loadEffectiveAccess: vi.fn(),
}));

vi.mock(
  "../../supabase/functions/_services/access-control/access-control.service.ts",
  () => ({
    loadEffectiveAccess,
  }),
);

function makeCtx(overrides: Partial<HandlerContext> = {}): HandlerContext {
  return {
    req: new Request("http://localhost"),
    requestId: "test",
    url: new URL("http://localhost"),
    user: { id: "user-a", email: "a@test.com" },
    userClient: {} as HandlerContext["userClient"],
    permissions: [],
    roleSlugs: [],
    ...overrides,
  };
}

describe("withResourceOwnership", () => {
  it("returns 403 when the resource owner differs from the caller", async () => {
    const handler = vi.fn().mockResolvedValue(new Response("ok"));
    const middleware = withResourceOwnership({
      loadOwnerId: async () => "user-b",
    });

    const response = await middleware(handler)(makeCtx());

    expect(response.status).toBe(403);
    expect(handler).not.toHaveBeenCalled();
  });

  it("returns 404 when the resource does not exist", async () => {
    const handler = vi.fn().mockResolvedValue(new Response("ok"));
    const middleware = withResourceOwnership({
      loadOwnerId: async () => null,
    });

    const response = await middleware(handler)(makeCtx());

    expect(response.status).toBe(404);
    expect(handler).not.toHaveBeenCalled();
  });

  it("calls the handler when the caller owns the resource", async () => {
    const handler = vi.fn().mockResolvedValue(new Response("ok"));
    const middleware = withResourceOwnership({
      loadOwnerId: async () => "user-a",
    });

    const response = await middleware(handler)(makeCtx());

    expect(response.status).toBe(200);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("allows override permission after lazy-loading access context", async () => {
    loadEffectiveAccess.mockResolvedValue({
      permissions: ["notifications:manage"],
      roleSlugs: ["admin"],
    });

    const handler = vi.fn().mockResolvedValue(new Response("ok"));
    const middleware = withResourceOwnership({
      loadOwnerId: async () => "user-b",
      overridePermission: "notifications:manage",
    });

    const response = await middleware(handler)(makeCtx());

    expect(loadEffectiveAccess).toHaveBeenCalledWith({}, "user-a");
    expect(response.status).toBe(200);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
