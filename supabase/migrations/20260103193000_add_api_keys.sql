-- API access keys for external integrations (ERP/MES)

create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  key_hash text not null unique,
  key_prefix text not null,
  created_at timestamptz not null default now(),
  revoked_at timestamptz,
  last_used_at timestamptz
);

create index if not exists api_keys_user_id_idx on public.api_keys(user_id);
create index if not exists api_keys_key_hash_idx on public.api_keys(key_hash);

alter table public.api_keys enable row level security;

-- Only service_role can manage keys (we're using Clerk user IDs, not Supabase auth.uid())
create policy "service_role_read_api_keys"
  on public.api_keys
  for select
  to service_role
  using (true);

create policy "service_role_insert_api_keys"
  on public.api_keys
  for insert
  to service_role
  with check (true);

create policy "service_role_update_api_keys"
  on public.api_keys
  for update
  to service_role
  using (true)
  with check (true);

create policy "service_role_delete_api_keys"
  on public.api_keys
  for delete
  to service_role
  using (true);
