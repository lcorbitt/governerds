import "server-only";

import { logger } from "@/lib/logging/logger";

/**
 * SMS provider abstraction. There is no free SMS tier, so the foundation ships
 * a no-op that logs instead of sending. When we add Twilio (or similar), drop
 * in a `TwilioSmsProvider` and branch in `getSmsProvider`.
 */
export interface SendSmsParams {
  to: string;
  body: string;
}

export interface SmsProvider {
  send(params: SendSmsParams): Promise<{ id: string | null }>;
}

class NoopSmsProvider implements SmsProvider {
  async send(params: SendSmsParams): Promise<{ id: string | null }> {
    logger.info(
      { to: params.to },
      "sms.send (noop provider — configure Twilio to enable SMS)",
    );
    return { id: null };
  }
}

let provider: SmsProvider | undefined;

export function getSmsProvider(): SmsProvider {
  if (!provider) provider = new NoopSmsProvider();
  return provider;
}
