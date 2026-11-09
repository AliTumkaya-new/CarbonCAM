import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const turkish = (await getLocale()) === "tr";
  return {
    title: turkish ? "CarbonCAM Hesap ve Veri Silme" : "CarbonCAM Account and Data Deletion",
    description: turkish
      ? "CarbonCAM hesabınızı ve ilişkili verileri kalıcı olarak silme seçenekleri."
      : "Options for permanently deleting your CarbonCAM account and associated data.",
  };
}

const sectionStyle = { borderTop: "1px solid #e2e8f0", marginTop: "28px", paddingTop: "28px" } as const;

export default async function AccountDeletionPage() {
  const turkish = (await getLocale()) === "tr";
  const copy = turkish
    ? {
        title: "Hesap ve veri silme",
        intro: "CarbonCAM hesabınızı doğrudan uygulamadan silebilir veya uygulamaya erişemiyorsanız e-posta ile talep gönderebilirsiniz. Hesap kalıcı olarak silinir; yalnızca devre dışı bırakılmaz.",
        appTitle: "Uygulama içinden hemen silme",
        steps: ["CarbonCAM uygulamasını açın ve hesabınıza giriş yapın.", "Alt menüden Profil bölümünü açın.", "Hesabı kalıcı olarak sil seçeneğine dokunun.", "Kimliğinizi yeniden doğrulayın ve kalıcı silmeyi onaylayın."],
        noAccessTitle: "Uygulamaya erişemiyorsanız",
        noAccess: "Talebi hesabınızda kullandığınız e-posta adresinden gönderin. Hesap sahipliğini doğrulamak için size yanıt verebiliriz; şifrenizi veya gereksiz kişisel bilgileri istemeyiz. Doğrulanan talepler en geç 30 gün içinde tamamlanır.",
        request: "Hesap silme talebi gönder",
        email: "E-posta",
        dataTitle: "Silinen ve saklanabilen veriler",
        data: [
          "Firebase kullanıcı hesabı, kullanıcı kimliği, e-posta, görünen ad ve bağlı giriş sağlayıcısı silinir.",
          "Uygulama içi silmede analizler, tasarruf karşılaştırmaları, görev işaretleri, bildirim planları ve yerel profil tercihleri cihazdan temizlenir.",
          "Fotoğraflar CarbonCAM sunucularına yüklenmediği için sunucuda silinecek fotoğraf bulunmaz.",
          "Web talebi cihazınızdaki yerel verileri silemez. Bunları Profil bölümünden, sistem ayarlarından veya uygulamayı kaldırarak temizleyin.",
          "Sınırlı güvenlik, dolandırıcılık önleme, yasal yükümlülük veya yedek kayıtları hizmet sağlayıcıların zorunlu saklama süreleri boyunca kalabilir.",
        ],
        updated: "Son güncelleme: 20 Ağustos 2026",
        privacy: "Gizlilik Politikası",
        subject: "CarbonCAM hesap silme talebi",
        body: "CarbonCAM hesabımda kullandığım e-posta adresi:\n\nHesabımın ve ilişkili hesap verilerimin kalıcı olarak silinmesini talep ediyorum.",
      }
    : {
        title: "Account and data deletion",
        intro: "You can delete your CarbonCAM account directly in the app or submit an email request if you cannot access it. The account is permanently deleted, not merely deactivated.",
        appTitle: "Delete immediately in the app",
        steps: ["Open CarbonCAM and sign in to your account.", "Open Profile from the bottom navigation.", "Choose Permanently delete account.", "Reauthenticate and confirm permanent deletion."],
        noAccessTitle: "If you cannot access the app",
        noAccess: "Send the request from the email address used by your account. We may reply to verify ownership; we will not ask for your password or unnecessary personal information. Verified requests are completed within 30 days.",
        request: "Send account deletion request",
        email: "Email",
        dataTitle: "Data deleted and data that may be retained",
        data: [
          "Your Firebase user account, user ID, email address, display name, and linked sign-in provider are deleted.",
          "In-app deletion clears analyses, savings comparisons, task status, notification schedules, and local profile preferences from the device.",
          "Photos are never uploaded to CarbonCAM servers, so there are no server-side photos to delete.",
          "A web request cannot erase device-only data. Clear it from Profile, your operating system settings, or by uninstalling the app.",
          "Limited security, fraud-prevention, legal, or backup records may remain for service providers' mandatory retention periods.",
        ],
        updated: "Last updated: 20 August 2026",
        privacy: "Privacy Policy",
        subject: "CarbonCAM account deletion request",
        body: "Email address used for my CarbonCAM account:\n\nI request permanent deletion of my account and associated account data.",
      };
  const supportRequest = `mailto:carboncamplus@gmail.com?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(copy.body)}`;

  return (
    <section style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "56px 20px" }}>
      <article style={{ backgroundColor: "#fff", border: "1px solid #dbe7e2", borderRadius: "8px", margin: "0 auto", maxWidth: "840px", padding: "clamp(24px, 5vw, 48px)" }}>
        <p style={{ color: "#047857", fontSize: "13px", fontWeight: 800, marginBottom: "10px", textTransform: "uppercase" }}>CarbonCAM · com.carboncam.app</p>
        <h1 style={{ color: "#0f172a", fontSize: "clamp(30px, 5vw, 40px)", fontWeight: 800, marginBottom: "14px" }}>{copy.title}</h1>
        <p style={{ color: "#475569", fontSize: "16px", lineHeight: 1.7 }}>{copy.intro}</p>
        <section style={sectionStyle}>
          <h2 style={{ color: "#0f172a", fontSize: "21px", marginBottom: "12px" }}>{copy.appTitle}</h2>
          <ol style={{ color: "#475569", lineHeight: 1.8, paddingLeft: "22px" }}>{copy.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        </section>
        <section style={sectionStyle}>
          <h2 style={{ color: "#0f172a", fontSize: "21px", marginBottom: "12px" }}>{copy.noAccessTitle}</h2>
          <p style={{ color: "#475569", lineHeight: 1.75, marginBottom: "18px" }}>{copy.noAccess}</p>
          <a href={supportRequest} style={{ backgroundColor: "#047857", borderRadius: "8px", color: "#fff", display: "inline-block", fontSize: "15px", fontWeight: 800, padding: "13px 18px", textDecoration: "none" }}>{copy.request}</a>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "12px" }}>{copy.email}: <a href="mailto:carboncamplus@gmail.com" style={{ color: "#047857" }}>carboncamplus@gmail.com</a></p>
        </section>
        <section style={sectionStyle}>
          <h2 style={{ color: "#0f172a", fontSize: "21px", marginBottom: "12px" }}>{copy.dataTitle}</h2>
          <ul style={{ color: "#475569", lineHeight: 1.8, paddingLeft: "22px" }}>{copy.data.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <p style={{ color: "#64748b", fontSize: "13px", marginTop: "30px" }}>{copy.updated} · <a href="/privacy" style={{ color: "#047857" }}>{copy.privacy}</a></p>
      </article>
    </section>
  );
}
