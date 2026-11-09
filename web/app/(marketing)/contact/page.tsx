import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const turkish = (await getLocale()) === "tr";
  return {
    title: turkish ? "İletişim" : "Contact",
    description: turkish ? "CarbonCam destek ve iletişim bilgileri." : "CarbonCam support and contact information.",
  };
}

export default async function ContactPage() {
  const turkish = (await getLocale()) === "tr";
  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "80px 24px" }}>
      <section style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#fff", padding: "clamp(28px, 6vw, 48px)", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#0f172a", marginBottom: "12px" }}>{turkish ? "İletişime Geçin" : "Contact Us"}</h1>
          <p style={{ fontSize: "16px", color: "#64748b", lineHeight: 1.6 }}>
            {turkish ? "Destek, gizlilik, hesap silme ve iş birliği talepleriniz için bize ulaşabilirsiniz." : "Contact us about support, privacy, account deletion, or partnerships."}
          </p>
        </div>
        <div style={{ padding: "24px", backgroundColor: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "48px", height: "48px", backgroundColor: "#05966915", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>{turkish ? "E-posta" : "Email"}</h2>
            <a href="mailto:carboncamplus@gmail.com" style={{ fontSize: "15px", color: "#047857", overflowWrap: "anywhere" }}>carboncamplus@gmail.com</a>
          </div>
        </div>
      </section>
    </main>
  );
}
