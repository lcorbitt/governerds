import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ADMIN_USERS_BODY,
  ADMIN_USERS_BODY_CLASS,
  ADMIN_USERS_CARD_DESCRIPTION,
  ADMIN_USERS_CARD_TITLE,
  ADMIN_USERS_PAGE_CLASS,
  ADMIN_USERS_SUBTITLE,
  ADMIN_USERS_SUBTITLE_CLASS,
  ADMIN_USERS_TITLE,
  ADMIN_USERS_TITLE_CLASS,
} from "./constants";

/**
 * User management admin stub. Proves the admin sidebar route works. Full CRUD
 * UI lands in a later phase.
 */
export default function AdminUsersPage() {
  return (
    <div className={ADMIN_USERS_PAGE_CLASS}>
      <div>
        <h1 className={ADMIN_USERS_TITLE_CLASS}>{ADMIN_USERS_TITLE}</h1>
        <p className={ADMIN_USERS_SUBTITLE_CLASS}>{ADMIN_USERS_SUBTITLE}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{ADMIN_USERS_CARD_TITLE}</CardTitle>
          <CardDescription>{ADMIN_USERS_CARD_DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className={ADMIN_USERS_BODY_CLASS}>{ADMIN_USERS_BODY}</p>
        </CardContent>
      </Card>
    </div>
  );
}
