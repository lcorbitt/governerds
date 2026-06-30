"use client";

import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useId, useRef } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  CONTENT_CLASS,
  DEFAULT_ALL_LABEL,
  DEFAULT_EMPTY_MESSAGE,
  DEFAULT_PLACEHOLDER,
  DEFAULT_SEARCH_PLACEHOLDER,
  EMPTY_MESSAGE_CLASS,
  FIELD_CLASS,
  LABEL_CLASS,
  OPTION_CHECK_CLASS,
  OPTION_CLASS,
  SEARCH_ICON_CLASS,
  SEARCH_INPUT_CLASS,
  SEARCH_INPUT_WRAPPER_CLASS,
  SEARCH_WRAPPER_CLASS,
  TRIGGER_CLASS,
  TRIGGER_ICON_CLASS,
  TRIGGER_VALUE_CLASS,
} from "./constants";
import type { SelectFieldProps } from "./types";
import { useSelectField } from "./useSelectField";

export type { SelectFieldOption, SelectFieldProps } from "./types";

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  disabled = false,
  placeholder = DEFAULT_PLACEHOLDER,
  searchable = false,
  searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER,
  emptyMessage = DEFAULT_EMPTY_MESSAGE,
  includeAllOption = false,
  allValue = "",
  allLabel = DEFAULT_ALL_LABEL,
  className,
  triggerClassName,
  contentClassName,
}: SelectFieldProps) {
  const labelId = useId();
  const searchInputId = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const {
    open,
    search,
    setSearch,
    filteredOptions,
    selectedLabel,
    handleOpenChange,
  } = useSelectField({
    value,
    options,
    placeholder,
    searchable,
    includeAllOption,
    allValue,
    allLabel,
  });

  const showEmptyState =
    filteredOptions.length === 0 && !(includeAllOption && search.trim() === "");

  useEffect(() => {
    if (open && searchable) {
      searchInputRef.current?.focus();
    }
  }, [open, searchable]);

  return (
    <div className={cn(FIELD_CLASS, className)}>
      <span id={labelId} className={LABEL_CLASS}>
        {label}
      </span>
      <DropdownMenu open={open} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild disabled={disabled}>
          <button
            id={id}
            type="button"
            aria-labelledby={`${labelId} ${id}`}
            className={cn(TRIGGER_CLASS, triggerClassName)}
          >
            <span className={TRIGGER_VALUE_CLASS}>{selectedLabel}</span>
            <ChevronDown className={TRIGGER_ICON_CLASS} aria-hidden />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className={cn(CONTENT_CLASS, contentClassName)}
          style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
        >
          {searchable ? (
            <div
              className={SEARCH_WRAPPER_CLASS}
              onPointerDown={(event) => event.preventDefault()}
            >
              <div className={SEARCH_INPUT_WRAPPER_CLASS}>
                <Search className={SEARCH_ICON_CLASS} aria-hidden />
                <Input
                  ref={searchInputRef}
                  id={searchInputId}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={searchPlaceholder}
                  className={SEARCH_INPUT_CLASS}
                  aria-label={searchPlaceholder}
                />
              </div>
            </div>
          ) : null}
          {includeAllOption ? (
            <DropdownMenuItem
              className={OPTION_CLASS}
              onSelect={() => onChange(allValue)}
            >
              {allLabel}
              {value === allValue ? (
                <Check className={OPTION_CHECK_CLASS} aria-hidden />
              ) : null}
            </DropdownMenuItem>
          ) : null}
          {filteredOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className={OPTION_CLASS}
              disabled={option.disabled}
              onSelect={() => onChange(option.value)}
            >
              <span className="min-w-0 flex-1 truncate">{option.label}</span>
              {value === option.value ? (
                <Check className={OPTION_CHECK_CLASS} aria-hidden />
              ) : null}
            </DropdownMenuItem>
          ))}
          {showEmptyState ? (
            <p className={EMPTY_MESSAGE_CLASS} role="status">
              {emptyMessage}
            </p>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
