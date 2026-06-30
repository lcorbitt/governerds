import type {
  DestinationType,
  NavigationItem,
  VisibilityRuleId,
} from "./types";
import { createNavigationItemId } from "./utils";

export const TITLE = "Navigation";

export const SUBTITLE =
  "Configure the top navigation and mobile menu visitors see on the unauthenticated marketing site.";

export const EDITOR_PANEL_LABEL = "Editor";

export const PREVIEW_PANEL_LABEL = "Preview";

export const MENU_TITLE = "Primary Menu";

export const MENU_DESCRIPTION =
  "Drag to reorder, drag right to nest, or use indent controls. Changes stay in draft until you publish.";

export const ADD_ITEM_LABEL = "Add Item";

export const SAVE_DRAFT_LABEL = "Save Draft";

export const PUBLISH_LABEL = "Publish";

export const RESET_LABEL = "Reset";

export const PREVIEW_LABEL = "Preview";

export const PREVIEW_ACTIVE_LABEL = "Exit Preview";

export const UNSAVED_DRAFT_LABEL = "Unsaved Draft";

export const EMPTY_LIST_TITLE = "No Navigation Items Yet";

export const EMPTY_LIST_DESCRIPTION =
  "Add your first item to start building the public top nav and mobile menu.";

export const TOAST_SAVE_DRAFT_SUCCESS = "Draft saved.";

export const TOAST_PUBLISH_SUCCESS = "Navigation published.";

export const TOAST_RESET_SUCCESS = "Draft reset to the published menu.";

export const TOAST_DELETE_SUCCESS = "Navigation item removed.";

export const DELETE_CONFIRM_TITLE = "Delete Navigation Item?";

export const DELETE_CONFIRM_DESCRIPTION =
  "This removes the item and any nested children from your draft.";

export const DELETE_CONFIRM_LABEL = "Delete Item";

export const DELETE_CANCEL_LABEL = "Cancel";

export const PAGE_OPTIONS = [
  { value: "/", label: "Home" },
  { value: "/articles", label: "Articles" },
  { value: "/videos", label: "Videos" },
  { value: "/courses", label: "Courses" },
  { value: "/discussions", label: "Discussions" },
  { value: "/resources", label: "Resources" },
  { value: "/events", label: "Events" },
  { value: "/about", label: "About" },
  { value: "/podcast", label: "Podcast" },
] as const;

export const MOCK_SPACE_OPTIONS = [
  { value: "engineering", label: "Engineering" },
  { value: "photography", label: "Photography" },
  { value: "announcements", label: "Announcements" },
  { value: "vip-members", label: "VIP Members" },
  { value: "react-course", label: "React Course" },
] as const;

export const MOCK_CATEGORY_OPTIONS = [
  { value: "engineering", label: "Engineering" },
  { value: "news", label: "News" },
  { value: "business", label: "Business" },
  { value: "music", label: "Music" },
] as const;

export const MOCK_CONTENT_OPTIONS = [
  { value: "welcome", label: "Welcome to the Community" },
  { value: "getting-started", label: "Getting Started Guide" },
  { value: "community-rules", label: "Community Rules" },
] as const;

export const VISIBILITY_RULE_OPTIONS: {
  value: VisibilityRuleId;
  label: string;
}[] = [
  { value: "everyone", label: "Everyone" },
  { value: "members", label: "Members Only" },
  { value: "paid_members", label: "Paid Members Only" },
  { value: "admins", label: "Admins Only" },
  { value: "moderators", label: "Moderators Only" },
  { value: "creators", label: "Creators Only" },
  { value: "vip_tag", label: "VIP Tag" },
  { value: "organization_tag", label: "Organization Tag" },
  { value: "custom", label: "Custom Permission" },
];

export const DESTINATION_TYPE_OPTIONS: {
  value: DestinationType;
  label: string;
}[] = [
  { value: "page", label: "Page" },
  { value: "space", label: "Space" },
  { value: "category", label: "Category" },
  { value: "content", label: "Content" },
  { value: "external_url", label: "External Link" },
  { value: "custom_route", label: "Custom Route" },
  { value: "divider", label: "Divider" },
  { value: "heading", label: "Heading" },
];

function createSeedItem(
  index: number,
  partial: Pick<
    NavigationItem,
    "label" | "destinationType" | "icon" | "destinationId"
  > &
    Partial<NavigationItem>,
): NavigationItem {
  return {
    id: createNavigationItemId(),
    parentId: null,
    sortOrder: index,
    metadata: {},
    isVisible: true,
    isEnabled: true,
    visibilityRuleId: "everyone",
    ...partial,
  };
}

export const SEED_NAVIGATION_ITEMS: NavigationItem[] = [
  createSeedItem(0, {
    label: "Home",
    destinationType: "page",
    icon: "Home",
    destinationId: "/",
  }),
  createSeedItem(1, {
    label: "Articles",
    destinationType: "page",
    icon: "Newspaper",
    destinationId: "/articles",
  }),
  createSeedItem(2, {
    label: "Videos",
    destinationType: "page",
    icon: "Video",
    destinationId: "/videos",
  }),
  createSeedItem(3, {
    label: "Courses",
    destinationType: "page",
    icon: "GraduationCap",
    destinationId: "/courses",
  }),
  createSeedItem(4, {
    label: "Discussions",
    destinationType: "page",
    icon: "MessageSquare",
    destinationId: "/discussions",
  }),
  createSeedItem(5, {
    label: "Resources",
    destinationType: "page",
    icon: "FolderOpen",
    destinationId: "/resources",
  }),
  createSeedItem(6, {
    label: "Events",
    destinationType: "page",
    icon: "Calendar",
    destinationId: "/events",
  }),
  createSeedItem(7, {
    label: "About",
    destinationType: "page",
    icon: "Info",
    destinationId: "/about",
  }),
  createSeedItem(8, {
    label: "Podcast",
    destinationType: "page",
    icon: "Mic",
    destinationId: "/podcast",
  }),
];

export const PAGE_CLASS = "flex flex-col gap-6";

export const TITLE_CLASS = "text-3xl font-bold tracking-tight";

export const SUBTITLE_CLASS = "text-muted-foreground text-lg";

export const BUILDER_GRID_CLASS =
  "grid min-h-[32rem] gap-4 lg:grid-cols-2 lg:gap-6";

export const PANEL_CLASS =
  "border-border bg-muted/30 flex min-h-[28rem] flex-col gap-4 rounded-lg border p-6";

export const PANEL_LABEL_CLASS =
  "text-muted-foreground text-xs font-semibold tracking-wide uppercase";

export const TOOLBAR_CLASS = "flex flex-wrap items-center gap-2";

export const DRAFT_BADGE_CLASS =
  "bg-amber-500/15 text-amber-700 dark:text-amber-300 rounded-md px-2 py-1 text-xs font-medium";

export const HEADER_ROW_CLASS =
  "flex flex-wrap items-start justify-between gap-4";

export const HEADER_COPY_CLASS = "flex flex-col gap-2";
