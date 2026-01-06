"use client";

import Link from "next/link";

export default function FeaturesPage() {
  return (
    <main style={{ backgroundColor: "#fff" }}>
      {/* Hero Section */}
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

        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
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
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Özellikler
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
            Güçlü Araçlar,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #475569 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Kolay Kullanım
            </span>
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#64748b",
              maxWidth: "700px",
              margin: "0 auto 48px",
              lineHeight: 1.7,
            }}
          >
            Karbon ayak izi yönetimi için ihtiyacınız olan tüm araçlar. Hızlı, doğru ve kullanımı
            kolay.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/sign-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                backgroundColor: "#0f172a",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(15, 23, 42, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Ücretsiz Başla
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
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: "clamp(60px, 10vw, 100px) 24px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "28px",
            }}
          >
            {[
              {
                title: "Hızlı Hesaplama",
                desc: "Makine, malzeme ve işlem parametrelerini girin, saniyeler içinde detaylı karbon emisyon analizi alın. Yapay zeka destekli motor ile doğru sonuçlar.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                color: "#3b82f6",
              },
              {
                title: "Detaylı Raporlama",
                desc: "ISO 14067 standardına uygun profesyonel PDF raporları ile denetim ve müşteri süreçlerinde kullanın. Grafik ve tablolarla zenginleştirilmiş içerik.",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                color: "#8b5cf6",
              },
              {
                title: "Enerji Optimizasyonu",
                desc: "Enerji tüketimini görselleştirin, işlem ve bekleme sürelerini optimize edin, maliyetleri düşürün. Gerçek zamanlı öneriler.",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                color: "#10b981",
              },
              {
                title: "Batch İşleme",
                desc: "Excel dosyalarıyla yüzlerce hesaplamayı toplu olarak yapın, zamandan tasarruf edin. Otomatik şablon indirme ve veri validasyonu.",
                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                color: "#f59e0b",
              },
              {
                title: "API Entegrasyonu",
                desc: "Kendi ERP ve üretim sistemlerinize entegre edin, otomatik hesaplama yapın. RESTful API ile kolay entegrasyon ve webhook desteği.",
                icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                color: "#ec4899",
              },
              {
                title: "Çoklu Dil Desteği",
                desc: "Türkçe, İngilizce ve Almanca dillerinde tam destek ile global müşterilerinize hizmet verin. Tüm raporlar çoklu dilde.",
                icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
                color: "#06b6d4",
              },
              {
                title: "Veri Güvenliği",
                desc: "Tüm verileriniz şifreli olarak saklanır. GDPR uyumlu, SOC 2 sertifikalı altyapı ile işletme verileriniz güvende.",
                icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                color: "#ef4444",
              },
              {
                title: "Takım İşbirliği",
                desc: "Ekibinizle birlikte çalışın, rollere göre yetkilendirme yapın. Yorum, etiketleme ve bildirim özellikleri.",
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                color: "#6366f1",
              },
              {
                title: "Gerçek Zamanlı Analitik",
                desc: "Dashboard'da tüm hesaplamalarınızı, trendleri ve tasarruf fırsatlarını görselleştirin. Interaktif grafikler ve filtreler.",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                color: "#14b8a6",
              },
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: "40px 32px",
                  backgroundColor: "#fff",
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)";
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    margin: "0 0 24px 0",
                    backgroundColor: `${feature.color}10`,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={feature.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={feature.icon} />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.7 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "clamp(80px, 12vw, 120px) 24px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            opacity: 0.4,
          }}
        />

        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "20px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Hemen{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Başlayın
            </span>
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#94a3b8",
              marginBottom: "40px",
              lineHeight: 1.7,
            }}
          >
            14 gün ücretsiz deneyin. Kredi kartı gerekmez.
          </p>

          <Link
            href="/sign-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "18px 36px",
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
            Ücretsiz Başla
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
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
