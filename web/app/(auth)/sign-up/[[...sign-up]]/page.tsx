"use client";

import AnimatedLogo from "@/app/components/animated-logo";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SignUpPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* Left Side - Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "48px",
          backgroundColor: "#ffffff",
          position: "relative",
        }}
      >
        {/* Logo */}
        <div
          style={{
            position: "absolute",
            top: "32px",
            left: "48px",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <AnimatedLogo size="sm" variant="gradient" />
          </Link>
        </div>

        {/* Form Container */}
        <div
          style={{
            width: "100%",
            maxWidth: "440px",
            animation: mounted ? "fadeInUp 0.6s ease-out" : "none",
          }}
        >
          <div style={{ marginBottom: "40px" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "12px",
                letterSpacing: "-0.02em",
              }}
            >
              Hesabınızı oluşturun
            </h1>
            <p style={{ fontSize: "16px", color: "#64748b", fontWeight: 500 }}>
              Karbon ayak izi hesaplamaya hemen başlayın
            </p>
          </div>

          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-emerald-500 hover:bg-emerald-600 text-sm normal-case font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 border-0",
                card: "shadow-none border-0 p-0",
                rootBox: "w-full",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton:
                  "border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold text-sm transition-all duration-200 rounded-xl",
                socialButtonsBlockButtonText: "font-semibold text-sm",
                formFieldLabel: "text-sm font-semibold text-slate-700",
                formFieldInput:
                  "border-slate-200 focus:border-emerald-400 focus:ring-emerald-400 rounded-xl transition-all duration-200 font-medium",
                footerActionLink:
                  "text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors",
                identityPreviewEditButton: "text-emerald-600 hover:text-emerald-700 font-semibold",
                formResendCodeLink: "text-emerald-600 hover:text-emerald-700 font-semibold",
                otpCodeFieldInput:
                  "border-slate-200 focus:border-emerald-400 focus:ring-emerald-400 transition-all duration-200 rounded-xl",
                dividerLine: "bg-slate-200",
                dividerText: "text-slate-500 font-medium text-xs",
                footer: "hidden",
                footerPages: "hidden",
                footerPagesLink: "hidden",
                badge: "hidden",
                __experimental_badge: "hidden",
              },
              variables: {
                colorPrimary: "#10b981",
              },
              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "blockButton",
                showOptionalFields: true,
              },
            }}
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
          />

          <div
            style={{
              marginTop: "24px",
              paddingTop: "24px",
              borderTop: "1px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "14px", color: "#64748b", fontWeight: 500 }}>
              Zaten hesabınız var mı?{" "}
              <Link
                href="/sign-in"
                style={{
                  color: "#10b981",
                  fontWeight: 700,
                  textDecoration: "none",
                  borderBottom: "2px solid transparent",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "#10b981")}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
              >
                Giriş Yap
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Carbon Impact Showcase */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            opacity: mounted ? 0.3 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />

        {/* Gradient Orbs */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "15%",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "10%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(50px)",
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Main Heading */}
          <div
            style={{
              marginBottom: "48px",
              animation: mounted ? "fadeInUp 0.8s ease-out" : "none",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
                borderRadius: "100px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#10b981",
                  borderRadius: "50%",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#10b981",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Endüstri 4.0 için Sürdürülebilirlik
              </span>
            </div>

            <h2
              style={{
                fontSize: "48px",
                fontWeight: 900,
                color: "#fff",
                marginBottom: "24px",
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              Üretimde{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                karbon nötr
              </span>{" "}
              geleceğe adım atın
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "rgba(255, 255, 255, 0.7)",
                lineHeight: 1.7,
                maxWidth: "520px",
              }}
            >
              Torna, freze ve lazer kesim operasyonlarınızın karbon ayak izini dakikalar içinde
              hesaplayın. Sürdürülebilirlik hedeflerinize ulaşın.
            </p>
          </div>

          {/* Benefits List */}
          <div
            style={{
              marginBottom: "48px",
              animation: mounted ? "fadeInUp 1s ease-out 0.2s backwards" : "none",
            }}
          >
            {[
              {
                icon: "🌱",
                title: "Karbon Emisyonu Azaltın",
                desc: "Makine seviyesinde detaylı emisyon analizi ile %30'a kadar tasarruf",
              },
              {
                icon: "💰",
                title: "Maliyet Optimizasyonu",
                desc: "Enerji tüketimini optimize ederek üretim maliyetlerini düşürün",
              },
              {
                icon: "📈",
                title: "Raporlama ve Compliance",
                desc: "ISO 14064 uyumlu raporlar ile sürdürülebilirlik hedeflerinizi belgelendirin",
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "24px",
                  padding: "20px",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    borderRadius: "10px",
                    flexShrink: 0,
                  }}
                >
                  {benefit.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: "6px",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.6)",
                      lineHeight: 1.6,
                    }}
                  >
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              paddingTop: "32px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              animation: mounted ? "fadeInUp 1.2s ease-out 0.4s backwards" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#fbbf24", fontSize: "18px" }}>
                    ★
                  </span>
                ))}
              </div>
              <span
                style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "14px", fontWeight: 600 }}
              >
                4.9/5 Kullanıcı Memnuniyeti
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span
                style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "14px", fontWeight: 600 }}
              >
                ISO 14064 Uyumlu
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(30px, -30px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .cl-footer,
        .cl-footerPages,
        .cl-badge,
        .cl-internal-badge {
          display: none !important;
        }

        @media (max-width: 1024px) {
          div[style*="flex: 1"] {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
