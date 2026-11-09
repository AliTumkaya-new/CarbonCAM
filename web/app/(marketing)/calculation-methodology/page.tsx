import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const turkish = (await getLocale()) === "tr";
  return {
    title: turkish ? "CarbonCAM Hesaplama Metodolojisi" : "CarbonCAM Calculation Methodology",
    description: turkish
      ? "CarbonCAM cihaz enerji ve CO₂e tahmininin formülü, emisyon faktörü, varsayımları ve sınırları."
      : "Formula, emission factor, assumptions, examples, and limitations of CarbonCAM appliance energy and CO₂e estimates.",
    alternates: { canonical: "https://carboncam.com.tr/calculation-methodology" },
  };
}

const factorUrl = "https://enerji.gov.tr/Media/Dizin/EVCED/tr/%C3%87evreVe%C4%B0klim/%C4%B0klimDe%C4%9Fi%C5%9Fikli%C4%9Fi/EmisyonFaktorleri/2023_Turkiye_Elektrik_UretimiveElektrik_Tuketim_Noktasi_Emisyon_Faktorleri.pdf";
const headingStyle = { color: "#0f172a", fontSize: "22px", fontWeight: 700, marginBottom: "12px", marginTop: "34px" } as const;

export default async function CalculationMethodologyPage() {
  const turkish = (await getLocale()) === "tr";
  const copy = turkish
    ? {
        eyebrow: "Şeffaf hesaplama",
        title: "CarbonCAM hesaplama metodolojisi",
        intro: "Bu sayfa, mobil uygulamadaki elektrikli cihaz tahmininin hangi girdileri kullandığını, işlemlerin nasıl yapıldığını ve sonucun ne anlama gelmediğini açıklar.",
        reviewed: "Metodoloji kontrol tarihi: 2 Eylül 2026",
        sections: [
          ["1. Girdiler", "Kullanıcı cihazın Watt cinsinden nominal gücünü ve günlük kullanım süresini girer. Uygulama bu değerleri ölçmez; etiket, kullanım kılavuzu veya kullanıcı tahmini temel alınır. Çevrimli çalışan buzdolabı ve klima gibi cihazlarda nominal güç ile gün boyunca gerçek ortalama güç farklı olabilir."],
          ["2. Enerji formülü", "Günlük enerji (kWh) = güç (W) ÷ 1.000 × günlük kullanım süresi (saat). Aylık görünüm günlük değerin 30 ile, yıllık görünüm 365 ile çarpılmasıyla oluşturulur. Bunlar sabit kullanım varsayımıdır; takvim ayının gün sayısı veya mevsimsel davranış ayrıca modellenmez."],
          ["3. Emisyon faktörü", "Elektrik kaynaklı tahmini etki, kWh değeri ile kg CO₂e/kWh faktörünün çarpılmasıdır. CarbonCAM, Türkiye'de dağıtım hattına bağlı tüketim noktası için Enerji ve Tabii Kaynaklar Bakanlığının yayımladığı 2023 faktörü olan 0,469 kg CO₂e/kWh değerini kullanır. Bakanlık belgesindeki birim 0,469 tCO₂e/MWh'tir; bu iki ifade sayısal olarak eşdeğerdir."],
          ["4. Örnek", "800 W gücündeki bir cihaz günde 2,5 saat kullanılırsa günlük enerji 800 ÷ 1.000 × 2,5 = 2 kWh olur. Tahmini günlük etki 2 × 0,469 = 0,938 kg CO₂e'dir. Sabit kullanım varsayımıyla aylık enerji 60 kWh, yıllık enerji 730 kWh olur. Uygulama sonucu okunabilirlik için yuvarlayabilir; hesap içinde mümkün olan tam değer korunur."],
          ["5. Sonucun kapsamı", "Tahmin yalnızca seçilen cihazın şebeke elektriği kullanımını kapsar. Cihazın üretimi, taşınması, bakımı ve kullanım sonu; evin doğalgazı, ulaşım, gıda veya diğer tüketim kategorileri dahil değildir. Sonuç elektrik faturası, sayaç ölçümü, ürün yaşam döngüsü analizi, kurumsal Scope 2 envanteri ya da bağımsız doğrulama değildir."],
          ["6. Karşılaştırılabilir sayaç kayıtları", "Tasarruf takibinde kullanıcı iki sayaç değerini girer. Sağlıklı karşılaştırma için ölçümlerin aynı kapsamı, benzer süreyi, benzer mevsim ve kullanım koşullarını temsil etmesi gerekir. Uygulama girilen veriyi bağımsız olarak doğrulamaz; bu nedenle özellik adı üçüncü taraf doğrulaması değil, kullanıcı tarafından kaydedilen karşılaştırılabilir ölçüm anlamına gelir."],
          ["7. Belirsizlik ve doğru kullanım", "Cihaz etiketi en yüksek veya belirli bir test koşulundaki gücü gösterebilir. Termostat çevrimi, bekleme modu, voltaj, cihaz yaşı ve kullanıcı davranışı gerçek tüketimi değiştirir. Karar için daha yüksek doğruluk gerekiyorsa uygun bir enerji ölçer veya fatura/sayaç verisi kullanın. Aynı yöntemi ve faktör yılını koruyarak dönemler arası değişimi izleyin."],
          ["8. Güncelleme politikası", "Bakanlık yeni tüketim noktası faktörü yayımladığında uygulama ve bu sayfa birlikte gözden geçirilir. Eski analizler oluşturuldukları sıradaki faktör ve varsayımlarla değerlendirilmelidir. Metodoloji değişikliği geçmiş sonuçları sessizce yeniden yazmamalı; sürüm ve tarih görünür tutulmalıdır."],
        ],
        source: "Birincil kaynak",
        sourceTitle: "2023 Türkiye Elektrik Üretimi ve Elektrik Tüketim Noktası Emisyon Faktörleri Bilgi Formu",
      }
    : {
        eyebrow: "Transparent calculation",
        title: "CarbonCAM calculation methodology",
        intro: "This page explains the inputs used by the mobile app's appliance estimate, how each calculation is performed, and what the result does not represent.",
        reviewed: "Methodology review date: 2 September 2026",
        sections: [
          ["1. Inputs", "The user enters an appliance's nominal power in watts and daily operating time. The app does not measure these values; they come from a label, manual, or user estimate. For cycling equipment such as refrigeration and air conditioning, nominal power can differ materially from average power across a day."],
          ["2. Energy formula", "Daily energy (kWh) = power (W) ÷ 1,000 × daily operating time (hours). The monthly view multiplies daily energy by 30 and the annual view by 365. These are constant-use scenarios; they do not model the exact number of days in a calendar month or seasonal behavior."],
          ["3. Emission factor", "Estimated electricity impact is kWh multiplied by a kg CO₂e/kWh factor. CarbonCAM uses the Turkish Ministry of Energy and Natural Resources' published 2023 factor for a consumption point connected to the distribution grid: 0.469 kg CO₂e/kWh. The source expresses this as 0.469 tCO₂e/MWh; the two units are numerically equivalent."],
          ["4. Worked example", "If an 800 W device operates for 2.5 hours each day, daily energy is 800 ÷ 1,000 × 2.5 = 2 kWh. Estimated daily impact is 2 × 0.469 = 0.938 kg CO₂e. Under constant use, monthly energy is 60 kWh and annual energy is 730 kWh. The display may round for readability while the calculation retains available precision."],
          ["5. Boundary of the result", "The estimate covers grid electricity for the selected appliance only. It excludes manufacture, transport, maintenance, end of life, household gas, travel, food, and other consumption. It is not a utility bill, meter reading, product lifecycle assessment, corporate Scope 2 inventory, certificate, or independent assurance."],
          ["6. Comparable meter records", "For savings tracking, the user enters two meter readings. A meaningful comparison requires the same scope and similar duration, season, and operating conditions. CarbonCAM does not independently validate the input. The feature describes user-recorded comparable measurements, not third-party verification."],
          ["7. Uncertainty and appropriate use", "A product label may show maximum power or power under a test condition. Thermostat cycling, standby demand, voltage, equipment age, and behavior all affect actual use. Where a decision requires greater accuracy, use a suitable energy meter or bill data. Keep the method and factor year consistent when tracking a trend."],
          ["8. Update policy", "When the Ministry publishes a new consumption-point factor, the app and this page are reviewed together. Historical analyses should be understood using the factor and assumptions in effect when they were created. A method change should not silently rewrite old results; its version and date should remain visible."],
        ],
        source: "Primary source",
        sourceTitle: "2023 Türkiye Electricity Generation and Consumption-Point Emission Factors Information Form",
      };

  return (
    <main style={{ backgroundColor: "#f6f8f6", minHeight: "100vh", padding: "72px 20px" }}>
      <article style={{ backgroundColor: "#fff", border: "1px solid #dfe9e4", borderRadius: "24px", margin: "0 auto", maxWidth: "860px", padding: "clamp(28px, 6vw, 56px)" }}>
        <p style={{ color: "#0a8f70", fontSize: "12px", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>{copy.eyebrow}</p>
        <h1 style={{ color: "#0a211b", fontSize: "clamp(34px, 6vw, 52px)", lineHeight: 1.08, marginTop: "10px" }}>{copy.title}</h1>
        <p style={{ color: "#48615a", fontSize: "18px", lineHeight: 1.75, marginTop: "22px" }}>{copy.intro}</p>
        <p style={{ color: "#64748b", fontSize: "13px", marginTop: "18px" }}>{copy.reviewed}</p>
        <div style={{ color: "#475569", fontSize: "16px", lineHeight: 1.8 }}>
          {copy.sections.map(([title, body]) => <section key={title}><h2 style={headingStyle}>{title}</h2><p>{body}</p></section>)}
        </div>
        <section style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "16px", marginTop: "38px", padding: "24px" }}>
          <h2 style={{ ...headingStyle, marginTop: 0 }}>{copy.source}</h2>
          <a href={factorUrl} rel="noopener noreferrer" style={{ color: "#047857", fontWeight: 700, lineHeight: 1.6 }} target="_blank">{copy.sourceTitle}</a>
        </section>
      </article>
    </main>
  );
}
