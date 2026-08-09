import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "CarbonCam gizlilik politikası ve veri işleme şartları.",
};

export default function PrivacyPage() {
  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "48px", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#0f172a", marginBottom: "24px", letterSpacing: "-0.02em" }}>
          Gizlilik Politikası
        </h1>
        
        <div className="legal-content" style={{ fontSize: "15px", color: "#475569", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "16px" }}>
            <strong>Son Güncelleme:</strong> 09 Ağustos 2026
          </p>

          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>
            1. Veri Toplama
          </h2>
          <p style={{ marginBottom: "16px" }}>
            CarbonCam ("biz", "bizi" veya "bizim"), kullanıcılarımızın gizliliğine saygı duyar. 
            Web sitemizi ziyaret ettiğinizde, hizmetlerimizi iyileştirmek ve kişiselleştirilmiş reklamlar (Google AdSense aracılığıyla) sunabilmek için IP adresiniz, tarayıcı türünüz, işletim sisteminiz ve sitemizdeki gezinme davranışlarınız gibi genel anonim veriler toplanabilir.
          </p>

          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>
            2. Google AdSense ve Çerezler
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Web sitemizde reklam yayınlamak için Google AdSense kullanıyoruz. Google, üçüncü taraf bir satıcı olarak, sitemizde reklam yayınlamak için çerezleri kullanır.
            Google'ın DART çerezini kullanması, kullanıcılarımıza sitemize ve internetteki diğer sitelere yaptıkları ziyaretlere dayalı olarak reklamlar sunmasını sağlar.
            Kullanıcılar, Google Reklam ve İçerik Ağı gizlilik politikasını ziyaret ederek DART çerezinin kullanımından çıkabilirler.
          </p>

          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>
            3. Verilerin Kullanımı
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Toplanan bilgiler şu amaçlarla kullanılabilir:
          </p>
          <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>
            <li>Web sitemizi ve içeriklerimizi kullanıcı deneyimine uygun hale getirmek</li>
            <li>Site trafiğini analiz etmek ve hizmetlerimizi geliştirmek</li>
            <li>Reklamları ilgi alanlarınıza göre özelleştirmek</li>
          </ul>

          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>
            4. İletişim
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Gizlilik politikamız ile ilgili her türlü soru ve önerileriniz için <a href="/contact" style={{ color: "#059669" }}>iletişim sayfamız</a> üzerinden bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </main>
  );
}
