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

import { ADMIN_OVERVIEW_COPY } from "./constants";

function formatWhen(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function AdminOverview() {
  const overviewQuery = useAdminOverviewQuery();

  if (overviewQuery.isPending) {
    return (
      <p className="text-muted-foreground">{ADMIN_OVERVIEW_COPY.loading}</p>
    );
  }

  if (overviewQuery.isError || !overviewQuery.data) {
    return (
      <ErrorState
        title={ADMIN_OVERVIEW_COPY.errorTitle}
        description={ADMIN_OVERVIEW_COPY.errorDescription}
        onRetry={() => overviewQuery.refetch()}
        homeHref="/admin/flags"
        homeLabel={ADMIN_OVERVIEW_COPY.backToAdmin}
      />
    );
  }

  const data = overviewQuery.data;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {ADMIN_OVERVIEW_COPY.title}
        </h1>
        <p className="text-muted-foreground text-lg">
          {ADMIN_OVERVIEW_COPY.subtitle}
        </p>
      </div>

      <Reveal className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{ADMIN_OVERVIEW_COPY.profilesTitle}</CardTitle>
            <CardDescription>
              {ADMIN_OVERVIEW_COPY.profilesDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.totalProfiles}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{ADMIN_OVERVIEW_COPY.auditTitle}</CardTitle>
            <CardDescription>
              {ADMIN_OVERVIEW_COPY.auditDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.auditLogCount24h}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{ADMIN_OVERVIEW_COPY.analyticsTitle}</CardTitle>
            <CardDescription>
              {ADMIN_OVERVIEW_COPY.analyticsDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{data.analyticsEventCount24h}</p>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{ADMIN_OVERVIEW_COPY.recentAuditTitle}</CardTitle>
            <CardDescription>
              {ADMIN_OVERVIEW_COPY.recentAuditDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentAuditLogs.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                {ADMIN_OVERVIEW_COPY.noAudit}
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
            <CardTitle>{ADMIN_OVERVIEW_COPY.recentAnalyticsTitle}</CardTitle>
            <CardDescription>
              {ADMIN_OVERVIEW_COPY.recentAnalyticsDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentAnalyticsEvents.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                {ADMIN_OVERVIEW_COPY.noAnalytics}
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
