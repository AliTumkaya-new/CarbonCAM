"use client";

import Link from "next/link";

export default function PricingPage() {
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
            maxWidth: "800px",
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
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Fiyatlandırma
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
            Basit ve{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #475569 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Şeffaf Fiyatlar
            </span>
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            İhtiyacınıza uygun planı seçin. Her zaman iptal edebilirsiniz.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: "clamp(60px, 10vw, 100px) 24px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "32px",
              alignItems: "start",
            }}
          >
            {/* Starter Plan */}
            <div
              style={{
                padding: "40px",
                backgroundColor: "#fff",
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                transition: "all 0.3s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(15, 23, 42, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "8px",
                  }}
                >
                  Starter
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b" }}>Bireysel kullanıcılar için</p>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span style={{ fontSize: "48px", fontWeight: 800, color: "#0f172a" }}>₺299</span>
                  <span style={{ fontSize: "16px", color: "#64748b" }}>/ay</span>
                </div>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 32px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {[
                  "100 hesaplama/ay",
                  "Temel raporlama",
                  "Email destek",
                  "1 kullanıcı",
                  "API erişimi",
                ].map((feature, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontSize: "15px", color: "#475569" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/sign-up"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "16px",
                  backgroundColor: "transparent",
                  color: "#0f172a",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  textDecoration: "none",
                  border: "2px solid #e2e8f0",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8fafc";
                  e.currentTarget.style.borderColor = "#cbd5e1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                Başla
              </Link>
            </div>

            {/* Professional Plan - Popular */}
            <div
              style={{
                padding: "40px",
                backgroundColor: "#0f172a",
                borderRadius: "24px",
                border: "1px solid #0f172a",
                transition: "all 0.3s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-12px)";
                e.currentTarget.style.boxShadow = "0 25px 30px -5px rgba(15, 23, 42, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "6px 20px",
                  backgroundColor: "#3b82f6",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                En Popüler
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "8px",
                  }}
                >
                  Professional
                </h3>
                <p style={{ fontSize: "14px", color: "#94a3b8" }}>
                  Küçük ve orta ölçekli işletmeler için
                </p>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span style={{ fontSize: "48px", fontWeight: 800, color: "#fff" }}>₺799</span>
                  <span style={{ fontSize: "16px", color: "#94a3b8" }}>/ay</span>
                </div>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 32px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {[
                  "Sınırsız hesaplama",
                  "Gelişmiş raporlama",
                  "Öncelikli destek",
                  "5 kullanıcı",
                  "API + Webhook",
                  "Batch işleme",
                  "Özel şablonlar",
                ].map((feature, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontSize: "15px", color: "#cbd5e1" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/sign-up"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "16px",
                  backgroundColor: "#fff",
                  color: "#0f172a",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f1f5f9";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Başla
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div
              style={{
                padding: "40px",
                backgroundColor: "#fff",
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                transition: "all 0.3s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(15, 23, 42, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ marginBottom: "24px" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "8px",
                  }}
                >
                  Enterprise
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b" }}>Büyük ölçekli işletmeler için</p>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span style={{ fontSize: "48px", fontWeight: 800, color: "#0f172a" }}>Özel</span>
                </div>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 32px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {[
                  "Sınırsız her şey",
                  "Özel raporlama",
                  "7/24 destek",
                  "Sınırsız kullanıcı",
                  "Özel entegrasyon",
                  "SLA garantisi",
                  "Özel eğitim",
                  "Dedicated server",
                ].map((feature, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontSize: "15px", color: "#475569" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/sign-up"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "16px",
                  backgroundColor: "transparent",
                  color: "#0f172a",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  textDecoration: "none",
                  border: "2px solid #e2e8f0",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8fafc";
                  e.currentTarget.style.borderColor = "#cbd5e1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                İletişime Geç
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ maxWidth: "800px", margin: "80px auto 0", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: "48px",
              }}
            >
              Sık Sorulan Sorular
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px", textAlign: "left" }}
            >
              {[
                {
                  q: "Ücretsiz deneme süresi var mı?",
                  a: "Evet, tüm planlarda 14 gün ücretsiz deneme sunuyoruz. Kredi kartı bilgisi gerekmez.",
                },
                {
                  q: "İstediğim zaman iptal edebilir miyim?",
                  a: "Evet, istediğiniz zaman iptal edebilirsiniz. İptal sonrası verilerinize 30 gün daha erişebilirsiniz.",
                },
                {
                  q: "Planımı değiştirebilir miyim?",
                  a: "Evet, dilediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Fark ücret iade edilir.",
                },
                {
                  q: "Faturalama nasıl yapılıyor?",
                  a: "Aylık veya yıllık faturalama seçenekleri sunuyoruz. Yıllık ödeme yapanlara %20 indirim uyguluyoruz.",
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "24px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: "8px",
                    }}
                  >
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              ))}
            </div>
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
            Hala karar veremediniz mi?
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#94a3b8",
              marginBottom: "40px",
              lineHeight: 1.7,
            }}
          >
            Ekibimizle iletişime geçin, size en uygun planı birlikte bulalım.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
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
            </Link>

            <Link
              href="/docs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "18px 36px",
                backgroundColor: "transparent",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "12px",
                textDecoration: "none",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
