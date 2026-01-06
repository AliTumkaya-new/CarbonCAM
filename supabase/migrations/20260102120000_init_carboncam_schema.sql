-- CarbonCAM / Supabase (PostgreSQL) şeması
-- Bu migration; materials, machines ve calculations tablolarını oluşturur.

-- gen_random_uuid() için (Supabase’de çoğunlukla hazır gelir, garanti için ekliyoruz)
create extension if not exists "pgcrypto";

-- =========================================================
-- 1) materials: Malzeme verileri
-- =========================================================
create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),

  -- name: Malzemenin insan-okunur adı (örn. Steel 4140)
  name text not null unique,

  -- kc_value: Özgül kesme enerjisi katsayısı (Specific Cutting Energy benzeri),
  --          tipik birim J/mm^3 veya N/mm^2 (yaklaşıma göre)
  kc_value double precision not null check (kc_value > 0),

  -- density: Malzeme yoğunluğu (örn. kg/m^3 veya g/cm^3; sistemde standart birim belirlenmeli)
  density double precision not null check (density > 0),

  created_at timestamptz not null default now()
);

-- Örnek veriler
insert into public.materials (name, kc_value, density)
values
  -- Steel 4140: kc=2400 (örnek), density örnek olarak 7850 kg/m^3
  ('Steel 4140', 2400, 7850),
  -- Aluminum 6061: kc=800 (örnek), density örnek olarak 2700 kg/m^3
  ('Aluminum 6061', 800, 2700)
on conflict (name) do update
set kc_value = excluded.kc_value,
    density  = excluded.density;

-- =========================================================
-- 2) machines: CNC tezgahı / makine verileri
-- =========================================================
create table if not exists public.machines (
  id uuid primary key default gen_random_uuid(),

  -- model: Makine modeli/adı (örn. Haas VF-2)
  model text not null unique,

  -- standby_power_kw: Boşta (idle/standby) çektiği elektrik gücü (kW)
  standby_power_kw double precision not null check (standby_power_kw >= 0),

  -- carbon_intensity: Enerji kaynağı karbon yoğunluğu (kgCO2/kWh). Varsayılan: 0.44
  carbon_intensity double precision not null default 0.44 check (carbon_intensity > 0),

  created_at timestamptz not null default now()
);

-- =========================================================
-- 3) calculations: Hesaplama kayıtları (girdi + çıktı)
-- =========================================================
create table if not exists public.calculations (
  id uuid primary key default gen_random_uuid(),

  -- material_id: Bu hesaplamada kullanılan malzeme (materials tablosuna FK)
  material_id uuid not null references public.materials(id) on delete restrict,

  -- machine_id: Bu hesaplamada kullanılan makine (machines tablosuna FK)
  machine_id uuid not null references public.machines(id) on delete restrict,

  -- initial_weight: İşleme öncesi ağırlık (örn. kg; sistemde standart birim belirlenmeli)
  initial_weight double precision not null check (initial_weight >= 0),

  -- final_weight: İşleme sonrası ağırlık (örn. kg; initial_weight'tan büyük olamaz)
  final_weight double precision not null check (final_weight >= 0),

  -- process_time: İşleme süresi (örn. dakika veya saat; sistemde standart birim belirlenmeli)
  process_time double precision not null check (process_time > 0),

  -- total_energy_kwh: Toplam harcanan elektrik enerjisi (kWh)
  total_energy_kwh double precision not null check (total_energy_kwh >= 0),

  -- carbon_footprint_kg: Toplam CO2 ayak izi (kgCO2)
  carbon_footprint_kg double precision not null check (carbon_footprint_kg >= 0),

  created_at timestamptz not null default now(),

  -- Basit tutarlılık kontrolü
  constraint calculations_weight_check check (final_weight <= initial_weight)
);

-- FK alanları için performans indeksleri
create index if not exists idx_calculations_material_id on public.calculations(material_id);
create index if not exists idx_calculations_machine_id  on public.calculations(machine_id);
create index if not exists idx_calculations_created_at  on public.calculations(created_at);
