"use client";

import Link from "next/link";

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

import {
  FORGOT_PASSWORD_FORM_BACK_TO_LOGIN_LABEL,
  FORGOT_PASSWORD_FORM_CARD_CLASS,
  FORGOT_PASSWORD_FORM_DESCRIPTION,
  FORGOT_PASSWORD_FORM_EMAIL_LABEL,
  FORGOT_PASSWORD_FORM_FIELD_CLASS,
  FORGOT_PASSWORD_FORM_FORM_CLASS,
  FORGOT_PASSWORD_FORM_SUBMIT_LABEL,
  FORGOT_PASSWORD_FORM_SUBMITTING_LABEL,
  FORGOT_PASSWORD_FORM_SUCCESS_BUTTON_CLASS,
  FORGOT_PASSWORD_FORM_SUCCESS_DESCRIPTION,
  FORGOT_PASSWORD_FORM_SUCCESS_TITLE,
  FORGOT_PASSWORD_FORM_TITLE,
} from "./constants";
import { useForgotPasswordForm } from "./useForgotPasswordForm";

export function ForgotPasswordForm() {
  const { form, sent, onSubmit } = useForgotPasswordForm();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  if (sent) {
    return (
      <Card className={FORGOT_PASSWORD_FORM_CARD_CLASS}>
        <CardHeader>
          <CardTitle>{FORGOT_PASSWORD_FORM_SUCCESS_TITLE}</CardTitle>
          <CardDescription>
            {FORGOT_PASSWORD_FORM_SUCCESS_DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            asChild
            variant="outline"
            size="lg"
            className={FORGOT_PASSWORD_FORM_SUCCESS_BUTTON_CLASS}
          >
            <Link href="/login">
              {FORGOT_PASSWORD_FORM_BACK_TO_LOGIN_LABEL}
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={FORGOT_PASSWORD_FORM_CARD_CLASS}>
      <CardHeader>
        <CardTitle>{FORGOT_PASSWORD_FORM_TITLE}</CardTitle>
        <CardDescription>{FORGOT_PASSWORD_FORM_DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={onSubmit}
          className={FORGOT_PASSWORD_FORM_FORM_CLASS}
          noValidate
        >
          <div className={FORGOT_PASSWORD_FORM_FIELD_CLASS}>
            <Label htmlFor="email">{FORGOT_PASSWORD_FORM_EMAIL_LABEL}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
            />
            <FieldError message={errors.email?.message} />
          </div>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting
              ? FORGOT_PASSWORD_FORM_SUBMITTING_LABEL
              : FORGOT_PASSWORD_FORM_SUBMIT_LABEL}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
