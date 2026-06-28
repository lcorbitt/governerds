-- Community management: permissions, invites, and auth lookup helper.

insert into public.permissions (resource, action, description) values
  ('communities', 'read', 'View all communities in admin'),
  ('communities', 'manage', 'Create communities and send invites')
on conflict (resource, action) do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p
  on (p.resource, p.action) in (
    ('communities', 'read'),
    ('communities', 'manage')
  )
where r.slug in ('admin', 'super_admin')
on conflict do nothing;

create table public.community_invites (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities (id) on delete cascade,
  email text not null,
  invited_by uuid not null references auth.users (id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  accepted_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index community_invites_community_id_email_idx
  on public.community_invites (community_id, email);

create unique index community_invites_pending_email_unique
  on public.community_invites (community_id, lower(email))
  where accepted_at is null;

alter table public.community_invites enable row level security;

-- Service-role only. No user policies (defense in depth with explicit auth checks).
create or replace function public.get_auth_user_id_by_email(p_email text)
returns uuid
language sql
security definer
set search_path = ''
as $$
  select id
  from auth.users
  where lower(email) = lower(trim(p_email))
  limit 1;
$$;

revoke all on function public.get_auth_user_id_by_email(text) from public;
grant execute on function public.get_auth_user_id_by_email(text) to service_role;
