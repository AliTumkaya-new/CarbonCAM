import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "CarbonCam ile iletişime geçin. Soru, öneri ve işbirlikleri için buradayız.",
};

export default function ContactPage() {
  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#fff", padding: "48px", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#0f172a", marginBottom: "12px", letterSpacing: "-0.02em" }}>
            İletişime Geçin
          </h1>
          <p style={{ fontSize: "16px", color: "#64748b" }}>
            Soru, öneri ve reklam/işbirliği talepleriniz için bize ulaşabilirsiniz.
          </p>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div style={{ padding: "24px", backgroundColor: "#f8fafc", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "48px", height: "48px", backgroundColor: "#05966915", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>E-posta</h3>
              <a href="mailto:info@carboncam.com.tr" style={{ fontSize: "15px", color: "#059669", textDecoration: "none" }}>
                info@carboncam.com.tr
              </a>
            </div>
          </div>

          <div style={{ padding: "24px", backgroundColor: "#f8fafc", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "48px", height: "48px", backgroundColor: "#05966915", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Adres</h3>
              <p style={{ fontSize: "15px", color: "#475569", margin: 0 }}>
                Teknoloji Geliştirme Bölgesi, İstanbul, Türkiye
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
