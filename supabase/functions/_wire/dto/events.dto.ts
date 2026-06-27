/**
 * Shared event payload contracts. Imported by Edge publishers and Inngest
 * consumers via @shared/dto/events.dto.ts — never duplicate in frontend-only
 * files.
 */

/** Emitted after a profile row is successfully updated. */
export interface ProfileUpdatedEventData {
  profileId: string;
  ownerId: string;
  displayName: string | null;
  /** camelCase field names that changed, e.g. ["displayName", "bio"] */
  changedFields: string[];
}
