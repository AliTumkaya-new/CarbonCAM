"use client";

import Link from "next/link";
import { useState } from "react";
import CookieConsent from "./cookie-consent";
import AnimatedLogo from "../components/animated-logo";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* Header - Ultra Minimalist */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <AnimatedLogo size="md" variant="gradient" />
          </Link>

          <nav
            style={{
              display: isMenuOpen ? "flex" : "none",
              alignItems: "center",
              gap: "32px",
            }}
            className="desktop-nav"
          >
            {["Özellikler", "Fiyatlandırma", "Dokümantasyon"].map((item, idx) => (
              <Link
                key={idx}
                href={
                  item === "Özellikler"
                    ? "/features"
                    : item === "Fiyatlandırma"
                      ? "/pricing"
                      : "/docs"
                }
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#475569",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0f172a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#475569";
                }}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/sign-in"
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "#475569",
                textDecoration: "none",
                padding: "8px 16px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
            >
              Giriş
            </Link>
            <Link
              href="/sign-up"
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#fff",
                backgroundColor: "#0f172a",
                padding: "10px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1e293b";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0f172a";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Başla
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main>{children}</main>

      {/* Footer - Minimalist & Compact */}
      <footer
        style={{
          borderTop: "1px solid #f1f5f9",
          backgroundColor: "#fafafa",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "64px 24px 32px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "48px",
              marginBottom: "48px",
            }}
          >
            {/* Brand */}
            <div>
              <div style={{ marginBottom: "16px" }}>
                <AnimatedLogo size="sm" variant="gradient" />
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  lineHeight: 1.6,
                  maxWidth: "280px",
                }}
              >
                Sürdürülebilir üretim için karbon ayak izi ölçüm platformu
              </p>
            </div>

            {/* Product */}
            <div>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Ürün
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {[
                  { name: "Özellikler", href: "/features" },
                  { name: "Fiyatlandırma", href: "/pricing" },
                  { name: "API", href: "/docs" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "14px",
                        color: "#64748b",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Kaynaklar
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {[
                  { name: "Dokümantasyon", href: "/docs" },
                  { name: "Yardım", href: "/help" },
                  { name: "Blog", href: "/blog" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "14px",
                        color: "#64748b",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Yasal
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {[
                  { name: "Gizlilik", href: "/privacy" },
                  { name: "Şartlar", href: "/terms" },
                  { name: "Çerezler", href: "/cookies" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "14px",
                        color: "#64748b",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div
            style={{
              paddingTop: "32px",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#94a3b8",
                margin: 0,
              }}
            >
              © 2026 CarbonCAM. Tüm hakları saklıdır.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {["Twitter", "GitHub"].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    color: "#94a3b8",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                >
                  <svg
                    style={{ width: "18px", height: "18px" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {idx === 0 ? (
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent />

      <style jsx global>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
