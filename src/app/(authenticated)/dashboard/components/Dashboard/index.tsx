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

import { DASHBOARD_COPY } from "./constants";

/**
 * Dashboard home. Demonstrates the full read path:
 * component → TanStack hook → frontend service → Edge Function → service → DB.
 */
export function Dashboard() {
  const newDashboard = useFeatureFlagQuery("new-dashboard");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {DASHBOARD_COPY.title}
        </h1>
        <p className="text-muted-foreground text-lg">
          {DASHBOARD_COPY.subtitle}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{DASHBOARD_COPY.flagCardTitle}</CardTitle>
          <CardDescription>
            Live evaluation of the <code>new-dashboard</code> flag for your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {newDashboard.isPending ? (
            <p className="text-muted-foreground">
              {DASHBOARD_COPY.flagChecking}
            </p>
          ) : newDashboard.isError ? (
            <ErrorState
              title={DASHBOARD_COPY.flagErrorTitle}
              description={DASHBOARD_COPY.flagErrorDescription}
              onRetry={() => newDashboard.refetch()}
            />
          ) : (
            <p className="text-base">
              {DASHBOARD_COPY.flagOnPrefix}{" "}
              <strong>
                {newDashboard.data?.enabled
                  ? DASHBOARD_COPY.flagOn
                  : DASHBOARD_COPY.flagOff}
              </strong>{" "}
              {DASHBOARD_COPY.flagOnSuffix}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
