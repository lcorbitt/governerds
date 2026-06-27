import { inngest } from "@/lib/providers/jobs/client";
import { getEmailProvider } from "@/lib/providers/email";
import { renderEmail } from "@/lib/email/render";
import type { EmailSendData } from "@/lib/jobs/catalog";

/**
 * Sends transactional email asynchronously so request handlers never block on
 * the email provider. Inngest retries automatically on failure.
 */
export const sendEmail = inngest.createFunction(
  { id: "send-email", name: "Send email", triggers: [{ event: "email/send" }] },
  async ({ event, step }) => {
    const data = event.data as EmailSendData;
    const rendered = await step.run("render-template", async () =>
      renderEmail(data.template, data.payload),
    );

    await step.run("deliver", async () => {
      const provider = getEmailProvider();
      return provider.send({
        to: data.to,
        subject: rendered.subject,
        html: rendered.html,
        text: rendered.text,
      });
    });

    return { delivered: true };
  },
);
