import { z } from "zod";

export const DESTINATION_TYPES = [
  "page",
  "space",
  "category",
  "content",
  "external_url",
  "custom_route",
  "divider",
  "heading",
] as const;

export type DestinationType = (typeof DESTINATION_TYPES)[number];

export const VISIBILITY_RULE_IDS = [
  "everyone",
  "members",
  "paid_members",
  "admins",
  "moderators",
  "creators",
  "vip_tag",
  "organization_tag",
  "custom",
] as const;

export type VisibilityRuleId = (typeof VISIBILITY_RULE_IDS)[number];

export type NavigationItemMetadata = {
  opensInNewTab?: boolean;
};

export interface NavigationItem {
  id: string;
  parentId: string | null;
  label: string;
  icon: string | null;
  destinationType: DestinationType;
  destinationId: string | null;
  metadata: NavigationItemMetadata;
  sortOrder: number;
  isVisible: boolean;
  isEnabled: boolean;
  visibilityRuleId: VisibilityRuleId;
}

export type NavigationTreeNode = NavigationItem & {
  children: NavigationTreeNode[];
};

export type FlatNavigationRow = {
  id: string;
  item: NavigationItem;
  depth: number;
  parentId: string | null;
};

export type NavigationModalState =
  | { mode: "add"; parentId?: string | null }
  | { mode: "edit"; itemId: string }
  | null;

const DESTINATION_TYPES_REQUIRING_ID = [
  "page",
  "space",
  "category",
  "content",
  "external_url",
  "custom_route",
] as const satisfies readonly DestinationType[];

export const navigationItemFormSchema = z
  .object({
    destinationType: z.enum(DESTINATION_TYPES),
    label: z.string().trim().min(1, "Label is required."),
    icon: z.string().nullable(),
    destinationId: z.string().optional(),
    visibilityRuleId: z.enum(VISIBILITY_RULE_IDS),
    isVisible: z.boolean(),
    isEnabled: z.boolean(),
    opensInNewTab: z.boolean(),
  })
  .superRefine((values, context) => {
    if (
      DESTINATION_TYPES_REQUIRING_ID.includes(
        values.destinationType as (typeof DESTINATION_TYPES_REQUIRING_ID)[number],
      ) &&
      !values.destinationId?.trim()
    ) {
      context.addIssue({
        code: "custom",
        message: "Destination is required.",
        path: ["destinationId"],
      });
      return;
    }

    if (values.destinationType === "external_url" && values.destinationId) {
      try {
        const parsed = new URL(values.destinationId);
        if (!["http:", "https:"].includes(parsed.protocol)) {
          context.addIssue({
            code: "custom",
            message: "URL must start with http:// or https://.",
            path: ["destinationId"],
          });
        }
      } catch {
        context.addIssue({
          code: "custom",
          message: "Enter a valid URL.",
          path: ["destinationId"],
        });
      }
    }

    if (values.destinationType === "custom_route" && values.destinationId) {
      if (!values.destinationId.startsWith("/")) {
        context.addIssue({
          code: "custom",
          message: "Custom route must start with /.",
          path: ["destinationId"],
        });
      }
    }
  });

export type NavigationItemFormInput = z.infer<typeof navigationItemFormSchema>;
