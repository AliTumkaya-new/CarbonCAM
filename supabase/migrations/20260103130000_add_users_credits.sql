-- Freemium credits tracking per user (Clerk userId as text)

create table if not exists public.users (
  id text primary key,
  credits_left integer not null default 3,
  credits_reset_at timestamptz not null default (date_trunc('month', now()) + interval '1 month'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists users_credits_reset_at_idx on public.users (credits_reset_at);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
before update on public.users
for each row
execute function public.set_updated_at();

-- Atomic credit consume with monthly reset.
-- Returns remaining credits AFTER consumption (0..2).
-- Returns -1 if user has no credits left (blocked).
create or replace function public.consume_monthly_credit(p_user_id text)
returns integer
language plpgsql
security definer
as $$
declare
  v_credits integer;
  v_reset_at timestamptz;
begin
  -- Ensure user row exists
  insert into public.users (id)
  values (p_user_id)
  on conflict (id) do nothing;

  -- Lock the row for atomic update
  select credits_left, credits_reset_at
    into v_credits, v_reset_at
    from public.users
   where id = p_user_id
   for update;

  -- Monthly reset
  if now() >= v_reset_at then
    v_credits := 3;
    v_reset_at := date_trunc('month', now()) + interval '1 month';
  end if;

  if v_credits <= 0 then
    update public.users
       set credits_left = 0,
           credits_reset_at = v_reset_at
     where id = p_user_id;
    return -1;
  end if;

  v_credits := v_credits - 1;

  update public.users
     set credits_left = v_credits,
         credits_reset_at = v_reset_at
   where id = p_user_id;

  return v_credits;
end;
$$;

-- Security hardening for Supabase
alter table public.users enable row level security;

-- No public access by default (we use service role via backend).
revoke all on table public.users from anon;
revoke all on table public.users from authenticated;

revoke all on function public.consume_monthly_credit(text) from anon;
revoke all on function public.consume_monthly_credit(text) from authenticated;

-- Allow service_role to use the function
grant execute on function public.consume_monthly_credit(text) to service_role;
