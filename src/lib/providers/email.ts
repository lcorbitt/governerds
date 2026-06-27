import "server-only";

import { Resend } from "resend";

import { env } from "@/lib/env/server";
import { logger } from "@/lib/logging/logger";

/**
 * Email provider abstraction. Resend is the free-tier default; swapping to
 * SendGrid or SES later means adding a new implementation and a branch in
 * `getEmailProvider`. Nothing else in the app changes.
 */
export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export interface SendEmailResult {
  id: string | null;
}

export interface EmailProvider {
  send(params: SendEmailParams): Promise<SendEmailResult>;
}

class ResendEmailProvider implements EmailProvider {
  private client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(params: SendEmailParams): Promise<SendEmailResult> {
    const { data, error } = await this.client.emails.send({
      from: env.EMAIL_FROM,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
      replyTo: params.replyTo,
    });

    if (error) {
      throw new Error(`Resend failed to send email: ${error.message}`);
    }

    return { id: data?.id ?? null };
  }
}

/**
 * Logs emails instead of sending them. Used when no API key is configured so
 * local development and CI never hit the network.
 */
class ConsoleEmailProvider implements EmailProvider {
  async send(params: SendEmailParams): Promise<SendEmailResult> {
    logger.info(
      { to: params.to, subject: params.subject },
      "email.send (console provider — not actually sent)",
    );
    return { id: null };
  }
}

let provider: EmailProvider | undefined;

export function getEmailProvider(): EmailProvider {
  if (provider) return provider;

  if (env.EMAIL_PROVIDER === "resend" && env.RESEND_API_KEY) {
    provider = new ResendEmailProvider(env.RESEND_API_KEY);
  } else {
    provider = new ConsoleEmailProvider();
  }

  return provider;
}
