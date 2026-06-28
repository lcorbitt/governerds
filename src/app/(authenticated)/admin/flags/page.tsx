import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ADMIN_FLAGS_BODY,
  ADMIN_FLAGS_BODY_CLASS,
  ADMIN_FLAGS_CARD_DESCRIPTION,
  ADMIN_FLAGS_CARD_TITLE,
  ADMIN_FLAGS_PAGE_CLASS,
  ADMIN_FLAGS_SUBTITLE,
  ADMIN_FLAGS_SUBTITLE_CLASS,
  ADMIN_FLAGS_TITLE,
  ADMIN_FLAGS_TITLE_CLASS,
} from "./constants";

/**
 * Feature flag admin stub. Proves the admin route gate works. A full management
 * UI (create/edit flags, targeting) is a later phase — the evaluation engine and
 * schema already exist underneath.
 */
export default function AdminFlagsPage() {
  return (
    <div className={ADMIN_FLAGS_PAGE_CLASS}>
      <div>
        <h1 className={ADMIN_FLAGS_TITLE_CLASS}>{ADMIN_FLAGS_TITLE}</h1>
        <p className={ADMIN_FLAGS_SUBTITLE_CLASS}>{ADMIN_FLAGS_SUBTITLE}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{ADMIN_FLAGS_CARD_TITLE}</CardTitle>
          <CardDescription>{ADMIN_FLAGS_CARD_DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className={ADMIN_FLAGS_BODY_CLASS}>{ADMIN_FLAGS_BODY}</p>
        </CardContent>
      </Card>
    </div>
  );
}
