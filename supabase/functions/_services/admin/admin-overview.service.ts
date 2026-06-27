import { countProfiles } from "@models/profiles.ts";
import {
  countAuditLogsSince,
  listRecentAuditLogs,
} from "@models/audit_logs.ts";
import {
  countAnalyticsEventsSince,
  listRecentAnalyticsEvents,
} from "@models/analytics_events.ts";
import { createServiceClient } from "@services/db.ts";
import type { AdminOverviewResponse } from "@shared/dto/admin.dto.ts";

/**
 * Admin overview aggregates. Uses the service-role client after the handler
 * verifies audit:read permission — RLS bypass is intentional here.
 */
export async function getAdminOverview(): Promise<AdminOverviewResponse> {
  const client = createServiceClient();
  const sinceIso = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [
    totalProfiles,
    auditLogCount24h,
    analyticsEventCount24h,
    recentAuditRows,
    recentAnalyticsRows,
  ] = await Promise.all([
    countProfiles(client),
    countAuditLogsSince(client, sinceIso),
    countAnalyticsEventsSince(client, sinceIso),
    listRecentAuditLogs(client, 8),
    listRecentAnalyticsEvents(client, 8),
  ]);

  return {
    totalProfiles,
    auditLogCount24h,
    analyticsEventCount24h,
    recentAuditLogs: recentAuditRows.map((row) => ({
      id: row.id,
      actorId: row.actor_id,
      action: row.action,
      resourceType: row.resource_type,
      resourceId: row.resource_id,
      createdAt: row.created_at,
    })),
    recentAnalyticsEvents: recentAnalyticsRows.map((row) => ({
      id: row.id,
      eventName: row.event_name,
      userId: row.user_id,
      environment: row.environment,
      createdAt: row.created_at,
    })),
  };
}
