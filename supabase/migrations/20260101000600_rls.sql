-- Row Level Security. Defense-in-depth: the service layer is the primary
-- authority, but RLS ensures the user-scoped client can never read or write
-- rows it should not, even if a service-layer call is bypassed.

-- Enable RLS on every table.
alter table public.profiles enable row level security;
alter table public.communities enable row level security;
alter table public.community_members enable row level security;
alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.user_roles enable row level security;
alter table public.audit_logs enable row level security;
alter table public.feature_flags enable row level security;
alter table public.feature_flag_targets enable row level security;
alter table public.analytics_events enable row level security;
alter table public.search_documents enable row level security;

-- Profiles: a user can read and update only their own profile.
create policy "profiles_select_own"
  on public.profiles for select
  using (owner_id = (select auth.uid()));

create policy "profiles_update_own"
  on public.profiles for update
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

-- User roles: a user can read only their own role assignments.
create policy "user_roles_select_own"
  on public.user_roles for select
  using (user_id = (select auth.uid()));

-- Roles / permissions / role_permissions: readable by any authenticated user so
-- permission resolution joins work. These are reference data, not secrets.
create policy "roles_select_authenticated"
  on public.roles for select
  to authenticated
  using (true);

create policy "permissions_select_authenticated"
  on public.permissions for select
  to authenticated
  using (true);

create policy "role_permissions_select_authenticated"
  on public.role_permissions for select
  to authenticated
  using (true);

-- Feature flags: readable by authenticated users (evaluation also runs via the
-- service client). Targets remain service-only (no policy = deny for users).
create policy "feature_flags_select_authenticated"
  on public.feature_flags for select
  to authenticated
  using (true);

-- Search documents: readable by authenticated users; writes via service client.
create policy "search_documents_select_authenticated"
  on public.search_documents for select
  to authenticated
  using (true);

-- Communities: members can read their communities.
create policy "communities_select_member"
  on public.communities for select
  to authenticated
  using (
    exists (
      select 1
      from public.community_members m
      where m.community_id = communities.id
        and m.user_id = (select auth.uid())
    )
  );

create policy "community_members_select_own"
  on public.community_members for select
  using (user_id = (select auth.uid()));

-- audit_logs, analytics_events, feature_flag_targets: no user policies. They are
-- written and read only by the service-role client after authorization checks.
