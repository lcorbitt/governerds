-- Rollback: 20260101000600_rls.sql

drop policy if exists "community_members_select_own" on public.community_members;
drop policy if exists "communities_select_member" on public.communities;
drop policy if exists "search_documents_select_authenticated" on public.search_documents;
drop policy if exists "feature_flags_select_authenticated" on public.feature_flags;
drop policy if exists "role_permissions_select_authenticated" on public.role_permissions;
drop policy if exists "permissions_select_authenticated" on public.permissions;
drop policy if exists "roles_select_authenticated" on public.roles;
drop policy if exists "user_roles_select_own" on public.user_roles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_select_own" on public.profiles;

alter table public.search_documents disable row level security;
alter table public.analytics_events disable row level security;
alter table public.feature_flag_targets disable row level security;
alter table public.feature_flags disable row level security;
alter table public.audit_logs disable row level security;
alter table public.user_roles disable row level security;
alter table public.role_permissions disable row level security;
alter table public.permissions disable row level security;
alter table public.roles disable row level security;
alter table public.community_members disable row level security;
alter table public.communities disable row level security;
alter table public.profiles disable row level security;
