-- Rollback: 20260102100000_super_admin_community_permissions.sql

delete from public.role_permissions
where role_id in (select id from public.roles where slug = 'super_admin')
  and permission_id in (
    select id from public.permissions
    where (resource, action) in (
      ('communities', 'read'),
      ('communities', 'manage')
    )
  );
