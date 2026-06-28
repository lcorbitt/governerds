-- Ensure super_admin holds community management permissions (idempotent patch for
-- databases that applied 20260102000000 before super_admin was included).

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id
from public.roles r
join public.permissions p
  on (p.resource, p.action) in (
    ('communities', 'read'),
    ('communities', 'manage')
  )
where r.slug = 'super_admin'
on conflict do nothing;
