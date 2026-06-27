-- Role-based access control: roles, permissions, and their relationships.

create type public.role_scope as enum ('system', 'community');

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  scope public.role_scope not null default 'system',
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger roles_set_updated_at
  before update on public.roles
  for each row execute function public.set_updated_at();

create table public.permissions (
  id uuid primary key default gen_random_uuid(),
  resource text not null,
  action text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (resource, action)
);

create trigger permissions_set_updated_at
  before update on public.permissions
  for each row execute function public.set_updated_at();

create table public.role_permissions (
  role_id uuid not null references public.roles (id) on delete cascade,
  permission_id uuid not null references public.permissions (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (role_id, permission_id)
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  role_id uuid not null references public.roles (id) on delete cascade,
  community_id uuid references public.communities (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, role_id, community_id)
);

create index user_roles_user_id_idx on public.user_roles (user_id);
create index user_roles_community_id_idx on public.user_roles (community_id);

-- community_members.role_id references roles now that it exists.
alter table public.community_members
  add constraint community_members_role_id_fkey
  foreign key (role_id) references public.roles (id) on delete restrict;
