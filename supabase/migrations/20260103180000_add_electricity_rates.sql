-- CarbonCAM: Electricity Rates
-- Amaç: Tek zamanlı veya üç zamanlı (Gündüz / Puant / Gece) elektrik birim fiyatlarını saklamak.

create extension if not exists "pgcrypto";

create table if not exists public.electricity_rates (
  id uuid primary key default gen_random_uuid(),

  -- Örn: 'TR', 'EU', 'GLOBAL'
  region text not null,

  -- Örn: 'TRY', 'USD'
  currency text not null,

  -- 'Single' veya 'Multi'
  tariff_type text not null check (tariff_type in ('Single', 'Multi')),

  -- Tek zamanlı tarife (kWh başına)
  single_rate_per_kwh double precision,

  -- Üç zamanlı tarife (kWh başına)
  day_rate_per_kwh double precision,
  peak_rate_per_kwh double precision,
  night_rate_per_kwh double precision,

  -- Üç zamanlı zaman sınırları (yerel saat)
  -- Day:  day_start -> peak_start
  -- Peak: peak_start -> night_start
  -- Night: night_start -> day_start (wrap)
  day_start time not null default time '06:00',
  peak_start time not null default time '17:00',
  night_start time not null default time '22:00',

  created_at timestamptz not null default now(),

  -- Basit tutarlılık
  constraint electricity_rates_single_requires_rate
    check (tariff_type != 'Single' or (single_rate_per_kwh is not null and single_rate_per_kwh > 0)),
  constraint electricity_rates_multi_requires_rates
    check (
      tariff_type != 'Multi'
      or (
        day_rate_per_kwh is not null and day_rate_per_kwh > 0
        and peak_rate_per_kwh is not null and peak_rate_per_kwh > 0
        and night_rate_per_kwh is not null and night_rate_per_kwh > 0
      )
    )
);

create unique index if not exists uq_electricity_rates_region_currency_type
  on public.electricity_rates(region, currency, tariff_type);

-- RLS: Bu tablo genelde "okunabilir", yazma admin/service role ile yapılır.
alter table public.electricity_rates enable row level security;

-- anon/authenticated read (isterseniz kapatabilirsiniz)
drop policy if exists "electricity_rates_read" on public.electricity_rates;
create policy "electricity_rates_read" on public.electricity_rates
for select
to anon, authenticated
using (true);

-- writes only via service_role
revoke insert, update, delete on public.electricity_rates from anon, authenticated;
grant all on public.electricity_rates to service_role;

drop policy if exists "service_role_all_electricity_rates" on public.electricity_rates;
create policy "service_role_all_electricity_rates" on public.electricity_rates
for all
to service_role
using (true)
with check (true);

-- Seed (örnek/placeholder): gerçek sözleşme fiyatlarınızı girin.
-- Bu değerler sadece DEMO içindir.
insert into public.electricity_rates (
  region, currency, tariff_type,
  single_rate_per_kwh,
  day_rate_per_kwh, peak_rate_per_kwh, night_rate_per_kwh,
  day_start, peak_start, night_start
)
values
  ('TR', 'TRY', 'Single', 1.0, null, null, null, '06:00', '17:00', '22:00'),
  ('TR', 'TRY', 'Multi', null, 1.0, 2.0, 0.8, '06:00', '17:00', '22:00')
on conflict (region, currency, tariff_type) do update
set
  single_rate_per_kwh = excluded.single_rate_per_kwh,
  day_rate_per_kwh = excluded.day_rate_per_kwh,
  peak_rate_per_kwh = excluded.peak_rate_per_kwh,
  night_rate_per_kwh = excluded.night_rate_per_kwh,
  day_start = excluded.day_start,
  peak_start = excluded.peak_start,
  night_start = excluded.night_start;
