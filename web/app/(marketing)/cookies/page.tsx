import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "CarbonCam çerez (cookie) politikası ve kullanımları.",
};

export default function CookiesPage() {
  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "48px", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#0f172a", marginBottom: "24px", letterSpacing: "-0.02em" }}>
          Çerez (Cookie) Politikası
        </h1>
        
        <div className="legal-content" style={{ fontSize: "15px", color: "#475569", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "16px" }}>
            Sitemizi kullanımınız sırasında deneyiminizi geliştirmek ve kişiselleştirmek için çerezler kullanmaktayız.
          </p>

          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>
            Çerez Nedir?
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Çerezler (Cookies), web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır.
          </p>

          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>
            Hangi Çerezleri Kullanıyoruz?
          </h2>
          <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <li style={{ marginBottom: "8px" }}>
              <strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması ve güvenlik için gerekli olan temel çerezlerdir.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Analitik Çerezler:</strong> Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olur (örn. Google Analytics).
            </li>
            <li>
              <strong>Reklam Çerezleri:</strong> Google AdSense gibi ortaklarımız, sitemize ve diğer sitelere yaptığınız önceki ziyaretlere dayalı olarak kişiselleştirilmiş reklamlar sunmak için çerez (DART) kullanır.
            </li>
          </ul>

          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>
            Çerezleri Nasıl Kontrol Edebilirsiniz?
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Tarayıcı ayarlarınızı değiştirerek çerezleri reddedebilir veya silebilirsiniz. Ayrıca Google'ın <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#059669" }}>Reklam Merkezi</a> üzerinden kişiselleştirilmiş reklamları kapatabilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}
