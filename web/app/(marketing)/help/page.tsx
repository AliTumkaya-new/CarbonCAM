"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function HelpPage() {
  const turkish = useLocale() === "tr";
  const copy = turkish
    ? {
        label: "Yardım Merkezi", lead: "Size Nasıl", accent: "Yardımcı Olabiliriz?", intro: "CarbonCAM kullanımı hakkında sık sorulan sorular ve destek kaynakları", faqTitle: "Sık Sorulan Sorular",
        faqs: [
          ["CarbonCAM nedir ve ne işe yarar?", "CarbonCAM, elektrikli cihazların Watt değeri ve günlük kullanım süresinden enerji tüketimi ile tahmini CO₂e etkisini hesaplayan bir mobil uygulamadır. Sonuç bir sayaç ölçümü veya bağımsız sertifika değildir."],
          ["Nasıl başlayabilirim?", "Misafir olarak devam edebilir veya desteklenen giriş yöntemlerinden biriyle oturum açabilirsiniz. Cihaz Etkisini Hesapla bölümünde cihaz adı, Watt değeri ve günlük kullanım süresini girmeniz yeterlidir."],
          ["Fotoğraf otomatik olarak analiz ediliyor mu?", "Hayır. Kamera veya galeriden seçilen fotoğraf yalnızca hesaplama sırasında yerel referans olarak gösterilir; CarbonCAM sunucularına yüklenmez, içeriği okunmaz ve analiz kaydına eklenmez."],
          ["Doğrulanmış tasarruf nasıl hesaplanır?", "Aynı kapsam ve benzer süre için iki karşılaştırılabilir sayaç tüketimi girilir. Uygulama azalan kWh değerini yayımlanmış elektrik faktörüyle çarpar. Bu doğrulama kullanıcı girişine dayanır; bağımsız denetim değildir."],
          ["Hangi veriler cihazımda saklanır?", "Analiz kayıtları, tasarruf karşılaştırmaları, görev işaretleri ve profil tercihleri cihazınızda saklanır. Oturum açma hesabı Firebase Authentication tarafından yönetilir."],
          ["Hesabımı ve yerel verilerimi nasıl silebilirim?", "Profil bölümündeki Verilerimi Temizle seçeneği cihazdaki kayıtları siler. Hesabı Kalıcı Olarak Sil seçeneği oturum hesabını ve yerel kullanıcı verilerini siler. Web üzerinden de hesap silme talebi gönderebilirsiniz."],
          ["Görev bildirimleri hangi dilde gelir?", "Bildirimler telefonun sistem diline göre Türkçe veya İngilizce planlanır. Görevler bölümünden hatırlatıcıları açabilir veya kapatabilirsiniz."],
          ["Nasıl destek alabilirim?", "Destek ve hesap silme talepleri için carboncamplus@gmail.com adresine yazabilirsiniz. Parolanızı veya doğrulama kodunuzu paylaşmayın."],
        ],
        missing: "Sorunuzu bulamadınız mı?", contactBody: "Ekibimizle iletişime geçin; talebinizi inceleyip yanıtlayalım.", contact: "Bize Ulaşın", subject: "CarbonCAM Destek",
      }
    : {
        label: "Help Centre", lead: "How Can We", accent: "Help You?", intro: "Frequently asked questions and support resources for CarbonCAM", faqTitle: "Frequently Asked Questions",
        faqs: [
          ["What is CarbonCAM?", "CarbonCAM is a mobile app that estimates appliance energy use and CO₂e from wattage and daily usage time. The result is not a meter reading or independent certification."],
          ["How do I get started?", "Continue as a guest or sign in with a supported method. In Calculate Device Impact, enter the device name, wattage, and daily usage time."],
          ["Is my photo analysed automatically?", "No. A camera or gallery photo is shown only as a local reference during calculation. It is not uploaded to CarbonCAM, read, or added to the saved analysis."],
          ["How are verified savings calculated?", "Enter two comparable meter readings covering the same scope and a similar duration. The app multiplies the reduction in kWh by the published electricity factor. This relies on user-entered data and is not an independent audit."],
          ["What data is stored on my device?", "Analysis records, savings comparisons, task status, and profile preferences are stored on your device. Firebase Authentication manages the sign-in account."],
          ["How do I delete my account and local data?", "Clear My Data in Profile deletes device records. Permanently Delete Account removes the sign-in account and local user data. You can also submit a deletion request on the website."],
          ["Which language are task notifications sent in?", "Notifications are scheduled in English or Turkish according to the phone's system language. You can turn reminders on or off in Tasks."],
          ["How can I get support?", "Email carboncamplus@gmail.com for support or account deletion. Never send your password or verification code."],
        ],
        missing: "Couldn’t find your answer?", contactBody: "Contact our team and we will review your request.", contact: "Contact Us", subject: "CarbonCAM Support",
      };

  return (
    <main style={{ backgroundColor: "#fff" }}>
      <section
        style={{
          padding: "clamp(80px, 12vw, 140px) 24px clamp(60px, 8vw, 100px)",
          background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
            backgroundSize: "40px 40px",
            opacity: 0.4,
          }}
        />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#475569",
              marginBottom: "24px",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            {copy.label}
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "24px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {copy.lead}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #475569 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {copy.accent}
            </span>
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#64748b",
              lineHeight: 1.7,
              marginBottom: "48px",
            }}
          >
            {copy.intro}
          </p>
        </div>
      </section>

      <section style={{ padding: "clamp(60px, 10vw, 100px) 24px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "48px",
              textAlign: "center",
            }}
          >
            {copy.faqTitle}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {copy.faqs.map(([question, answer]) => (
              <div
                key={question}
                style={{
                  padding: "32px",
                  backgroundColor: "#f8fafc",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "12px",
                  }}
                >
                  {question}
                </h3>
                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                  {answer}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "80px",
              padding: "48px",
              backgroundColor: "#0f172a",
              borderRadius: "24px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#fff",
                marginBottom: "16px",
              }}
            >
              {copy.missing}
            </h3>
            <p
              style={{
                fontSize: "16px",
                color: "#94a3b8",
                marginBottom: "32px",
              }}
            >
              {copy.contactBody}
            </p>
            <Link
              href={`mailto:carboncamplus@gmail.com?subject=${encodeURIComponent(copy.subject)}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 32px",
                backgroundColor: "#fff",
                color: "#0f172a",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {copy.contact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
