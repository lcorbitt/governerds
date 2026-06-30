"use client";

import { AppModal } from "@/components/shared/AppModal";
import { FieldError } from "@/components/shared/FieldError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CommunitySummary } from "@shared/dto/community.dto";

import {
  CANCEL_LABEL,
  CREATE_DESCRIPTION,
  CREATE_SUBMIT_LABEL,
  CREATE_TITLE,
  CREATING_LABEL,
  EDIT_DESCRIPTION,
  EDIT_SUBMIT_LABEL,
  EDIT_TITLE,
  FIELD_CLASS,
  FOOTER_CLASS,
  FORM_CLASS,
  NAME_LABEL,
  SAVING_LABEL,
  SLUG_LABEL,
} from "./constants";
import { useCreateOrEditCommunityModal } from "./useCreateOrEditCommunityModal";

interface CreateOrEditCommunityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  community?: CommunitySummary;
}

export function CreateOrEditCommunityModal({
  open,
  onOpenChange,
  community,
}: CreateOrEditCommunityModalProps) {
  const {
    form,
    isEditMode,
    isSubmitting,
    nameField,
    handleNameChange,
    setSlugTouched,
    onSubmit,
  } = useCreateOrEditCommunityModal({ onOpenChange, community });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditMode ? EDIT_TITLE : CREATE_TITLE}
      description={isEditMode ? EDIT_DESCRIPTION : CREATE_DESCRIPTION}
      hideFooter
    >
      <form onSubmit={onSubmit} className={FORM_CLASS} noValidate>
        <div className={FIELD_CLASS}>
          <Label htmlFor="community-name">{NAME_LABEL}</Label>
          <Input
            id="community-name"
            {...nameField}
            onChange={(event) => {
              nameField.onChange(event);
              handleNameChange(event);
            }}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div className={FIELD_CLASS}>
          <Label htmlFor="community-slug">{SLUG_LABEL}</Label>
          <Input
            id="community-slug"
            {...register("slug", {
              onChange: () => setSlugTouched(true),
            })}
          />
          <FieldError message={errors.slug?.message} />
        </div>

        <div className={FOOTER_CLASS}>
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => onOpenChange(false)}
          >
            {CANCEL_LABEL}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isEditMode
                ? SAVING_LABEL
                : CREATING_LABEL
              : isEditMode
                ? EDIT_SUBMIT_LABEL
                : CREATE_SUBMIT_LABEL}
          </Button>
        </div>
      </form>
    </AppModal>
  );
}
