-- Rollback: 20260101000000_init.sql

drop function if exists public.set_updated_at() cascade;

drop extension if exists "pgcrypto";
