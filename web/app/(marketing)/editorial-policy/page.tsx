import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const turkish = (await getLocale()) === "tr";
  return {
    title: turkish ? "Editoryal İlkeler ve Kaynak Politikası" : "Editorial and Sourcing Policy",
    description: turkish
      ? "CarbonCAM içeriklerinin nasıl araştırıldığını, kaynaklandırıldığını, güncellendiğini ve düzeltildiğini öğrenin."
      : "How CarbonCAM researches, sources, reviews, updates, and corrects its educational content.",
    alternates: { canonical: "https://carboncam.com.tr/editorial-policy" },
  };
}

const headingStyle = { color: "#0f172a", fontSize: "22px", fontWeight: 700, marginBottom: "12px", marginTop: "34px" } as const;

export default async function EditorialPolicyPage() {
  const turkish = (await getLocale()) === "tr";
  const copy = turkish
    ? {
        eyebrow: "CarbonCAM yayın ilkeleri",
        title: "Editoryal ve kaynak politikası",
        intro: "CarbonCAM; enerji kullanımı, sera gazı hesaplamaları ve gündelik azaltım kararları hakkında anlaşılır eğitim içeriği yayımlar. Amacımız arama motorları için çok sayıda benzer sayfa üretmek değil, kullanıcıların bir hesabın kapsamını, girdilerini ve sınırlarını anlayabilmesine yardımcı olmaktır.",
        updated: "Son editoryal gözden geçirme: 2 Eylül 2026",
        sections: [
          ["İçeriği kim hazırlıyor?", "Makaleler CarbonCAM Editoryal Ekibi adıyla yayımlanır. CarbonCAM bir mobil uygulama ve bilgi platformudur; bağımsız doğrulama kuruluşu, sertifikasyon kurumu veya resmi kamu kaynağı değildir. Teknik iddialar mümkün olduğunda ilgili kamu kurumu, uluslararası standart kuruluşu veya yöntemin sahibi tarafından yayımlanan birincil kaynağa bağlanır."],
          ["Kaynakları nasıl seçiyoruz?", "Önceliğimiz T.C. Enerji ve Tabii Kaynaklar Bakanlığı, T.C. İklim Değişikliği Başkanlığı, UNFCCC, IPCC, ICAO, IEA ve GHG Protocol gibi kurumlardır. Sayısal bir faktör kullanıldığında yıl, birim, coğrafya ve hesap sınırı birlikte kontrol edilir. İkincil kaynak yalnızca birincil belge bulunmadığında veya uygulama örneği için ek bağlam gerektiğinde kullanılabilir."],
          ["İçerik nasıl hazırlanıyor?", "Önce kullanıcının yanıtlamaya çalıştığı soru ve karar belirlenir. Ardından kapsam, temel kavramlar, veri gereksinimleri, uygulanabilir örnek, sık yapılan hatalar ve yöntemin sınırları yazılır. Kaynaktan cümle kopyalamak yerine, belge içindeki yöntem kullanıcıya özgü bir karar akışına dönüştürülür. Kaynak bağlantıları makalenin sonunda erişim tarihiyle sunulur."],
          ["Hesaplar ve belirsizlik", "Enerji ve CO₂e sonuçları ölçüm değil tahmindir. Sonuç; cihaz gücü, kullanım süresi, sayaç veya fatura verisi, emisyon faktörü ve seçilen kapsama bağlıdır. Yuvarlama son adımda yapılır ve sonuç, girdi kalitesinin izin verdiğinden daha kesin sunulmaz. CarbonCAM sonuçları resmi envanter, enerji faturası, sertifika, doğrulama raporu veya profesyonel çevre danışmanlığı yerine geçmez."],
          ["Güncelleme ve düzeltmeler", "Emisyon faktörleri, ulusal hedefler ve yöntem belgeleri değişebilir. İçerikler kaynak sürümü değiştiğinde veya önemli bir hata bildirildiğinde yeniden incelenir. Esaslı bir içerik değişikliği yapıldığında makalenin güncellenme tarihi değiştirilir; yalnızca sayfayı yeni göstermek için tarih yenilenmez. Açık bir hata görürseniz makale bağlantısı, hatalı bölüm ve mümkünse birincil kaynakla bize yazabilirsiniz."],
          ["Ticari bağımsızlık ve reklamlar", "Reklamlar editoryal içeriğin hazırlanmasını veya sonucunu belirlemez. Reklam alanları içerikten görsel olarak ayrılır ve yasal, hesap, iletişim ya da içerik taşımayan sayfalarda reklam birimi gösterilmez. Hiçbir metin kullanıcıyı reklama tıklamaya teşvik etmez. Sponsorlu bir içerik yayımlanırsa bu ilişki sayfanın başında açıkça belirtilir."],
          ["Otomasyon hakkında", "Yazım, çeviri veya teknik düzenleme sırasında yazılım araçlarından yararlanılabilir. Yayımlanan sayfanın amacı kullanıcıya yararlı bilgi sunmaktır. Toplu ve denetimsiz sayfa üretimi, başka kaynakları yeniden yazma veya yalnızca arama trafiği kazanmak için içerik çoğaltma editoryal yaklaşımımızın parçası değildir."],
        ],
        contact: "Düzeltme ve kaynak bildirimleri",
      }
    : {
        eyebrow: "CarbonCAM publishing standards",
        title: "Editorial and sourcing policy",
        intro: "CarbonCAM publishes accessible educational material about energy use, greenhouse-gas calculations, and everyday reduction decisions. Our purpose is not to create many similar pages for search engines; it is to help readers understand the boundary, inputs, and limitations of a calculation.",
        updated: "Last editorial review: 2 September 2026",
        sections: [
          ["Who prepares the content?", "Articles are published by the CarbonCAM Editorial Team. CarbonCAM is a mobile app and knowledge platform; it is not an assurance provider, certification body, or official public authority. Technical claims link, wherever possible, to a primary source published by the responsible public body, standards organization, or methodology owner."],
          ["How sources are selected", "We prioritize bodies such as the Turkish Ministry of Energy and Natural Resources, the Turkish Climate Change Presidency, UNFCCC, IPCC, ICAO, IEA, and the GHG Protocol. When a numerical factor is used, its year, unit, geography, and accounting boundary are reviewed together. A secondary source may be used only when a primary document is unavailable or additional implementation context is needed."],
          ["How a guide is prepared", "We begin with the decision a reader is trying to make. The guide then explains scope, core concepts, data needs, a practical example, common mistakes, and material limitations. Instead of copying source text, we turn the method into a decision process specific to the reader's task. Source links and access dates appear at the end of each article."],
          ["Calculations and uncertainty", "Energy and CO₂e results are estimates, not direct measurements. They depend on appliance power, operating time, bill or meter data, emission factors, and the selected boundary. Rounding is applied at the end and a result is not presented with more precision than its inputs support. CarbonCAM does not replace an official inventory, utility bill, certificate, assurance report, or professional environmental advice."],
          ["Updates and corrections", "Emission factors, national targets, and methodology documents can change. We review affected content when a source version changes or a material error is reported. A substantial content revision updates the article date; dates are not changed merely to make a page appear fresh. To report an error, send the article link, disputed passage, and preferably the primary supporting source."],
          ["Commercial independence and advertising", "Advertising does not determine editorial conclusions. Ad units are visually separate from content and are not shown on legal, account, contact, or other non-content pages. We never ask readers to click an ad. If sponsored material is published in the future, that relationship will be disclosed prominently at the start of the page."],
          ["Use of automation", "Software tools may assist writing, translation, or technical editing. Published pages exist to help users. Mass production of unchecked pages, rewriting other sources, and multiplying content solely to attract search traffic are not part of our editorial approach."],
        ],
        contact: "Corrections and source questions",
      };

  return (
    <main style={{ backgroundColor: "#f6f8f6", minHeight: "100vh", padding: "72px 20px" }}>
      <article style={{ backgroundColor: "#fff", border: "1px solid #dfe9e4", borderRadius: "24px", margin: "0 auto", maxWidth: "860px", padding: "clamp(28px, 6vw, 56px)" }}>
        <p style={{ color: "#0a8f70", fontSize: "12px", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>{copy.eyebrow}</p>
        <h1 style={{ color: "#0a211b", fontSize: "clamp(34px, 6vw, 52px)", lineHeight: 1.08, marginTop: "10px" }}>{copy.title}</h1>
        <p style={{ color: "#48615a", fontSize: "18px", lineHeight: 1.75, marginTop: "22px" }}>{copy.intro}</p>
        <p style={{ color: "#64748b", fontSize: "13px", marginTop: "18px" }}>{copy.updated}</p>
        <div style={{ color: "#475569", fontSize: "16px", lineHeight: 1.8 }}>
          {copy.sections.map(([title, body]) => <section key={title}><h2 style={headingStyle}>{title}</h2><p>{body}</p></section>)}
        </div>
        <p style={{ borderTop: "1px solid #e2e8f0", color: "#475569", marginTop: "38px", paddingTop: "24px" }}>{copy.contact}: <a href="mailto:carboncamplus@gmail.com" style={{ color: "#047857", fontWeight: 700 }}>carboncamplus@gmail.com</a></p>
      </article>
    </main>
  );
}

