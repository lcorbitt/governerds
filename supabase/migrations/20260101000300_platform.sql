-- Platform tables: audit logs, feature flags, analytics events.

-- Append-only audit log (SOC2 / OWASP A09).
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users (id) on delete set null,
  action text not null,
  resource_type text not null,
  resource_id text,
  metadata jsonb not null default '{}'::jsonb,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index audit_logs_created_at_idx on public.audit_logs (created_at desc);
create index audit_logs_actor_id_idx on public.audit_logs (actor_id);
create index audit_logs_resource_idx
  on public.audit_logs (resource_type, resource_id);

-- Feature flags.
create type public.feature_flag_type as enum (
  'boolean',
  'percentage',
  'targeted'
);

create table public.feature_flags (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  description text,
  type public.feature_flag_type not null default 'boolean',
  default_value boolean not null default false,
  rollout_percentage integer not null default 0
    check (rollout_percentage between 0 and 100),
  environments jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger feature_flags_set_updated_at
  before update on public.feature_flags
  for each row execute function public.set_updated_at();

create type public.feature_flag_target_type as enum (
  'user',
  'role',
  'community'
);

create table public.feature_flag_targets (
  id uuid primary key default gen_random_uuid(),
  flag_id uuid not null references public.feature_flags (id) on delete cascade,
  target_type public.feature_flag_target_type not null,
  target_id text not null,
  value boolean not null,
  created_at timestamptz not null default now(),
  unique (flag_id, target_type, target_id)
);

create index feature_flag_targets_flag_id_idx
  on public.feature_flag_targets (flag_id);

-- Infrastructure analytics events (not product analytics).
create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  user_id uuid references auth.users (id) on delete set null,
  session_id text,
  properties jsonb not null default '{}'::jsonb,
  environment text not null default 'local',
  created_at timestamptz not null default now()
);

create index analytics_events_name_created_idx
  on public.analytics_events (event_name, created_at desc);
