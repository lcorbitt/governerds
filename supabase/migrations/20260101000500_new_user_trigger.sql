-- On new auth user: create a profile and assign the default 'member' role.
-- SECURITY DEFINER so it can write regardless of the inserting role; search_path
-- is pinned to avoid hijacking (OWASP A01/A05).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  member_role_id uuid;
begin
  insert into public.profiles (owner_id, display_name)
  values (new.id, split_part(coalesce(new.email, ''), '@', 1));

  select id into member_role_id
  from public.roles
  where slug = 'member'
  limit 1;

  if member_role_id is not null then
    insert into public.user_roles (user_id, role_id)
    values (new.id, member_role_id)
    on conflict do nothing;
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
