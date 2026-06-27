-- Search foundation: a single documents table with a generated tsvector and a
-- GIN index. This is the PostgreSQL full-text search default; an external
-- engine can later sync from this table.

create table public.search_documents (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id text not null,
  title text not null,
  body text,
  metadata jsonb not null default '{}'::jsonb,
  search_vector tsvector generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body, '')), 'B')
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (entity_type, entity_id)
);

create index search_documents_vector_idx
  on public.search_documents using gin (search_vector);

create trigger search_documents_set_updated_at
  before update on public.search_documents
  for each row execute function public.set_updated_at();
