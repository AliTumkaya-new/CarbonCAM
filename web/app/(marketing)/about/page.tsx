import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "CarbonCam'in misyonu, vizyonu ve hikayesi hakkında bilgi edinin.",
};

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "48px", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#0f172a", marginBottom: "24px", letterSpacing: "-0.02em" }}>
          Hakkımızda
        </h1>
        
        <div style={{ fontSize: "16px", color: "#475569", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "20px" }}>
          <p>
            <strong>CarbonCam</strong>, bireylerin ve kurumların karbon ayak izlerini anlamalarına, ölçmelerine ve en aza indirmelerine yardımcı olmak amacıyla kurulmuş bağımsız bir bilgi portalı ve teknoloji platformudur.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", marginTop: "16px", marginBottom: "8px" }}>
            Misyonumuz
          </h2>
          <p>
            İklim değişikliği ile mücadelenin ancak bilinçli bireyler ve şeffaf verilerle başarıya ulaşabileceğine inanıyoruz. Misyonumuz; karmaşık bilimsel verileri, emisyon standartlarını ve sürdürülebilirlik uygulamalarını herkesin anlayabileceği, günlük hayatına entegre edebileceği anlaşılır içeriklere dönüştürmektir.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", marginTop: "16px", marginBottom: "8px" }}>
            Vizyonumuz
          </h2>
          <p>
            Sadece Türkiye&apos;de değil, global ölçekte karbon bilincini artırmak ve sürdürülebilir yaşam pratiklerini eğlenceli, motive edici (oyunlaştırma ve ödüller) ve ölçülebilir bir alışkanlık haline getirmektir. İklim krizine karşı atılan her küçük adımın, büyük bir küresel etkiye dönüşeceğini biliyoruz.
          </p>

          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", marginTop: "16px", marginBottom: "8px" }}>
            Ne Yapıyoruz?
          </h2>
          <ul>
            <li style={{ marginBottom: "8px" }}><strong>Güvenilir İçerik:</strong> İklim bilimi, karbon ayak izi hesaplama yöntemleri ve sürdürülebilirlik hakkında SEO uyumlu, araştırmaya dayalı özgün makaleler yayınlıyoruz.</li>
            <li style={{ marginBottom: "8px" }}><strong>Teknolojik Çözümler:</strong> Geliştirdiğimiz CarbonCam mobil uygulaması ile fatura, market fişi veya yemek fotoğraflarından yapay zeka ile anında karbon ayak izi analizi yapıyoruz.</li>
            <li><strong>Farkındalık:</strong> Kullanıcılarımızın "dijital ormanlarını" büyüterek çevresel etkilerini görselleştirmelerini ve motive olmalarını sağlıyoruz.</li>
          </ul>

          <p style={{ marginTop: "24px", fontSize: "18px", fontWeight: 600, color: "#059669" }}>
            Gezegenimiz için birlikte adım atalım.
          </p>
        </div>
      </div>
    </main>
  );
}
