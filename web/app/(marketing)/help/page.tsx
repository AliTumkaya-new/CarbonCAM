"use client";

import Link from "next/link";

export default function HelpPage() {
  return (
    <main style={{ backgroundColor: "#fff" }}>
      <section
        style={{
          padding: "clamp(80px, 12vw, 140px) 24px clamp(60px, 8vw, 100px)",
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
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#475569",
              marginBottom: "24px",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Yardım Merkezi
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "24px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Size Nasıl{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #475569 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Yardımcı Olabiliriz?
            </span>
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#64748b",
              lineHeight: 1.7,
              marginBottom: "48px",
            }}
          >
            CarbonCAM kullanımı hakkında sık sorulan sorular ve destek kaynakları
          </p>
        </div>
      </section>

      <section style={{ padding: "clamp(60px, 10vw, 100px) 24px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "48px",
              textAlign: "center",
            }}
          >
            Sık Sorulan Sorular
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[
              {
                q: "CarbonCAM nedir ve ne işe yarar?",
                a: "CarbonCAM, üretim süreçlerinizin karbon ayak izini ölçen ve optimize etmenize yardımcı olan bir SaaS platformudur. Makine, malzeme ve işlem parametrelerinizi analiz ederek detaylı emisyon raporları sunar.",
              },
              {
                q: "Nasıl başlayabilirim?",
                a: "Ücretsiz hesap oluşturarak hemen başlayabilirsiniz. 14 günlük deneme süresinde tüm özelliklere tam erişim sağlarsınız. Kredi kartı bilgisi gerekmez.",
              },
              {
                q: "Hangi makine tiplerini destekliyorsunuz?",
                a: "MAZAK, DMG MORI, HAAS, FANUC, SIEMENS ve OKUMA gibi başlıca CNC makine üreticilerini destekliyoruz. Özel makine tipleri için Enterprise planımızdan yararlanabilirsiniz.",
              },
              {
                q: "Raporlar hangi standartlara uygun?",
                a: "Tüm raporlarımız ISO 14067 standardına uygun olarak hazırlanır. PDF formatında indirilebilir ve denetim süreçlerinde kullanılabilir.",
              },
              {
                q: "API entegrasyonu nasıl yapılır?",
                a: "Professional ve Enterprise planlarında API erişimi bulunur. Dokümantasyon sayfamızdan detaylı entegrasyon kılavuzlarına ulaşabilirsiniz.",
              },
              {
                q: "Verilerim güvende mi?",
                a: "Evet. Tüm verileriniz şifreli olarak saklanır. GDPR uyumlu, SOC 2 sertifikalı altyapı kullanıyoruz. Verileriniz asla üçüncü taraflarla paylaşılmaz.",
              },
              {
                q: "Destek alabiliyor muyum?",
                a: "Evet. Starter planda email destek, Professional planda öncelikli destek, Enterprise planda ise 7/24 destek sunuyoruz.",
              },
              {
                q: "Planımı değiştirebilir miyim?",
                a: "Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Fark ücretler oransal olarak hesaplanır.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                style={{
                  padding: "32px",
                  backgroundColor: "#f8fafc",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s",
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
                  {faq.q}
                </h3>
                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "80px",
              padding: "48px",
              backgroundColor: "#0f172a",
              borderRadius: "24px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#fff",
                marginBottom: "16px",
              }}
            >
              Sorunuzu bulamadınız mı?
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#94a3b8",
                marginBottom: "32px",
              }}
            >
              Ekibimizle iletişime geçin, size yardımcı olmaktan mutluluk duyarız.
            </p>
            <Link
              href="mailto:support@carboncam.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                backgroundColor: "#fff",
                color: "#0f172a",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
