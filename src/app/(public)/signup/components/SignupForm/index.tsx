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
import { OAuthButtons } from "@/components/shared/oauth-buttons";
import { PasswordInput } from "@/components/shared/password-input";

import {
  SIGNUP_FORM_BACK_TO_LOGIN_LABEL,
  SIGNUP_FORM_CARD_CLASS,
  SIGNUP_FORM_CONTENT_CLASS,
  SIGNUP_FORM_DESCRIPTION,
  SIGNUP_FORM_DIVIDER,
  SIGNUP_FORM_DIVIDER_CLASS,
  SIGNUP_FORM_DIVIDER_LINE_CLASS,
  SIGNUP_FORM_EMAIL_LABEL,
  SIGNUP_FORM_FIELD_CLASS,
  SIGNUP_FORM_FOOTER_CLASS,
  SIGNUP_FORM_FORM_CLASS,
  SIGNUP_FORM_HAS_ACCOUNT_BODY,
  SIGNUP_FORM_LINK_CLASS,
  SIGNUP_FORM_LOGIN_LINK_LABEL,
  SIGNUP_FORM_PASSWORD_HELPER,
  SIGNUP_FORM_PASSWORD_HELPER_CLASS,
  SIGNUP_FORM_PASSWORD_LABEL,
  SIGNUP_FORM_SUBMIT_LABEL,
  SIGNUP_FORM_SUBMITTING_LABEL,
  SIGNUP_FORM_SUCCESS_BUTTON_CLASS,
  SIGNUP_FORM_SUCCESS_DESCRIPTION,
  SIGNUP_FORM_SUCCESS_TITLE,
  SIGNUP_FORM_TITLE,
} from "./constants";
import type { SignupFormProps } from "./types";
import { useSignupForm } from "./useSignupForm";

export function SignupForm({ nextPath = null }: SignupFormProps) {
  const { form, onSubmit, submittedEmail, loginHref } = useSignupForm({
    nextPath,
  });
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  if (submittedEmail) {
    return (
      <Card className={SIGNUP_FORM_CARD_CLASS}>
        <CardHeader>
          <CardTitle>{SIGNUP_FORM_SUCCESS_TITLE}</CardTitle>
          <CardDescription>
            {SIGNUP_FORM_SUCCESS_DESCRIPTION.replace("{email}", submittedEmail)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            asChild
            variant="outline"
            size="lg"
            className={SIGNUP_FORM_SUCCESS_BUTTON_CLASS}
          >
            <Link href={loginHref}>{SIGNUP_FORM_BACK_TO_LOGIN_LABEL}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={SIGNUP_FORM_CARD_CLASS}>
      <CardHeader>
        <CardTitle>{SIGNUP_FORM_TITLE}</CardTitle>
        <CardDescription>{SIGNUP_FORM_DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent className={SIGNUP_FORM_CONTENT_CLASS}>
        <form onSubmit={onSubmit} className={SIGNUP_FORM_FORM_CLASS} noValidate>
          <div className={SIGNUP_FORM_FIELD_CLASS}>
            <Label htmlFor="email">{SIGNUP_FORM_EMAIL_LABEL}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
            />
            <FieldError message={errors.email?.message} />
          </div>

          <div className={SIGNUP_FORM_FIELD_CLASS}>
            <Label htmlFor="password">{SIGNUP_FORM_PASSWORD_LABEL}</Label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              {...register("password")}
              aria-invalid={Boolean(errors.password)}
            />
            <FieldError message={errors.password?.message} />
            <p className={SIGNUP_FORM_PASSWORD_HELPER_CLASS}>
              {SIGNUP_FORM_PASSWORD_HELPER}
            </p>
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting
              ? SIGNUP_FORM_SUBMITTING_LABEL
              : SIGNUP_FORM_SUBMIT_LABEL}
          </Button>
        </form>

        <div className={SIGNUP_FORM_DIVIDER_CLASS}>
          <span className={SIGNUP_FORM_DIVIDER_LINE_CLASS} />
          {SIGNUP_FORM_DIVIDER}
          <span className={SIGNUP_FORM_DIVIDER_LINE_CLASS} />
        </div>

        <OAuthButtons />

        <p className={SIGNUP_FORM_FOOTER_CLASS}>
          {SIGNUP_FORM_HAS_ACCOUNT_BODY}{" "}
          <Link href={loginHref} className={SIGNUP_FORM_LINK_CLASS}>
            {SIGNUP_FORM_LOGIN_LINK_LABEL}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
