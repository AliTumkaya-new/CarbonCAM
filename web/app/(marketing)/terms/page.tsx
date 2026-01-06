"use client";

export default function TermsPage() {
  return (
    <main style={{ backgroundColor: "#fff" }}>
      <section
        style={{
          padding: "clamp(80px, 12vw, 120px) 24px clamp(40px, 6vw, 60px)",
          background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
            backgroundSize: "40px 40px",
            opacity: 0.4,
          }}
        />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Kullanım Şartları
          </h1>
          <p style={{ fontSize: "16px", color: "#64748b" }}>Son güncelleme: 6 Ocak 2026</p>
        </div>
      </section>

      <section style={{ padding: "0 24px clamp(80px, 10vw, 120px)", backgroundColor: "#fff" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            fontSize: "16px",
            color: "#475569",
            lineHeight: 1.8,
          }}
        >
          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "16px",
              }}
            >
              1. Hizmet Koşulları
            </h2>
            <p style={{ marginBottom: "16px" }}>
              CarbonCAM'i kullanarak, bu kullanım şartlarını kabul etmiş olursunuz. Hizmetimiz:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>18 yaş ve üzeri kullanıcılara sunulmaktadır</li>
              <li>Ticari ve profesyonel kullanım için tasarlanmıştır</li>
              <li>Doğru ve eksiksiz bilgi vermenizi gerektirir</li>
              <li>Yalnızca yasal amaçlarla kullanılmalıdır</li>
            </ul>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "16px",
              }}
            >
              2. Hesap Sorumluluğu
            </h2>
            <p style={{ marginBottom: "16px" }}>Kullanıcı olarak:</p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Hesap bilgilerinizin güvenliğinden siz sorumlusunuz</li>
              <li>Şifrenizi başkalarıyla paylaşmamalısınız</li>
              <li>Hesabınızda gerçekleşen tüm aktivitelerden sorumlusunuz</li>
              <li>Yetkisiz erişim durumunda bizi derhal bilgilendirmelisiniz</li>
            </ul>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "16px",
              }}
            >
              3. Ödeme ve Faturalama
            </h2>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Ücretler seçilen plana göre aylık veya yıllık tahsil edilir</li>
              <li>Fiyat değişiklikleri 30 gün önceden bildirilir</li>
              <li>Ödeme bilgilerinizi güncel tutmanız gerekmektedir</li>
              <li>İade politikamız 14 günlük deneme süresi içindir</li>
              <li>Plan iptali mevcut fatura dönemi sonunda geçerli olur</li>
            </ul>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "16px",
              }}
            >
              4. Kullanım Kısıtlamaları
            </h2>
            <p style={{ marginBottom: "16px" }}>Hizmetimizi kullanırken:</p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Sistemi tersine mühendislik yapmamalısınız</li>
              <li>API limitlerini aşmamalısınız</li>
              <li>Kötü amaçlı yazılım veya zararlı kod yüklememelisiniz</li>
              <li>Diğer kullanıcıların hizmetinden yararlanmasını engellememelisiniz</li>
              <li>Hesabınızı başkalarına kiralama veya satmamalısınız</li>
            </ul>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "16px",
              }}
            >
              5. Fikri Mülkiyet
            </h2>
            <p style={{ marginBottom: "16px" }}>
              CarbonCAM platformu, yazılımı, tasarımı ve içeriği bizim fikri mülkiyetimizdir.
              Kullanıcılar:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Platformda oluşturdukları verilerin sahibidir</li>
              <li>Kendi verilerini dışa aktarabilir ve silebilir</li>
              <li>Bizim yazılım ve markamızı kopyalayamaz</li>
              <li>Lisans sözleşmesine uygun kullanım hakları vardır</li>
            </ul>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "16px",
              }}
            >
              6. Hizmet Garanti ve Sorumluluk
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Hizmetimizi "olduğu gibi" sunuyoruz. Karbon hesaplamalarının doğruluğu için çaba
              gösterse de:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Sonuçların %100 doğru olacağını garanti etmiyoruz</li>
              <li>Kesinti olmaksızın hizmet vereceğimizi garanti etmiyoruz</li>
              <li>Dolaylı zararlardan sorumlu değiliz</li>
              <li>Toplam sorumluluğumuz ödenen ücret ile sınırlıdır</li>
            </ul>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "16px",
              }}
            >
              7. Değişiklikler
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Bu şartları dilediğimiz zaman değiştirme hakkını saklı tutarız. Önemli değişiklikler:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Email ile bildirilir</li>
              <li>30 gün önceden duyurulur</li>
              <li>Web sitesinde yayınlanır</li>
            </ul>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "16px",
              }}
            >
              8. İletişim
            </h2>
            <p>
              Kullanım şartları hakkında sorularınız için:{" "}
              <a href="mailto:legal@carboncam.com" style={{ color: "#0f172a", fontWeight: 600 }}>
                legal@carboncam.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
