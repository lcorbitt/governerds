import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { jobs } from "@/lib/providers/jobs/client";

/**
 * Search provider abstraction. PostgreSQL full-text search is the default, with
 * the `search_documents` table as the source index. Writes go through the
 * `search/index` job so indexing never blocks a request. Swapping to
 * Meilisearch/Algolia later means implementing this interface and changing
 * `getSearchProvider` — call sites stay identical.
 */
export interface SearchQuery {
  term: string;
  entityType?: string;
  limit?: number;
}

export interface SearchResult {
  entityType: string;
  entityId: string;
  title: string;
  rank: number;
}

export interface SearchDocumentInput {
  entityType: string;
  entityId: string;
  title: string;
  body?: string;
  metadata?: Record<string, unknown>;
}

export interface SearchProvider {
  index(document: SearchDocumentInput): Promise<void>;
  search(query: SearchQuery): Promise<SearchResult[]>;
}

class PostgresSearchProvider implements SearchProvider {
  async index(document: SearchDocumentInput): Promise<void> {
    await jobs.emit({
      name: "search/index",
      data: {
        entityType: document.entityType,
        entityId: document.entityId,
        title: document.title,
        body: document.body,
        metadata: document.metadata,
      },
    });
  }

  async search(query: SearchQuery): Promise<SearchResult[]> {
    const supabase = await createServerSupabaseClient();
    let builder = supabase
      .from("search_documents")
      .select("entity_type, entity_id, title")
      .textSearch("search_vector", query.term, {
        type: "websearch",
        config: "english",
      })
      .limit(query.limit ?? 20);

    if (query.entityType) {
      builder = builder.eq("entity_type", query.entityType);
    }

    const { data, error } = await builder;
    if (error) throw new Error(`Search failed: ${error.message}`);

    return (data ?? []).map((row, index) => ({
      entityType: row.entity_type,
      entityId: row.entity_id,
      title: row.title,
      // PostgREST does not expose ts_rank directly here; preserve order as rank.
      rank: index,
    }));
  }
}

let provider: SearchProvider | undefined;

export function getSearchProvider(): SearchProvider {
  if (!provider) provider = new PostgresSearchProvider();
  return provider;
}
