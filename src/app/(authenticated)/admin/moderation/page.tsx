import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ADMIN_MODERATION_BODY,
  ADMIN_MODERATION_BODY_CLASS,
  ADMIN_MODERATION_CARD_DESCRIPTION,
  ADMIN_MODERATION_CARD_TITLE,
  ADMIN_MODERATION_PAGE_CLASS,
  ADMIN_MODERATION_SUBTITLE,
  ADMIN_MODERATION_SUBTITLE_CLASS,
  ADMIN_MODERATION_TITLE,
  ADMIN_MODERATION_TITLE_CLASS,
} from "./constants";

/**
 * Moderation admin stub. Proves the admin sidebar route works. Full tooling
 * lands in a later phase.
 */
export default function AdminModerationPage() {
  return (
    <div className={ADMIN_MODERATION_PAGE_CLASS}>
      <div>
        <h1 className={ADMIN_MODERATION_TITLE_CLASS}>
          {ADMIN_MODERATION_TITLE}
        </h1>
        <p className={ADMIN_MODERATION_SUBTITLE_CLASS}>
          {ADMIN_MODERATION_SUBTITLE}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{ADMIN_MODERATION_CARD_TITLE}</CardTitle>
          <CardDescription>{ADMIN_MODERATION_CARD_DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className={ADMIN_MODERATION_BODY_CLASS}>{ADMIN_MODERATION_BODY}</p>
        </CardContent>
      </Card>
    </div>
  );
}
