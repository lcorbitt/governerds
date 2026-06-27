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

import { useSignupForm } from "./useSignupForm";

export function SignupForm() {
  const { form, onSubmit, submittedEmail } = useSignupForm();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  if (submittedEmail) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent a confirmation link to {submittedEmail}. Click it to finish
            setting up your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/login">Back to log in</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>It only takes a minute.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email address</Label>
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
            <Label htmlFor="password">Choose a password</Label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              {...register("password")}
              aria-invalid={Boolean(errors.password)}
            />
            <FieldError message={errors.password?.message} />
            <p className="text-muted-foreground text-sm">
              Use at least 8 characters.
            </p>
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Creating your account…" : "Create account"}
          </Button>
        </form>

        <div className="text-muted-foreground flex items-center gap-3 text-sm">
          <span className="bg-border h-px flex-1" />
          or
          <span className="bg-border h-px flex-1" />
        </div>

        <OAuthButtons />

        <p className="text-center text-base">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
