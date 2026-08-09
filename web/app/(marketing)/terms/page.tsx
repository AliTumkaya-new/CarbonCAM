import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description: "CarbonCam web sitesi kullanım şartları ve koşulları.",
};

export default function TermsPage() {
  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "48px", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#0f172a", marginBottom: "24px", letterSpacing: "-0.02em" }}>
          Kullanım Şartları
        </h1>
        
        <div className="legal-content" style={{ fontSize: "15px", color: "#475569", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "16px" }}>
            Lütfen CarbonCam web sitesini kullanmadan önce bu kullanım şartlarını dikkatlice okuyunuz.
          </p>

          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>
            1. Kabul Edilme
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Web sitemize erişerek ve kullanarak, bu kullanım şartlarını ve geçerli tüm yasa ve düzenlemeleri kabul etmiş olursunuz. Bu şartların hiçbirine katılmıyorsanız, bu siteyi kullanmanız yasaktır.
          </p>

          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>
            2. İçerik ve Fikri Mülkiyet
          </h2>
          <p style={{ marginBottom: "16px" }}>
            CarbonCam'de yayınlanan tüm makaleler, metinler, grafikler ve içerikler CarbonCam'in fikri mülkiyetidir (aksi belirtilmedikçe). İçerikler ticari amaçlarla izinsiz kopyalanamaz, çoğaltılamaz veya dağıtılamaz. Bilgi edinme ve kişisel kullanım amacıyla sayfalarımızdan alıntı yapabilirsiniz (kaynak göstermek şartıyla).
          </p>

          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>
            3. Sorumluluk Reddi
          </h2>
          <p style={{ marginBottom: "16px" }}>
            Web sitemizdeki materyaller "olduğu gibi" sağlanmaktadır. CarbonCam, içeriklerin doğruluğu veya güncelliği konusunda zımni dahil olmak üzere hiçbir garanti vermez. Sitede yer alan hesaplamalar ve bilgiler rehberlik amaçlıdır.
          </p>

          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>
            4. Dış Bağlantılar ve Reklamlar
          </h2>
          <p style={{ marginBottom: "16px" }}>
            CarbonCam web sitesinde yayınlanan dış bağlantılar ve üçüncü taraf (Google AdSense vb.) reklamları, CarbonCam'in sorumluluğunda değildir. Tıklanan bağlantıların içeriklerinden ilgili site sahipleri sorumludur.
          </p>
        </div>
      </div>
    </main>
  );
}
