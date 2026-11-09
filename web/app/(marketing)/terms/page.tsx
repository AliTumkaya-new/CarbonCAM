import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const turkish = (await getLocale()) === "tr";
  return { title: turkish ? "Kullanım Şartları" : "Terms of Use", description: turkish ? "CarbonCAM mobil uygulaması ve web sitesi kullanım şartları." : "Terms governing the CarbonCAM mobile app and website." };
}

const headingStyle = { color: "#0f172a", fontSize: "22px", fontWeight: 700, marginBottom: "10px", marginTop: "30px" } as const;

export default async function TermsPage() {
  const turkish = (await getLocale()) === "tr";
  const copy = turkish
    ? {
        effective: "Yürürlük tarihi: 20 Ağustos 2026", title: "CarbonCAM Kullanım Şartları", intro: "Bu şartlar CarbonCAM mobil uygulamasını ve carboncam.com.tr web sitesini kullanımınızı düzenler. Hizmeti kullanarak bu şartları kabul etmiş olursunuz.",
        sections: [
          ["1. Hizmetin kapsamı", "Mobil uygulama; elektrikli cihazların etiket gücü ve kullanım süresinden enerji tüketimi ile tahmini CO₂e etkisi üretir, yerel analiz kayıtları ve günlük görevler sunar, karşılaştırılabilir sayaç girişleriyle tasarruf değişimini gösterir. Web sitesi bilgilendirici içerikler ve destek sayfaları sağlar."],
          ["2. Hesaplamaların niteliği", "Sonuçlar kullanıcının girdiği verilere ve uygulamada belirtilen emisyon faktörüne dayalı tahminlerdir. Sayaç ölçümü, enerji faturası, tam kişisel karbon ayak izi, bağımsız doğrulama, sertifika veya profesyonel çevre danışmanlığı değildir. Önemli kararlar için yetkili kaynakları ve uzmanları kullanmalısınız."],
          ["3. Hesap ve güvenlik", "Giriş bilgilerinizin güvenliğinden ve hesabınız üzerinden yapılan işlemlerden siz sorumlusunuz. Başkasının hesabını kullanamaz, yanıltıcı bilgi veremez veya güvenlik kontrollerini aşmaya çalışamazsınız."],
          ["4. Kabul edilebilir kullanım", "Uygulamayı veya siteyi hukuka aykırı amaçlarla kullanamaz; tersine mühendislik, kötü amaçlı kod, otomatik aşırı istek, hizmeti bozma ya da başkalarının haklarını ihlal eden işlemler gerçekleştiremezsiniz."],
          ["5. Fotoğraflar ve yerel veriler", "Mobil uygulamada seçilen fotoğraf yalnızca cihazınızda geçici referans olarak gösterilir; sunucuya yüklenmez ve otomatik analiz edilmez. Analiz, görev, tasarruf ve profil verilerinin büyük bölümü cihazınızda saklanır. Uygulamayı silmek veya cihaz değiştirmek bu verileri geri döndürülemez biçimde kaybettirebilir."],
          ["6. Üçüncü taraf hizmetleri", "Hesap işlemlerinde Firebase Authentication ile seçtiğiniz Google veya Apple gibi giriş sağlayıcıları kullanılabilir. Bu hizmetlerin kendi şartları ve gizlilik politikaları ayrıca geçerlidir."],
          ["7. Fikri mülkiyet", "CarbonCAM adı, uygulama, tasarım, yazılım ve özgün site içerikleri üzerindeki haklar saklıdır. Açıkça izin verilmedikçe ticari amaçla kopyalanamaz, çoğaltılamaz veya dağıtılamaz."],
          ["8. Hesap kapatma ve silme", "Profil bölümünden çıkış yapabilir, yerel verilerinizi temizleyebilir veya hesabınızı kalıcı olarak silebilirsiniz."],
          ["9. Kullanılabilirlik ve sorumluluk", "Hizmet bakım, ağ veya üçüncü taraf kesintileri nedeniyle geçici olarak kullanılamayabilir. Yürürlükteki hukukun izin verdiği ölçüde CarbonCAM, tahminlere dayanılarak verilen kararlardan veya yerel veri kaybından doğan dolaylı zararlardan sorumlu değildir. Zorunlu tüketici haklarınız saklıdır."],
          ["10. Değişiklikler ve iletişim", "İşlevler veya yasal gereklilikler değiştiğinde bu şartları güncelleyebiliriz; yürürlük tarihi bu sayfada gösterilir."],
        ],
        deleteLink: "Hesap silme sayfası", privacy: "Gizlilik Politikası", questions: "Sorularınız için",
      }
    : {
        effective: "Effective date: 20 August 2026", title: "CarbonCAM Terms of Use", intro: "These terms govern your use of the CarbonCAM mobile app and carboncam.com.tr website. By using the service, you agree to them.",
        sections: [
          ["1. Scope of the service", "The mobile app estimates energy use and CO₂e from an appliance's rated power and usage duration, stores local analyses and daily tasks, and shows savings changes from comparable meter entries. The website provides informational content and support pages."],
          ["2. Nature of estimates", "Results are estimates based on user-entered data and the emissions factor shown in the app. They are not meter readings, energy bills, a complete personal carbon footprint, independent verification, certification, or professional environmental advice. Use authoritative sources and qualified professionals for important decisions."],
          ["3. Accounts and security", "You are responsible for protecting your sign-in details and activity on your account. You must not use another person's account, provide misleading information, or attempt to bypass security controls."],
          ["4. Acceptable use", "You must not use the app or website unlawfully, reverse engineer it, introduce malicious code, send excessive automated requests, disrupt the service, or infringe other people's rights."],
          ["5. Photos and local data", "A selected photo is shown only as a temporary reference on your device; it is not uploaded or automatically analysed. Most analysis, task, savings, and profile data is stored locally. Uninstalling the app or changing devices may permanently remove this data."],
          ["6. Third-party services", "Account features may use Firebase Authentication and a sign-in provider such as Google or Apple. Those providers' own terms and privacy policies also apply."],
          ["7. Intellectual property", "Rights in the CarbonCAM name, app, design, software, and original website content are reserved. They may not be copied, reproduced, or distributed commercially without express permission."],
          ["8. Closing and deleting an account", "You can sign out, clear local data, or permanently delete your account from Profile."],
          ["9. Availability and liability", "Maintenance, network issues, or third-party outages may temporarily affect the service. To the extent permitted by law, CarbonCAM is not liable for indirect losses arising from decisions based on estimates or loss of local data. Mandatory consumer rights remain unaffected."],
          ["10. Changes and contact", "We may update these terms when features or legal requirements change; the effective date is shown on this page."],
        ],
        deleteLink: "Account deletion page", privacy: "Privacy Policy", questions: "Questions",
      };

  return (
    <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "80px 24px" }}>
      <article style={{ maxWidth: "800px", margin: "0 auto", color: "#475569", fontSize: "15px", lineHeight: 1.8 }}>
        <p style={{ color: "#047857", fontSize: "13px", fontWeight: 700, marginBottom: "10px" }}>{copy.effective}</p>
        <h1 style={{ color: "#0f172a", fontSize: "36px", fontWeight: 800, marginBottom: "18px" }}>{copy.title}</h1>
        <p>{copy.intro}</p>
        {copy.sections.map(([title, body], index) => <section key={title}><h2 style={headingStyle}>{title}</h2><p>{body}{index === 7 && <> <Link href="/account-deletion" style={{ color: "#047857", fontWeight: 700 }}>{copy.deleteLink}</Link>.</>}{index === 9 && <> {copy.questions}: <a href="mailto:carboncamplus@gmail.com" style={{ color: "#047857", fontWeight: 700 }}>carboncamplus@gmail.com</a>. <Link href="/privacy" style={{ color: "#047857", fontWeight: 700 }}>{copy.privacy}</Link>.</>}</p></section>)}
      </article>
    </main>
  );
}
