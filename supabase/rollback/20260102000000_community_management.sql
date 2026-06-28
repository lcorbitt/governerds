-- Rollback: 20260102000000_community_management.sql

revoke all on function public.get_auth_user_id_by_email(text) from service_role;
drop function if exists public.get_auth_user_id_by_email(text);

drop table if exists public.community_invites cascade;

delete from public.role_permissions
where permission_id in (
  select id from public.permissions
  where (resource, action) in (
    ('communities', 'read'),
    ('communities', 'manage')
  )
);

delete from public.permissions
where (resource, action) in (
  ('communities', 'read'),
  ('communities', 'manage')
);
