-- Asset Library (Varlık Kütüphanesi)
-- Amaç: Kullanıcının kendi firmasına (company_id) özel makine/malzeme envanteri CRUD

create extension if not exists "pgcrypto";

-- =========================================================
-- 1) companies + company_members
-- =========================================================
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.company_members (
  company_id uuid not null references public.companies(id) on delete cascade,
  user_id text not null,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (company_id, user_id)
);

-- updated_at trigger helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_companies_updated_at on public.companies;
create trigger set_companies_updated_at
before update on public.companies
for each row execute function public.set_updated_at();

drop trigger if exists set_company_members_updated_at on public.company_members;
create trigger set_company_members_updated_at
before update on public.company_members
for each row execute function public.set_updated_at();

create index if not exists idx_company_members_user_id on public.company_members(user_id);

-- =========================================================
-- 2) custom_machines
-- =========================================================
create table if not exists public.custom_machines (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,

  name text not null,
  brand text,

  standby_power_kw double precision not null check (standby_power_kw >= 0),
  max_power_kw double precision not null default 0 check (max_power_kw >= 0),
  efficiency_percent double precision not null default 85 check (efficiency_percent > 0 and efficiency_percent <= 100),

  -- Hesap motoru karbon yoğunluğu bekliyor; UI'da şimdilik sabit kalsın.
  carbon_intensity double precision not null default 0.44 check (carbon_intensity > 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint custom_machines_unique_name_per_company unique (company_id, name)
);

drop trigger if exists set_custom_machines_updated_at on public.custom_machines;
create trigger set_custom_machines_updated_at
before update on public.custom_machines
for each row execute function public.set_updated_at();

create index if not exists idx_custom_machines_company_id on public.custom_machines(company_id);

-- =========================================================
-- 3) custom_materials
-- =========================================================
create table if not exists public.custom_materials (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,

  name text not null,
  kc_value double precision not null check (kc_value > 0),
  density double precision not null check (density > 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint custom_materials_unique_name_per_company unique (company_id, name)
);

drop trigger if exists set_custom_materials_updated_at on public.custom_materials;
create trigger set_custom_materials_updated_at
before update on public.custom_materials
for each row execute function public.set_updated_at();

create index if not exists idx_custom_materials_company_id on public.custom_materials(company_id);

-- =========================================================
-- 4) RLS (şimdilik yalnızca service_role erişebilir)
-- Not: Uygulama Clerk kullanıyor; bu tabloları Next.js API route'ları service_role ile yönetir.
-- =========================================================
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.custom_machines enable row level security;
alter table public.custom_materials enable row level security;

revoke all on public.companies from anon, authenticated;
revoke all on public.company_members from anon, authenticated;
revoke all on public.custom_machines from anon, authenticated;
revoke all on public.custom_materials from anon, authenticated;

-- Service role tam yetki
grant all on public.companies to service_role;
grant all on public.company_members to service_role;
grant all on public.custom_machines to service_role;
grant all on public.custom_materials to service_role;

drop policy if exists "service_role_all_companies" on public.companies;
create policy "service_role_all_companies" on public.companies
for all to service_role using (true) with check (true);

drop policy if exists "service_role_all_company_members" on public.company_members;
create policy "service_role_all_company_members" on public.company_members
for all to service_role using (true) with check (true);

drop policy if exists "service_role_all_custom_machines" on public.custom_machines;
create policy "service_role_all_custom_machines" on public.custom_machines
for all to service_role using (true) with check (true);

drop policy if exists "service_role_all_custom_materials" on public.custom_materials;
create policy "service_role_all_custom_materials" on public.custom_materials
for all to service_role using (true) with check (true);
