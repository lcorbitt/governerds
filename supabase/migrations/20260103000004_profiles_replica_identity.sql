-- Realtime with RLS filters requires full row payloads on UPDATE.

alter table public.profiles replica identity full;
