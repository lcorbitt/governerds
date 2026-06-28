"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/shared/error-state";
import { useFeatureFlagQuery } from "@/hooks/queries/useFeatureFlag";

import {
  DASHBOARD_FLAG_CARD_TITLE,
  DASHBOARD_FLAG_CHECKING_BODY,
  DASHBOARD_FLAG_ERROR_DESCRIPTION,
  DASHBOARD_FLAG_ERROR_TITLE,
  DASHBOARD_FLAG_OFF_LABEL,
  DASHBOARD_FLAG_ON_LABEL,
  DASHBOARD_FLAG_ON_PREFIX_BODY,
  DASHBOARD_FLAG_ON_SUFFIX_BODY,
  DASHBOARD_FLAG_VALUE_CLASS,
  DASHBOARD_MUTED_TEXT_CLASS,
  DASHBOARD_PAGE_CLASS,
  DASHBOARD_SUBTITLE,
  DASHBOARD_SUBTITLE_CLASS,
  DASHBOARD_TITLE,
  DASHBOARD_TITLE_CLASS,
} from "./constants";

/**
 * Dashboard home. Demonstrates the full read path:
 * component → TanStack hook → frontend service → Edge Function → service → DB.
 */
export function Dashboard() {
  const newDashboard = useFeatureFlagQuery("new-dashboard");

  return (
    <div className={DASHBOARD_PAGE_CLASS}>
      <div>
        <h1 className={DASHBOARD_TITLE_CLASS}>{DASHBOARD_TITLE}</h1>
        <p className={DASHBOARD_SUBTITLE_CLASS}>{DASHBOARD_SUBTITLE}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{DASHBOARD_FLAG_CARD_TITLE}</CardTitle>
          <CardDescription>
            Live evaluation of the <code>new-dashboard</code> flag for your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {newDashboard.isPending ? (
            <p className={DASHBOARD_MUTED_TEXT_CLASS}>
              {DASHBOARD_FLAG_CHECKING_BODY}
            </p>
          ) : newDashboard.isError ? (
            <ErrorState
              title={DASHBOARD_FLAG_ERROR_TITLE}
              description={DASHBOARD_FLAG_ERROR_DESCRIPTION}
              onRetry={() => newDashboard.refetch()}
            />
          ) : (
            <p className={DASHBOARD_FLAG_VALUE_CLASS}>
              {DASHBOARD_FLAG_ON_PREFIX_BODY}{" "}
              <strong>
                {newDashboard.data?.enabled
                  ? DASHBOARD_FLAG_ON_LABEL
                  : DASHBOARD_FLAG_OFF_LABEL}
              </strong>{" "}
              {DASHBOARD_FLAG_ON_SUFFIX_BODY}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
