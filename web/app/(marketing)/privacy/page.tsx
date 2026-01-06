"use client";

export default function PrivacyPage() {
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
            Gizlilik Politikası
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
              1. Toplanan Bilgiler
            </h2>
            <p style={{ marginBottom: "16px" }}>
              CarbonCAM olarak, hizmetlerimizi sunabilmek için aşağıdaki bilgileri topluyoruz:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Hesap bilgileri (ad, e-posta, şirket bilgileri)</li>
              <li>Kullanım verileri (hesaplama parametreleri, makine bilgileri)</li>
              <li>Teknik veriler (IP adresi, tarayıcı bilgisi, çerez verileri)</li>
              <li>Ödeme bilgileri (şifreli olarak saklanan ödeme metodları)</li>
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
              2. Bilgilerin Kullanımı
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Topladığımız bilgileri şu amaçlarla kullanıyoruz:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Hizmetlerimizi sağlamak ve geliştirmek</li>
              <li>Müşteri desteği sunmak</li>
              <li>Güvenlik ve dolandırıcılık önleme</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
              <li>Analitik ve performans iyileştirme</li>
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
              3. Veri Güvenliği
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Verilerinizin güvenliğini en üst düzeyde tutmak için:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>TLS/SSL şifrelemesi kullanıyoruz</li>
              <li>SOC 2 sertifikalı altyapıda barındırıyoruz</li>
              <li>Düzenli güvenlik denetimleri yapıyoruz</li>
              <li>Erişim kontrolü ve kimlik doğrulama uyguluyoruz</li>
              <li>Veri yedekleme ve kurtarma sistemleri kullanıyoruz</li>
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
              4. Veri Paylaşımı
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Verilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmıyoruz:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Yasal zorunluluklar (mahkeme kararı, yasal süreçler)</li>
              <li>Hizmet sağlayıcılarımız (hosting, ödeme işlemcileri)</li>
              <li>İş transferleri (birleşme, satın alma durumlarında)</li>
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
              5. Haklarınız
            </h2>
            <p style={{ marginBottom: "16px" }}>
              GDPR ve KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
              <li>Verilerinize erişim hakkı</li>
              <li>Verileri düzeltme hakkı</li>
              <li>Verileri silme hakkı ("unutulma hakkı")</li>
              <li>İşlemeyi kısıtlama hakkı</li>
              <li>Veri taşınabilirliği hakkı</li>
              <li>İtiraz hakkı</li>
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
              6. Çerezler
            </h2>
            <p style={{ marginBottom: "16px" }}>
              Sitemizde çerezler kullanıyoruz. Çerez tercihlerinizi yönetmek için{" "}
              <a href="/cookies" style={{ color: "#0f172a", textDecoration: "underline" }}>
                Çerez Politikası
              </a>{" "}
              sayfamızı ziyaret edebilirsiniz.
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
              7. İletişim
            </h2>
            <p>
              Gizlilik politikamız hakkında sorularınız için:{" "}
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
