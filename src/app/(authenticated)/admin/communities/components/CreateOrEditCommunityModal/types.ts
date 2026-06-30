import { z } from "zod";

import { COMMUNITY_FORM_VALIDATION } from "./constants";

export const communityFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, COMMUNITY_FORM_VALIDATION.nameMin)
    .max(80, COMMUNITY_FORM_VALIDATION.nameMax),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, COMMUNITY_FORM_VALIDATION.slugMin)
    .max(50, COMMUNITY_FORM_VALIDATION.slugMax)
    .regex(/^[a-z0-9-]+$/, COMMUNITY_FORM_VALIDATION.slugPattern),
});

export type CommunityFormInput = z.infer<typeof communityFormSchema>;
