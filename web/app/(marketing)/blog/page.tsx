"use client";

export default function BlogPage() {
  return (
    <main style={{ backgroundColor: "#fff" }}>
      <section
        style={{
          padding: "clamp(80px, 12vw, 140px) 24px clamp(60px, 8vw, 100px)",
          background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
            backgroundSize: "40px 40px",
            opacity: 0.4,
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
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            Blog
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "24px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Karbon Yönetimi{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #475569 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              İçgörüleri
            </span>
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#64748b",
              lineHeight: 1.7,
            }}
          >
            Sürdürülebilir üretim ve karbon yönetimi hakkında en güncel bilgiler
          </p>
        </div>
      </section>

      <section style={{ padding: "clamp(60px, 10vw, 100px) 24px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              padding: "80px 24px",
              backgroundColor: "#f8fafc",
              borderRadius: "24px",
              border: "1px solid #e2e8f0",
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ margin: "0 auto 24px" }}
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: "16px",
              }}
            >
              Blog Yakında Yayında
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#64748b",
                maxWidth: "500px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Karbon yönetimi, sürdürülebilir üretim ve enerji verimliliği hakkında içeriklerimiz
              yakında burada olacak.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
