import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Calendar,
  CircleHelp,
  ExternalLink,
  FolderOpen,
  GraduationCap,
  Headphones,
  Home,
  Info,
  LayoutGrid,
  Link2,
  MessageSquare,
  Mic,
  Minus,
  Newspaper,
  Settings,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  Users,
  Video,
} from "lucide-react";

export const LABEL = "Icon";

export const PLACEHOLDER = "Select an icon";

export const SEARCH_PLACEHOLDER = "Search icons";

export const EMPTY_MESSAGE = "No icons match your search.";

export const NONE_LABEL = "No Icon";

export const FIELD_CLASS = "flex flex-col gap-2";

export const LABEL_CLASS = "text-sm font-medium";

export const TRIGGER_CLASS =
  "border-input bg-background flex h-11 w-full items-center justify-between rounded-md border px-4 py-2 text-sm";

export const TRIGGER_VALUE_CLASS = "flex items-center gap-2";

export const TRIGGER_ICON_CLASS = "h-4 w-4 shrink-0";

export const CONTENT_CLASS = "w-[var(--radix-dropdown-menu-trigger-width)] p-2";

export const SEARCH_WRAPPER_CLASS = "mb-2 px-2";

export const SEARCH_INPUT_CLASS = "h-9 text-sm";

export const GRID_CLASS = "grid max-h-48 grid-cols-6 gap-2 overflow-y-auto p-2";

export const ICON_BUTTON_CLASS =
  "hover:bg-accent flex h-10 w-10 items-center justify-center rounded-md border border-transparent transition-colors";

export const ICON_BUTTON_SELECTED_CLASS = "border-primary bg-muted";

export const ICON_BUTTON_ICON_CLASS = "h-4 w-4";

export const NAV_ICON_OPTIONS = [
  "Home",
  "Newspaper",
  "Video",
  "GraduationCap",
  "MessageSquare",
  "FolderOpen",
  "Calendar",
  "Info",
  "Mic",
  "Headphones",
  "BookOpen",
  "Users",
  "LayoutGrid",
  "ShoppingBag",
  "Star",
  "Sparkles",
  "Tag",
  "Settings",
  "Link2",
  "ExternalLink",
  "CircleHelp",
  "Minus",
] as const;

export type NavIconName = (typeof NAV_ICON_OPTIONS)[number];

export const NAV_ICON_MAP: Record<NavIconName, LucideIcon> = {
  Home,
  Newspaper,
  Video,
  GraduationCap,
  MessageSquare,
  FolderOpen,
  Calendar,
  Info,
  Mic,
  Headphones,
  BookOpen,
  Users,
  LayoutGrid,
  ShoppingBag,
  Star,
  Sparkles,
  Tag,
  Settings,
  Link2,
  ExternalLink,
  CircleHelp,
  Minus,
};

export function resolveNavIcon(iconName: string | null): LucideIcon | null {
  if (!iconName) return null;
  return NAV_ICON_MAP[iconName as NavIconName] ?? null;
}
