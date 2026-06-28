import Link from "next/link";

import {
  NOT_FOUND_DESCRIPTION,
  NOT_FOUND_GO_TO_DASHBOARD_LABEL,
  NOT_FOUND_GO_TO_HOME_LABEL,
  NOT_FOUND_PAGE_CLASS,
  NOT_FOUND_TITLE,
} from "@/app/constants";
import { ErrorState } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className={NOT_FOUND_PAGE_CLASS}>
      <ErrorState
        title={NOT_FOUND_TITLE}
        description={NOT_FOUND_DESCRIPTION}
        homeHref="/"
        homeLabel={NOT_FOUND_GO_TO_HOME_LABEL}
      >
        <Button asChild variant="secondary">
          <Link href="/dashboard">{NOT_FOUND_GO_TO_DASHBOARD_LABEL}</Link>
        </Button>
      </ErrorState>
    </div>
  );
}
