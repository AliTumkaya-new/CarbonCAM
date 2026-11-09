import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const turkish = (await getLocale()) === "tr";
  return {
    title: turkish ? "Gizlilik Politikası | CarbonCAM" : "Privacy Policy | CarbonCAM",
    description: turkish
      ? "CarbonCAM mobil uygulaması ve web sitesi için veri işleme, saklama ve silme politikası."
      : "Data processing, retention, and deletion policy for the CarbonCAM mobile app and website.",
  };
}

const headingStyle = { color: "#0f172a", fontSize: "20px", fontWeight: 700, marginBottom: "10px", marginTop: "28px" } as const;
const linkStyle = { color: "#047857", fontWeight: 700 } as const;

export default async function PrivacyPage() {
  const turkish = (await getLocale()) === "tr";
  const copy = turkish
    ? {
        eyebrow: "CarbonCAM mobil uygulaması ve web sitesi", title: "Gizlilik Politikası", effective: "Yürürlük tarihi: 25 Ağustos 2026",
        intro: "Bu politika, CarbonCAM mobil uygulaması ile carboncam.com.tr web sitesinde hangi verilerin neden işlendiğini, ne kadar saklandığını ve nasıl silinebileceğini açıklar. Veri sorumlusu ve uygulama işletmecisi CarbonCAM'dir.",
        sections: [
          ["1. Mobil uygulamada cihazınızda kalan veriler", "Cihaz adı, kategori, marka, Watt değeri, kullanım süresi, hesaplanan enerji ve CO₂e tahminleri, doğrulanmış tasarruf karşılaştırmaları, günlük görev işaretleri, bildirim tercihi, uygulama dili, görünen ad ve isteğe bağlı cinsiyet tercihi cihazınızda saklanır. Bu kayıtlar CarbonCAM sunucularına gönderilmez. Profil bölümünden yerel verileri silebilirsiniz. Android yedekleme ve cihaz aktarımı uygulama verileri için kapatılmıştır."],
          ["2. Fotoğraflar", "Kamera veya galeriden seçtiğiniz fotoğraf yalnızca hesaplama ekranında geçici referans olarak gösterilir. Fotoğraf sunucuya yüklenmez, içeriği otomatik analiz edilmez ve kayıtlı analizlere eklenmez."],
          ["3. Hesap ve Firebase Authentication", "E-posta hesabı oluşturduğunuzda veya Google ya da Apple ile giriş yaptığınızda Firebase Authentication; kullanıcı kimliği, e-posta, görünen ad, sağlayıcı profil bilgileri, IP adresi, kullanıcı aracısı ve uygulama kimliği gibi verileri hesabı oluşturmak, giriş güvenliğini sağlamak ve kötüye kullanımı önlemek için işler. Parolalar Firebase tarafından yönetilir; CarbonCAM tarafından görülmez veya yerel analiz kayıtlarıyla birleştirilmez."],
          ["4. Kullanım analitiği ve hata tanılama", "Mobil uygulama, uygulama kararlılığını ve temel kullanım akışlarını ölçmek için Google Firebase Analytics ve Firebase Crashlytics kullanır. Ekran görüntüleme ve yaklaşık özellik kullanım olayları; cihaz modeli, işletim sistemi ve uygulama sürümü gibi teknik bilgiler; çökme günlükleri, tanılama bilgileri ve kurulum tanımlayıcıları işlenebilir. Kullanıcı kimliği, e-posta, görünen ad, fotoğraf, cihaz adı, tam Watt veya kullanım süresi ve yerel analiz geçmişi bu olaylara eklenmez. Android reklam kimliği ve iOS reklam tanımlayıcısı toplanmaz; reklam kişiselleştirme sinyalleri kapalıdır."],
          ["5. Web sitesi, çerezler ve reklamlar", "Web sitesinde temel güvenlik ve sunum için teknik kayıtlar işlenebilir. Reklam kodu yalnızca isteğe bağlı çerezleri kabul ettiğinizde ve editoryal makale sayfalarında yüklenir. Google AdSense etkin olduğunda Google ve reklam teknolojisi ortakları reklam sunumu, ölçüm ve kötüye kullanımın önlenmesi için tarayıcınıza çerez yerleştirip okuyabilir; web işaretçileri, IP adresi ve diğer cihaz veya tarayıcı tanımlayıcılarını kullanabilir. Tercihlerinizi çerez bildiriminden yönetebilirsiniz. AEA, Birleşik Krallık ve İsviçre için kişiselleştirilmiş reklamlar, Google onaylı TCF uyumlu bir izin yönetim platformu yapılandırılmadan etkinleştirilmez. Mobil uygulamada bu sürüm itibarıyla reklam SDK'sı yoktur."],
          ["6. Kullanım amaçları ve paylaşım", "Veriler yalnızca talep ettiğiniz hizmeti sunmak, kimlik doğrulamak, güvenliği sağlamak, uygulama kararlılığını ve temel kullanım akışlarını ölçmek, tercihleri hatırlamak ve web sitesini işletmek için kullanılır. CarbonCAM kişisel verileri satmaz. Aktarım yalnızca açıklanan hizmet sağlayıcılar, yasal zorunluluklar veya açık talebiniz kapsamında yapılır."],
          ["7. Saklama, güvenlik ve silme", "Yerel uygulama verileri siz silene, uygulama verisini temizleyene veya uygulamayı kaldırana kadar cihazda kalır. Firebase hesap verileri hesap açık olduğu sürece saklanır. Profil ekranındaki Hesabı kalıcı olarak sil seçeneği yeniden kimlik doğrulamasından sonra Firebase hesabını ve cihazdaki CarbonCAM kullanıcı verilerini siler. Analitik ve tanılama kayıtları Google'ın hizmete özgü saklama ayarlarına tabidir. Hizmet sağlayıcılar sınırlı güvenlik, yasal yükümlülük veya yedek kayıtlarını kendi zorunlu süreleri boyunca tutabilir. Ağ üzerinden taşınan veriler HTTPS ile şifrelenir."],
          ["8. Haklarınız ve iletişim", "Verilerinize erişme, düzeltme veya silme talebinde bulunabilirsiniz. Talep sahibinin hesap sahibi olduğunu doğrulamak için yalnızca gerekli bilgiler istenir."],
          ["9. Değişiklikler", "Veri uygulamalarında önemli bir değişiklik olursa bu sayfanın yürürlük tarihi güncellenir ve gerektiğinde uygulama içinde bildirim sunulur."],
        ],
        contact: "Gizlilik talepleri", deletion: "Hesap silme seçenekleri", contactPage: "İletişim sayfası",
        googleData: "Google'ın iş ortağı sitelerindeki verileri nasıl kullandığı",
      }
    : {
        eyebrow: "CarbonCAM mobile app and website", title: "Privacy Policy", effective: "Effective date: 25 August 2026",
        intro: "This policy explains what data is processed in the CarbonCAM mobile app and on carboncam.com.tr, why it is processed, how long it is retained, and how it can be deleted. CarbonCAM is the data controller and app operator.",
        sections: [
          ["1. Data that stays on your device", "Device name, category, brand, wattage, usage duration, estimated energy and CO₂e, verified savings comparisons, daily task status, notification preference, app language, display name, and optional gender preference are stored on your device. These records are not sent to CarbonCAM servers. You can delete local data from Profile. Android backup and device transfer are disabled for app data."],
          ["2. Photos", "A photo selected from the camera or gallery is shown only as a temporary reference on the calculation screen. It is not uploaded, automatically analysed, or added to saved analyses."],
          ["3. Accounts and Firebase Authentication", "When you create an email account or sign in with Google or Apple, Firebase Authentication processes data such as user ID, email address, display name, provider profile information, IP address, user agent, and app identifier to create the account, secure sign-in, and prevent abuse. Firebase manages passwords; CarbonCAM cannot see them and does not combine them with local analysis records."],
          ["4. Usage analytics and crash diagnostics", "The mobile app uses Google Firebase Analytics and Firebase Crashlytics to measure app stability and basic feature flows. Screen views and coarse feature-use events; technical information such as device model, operating system, and app version; crash logs, diagnostics, and installation identifiers may be processed. User ID, email, display name, photos, device names, exact wattage or usage duration, and local analysis history are not attached to these events. The Android advertising ID and iOS advertising identifier are not collected, and ad-personalisation signals are disabled."],
          ["5. Website, cookies, and advertising", "Technical records may be processed for essential security and presentation. Advertising code loads only after you accept optional cookies and only on editorial article pages. When Google AdSense is active, Google and advertising technology partners may place and read cookies in your browser and use web beacons, IP addresses, and other device or browser identifiers for ad delivery, measurement, and abuse prevention. You can manage preferences in the cookie notice. Personalized ads for the EEA, the UK, and Switzerland are not enabled until a Google-certified TCF consent management platform is configured. This mobile app version contains no advertising SDK."],
          ["6. Purposes and sharing", "Data is used only to provide the requested service, authenticate users, maintain security, measure app stability and basic feature flows, remember preferences, and operate the website. CarbonCAM does not sell personal data. Data is shared only with the service providers described here, when legally required, or at your explicit request."],
          ["7. Retention, security, and deletion", "Local app data remains on the device until you delete it, clear app data, or uninstall. Firebase account data is retained while the account remains open. Permanently delete account in Profile removes the Firebase account after reauthentication and clears CarbonCAM user data from the device. Analytics and diagnostic records are subject to Google's service-specific retention settings. Providers may retain limited security, legal, or backup records for their mandatory periods. Data transmitted over the network is encrypted with HTTPS."],
          ["8. Your rights and contact", "You may request access, correction, or deletion. We ask only for information needed to verify that the requester owns the account."],
          ["9. Changes", "If our data practices materially change, we will update the effective date on this page and provide an in-app notice when appropriate."],
        ],
        contact: "Privacy requests", deletion: "Account deletion options", contactPage: "Contact page",
        googleData: "How Google uses data on partner sites",
      };

  return (
    <section style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "56px 20px" }}>
      <article style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", margin: "0 auto", maxWidth: "840px", padding: "clamp(24px, 5vw, 48px)" }}>
        <p style={{ color: "#047857", fontSize: "13px", fontWeight: 800, marginBottom: "10px", textTransform: "uppercase" }}>{copy.eyebrow}</p>
        <h1 style={{ color: "#0f172a", fontSize: "clamp(30px, 5vw, 40px)", fontWeight: 800, marginBottom: "12px" }}>{copy.title}</h1>
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "28px" }}><strong>{copy.effective}</strong></p>
        <div style={{ color: "#475569", fontSize: "15px", lineHeight: 1.75 }}>
          <p>{copy.intro} {copy.contact}: <a href="mailto:carboncamplus@gmail.com" style={linkStyle}>carboncamplus@gmail.com</a>.</p>
          {copy.sections.map(([title, body], index) => <section key={title}><h2 style={headingStyle}>{title}</h2><p>{body}</p>{index === 2 && <p style={{ marginTop: "12px" }}><a href="https://www.apple.com/legal/privacy/" rel="noreferrer" style={linkStyle} target="_blank">Apple Privacy Policy</a>, <a href="https://policies.google.com/privacy" rel="noreferrer" style={linkStyle} target="_blank">Google Privacy Policy</a>, <a href="https://firebase.google.com/support/privacy" rel="noreferrer" style={linkStyle} target="_blank">Firebase Privacy and Security</a></p>}{index === 4 && <p style={{ marginTop: "12px" }}><a href="https://policies.google.com/technologies/partner-sites" rel="noreferrer" style={linkStyle} target="_blank">{copy.googleData}</a></p>}{index === 7 && <p style={{ marginTop: "12px" }}><Link href="/account-deletion" style={linkStyle}>{copy.deletion}</Link> · <Link href="/contact" style={linkStyle}>{copy.contactPage}</Link></p>}</section>)}
        </div>
      </article>
    </section>
  );
}
