"use client";

import { ChevronDown } from "lucide-react";
import { createElement, useMemo, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import {
  CONTENT_CLASS,
  EMPTY_MESSAGE,
  FIELD_CLASS,
  GRID_CLASS,
  ICON_BUTTON_CLASS,
  ICON_BUTTON_ICON_CLASS,
  ICON_BUTTON_SELECTED_CLASS,
  LABEL,
  LABEL_CLASS,
  NAV_ICON_OPTIONS,
  NONE_LABEL,
  PLACEHOLDER,
  SEARCH_INPUT_CLASS,
  SEARCH_PLACEHOLDER,
  SEARCH_WRAPPER_CLASS,
  TRIGGER_CLASS,
  TRIGGER_ICON_CLASS,
  TRIGGER_VALUE_CLASS,
  resolveNavIcon,
} from "./constants";

export type NavIconProps = {
  name: string | null;
  className?: string;
};

export function NavIcon({ name, className }: NavIconProps) {
  const Icon = resolveNavIcon(name);
  if (!Icon) return null;
  return createElement(Icon, { className, "aria-hidden": true });
}

export type IconPickerFieldProps = {
  id: string;
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  allowNone?: boolean;
};

export function IconPickerField({
  id,
  value,
  onChange,
  disabled = false,
  allowNone = true,
}: IconPickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return NAV_ICON_OPTIONS;
    return NAV_ICON_OPTIONS.filter((iconName) =>
      iconName.toLowerCase().includes(query),
    );
  }, [search]);

  return (
    <div className={FIELD_CLASS}>
      <Label htmlFor={id} className={LABEL_CLASS}>
        {LABEL}
      </Label>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          id={id}
          disabled={disabled}
          className={TRIGGER_CLASS}
        >
          <span className={TRIGGER_VALUE_CLASS}>
            <NavIcon name={value} className={TRIGGER_ICON_CLASS} />
            <span>{value ?? PLACEHOLDER}</span>
          </span>
          <ChevronDown className={TRIGGER_ICON_CLASS} aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className={CONTENT_CLASS}>
          <div className={SEARCH_WRAPPER_CLASS}>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={SEARCH_PLACEHOLDER}
              className={SEARCH_INPUT_CLASS}
            />
          </div>
          {allowNone ? (
            <button
              type="button"
              className={cn(
                ICON_BUTTON_CLASS,
                "mb-2 w-full px-4 text-left text-sm",
                value === null && ICON_BUTTON_SELECTED_CLASS,
              )}
              onClick={() => {
                onChange(null);
                setOpen(false);
              }}
            >
              {NONE_LABEL}
            </button>
          ) : null}
          {filteredIcons.length === 0 ? (
            <p className="text-muted-foreground px-2 py-4 text-sm">
              {EMPTY_MESSAGE}
            </p>
          ) : (
            <div className={GRID_CLASS}>
              {filteredIcons.map((iconName) => (
                <button
                  key={iconName}
                  type="button"
                  aria-label={iconName}
                  className={cn(
                    ICON_BUTTON_CLASS,
                    value === iconName && ICON_BUTTON_SELECTED_CLASS,
                  )}
                  onClick={() => {
                    onChange(iconName);
                    setOpen(false);
                  }}
                >
                  <NavIcon name={iconName} className={ICON_BUTTON_ICON_CLASS} />
                </button>
              ))}
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export { resolveNavIcon } from "./constants";
