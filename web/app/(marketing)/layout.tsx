"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandLogo from "../brand-logo";
import CookieConsent from "./cookie-consent";

const adsenseClientId = "ca-pub-4762071706286282";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Tüm İçerikler", href: "/blog" },
  { label: "Hakkımızda", href: "/about" },
];

const footerLinks = {
  kategoriler: [
    { name: "Temel Bilgiler", href: "/blog" },
    { name: "Karbon Hesaplama", href: "/blog" },
    { name: "Türkiye Verileri", href: "/blog" },
    { name: "Azaltma Yolları", href: "/blog" },
  ],
  populer: [
    { name: "Karbon Ayak İzi Nedir?", href: "/blog/karbon-ayak-izi-nedir" },
    { name: "Scope 1, 2, 3 Nedir?", href: "/blog/scope-1-scope-2-scope-3-nedir" },
    { name: "Araba Emisyonu Hesaplama", href: "/blog/araba-karbon-emisyonu-hesaplama" },
    { name: "Elektrik Emisyonu", href: "/blog/elektrik-tuketimi-karbon-emisyonu" },
  ],
  kurumsal: [
    { name: "Gizlilik Politikası", href: "/privacy" },
    { name: "Kullanım Şartları", href: "/terms" },
    { name: "Çerez Politikası", href: "/cookies" },
    { name: "İletişim", href: "/contact" },
  ],
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column" }}>
      {/* AdSense Script — only on marketing pages */}
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
        crossOrigin="anonymous"
      />

      {/* Header - Magazine Style (Minimal & Elegant) */}
      <header
        style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        {/* Top bar (for dates or small notices) */}
        <div style={{ backgroundColor: "#0f172a", color: "#e2e8f0", fontSize: "12px", padding: "8px 24px", textAlign: "center", fontWeight: 500 }}>
          Sürdürülebilir bir gelecek için rehberiniz: CarbonCam
        </div>
        
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "0 24px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <BrandLogo size={36} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 900,
                  color: "#0f172a",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                Carbon<span style={{ color: "#059669" }}>CAM</span>
              </span>
              <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: "2px" }}>
                BİLGİ PORTALI
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
            className="hidden md:flex"
          >
            {navLinks.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: isActive ? "#059669" : "#334155",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    backgroundColor: isActive ? "rgba(5, 150, 105, 0.08)" : "transparent",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#059669";
                      e.currentTarget.style.backgroundColor = "#f1f5f9";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#334155";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Subscribe / App CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/blog"
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#fff",
                backgroundColor: "#0f172a",
                padding: "10px 20px",
                borderRadius: "10px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              className="hidden md:inline-flex"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#059669";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0f172a";
              }}
            >
              Uygulamayı İndir
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Menü"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0f172a"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden"
            style={{
              borderTop: "1px solid #f1f5f9",
              padding: "16px 24px",
              backgroundColor: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color:
                      (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                        ? "#059669"
                        : "#0f172a",
                    textDecoration: "none",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    backgroundColor:
                      (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                        ? "rgba(5, 150, 105, 0.08)"
                        : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <div
                style={{
                  borderTop: "1px solid #f1f5f9",
                  marginTop: "8px",
                  paddingTop: "12px",
                  display: "flex",
                }}
              >
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#fff",
                    backgroundColor: "#059669",
                    textDecoration: "none",
                    padding: "12px",
                    borderRadius: "10px",
                  }}
                >
                  Uygulamayı İndir
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Footer - Content Heavy */}
      <footer
        style={{
          backgroundColor: "#fff",
          borderTop: "1px solid #e2e8f0",
          color: "#475569",
          marginTop: "64px",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "80px 24px 40px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "48px",
              marginBottom: "64px",
            }}
          >
            {/* Brand Info */}
            <div style={{ gridColumn: "1 / -1", maxWidth: "400px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <BrandLogo size={32} />
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#0f172a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Carbon<span style={{ color: "#059669" }}>CAM</span>
                </span>
              </div>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.8,
                  marginBottom: "24px",
                }}
              >
                CarbonCam, karbon ayak izi, sürdürülebilirlik ve iklim değişikliği 
                hakkında güvenilir, derinlemesine bilgi sunan bağımsız bir yayın platformudur. 
                Sürdürülebilir bir gelecek için bilimi takip ediyoruz.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Kategoriler
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {footerLinks.kategoriler.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "15px",
                        color: "#475569",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#059669")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Popüler İçerikler
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {footerLinks.populer.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "15px",
                        color: "#475569",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#059669")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  color: "#0f172a",
                  marginBottom: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Kurumsal
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {footerLinks.kurumsal.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "15px",
                        color: "#475569",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#059669")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

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
            <p style={{ fontSize: "14px", margin: 0 }}>
              © 2026 CarbonCam Media. Tüm hakları saklıdır.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>Bizi Takip Edin:</span>
              {[
                { name: "Twitter", icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
                { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  style={{ color: "#94a3b8", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                >
                  <svg style={{ width: "20px", height: "20px" }} fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent />
    </div>
  );
}
