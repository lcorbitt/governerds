"use client";

import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import {
  DROPDOWN_CLASS,
  EMPTY_BODY,
  EMPTY_ITEM_CLASS,
  ICON_CLASS,
  ITEM_ACTIVE_CLASS,
  ITEM_CLASS,
  TITLE_CLASS,
  TRIGGER_CLASS,
  TRIGGER_LABEL,
} from "./constants";
import { useCommunityPicker } from "./useCommunityPicker";

interface CommunityPickerProps {
  isSuperAdmin: boolean;
}

export function CommunityPicker({ isSuperAdmin }: CommunityPickerProps) {
  const { communities, displayName, selectedSlug, isEmpty, selectCommunity } =
    useCommunityPicker({ isSuperAdmin });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={TRIGGER_CLASS}
          aria-label={TRIGGER_LABEL}
        >
          <span className={TITLE_CLASS}>{displayName}</span>
          <ChevronsUpDown className={ICON_CLASS} aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={DROPDOWN_CLASS}>
        {isEmpty ? (
          <DropdownMenuItem disabled className={EMPTY_ITEM_CLASS}>
            {EMPTY_BODY}
          </DropdownMenuItem>
        ) : (
          communities.map((community) => (
            <DropdownMenuItem
              key={community.id}
              className={cn(
                ITEM_CLASS,
                community.slug === selectedSlug && ITEM_ACTIVE_CLASS,
              )}
              onSelect={() => selectCommunity(community.slug)}
            >
              {community.name}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
