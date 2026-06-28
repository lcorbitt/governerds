"use client";

import { createClient } from "@/lib/supabase/client";
import { clientEnv } from "@/lib/env/client";

/**
 * Centralized browser auth helpers. Authentication (session handling) is the
 * documented exception to the "everything through Edge Functions" rule — the
 * Supabase client owns the session lifecycle. Keeping all auth calls here means
 * one place to audit and one place to swap behavior.
 */
function siteUrl(path: string): string {
  return `${clientEnv.NEXT_PUBLIC_SITE_URL}${path}`;
}

export async function signInWithPassword(email: string, password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

function authCallbackUrl(nextPath = "/dashboard"): string {
  return siteUrl(`/auth/callback?next=${encodeURIComponent(nextPath)}`);
}

export async function signUpWithPassword(
  email: string,
  password: string,
  nextPath = "/dashboard",
) {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: authCallbackUrl(nextPath) },
  });
  if (error) throw error;
}

export async function sendMagicLink(email: string, nextPath = "/dashboard") {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: authCallbackUrl(nextPath) },
  });
  if (error) throw error;
}

export async function sendPasswordReset(email: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: siteUrl("/auth/callback?next=/reset-password"),
  });
  if (error) throw error;
}

export async function updatePassword(password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}

export type OAuthProvider = "google" | "azure";

export async function signInWithOAuth(provider: OAuthProvider) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: siteUrl("/auth/callback?next=/dashboard"),
      // Microsoft (azure) needs the email scope explicitly.
      ...(provider === "azure" ? { scopes: "email openid profile" } : {}),
    },
  });
  if (error) throw error;
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
