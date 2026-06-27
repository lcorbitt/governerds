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

/**
 * Dashboard home. Demonstrates the full read path:
 * component → TanStack hook → frontend service → Edge Function → service → DB.
 */
export function Dashboard() {
  const newDashboard = useFeatureFlagQuery("new-dashboard");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          You are signed in. This is the foundation shell.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feature flag example</CardTitle>
          <CardDescription>
            Live evaluation of the <code>new-dashboard</code> flag for your
            account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {newDashboard.isPending ? (
            <p className="text-muted-foreground">Checking…</p>
          ) : newDashboard.isError ? (
            <ErrorState
              title="We could not check that flag"
              description="Start your local stack to see live results, then try again."
              onRetry={() => newDashboard.refetch()}
            />
          ) : (
            <p className="text-base">
              The new dashboard is{" "}
              <strong>{newDashboard.data?.enabled ? "on" : "off"}</strong> for
              you.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
