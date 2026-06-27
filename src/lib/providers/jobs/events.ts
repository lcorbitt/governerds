/**
 * Re-exports from the canonical event catalog. Prefer importing from
 * `@/lib/jobs/catalog` in new code.
 */
export type {
  AppEvent,
  DomainEvent,
  IntegrationEvent,
  ProfileUpdatedEventData,
  EmailSendData,
  UserCreatedData,
  AuditLogData,
  SearchIndexData,
  CacheInvalidateData,
  AnalyticsTrackData,
} from "@/lib/jobs/catalog";
