import { inngest } from "@/lib/providers/jobs/client";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/lib/supabase/database.types";
import type { AuditLogData } from "@/lib/jobs/catalog";

/**
 * Persists audit entries off the request path. Audit logs are append-only and
 * support our SOC2 and OWASP A09 (Security Logging) requirements.
 */
export const writeAuditLog = inngest.createFunction(
  {
    id: "write-audit-log",
    name: "Write audit log",
    triggers: [{ event: "audit/log" }],
  },
  async ({ event }) => {
    const data = event.data as AuditLogData;
    const supabase = createAdminClient();
    const { error } = await supabase.from("audit_logs").insert({
      actor_id: data.actorId,
      action: data.action,
      resource_type: data.resourceType,
      resource_id: data.resourceId ?? null,
      metadata: (data.metadata ?? {}) as Json,
      ip: data.ip ?? null,
      user_agent: data.userAgent ?? null,
    });

    if (error) throw new Error(`Failed to write audit log: ${error.message}`);
    return { logged: true };
  },
);
