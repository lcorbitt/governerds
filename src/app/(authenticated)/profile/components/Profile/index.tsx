"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/shared/field-error";
import { ErrorState } from "@/components/shared/error-state";

import { PROFILE_COPY } from "./constants";
import { useProfile } from "./useProfile";

export function Profile() {
  const { form, onSubmit, resetForm, profileQuery, isSaving, isDirty } =
    useProfile();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {PROFILE_COPY.title}
        </h1>
        <p className="text-muted-foreground text-lg">{PROFILE_COPY.subtitle}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{PROFILE_COPY.detailsTitle}</CardTitle>
          <CardDescription>{PROFILE_COPY.detailsDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          {profileQuery.isPending ? (
            <p className="text-muted-foreground">{PROFILE_COPY.loading}</p>
          ) : profileQuery.isError ? (
            <ErrorState
              title={PROFILE_COPY.errorTitle}
              description={PROFILE_COPY.errorDescription}
              onRetry={() => profileQuery.refetch()}
              homeHref="/dashboard"
              homeLabel={PROFILE_COPY.backToDashboard}
            />
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex max-w-md flex-col gap-4"
              noValidate
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="displayName">
                  {PROFILE_COPY.displayNameLabel}
                </Label>
                <Input id="displayName" {...register("displayName")} />
                <FieldError message={errors.displayName?.message} />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="bio">{PROFILE_COPY.bioLabel}</Label>
                <textarea
                  id="bio"
                  rows={4}
                  className="border-input bg-background ring-offset-background focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-base focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  {...register("bio")}
                />
                <FieldError message={errors.bio?.message} />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="submit" size="lg" disabled={isSaving || !isDirty}>
                  {isSaving ? PROFILE_COPY.saving : PROFILE_COPY.save}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  disabled={isSaving}
                  onClick={resetForm}
                >
                  {PROFILE_COPY.reset}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
