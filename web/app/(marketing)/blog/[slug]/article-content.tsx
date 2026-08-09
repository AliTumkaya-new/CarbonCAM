"use client";

import Link from "next/link";
import type { Article, ArticleCategory } from "../articles";
import AdSlot from "../../../../components/ad-slot";

interface ArticleContentProps {
  article: Article;
  relatedArticles: Article[];
  categoryColors: Record<ArticleCategory, string>;
}

export default function ArticleContent({
  article,
  relatedArticles,
  categoryColors,
}: ArticleContentProps) {
  return (
    <main style={{ backgroundColor: "#fff" }}>
      {/* Hero */}
      <section
        style={{
          padding: "clamp(50px, 8vw, 80px) 24px clamp(30px, 4vw, 50px)",
          background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(5,150,105,0.05) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "#94a3b8",
              marginBottom: "24px",
            }}
          >
            <Link
              href="/"
              style={{ color: "#94a3b8", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#059669")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              Ana Sayfa
            </Link>
            <span>›</span>
            <Link
              href="/blog"
              style={{ color: "#94a3b8", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#059669")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
            >
              Bilgi Merkezi
            </Link>
            <span>›</span>
            <span style={{ color: "#64748b" }}>{article.categoryLabel}</span>
          </nav>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: categoryColors[article.category],
                backgroundColor: `${categoryColors[article.category]}12`,
                padding: "4px 12px",
                borderRadius: "6px",
              }}
            >
              {article.categoryLabel}
            </span>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>
              {article.readingTime} dk okuma
            </span>
            <span style={{ fontSize: "13px", color: "#94a3b8" }}>
              {new Date(article.publishDate).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {article.updatedDate && (
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                (Güncellendi:{" "}
                {new Date(article.updatedDate).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                })}
                )
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(30px, 5vw, 44px)",
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
            }}
          >
            {article.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "0 24px 80px" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            gap: "48px",
          }}
        >
          {/* Main Article */}
          <article style={{ flex: 1, minWidth: 0 }}>
            {/* Table of Contents */}
            <div
              style={{
                padding: "24px",
                backgroundColor: "#f8fafc",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                marginBottom: "40px",
              }}
            >
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                📋 İçindekiler
              </h2>
              <ol
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  counterReset: "toc",
                }}
              >
                {article.content.map((section) => (
                  <li
                    key={section.id}
                    style={{
                      counterIncrement: "toc",
                    }}
                  >
                    <a
                      href={`#${section.id}`}
                      style={{
                        fontSize: "14px",
                        color: "#64748b",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "6px 8px",
                        borderRadius: "8px",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#059669";
                        e.currentTarget.style.backgroundColor = "#f0fdf4";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#64748b";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        →
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* In-article AdSense Slot */}
            <AdSlot format="horizontal" style={{ margin: "0 0 40px 0" }} />

            {/* Article Sections */}
            {article.content.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                style={{
                  marginBottom: idx < article.content.length - 1 ? "48px" : "0",
                  scrollMarginTop: "100px",
                }}
              >
                <h2
                  style={{
                    fontSize: "26px",
                    fontWeight: 800,
                    color: "#0f172a",
                    marginBottom: "20px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    paddingBottom: "12px",
                    borderBottom: "2px solid #f1f5f9",
                  }}
                >
                  {section.title}
                </h2>
                <div
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                  style={{
                    fontSize: "16px",
                    color: "#374151",
                    lineHeight: 1.8,
                  }}
                />
              </section>
            ))}

            {/* Post-article AdSense Slot */}
            <AdSlot format="horizontal" style={{ margin: "40px 0" }} />

            {/* CarbonCam CTA */}
            <div
              style={{
                marginTop: "56px",
                padding: "36px",
                background:
                  "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                borderRadius: "20px",
                border: "1px solid #d1fae5",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  margin: "0 auto 16px",
                  backgroundColor: "#059669",
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
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "12px",
                }}
              >
                Kendi karbon ayak izinizi ölçün!
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "#64748b",
                  lineHeight: 1.7,
                  maxWidth: "450px",
                  margin: "0 auto 24px",
                }}
              >
                CarbonCam uygulamasını kullanarak günlük aktivitelerinizin karbon
                etkisini takip edin, görevleri tamamlayın ve dijital ormanınızı
                büyütün.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    backgroundColor: "#059669",
                    color: "#fff",
                    borderRadius: "10px",
                    fontWeight: 600,
                    fontSize: "14px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#047857";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#059669";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#fff"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </a>
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    backgroundColor: "#fff",
                    color: "#059669",
                    borderRadius: "10px",
                    fontWeight: 600,
                    fontSize: "14px",
                    textDecoration: "none",
                    border: "1px solid #d1fae5",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0fdf4";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#059669"
                  >
                    <path d="M3 20.5v-17c0-.83.52-1.28 1-1.5l10 10-10 10c-.48-.22-1-.67-1-1.5m14.5-10.5L5.5 2l10.24 6.02L14 10l3.5.5m-3.5 3.5l1.74 1.98L5.5 22l12-8.5m4.5-1.5l-3.5-2L15 12l3.5 2 3.5-2z" />
                  </svg>
                  Google Play
                </a>
              </div>
            </div>

            {/* Share */}
            <div
              style={{
                marginTop: "40px",
                paddingTop: "28px",
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#64748b",
                }}
              >
                Bu makaleyi paylaşın:
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  {
                    name: "Twitter",
                    url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://carboncam.com.tr/blog/${article.slug}`)}`,
                    color: "#1DA1F2",
                  },
                  {
                    name: "LinkedIn",
                    url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://carboncam.com.tr/blog/${article.slug}`)}`,
                    color: "#0A66C2",
                  },
                  {
                    name: "WhatsApp",
                    url: `https://wa.me/?text=${encodeURIComponent(article.title + " https://carboncam.com.tr/blog/" + article.slug)}`,
                    color: "#25D366",
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: social.color,
                      backgroundColor: `${social.color}12`,
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${social.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${social.color}12`;
                    }}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section
          style={{
            padding: "64px 24px 80px",
            backgroundColor: "#f8fafc",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: "32px",
              }}
            >
              İlgili Makaleler
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "20px",
              }}
            >
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  style={{
                    textDecoration: "none",
                    padding: "24px",
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px -5px rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor =
                      categoryColors[related.category];
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: categoryColors[related.category],
                      textTransform: "uppercase",
                    }}
                  >
                    {related.categoryLabel}
                  </span>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#0f172a",
                      lineHeight: 1.3,
                    }}
                  >
                    {related.title}
                  </h3>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#059669",
                      fontWeight: 600,
                    }}
                  >
                    Oku →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Article body styles */}
      <style>{`
        .article-body p {
          margin-bottom: 16px;
        }
        .article-body ul, .article-body ol {
          margin-bottom: 16px;
          padding-left: 24px;
        }
        .article-body li {
          margin-bottom: 8px;
        }
        .article-body h4 {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 28px 0 12px;
        }
        .article-body strong {
          color: #0f172a;
          font-weight: 600;
        }
        .article-body a {
          color: #059669;
          text-decoration: underline;
        }
        .article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 14px;
          border-radius: 12px;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}
