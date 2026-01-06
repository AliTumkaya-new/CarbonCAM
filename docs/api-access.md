# API Access (ERP/MES)

Bu doküman, müşterilere **API Erişimi** satmak için güvenli bir altyapının nasıl kurulacağını özetler.

## 1) Veritabanı (Supabase)

- Migration: [supabase/migrations/20260103193000_add_api_keys.sql](../supabase/migrations/20260103193000_add_api_keys.sql)
- Tablo: `public.api_keys`
  - `key_hash`: SHA-256(plaintext_key)
  - `key_prefix`: anahtarın başı (örn `sk_live_abc...`) – UI/ops için
  - `revoked_at`: iptal edilen anahtarlar

Not: Clerk userId kullanıldığı için (Supabase `auth.uid()` değil), RLS tarafında yalnızca `service_role` erişimi bırakıldı.

## 2) API Key üretimi (Dashboard)

- Dashboard > **Developer** sekmesinde `Generate API Key` ile `sk_live_...` formatında bir anahtar üretilir.
- Plaintext anahtar **yalnızca bir kez** gösterilir; DB’ye plaintext yazılmaz.

Uygulama tarafı:
- Route: [web/app/api/developer/api-key/route.ts](../web/app/api/developer/api-key/route.ts)
- Gereken env:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - Clerk: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`

## 3) Backend (FastAPI) doğrulama

- Dependency: `require_api_key()`
  - Header: `X-API-Key: sk_live_...` veya `Authorization: Bearer sk_live_...`
  - Hash: `sha256(token)`
  - DB kontrolü: `api_keys.key_hash` eşleşiyor mu, `revoked_at is null` mı?

- Endpoint’ler:
  - `POST /v1/calculate`
  - `GET /v1/batch/template`
  - `POST /v1/batch/process`

Dosya: [main.py](../main.py)

## 4) Rate Limiting (Dakikada 60)

- SlowAPI ile `@limiter.limit("60/minute")` uygulandı.
- Anahtar fonksiyonu: API key’in **sha256 hash’i** (ham anahtar değil) kullanılır.

Önemli: Varsayılan SlowAPI storage bellek içidir. Çoklu instance / serverless ortamda global limit için Redis gibi ortak storage gerekir.

Öneri (prod):
- Redis ekleyin (managed Redis).
- `RATE_LIMIT_REDIS_URL` env değişkenini set edin (örn: `redis://:password@host:6379/0`).

Not: Bu projede Redis opsiyoneldir. `RATE_LIMIT_REDIS_URL` set edilirse SlowAPI otomatik Redis storage kullanır.

## 4.1) Kullanım izleme

- Doğrulanan her API çağrısında `api_keys.last_used_at` alanı best-effort güncellenir.

## 5) Güvenlik önerileri

- Sadece HTTPS kullanın (Vercel/Reverse proxy).
- Plaintext API key’i asla DB/log’a yazmayın.
- Anahtarları döndürme (rotation): yeni key üret, eskiyi `revoked_at` ile iptal et.
- Minimum yetki: `SUPABASE_SERVICE_ROLE_KEY` yalnızca server tarafında olsun.
- Rate limit + WAF (opsiyonel): IP allowlist veya müşteri bazlı ek limitler.

## 6) Örnek kullanım

`curl` ile:

```bash
curl -X POST "http://localhost:8000/v1/calculate" \
  -H "Authorization: Bearer sk_live_..." \
  -H "Content-Type: application/json" \
  -d '{
    "machine_id": "cnc_1",
    "material_id": "mat_4140",
    "initial_weight": 10,
    "final_weight": 9.2,
    "time_min": 30,
    "tariff_type": "Single",
    "currency": "TRY",
    "operation_start_hhmm": "14:30",
    "operation_end_hhmm": "15:00"
  }'
```
