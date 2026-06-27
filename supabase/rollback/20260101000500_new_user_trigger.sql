-- Rollback: 20260101000500_new_user_trigger.sql

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
