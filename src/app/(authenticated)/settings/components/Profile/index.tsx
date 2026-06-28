"use client";

import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/shared/UserAvatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/shared/field-error";
import { ErrorState } from "@/components/shared/error-state";

import {
  PROFILE_ACTIONS_CLASS,
  PROFILE_AVATAR_ACTIONS_CLASS,
  PROFILE_AVATAR_CLASS,
  PROFILE_AVATAR_DESCRIPTION,
  PROFILE_AVATAR_FALLBACK_CLASS,
  PROFILE_AVATAR_ROW_CLASS,
  PROFILE_AVATAR_TITLE,
  PROFILE_AVATAR_UPLOAD_LABEL,
  PROFILE_AVATAR_UPLOADING_LABEL,
  PROFILE_BACK_TO_DASHBOARD_LABEL,
  PROFILE_BIO_LABEL,
  PROFILE_DETAILS_DESCRIPTION,
  PROFILE_DETAILS_TITLE,
  PROFILE_DISPLAY_NAME_HELPER,
  PROFILE_DISPLAY_NAME_LABEL,
  PROFILE_ERROR_DESCRIPTION,
  PROFILE_ERROR_TITLE,
  PROFILE_FIELD_CLASS,
  PROFILE_FILE_INPUT_CLASS,
  PROFILE_FORM_CLASS,
  PROFILE_HELPER_TEXT_CLASS,
  PROFILE_LOADING_BODY,
  PROFILE_LOADING_TEXT_CLASS,
  PROFILE_PAGE_CLASS,
  PROFILE_RESET_LABEL,
  PROFILE_SAVE_LABEL,
  PROFILE_SAVING_LABEL,
  PROFILE_SUBTITLE,
  PROFILE_SUBTITLE_CLASS,
  PROFILE_TEXTAREA_CLASS,
  PROFILE_TITLE,
  PROFILE_TITLE_CLASS,
} from "./constants";
import { useProfile } from "./useProfile";

export function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    form,
    onSubmit,
    onAvatarSelected,
    resetForm,
    profileQuery,
    isSaving,
    isUploadingAvatar,
    isDirty,
  } = useProfile();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className={PROFILE_PAGE_CLASS}>
      <div>
        <h1 className={PROFILE_TITLE_CLASS}>{PROFILE_TITLE}</h1>
        <p className={PROFILE_SUBTITLE_CLASS}>{PROFILE_SUBTITLE}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{PROFILE_AVATAR_TITLE}</CardTitle>
          <CardDescription>{PROFILE_AVATAR_DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
          {profileQuery.isPending ? (
            <p className={PROFILE_LOADING_TEXT_CLASS}>{PROFILE_LOADING_BODY}</p>
          ) : profileQuery.isError ? null : (
            <div className={PROFILE_AVATAR_ROW_CLASS}>
              <UserAvatar
                className={PROFILE_AVATAR_CLASS}
                fallbackClassName={PROFILE_AVATAR_FALLBACK_CLASS}
                linkToProfile={false}
              />
              <div className={PROFILE_AVATAR_ACTIONS_CLASS}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className={PROFILE_FILE_INPUT_CLASS}
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    void onAvatarSelected(file);
                    event.target.value = "";
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  disabled={isUploadingAvatar}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isUploadingAvatar
                    ? PROFILE_AVATAR_UPLOADING_LABEL
                    : PROFILE_AVATAR_UPLOAD_LABEL}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{PROFILE_DETAILS_TITLE}</CardTitle>
          <CardDescription>{PROFILE_DETAILS_DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
          {profileQuery.isPending ? (
            <p className={PROFILE_LOADING_TEXT_CLASS}>{PROFILE_LOADING_BODY}</p>
          ) : profileQuery.isError ? (
            <ErrorState
              title={PROFILE_ERROR_TITLE}
              description={PROFILE_ERROR_DESCRIPTION}
              onRetry={() => profileQuery.refetch()}
              homeHref="/dashboard"
              homeLabel={PROFILE_BACK_TO_DASHBOARD_LABEL}
            />
          ) : (
            <form onSubmit={onSubmit} className={PROFILE_FORM_CLASS} noValidate>
              <div className={PROFILE_FIELD_CLASS}>
                <Label htmlFor="displayName">
                  {PROFILE_DISPLAY_NAME_LABEL}
                </Label>
                <Input id="displayName" {...register("displayName")} />
                <p className={PROFILE_HELPER_TEXT_CLASS}>
                  {PROFILE_DISPLAY_NAME_HELPER}
                </p>
                <FieldError message={errors.displayName?.message} />
              </div>

              <div className={PROFILE_FIELD_CLASS}>
                <Label htmlFor="bio">{PROFILE_BIO_LABEL}</Label>
                <textarea
                  id="bio"
                  rows={4}
                  className={PROFILE_TEXTAREA_CLASS}
                  {...register("bio")}
                />
                <FieldError message={errors.bio?.message} />
              </div>

              <div className={PROFILE_ACTIONS_CLASS}>
                <Button type="submit" size="lg" disabled={isSaving || !isDirty}>
                  {isSaving ? PROFILE_SAVING_LABEL : PROFILE_SAVE_LABEL}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  disabled={isSaving}
                  onClick={resetForm}
                >
                  {PROFILE_RESET_LABEL}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
