import { inngest } from "@/lib/providers/jobs/client";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/lib/supabase/database.types";
import type { SearchIndexData } from "@/lib/jobs/catalog";

/**
 * Upserts a document into the search index asynchronously. Today this writes to
 * the PostgreSQL `search_documents` table; when we adopt Meilisearch/Algolia we
 * replace the body of this function without touching call sites.
 */
export const indexSearchDocument = inngest.createFunction(
  {
    id: "index-search-document",
    name: "Index search document",
    triggers: [{ event: "search/index" }],
  },
  async ({ event }) => {
    const data = event.data as SearchIndexData;
    const supabase = createAdminClient();
    const { error } = await supabase.from("search_documents").upsert(
      {
        entity_type: data.entityType,
        entity_id: data.entityId,
        title: data.title,
        body: data.body ?? null,
        metadata: (data.metadata ?? {}) as Json,
      },
      { onConflict: "entity_type,entity_id" },
    );

    if (error) throw new Error(`Failed to index document: ${error.message}`);
    return { indexed: true };
  },
);
