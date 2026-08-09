"use client";

import Link from "next/link";
import Image from "next/image";
import { articles, categoryColors } from "./blog/articles";
import AdSlot from "../../components/ad-slot";

export default function MagazineHomePage() {
  // Select a featured article (e.g. the first one)
  const featuredArticle = articles[0];
  // Select latest articles for the grid
  const latestArticles = articles.slice(1, 7);
  // Select popular articles for a separate section
  const popularArticles = articles.slice(7, 11);

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* ═══ MAGAZINE HEADER ═══ */}
      <section
        style={{
          padding: "40px 24px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 900,
              color: "#0f172a",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            İklim Değişikliği ve Karbon Ayak İzi
            <br />
            <span style={{ color: "#059669" }}>Hakkında Her Şey</span>
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Bireysel ve kurumsal karbon emisyonlarını anlamak, ölçmek ve azaltmak
            için ihtiyacınız olan tüm güncel bilgiler, rehberler ve haberler.
          </p>
        </div>
      </section>

      {/* ═══ MAIN LAYOUT (CONTENT + SIDEBAR) ═══ */}
      <section style={{ padding: "48px 24px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
          }}
          className="magazine-grid"
        >
          {/* LEFT: CONTENT AREA */}
          <div>
            {/* FEATURED ARTICLE */}
            <Link
              href={`/blog/${featuredArticle.slug}`}
              style={{
                display: "block",
                textDecoration: "none",
                borderRadius: "24px",
                overflow: "hidden",
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                marginBottom: "48px",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              className="featured-article"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px -10px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  padding: "48px 40px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  background: `linear-gradient(135deg, ${categoryColors[featuredArticle.category]}0f 0%, #ffffff 100%)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: categoryColors[featuredArticle.category],
                      backgroundColor: `${categoryColors[featuredArticle.category]}1a`,
                      padding: "6px 14px",
                      borderRadius: "100px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {featuredArticle.categoryLabel}
                  </span>
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}>
                    Öne Çıkan
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 4vw, 42px)",
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {featuredArticle.title}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#475569",
                    lineHeight: 1.7,
                    maxWidth: "700px",
                  }}
                >
                  {featuredArticle.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#059669",
                    marginTop: "8px",
                  }}
                >
                  Hemen Oku
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* LATEST ARTICLES GRID */}
            <AdSlot format="horizontal" style={{ margin: "0 0 48px 0" }} />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "24px",
                borderBottom: "2px solid #e2e8f0",
                paddingBottom: "12px",
              }}
            >
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                En Son Haberler & Rehberler
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {latestArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  style={{
                    textDecoration: "none",
                    padding: "24px",
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 15px 30px -8px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = categoryColors[article.category];
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: categoryColors[article.category],
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {article.categoryLabel}
                  </span>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#0f172a",
                      lineHeight: 1.3,
                    }}
                  >
                    {article.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      lineHeight: 1.6,
                      flex: 1,
                    }}
                  >
                    {article.excerpt.slice(0, 110)}...
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                    <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>
                      {new Date(article.publishDate).toLocaleDateString("tr-TR", { month: "short", day: "numeric" })}
                    </span>
                    <span style={{ fontSize: "12px", color: "#cbd5e1" }}>•</span>
                    <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>
                      {article.readingTime} dk okuma
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: STICKY SIDEBAR */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            
            {/* Top Sidebar AdSense Slot */}
            <AdSlot format="rectangle" style={{ margin: 0 }} />

            {/* CARBONCAM APP PROMOTION WIDGET - STICKY */}
            <div
              style={{
                position: "sticky",
                top: "104px", // height of header + some margin
                backgroundColor: "#fff",
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                padding: "24px",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#059669",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "4px 12px",
                  borderRadius: "100px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "20px",
                }}
              >
                Sponsorlu
              </div>
              
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", marginBottom: "8px", lineHeight: 1.2 }}>
                Kendi Karbon Ayak İzinizi Takip Edin
              </h3>
              
              <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "24px", lineHeight: 1.6 }}>
                CarbonCam mobil uygulaması ile günlük emisyonlarınızı hesaplayın, görevleri tamamlayın ve dijital ormanınızı büyütün.
              </p>

              {/* Uploaded Screenshot */}
              <div
                style={{
                  width: "100%",
                  maxWidth: "240px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px -10px rgba(5,150,105,0.2)",
                  marginBottom: "24px",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <Image
                  src="/app-screenshots/impact-new.png"
                  alt="CarbonCam Uygulama - Kurtarılan Ağaç Etkisi"
                  width={240}
                  height={500}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                <a
                  href="#"
                  style={{
                    display: "block",
                    padding: "12px",
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "14px",
                    textDecoration: "none",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e293b")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0f172a")}
                >
                  App Store&apos;dan İndir
                </a>
                <a
                  href="#"
                  style={{
                    display: "block",
                    padding: "12px",
                    backgroundColor: "#fff",
                    color: "#0f172a",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "14px",
                    textDecoration: "none",
                    border: "1.5px solid #e2e8f0",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.backgroundColor = "#fff";
                  }}
                >
                  Google Play&apos;den İndir
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Pre-footer AdSense Slot */}
      <section style={{ backgroundColor: "#fff", padding: "0 24px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <AdSlot format="horizontal" style={{ margin: "0" }} />
        </div>
      </section>

      {/* ═══ POPULAR SECTION (FULL WIDTH) ═══ */}
      <section style={{ backgroundColor: "#fff", padding: "64px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "32px",
            }}
          >
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              Popüler İçerikler
            </h2>
            <Link
              href="/blog"
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#059669",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Tümünü Gör →
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {popularArticles.map((article, idx) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  padding: "16px",
                  borderRadius: "16px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: 900,
                    color: "#e2e8f0",
                    lineHeight: 1,
                  }}
                >
                  0{idx + 1}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: categoryColors[article.category],
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {article.categoryLabel}
                  </span>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#0f172a",
                      lineHeight: 1.4,
                    }}
                  >
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Grid Setup */}
      <style>{`
        @media (min-width: 1024px) {
          .magazine-grid {
            grid-template-columns: 1fr 340px !important;
          }
        }
      `}</style>
    </div>
  );
}
