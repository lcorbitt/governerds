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

import {
  RESET_PASSWORD_FORM_CARD_CLASS,
  RESET_PASSWORD_FORM_DESCRIPTION,
  RESET_PASSWORD_FORM_FIELD_CLASS,
  RESET_PASSWORD_FORM_FORM_CLASS,
  RESET_PASSWORD_FORM_PASSWORD_LABEL,
  RESET_PASSWORD_FORM_SUBMIT_LABEL,
  RESET_PASSWORD_FORM_SUBMITTING_LABEL,
  RESET_PASSWORD_FORM_TITLE,
} from "./constants";
import { useResetPasswordForm } from "./useResetPasswordForm";

export function ResetPasswordForm() {
  const { form, onSubmit } = useResetPasswordForm();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Card className={RESET_PASSWORD_FORM_CARD_CLASS}>
      <CardHeader>
        <CardTitle>{RESET_PASSWORD_FORM_TITLE}</CardTitle>
        <CardDescription>{RESET_PASSWORD_FORM_DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={onSubmit}
          className={RESET_PASSWORD_FORM_FORM_CLASS}
          noValidate
        >
          <div className={RESET_PASSWORD_FORM_FIELD_CLASS}>
            <Label htmlFor="password">
              {RESET_PASSWORD_FORM_PASSWORD_LABEL}
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
              ? RESET_PASSWORD_FORM_SUBMITTING_LABEL
              : RESET_PASSWORD_FORM_SUBMIT_LABEL}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
