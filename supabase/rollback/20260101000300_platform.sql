-- Rollback: 20260101000300_platform.sql

drop table if exists public.analytics_events cascade;
drop table if exists public.feature_flag_targets cascade;
drop table if exists public.feature_flags cascade;
drop table if exists public.audit_logs cascade;

drop type if exists public.feature_flag_target_type;
drop type if exists public.feature_flag_type;
