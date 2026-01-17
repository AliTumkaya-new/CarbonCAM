"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main style={{ backgroundColor: "#fff" }}>
      {/* Hero */}
      <section
        style={{
          padding: "clamp(60px, 12vw, 120px) 24px",
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
            backgroundSize: "40px 40px",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#475569",
              marginBottom: "32px",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.05)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>ISO 14067 Sertifikalı</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.1,
              marginBottom: "24px",
              letterSpacing: "-0.02em",
            }}
          >
            CNC Tezgahlarınızın
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #475569 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Karbon Ayak İzini
            </span>{" "}
            Ölçün
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "#64748b",
              maxWidth: "680px",
              margin: "0 auto 48px",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            Enerji tüketimini analiz edin, ISO standartlarına uygun raporlar oluşturun ve
            sürdürülebilir üretim için optimize edin.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "32px",
            }}
          >
            <Link
              href="/sign-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 32px",
                backgroundColor: "#0f172a",
                color: "#fff",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "16px",
                textDecoration: "none",
                transition: "all 0.2s",
                boxShadow:
                  "0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1e293b";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 15px -3px rgba(15, 23, 42, 0.15), 0 4px 6px -2px rgba(15, 23, 42, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0f172a";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06)";
              }}
            >
              Ücretsiz Başlayın
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14m-7-7l7 7-7 7" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Link>
            <Link
              href="/docs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 32px",
                backgroundColor: "#fff",
                color: "#0f172a",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "16px",
                textDecoration: "none",
                border: "1.5px solid #e2e8f0",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f8fafc";
                e.currentTarget.style.borderColor = "#cbd5e1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Dokümantasyon
            </Link>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            <div style={{ display: "flex", marginLeft: "-8px" }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#e2e8f0",
                    border: "2px solid #fff",
                    marginLeft: "-8px",
                  }}
                />
              ))}
            </div>
            <span>
              <strong style={{ color: "#0f172a" }}>500+</strong> kullanıcı güveniyor
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "80px 24px", backgroundColor: "#fff" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "32px",
          }}
        >
          {[
            {
              value: "-18%",
              label: "Ortalama Karbon Azalma",
              icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
              color: "#10b981",
            },
            {
              value: "3dk",
              label: "Hızlı Hesaplama",
              icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              color: "#3b82f6",
            },
            {
              value: "500+",
              label: "Aktif Kullanıcı",
              icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
              color: "#8b5cf6",
            },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                padding: "40px 32px",
                backgroundColor: "#fafafa",
                border: "1px solid #f1f5f9",
                borderRadius: "20px",
                textAlign: "center",
                transition: "all 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 10px 10px -5px rgba(15, 23, 42, 0.04)";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fafafa";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#f1f5f9";
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  margin: "0 auto 20px",
                  backgroundColor: `${stat.color}15`,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={stat.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={stat.icon} />
                </svg>
              </div>
              <div style={{ fontSize: "48px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  color: "#64748b",
                  marginTop: "12px",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section
        style={{ padding: "64px 24px", backgroundColor: "#fafafa", borderTop: "1px solid #f1f5f9" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#64748b",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "40px",
            }}
          >
            Desteklenen Makine Üreticileri
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "48px",
            }}
          >
            {["MAZAK", "DMG MORI", "HAAS", "FANUC", "SIEMENS", "OKUMA"].map((brand) => (
              <div
                key={brand}
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#cbd5e1",
                  transition: "all 0.3s",
                  cursor: "default",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#64748b";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#cbd5e1";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "clamp(80px, 12vw, 120px) 24px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#f1f5f9",
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
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: "16px",
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
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Karbon ayak izi yönetimini kolaylaştıran profesyonel araçlar
            </p>
          </div>

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
                desc: "Makine, malzeme ve işlem parametrelerini girin, saniyeler içinde detaylı karbon emisyon analizi alın.",
                icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                color: "#3b82f6",
              },
              {
                title: "Detaylı Raporlama",
                desc: "ISO 14067 standardına uygun profesyonel PDF raporları ile denetim ve müşteri süreçlerinde kullanın.",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                color: "#8b5cf6",
              },
              {
                title: "Enerji Optimizasyonu",
                desc: "Enerji tüketimini görselleştirin, işlem ve bekleme sürelerini optimize edin, maliyetleri düşürün.",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                color: "#10b981",
              },
              {
                title: "Batch İşleme",
                desc: "Excel dosyalarıyla yüzlerce hesaplamayı toplu olarak yapın, zamandan tasarruf edin.",
                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                color: "#f59e0b",
              },
              {
                title: "API Entegrasyonu",
                desc: "Kendi ERP ve üretim sistemlerinize entegre edin, otomatik hesaplama yapın.",
                icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
                color: "#ec4899",
              },
              {
                title: "Çoklu Dil Desteği",
                desc: "Türkçe, İngilizce ve Almanca dillerinde tam destek ile global müşterilerinize hizmet verin.",
                icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
                color: "#06b6d4",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                style={{
                  padding: "40px 32px",
                  backgroundColor: "#fff",
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
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

      {/* How it Works */}
      <section style={{ padding: "clamp(80px, 12vw, 120px) 24px", backgroundColor: "#fafafa" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
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
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Süreç
            </div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: "16px",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Nasıl{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0f172a 0%, #475569 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Çalışır?
              </span>
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Üç basit adımda karbon emisyon analizi
            </p>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}
          >
            {/* Connecting line */}
            <div
              style={{
                position: "absolute",
                left: "31px",
                top: "80px",
                bottom: "80px",
                width: "2px",
                background: "linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%)",
              }}
            />

            {[
              {
                num: "1",
                title: "Veri Girişi",
                desc: "Makine tipi, malzeme özellikleri, işlem süreleri ve enerji tarifenizi sisteme girin.",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                color: "#3b82f6",
              },
              {
                num: "2",
                title: "Analiz & Hesaplama",
                desc: "Yapay zeka destekli hesaplama motoru enerji tüketimini analiz eder ve karbon emisyonunu hesaplar.",
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                color: "#8b5cf6",
              },
              {
                num: "3",
                title: "Rapor & Optimizasyon",
                desc: "ISO standartlarına uygun detaylı PDF raporunuzu alın ve enerji tasarrufu önerileri görün.",
                icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                color: "#10b981",
              },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-start",
                  backgroundColor: "#fff",
                  padding: "32px",
                  borderRadius: "20px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s",
                  position: "relative",
                  zIndex: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 10px 10px -5px rgba(15, 23, 42, 0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: step.color,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={step.icon} />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "28px",
                      height: "28px",
                      backgroundColor: "#0f172a",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#fff",
                      border: "3px solid #fafafa",
                    }}
                  >
                    {step.num}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: "8px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "clamp(80px, 12vw, 120px) 24px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
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
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#94a3b8",
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
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Hemen Başlayın
          </div>

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
            Karbon yönetimine{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              bugün başlayın
            </span>
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#94a3b8",
              marginBottom: "40px",
              lineHeight: 1.7,
              maxWidth: "500px",
              margin: "0 auto 40px",
            }}
          >
            Ücretsiz hesap oluşturun ve hemen karbon ayak izi hesaplamaya başlayın. Kredi kartı
            gerekmez.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
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
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Hemen Başlayın
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
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Dokümantasyon
            </Link>
          </div>

          <div
            style={{
              marginTop: "48px",
              fontSize: "14px",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              14 gün ücretsiz
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Kredi kartı gerektirmez
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
              İstediğiniz zaman iptal
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
