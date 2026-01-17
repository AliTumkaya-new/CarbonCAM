"use client";

export default function Page() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Header with Gradient Background */}
      <header
        className="glass-card"
        style={{
          padding: "48px 40px",
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.1)",
          animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="premium-badge" style={{ marginBottom: "20px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Dashboard</span>
        </div>
        <h1
          className="gradient-text"
          style={{
            fontSize: "48px",
            fontWeight: 900,
            marginBottom: "12px",
            letterSpacing: "-0.03em",
          }}
        >
          Results
        </h1>
        <p style={{ fontSize: "16px", color: "#64748b", fontWeight: 500 }}>
          Hesaplama çıktıları ve raporlar burada listelenecek.
        </p>
      </header>

      {/* Empty State Card with Modern Design */}
      <section
        className="glass-card card-hover"
        style={{
          padding: "80px 40px",
          borderRadius: "24px",
          textAlign: "center",
          animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards",
        }}
      >
        <div
          className="float-animation"
          style={{
            width: "120px",
            height: "120px",
            margin: "0 auto 32px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            borderRadius: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 50px -12px rgba(16, 185, 129, 0.25)",
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
        >
          Yakında Gelecek
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#64748b",
            maxWidth: "500px",
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          Hesaplama sonuçları ve raporlarınız burada görüntülenecek. Bu sayfa Clerk ile korunuyor ve
          yüksek performanslı analitik araçlar sunacak.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <div className="stat-card" style={{ minWidth: "140px" }}>
            <div
              style={{ fontSize: "32px", fontWeight: 800, color: "#10b981", marginBottom: "4px" }}
            >
              0
            </div>
            <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 600 }}>Toplam Rapor</div>
          </div>
          <div className="stat-card" style={{ minWidth: "140px" }}>
            <div
              style={{ fontSize: "32px", fontWeight: 800, color: "#10b981", marginBottom: "4px" }}
            >
              0
            </div>
            <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 600 }}>Hesaplama</div>
          </div>
          <div className="stat-card" style={{ minWidth: "140px" }}>
            <div
              style={{ fontSize: "32px", fontWeight: 800, color: "#10b981", marginBottom: "4px" }}
            >
              0 kg
            </div>
            <div style={{ fontSize: "13px", color: "#64748b", fontWeight: 600 }}>CO₂ Tasarrufu</div>
          </div>
        </div>
      </section>
    </div>
  );
}
