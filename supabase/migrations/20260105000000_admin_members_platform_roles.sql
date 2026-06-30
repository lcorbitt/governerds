-- Include platform role slugs in admin community member listings so elevated
-- users (super_admin, admin, moderator) are not shown only as community members.

drop function if exists public.list_admin_community_members_page(
  integer, integer, text, text, text, uuid, boolean
);

create or replace function public.list_admin_community_members_page(
  p_page integer,
  p_page_size integer,
  p_sort_column text default 'joined_at',
  p_sort_direction text default 'desc',
  p_search text default null,
  p_community_id uuid default null,
  p_export_all boolean default false
)
returns table (
  id uuid,
  community_id uuid,
  community_name text,
  community_slug text,
  user_id uuid,
  member_display_name text,
  member_email text,
  role_name text,
  role_slug text,
  platform_role_slugs text[],
  joined_at timestamptz,
  total_count bigint
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_search text;
  v_offset integer;
  v_limit integer;
  v_sort_column text;
  v_asc boolean;
begin
  v_search := nullif(trim(lower(p_search)), '');
  v_offset := greatest(0, (greatest(p_page, 1) - 1) * greatest(p_page_size, 1));
  v_limit := greatest(p_page_size, 1);
  v_asc := lower(coalesce(p_sort_direction, 'desc')) = 'asc';
  v_sort_column := case lower(coalesce(p_sort_column, 'joined_at'))
    when 'community_name' then 'community_name'
    when 'member_name' then 'member_display_name'
    when 'member_email' then 'member_email'
    when 'role_slug' then 'role_slug'
    else 'joined_at'
  end;

  return query
  with base as (
    select
      cm.id,
      cm.community_id,
      c.name as community_name,
      c.slug as community_slug,
      cm.user_id,
      coalesce(p.display_name, '') as member_display_name,
      coalesce(u.email::text, '') as member_email,
      r.name as role_name,
      r.slug as role_slug,
      coalesce(platform_roles.platform_role_slugs, '{}'::text[]) as platform_role_slugs,
      cm.created_at as joined_at
    from public.community_members cm
    join public.communities c
      on c.id = cm.community_id
      and c.deleted_at is null
    join public.roles r on r.id = cm.role_id
    join auth.users u on u.id = cm.user_id
    left join public.profiles p
      on p.owner_id = cm.user_id
      and p.deleted_at is null
    left join lateral (
      select array_agg(distinct pr.slug order by pr.slug) as platform_role_slugs
      from public.user_roles ur
      join public.roles pr on pr.id = ur.role_id
      where ur.user_id = cm.user_id
        and ur.community_id is null
    ) platform_roles on true
    where (p_community_id is null or cm.community_id = p_community_id)
      and (
        v_search is null
        or lower(c.name) like '%' || v_search || '%'
        or lower(c.slug) like '%' || v_search || '%'
        or lower(coalesce(p.display_name, '')) like '%' || v_search || '%'
        or lower(coalesce(u.email::text, '')) like '%' || v_search || '%'
        or lower(r.name) like '%' || v_search || '%'
        or lower(r.slug) like '%' || v_search || '%'
        or exists (
          select 1
          from unnest(coalesce(platform_roles.platform_role_slugs, '{}'::text[])) as pr_slug
          where lower(pr_slug) like '%' || v_search || '%'
        )
      )
  ),
  counted as (
    select b.*, count(*) over () as total_count
    from base b
  )
  select
    counted.id,
    counted.community_id,
    counted.community_name,
    counted.community_slug,
    counted.user_id,
    counted.member_display_name,
    counted.member_email,
    counted.role_name,
    counted.role_slug,
    counted.platform_role_slugs,
    counted.joined_at,
    counted.total_count
  from counted
  order by
    case when v_sort_column = 'joined_at' and v_asc then counted.joined_at end asc nulls last,
    case when v_sort_column = 'joined_at' and not v_asc then counted.joined_at end desc nulls last,
    case when v_sort_column = 'community_name' and v_asc then counted.community_name end asc nulls last,
    case when v_sort_column = 'community_name' and not v_asc then counted.community_name end desc nulls last,
    case when v_sort_column = 'member_display_name' and v_asc then counted.member_display_name end asc nulls last,
    case when v_sort_column = 'member_display_name' and not v_asc then counted.member_display_name end desc nulls last,
    case when v_sort_column = 'member_email' and v_asc then counted.member_email end asc nulls last,
    case when v_sort_column = 'member_email' and not v_asc then counted.member_email end desc nulls last,
    case when v_sort_column = 'role_slug' and v_asc then counted.role_slug end asc nulls last,
    case when v_sort_column = 'role_slug' and not v_asc then counted.role_slug end desc nulls last,
    counted.joined_at desc
  offset case when p_export_all then 0 else v_offset end
  limit case when p_export_all then null else v_limit end;
end;
$$;

revoke all on function public.list_admin_community_members_page(
  integer, integer, text, text, text, uuid, boolean
) from public;
grant execute on function public.list_admin_community_members_page(
  integer, integer, text, text, text, uuid, boolean
) to service_role;
