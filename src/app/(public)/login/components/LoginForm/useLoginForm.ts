"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useAppRouter } from "@/hooks/use-app-router";
import { loginSchema, type LoginInput } from "@/lib/auth/schemas";
import { buildAuthHref } from "@/lib/auth/next-path";
import { sendMagicLink, signInWithPassword } from "@/lib/auth/client";

import { LOGIN_FORM_COPY } from "./constants";
import type { UseLoginFormOptions } from "./types";

/**
 * Colocated UI orchestration for the login form: form state, submission,
 * toasts, and navigation. Auth itself runs through the centralized auth client.
 */
export function useLoginForm({ nextPath = null }: UseLoginFormOptions = {}) {
  const router = useAppRouter();
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const destination = nextPath ?? "/dashboard";

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginInput) {
    try {
      await signInWithPassword(values.email, values.password);
      toast.success(LOGIN_FORM_COPY.toastWelcome);
      router.push(destination);
      router.refresh();
    } catch {
      toast.error(LOGIN_FORM_COPY.toastError);
    }
  }

  async function onMagicLink() {
    const email = form.getValues("email");
    const result = await form.trigger("email");
    if (!result) return;

    try {
      await sendMagicLink(email, destination);
      setMagicLinkSent(true);
      toast.success(LOGIN_FORM_COPY.toastMagicSent);
    } catch {
      toast.error(LOGIN_FORM_COPY.toastMagicError);
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    onMagicLink,
    magicLinkSent,
    signupHref: buildAuthHref("/signup", nextPath),
  };
}
