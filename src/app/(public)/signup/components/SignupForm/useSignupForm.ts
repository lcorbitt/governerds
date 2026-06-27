"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signupSchema, type SignupInput } from "@/lib/auth/schemas";
import { signUpWithPassword } from "@/lib/auth/client";

/**
 * Colocated UI orchestration for signup. On success we show a "check your
 * email" state because email verification is required before first login.
 */
export function useSignupForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: SignupInput) {
    try {
      await signUpWithPassword(values.email, values.password);
      setSubmittedEmail(values.email);
      toast.success("Account created. Please check your email to confirm.");
    } catch {
      toast.error(
        "We could not create your account. The email may already be in use.",
      );
    }
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), submittedEmail };
}
