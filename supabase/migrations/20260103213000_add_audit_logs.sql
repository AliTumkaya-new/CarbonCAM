create extension if not exists "pgcrypto";

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  action text not null,
  resource_id text,
  "timestamp" timestamptz not null default now(),
  ip_address text
);

create index if not exists idx_audit_logs_user_id on public.audit_logs(user_id);
create index if not exists idx_audit_logs_timestamp on public.audit_logs("timestamp");

alter table public.audit_logs enable row level security;

revoke all on public.audit_logs from anon, authenticated;

create policy "service_role_select_audit_logs"
  on public.audit_logs
  for select
  using (auth.role() = 'service_role');

create policy "service_role_insert_audit_logs"
  on public.audit_logs
  for insert
  with check (auth.role() = 'service_role');
