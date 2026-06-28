import { z } from "zod";

import { CREATE_COMMUNITY_VALIDATION } from "./constants";

export const createCommunitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, CREATE_COMMUNITY_VALIDATION.nameMin)
    .max(80, CREATE_COMMUNITY_VALIDATION.nameMax),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, CREATE_COMMUNITY_VALIDATION.slugMin)
    .max(50, CREATE_COMMUNITY_VALIDATION.slugMax)
    .regex(/^[a-z0-9-]+$/, CREATE_COMMUNITY_VALIDATION.slugPattern),
});

export type CreateCommunityInput = z.infer<typeof createCommunitySchema>;
