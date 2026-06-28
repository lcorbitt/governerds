-- Fix communities RLS: unqualified `id` in the member subquery resolved to
-- community_members.id instead of communities.id, blocking all member reads.

drop policy if exists "communities_select_member" on public.communities;

create policy "communities_select_member"
  on public.communities for select
  to authenticated
  using (
    exists (
      select 1
      from public.community_members m
      where m.community_id = communities.id
        and m.user_id = (select auth.uid())
    )
  );
