import { z } from "zod";

import type { HandlerContext } from "@shared/context.ts";
import { apiResponse } from "@shared/response.ts";
import { updateProfile } from "@services/user/profile.service.ts";

const bodySchema = z.object({
  displayName: z.string().max(80).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
});

/**
 * HTTP adapter for updating the current user's profile. Parses and validates
 * input, then delegates to the service. Ownership is implicit: the service
 * scopes the update to the caller's own row, and RLS enforces it.
 */
export async function handle(ctx: HandlerContext): Promise<Response> {
  if (ctx.req.method !== "PATCH") {
    return apiResponse.error(405, "validation_error", "Method not allowed.");
  }
  if (!ctx.user || !ctx.userClient) return apiResponse.unauthorized();

  let json: unknown;
  try {
    json = await ctx.req.json();
  } catch {
    return apiResponse.badRequest("Please send a valid request.");
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return apiResponse.badRequest("Please check the fields and try again.", {
      issues: parsed.error.flatten().fieldErrors,
    });
  }

  const profile = await updateProfile(ctx.userClient, ctx.user.id, parsed.data);
  return apiResponse.ok(profile);
}
