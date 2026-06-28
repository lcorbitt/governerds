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

import { FORGOT_PASSWORD_FORM_COPY } from "./constants";
import { useForgotPasswordForm } from "./useForgotPasswordForm";

export function ForgotPasswordForm() {
  const { form, sent, onSubmit } = useForgotPasswordForm();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  if (sent) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{FORGOT_PASSWORD_FORM_COPY.successTitle}</CardTitle>
          <CardDescription>
            {FORGOT_PASSWORD_FORM_COPY.successDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/login">{FORGOT_PASSWORD_FORM_COPY.backToLogin}</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{FORGOT_PASSWORD_FORM_COPY.title}</CardTitle>
        <CardDescription>
          {FORGOT_PASSWORD_FORM_COPY.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">
              {FORGOT_PASSWORD_FORM_COPY.emailLabel}
            </Label>
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
              ? FORGOT_PASSWORD_FORM_COPY.submitting
              : FORGOT_PASSWORD_FORM_COPY.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
