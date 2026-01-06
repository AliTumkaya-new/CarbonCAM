-- Extend audit logs with tenant + actor metadata.

alter table public.audit_logs
  add column if not exists company_id uuid;

alter table public.audit_logs
  add column if not exists actor_name text;

alter table public.audit_logs
  add column if not exists actor_email text;

create index if not exists audit_logs_company_id_idx on public.audit_logs (company_id);
create index if not exists audit_logs_company_id_timestamp_idx on public.audit_logs (company_id, timestamp desc);
