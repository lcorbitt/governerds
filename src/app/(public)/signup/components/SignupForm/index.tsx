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

import { SIGNUP_FORM_COPY } from "./constants";
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{SIGNUP_FORM_COPY.successTitle}</CardTitle>
          <CardDescription>
            {SIGNUP_FORM_COPY.successDescription.replace(
              "{email}",
              submittedEmail,
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href={loginHref}>{SIGNUP_FORM_COPY.backToLogin}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{SIGNUP_FORM_COPY.title}</CardTitle>
        <CardDescription>{SIGNUP_FORM_COPY.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">{SIGNUP_FORM_COPY.emailLabel}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
            />
            <FieldError message={errors.email?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">{SIGNUP_FORM_COPY.passwordLabel}</Label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              {...register("password")}
              aria-invalid={Boolean(errors.password)}
            />
            <FieldError message={errors.password?.message} />
            <p className="text-muted-foreground text-sm">
              {SIGNUP_FORM_COPY.passwordHint}
            </p>
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting
              ? SIGNUP_FORM_COPY.submitting
              : SIGNUP_FORM_COPY.submit}
          </Button>
        </form>

        <div className="text-muted-foreground flex items-center gap-3 text-sm">
          <span className="bg-border h-px flex-1" />
          {SIGNUP_FORM_COPY.divider}
          <span className="bg-border h-px flex-1" />
        </div>

        <OAuthButtons />

        <p className="text-center text-base">
          {SIGNUP_FORM_COPY.hasAccount}{" "}
          <Link
            href={loginHref}
            className="text-primary font-medium hover:underline"
          >
            {SIGNUP_FORM_COPY.loginLink}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
