# Sentry Entegrasyonu (Frontend + Backend)

Amaç: Canlıda oluşan hataları anlık görmek ve her hata raporuna **User ID** bağlamak.

## 1) Sentry env değişkenleri

### Next.js (browser)
- `NEXT_PUBLIC_SENTRY_DSN` (zorunlu)
- `NEXT_PUBLIC_SENTRY_ENVIRONMENT` (opsiyonel)
- `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE` (opsiyonel, default `0`)

### Next.js / CI sourcemap upload (opsiyonel ama önerilir)
- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`

> Not: Bu projede `next.config.ts` sadece `SENTRY_AUTH_TOKEN` varsa `withSentryConfig` ile webpack plugin’i aktif eder.

### FastAPI (server)
- `SENTRY_DSN` (zorunlu)
- `SENTRY_ENVIRONMENT` (opsiyonel)
- `SENTRY_RELEASE` (opsiyonel)
- `SENTRY_TRACES_SAMPLE_RATE` (opsiyonel, default `0`)

## 2) Frontend runtime init

Dosyalar:
- [web/sentry.client.config.ts](../web/sentry.client.config.ts)
- [web/sentry.server.config.ts](../web/sentry.server.config.ts)
- [web/sentry.edge.config.ts](../web/sentry.edge.config.ts)

## 3) User ID bağlama (çok önemli)

- Clerk aktifken kullanıcı ID’si otomatik scope’a yazılır:
  - [web/app/sentry-user-context.tsx](../web/app/sentry-user-context.tsx)
  - [web/app/layout.tsx](../web/app/layout.tsx)

Bu sayede Sentry’de olay detayında `User -> id` alanında Clerk `userId` görünür.

## 4) Örnek: “Hesapla” butonu çalışmazsa Sentry’ye raporlama

- [web/app/dashboard/quick-calculator.tsx](../web/app/dashboard/quick-calculator.tsx) içinde `catch` bloğunda:
  - `Sentry.captureException(e, { tags, extra })`
  - payload/HTTP status gibi debug verileri `extra` olarak gönderilir.

Test etmek için:
- Backend kapalıyken `Calculate` butonuna basın veya bilinçli bir hata ürettirin.

## 5) Backend: 500 hatalarını yakalama

- [main.py](../main.py) içinde Sentry init ve middleware:
  - `sentry_sdk.init(...)`
  - `@app.middleware("http")` ile exception yakalanınca `capture_exception`
  - `X-Carboncam-User-Id` veya API-key auth ile gelen `request.state.user_id` üzerinden `scope.set_user({id: ...})`

Notlar:
- DSN yoksa Sentry no-op olur (event göndermez).
- `send_default_pii=false`: Kişisel verileri otomatik toplamaz; User ID’yi biz set ediyoruz.
