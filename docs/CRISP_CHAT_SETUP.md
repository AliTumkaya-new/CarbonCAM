# 🎯 CarbonCAM - Crisp Chat Widget Kurulum Rehberi

## 📋 Özellikler

✅ **Sağ altta otomatik açılan chat widget**
✅ **Sadece giriş yapan kullanıcılara gösteriliyor** (Clerk ile entegre)
✅ **Otomatik user bilgisi gönderimi:**
   - Email
   - Ad Soyad
   - Şirket Adı (varsa)
✅ **Development mode desteği** (Clerk yokken de çalışır)

---

## 🚀 Hızlı Başlangıç

### 1️⃣ Crisp Hesabı Oluştur

1. **[crisp.chat](https://crisp.chat)** adresine git
2. **Sign up for free** → Email ile kayıt ol
3. Email'ini doğrula

### 2️⃣ Website Oluştur

1. Dashboard'da **"Add a website"** tıkla
2. Website adı: `CarbonCAM` (veya istediğin isim)
3. Website URL: `http://localhost:3000` (development için)
4. **Create website**

### 3️⃣ Website ID'yi Kopyala

1. Sol menüden **Settings** → **Website Settings** → **Setup**
2. **Website ID**'yi kopyala (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 4️⃣ .env.local Dosyasını Güncelle

**Dosya:** `web/.env.local`

```bash
# Crisp Chat (Live Support Widget)
NEXT_PUBLIC_CRISP_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### 5️⃣ Dev Server'ı Yeniden Başlat

```powershell
cd C:\SaaS\web
npm run dev
```

---

## 🎨 Widget Görünümü

### Clerk Varsa (Production Mode)
- ✅ Sadece **giriş yapan kullanıcılara** gösteriliyor
- ✅ Kullanıcı bilgileri otomatik gönderiliyor:
  ```javascript
  Email: user@example.com
  Name: John Doe
  Company: Acme Corp
  ```

### Clerk Yoksa (Development Mode)
- ✅ Herkese gösteriliyor
- ⚠️ User bilgisi olmadan (anonim)

---

## 🔧 Teknik Detaylar

### Dosyalar

**1. `web/app/crisp-chat.tsx`** - Widget component
```tsx
- Crisp script'ini dinamik yüklüyor
- Clerk user bilgilerini okuyup Crisp'e gönderiyor
- Development mode'da Clerk yoksa da çalışıyor
```

**2. `web/app/layout.tsx`** - Root layout
```tsx
- Clerk varsa: <SignedIn> içinde render (sadece giriş yapanlara)
- Clerk yoksa: Direkt render (herkese)
```

### User Data Mapping

| Clerk Field | Crisp Field | API Call |
|------------|-------------|----------|
| `user.primaryEmailAddress.emailAddress` | Email | `crisp.push(["set", "user:email", [email]])` |
| `user.fullName` | Nickname | `crisp.push(["set", "user:nickname", [name]])` |
| `organization.name` | Company | `crisp.push(["set", "user:company", [company]])` |

---

## 📊 Crisp Dashboard'da Görünüm

Kullanıcı chat açtığında Crisp Dashboard'da göreceksin:

```
👤 John Doe
📧 john@example.com
🏢 Acme Corp
💬 Mesaj: "Merhaba, hesaplama yaparken hata aldım..."
```

---

## 🎯 Test Et

1. **Tarayıcıda aç:** http://localhost:3000/dashboard
2. Sağ alt köşede **mavi chat balonu** görünecek
3. Tıkla → Chat penceresi açılacak
4. Mesaj yaz → Crisp Dashboard'da göreceksin

---

## 🔐 Production Checklist

- [ ] Crisp Website ID'yi `.env.local`'e ekledin
- [ ] Clerk authentication aktif (production için)
- [ ] Crisp Dashboard'da team üyeleri ekledin
- [ ] Notification ayarlarını yaptın (email/mobile)
- [ ] Canned responses (hazır cevaplar) oluşturdun

---

## 💡 İpuçları

### Widget Pozisyonunu Değiştir
Crisp Dashboard → Settings → Chatbox → **Position** → Left/Right

### Widget Rengini Değiştir
Crisp Dashboard → Settings → Chatbox → **Theme color** → `#10b981` (Emerald)

### Offline Mesajı
Crisp Dashboard → Settings → Chatbox → **Availability** → Customize message

### Otomatik Mesaj
Crisp Dashboard → Settings → Chatbox → **Triggers** → Add trigger
- "Hoş geldin! Nasıl yardımcı olabiliriz?"

---

## 🐛 Sorun Giderme

### Widget Görünmüyor?
```bash
# Console'da kontrol et:
✅ Crisp Chat widget loaded
📧 Crisp: Email set → user@example.com
```

### User bilgisi gönderilmiyor?
- Clerk'in aktif olduğundan emin ol
- `useUser()` hook'unun çalıştığını kontrol et
- Console'da hata var mı bak

### Widget yükleniyor ama çalışmıyor?
- Crisp Website ID doğru mu?
- `.env.local` dosyası var mı?
- Dev server yeniden başlattın mı?

---

## 📚 Ek Kaynaklar

- [Crisp Documentation](https://docs.crisp.chat/)
- [Crisp API Reference](https://docs.crisp.chat/references/javascript-sdk/)
- [Clerk User Metadata](https://clerk.com/docs/users/metadata)

---

**🎉 Artık canlı destek widget'ın hazır!**
