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

import {
  ADMIN_OVERVIEW_ANALYTICS_DESCRIPTION,
  ADMIN_OVERVIEW_ANALYTICS_TITLE,
  ADMIN_OVERVIEW_AUDIT_DESCRIPTION,
  ADMIN_OVERVIEW_AUDIT_TITLE,
  ADMIN_OVERVIEW_BACK_TO_ADMIN_LABEL,
  ADMIN_OVERVIEW_DETAIL_GRID_CLASS,
  ADMIN_OVERVIEW_EMPTY_TEXT_CLASS,
  ADMIN_OVERVIEW_ENTRY_ACTION_CLASS,
  ADMIN_OVERVIEW_ENTRY_ITEM_CLASS,
  ADMIN_OVERVIEW_ENTRY_LIST_CLASS,
  ADMIN_OVERVIEW_ENTRY_META_CLASS,
  ADMIN_OVERVIEW_ENTRY_TIMESTAMP_CLASS,
  ADMIN_OVERVIEW_ERROR_DESCRIPTION,
  ADMIN_OVERVIEW_ERROR_TITLE,
  ADMIN_OVERVIEW_LOADING_BODY,
  ADMIN_OVERVIEW_LOADING_TEXT_CLASS,
  ADMIN_OVERVIEW_NO_ANALYTICS_BODY,
  ADMIN_OVERVIEW_NO_AUDIT_BODY,
  ADMIN_OVERVIEW_PAGE_CLASS,
  ADMIN_OVERVIEW_PROFILES_DESCRIPTION,
  ADMIN_OVERVIEW_PROFILES_TITLE,
  ADMIN_OVERVIEW_RECENT_ANALYTICS_DESCRIPTION,
  ADMIN_OVERVIEW_RECENT_ANALYTICS_TITLE,
  ADMIN_OVERVIEW_RECENT_AUDIT_DESCRIPTION,
  ADMIN_OVERVIEW_RECENT_AUDIT_TITLE,
  ADMIN_OVERVIEW_STAT_VALUE_CLASS,
  ADMIN_OVERVIEW_STATS_GRID_CLASS,
  ADMIN_OVERVIEW_SUBTITLE,
  ADMIN_OVERVIEW_SUBTITLE_CLASS,
  ADMIN_OVERVIEW_TITLE,
  ADMIN_OVERVIEW_TITLE_CLASS,
} from "./constants";

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
      <p className={ADMIN_OVERVIEW_LOADING_TEXT_CLASS}>
        {ADMIN_OVERVIEW_LOADING_BODY}
      </p>
    );
  }

  if (overviewQuery.isError || !overviewQuery.data) {
    return (
      <ErrorState
        title={ADMIN_OVERVIEW_ERROR_TITLE}
        description={ADMIN_OVERVIEW_ERROR_DESCRIPTION}
        onRetry={() => overviewQuery.refetch()}
        homeHref="/admin/flags"
        homeLabel={ADMIN_OVERVIEW_BACK_TO_ADMIN_LABEL}
      />
    );
  }

  const data = overviewQuery.data;

  return (
    <div className={ADMIN_OVERVIEW_PAGE_CLASS}>
      <div>
        <h1 className={ADMIN_OVERVIEW_TITLE_CLASS}>{ADMIN_OVERVIEW_TITLE}</h1>
        <p className={ADMIN_OVERVIEW_SUBTITLE_CLASS}>
          {ADMIN_OVERVIEW_SUBTITLE}
        </p>
      </div>

      <Reveal className={ADMIN_OVERVIEW_STATS_GRID_CLASS}>
        <Card>
          <CardHeader>
            <CardTitle>{ADMIN_OVERVIEW_PROFILES_TITLE}</CardTitle>
            <CardDescription>
              {ADMIN_OVERVIEW_PROFILES_DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className={ADMIN_OVERVIEW_STAT_VALUE_CLASS}>
              {data.totalProfiles}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{ADMIN_OVERVIEW_AUDIT_TITLE}</CardTitle>
            <CardDescription>
              {ADMIN_OVERVIEW_AUDIT_DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className={ADMIN_OVERVIEW_STAT_VALUE_CLASS}>
              {data.auditLogCount24h}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{ADMIN_OVERVIEW_ANALYTICS_TITLE}</CardTitle>
            <CardDescription>
              {ADMIN_OVERVIEW_ANALYTICS_DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className={ADMIN_OVERVIEW_STAT_VALUE_CLASS}>
              {data.analyticsEventCount24h}
            </p>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal className={ADMIN_OVERVIEW_DETAIL_GRID_CLASS}>
        <Card>
          <CardHeader>
            <CardTitle>{ADMIN_OVERVIEW_RECENT_AUDIT_TITLE}</CardTitle>
            <CardDescription>
              {ADMIN_OVERVIEW_RECENT_AUDIT_DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentAuditLogs.length === 0 ? (
              <p className={ADMIN_OVERVIEW_EMPTY_TEXT_CLASS}>
                {ADMIN_OVERVIEW_NO_AUDIT_BODY}
              </p>
            ) : (
              <ul className={ADMIN_OVERVIEW_ENTRY_LIST_CLASS}>
                {data.recentAuditLogs.map((entry) => (
                  <li
                    key={entry.id}
                    className={ADMIN_OVERVIEW_ENTRY_ITEM_CLASS}
                  >
                    <p className={ADMIN_OVERVIEW_ENTRY_ACTION_CLASS}>
                      {entry.action}
                    </p>
                    <p className={ADMIN_OVERVIEW_ENTRY_META_CLASS}>
                      {entry.resourceType}
                      {entry.resourceId ? ` · ${entry.resourceId}` : ""}
                    </p>
                    <p className={ADMIN_OVERVIEW_ENTRY_TIMESTAMP_CLASS}>
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
            <CardTitle>{ADMIN_OVERVIEW_RECENT_ANALYTICS_TITLE}</CardTitle>
            <CardDescription>
              {ADMIN_OVERVIEW_RECENT_ANALYTICS_DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentAnalyticsEvents.length === 0 ? (
              <p className={ADMIN_OVERVIEW_EMPTY_TEXT_CLASS}>
                {ADMIN_OVERVIEW_NO_ANALYTICS_BODY}
              </p>
            ) : (
              <ul className={ADMIN_OVERVIEW_ENTRY_LIST_CLASS}>
                {data.recentAnalyticsEvents.map((entry) => (
                  <li
                    key={entry.id}
                    className={ADMIN_OVERVIEW_ENTRY_ITEM_CLASS}
                  >
                    <p className={ADMIN_OVERVIEW_ENTRY_ACTION_CLASS}>
                      {entry.eventName}
                    </p>
                    <p className={ADMIN_OVERVIEW_ENTRY_META_CLASS}>
                      {entry.environment}
                      {entry.userId
                        ? ` · user ${entry.userId.slice(0, 8)}…`
                        : ""}
                    </p>
                    <p className={ADMIN_OVERVIEW_ENTRY_TIMESTAMP_CLASS}>
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
