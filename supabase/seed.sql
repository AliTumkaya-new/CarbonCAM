-- CarbonCAM / Supabase Seed Data
-- Notlar:
-- - density değerleri burada g/cm^3 olarak girilmiştir (örn: çelik ~7.85).
-- - Kc değerleri N/mm^2 (J/mm^3 ile boyutsal olarak eşdeğer ölçeklerde kullanılabilir).

-- =========================
-- Machines
-- =========================
insert into public.machines (model, standby_power_kw, max_power_kw)
values
  ('Mazak VCN-530', 1.2, 15.0),
  ('DMG Mori CMX 1100', 1.8, 22.0),
  ('Haas VF-2', 0.9, 12.0)
on conflict (model) do update
set standby_power_kw = excluded.standby_power_kw,
    max_power_kw = excluded.max_power_kw;

-- =========================
-- Materials
-- =========================
insert into public.materials (name, kc_value, density)
values
  ('Steel AISI 1040', 2100.0, 7.85),
  ('Stainless Steel 304', 2450.0, 8.00),
  ('Aluminum 6061-T6', 700.0, 2.70),
  ('Titanium Ti-6Al-4V', 1800.0, 4.43)
on conflict (name) do update
set kc_value = excluded.kc_value,
    density = excluded.density;
