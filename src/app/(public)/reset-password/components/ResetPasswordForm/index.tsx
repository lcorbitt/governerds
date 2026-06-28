"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/shared/field-error";
import { PasswordInput } from "@/components/shared/password-input";

import { RESET_PASSWORD_FORM_COPY } from "./constants";
import { useResetPasswordForm } from "./useResetPasswordForm";

export function ResetPasswordForm() {
  const { form, onSubmit } = useResetPasswordForm();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{RESET_PASSWORD_FORM_COPY.title}</CardTitle>
        <CardDescription>
          {RESET_PASSWORD_FORM_COPY.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">
              {RESET_PASSWORD_FORM_COPY.passwordLabel}
            </Label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              {...register("password")}
              aria-invalid={Boolean(errors.password)}
            />
            <FieldError message={errors.password?.message} />
          </div>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting
              ? RESET_PASSWORD_FORM_COPY.submitting
              : RESET_PASSWORD_FORM_COPY.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
