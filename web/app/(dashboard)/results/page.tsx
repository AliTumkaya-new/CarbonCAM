"use client";

export default function Page() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <header>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 12px",
            backgroundColor: "#d1fae5",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: "#059669",
              borderRadius: "50%",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#059669",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Dashboard
          </span>
        </div>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: "8px",
            letterSpacing: "-0.02em",
          }}
        >
          Results
        </h1>
        <p style={{ fontSize: "15px", color: "#64748b", fontWeight: 500 }}>
          Hesaplama çıktıları ve raporlar burada listelenecek.
        </p>
      </header>

      <section
        style={{
          padding: "32px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.08)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 20px",
              backgroundColor: "#f8fafc",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #e2e8f0",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748b"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginBottom: "8px" }}>
            Yakında Gelecek
          </h2>
          <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "400px", margin: "0 auto" }}>
            Hesaplama sonuçları ve raporlarınız burada görüntülenecek. Bu sayfa Clerk ile korunuyor.
          </p>
        </div>
      </section>
    </div>
  );
}
