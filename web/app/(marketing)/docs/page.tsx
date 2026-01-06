"use client";

export default function Page() {
  const apiBase =
    process.env.NEXT_PUBLIC_CARBONCAM_API_URL ??
    process.env.CARBONCAM_API_URL ??
    "http://localhost:8000";

  const url = `${apiBase.replace(/\/+$/, "")}/docs`;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "linear-gradient(135deg, #f8fafc 0%, #fff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
          backgroundSize: "40px 40px",
          opacity: 0.4,
        }}
      />

      <div style={{ maxWidth: "700px", position: "relative", zIndex: 1 }}>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            padding: "48px",
            boxShadow:
              "0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 10px 10px -5px rgba(15, 23, 42, 0.04)",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#0f172a",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
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
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>

          {/* Badge */}
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
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            API Documentation
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            API Dokümantasyonuna{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #475569 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Yönlendiriliyorsunuz
            </span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "16px",
              color: "#64748b",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}
          >
            Backend API dokümantasyonuna aşağıdaki adresten erişebilirsiniz:
          </p>

          {/* URL Box */}
          <div
            style={{
              padding: "16px 20px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "14px",
                fontWeight: 600,
                color: "#0f172a",
                wordBreak: "break-all",
              }}
            >
              {url}
            </p>
          </div>

          {/* Info Box */}
          <div
            style={{
              padding: "16px",
              backgroundColor: "#eff6ff",
              border: "1px solid #dbeafe",
              borderRadius: "12px",
              display: "flex",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="#3b82f6"
              style={{ flexShrink: 0, marginTop: "2px" }}
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p
              style={{
                fontSize: "14px",
                color: "#1e40af",
                lineHeight: 1.6,
              }}
            >
              Yönlendirme çalışmazsa, backend sunucunuzun çalıştığından emin olun.
            </p>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href={url}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                backgroundColor: "#0f172a",
                color: "#fff",
                fontSize: "15px",
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
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              API Dokümanını Aç
            </a>

            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                backgroundColor: "transparent",
                color: "#0f172a",
                fontSize: "15px",
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
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
