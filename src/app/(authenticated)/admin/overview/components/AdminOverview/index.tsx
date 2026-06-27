"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/shared/error-state";
import { Reveal } from "@/components/shared/reveal";
import { useAdminOverviewQuery } from "@/hooks/queries/useAdminOverview";

function formatWhen(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function AdminOverview() {
  const overviewQuery = useAdminOverviewQuery();

  if (overviewQuery.isPending) {
    return <p className="text-muted-foreground">Loading platform overview…</p>;
  }

  if (overviewQuery.isError || !overviewQuery.data) {
    return (
      <ErrorState
        title="We could not load the overview"
        description="Please confirm your local stack is running, then try again."
        onRetry={() => overviewQuery.refetch()}
        homeHref="/admin/flags"
        homeLabel="Back to admin"
      />
    );
  }

  const data = overviewQuery.data;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform overview</h1>
        <p className="text-muted-foreground text-lg">
          Analytics and audit activity for super administrators.
        </p>
      </div>

      <Reveal className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profiles</CardTitle>
            <CardDescription>Registered member profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.totalProfiles}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Audit events</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.auditLogCount24h}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analytics events</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.analyticsEventCount24h}</p>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent audit log</CardTitle>
            <CardDescription>Latest platform actions</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentAuditLogs.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No audit entries yet.
              </p>
            ) : (
              <ul className="flex flex-col gap-3 text-sm">
                {data.recentAuditLogs.map((entry) => (
                  <li key={entry.id} className="border-b pb-3 last:border-0">
                    <p className="font-medium">{entry.action}</p>
                    <p className="text-muted-foreground">
                      {entry.resourceType}
                      {entry.resourceId ? ` · ${entry.resourceId}` : ""}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatWhen(entry.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent analytics</CardTitle>
            <CardDescription>Infrastructure events</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentAnalyticsEvents.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No analytics events yet.
              </p>
            ) : (
              <ul className="flex flex-col gap-3 text-sm">
                {data.recentAnalyticsEvents.map((entry) => (
                  <li key={entry.id} className="border-b pb-3 last:border-0">
                    <p className="font-medium">{entry.eventName}</p>
                    <p className="text-muted-foreground">
                      {entry.environment}
                      {entry.userId
                        ? ` · user ${entry.userId.slice(0, 8)}…`
                        : ""}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatWhen(entry.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
