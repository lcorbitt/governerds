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
  LOGIN_FORM_CARD_CLASS,
  LOGIN_FORM_CONTENT_CLASS,
  LOGIN_FORM_DESCRIPTION,
  LOGIN_FORM_DIVIDER,
  LOGIN_FORM_DIVIDER_CLASS,
  LOGIN_FORM_DIVIDER_LINE_CLASS,
  LOGIN_FORM_EMAIL_LABEL,
  LOGIN_FORM_FIELD_CLASS,
  LOGIN_FORM_FOOTER_CLASS,
  LOGIN_FORM_FORGOT_PASSWORD_LINK_CLASS,
  LOGIN_FORM_FORGOT_PASSWORD_LINK_LABEL,
  LOGIN_FORM_FORM_CLASS,
  LOGIN_FORM_LINK_CLASS,
  LOGIN_FORM_MAGIC_LINK_LABEL,
  LOGIN_FORM_NEW_HERE_BODY,
  LOGIN_FORM_PASSWORD_LABEL,
  LOGIN_FORM_PASSWORD_LABEL_ROW_CLASS,
  LOGIN_FORM_SIGNUP_LINK_LABEL,
  LOGIN_FORM_SUBMIT_LABEL,
  LOGIN_FORM_SUBMITTING_LABEL,
  LOGIN_FORM_TITLE,
} from "./constants";
import type { LoginFormProps } from "./types";
import { useLoginForm } from "./useLoginForm";

export function LoginForm({ nextPath = null }: LoginFormProps) {
  const { form, onSubmit, onMagicLink, signupHref } = useLoginForm({
    nextPath,
  });
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Card className={LOGIN_FORM_CARD_CLASS}>
      <CardHeader>
        <CardTitle>{LOGIN_FORM_TITLE}</CardTitle>
        <CardDescription>{LOGIN_FORM_DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent className={LOGIN_FORM_CONTENT_CLASS}>
        <form onSubmit={onSubmit} className={LOGIN_FORM_FORM_CLASS} noValidate>
          <div className={LOGIN_FORM_FIELD_CLASS}>
            <Label htmlFor="email">{LOGIN_FORM_EMAIL_LABEL}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
            />
            <FieldError message={errors.email?.message} />
          </div>

          <div className={LOGIN_FORM_FIELD_CLASS}>
            <div className={LOGIN_FORM_PASSWORD_LABEL_ROW_CLASS}>
              <Label htmlFor="password">{LOGIN_FORM_PASSWORD_LABEL}</Label>
              <Link
                href="/forgot-password"
                className={LOGIN_FORM_FORGOT_PASSWORD_LINK_CLASS}
              >
                {LOGIN_FORM_FORGOT_PASSWORD_LINK_LABEL}
              </Link>
            </div>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              {...register("password")}
              aria-invalid={Boolean(errors.password)}
            />
            <FieldError message={errors.password?.message} />
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting
              ? LOGIN_FORM_SUBMITTING_LABEL
              : LOGIN_FORM_SUBMIT_LABEL}
          </Button>
        </form>

        <Button type="button" variant="ghost" onClick={onMagicLink}>
          {LOGIN_FORM_MAGIC_LINK_LABEL}
        </Button>

        <div className={LOGIN_FORM_DIVIDER_CLASS}>
          <span className={LOGIN_FORM_DIVIDER_LINE_CLASS} />
          {LOGIN_FORM_DIVIDER}
          <span className={LOGIN_FORM_DIVIDER_LINE_CLASS} />
        </div>

        <OAuthButtons />

        <p className={LOGIN_FORM_FOOTER_CLASS}>
          {LOGIN_FORM_NEW_HERE_BODY}{" "}
          <Link href={signupHref} className={LOGIN_FORM_LINK_CLASS}>
            {LOGIN_FORM_SIGNUP_LINK_LABEL}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
