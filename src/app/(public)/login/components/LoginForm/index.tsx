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

import { LOGIN_FORM_COPY } from "./constants";
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{LOGIN_FORM_COPY.title}</CardTitle>
        <CardDescription>{LOGIN_FORM_COPY.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">{LOGIN_FORM_COPY.emailLabel}</Label>
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{LOGIN_FORM_COPY.passwordLabel}</Label>
              <Link
                href="/forgot-password"
                className="text-primary text-sm font-medium hover:underline"
              >
                {LOGIN_FORM_COPY.forgotPasswordLink}
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
            {isSubmitting ? LOGIN_FORM_COPY.submitting : LOGIN_FORM_COPY.submit}
          </Button>
        </form>

        <Button type="button" variant="ghost" onClick={onMagicLink}>
          {LOGIN_FORM_COPY.magicLink}
        </Button>

        <div className="text-muted-foreground flex items-center gap-4 text-sm">
          <span className="bg-border h-px flex-1" />
          {LOGIN_FORM_COPY.divider}
          <span className="bg-border h-px flex-1" />
        </div>

        <OAuthButtons />

        <p className="text-center text-base">
          {LOGIN_FORM_COPY.newHere}{" "}
          <Link
            href={signupHref}
            className="text-primary font-medium hover:underline"
          >
            {LOGIN_FORM_COPY.signupLink}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
