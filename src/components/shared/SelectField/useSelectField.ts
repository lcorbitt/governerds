"use client";

import { useMemo, useState } from "react";

import { DEFAULT_ALL_LABEL, DEFAULT_PLACEHOLDER } from "./constants";
import type { SelectFieldOption } from "./types";

type UseSelectFieldOptions = {
  value: string;
  options: SelectFieldOption[];
  placeholder?: string;
  searchable?: boolean;
  includeAllOption?: boolean;
  allValue?: string;
  allLabel?: string;
};

export function useSelectField({
  value,
  options,
  placeholder = DEFAULT_PLACEHOLDER,
  searchable = false,
  includeAllOption = false,
  allValue = "",
  allLabel = DEFAULT_ALL_LABEL,
}: UseSelectFieldOptions) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredOptions = useMemo(() => {
    if (!searchable || normalizedSearch.length === 0) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(normalizedSearch),
    );
  }, [normalizedSearch, options, searchable]);

  const selectedLabel = useMemo(() => {
    if (includeAllOption && value === allValue) {
      return allLabel;
    }

    return (
      options.find((option) => option.value === value)?.label ?? placeholder
    );
  }, [allLabel, allValue, includeAllOption, options, placeholder, value]);

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      setSearch("");
    }
  }

  function clearSearch() {
    setSearch("");
  }

  return {
    open,
    search,
    setSearch,
    filteredOptions,
    selectedLabel,
    handleOpenChange,
    clearSearch,
  };
}
