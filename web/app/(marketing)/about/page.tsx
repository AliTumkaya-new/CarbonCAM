import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const turkish = (await getLocale()) === "tr";
  return {
    title: turkish ? "Hakkımızda" : "About",
    description: turkish
      ? "CarbonCam'in misyonu, vizyonu ve çalışma alanları."
      : "Learn about CarbonCam's mission, vision, and work.",
  };
}

export default async function AboutPage() {
  const turkish = (await getLocale()) === "tr";
  const copy = turkish
    ? {
        title: "Hakkımızda",
        intro: "bireylerin karbon etkilerini anlamalarına, ölçmelerine ve azaltmalarına yardımcı olan bağımsız bir bilgi portalı ve teknoloji platformudur.",
        missionTitle: "Misyonumuz",
        mission: "Karmaşık bilimsel verileri, emisyon standartlarını ve sürdürülebilirlik uygulamalarını herkesin günlük hayatında kullanabileceği açık ve kaynaklı bilgilere dönüştürüyoruz.",
        visionTitle: "Vizyonumuz",
        vision: "Karbon bilincini küresel ölçekte artırmayı ve sürdürülebilir seçimleri ölçülebilir, devam ettirilebilir alışkanlıklara dönüştürmeyi amaçlıyoruz.",
        workTitle: "Ne yapıyoruz?",
        work: [
          ["Güvenilir içerik", "İklim bilimi, karbon hesaplama ve sürdürülebilirlik hakkında araştırmaya dayalı rehberler yayımlıyoruz."],
          ["Teknolojik araçlar", "Mobil uygulamada cihazların Watt değeri ve kullanım süresine göre enerji ile tahmini CO₂e etkisini hesaplamayı destekliyoruz."],
          ["Ölçülebilir ilerleme", "Günlük görevler ve karşılaştırılabilir sayaç kayıtlarıyla tasarruf takibini anlaşılır hale getiriyoruz."],
        ],
        operatorTitle: "Yayıncı ve sorumluluk sınırı",
        operator: "Site ve mobil ürün CarbonCAM tarafından işletilir. İçerikler CarbonCAM Editoryal Ekibi adıyla yayımlanır. CarbonCAM bir kamu kurumu, sertifikasyon kuruluşu veya bağımsız doğrulayıcı değildir. Hesaplar eğitim ve kişisel karar desteği içindir; resmi raporlama veya profesyonel danışmanlığın yerine geçmez.",
        standardsTitle: "Kaynak ve düzeltme yaklaşımı",
        standards: "Sayısal ve teknik açıklamalarda mümkün olduğunda yöntemin sahibi olan kamu kurumu veya uluslararası kuruluşa bağlantı veririz. Emisyon faktörünün yılı, birimi ve kapsamı açıkça gösterilir. Hata veya güncelliğini yitirmiş kaynak bildirimlerini e-posta üzerinden inceleriz.",
        editorialLink: "Editoryal ilkelerimizi inceleyin",
        methodologyLink: "Hesaplama metodolojisini görün",
        closing: "Gezegenimiz için birlikte adım atalım.",
      }
    : {
        title: "About",
        intro: "is an independent knowledge and technology platform that helps people understand, estimate, and reduce their carbon impact.",
        missionTitle: "Our mission",
        mission: "We turn complex climate data, emissions standards, and sustainability practices into clear, sourced information people can use in everyday life.",
        visionTitle: "Our vision",
        vision: "We aim to improve carbon literacy globally and help turn sustainable choices into measurable, lasting habits.",
        workTitle: "What we do",
        work: [
          ["Reliable content", "We publish research-based guides about climate science, carbon calculations, and sustainability."],
          ["Practical technology", "Our mobile app estimates appliance energy and CO₂e impact from wattage and usage time."],
          ["Measurable progress", "Daily tasks and comparable meter readings make savings easier to understand and track."],
        ],
        operatorTitle: "Publisher and limits of responsibility",
        operator: "The website and mobile product are operated by CarbonCAM. Guides are published by the CarbonCAM Editorial Team. CarbonCAM is not a public authority, certification body, or independent assurance provider. Calculations are for education and personal decision support, not official reporting or professional advice.",
        standardsTitle: "Sourcing and corrections",
        standards: "For numerical and technical explanations, we link wherever possible to the public body or international organization responsible for the method. We identify the year, unit, and boundary of emission factors. Reports of errors or outdated sources are reviewed through our contact email.",
        editorialLink: "Read our editorial standards",
        methodologyLink: "See the calculation methodology",
        closing: "Take the next step for our planet with us.",
      };

  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "80px 24px" }}>
      <article style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "clamp(28px, 6vw, 48px)", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#0f172a", marginBottom: "24px" }}>{copy.title}</h1>
        <div style={{ fontSize: "16px", color: "#475569", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "20px" }}>
          <p><strong>CarbonCam</strong> {copy.intro}</p>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", marginTop: "16px" }}>{copy.missionTitle}</h2>
          <p>{copy.mission}</p>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", marginTop: "16px" }}>{copy.visionTitle}</h2>
          <p>{copy.vision}</p>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", marginTop: "16px" }}>{copy.workTitle}</h2>
          <ul style={{ paddingLeft: "20px" }}>
            {copy.work.map(([title, body]) => <li key={title} style={{ marginBottom: "10px" }}><strong>{title}:</strong> {body}</li>)}
          </ul>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", marginTop: "16px" }}>{copy.operatorTitle}</h2>
          <p>{copy.operator}</p>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", marginTop: "16px" }}>{copy.standardsTitle}</h2>
          <p>{copy.standards}</p>
          <p style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <Link href="/editorial-policy" style={{ color: "#047857", fontWeight: 700 }}>{copy.editorialLink} →</Link>
            <Link href="/calculation-methodology" style={{ color: "#047857", fontWeight: 700 }}>{copy.methodologyLink} →</Link>
          </p>
          <p style={{ marginTop: "24px", fontSize: "18px", fontWeight: 700, color: "#047857" }}>{copy.closing}</p>
        </div>
      </article>
    </main>
  );
}
