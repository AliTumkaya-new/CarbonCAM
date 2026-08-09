-- CarbonCAM: machines tablosuna max güç alanı ekler (kW)

alter table if exists public.machines
  add column if not exists max_power_kw double precision not null default 0 check (max_power_kw >= 0);
