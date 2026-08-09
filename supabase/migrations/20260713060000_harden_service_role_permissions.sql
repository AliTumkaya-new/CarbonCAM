-- Keep every CarbonCAM table private while allowing the server-side service role
-- to use PostgREST. This is required when "Automatically expose new tables" is
-- disabled while creating the Supabase project.

alter table public.materials enable row level security;
alter table public.machines enable row level security;
alter table public.calculations enable row level security;
alter table public.users enable row level security;
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.custom_machines enable row level security;
alter table public.custom_materials enable row level security;
alter table public.electricity_rates enable row level security;
alter table public.api_keys enable row level security;
alter table public.audit_logs enable row level security;

revoke all on table public.materials from anon, authenticated;
revoke all on table public.machines from anon, authenticated;
revoke all on table public.calculations from anon, authenticated;
revoke all on table public.users from anon, authenticated;
revoke all on table public.companies from anon, authenticated;
revoke all on table public.company_members from anon, authenticated;
revoke all on table public.custom_machines from anon, authenticated;
revoke all on table public.custom_materials from anon, authenticated;
revoke all on table public.electricity_rates from anon, authenticated;
revoke all on table public.api_keys from anon, authenticated;
revoke all on table public.audit_logs from anon, authenticated;

grant usage on schema public to service_role;
grant all on table public.materials to service_role;
grant all on table public.machines to service_role;
grant all on table public.calculations to service_role;
grant all on table public.users to service_role;
grant all on table public.companies to service_role;
grant all on table public.company_members to service_role;
grant all on table public.custom_machines to service_role;
grant all on table public.custom_materials to service_role;
grant all on table public.electricity_rates to service_role;
grant all on table public.api_keys to service_role;
grant all on table public.audit_logs to service_role;
grant usage, select on all sequences in schema public to service_role;
