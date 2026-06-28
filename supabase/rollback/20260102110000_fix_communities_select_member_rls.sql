-- Rollback: 20260102110000_fix_communities_select_member_rls.sql

drop policy if exists "communities_select_member" on public.communities;

create policy "communities_select_member"
  on public.communities for select
  to authenticated
  using (
    exists (
      select 1
      from public.community_members m
      where m.community_id = id
        and m.user_id = (select auth.uid())
    )
  );
