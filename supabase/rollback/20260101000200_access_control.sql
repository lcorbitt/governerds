-- Rollback: 20260101000200_access_control.sql

drop table if exists public.user_roles cascade;
drop table if exists public.role_permissions cascade;
drop table if exists public.permissions cascade;
drop table if exists public.roles cascade;

drop type if exists public.role_scope;
