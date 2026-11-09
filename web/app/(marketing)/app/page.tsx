import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import StoreBadges from "../../store-badges";

export async function generateMetadata(): Promise<Metadata> {
  const turkish = (await getLocale()) === "tr";
  return {
    title: turkish ? "CarbonCAM Mobil Uygulama" : "CarbonCAM Mobile App",
    description: turkish
      ? "Cihaz gücü ve kullanım süresinden enerji tüketimi ile CO₂e etkisini tahmin eden CarbonCAM mobil uygulaması."
      : "The CarbonCAM mobile app estimates energy use and CO₂e impact from appliance power and usage time.",
    alternates: { canonical: "https://carboncam.com.tr/app" },
  };
}

const screenshots = [
  { src: "/app-screenshots/welcome.png", tr: "CarbonCAM karşılama ekranı", en: "CarbonCAM welcome screen" },
  { src: "/app-screenshots/impact-new.png", tr: "Enerji etkisi hesaplama ekranı", en: "Energy impact calculation screen" },
  { src: "/app-screenshots/hand-dashboard.png", tr: "Etki özeti ekranı", en: "Impact summary screen" },
] as const;

export default async function MobileAppPage() {
  const turkish = (await getLocale()) === "tr";
  const copy = turkish
    ? {
        title: "Cihazlarının enerji etkisini anlaşılır tahminlere dönüştür.",
        intro: "Cihaz etiketindeki Watt değerini ve günlük kullanım süresini gir; tahmini elektrik tüketimini ve CO₂e etkisini gör. Fotoğraf eklemek isteğe bağlıdır ve yalnızca geçici referans olarak cihazında gösterilir.",
        version: "Sürüm 1.0.0 · Üye olmadan kullanılabilir",
        features: [
          ["Açık hesaplama", "Enerji hesabı Watt / 1000 × saat/gün formülünü, CO₂e hesabı ise uygulamada gösterilen elektrik emisyon faktörünü kullanır."],
          ["Yerel veri kontrolü", "Analizler, görevler, tasarruf karşılaştırmaları ve profil tercihleri cihazında kalır; fotoğraflar sunucuya yüklenmez."],
          ["İsteğe bağlı hesap", "Misafir olarak devam edebilir veya e-posta, Google ve iOS'ta Apple ile giriş yapabilirsin. Hesap uygulama içinden kalıcı olarak silinebilir."],
        ],
        privacy: "Gizlilik Politikası",
        deletion: "Hesap ve Veri Silme",
        support: "Destek",
        screenshots: "Uygulamadan ekranlar",
        note: "CarbonCAM sonuçları kullanıcı girdilerine dayalı tahminlerdir; sayaç ölçümü, enerji faturası veya doğrulanmış emisyon azaltımı değildir.",
      }
    : {
        title: "Turn appliance energy use into clear, understandable estimates.",
        intro: "Enter the wattage on an appliance label and its daily usage time to see estimated electricity consumption and CO₂e impact. Adding a photo is optional and it is shown only as a temporary reference on your device.",
        version: "Version 1.0.0 · Works without an account",
        features: [
          ["Transparent calculation", "Energy uses Watt / 1000 × hours/day, while CO₂e uses the electricity emissions factor displayed in the app."],
          ["Local data control", "Analyses, tasks, savings comparisons, and profile preferences stay on your device; photos are not uploaded."],
          ["Optional account", "Continue as a guest or sign in with email, Google, and Apple on iOS. You can permanently delete your account in the app."],
        ],
        privacy: "Privacy Policy",
        deletion: "Account and Data Deletion",
        support: "Support",
        screenshots: "App screens",
        note: "CarbonCAM results are estimates based on user input; they are not meter readings, energy bills, or verified emissions reductions.",
      };

  return (
    <main style={{ background: "linear-gradient(180deg, #ecfdf5 0%, #f8fafc 42%, #fff 100%)", minHeight: "100vh" }}>
      <section style={{ margin: "0 auto", maxWidth: "1120px", padding: "clamp(64px, 9vw, 112px) 24px 56px" }}>
        <div style={{ maxWidth: "820px" }}>
          <h1 style={{ color: "#0f172a", fontSize: "clamp(38px, 7vw, 68px)", fontWeight: 850, letterSpacing: "-.04em", lineHeight: 1.02, marginBottom: "24px" }}>{copy.title}</h1>
          <p style={{ color: "#475569", fontSize: "clamp(17px, 2.2vw, 21px)", lineHeight: 1.7, maxWidth: "760px" }}>{copy.intro}</p>
          <p style={{ color: "#065f46", fontSize: "14px", fontWeight: 800, marginTop: "20px" }}>{copy.version}</p>
          <div style={{ marginTop: "28px" }}><StoreBadges turkish={turkish} /></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "28px" }}>
            <Link href="/privacy" style={primaryLinkStyle}>{copy.privacy}</Link>
            <Link href="/account-deletion" style={secondaryLinkStyle}>{copy.deletion}</Link>
            <Link href="/contact" style={secondaryLinkStyle}>{copy.support}</Link>
          </div>
        </div>
      </section>

      <section style={{ margin: "0 auto", maxWidth: "1120px", padding: "24px 24px 72px" }}>
        <div style={{ display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {copy.features.map(([title, body]) => (
            <article key={title} style={{ backgroundColor: "#fff", border: "1px solid #dbe7e2", borderRadius: "18px", boxShadow: "0 18px 50px rgba(15, 23, 42, .06)", padding: "26px" }}>
              <h2 style={{ color: "#0f172a", fontSize: "20px", marginBottom: "10px" }}>{title}</h2>
              <p style={{ color: "#475569", fontSize: "15px", lineHeight: 1.7 }}>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#0f172a", padding: "72px 24px" }}>
        <div style={{ margin: "0 auto", maxWidth: "1120px" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 42px)", marginBottom: "28px" }}>{copy.screenshots}</h2>
          <div style={{ display: "grid", gap: "18px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {screenshots.map((item) => (
              <div key={item.src} style={{ backgroundColor: "#fff", borderRadius: "22px", overflow: "hidden", padding: "8px" }}>
                <Image src={item.src} alt={turkish ? item.tr : item.en} width={1080} height={1920} sizes="(max-width: 760px) 90vw, 32vw" style={{ borderRadius: "16px", display: "block", height: "auto", width: "100%" }} />
              </div>
            ))}
          </div>
          <p style={{ color: "#cbd5e1", fontSize: "13px", lineHeight: 1.7, marginTop: "26px", maxWidth: "820px" }}>{copy.note}</p>
        </div>
      </section>
    </main>
  );
}

const primaryLinkStyle = { backgroundColor: "#047857", borderRadius: "999px", color: "#fff", fontSize: "14px", fontWeight: 800, padding: "12px 18px", textDecoration: "none" } as const;
const secondaryLinkStyle = { backgroundColor: "#fff", border: "1px solid #a7f3d0", borderRadius: "999px", color: "#065f46", fontSize: "14px", fontWeight: 800, padding: "11px 18px", textDecoration: "none" } as const;
