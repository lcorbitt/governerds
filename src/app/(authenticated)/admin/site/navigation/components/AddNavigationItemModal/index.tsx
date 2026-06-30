"use client";

import { AppModal } from "@/components/shared/AppModal";
import { FieldError } from "@/components/shared/FieldError";
import { IconPickerField } from "@/components/shared/IconPickerField";
import { SelectField } from "@/components/shared/SelectField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  DESTINATION_TYPE_OPTIONS,
  MOCK_CATEGORY_OPTIONS,
  MOCK_CONTENT_OPTIONS,
  MOCK_SPACE_OPTIONS,
  PAGE_OPTIONS,
  VISIBILITY_RULE_OPTIONS,
} from "../NavigationBuilder/constants";
import type {
  DestinationType,
  NavigationItem,
} from "../NavigationBuilder/types";
import {
  CANCEL_LABEL,
  CATEGORY_LABEL,
  CONTENT_LABEL,
  CREATE_DESCRIPTION,
  CREATE_SUBMIT_LABEL,
  CREATE_TITLE,
  CUSTOM_ROUTE_LABEL,
  CUSTOM_ROUTE_PLACEHOLDER,
  DESTINATION_TYPE_LABEL,
  EDIT_DESCRIPTION,
  EDIT_SUBMIT_LABEL,
  EDIT_TITLE,
  ENABLED_DESCRIPTION,
  ENABLED_LABEL,
  EXTERNAL_URL_LABEL,
  FIELD_CLASS,
  FOOTER_CLASS,
  FORM_CLASS,
  LABEL_LABEL,
  OPEN_IN_NEW_TAB_DESCRIPTION,
  OPEN_IN_NEW_TAB_LABEL,
  PAGE_LABEL,
  SPACE_LABEL,
  SWITCH_COPY_CLASS,
  SWITCH_DESCRIPTION_CLASS,
  SWITCH_LABEL_CLASS,
  SWITCH_ROW_CLASS,
  VISIBILITY_LABEL,
  VISIBLE_DESCRIPTION,
  VISIBLE_LABEL,
} from "./constants";
import { useAddNavigationItemModal } from "./useAddNavigationItemModal";

interface AddNavigationItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: NavigationItem;
  onSave: (item: NavigationItem) => void;
}

export function AddNavigationItemModal({
  open,
  onOpenChange,
  item,
  onSave,
}: AddNavigationItemModalProps) {
  const {
    form,
    isEditMode,
    selectedDestinationType,
    showIconField,
    showDestinationField,
    showOpenInNewTab,
    onSubmit,
  } = useAddNavigationItemModal({ open, item, onSave });

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditMode ? EDIT_TITLE : CREATE_TITLE}
      description={isEditMode ? EDIT_DESCRIPTION : CREATE_DESCRIPTION}
      size="lg"
      hideFooter
    >
      <form onSubmit={onSubmit} className={FORM_CLASS} noValidate>
        <SelectField
          id="navigation-destination-type"
          label={DESTINATION_TYPE_LABEL}
          value={watch("destinationType")}
          onChange={(value) =>
            setValue("destinationType", value as DestinationType, {
              shouldValidate: true,
            })
          }
          options={DESTINATION_TYPE_OPTIONS}
        />

        <div className={FIELD_CLASS}>
          <Label htmlFor="navigation-label">{LABEL_LABEL}</Label>
          <Input id="navigation-label" {...register("label")} />
          <FieldError message={errors.label?.message} />
        </div>

        {showIconField ? (
          <IconPickerField
            id="navigation-icon"
            value={watch("icon")}
            onChange={(value) =>
              setValue("icon", value, { shouldValidate: true })
            }
            allowNone={selectedDestinationType === "heading"}
          />
        ) : null}

        {showDestinationField ? (
          <>
            {selectedDestinationType === "page" ? (
              <div className={FIELD_CLASS}>
                <SelectField
                  id="navigation-page"
                  label={PAGE_LABEL}
                  value={watch("destinationId") ?? ""}
                  onChange={(value) =>
                    setValue("destinationId", value, { shouldValidate: true })
                  }
                  options={[...PAGE_OPTIONS]}
                />
                <FieldError message={errors.destinationId?.message} />
              </div>
            ) : null}

            {selectedDestinationType === "space" ? (
              <div className={FIELD_CLASS}>
                <SelectField
                  id="navigation-space"
                  label={SPACE_LABEL}
                  value={watch("destinationId") ?? ""}
                  onChange={(value) =>
                    setValue("destinationId", value, { shouldValidate: true })
                  }
                  options={[...MOCK_SPACE_OPTIONS]}
                />
                <FieldError message={errors.destinationId?.message} />
              </div>
            ) : null}

            {selectedDestinationType === "category" ? (
              <div className={FIELD_CLASS}>
                <SelectField
                  id="navigation-category"
                  label={CATEGORY_LABEL}
                  value={watch("destinationId") ?? ""}
                  onChange={(value) =>
                    setValue("destinationId", value, { shouldValidate: true })
                  }
                  options={[...MOCK_CATEGORY_OPTIONS]}
                />
                <FieldError message={errors.destinationId?.message} />
              </div>
            ) : null}

            {selectedDestinationType === "content" ? (
              <div className={FIELD_CLASS}>
                <SelectField
                  id="navigation-content"
                  label={CONTENT_LABEL}
                  value={watch("destinationId") ?? ""}
                  onChange={(value) =>
                    setValue("destinationId", value, { shouldValidate: true })
                  }
                  options={[...MOCK_CONTENT_OPTIONS]}
                />
                <FieldError message={errors.destinationId?.message} />
              </div>
            ) : null}

            {selectedDestinationType === "external_url" ? (
              <div className={FIELD_CLASS}>
                <Label htmlFor="navigation-external-url">
                  {EXTERNAL_URL_LABEL}
                </Label>
                <Input
                  id="navigation-external-url"
                  {...register("destinationId")}
                  placeholder="https://example.com"
                />
                <FieldError message={errors.destinationId?.message} />
              </div>
            ) : null}

            {selectedDestinationType === "custom_route" ? (
              <div className={FIELD_CLASS}>
                <Label htmlFor="navigation-custom-route">
                  {CUSTOM_ROUTE_LABEL}
                </Label>
                <Input
                  id="navigation-custom-route"
                  {...register("destinationId")}
                  placeholder={CUSTOM_ROUTE_PLACEHOLDER}
                />
                <FieldError message={errors.destinationId?.message} />
              </div>
            ) : null}
          </>
        ) : null}

        <SelectField
          id="navigation-visibility"
          label={VISIBILITY_LABEL}
          value={watch("visibilityRuleId")}
          onChange={(value) =>
            setValue(
              "visibilityRuleId",
              value as NavigationItem["visibilityRuleId"],
              {
                shouldValidate: true,
              },
            )
          }
          options={VISIBILITY_RULE_OPTIONS}
        />

        {showOpenInNewTab ? (
          <div className={SWITCH_ROW_CLASS}>
            <div className={SWITCH_COPY_CLASS}>
              <p className={SWITCH_LABEL_CLASS}>{OPEN_IN_NEW_TAB_LABEL}</p>
              <p className={SWITCH_DESCRIPTION_CLASS}>
                {OPEN_IN_NEW_TAB_DESCRIPTION}
              </p>
            </div>
            <Switch
              checked={watch("opensInNewTab")}
              onCheckedChange={(checked) =>
                setValue("opensInNewTab", checked, { shouldValidate: true })
              }
            />
          </div>
        ) : null}

        <div className={SWITCH_ROW_CLASS}>
          <div className={SWITCH_COPY_CLASS}>
            <p className={SWITCH_LABEL_CLASS}>{ENABLED_LABEL}</p>
            <p className={SWITCH_DESCRIPTION_CLASS}>{ENABLED_DESCRIPTION}</p>
          </div>
          <Switch
            checked={watch("isEnabled")}
            onCheckedChange={(checked) =>
              setValue("isEnabled", checked, { shouldValidate: true })
            }
          />
        </div>

        <div className={SWITCH_ROW_CLASS}>
          <div className={SWITCH_COPY_CLASS}>
            <p className={SWITCH_LABEL_CLASS}>{VISIBLE_LABEL}</p>
            <p className={SWITCH_DESCRIPTION_CLASS}>{VISIBLE_DESCRIPTION}</p>
          </div>
          <Switch
            checked={watch("isVisible")}
            onCheckedChange={(checked) =>
              setValue("isVisible", checked, { shouldValidate: true })
            }
          />
        </div>

        <div className={FOOTER_CLASS}>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {CANCEL_LABEL}
          </Button>
          <Button type="submit">
            {isEditMode ? EDIT_SUBMIT_LABEL : CREATE_SUBMIT_LABEL}
          </Button>
        </div>
      </form>
    </AppModal>
  );
}
