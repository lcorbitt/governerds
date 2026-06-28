"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/auth/schemas";
import { sendPasswordReset } from "@/lib/auth/client";

/**
 * Colocated orchestration for the forgot-password form.
 */
export function useForgotPasswordForm() {
  const [sent, setSent] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordInput) {
    try {
      await sendPasswordReset(values.email);
      setSent(true);
    } catch {
      // Do not reveal whether an email exists (avoids account enumeration).
      setSent(true);
    }
  }

  return {
    form,
    sent,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
