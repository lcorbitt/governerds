import { render } from "@react-email/components";

import { VerifyEmail, verifyEmailSubject } from "../../../emails/verify-email";
import {
  ResetPassword,
  resetPasswordSubject,
} from "../../../emails/reset-password";
import { Invite, inviteSubject } from "../../../emails/invite";
import { Notification } from "../../../emails/notification";

export type EmailTemplate =
  | "verify-email"
  | "reset-password"
  | "invite"
  | "notification";

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

/**
 * Renders a named template with its payload into deliverable HTML and text.
 * Centralizing rendering keeps every template in `emails/` and the mapping
 * here, so adding a template is a one-line change plus the component.
 */
export async function renderEmail(
  template: EmailTemplate,
  payload: Record<string, unknown>,
): Promise<RenderedEmail> {
  switch (template) {
    case "verify-email": {
      const element = VerifyEmail({ verifyUrl: String(payload.verifyUrl) });
      return {
        subject: verifyEmailSubject,
        html: await render(element),
        text: await render(element, { plainText: true }),
      };
    }
    case "reset-password": {
      const element = ResetPassword({ resetUrl: String(payload.resetUrl) });
      return {
        subject: resetPasswordSubject,
        html: await render(element),
        text: await render(element, { plainText: true }),
      };
    }
    case "invite": {
      const element = Invite({
        inviterName: String(payload.inviterName),
        acceptUrl: String(payload.acceptUrl),
        communityName: payload.communityName
          ? String(payload.communityName)
          : undefined,
      });
      return {
        subject: inviteSubject,
        html: await render(element),
        text: await render(element, { plainText: true }),
      };
    }
    case "notification": {
      const heading = String(payload.heading ?? "Notification");
      const element = Notification({
        heading,
        body: String(payload.body ?? ""),
      });
      return {
        subject: heading,
        html: await render(element),
        text: await render(element, { plainText: true }),
      };
    }
  }
}
