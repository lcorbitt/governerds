import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ADMIN_SETTINGS_BODY,
  ADMIN_SETTINGS_BODY_CLASS,
  ADMIN_SETTINGS_CARD_DESCRIPTION,
  ADMIN_SETTINGS_CARD_TITLE,
  ADMIN_SETTINGS_PAGE_CLASS,
  ADMIN_SETTINGS_SUBTITLE,
  ADMIN_SETTINGS_SUBTITLE_CLASS,
  ADMIN_SETTINGS_TITLE,
  ADMIN_SETTINGS_TITLE_CLASS,
} from "./constants";

/**
 * Platform settings admin stub. Super-admin only. Full configuration UI lands
 * in a later phase.
 */
export default function AdminSettingsPage() {
  return (
    <div className={ADMIN_SETTINGS_PAGE_CLASS}>
      <div>
        <h1 className={ADMIN_SETTINGS_TITLE_CLASS}>{ADMIN_SETTINGS_TITLE}</h1>
        <p className={ADMIN_SETTINGS_SUBTITLE_CLASS}>
          {ADMIN_SETTINGS_SUBTITLE}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{ADMIN_SETTINGS_CARD_TITLE}</CardTitle>
          <CardDescription>{ADMIN_SETTINGS_CARD_DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className={ADMIN_SETTINGS_BODY_CLASS}>{ADMIN_SETTINGS_BODY}</p>
        </CardContent>
      </Card>
    </div>
  );
}
