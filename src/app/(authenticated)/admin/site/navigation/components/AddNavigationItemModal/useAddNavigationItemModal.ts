"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  navigationItemFormSchema,
  type NavigationItem,
  type NavigationItemFormInput,
} from "../NavigationBuilder/types";
import {
  formInputToNavigationItem,
  isStructuralDestination,
  navigationItemToFormInput,
} from "../NavigationBuilder/utils";

interface UseAddNavigationItemModalOptions {
  open: boolean;
  item?: NavigationItem;
  onSave: (item: NavigationItem) => void;
}

const DEFAULT_VALUES: NavigationItemFormInput = {
  destinationType: "page",
  label: "",
  icon: "Home",
  destinationId: "/",
  visibilityRuleId: "everyone",
  isVisible: true,
  isEnabled: true,
  opensInNewTab: false,
};

export function useAddNavigationItemModal({
  open,
  item,
  onSave,
}: UseAddNavigationItemModalOptions) {
  const isEditMode = item !== undefined;

  const form = useForm<NavigationItemFormInput>({
    resolver: zodResolver(navigationItemFormSchema),
    defaultValues: item ? navigationItemToFormInput(item) : DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!open) return;
    form.reset(item ? navigationItemToFormInput(item) : DEFAULT_VALUES);
  }, [form, item, open]);

  const selectedDestinationType = useWatch({
    control: form.control,
    name: "destinationType",
    defaultValue: DEFAULT_VALUES.destinationType,
  });
  const showIconField = selectedDestinationType !== "divider";
  const showDestinationField = !isStructuralDestination(
    selectedDestinationType,
  );
  const showOpenInNewTab = selectedDestinationType === "external_url";

  function onSubmit(values: NavigationItemFormInput) {
    onSave(formInputToNavigationItem(values, item));
  }

  return {
    form,
    isEditMode,
    selectedDestinationType,
    showIconField,
    showDestinationField,
    showOpenInNewTab,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
