import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const turkish = (await getLocale()) === "tr";
  return { title: turkish ? "Çerez Politikası" : "Cookie Policy", description: turkish ? "CarbonCam çerez politikası ve tercih seçenekleri." : "CarbonCam cookie policy and preference options." };
}

export default async function CookiesPage() {
  const turkish = (await getLocale()) === "tr";
  const copy = turkish
    ? {
        title: "Çerez Politikası", intro: "Sitemizin çalışmasını sağlamak ve yalnızca onay verdiğinizde ölçüm veya reklam özelliklerini etkinleştirmek için çerezler kullanabiliriz.",
        whatTitle: "Çerez nedir?", what: "Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınızın cihazınızda sakladığı küçük metin kayıtlarıdır.",
        typesTitle: "Kullandığımız çerez türleri", types: [["Zorunlu çerezler", "Sitenin temel işlevleri, güvenliği ve dil tercihinizin hatırlanması için gereklidir."], ["Analitik çerezler", "Onay verdiğinizde site kullanımını toplu olarak anlamamıza yardımcı olabilir."], ["Reklam çerezleri", "Onay verdiğinizde Google AdSense gibi ortaklar reklam sunumu ve ölçümü için çerez kullanabilir."]],
        controlTitle: "Tercihlerinizi nasıl kontrol edebilirsiniz?", control: "Çerez bildiriminden isteğe bağlı çerezleri kabul edebilir veya reddedebilirsiniz. Tarayıcı ayarlarınızdan kayıtları silebilir ya da engelleyebilirsiniz.", adCenter: "Google Reklam Merkezinde reklam ayarlarını yönetin",
      }
    : {
        title: "Cookie Policy", intro: "We may use cookies to keep the website working and, only with your consent, enable measurement or advertising features.",
        whatTitle: "What is a cookie?", what: "Cookies are small text records that your browser stores on your device when you visit a website.",
        typesTitle: "Types of cookies we use", types: [["Strictly necessary cookies", "Required for core website functions, security, and remembering your language choice."], ["Analytics cookies", "With your consent, these may help us understand site usage in aggregate."], ["Advertising cookies", "With your consent, partners such as Google AdSense may use cookies for ad delivery and measurement."]],
        controlTitle: "How can you control your choices?", control: "Use the cookie notice to accept or reject optional cookies. You can also delete or block records in your browser settings.", adCenter: "Manage advertising settings in Google My Ad Center",
      };

  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "80px 24px" }}>
      <article style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "clamp(28px, 6vw, 48px)", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#0f172a", marginBottom: "24px" }}>{copy.title}</h1>
        <div style={{ fontSize: "15px", color: "#475569", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "16px" }}>{copy.intro}</p>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>{copy.whatTitle}</h2>
          <p style={{ marginBottom: "16px" }}>{copy.what}</p>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>{copy.typesTitle}</h2>
          <ul style={{ paddingLeft: "24px", marginBottom: "16px" }}>{copy.types.map(([title, body]) => <li key={title} style={{ marginBottom: "8px" }}><strong>{title}:</strong> {body}</li>)}</ul>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", marginTop: "24px", marginBottom: "12px" }}>{copy.controlTitle}</h2>
          <p>{copy.control} <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#047857", fontWeight: 700 }}>{copy.adCenter}</a>.</p>
        </div>
      </article>
    </main>
  );
}
