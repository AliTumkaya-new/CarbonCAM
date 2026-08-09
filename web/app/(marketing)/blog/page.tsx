"use client";

import Link from "next/link";
import { useState } from "react";
import {
  articles,
  categoryLabels,
  categoryColors,
  type ArticleCategory,
} from "./articles";
import AdSlot from "../../../components/ad-slot";

const allCategories: (ArticleCategory | "all")[] = [
  "all",
  "temel-bilgiler",
  "hesaplama",
  "azaltma",
  "turkiye",
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<
    ArticleCategory | "all"
  >("all");

  const filteredArticles =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <main style={{ backgroundColor: "#fff" }}>
      {/* Hero */}
      <section
        style={{
          padding: "clamp(60px, 10vw, 100px) 24px clamp(40px, 6vw, 60px)",
          background: "linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(5,150,105,0.06) 1px, transparent 0)",
            backgroundSize: "32px 32px",
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
              padding: "6px 16px",
              backgroundColor: "#fff",
              border: "1px solid #d1fae5",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#059669",
              marginBottom: "24px",
            }}
          >
            📚 Bilgi Merkezi
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "16px",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            Karbon Ayak İzi{" "}
            <span style={{ color: "#059669" }}>Bilgi Merkezi</span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#64748b",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Karbon emisyonu, iklim değişikliği ve sürdürülebilir yaşam hakkında
            özgün ve kapsamlı makaleler
          </p>
        </div>
      </section>

      {/* Top Banner AdSense Slot */}
      <section style={{ padding: "0 24px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AdSlot format="horizontal" style={{ margin: "24px 0 0 0" }} />
        </div>
      </section>

      {/* Category Filter + Articles */}
      <section style={{ padding: "40px 24px 100px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "48px",
              justifyContent: "center",
            }}
          >
            {allCategories.map((cat) => {
              const isActive = activeCategory === cat;
              const label = cat === "all" ? "Tümü" : categoryLabels[cat];
              const color =
                cat === "all" ? "#059669" : categoryColors[cat];

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "100px",
                    fontSize: "14px",
                    fontWeight: 600,
                    border: "1px solid",
                    borderColor: isActive ? color : "#e2e8f0",
                    backgroundColor: isActive ? `${color}12` : "#fff",
                    color: isActive ? color : "#64748b",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.color = color;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.color = "#64748b";
                    }
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <p
            style={{
              fontSize: "14px",
              color: "#94a3b8",
              marginBottom: "24px",
              fontWeight: 500,
            }}
          >
            {filteredArticles.length} makale
          </p>

          {/* Article Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                style={{
                  textDecoration: "none",
                  padding: "32px 28px",
                  backgroundColor: "#fff",
                  borderRadius: "20px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px -8px rgba(0,0,0,0.08)";
                  e.currentTarget.style.borderColor =
                    categoryColors[article.category];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: `${article.heroColor}12`,
                    borderRadius: "14px",
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
                    stroke={article.heroColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={article.heroIcon} />
                  </svg>
                </div>

                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: categoryColors[article.category],
                      backgroundColor: `${categoryColors[article.category]}12`,
                      padding: "3px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    {article.categoryLabel}
                  </span>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {article.readingTime} dk okuma
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#0f172a",
                    lineHeight: 1.3,
                  }}
                >
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  {article.excerpt.slice(0, 160)}...
                </p>

                {/* Read more */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#059669",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Devamını Oku
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14m-7-7l7 7-7 7" />
                    </svg>
                  </span>
                  <span style={{ fontSize: "12px", color: "#cbd5e1" }}>
                    {new Date(article.publishDate).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
