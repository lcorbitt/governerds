import { z } from "zod";

/**
 * Auth form schemas shared across the login, signup, and password-reset routes.
 * Error messages are plain language for our non-technical audience — no jargon.
 */
export const emailSchema = z
  .string()
  .min(1, "Please enter your email address.")
  .email("That does not look like a valid email address.");

export const passwordSchema = z
  .string()
  .min(8, "Your password needs to be at least 8 characters.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Please enter your password."),
});

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
});

export const magicLinkSchema = z.object({
  email: emailSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type MagicLinkInput = z.infer<typeof magicLinkSchema>;
