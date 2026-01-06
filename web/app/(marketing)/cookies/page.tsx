"use client";

export default function CookiesPage() {
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
            Çerez Politikası
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
              Çerezler Nedir?
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Çerezler, web sitemizi ziyaret ettiğinizde cihazınıza kaydedilen küçük metin
              dosyalarıdır. Çerezler, web sitelerinin kullanıcı deneyimini iyileştirmek, site
              performansını analiz etmek ve kişiselleştirilmiş içerik sunmak için yaygın olarak
              kullanılır.
            </p>
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
              Kullandığımız Çerez Türleri
            </h2>

            <div
              style={{
                marginBottom: "32px",
                padding: "24px",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "12px",
                }}
              >
                1. Zorunlu Çerezler
              </h3>
              <p style={{ marginBottom: "12px" }}>
                Bu çerezler web sitesinin çalışması için gereklidir ve kapatılamaz:
              </p>
              <ul style={{ paddingLeft: "24px" }}>
                <li>Oturum yönetimi çerezleri</li>
                <li>Güvenlik çerezleri</li>
                <li>Yük dengeleme çerezleri</li>
              </ul>
            </div>

            <div
              style={{
                marginBottom: "32px",
                padding: "24px",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "12px",
                }}
              >
                2. Performans Çerezleri
              </h3>
              <p style={{ marginBottom: "12px" }}>
                Site performansını ölçmek ve iyileştirmek için kullanılır:
              </p>
              <ul style={{ paddingLeft: "24px" }}>
                <li>Sayfa yükleme süreleri</li>
                <li>Kullanıcı etkileşim metrikleri</li>
                <li>Hata raporlama</li>
              </ul>
            </div>

            <div
              style={{
                marginBottom: "32px",
                padding: "24px",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "12px",
                }}
              >
                3. Fonksiyonel Çerezler
              </h3>
              <p style={{ marginBottom: "12px" }}>Tercihlerinizi hatırlamak için kullanılır:</p>
              <ul style={{ paddingLeft: "24px" }}>
                <li>Dil tercihi</li>
                <li>Tema seçimi</li>
                <li>Bölge ayarları</li>
              </ul>
            </div>

            <div
              style={{
                padding: "24px",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "12px",
                }}
              >
                4. Analitik Çerezler
              </h3>
              <p style={{ marginBottom: "12px" }}>Site kullanımını anlamak için kullanılır:</p>
              <ul style={{ paddingLeft: "24px" }}>
                <li>Ziyaretçi sayısı</li>
                <li>Trafik kaynakları</li>
                <li>Popüler içerik</li>
                <li>Kullanıcı davranışları</li>
              </ul>
            </div>
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
              Üçüncü Taraf Çerezler
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Bazı hizmetler için üçüncü taraf çerezleri kullanıyoruz:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Google Analytics - Web analizi</li>
              <li>Stripe - Ödeme işlemleri</li>
              <li>Clerk - Kimlik doğrulama</li>
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
              Çerez Tercihlerinizi Yönetme
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Çerez tercihlerinizi şu şekillerde yönetebilirsiniz:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Sitemizde görünen çerez banner'ından</li>
              <li>Tarayıcı ayarlarınızdan</li>
              <li>Hesap ayarlarınızdan (oturum açmış kullanıcılar için)</li>
            </ul>
            <p style={{ marginBottom: "16px" }}>
              <strong>Not:</strong> Zorunlu çerezleri devre dışı bırakırsanız, sitemizin bazı
              özellikleri düzgün çalışmayabilir.
            </p>
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
              Çerez Saklama Süresi
            </h2>
            <ul style={{ paddingLeft: "24px" }}>
              <li>
                <strong>Oturum çerezleri:</strong> Tarayıcıyı kapattığınızda silinir
              </li>
              <li>
                <strong>Kalıcı çerezler:</strong> Belirlenen süre sonunda veya manuel olarak
                silinene kadar saklanır (genellikle 1-12 ay)
              </li>
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
              İletişim
            </h2>
            <p>
              Çerez politikamız hakkında sorularınız için:{" "}
              <a href="mailto:privacy@carboncam.com" style={{ color: "#0f172a", fontWeight: 600 }}>
                privacy@carboncam.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
